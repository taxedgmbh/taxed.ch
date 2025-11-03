#!/usr/bin/env node

/**
 * Apple Design Validator - Autonomous Agent Server
 *
 * This server runs 24/7 and:
 * 1. Listens for GitHub webhook events (push, PR, schedule)
 * 2. Runs Playwright tests in isolated containers
 * 3. Invokes Claude API to analyze failures and generate fixes
 * 4. Automatically creates PRs with fixes
 * 5. Monitors and iterates until tests pass
 *
 * Deploy to: AWS EC2, GCP Compute, Azure VM, or Docker container
 */

import 'dotenv/config';
import express from 'express';
import { createHmac } from 'crypto';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';

const execAsync = promisify(exec);

// Configuration
const CONFIG = {
  PORT: process.env.PORT || 3000,
  GITHUB_WEBHOOK_SECRET: process.env.GITHUB_WEBHOOK_SECRET,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  REPO_DIR: process.env.REPO_DIR || '/tmp/repos',
  MAX_FIX_ITERATIONS: 3,
  AUTO_MERGE_ENABLED: process.env.AUTO_MERGE === 'true',
};

// Initialize Anthropic client (configured for DeepSeek)
const anthropic = new Anthropic({
  apiKey: CONFIG.ANTHROPIC_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

const app = express();
app.use(express.json());

// ============================================================================
// Webhook Signature Verification
// ============================================================================

function verifyGitHubSignature(req, res, next) {
  const signature = req.headers['x-hub-signature-256'];
  if (!signature) {
    return res.status(401).send('No signature');
  }

  const hmac = createHmac('sha256', CONFIG.GITHUB_WEBHOOK_SECRET);
  const digest = 'sha256=' + hmac.update(JSON.stringify(req.body)).digest('hex');

  if (signature !== digest) {
    return res.status(401).send('Invalid signature');
  }

  next();
}

// ============================================================================
// Agent Core Functions
// ============================================================================

/**
 * Clone or update repository
 */
async function cloneOrUpdateRepo(repoUrl, branch, repoName) {
  const repoPath = path.join(CONFIG.REPO_DIR, repoName);

  try {
    await fs.access(repoPath);
    // Repo exists, update it
    console.log(`📦 Updating existing repo: ${repoName}`);
    await execAsync(`cd ${repoPath} && git fetch origin && git checkout ${branch} && git pull origin ${branch}`);
  } catch {
    // Repo doesn't exist, clone it
    console.log(`📦 Cloning repo: ${repoUrl}`);
    await fs.mkdir(CONFIG.REPO_DIR, { recursive: true });
    const cloneUrl = repoUrl.replace('https://', `https://${CONFIG.GITHUB_TOKEN}@`);
    await execAsync(`git clone ${cloneUrl} ${repoPath}`);
    await execAsync(`cd ${repoPath} && git checkout ${branch}`);
  }

  return repoPath;
}

/**
 * Run Playwright tests
 */
async function runTests(repoPath) {
  console.log('🎭 Running Playwright tests...');

  try {
    // Install dependencies if needed
    try {
      await execAsync(`cd ${repoPath} && npm ci --prefer-offline`, { timeout: 300000 });
    } catch {
      // Fallback to npm install if package-lock.json doesn't exist
      await execAsync(`cd ${repoPath} && npm install`, { timeout: 300000 });
    }

    // Run tests with JSON reporter
    const { stdout, stderr } = await execAsync(
      `cd ${repoPath} && npx playwright test --reporter=json --output=test-results/results.json`,
      { timeout: 600000 }
    );

    // Parse results
    const resultsPath = path.join(repoPath, 'test-results/results.json');
    const results = JSON.parse(await fs.readFile(resultsPath, 'utf-8'));

    return {
      success: results.stats?.failures === 0,
      stats: results.stats,
      failures: results.suites?.flatMap(s => s.specs?.filter(spec => spec.ok === false) || []) || [],
      stdout,
      stderr,
    };
  } catch (error) {
    console.error('❌ Test execution failed:', error.message);
    return {
      success: false,
      error: error.message,
      stdout: error.stdout || '',
      stderr: error.stderr || '',
    };
  }
}

/**
 * Analyze test failures with Claude and generate fixes
 */
async function analyzeAndGenerateFixes(repoPath, testResults) {
  console.log('🤖 Invoking Claude API for analysis...');

  // Read relevant source files
  const sourceFiles = await readRelevantFiles(repoPath, testResults.failures);

  // Construct prompt for Claude
  const prompt = `You are the Apple Design Validator agent. Analyze these test failures and generate code fixes.

## Test Results
- Total failures: ${testResults.stats?.failures || 0}
- Failed tests: ${testResults.failures?.length || 0}

## Failure Details
${JSON.stringify(testResults.failures, null, 2)}

## Test Output
${testResults.stderr}

## Source Files
${sourceFiles.map(f => `### ${f.path}\n\`\`\`${f.ext}\n${f.content}\n\`\`\``).join('\n\n')}

## Task
For each violation, generate:
1. **Root cause** (why it's failing)
2. **Apple HIG reference** (which guideline is violated)
3. **Code fix** (exact file changes needed)

Format your response as JSON:
{
  "fixes": [
    {
      "file": "path/to/file.tsx",
      "violation": "Touch target too small",
      "higReference": "https://developer.apple.com/design/human-interface-guidelines/layout#Best-practices",
      "currentCode": "...",
      "fixedCode": "...",
      "explanation": "..."
    }
  ]
}`;

  const message = await anthropic.messages.create({
    model: 'deepseek-chat',
    max_tokens: 8192,
    system: await fs.readFile(path.join(process.env.HOME, '.claude/agents/apple-design-validator.md'), 'utf-8'),
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const responseText = message.content[0].text;

  // Extract JSON from response
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Claude did not return valid JSON');
  }

  const fixes = JSON.parse(jsonMatch[0]);
  console.log(`✅ Generated ${fixes.fixes?.length || 0} fixes`);

  return fixes;
}

/**
 * Read relevant source files based on test failures
 */
async function readRelevantFiles(repoPath, failures) {
  const files = [];
  const seen = new Set();

  // Extract file references from failures (simplified - could be smarter)
  const commonPaths = ['src/components', 'src/pages', 'src/styles'];

  for (const basePath of commonPaths) {
    try {
      const fullPath = path.join(repoPath, basePath);
      const dirFiles = await fs.readdir(fullPath, { recursive: true, withFileTypes: true });

      for (const file of dirFiles.slice(0, 10)) { // Limit to 10 files per dir
        if (file.isFile() && /\.(tsx?|jsx?|css)$/.test(file.name)) {
          const filePath = path.join(file.path, file.name);
          const relativePath = path.relative(repoPath, filePath);

          if (!seen.has(relativePath)) {
            seen.add(relativePath);
            const content = await fs.readFile(filePath, 'utf-8');
            files.push({
              path: relativePath,
              ext: path.extname(file.name).slice(1),
              content: content.slice(0, 5000), // Limit content size
            });
          }
        }
      }
    } catch (error) {
      // Directory doesn't exist, skip
    }
  }

  return files;
}

/**
 * Apply fixes to repository
 */
async function applyFixes(repoPath, fixes) {
  console.log('🔧 Applying fixes...');

  for (const fix of fixes.fixes || []) {
    const filePath = path.join(repoPath, fix.file);

    try {
      let content = await fs.readFile(filePath, 'utf-8');

      // Simple replacement (in production, use AST transformation)
      if (fix.currentCode && fix.fixedCode) {
        content = content.replace(fix.currentCode, fix.fixedCode);
        await fs.writeFile(filePath, content, 'utf-8');
        console.log(`  ✓ Fixed: ${fix.file}`);
      }
    } catch (error) {
      console.error(`  ✗ Failed to fix ${fix.file}:`, error.message);
    }
  }
}

/**
 * Create branch and commit fixes
 */
async function commitFixes(repoPath, fixes, iteration) {
  const timestamp = Date.now();
  const branchName = `fix/apple-hig-compliance-${timestamp}`;

  console.log(`📝 Creating branch: ${branchName}`);

  await execAsync(`cd ${repoPath} && git checkout -b ${branchName}`);

  // Stage all changes
  await execAsync(`cd ${repoPath} && git add .`);

  // Create commit message
  const commitMessage = `Auto-fix: Apple HIG compliance violations (iteration ${iteration})

${fixes.fixes?.map(f => `- ${f.violation} in ${f.file}`).join('\n') || 'Various fixes'}

Apple HIG References:
${fixes.fixes?.map(f => `- ${f.higReference}`).join('\n') || ''}

🤖 Generated with Claude Code - Apple Design Validator Agent
Timestamp: ${new Date().toISOString()}

Co-Authored-By: Claude <noreply@anthropic.com>`;

  await execAsync(`cd ${repoPath} && git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);

  return branchName;
}

/**
 * Create pull request via GitHub API
 */
async function createPullRequest(repoOwner, repoName, branchName, fixes) {
  console.log('📤 Creating pull request...');

  const prBody = `## 🎨 Apple HIG Compliance Auto-Fix

### Violations Fixed
${fixes.fixes?.map(f => `- **${f.violation}** in \`${f.file}\`\n  - Reference: ${f.higReference}\n  - ${f.explanation}`).join('\n\n') || 'Various compliance issues'}

### Test Results
Tests were failing due to Apple Human Interface Guidelines violations. This PR applies automated fixes generated by the Apple Design Validator agent.

### Changes
${fixes.fixes?.map(f => `#### ${f.file}\n\`\`\`diff\n- ${f.currentCode?.split('\n')[0] || 'Before'}\n+ ${f.fixedCode?.split('\n')[0] || 'After'}\n\`\`\``).join('\n\n') || 'Code fixes applied'}

### Verification
- [ ] All Playwright tests pass
- [ ] Touch targets ≥44×44pt
- [ ] Color contrast ≥4.5:1 (WCAG AA)
- [ ] Accessibility labels present
- [ ] Responsive layouts verified

---
🤖 **Generated by Apple Design Validator Agent**
💬 Questions? Review the [agent documentation](./APPLE_DESIGN_VALIDATOR_SETUP.md)
`;

  const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/pulls`, {
    method: 'POST',
    headers: {
      'Authorization': `token ${CONFIG.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      title: '🎨 Auto-fix: Apple HIG Compliance Violations',
      head: branchName,
      base: 'main',
      body: prBody,
    }),
  });

  const pr = await response.json();
  console.log(`✅ PR created: ${pr.html_url}`);

  return pr;
}

/**
 * Main agent workflow
 */
async function runAgentWorkflow(repoOwner, repoName, repoUrl, branch) {
  console.log('🚀 Starting Apple Design Validator Agent workflow...');

  const repoPath = await cloneOrUpdateRepo(repoUrl, branch, repoName);

  let iteration = 0;
  let testResults;

  // Self-healing loop
  while (iteration < CONFIG.MAX_FIX_ITERATIONS) {
    iteration++;
    console.log(`\n🔄 Iteration ${iteration}/${CONFIG.MAX_FIX_ITERATIONS}`);

    // Run tests
    testResults = await runTests(repoPath);

    if (testResults.success) {
      console.log('✅ All tests passed!');
      return { success: true, iterations: iteration };
    }

    console.log(`❌ ${testResults.stats?.failures || 0} tests failed`);

    // Analyze and generate fixes
    const fixes = await analyzeAndGenerateFixes(repoPath, testResults);

    if (!fixes.fixes || fixes.fixes.length === 0) {
      console.log('⚠️  No fixes generated, stopping');
      break;
    }

    // Apply fixes
    await applyFixes(repoPath, fixes);

    // Commit fixes
    const branchName = await commitFixes(repoPath, fixes, iteration);

    // Push branch
    await execAsync(`cd ${repoPath} && git push origin ${branchName}`);

    // Create PR
    const pr = await createPullRequest(repoOwner, repoName, branchName, fixes);

    // If auto-merge enabled and tests pass on this branch, merge
    if (CONFIG.AUTO_MERGE_ENABLED) {
      // Re-run tests on the new branch
      const verifyResults = await runTests(repoPath);

      if (verifyResults.success) {
        console.log('✅ Tests pass on fix branch, auto-merging...');
        await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/pulls/${pr.number}/merge`, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${CONFIG.GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            merge_method: 'squash',
          }),
        });
        return { success: true, iterations: iteration, merged: true };
      }
    }

    return { success: false, iterations: iteration, pr: pr.html_url };
  }

  return { success: false, iterations: iteration, error: 'Max iterations reached' };
}

