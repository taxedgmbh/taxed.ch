# 🚀 Apple Design Validator - Deployment Status

## Current Status: ⏳ IN PROGRESS

**Oracle Cloud Server**: `152.67.78.28`
**Deployment Started**: October 19, 2025 13:14 GMT
**Status**: Installations running in background

---

## ✅ Completed Steps

### 1. Server Preparation
- ✅ SSH connection verified to Oracle Cloud
- ✅ Server files uploaded to `/home/opc/apple-design-validator/`
- ✅ Configuration file created with API keys

### 2. Files Deployed
```
/home/opc/apple-design-validator/
├── server/
│   ├── agent-server.js          # Main autonomous agent
│   ├── package.json             # Dependencies
│   ├── Dockerfile               # Container config
│   ├── docker-compose.yml       # Orchestration
│   ├── .env                     # ✅ YOUR API KEYS CONFIGURED
│   └── deploy-*.sh              # Deployment scripts
```

### 3. Configuration (.env file)
```bash
PORT=3000
GITHUB_WEBHOOK_SECRET=b8d1caff90f42e9c49e932627be57b48a17a2d174ffb2f3e99e5263d225b7eae
GITHUB_TOKEN=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
ANTHROPIC_API_KEY=sk-182780cd7e184d8887f9d20360f3718b  # DeepSeek
REPO_DIR=/tmp/repos
AUTO_MERGE=false
MAX_FIX_ITERATIONS=3
```

---

## ⏳ In Progress

### Background Installations
1. **Docker** - Installing on Oracle Linux 9
2. **Node.js 18** - Installing via NodeSource repository

These are running in the background and should complete shortly.

---

## 📋 Remaining Steps (Automated or Manual)

### Option A: Wait for Automated Completion
The background processes will complete automatically. Once done, the agent will:
1. Install remaining dependencies (`npm install`)
2. Configure firewall (port 3000)
3. Start the agent server
4. Become available at `http://152.67.78.28:3000`

### Option B: Complete Manually (Faster - 2 minutes)

```bash
# 1. SSH into Oracle Cloud
ssh -i ~/.ssh/oracle-taxedgmbh.key opc@152.67.78.28

# 2. Wait for Node.js to finish (or install if needed)
node --version  # Check if installed

# If not installed:
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo dnf install -y nodejs

# 3. Install agent dependencies
cd /home/opc/apple-design-validator/server
npm install

# 4. Install Playwright browsers (for testing)
npx playwright install --with-deps chromium webkit

# 5. Open firewall
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload

# 6. Start the agent (as background process)
nohup node agent-server.js > /tmp/agent.log 2>&1 &

# 7. Verify it's running
curl http://localhost:3000/health

# Expected output:
# {
#   "status": "healthy",
#   "uptime": 1.234,
#   "config": { "autoMerge": false, "maxIterations": 3 }
# }
```

---

## 🔧 GitHub Webhook Configuration

Once the agent is running, configure GitHub webhook:

### Steps:
1. Go to: https://github.com/taxedgmbh/taxed.ch/settings/hooks/new

2. **Payload URL**: `http://152.67.78.28:3000/webhook/github`

3. **Content type**: `application/json`

4. **Secret**:
   ```
   b8d1caff90f42e9c49e932627be57b48a17a2d174ffb2f3e99e5263d225b7eae
   ```

5. **Which events**: Select individual events:
   - ✅ Pushes
   - ✅ Pull requests

6. ✅ Active (checked)

7. Click **"Add webhook"**

### Test the Webhook
After adding, push a small change to test:
```bash
cd ~/github/taxedgmbh/taxed.ch
echo "// test" >> src/App.tsx
git add .
git commit -m "test: trigger Apple Design Validator"
git push
```

Within 2-3 minutes:
- Agent receives webhook
- Runs Playwright tests
- If violations found → Creates PR with fixes

---

## 🧪 Testing the Agent

### 1. Health Check
```bash
curl http://152.67.78.28:3000/health
```

### 2. Manual Trigger (for testing)
```bash
curl -X POST http://152.67.78.28:3000/trigger/manual \
  -H "Content-Type: application/json" \
  -d '{
    "repoOwner": "taxedgmbh",
    "repoName": "taxed.ch",
    "repoUrl": "https://github.com/taxedgmbh/taxed.ch.git",
    "branch": "main"
  }'
```

### 3. View Logs
```bash
ssh -i ~/.ssh/oracle-taxedgmbh.key opc@152.67.78.28
tail -f /tmp/agent.log
```

---

## 🎯 What the Agent Does Automatically

