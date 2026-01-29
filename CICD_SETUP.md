# CI/CD Pipeline Setup Guide

Fully automated: Claude Code → GitHub PR → Claude AI Review → Auto-Merge → Deploy

## Architecture Overview

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Claude Code    │────▶│    GitHub PR     │────▶│   CI Pipeline   │
│  (local dev)    │     │    Created       │     │  (build + test) │
└─────────────────┘     └──────────────────┘     └────────┬────────┘
                                                          │ ✓ Pass
                                                          ▼
                                                 ┌─────────────────┐
                                                 │  Claude AI      │
                                                 │  Code Review    │
                                                 └────────┬────────┘
                                                          │ ✓ Approve
                                                          ▼
                        ┌──────────────────┐     ┌─────────────────┐
                        │   AUTO-MERGE     │────▶│   Push to main  │
                        │   (no human!)    │     │                 │
                        └──────────────────┘     └────────┬────────┘
                                                          │
                                                          ▼
                        ┌──────────────────┐     ┌─────────────────┐
                        │    Webhook       │────▶│   Hostinger     │
                        │    Trigger       │     │   Git Deploy    │
                        └──────────────────┘     └─────────────────┘
                                                          │
                                                          ▼
                                                 ┌─────────────────┐
                                                 │   taxed.ch      │
                                                 │   LIVE!         │
                                                 └─────────────────┘
```

**Fully Automated** - No human approval required. Claude AI reviews and auto-merges if safe.

## Step 1: GitHub Secrets Configuration

Go to: https://github.com/taxedgmbh/taxed.ch/settings/secrets/actions

Add these secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `HOSTINGER_WEBHOOK_URL` | `https://webhooks.hostinger.com/deploy/4f1747fbcb28f54f6cff3d22c446616c` | Triggers auto-deployment |
| `ANTHROPIC_API_KEY` | `sk-ant-...` | Claude AI API key for code reviews |

### Getting an Anthropic API Key

1. Go to https://console.anthropic.com/
2. Create an account or sign in
3. Navigate to API Keys
4. Create a new API key
5. Copy and add to GitHub secrets as `ANTHROPIC_API_KEY`

## Step 2: Configure Hostinger Webhook in GitHub

Go to: https://github.com/taxedgmbh/taxed.ch/settings/hooks/new

Configure:
- **Payload URL**: `https://webhooks.hostinger.com/deploy/4f1747fbcb28f54f6cff3d22c446616c`
- **Content type**: `application/json`
- **Secret**: (leave empty)
- **SSL verification**: Enable
- **Which events?**: Select "Just the push event"
- **Active**: ✅ Check this box

Click **Add webhook**

## Step 3: Branch Protection Rules

Go to: https://github.com/taxedgmbh/taxed.ch/settings/branches

Click **Add branch protection rule**:

### Settings for `main` branch:

```
Branch name pattern: main

☑️ Require a pull request before merging
   ☐ Require approvals: 0  (Claude AI handles this!)
   ☐ Dismiss stale pull request approvals
   ☐ Require review from Code Owners

☑️ Require status checks to pass before merging
   ☑️ Require branches to be up to date before merging
   Status checks that are required:
   - ci (from claude-review.yml)
   - claude-review (from claude-review.yml)

☐ Require conversation resolution before merging

☐ Require signed commits

☑️ Require linear history

☐ Include administrators

☑️ Allow auto-merge  <-- IMPORTANT: Enable this!

☐ Allow force pushes (NEVER enable this!)

☐ Allow deletions
```

Click **Create** or **Save changes**

Note: Auto-merge feature NOT required - workflow merges directly after Claude approval.

## Step 4: Configure Hostinger for Deploy Branch

**IMPORTANT**: Change Hostinger to pull from `deploy` branch (not `main`).

Your Hostinger settings should show:
- **Repository**: `git@github.com:taxedgmbh/taxed.ch.git`
- **Branch**: `deploy` ← **CHANGE THIS FROM `main`**
- **Install Path**: `/`
- **Deploy Key**: Added (SHA256:FA4PhmufBJAlmO5Mez/Tcf2/DDJzTII6wtZH+U0KoAo)

**Why?** Source code is in `main`, but `dist/` is gitignored. GitHub Actions builds the code and pushes only `dist/` to `deploy` branch. Hostinger pulls the ready-to-serve files from `deploy`.

## Workflow Files

The CI/CD pipeline uses these GitHub Actions workflows:

### `.github/workflows/claude-review.yml` (Main Pipeline)
- Runs on: PR opened/updated
- Jobs:
  1. **ci**: Build + test (must pass)
  2. **claude-review**: AI reviews code, decides APPROVE/REJECT
  3. **auto-merge**: If approved, merges PR automatically
  4. **notify-rejection**: If rejected, posts feedback

### `.github/workflows/ci.yml` (Build & Deploy)
- Runs on: Push to main (after merge)
- Builds the project with `npm run build`
- Pushes `dist/` contents to `deploy` branch
- Triggers Hostinger webhook for deployment

### `.github/workflows/apple-design-audit.yml`
- Runs on: PRs to main, weekly schedule
- Validates Apple HIG compliance
- Creates issues for design violations

## Development Workflow (Fully Automated)

### 1. Create Feature Branch
```bash
git checkout -b feat/my-feature
```

### 2. Make Changes & Commit
```bash
# Make your changes
git add .
git commit -m "feat: add new feature"
```

### 3. Push & Create PR
```bash
git push -u origin feat/my-feature
# Create PR via GitHub UI or:
gh pr create --title "feat: add new feature" --body "Description"
```

### 4. Automated Pipeline Runs (No Human Needed!)
1. ✅ **CI**: Builds and tests your code
2. 🤖 **Claude AI**: Reviews code for security/quality
3. ✅ **Auto-Merge**: If approved, PR merges automatically
4. 🚀 **Deploy**: Webhook triggers Hostinger
5. 🌐 **Live**: Site updated at https://taxed.ch

### 5. If Claude Rejects
- Review feedback in PR comments
- Push fixes to the same branch
- Pipeline re-runs automatically
- Once approved → auto-merge → deploy

## Troubleshooting

### CI Fails
```bash
# Run locally to debug
npm ci
npm run build
npm test
```

### Webhook Not Triggering
1. Check GitHub webhook delivery: Settings → Webhooks → Recent Deliveries
2. Verify webhook URL is correct
3. Check Hostinger deployment logs

### Claude Review Not Working
1. Verify `ANTHROPIC_API_KEY` secret is set
2. Check API key has sufficient credits
3. Review workflow run logs

### Hostinger Not Deploying
1. Check SSH key is added correctly
2. **Verify branch is set to `deploy`** (not `main`!)
3. Check Hostinger deployment logs
4. Manual trigger: Hostinger panel → Git → Deploy
5. Verify `deploy` branch exists: `git ls-remote origin deploy`

## Security Notes

- Never commit API keys or secrets
- Use GitHub Secrets for all sensitive values
- Branch protection prevents direct pushes to main
- All changes require PR + review
- Claude AI reviews for security issues

## Quick Reference

| Action | Command/Location |
|--------|------------------|
| Start dev server | `npm run dev` |
| Run tests | `npm test` |
| Create PR | `gh pr create` |
| Check CI status | GitHub Actions tab |
| Manual deploy | Hostinger panel → Git → Deploy |
| View webhook logs | GitHub Settings → Webhooks |

---

**Setup Complete!** Your fully automated CI/CD pipeline is ready.

```
Push → PR → Build/Test → Claude AI Review → Auto-Merge → Deploy → Live!
```

No human approval needed. Claude AI is your automated gatekeeper.
