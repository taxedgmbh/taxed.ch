#!/bin/bash

# Taxed GmbH Website - Clean Deployment Script
# Deploys the clean version directly from dist/ folder

set -e

echo "🚀 Starting Clean Deployment to Hostinger..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# FTP credentials
FTP_HOST="89.116.147.159"
FTP_USER="u497646184.taxed.ch"
FTP_PASS="Hauskauf629!"

# Check if dist directory exists
if [ ! -d "dist" ]; then
    print_error "dist/ directory not found. Run 'npm run build' first."
    exit 1
fi

print_status "Deploying from dist/ directory..."

# Create a temporary deployment directory
DEPLOY_DIR="clean-deploy-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$DEPLOY_DIR"

# Copy dist contents to deployment directory
cp -r dist/* "$DEPLOY_DIR/"

# Copy additional files
cp public/* "$DEPLOY_DIR/" 2>/dev/null || true

print_status "Uploading to FTP server..."

# Upload using lftp
lftp -c "
set ftp:ssl-allow no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
lcd $DEPLOY_DIR
mirror -R --delete --verbose --exclude-glob .DS_Store
bye
"

if [ $? -eq 0 ]; then
    print_success "✅ Deployment completed successfully!"
    print_success "🌐 Website is now live at: https://taxed.ch"
    
    # Clean up deployment directory
    rm -rf "$DEPLOY_DIR"
    print_status "Cleaned up temporary files"
else
    print_error "❌ Deployment failed!"
    exit 1
fi

print_success "🎉 Clean version successfully deployed online!"
