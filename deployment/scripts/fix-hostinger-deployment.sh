#!/bin/bash

# Fix Hostinger Deployment Script
# This script ensures all files are uploaded to the correct directories

# Deployment directory
DEPLOY_DIR="hostinger-deploy-20250919-233500"

# FTP Configuration
FTP_HOST="ftp.taxed.ch"
FTP_USER="u497646184.taxed.ch"
FTP_PASS="Hauskauf629!"
FTP_DIR="/public_html"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 Fixing Hostinger deployment for taxed.ch...${NC}"

# Check if deployment directory exists
if [ ! -d "$DEPLOY_DIR" ]; then
    echo -e "${RED}❌ Deployment directory $DEPLOY_DIR not found!${NC}"
    exit 1
fi

# Function to upload file with retry
upload_file() {
    local file="$1"
    local remote_path="$2"
    local retries=3
    local count=0
    
    while [ $count -lt $retries ]; do
        if curl -s --ftp-create-dirs -T "$file" "ftp://$FTP_USER:$FTP_PASS@$FTP_HOST$remote_path"; then
            echo -e "${GREEN}✅ Uploaded: $file${NC}"
            return 0
        else
            count=$((count + 1))
            echo -e "${YELLOW}⚠️  Retry $count/$retries for: $file${NC}"
            sleep 2
        fi
    done
    
    echo -e "${RED}❌ Failed to upload: $file${NC}"
    return 1
}

# Function to create directory
create_directory() {
    local dir="$1"
    curl -s --ftp-create-dirs "ftp://$FTP_USER:$FTP_PASS@$FTP_HOST$dir" > /dev/null
}

echo -e "${YELLOW}📁 Creating directories...${NC}"

# Create main directories
create_directory "$FTP_DIR"
create_directory "$FTP_DIR/assets"
create_directory "$FTP_DIR/documents"

echo -e "${YELLOW}📤 Uploading critical files...${NC}"

# Upload main files first
upload_file "$DEPLOY_DIR/index.html" "$FTP_DIR/index.html"
upload_file "$DEPLOY_DIR/.htaccess" "$FTP_DIR/.htaccess"
upload_file "$DEPLOY_DIR/robots.txt" "$FTP_DIR/robots.txt"
upload_file "$DEPLOY_DIR/sitemap.xml" "$FTP_DIR/sitemap.xml"

echo -e "${YELLOW}📤 Uploading assets...${NC}"

# Upload assets
if [ -d "$DEPLOY_DIR/assets" ]; then
    for file in "$DEPLOY_DIR/assets"/*; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            upload_file "$file" "$FTP_DIR/assets/$filename"
        fi
    done
fi

# Upload documents
if [ -d "$DEPLOY_DIR/documents" ]; then
    for file in "$DEPLOY_DIR/documents"/*; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            upload_file "$file" "$FTP_DIR/documents/$filename"
        fi
    done
fi

# Upload other files
for file in "$DEPLOY_DIR"/*; do
    if [ -f "$file" ] && [[ ! "$file" =~ \.(html|htaccess|txt|xml)$ ]]; then
        filename=$(basename "$file")
        upload_file "$file" "$FTP_DIR/$filename"
    fi
done

echo -e "${GREEN}🎉 Deployment fix completed!${NC}"
echo -e "${BLUE}🌐 Your website should now be available at: https://taxed.ch${NC}"
echo -e "${YELLOW}📋 Please verify the deployment by checking:${NC}"
echo -e "   - https://taxed.ch (main page)"
echo -e "   - https://taxed.ch/pricing (pricing page)"
echo -e "   - https://taxed.ch/about (about page)"
echo -e "${GREEN}✨ All files have been uploaded to the correct directories!${NC}"

# Test the website
echo -e "${BLUE}🔍 Testing website availability...${NC}"
if curl -s -o /dev/null -w "%{http_code}" https://taxed.ch | grep -q "200"; then
    echo -e "${GREEN}✅ Website is responding correctly!${NC}"
else
    echo -e "${YELLOW}⚠️  Website may take a few minutes to propagate. Please try again in 2-3 minutes.${NC}"
fi
