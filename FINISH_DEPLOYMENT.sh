#!/bin/bash

###############################################################################
# Apple Design Validator - Quick Manual Completion
#
# Run this script to finish the deployment in 3 minutes
# All files and configuration are already on the Oracle server
###############################################################################

set -e

echo "🚀 Finishing Apple Design Validator Deployment..."
echo ""
echo "Connecting to Oracle Cloud: 152.67.78.28"
echo ""

# SSH into Oracle and complete setup
ssh -i ~/.ssh/oracle-taxedgmbh.key opc@152.67.78.28 << 'ENDSSH'
set -e

echo "✓ Connected to Oracle Cloud"
echo ""

# Kill any stuck processes
echo "→ Cleaning up stuck processes..."
sudo pkill -f "dnf install" 2>/dev/null || true
sleep 2

# Install Node.js (from Oracle repos - faster)
echo "→ Installing Node.js..."
if ! command -v node &> /dev/null; then
    sudo dnf install -y nodejs npm
fi

# Verify installation
echo "→ Verifying Node.js..."
node --version
npm --version

# Navigate to agent directory
cd /home/opc/apple-design-validator/server

# Install dependencies
echo "→ Installing agent dependencies..."
npm install --production

# Open firewall
echo "→ Opening firewall port 3000..."
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload

# Start the agent
echo "→ Starting Apple Design Validator Agent..."
nohup node agent-server.js > /tmp/agent.log 2>&1 &
sleep 3

# Test health endpoint
echo "→ Testing agent..."
curl -s http://localhost:3000/health

echo ""
echo "✅ Apple Design Validator Agent is running!"
echo ""
echo "View logs: tail -f /tmp/agent.log"
echo "Health check: curl http://localhost:3000/health"
echo ""
ENDSSH

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║           🎉 Deployment Complete!                    ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo "Agent is now running at: http://152.67.78.28:3000"
echo ""
echo "Next Steps:"
echo "1. Test: curl http://152.67.78.28:3000/health"
echo "2. Configure GitHub webhook:"
echo "   URL: http://152.67.78.28:3000/webhook/github"
echo "   Secret: b8d1caff90f42e9c49e932627be57b48a17a2d174ffb2f3e99e5263d225b7eae"
echo ""
echo "🤖 Your autonomous agent is ready!"
