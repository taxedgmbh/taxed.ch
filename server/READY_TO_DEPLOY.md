# 🚀 Ready to Deploy: Autonomous Apple Design Validator

## What You Have Now

✅ **Fully Autonomous Agent** - Runs 24/7, monitors repos, fixes violations, creates PRs
✅ **Server Code** - Complete Node.js/Express server with Claude AI integration
✅ **Docker Setup** - Containerized for easy deployment
✅ **Oracle Cloud Deployment** - One-command deployment script
✅ **CI/CD Integration** - GitHub Actions workflow already configured
✅ **Comprehensive Testing** - Playwright tests for Apple HIG compliance

## Files Created

```
server/
├── agent-server.js          # Main autonomous agent (24/7 server)
├── package.json             # Dependencies
├── Dockerfile               # Container definition
├── docker-compose.yml       # Multi-container orchestration
├── deploy-oracle.sh         # ⭐ One-command Oracle Cloud deployment
├── deploy-aws.sh            # AWS EC2 deployment (alternative)
├── .env.example             # Configuration template
├── DEPLOY_TO_ORACLE.md      # ⭐ Step-by-step Oracle deployment guide
└── READY_TO_DEPLOY.md       # This file
```

## Deploy to Oracle Cloud NOW (5 Minutes)

### Option 1: I Have Oracle Cloud Credentials

```bash
cd ~/github/taxedgmbh/taxed.ch/server

# Set your credentials
export ORACLE_HOST="158.178.x.x"                    # Your Oracle IP
export ORACLE_USER="ubuntu"                          # SSH user
export KEY_FILE="path/to/your-oracle-key.pem"       # SSH key
export GITHUB_WEBHOOK_SECRET="$(openssl rand -hex 32)"
export GITHUB_TOKEN="ghp_your_github_token"
export ANTHROPIC_API_KEY="sk-ant-your_anthropic_key"

# Deploy!
chmod +x deploy-oracle.sh
./deploy-oracle.sh
```

**Done!** Agent will be running on Oracle Cloud in ~3 minutes.

### Option 2: I Need to Create Oracle Cloud Instance First