```
GitHub Push → Webhook → Agent Server
                            ↓
                    Run Playwright Tests
                    (iOS, macOS, responsive)
                            ↓
                    Tests Pass? → ✅ Done
                            ↓ No
                    Invoke Claude AI
                    (Analyze failures)
                            ↓
                    Generate Code Fixes
                            ↓
                    Create Branch & Commit
                            ↓
                    Open Pull Request
                    (with detailed explanation)
                            ↓
                    Re-test Fixes
                            ↓
                    Iterate (max 3x)
                            ↓
                    ✅ PR Ready for Review
```

---

## 🔐 Security Notes

### Firewall Rules Needed
Oracle Cloud requires TWO places to open ports:

1. **iptables (done automatically)**:
   ```bash
   sudo firewall-cmd --permanent --add-port=3000/tcp
   sudo firewall-cmd --reload
   ```

2. **Oracle Cloud Console** (you must do this):
   - Go to: Oracle Console → Networking → Virtual Cloud Networks
   - Select your VCN → Security Lists → Default Security List
   - Add Ingress Rule:
     - Source: `0.0.0.0/0`
     - IP Protocol: TCP
     - Destination Port Range: `3000`
     - Description: `Apple Design Validator Webhook`

### API Keys Storage
Your API keys are stored in:
- `/home/opc/apple-design-validator/server/.env`
- File permissions: `600` (owner read/write only)
- **Never commit this file to git!**

---

## 📊 Monitoring & Maintenance

### View Agent Status
```bash
# Check if running
ps aux | grep agent-server

# View logs
tail -f /tmp/agent.log

# Restart if needed
pkill -f agent-server.js
cd /home/opc/apple-design-validator/server
nohup node agent-server.js > /tmp/agent.log 2>&1 &
```

### Auto-Start on Reboot (Optional)
Create systemd service:
```bash
sudo tee /etc/systemd/system/apple-validator.service > /dev/null <<EOF
[Unit]
Description=Apple Design Validator Agent
After=network.target

[Service]
Type=simple
User=opc
WorkingDirectory=/home/opc/apple-design-validator/server
ExecStart=/usr/bin/node agent-server.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable apple-validator
sudo systemctl start apple-validator
```

---

## 💰 Cost: $0 (Oracle Cloud Free Tier)

You're using Oracle Cloud Always Free tier:
- ✅ 2 VMs with 1GB RAM each - **Free Forever**
- ✅ 200GB block storage - **Free Forever**
- ✅ 10GB outbound data/month - **Free**

Perfect for running this agent at zero cost!

---

## 🆘 Troubleshooting

### Agent won't start
```bash
# Check Node.js installed
node --version

# Check dependencies installed
cd /home/opc/apple-design-validator/server
npm list

# Check for errors
cat /tmp/agent.log
```

### Port 3000 not accessible
```bash
# Check firewall
sudo firewall-cmd --list-ports

# Check Oracle Cloud Security List (web console)
# Ensure ingress rule exists for port 3000
```

### GitHub webhook failing
```bash
# Check webhook secret matches
cat /home/opc/apple-design-validator/server/.env | grep WEBHOOK_SECRET

# View GitHub webhook deliveries:
# https://github.com/taxedgmbh/taxed.ch/settings/hooks
```

---

## ✅ Success Criteria

You'll know it's working when:
1. ✅ `curl http://152.67.78.28:3000/health` returns healthy status
2. ✅ GitHub webhook shows "200 OK" deliveries
3. ✅ Push code → PR created automatically with fixes
4. ✅ All Playwright tests pass after fixes applied

---

## 📚 Documentation Reference

- **Full Setup**: `APPLE_DESIGN_VALIDATOR_SETUP.md`
- **Quick Start**: `QUICK_START.md`
- **Oracle Deployment**: `DEPLOY_TO_ORACLE.md`
- **Server Code**: `server/READY_TO_DEPLOY.md`

---

## 🎉 Next Actions

### Immediate (After Installation Completes):
1. [ ] Complete manual steps above (or wait for auto-completion)
2. [ ] Test health endpoint
3. [ ] Configure GitHub webhook
4. [ ] Push test commit

### Within 24 Hours:
1. [ ] Add Oracle Cloud Security List ingress rule
2. [ ] Set up systemd service for auto-restart
3. [ ] Test with real code push

### Optional Enhancements:
1. [ ] Enable AUTO_MERGE=true for full autonomy
2. [ ] Add nginx reverse proxy for HTTPS
3. [ ] Set up monitoring/alerting

---

**Last Updated**: October 19, 2025 13:24 GMT
**Status**: Waiting for Node.js/Docker installation to complete

🤖 **Apple Design Validator** - Your 24/7 Autonomous Design Compliance Agent
