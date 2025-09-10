#!/bin/bash

# Verify Website Upload
echo "🔍 Verifying Website Upload..."

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

# Test website accessibility
print_status "Testing website accessibility..."

# Test main page
if curl -s --head https://taxed.ch | head -n 1 | grep -q "200 OK"; then
    print_success "✅ Main page is accessible"
else
    print_error "❌ Main page not accessible"
fi

# Test specific files
files_to_test=(
    "https://taxed.ch/index.html"
    "https://taxed.ch/.htaccess"
    "https://taxed.ch/robots.txt"
    "https://taxed.ch/sitemap.xml"
    "https://taxed.ch/rss.xml"
)

for file in "${files_to_test[@]}"; do
    if curl -s --head "$file" | head -n 1 | grep -q "200 OK"; then
        print_success "✅ $file is accessible"
    else
        print_error "❌ $file not accessible"
    fi
done

# Test assets
print_status "Testing assets..."
if curl -s --head "https://taxed.ch/assets/" | head -n 1 | grep -q "200 OK\|403 Forbidden"; then
    print_success "✅ Assets directory is accessible"
else
    print_error "❌ Assets directory not accessible"
fi

# Test documents
print_status "Testing documents..."
if curl -s --head "https://taxed.ch/documents/" | head -n 1 | grep -q "200 OK\|403 Forbidden"; then
    print_success "✅ Documents directory is accessible"
else
    print_error "❌ Documents directory not accessible"
fi

echo ""
print_status "Website Verification Complete!"
print_status "If all tests passed, your website is live at: https://taxed.ch"
print_status "If some tests failed, please check the File Manager upload."
