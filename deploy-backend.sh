#!/bin/bash

# Taxed GmbH Website - Backend Deployment
# Uploads backend PHP files to server

set -e

echo "🚀 Starting Backend Deployment..."

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

print_status "Uploading backend files..."

# Upload backend PHP files
for php_file in backend/*.php; do
    if [ -f "$php_file" ]; then
        filename=$(basename "$php_file")
        curl -T "$php_file" ftp://$FTP_USER:$FTP_PASS@$FTP_HOST/backend/
        if [ $? -eq 0 ]; then
            print_success "✅ $filename uploaded"
        else
            print_error "❌ Failed to upload $filename"
        fi
    fi
done

# Upload backend models
for php_file in backend/models/*.php; do
    if [ -f "$php_file" ]; then
        filename=$(basename "$php_file")
        curl -T "$php_file" ftp://$FTP_USER:$FTP_PASS@$FTP_HOST/backend/models/
        if [ $? -eq 0 ]; then
            print_success "✅ models/$filename uploaded"
        else
            print_error "❌ Failed to upload models/$filename"
        fi
    fi
done

# Upload backend config
for php_file in backend/config/*.php; do
    if [ -f "$php_file" ]; then
        filename=$(basename "$php_file")
        curl -T "$php_file" ftp://$FTP_USER:$FTP_PASS@$FTP_HOST/backend/config/
        if [ $? -eq 0 ]; then
            print_success "✅ config/$filename uploaded"
        else
            print_error "❌ Failed to upload config/$filename"
        fi
    fi
done

# Upload backend middleware
for php_file in backend/middleware/*.php; do
    if [ -f "$php_file" ]; then
        filename=$(basename "$php_file")
        curl -T "$php_file" ftp://$FTP_USER:$FTP_PASS@$FTP_HOST/backend/middleware/
        if [ $? -eq 0 ]; then
            print_success "✅ middleware/$filename uploaded"
        else
            print_error "❌ Failed to upload middleware/$filename"
        fi
    fi
done

# Upload backend utils
for php_file in backend/utils/*.php; do
    if [ -f "$php_file" ]; then
        filename=$(basename "$php_file")
        curl -T "$php_file" ftp://$FTP_USER:$FTP_PASS@$FTP_HOST/backend/utils/
        if [ $? -eq 0 ]; then
            print_success "✅ utils/$filename uploaded"
        else
            print_error "❌ Failed to upload utils/$filename"
        fi
    fi
done

# Upload SQL files
for sql_file in backend/*.sql; do
    if [ -f "$sql_file" ]; then
        filename=$(basename "$sql_file")
        curl -T "$sql_file" ftp://$FTP_USER:$FTP_PASS@$FTP_HOST/backend/
        if [ $? -eq 0 ]; then
            print_success "✅ $filename uploaded"
        else
            print_error "❌ Failed to upload $filename"
        fi
    fi
done

print_success "🎉 Backend files successfully deployed!"
print_success "🌐 Test: https://taxed.ch/backend/test-connection.php"
print_success "🗣️ Forum API: https://taxed.ch/backend/forum-api.php"