1. **Create Oracle Cloud Account** (if you don't have one):
   - Go to: https://www.oracle.com/cloud/free/
   - Sign up for **Always Free** tier (no credit card for free tier)

2. **Create Compute Instance**:
   - Shape: VM.Standard.E2.1.Micro (Always Free)
   - Image: Ubuntu 22.04
   - Add SSH key (generate if needed: `ssh-keygen -t rsa -b 4096`)
   - Note the public IP address

3. **Add Firewall Rules**:
   - In Oracle Console → Networking → Security Lists
   - Add Ingress Rule: Port 3000, Source: 0.0.0.0/0

4. **Deploy** (use Option 1 above with your new instance details)

## What the Agent Does Automatically

```
┌─────────────────────────────────────────┐
│  GitHub Push/PR Event                    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Agent Receives Webhook                  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Clone Repo & Run Playwright Tests       │
│  • iOS Safari (iPhone, iPad)            │
│  • Touch targets (≥44pt)                │
│  • Color contrast (WCAG AA)             │
│  • Accessibility                         │
└──────────────┬──────────────────────────┘
               │
               ▼ (if violations found)
┌─────────────────────────────────────────┐
│  Invoke Claude AI                        │
│  • Analyze failure logs                 │
│  • Read source code                     │
│  • Generate code fixes                  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Apply Fixes Automatically               │
│  • Create new branch                    │
│  • Commit code changes                  │
│  • Push to GitHub                       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Open Pull Request                       │
│  • Detailed explanation                 │
│  • Apple HIG references                 │
│  • Before/after code diffs              │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Re-test on Fix Branch                   │
│  • Verify fixes work                    │
│  • Iterate if needed (max 3x)           │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  ✅ PR Ready for Human Review/Merge     │
└─────────────────────────────────────────┘
```

## After Deployment

### 1. Test Health

```bash
curl http://YOUR-ORACLE-IP:3000/health
```

Expected:
```json
{
  "status": "healthy",
  "uptime": 45.2,
  "config": {
    "autoMerge": false,
    "maxIterations": 3
  }
}
```

### 2. Configure GitHub Webhook

Go to: https://github.com/taxedgmbh/taxed.ch/settings/hooks/new

- **URL**: `http://YOUR-ORACLE-IP:3000/webhook/github`
- **Secret**: (your GITHUB_WEBHOOK_SECRET)
- **Events**: push, pull_request

### 3. Push Some Code & Watch Magic Happen

```bash
# Make a small change to test
cd ~/github/taxedgmbh/taxed.ch
echo "/* test */" >> src/App.tsx
git add .
git commit -m "test: trigger Apple Design Validator"
git push
```

Within minutes:
- ✅ Agent runs tests
- ✅ If violations found → Creates PR with fixes
- ✅ You review & merge

## Monitoring the Agent

### View Live Logs

```bash
ssh -i your-key.pem ubuntu@YOUR-ORACLE-IP
cd /home/ubuntu/apple-design-validator/server
docker-compose logs -f
```

### Check What It's Doing

```bash
# See running containers
docker-compose ps

# See recent activity
docker-compose logs --tail=100

# Restart if needed
docker-compose restart
```

## Cost: $0 (Oracle Cloud Free Tier)

Oracle Cloud Always Free includes:
- ✅ 2 VMs with 1GB RAM each
- ✅ Up to 4 ARM cores (24GB RAM total)
- ✅ 200GB storage
- ✅ **No credit card required** for free tier
- ✅ **Free forever** (not a trial)

Perfect for running this agent!

## Configuration Options

Edit `/home/ubuntu/apple-design-validator/server/.env` on Oracle server:

```bash
# Auto-merge PRs if all tests pass (risky!)
AUTO_MERGE=false  # Set to 'true' for full autonomy

# Max fix iterations before giving up
MAX_FIX_ITERATIONS=3

# GitHub & API keys
GITHUB_TOKEN=ghp_xxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

## Advanced: Enable Auto-Merge (Full Autonomy)

**⚠️ Use with caution!** This will automatically merge PRs if tests pass.

```bash
# SSH into Oracle server
ssh -i your-key.pem ubuntu@YOUR-ORACLE-IP

# Edit .env
cd /home/ubuntu/apple-design-validator/server
nano .env

# Change AUTO_MERGE=false to AUTO_MERGE=true

# Restart
docker-compose restart
```

Now the agent will:
1. Find violations
2. Fix them
3. Test fixes
4. **Automatically merge** if tests pass
5. **No human review needed** (fully autonomous!)

## What Gets Tested?

| Test Category | Checks | Apple HIG Ref |
|---------------|--------|---------------|
| **Touch Targets** | All buttons/links ≥44×44pt | [HIG Layout](https://developer.apple.com/design/human-interface-guidelines/layout) |
| **Color Contrast** | Text ≥4.5:1 (WCAG AA) | [WCAG 2.1](https://www.w3.org/WAI/WCAG21/) |
| **Accessibility** | Alt text, labels, hierarchy | [Apple A11y](https://developer.apple.com/accessibility/) |
| **Responsive** | Mobile, tablet, desktop layouts | [HIG Adaptivity](https://developer.apple.com/design/human-interface-guidelines/layout) |
| **Typography** | Min 16px, proper hierarchy | [HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography) |
| **Performance** | LCP <2.5s, load <3s | [Web Vitals](https://web.dev/vitals/) |

## Troubleshooting

### "Connection refused" when testing health

```bash
# Check if container is running
ssh ubuntu@YOUR-ORACLE-IP "docker-compose -f /home/ubuntu/apple-design-validator/server/docker-compose.yml ps"

# Check Oracle Cloud firewall rules
# Ensure port 3000 is open in Security List
```

### "GitHub webhook failing"

```bash
# Check webhook secret matches
ssh ubuntu@YOUR-ORACLE-IP "cat /home/ubuntu/apple-design-validator/server/.env | grep WEBHOOK"

# Check GitHub webhook delivery logs at:
# https://github.com/taxedgmbh/taxed.ch/settings/hooks
```

### "Tests running but no PR created"

```bash
# Check Anthropic API key is valid
# Check GitHub token has repo write permissions
# View agent logs for error messages
```

## Next Steps After Deployment

1. ✅ **Test the agent** - Push a small change
2. ✅ **Review first PR** - See how it fixes violations
3. ✅ **Adjust settings** - Edit AUTO_MERGE, MAX_ITERATIONS
4. ✅ **Add more repos** - Deploy to other projects
5. ✅ **Monitor costs** - (Should be $0 on Oracle Free Tier!)

## Success Criteria

You'll know it's working when:
- ✅ Push code → Webhook triggers
- ✅ Tests run automatically
- ✅ PR created with fixes (if violations found)
- ✅ All tests pass after fixes applied
- ✅ Zero manual intervention needed

## Support & Documentation

- **Full Setup Guide**: `APPLE_DESIGN_VALIDATOR_SETUP.md`
- **Quick Start**: `QUICK_START.md`
- **Oracle Deployment**: `DEPLOY_TO_ORACLE.md`
- **Agent Config**: `~/.claude/agents/apple-design-validator.md`

---

## 🎯 Ready to Deploy?

```bash
cd ~/github/taxedgmbh/taxed.ch/server
./deploy-oracle.sh
```

**3 minutes later**: Your autonomous Apple Design Validator is running 24/7!

🤖 **Apple Design Validator** - Set it and forget it!
