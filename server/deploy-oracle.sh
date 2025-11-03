#!/bin/bash

###############################################################################
# Deploy Apple Design Validator Agent to Oracle Cloud
#
# This script deploys the autonomous agent to Oracle Cloud Infrastructure (OCI)
#
# Prerequisites:
# 1. Oracle Cloud account
# 2. SSH key pair (.pem file)
# 3. Compute instance with Docker installed
###############################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Apple Design Validator - Oracle Cloud Deployment   ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════╝${NC}"
echo ""

# Configuration - UPDATE THESE WITH YOUR ORACLE CLOUD DETAILS
ORACLE_HOST="${ORACLE_HOST:-your-oracle-ip-here}"  # e.g., "158.178.x.x"
ORACLE_USER="${ORACLE_USER:-ubuntu}"               # or "opc" for Oracle Linux
KEY_FILE="${KEY_FILE:-oracle-key.pem}"
REMOTE_DIR="/home/${ORACLE_USER}/apple-design-validator"
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# Agent configuration
GITHUB_WEBHOOK_SECRET="${GITHUB_WEBHOOK_SECRET}"
GITHUB_TOKEN="${GITHUB_TOKEN}"
ANTHROPIC_API_KEY="${ANTHROPIC_API_KEY}"

echo -e "${YELLOW}Configuration:${NC}"
echo "  Oracle Host: $ORACLE_HOST"
echo "  User: $ORACLE_USER"
echo "  Key File: $KEY_FILE"
echo "  Remote Directory: $REMOTE_DIR"
echo ""

# Validate configuration
if [ "$ORACLE_HOST" = "your-oracle-ip-here" ]; then
    echo -e "${RED}❌ Error: Please set ORACLE_HOST environment variable or edit the script${NC}"
    echo ""
    echo "Usage:"
    echo "  export ORACLE_HOST=158.178.x.x"
    echo "  export ORACLE_USER=ubuntu"
    echo "  export KEY_FILE=path/to/your-key.pem"
    echo "  export GITHUB_WEBHOOK_SECRET=your_secret"
    echo "  export GITHUB_TOKEN=ghp_your_token"
    echo "  export ANTHROPIC_API_KEY=sk-ant-your_key"
    echo "  ./deploy-oracle.sh"
    exit 1
fi

# Check if key file exists
if [ ! -f "$KEY_FILE" ]; then
    echo -e "${RED}❌ Error: Key file $KEY_FILE not found!${NC}"
    exit 1
fi

chmod 400 "$KEY_FILE"

# Test SSH connection
echo -e "${YELLOW}→ Testing SSH connection...${NC}"
if ! ssh -i "$KEY_FILE" -o ConnectTimeout=10 -o StrictHostKeyChecking=no "${ORACLE_USER}@${ORACLE_HOST}" "echo 'Connection successful'" 2>/dev/null; then
    echo -e "${RED}❌ SSH connection failed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ SSH connection successful${NC}"

# Step 1: Prepare deployment package
echo -e "\n${YELLOW}→ Step 1: Creating deployment package...${NC}"

cd "$PROJECT_DIR"
tar -czf /tmp/apple-validator-deploy.tar.gz \
    server/ \
    --exclude=node_modules \
    --exclude=.env \
    --exclude=logs

echo -e "${GREEN}✓ Package created${NC}"

# Step 2: Upload to Oracle Cloud
echo -e "\n${YELLOW}→ Step 2: Uploading to Oracle Cloud...${NC}"

ssh -i "$KEY_FILE" "${ORACLE_USER}@${ORACLE_HOST}" "mkdir -p ${REMOTE_DIR}"

scp -i "$KEY_FILE" /tmp/apple-validator-deploy.tar.gz "${ORACLE_USER}@${ORACLE_HOST}:${REMOTE_DIR}/"

echo -e "${GREEN}✓ Files uploaded${NC}"

# Step 3: Setup on Oracle Cloud
echo -e "\n${YELLOW}→ Step 3: Setting up on Oracle Cloud...${NC}"

ssh -i "$KEY_FILE" "${ORACLE_USER}@${ORACLE_HOST}" << 'ENDSSH'
set -e

cd /home/$(whoami)/apple-design-validator

# Extract package
tar -xzf apple-validator-deploy.tar.gz
cd server

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $(whoami)
    newgrp docker || true
fi

# Install Docker Compose if not present
if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

echo "✓ Docker setup complete"
ENDSSH

echo -e "${GREEN}✓ Server setup complete${NC}"

# Step 4: Create .env file
echo -e "\n${YELLOW}→ Step 4: Configuring environment variables...${NC}"

