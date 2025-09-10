#!/bin/bash

# Upload Assets and Documents to Hostinger
set -e

echo "🚀 Uploading Assets and Documents..."

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
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

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# FTP credentials
FTP_HOST="89.116.147.159"
FTP_USER="u497646184.taxed.ch"
FTP_PASS="Hauskauf629!"

# Check deployment directory
DEPLOY_DIR="hostinger-deploy-20250910-205111"
if [ ! -d "$DEPLOY_DIR" ]; then
    print_error "Deployment directory not found."
    exit 1
fi

# Upload assets directory
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

# Upload documents directory
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
sleep 3
if curl -s --head https://taxed.ch | head -n 1 | grep -q "200 OK"; then
    print_success "✅ Website is live and accessible!"
else
    print_warning "⚠️  Website may take a few minutes to update. Please check https://taxed.ch"
fi

echo ""
print_status "Upload Summary:"
echo "✅ Main files uploaded (index.html, .htaccess, etc.)"
echo "✅ Assets uploaded (CSS, JavaScript)"
echo "✅ Documents uploaded (PDF files)"
echo ""
print_status "Your website is now live at: https://taxed.ch"
print_status "Next steps:"
echo "1. 🔒 Enable SSL in Hostinger control panel"
echo "2. ⚡ Enable caching in Hostinger control panel"
echo "3. 🌐 Test all pages and functionality"
echo "4. 📊 Set up Google Analytics"
echo ""
print_success "Your Swiss tax website is now live! 🇨🇭🚀"
