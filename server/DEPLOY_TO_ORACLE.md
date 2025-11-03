# Deploy Apple Design Validator to Oracle Cloud

## Prerequisites

1. ✅ Oracle Cloud account
2. ✅ Compute instance running (Ubuntu 22.04 recommended)
3. ✅ SSH key (.pem file) for the instance
4. ✅ GitHub Personal Access Token
5. ✅ Anthropic API Key (Claude)

## Quick Deploy (5 minutes)

### Step 1: Set Environment Variables

```bash
# Navigate to server directory
cd ~/github/taxedgmbh/taxed.ch/server

# Set your Oracle Cloud details
export ORACLE_HOST="your-oracle-ip"        # e.g., "158.178.x.x"
export ORACLE_USER="ubuntu"                 # or "opc" for Oracle Linux
export KEY_FILE="path/to/your-key.pem"      # SSH key for Oracle instance

# Set agent secrets
export GITHUB_WEBHOOK_SECRET="$(openssl rand -hex 32)"  # Generate random secret
export GITHUB_TOKEN="ghp_your_github_token_here"
export ANTHROPIC_API_KEY="sk-ant-your_api_key_here"
```

### Step 2: Run Deployment Script

```bash
chmod +x deploy-oracle.sh
./deploy-oracle.sh
```

The script will:
- ✅ Test SSH connection
- ✅ Upload agent code
- ✅ Install Docker & Docker Compose
- ✅ Build and start the agent container
- ✅ Configure firewall (ports 3000, 80, 443)
- ✅ Set up auto-restart on reboot

### Step 3: Configure GitHub Webhook

After deployment completes, configure GitHub:

1. Go to: https://github.com/taxedgmbh/taxed.ch/settings/hooks/new

2. Fill in:
   - **Payload URL**: `http://YOUR-ORACLE-IP:3000/webhook/github`
   - **Content type**: `application/json`
   - **Secret**: (the GITHUB_WEBHOOK_SECRET you generated)
   - **Events**: Select "push" and "pull_request"

3. Click "Add webhook"

### Step 4: Test the Agent

```bash
# Check health
curl http://YOUR-ORACLE-IP:3000/health

# Expected response:
# {
#   "status": "healthy",
#   "uptime": 123.45,
#   "timestamp": "2025-10-19T...",
#   "config": {
#     "autoMerge": false,
#     "maxIterations": 3
#   }
# }
```

## Manual Trigger (for testing)

```bash
curl -X POST http://YOUR-ORACLE-IP:3000/trigger/manual \
  -H "Content-Type: application/json" \
  -d '{
    "repoOwner": "taxedgmbh",
    "repoName": "taxed.ch",
    "repoUrl": "https://github.com/taxedgmbh/taxed.ch.git",
    "branch": "main"
  }'
```

## Monitoring & Logs

### SSH into Oracle Instance

```bash
ssh -i path/to/your-key.pem ubuntu@YOUR-ORACLE-IP
```

### View Agent Logs

```bash
cd /home/ubuntu/apple-design-validator/server
docker-compose logs -f
```

### Check Container Status

```bash
docker-compose ps
```

### Restart Agent

```bash
docker-compose restart
```

## Oracle Cloud Firewall (Important!)

The script automatically configures iptables, but you also need to:

### 1. Add Ingress Rules in Oracle Cloud Console

1. Go to: Oracle Cloud Console → Networking → Virtual Cloud Networks
2. Select your VCN → Security Lists
3. Add Ingress Rules:
   - **Port 3000** (Agent webhook)
   - **Port 80** (HTTP - optional for nginx)
   - **Port 443** (HTTPS - optional for nginx)

Example rule for port 3000:
```
Source: 0.0.0.0/0
IP Protocol: TCP
Destination Port Range: 3000
Description: Apple Design Validator Webhook
```

## Optional: HTTPS with Nginx (Recommended for Production)

### Install Nginx

```bash
ssh -i your-key.pem ubuntu@YOUR-ORACLE-IP

sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
```

### Configure Nginx Reverse Proxy

```bash
sudo nano /etc/nginx/sites-available/apple-validator
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;  # or use IP if no domain

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and start:
```bash
sudo ln -s /etc/nginx/sites-available/apple-validator /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Get SSL Certificate (if you have a domain)

```bash
sudo certbot --nginx -d your-domain.com
```

Then update GitHub webhook URL to: `https://your-domain.com/webhook/github`

## Troubleshooting

### Agent not starting

```bash
# Check logs
docker-compose logs

# Rebuild container
docker-compose down
docker-compose up -d --build
```

### Can't connect to agent

```bash
# Check if port 3000 is open
sudo iptables -L -n | grep 3000

# Check Oracle Cloud Security List (web console)
# Ensure ingress rule for port 3000 exists
```

### GitHub webhook failing

```bash
# Check webhook secret matches
cat /home/ubuntu/apple-design-validator/server/.env | grep WEBHOOK_SECRET

# Check GitHub webhook deliveries for error messages
# https://github.com/taxedgmbh/taxed.ch/settings/hooks
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `ORACLE_HOST` | Oracle Cloud instance IP | `158.178.x.x` |
| `ORACLE_USER` | SSH user | `ubuntu` or `opc` |
| `KEY_FILE` | SSH key path | `oracle-key.pem` |
| `GITHUB_WEBHOOK_SECRET` | Webhook secret | `random_hex_string` |
| `GITHUB_TOKEN` | GitHub PAT | `ghp_xxxxx` |
| `ANTHROPIC_API_KEY` | Claude API key | `sk-ant-xxxxx` |
| `AUTO_MERGE` | Auto-merge PRs | `false` (default) |
| `MAX_FIX_ITERATIONS` | Max fix attempts | `3` (default) |

## What Happens After Deployment?

1. **Push to GitHub** → Webhook triggers agent
2. **Agent clones repo** → Runs Playwright tests
3. **If tests fail** → Agent analyzes with Claude AI
4. **Generates fixes** → Creates new branch with code changes
5. **Opens PR** → With detailed fix explanation
6. **Re-tests** → Verifies fixes work
7. **Iterates** → Up to 3 times until tests pass

The agent runs **24/7** and monitors all pushes and PRs automatically!

## Cost Estimate (Oracle Cloud Free Tier)

Oracle Cloud offers **Always Free** tier:
- ✅ 2 AMD-based Compute VMs (1/8 OCPU, 1 GB RAM each)
- ✅ Up to 4 Arm-based Ampere A1 cores (24 GB RAM)
- ✅ 200 GB block storage
- ✅ 10 GB outbound data transfer/month

**Perfect for running this agent at ZERO cost!**

## Updating the Agent

```bash
# On your local machine
cd ~/github/taxedgmbh/taxed.ch/server

# Pull latest changes
git pull

# Redeploy
./deploy-oracle.sh
```

## Support

- Agent logs: `/home/ubuntu/apple-design-validator/server/logs/`
- Docker logs: `docker-compose logs -f`
- Health check: `curl http://YOUR-IP:3000/health`

---

🤖 **Apple Design Validator** - Running autonomously on Oracle Cloud!