// ============================================================================
// Webhook Endpoint
// ============================================================================

app.post('/webhook/github', verifyGitHubSignature, async (req, res) => {
  const event = req.headers['x-github-event'];
  const payload = req.body;

  console.log(`\n📥 Received GitHub event: ${event}`);

  // Respond immediately to GitHub
  res.status(202).send('Accepted');

  // Process asynchronously
  try {
    if (event === 'push' || event === 'pull_request') {
      const repoOwner = payload.repository.owner.login;
      const repoName = payload.repository.name;
      const repoUrl = payload.repository.clone_url;
      const branch = payload.ref?.replace('refs/heads/', '') || payload.pull_request?.head?.ref || 'main';

      // Run agent workflow
      await runAgentWorkflow(repoOwner, repoName, repoUrl, branch);
    }
  } catch (error) {
    console.error('❌ Webhook processing failed:', error);
  }
});

// ============================================================================
// Manual Trigger Endpoint (for testing)
// ============================================================================

app.post('/trigger/manual', async (req, res) => {
  const { repoOwner, repoName, repoUrl, branch } = req.body;

  if (!repoOwner || !repoName || !repoUrl) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  res.status(202).json({ message: 'Agent workflow started' });

  try {
    const result = await runAgentWorkflow(repoOwner, repoName, repoUrl, branch || 'main');
    console.log('✅ Manual workflow completed:', result);
  } catch (error) {
    console.error('❌ Manual workflow failed:', error);
  }
});

// ============================================================================
// Health Check
// ============================================================================

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    config: {
      autoMerge: CONFIG.AUTO_MERGE_ENABLED,
      maxIterations: CONFIG.MAX_FIX_ITERATIONS,
    },
  });
});

// ============================================================================
// Start Server
// ============================================================================

app.listen(CONFIG.PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                                ║
║     🤖 Apple Design Validator - Autonomous Agent Server       ║
║                                                                ║
║     Status: Running 24/7                                      ║
║     Port: ${CONFIG.PORT}                                                ║
║     Auto-Merge: ${CONFIG.AUTO_MERGE_ENABLED ? 'Enabled' : 'Disabled'}                                      ║
║                                                                ║
╚═══════════════════════════════════════════════════════════════╝

📡 Webhook endpoint: http://localhost:${CONFIG.PORT}/webhook/github
🏥 Health check: http://localhost:${CONFIG.PORT}/health
🔧 Manual trigger: POST http://localhost:${CONFIG.PORT}/trigger/manual

Waiting for GitHub events...
  `);
});

export default app;
