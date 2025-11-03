#!/bin/bash

###############################################################################
# Deploy Apple Design Validator Agent to AWS EC2
#
# Prerequisites:
# 1. AWS CLI installed and configured
# 2. EC2 key pair created
# 3. Security group with ports 22, 80, 443, 3000 open
###############################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Apple Design Validator - AWS EC2 Deployment        ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════╝${NC}"
echo ""

# Configuration
AWS_REGION=${AWS_REGION:-us-east-1}
INSTANCE_TYPE=${INSTANCE_TYPE:-t3.medium}  # 2 vCPU, 4 GB RAM
AMI_ID=${AMI_ID:-ami-0c55b159cbfafe1f0}    # Ubuntu 22.04 LTS
KEY_NAME=${KEY_NAME:-apple-validator-key}
SECURITY_GROUP=${SECURITY_GROUP:-apple-validator-sg}

echo -e "${YELLOW}Configuration:${NC}"
echo "  Region: $AWS_REGION"
echo "  Instance Type: $INSTANCE_TYPE"
echo "  Key Name: $KEY_NAME"
echo ""

# Step 1: Create security group if it doesn't exist
echo -e "${YELLOW}→ Step 1: Checking security group...${NC}"
if ! aws ec2 describe-security-groups --group-names $SECURITY_GROUP --region $AWS_REGION &>/dev/null; then
  echo "Creating security group..."
  SG_ID=$(aws ec2 create-security-group \
    --group-name $SECURITY_GROUP \
    --description "Apple Design Validator Agent" \
    --region $AWS_REGION \
    --output text --query 'GroupId')

  # Allow SSH
  aws ec2 authorize-security-group-ingress \
    --group-id $SG_ID \
    --protocol tcp \
    --port 22 \
    --cidr 0.0.0.0/0 \
    --region $AWS_REGION

  # Allow HTTP
  aws ec2 authorize-security-group-ingress \
    --group-id $SG_ID \
    --protocol tcp \
    --port 80 \
    --cidr 0.0.0.0/0 \
    --region $AWS_REGION

  # Allow HTTPS
  aws ec2 authorize-security-group-ingress \
    --group-id $SG_ID \
    --protocol tcp \
    --port 443 \
    --cidr 0.0.0.0/0 \
    --region $AWS_REGION

  # Allow Agent Port
  aws ec2 authorize-security-group-ingress \
    --group-id $SG_ID \
    --protocol tcp \
    --port 3000 \
    --cidr 0.0.0.0/0 \
    --region $AWS_REGION

  echo -e "${GREEN}✓ Security group created: $SG_ID${NC}"
else
  SG_ID=$(aws ec2 describe-security-groups \
    --group-names $SECURITY_GROUP \
    --region $AWS_REGION \
    --query 'SecurityGroups[0].GroupId' \
    --output text)
  echo -e "${GREEN}✓ Using existing security group: $SG_ID${NC}"
fi

# Step 2: Create user data script
echo -e "\n${YELLOW}→ Step 2: Preparing user data script...${NC}"
cat > /tmp/user-data.sh <<'EOF'
#!/bin/bash
set -e

# Update system
apt-get update
apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker ubuntu

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Clone repository (replace with your repo)
cd /home/ubuntu
git clone https://github.com/taxedgmbh/taxed.ch.git
cd taxed.ch/server

# Create .env file (replace with your actual values)
cat > .env <<'ENVEOF'
PORT=3000
GITHUB_WEBHOOK_SECRET=your_secret_here
GITHUB_TOKEN=your_token_here
ANTHROPIC_API_KEY=your_anthropic_key_here
REPO_DIR=/tmp/repos
AUTO_MERGE=false
MAX_FIX_ITERATIONS=3
ENVEOF

# Build and start container
docker-compose up -d

# Setup systemd service for auto-restart
cat > /etc/systemd/system/apple-validator.service <<'SERVICEEOF'
[Unit]
Description=Apple Design Validator Agent
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/ubuntu/taxed.ch/server
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
Restart=on-failure

[Install]
WantedBy=multi-user.target
SERVICEEOF

systemctl enable apple-validator
systemctl start apple-validator

echo "✅ Apple Design Validator Agent deployed!"
EOF

# Step 3: Launch EC2 instance
echo -e "\n${YELLOW}→ Step 3: Launching EC2 instance...${NC}"
INSTANCE_ID=$(aws ec2 run-instances \
  --image-id $AMI_ID \
  --instance-type $INSTANCE_TYPE \
  --key-name $KEY_NAME \
  --security-group-ids $SG_ID \
  --user-data file:///tmp/user-data.sh \
  --region $AWS_REGION \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=Apple-Design-Validator}]' \
  --query 'Instances[0].InstanceId' \
  --output text)

echo -e "${GREEN}✓ Instance launched: $INSTANCE_ID${NC}"

# Step 4: Wait for instance to be running
echo -e "\n${YELLOW}→ Step 4: Waiting for instance to start...${NC}"
aws ec2 wait instance-running --instance-ids $INSTANCE_ID --region $AWS_REGION

# Get public IP
PUBLIC_IP=$(aws ec2 describe-instances \
  --instance-ids $INSTANCE_ID \
  --region $AWS_REGION \
  --query 'Reservations[0].Instances[0].PublicIpAddress' \
  --output text)

echo -e "${GREEN}✓ Instance running at: $PUBLIC_IP${NC}"

# Summary
echo -e "\n${BLUE}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║           Deployment Complete!                        ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}Instance Details:${NC}"
echo "  Instance ID: $INSTANCE_ID"
echo "  Public IP: $PUBLIC_IP"
echo "  Region: $AWS_REGION"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "  1. SSH into instance:"
echo "     ssh -i ~/.ssh/${KEY_NAME}.pem ubuntu@${PUBLIC_IP}"
echo ""
echo "  2. Configure GitHub webhook:"
echo "     URL: http://${PUBLIC_IP}:3000/webhook/github"
echo "     Secret: (your GITHUB_WEBHOOK_SECRET)"
echo "     Events: push, pull_request"
echo ""
echo "  3. Health check:"
echo "     curl http://${PUBLIC_IP}:3000/health"
echo ""
echo -e "${BLUE}Agent is now running 24/7!${NC}"
