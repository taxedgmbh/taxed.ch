#!/bin/bash

# Taxed GmbH Website - Simple Backend Deployment
# Uploads backend PHP files to server root

set -e

echo "🚀 Starting Simple Backend Deployment..."

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

# Check if backend directory exists
if [ ! -d "backend" ]; then
    print_error "backend/ directory not found."
    exit 1
fi

print_status "Uploading backend files to root directory..."

# Upload main backend PHP files
for php_file in backend/*.php; do
    if [ -f "$php_file" ]; then
        filename=$(basename "$php_file")
        curl -T "$php_file" ftp://$FTP_USER:$FTP_PASS@$FTP_HOST/
        if [ $? -eq 0 ]; then
            print_success "✅ $filename uploaded"
        else
            print_error "❌ Failed to upload $filename"
        fi
    fi
done

# Upload SQL files
for sql_file in backend/*.sql; do
    if [ -f "$sql_file" ]; then
        filename=$(basename "$sql_file")
        curl -T "$sql_file" ftp://$FTP_USER:$FTP_PASS@$FTP_HOST/
        if [ $? -eq 0 ]; then
            print_success "✅ $filename uploaded"
        else
            print_error "❌ Failed to upload $filename"
        fi
    fi
done

print_success "🎉 Backend files successfully deployed!"
print_success "🌐 Test: https://taxed.ch/test-connection.php"
print_success "🗣️ Forum API: https://taxed.ch/forum-api.php"
