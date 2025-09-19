#!/bin/bash

# Taxed GmbH Website - FTP Deployment Script
# Deploys the website to Hostinger via FTP

set -e

echo "🚀 Starting FTP Deployment to Hostinger..."

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

# Find the latest deployment directory
DEPLOY_DIR=$(ls -td hostinger-deploy-* 2>/dev/null | head -n1)

if [ -z "$DEPLOY_DIR" ]; then
    print_error "No deployment directory found. Run ./deploy-hostinger.sh first."
    exit 1
fi

print_status "Using deployment directory: $DEPLOY_DIR"

# Check if required files exist
if [ ! -f "$DEPLOY_DIR/index.html" ]; then
    print_error "index.html not found in deployment directory"
    exit 1
fi

print_status "Testing FTP connection..."
if ! curl --user "$FTP_USER:$FTP_PASS" "ftp://$FTP_HOST/" --silent --show-error > /dev/null; then
    print_error "FTP connection failed. Please check credentials."
    exit 1
fi

print_success "FTP connection successful!"

# Upload main files
print_status "Uploading main files..."

# Upload index.html
print_status "Uploading index.html..."
curl -T "$DEPLOY_DIR/index.html" \
     --user "$FTP_USER:$FTP_PASS" \
     "ftp://$FTP_HOST/index.html" \
     --silent --show-error

# Upload .htaccess
print_status "Uploading .htaccess..."
curl -T "$DEPLOY_DIR/.htaccess" \
     --user "$FTP_USER:$FTP_PASS" \
     "ftp://$FTP_HOST/.htaccess" \
     --silent --show-error

# Upload robots.txt
print_status "Uploading robots.txt..."
curl -T "$DEPLOY_DIR/robots.txt" \
     --user "$FTP_USER:$FTP_PASS" \
     "ftp://$FTP_HOST/robots.txt" \
     --silent --show-error

# Upload sitemap.xml
print_status "Uploading sitemap.xml..."
curl -T "$DEPLOY_DIR/sitemap.xml" \
     --user "$FTP_USER:$FTP_PASS" \
     "ftp://$FTP_HOST/sitemap.xml" \
     --silent --show-error

# Upload rss.xml
print_status "Uploading rss.xml..."
curl -T "$DEPLOY_DIR/rss.xml" \
     --user "$FTP_USER:$FTP_PASS" \
     "ftp://$FTP_HOST/rss.xml" \
     --silent --show-error

# Upload llms.txt
print_status "Uploading llms.txt..."
curl -T "$DEPLOY_DIR/llms.txt" \
     --user "$FTP_USER:$FTP_PASS" \
     "ftp://$FTP_HOST/llms.txt" \
     --silent --show-error

print_success "✅ Main files uploaded successfully!"

# Create and upload assets directory
print_status "Creating assets directory..."
curl --user "$FTP_USER:$FTP_PASS" \
     "ftp://$FTP_HOST/" \
     --silent --show-error \
     -Q "MKD assets" 2>/dev/null || true

print_status "Uploading CSS and JavaScript files..."
for file in "$DEPLOY_DIR/assets"/*; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        print_status "Uploading: $filename"
        curl -T "$file" \
             --user "$FTP_USER:$FTP_PASS" \
             "ftp://$FTP_HOST/assets/$filename" \
             --silent --show-error
        print_success "✅ Uploaded: $filename"
    fi
done

# Create and upload documents directory
print_status "Creating documents directory..."
curl --user "$FTP_USER:$FTP_PASS" \
     "ftp://$FTP_HOST/" \
     --silent --show-error \
     -Q "MKD documents" 2>/dev/null || true

print_status "Uploading PDF documents..."
for file in "$DEPLOY_DIR/documents"/*; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        print_status "Uploading: $filename"
        curl -T "$file" \
             --user "$FTP_USER:$FTP_PASS" \
             "ftp://$FTP_HOST/documents/$filename" \
             --silent --show-error
        print_success "✅ Uploaded: $filename"
    fi
done

print_success "🎉 All files uploaded successfully!"

# Test the website
print_status "Testing website..."
sleep 5

if curl -s --head https://taxed.ch | head -n 1 | grep -q "200 OK"; then
    print_success "✅ Website is live and accessible!"
else
    print_warning "⚠️  Website may take a few minutes to update. Please check https://taxed.ch"
fi

echo ""
print_success "🚀 DEPLOYMENT COMPLETED!"
echo ""
print_status "Your website is now live at: https://taxed.ch"
echo ""
print_status "Next steps:"
echo "1. 🔒 Enable SSL in Hostinger control panel (if not already enabled)"
echo "2. ⚡ Enable caching in Hostinger control panel"
echo "3. 🌐 Test all pages and functionality"
echo "4. 📊 Set up Google Analytics"
echo "5. 🔍 Submit sitemap to Google Search Console: https://taxed.ch/sitemap.xml"
echo ""
print_success "Your Swiss tax website is now live! 🇨🇭🚀"