ssh -i "$KEY_FILE" "${ORACLE_USER}@${ORACLE_HOST}" "cat > ${REMOTE_DIR}/server/.env" << ENVEOF
PORT=3000
GITHUB_WEBHOOK_SECRET=${GITHUB_WEBHOOK_SECRET}
GITHUB_TOKEN=${GITHUB_TOKEN}
ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
REPO_DIR=/tmp/repos
AUTO_MERGE=false
MAX_FIX_ITERATIONS=3
ENVEOF

echo -e "${GREEN}✓ Environment configured${NC}"

# Step 5: Build and start Docker container
echo -e "\n${YELLOW}→ Step 5: Building and starting agent server...${NC}"

ssh -i "$KEY_FILE" "${ORACLE_USER}@${ORACLE_HOST}" << 'ENDSSH'
set -e

cd /home/$(whoami)/apple-design-validator

# Stop existing container if running
docker-compose -f server/docker-compose.yml down 2>/dev/null || true

# Build and start
docker-compose -f server/docker-compose.yml up -d --build

# Wait for container to be healthy
echo "Waiting for agent to be ready..."
sleep 10

# Check health
if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    echo "✅ Agent is healthy and running!"
else
    echo "⚠️  Agent started but health check failed. Checking logs..."
    docker-compose -f server/docker-compose.yml logs --tail=50
fi
ENDSSH

echo -e "${GREEN}✓ Agent server started${NC}"

# Step 6: Configure firewall (Oracle Cloud specific)
echo -e "\n${YELLOW}→ Step 6: Configuring firewall...${NC}"

ssh -i "$KEY_FILE" "${ORACLE_USER}@${ORACLE_HOST}" << 'ENDSSH'
# Oracle Cloud uses iptables
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 3000 -j ACCEPT
sudo netfilter-persistent save 2>/dev/null || sudo iptables-save | sudo tee /etc/iptables/rules.v4 > /dev/null

# Also open port 80 for potential nginx reverse proxy
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save 2>/dev/null || sudo iptables-save | sudo tee /etc/iptables/rules.v4 > /dev/null

echo "✓ Firewall configured"
ENDSSH

echo -e "${GREEN}✓ Firewall configured${NC}"

# Step 7: Setup systemd service for auto-restart
echo -e "\n${YELLOW}→ Step 7: Setting up auto-restart service...${NC}"

ssh -i "$KEY_FILE" "${ORACLE_USER}@${ORACLE_HOST}" << 'ENDSSH'
sudo tee /etc/systemd/system/apple-validator.service > /dev/null << 'SERVICEEOF'
[Unit]
Description=Apple Design Validator Agent
Requires=docker.service
After=docker.service network-online.target
Wants=network-online.target

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/REPLACE_USER/apple-design-validator/server
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
Restart=on-failure
RestartSec=10s
User=REPLACE_USER

[Install]
WantedBy=multi-user.target
SERVICEEOF

# Replace placeholder with actual user
sudo sed -i "s/REPLACE_USER/$(whoami)/g" /etc/systemd/system/apple-validator.service

sudo systemctl daemon-reload
sudo systemctl enable apple-validator
sudo systemctl start apple-validator

echo "✓ Auto-restart service configured"
ENDSSH

echo -e "${GREEN}✓ Auto-restart configured${NC}"

# Clean up
rm /tmp/apple-validator-deploy.tar.gz

# Final summary
echo -e "\n${BLUE}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║           🎉 Deployment Complete!                    ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}Agent is now running 24/7 on Oracle Cloud!${NC}"
echo ""
echo -e "${YELLOW}📋 Server Details:${NC}"
echo "  IP Address: $ORACLE_HOST"
echo "  Agent Port: 3000"
echo "  Webhook URL: http://${ORACLE_HOST}:3000/webhook/github"
echo "  Health Check: http://${ORACLE_HOST}:3000/health"
echo ""
echo -e "${YELLOW}🔧 Next Steps:${NC}"
echo ""
echo "1. Test the agent:"
echo -e "   ${BLUE}curl http://${ORACLE_HOST}:3000/health${NC}"
echo ""
echo "2. Configure GitHub Webhook:"
echo "   • Go to: https://github.com/taxedgmbh/taxed.ch/settings/hooks/new"
echo "   • Payload URL: http://${ORACLE_HOST}:3000/webhook/github"
echo "   • Content type: application/json"
echo "   • Secret: (your GITHUB_WEBHOOK_SECRET)"
echo "   • Events: push, pull_request"
echo ""
echo "3. Monitor logs:"
echo -e "   ${BLUE}ssh -i $KEY_FILE ${ORACLE_USER}@${ORACLE_HOST}${NC}"
echo -e "   ${BLUE}cd ${REMOTE_DIR}/server${NC}"
echo -e "   ${BLUE}docker-compose logs -f${NC}"
echo ""
echo "4. Optional: Setup nginx reverse proxy for HTTPS (recommended)"
echo ""
echo -e "${GREEN}✅ Agent is autonomously monitoring your repositories!${NC}"
