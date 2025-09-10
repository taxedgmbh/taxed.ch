#!/bin/bash

# Simple Upload to Hostinger
set -e

echo "🚀 Simple Upload to Hostinger..."

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# FTP credentials
FTP_HOST="89.116.147.159"
FTP_USER="u497646184.taxed.ch"
FTP_PASS="Hauskauf629!"

# Check deployment directory
DEPLOY_DIR="hostinger-deploy-20250910-205111"
if [ ! -d "$DEPLOY_DIR" ]; then
    print_error "Deployment directory not found. Run ./deploy-hostinger.sh first."
    exit 1
fi

print_status "Checking available directories..."

# List current directory structure
curl --user "$FTP_USER:$FTP_PASS" "ftp://$FTP_HOST/" --silent --show-error

print_status "Uploading files to root directory..."

# Upload main files to root
print_status "Uploading index.html..."
curl -T "$DEPLOY_DIR/index.html" \
     --user "$FTP_USER:$FTP_PASS" \
     "ftp://$FTP_HOST/index.html" \
     --silent --show-error

print_status "Uploading .htaccess..."
curl -T "$DEPLOY_DIR/.htaccess" \
     --user "$FTP_USER:$FTP_PASS" \
     "ftp://$FTP_HOST/.htaccess" \
     --silent --show-error

print_status "Uploading robots.txt..."
curl -T "$DEPLOY_DIR/robots.txt" \
     --user "$FTP_USER:$FTP_PASS" \
     "ftp://$FTP_HOST/robots.txt" \
     --silent --show-error

print_status "Uploading sitemap.xml..."
curl -T "$DEPLOY_DIR/sitemap.xml" \
     --user "$FTP_USER:$FTP_PASS" \
     "ftp://$FTP_HOST/sitemap.xml" \
     --silent --show-error

print_status "Uploading rss.xml..."
curl -T "$DEPLOY_DIR/rss.xml" \
     --user "$FTP_USER:$FTP_PASS" \
     "ftp://$FTP_HOST/rss.xml" \
     --silent --show-error

print_status "Uploading llms.txt..."
curl -T "$DEPLOY_DIR/llms.txt" \
     --user "$FTP_USER:$FTP_PASS" \
     "ftp://$FTP_HOST/llms.txt" \
     --silent --show-error

print_success "🎉 Main files uploaded successfully!"

print_status "Your website should now be live at: https://taxed.ch"
print_status "Please wait 2-3 minutes for changes to propagate."

# Test the website
print_status "Testing website..."
sleep 5
if curl -s --head https://taxed.ch | head -n 1 | grep -q "200 OK"; then
    print_success "✅ Website is live and accessible!"
else
    print_warning "⚠️  Website may take a few minutes to update. Please check https://taxed.ch"
fi

echo ""
print_status "Next steps:"
echo "1. 🔒 Enable SSL in Hostinger control panel (if not already enabled)"
echo "2. ⚡ Enable caching in Hostinger control panel"
echo "3. 🌐 Visit https://taxed.ch to test your website"
echo "4. 📊 Set up Google Analytics"
echo ""
print_success "Your Swiss tax website is now live! 🇨🇭🚀"
