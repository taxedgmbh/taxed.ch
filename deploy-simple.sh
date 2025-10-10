#!/bin/bash

# Taxed GmbH Website - Simple FTP Deployment
# Uses curl for FTP upload

set -e

echo "🚀 Starting Simple FTP Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
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

print_status "Uploading main files..."

# Upload index.html
curl -T dist/index.html ftp://$FTP_USER:$FTP_PASS@$FTP_HOST/
if [ $? -eq 0 ]; then
    print_success "✅ index.html uploaded"
else
    print_error "❌ Failed to upload index.html"
fi

# Upload CSS files
for css_file in dist/assets/*.css; do
    if [ -f "$css_file" ]; then
        filename=$(basename "$css_file")
        curl -T "$css_file" ftp://$FTP_USER:$FTP_PASS@$FTP_HOST/assets/
        if [ $? -eq 0 ]; then
            print_success "✅ $filename uploaded"
        else
            print_error "❌ Failed to upload $filename"
        fi
    fi
done

# Upload JS files
for js_file in dist/assets/*.js; do
    if [ -f "$js_file" ]; then
        filename=$(basename "$js_file")
        curl -T "$js_file" ftp://$FTP_USER:$FTP_PASS@$FTP_HOST/assets/
        if [ $? -eq 0 ]; then
            print_success "✅ $filename uploaded"
        else
            print_error "❌ Failed to upload $filename"
        fi
    fi
done

# Upload other files
for file in dist/*.xml dist/*.txt; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        curl -T "$file" ftp://$FTP_USER:$FTP_PASS@$FTP_HOST/
        if [ $? -eq 0 ]; then
            print_success "✅ $filename uploaded"
        else
            print_error "❌ Failed to upload $filename"
        fi
    fi
done

# Upload .htaccess file
if [ -f "public/.htaccess" ]; then
    curl -T public/.htaccess ftp://$FTP_USER:$FTP_PASS@$FTP_HOST/
    if [ $? -eq 0 ]; then
        print_success "✅ .htaccess uploaded"
    else
        print_error "❌ Failed to upload .htaccess"
    fi
else
    print_error "❌ .htaccess file not found in public/"
fi

print_success "🎉 Clean version successfully deployed online!"
print_success "🌐 Website: https://taxed.ch"
