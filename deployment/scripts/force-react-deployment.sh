#!/bin/bash

# Force React Deployment Script
# This script ensures React app takes precedence over default Hostinger pages

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

echo -e "${BLUE}🚀 Force deploying React app to taxed.ch...${NC}"

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
create_directory "$FTP_DIR"
create_directory "$FTP_DIR/assets"
create_directory "$FTP_DIR/documents"

echo -e "${YELLOW}📤 Uploading React app files...${NC}"

# Upload main files
upload_file "hostinger-deploy-20250919-233500/index.html" "$FTP_DIR/index.html"
upload_file "hostinger-deploy-20250919-233500/.htaccess" "$FTP_DIR/.htaccess"
upload_file "hostinger-deploy-20250919-233500/robots.txt" "$FTP_DIR/robots.txt"
upload_file "hostinger-deploy-20250919-233500/sitemap.xml" "$FTP_DIR/sitemap.xml"

# Upload assets
if [ -d "hostinger-deploy-20250919-233500/assets" ]; then
    for file in hostinger-deploy-20250919-233500/assets/*; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            upload_file "$file" "$FTP_DIR/assets/$filename"
        fi
    done
fi

# Upload documents
if [ -d "hostinger-deploy-20250919-233500/documents" ]; then
    for file in hostinger-deploy-20250919-233500/documents/*; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            upload_file "$file" "$FTP_DIR/documents/$filename"
        fi
    done
fi

# Upload other files
for file in hostinger-deploy-20250919-233500/*; do
    if [ -f "$file" ] && [[ ! "$file" =~ \.(html|htaccess|txt|xml|php)$ ]]; then
        filename=$(basename "$file")
        upload_file "$file" "$FTP_DIR/$filename"
    fi
done

echo -e "${GREEN}🎉 Force deployment completed!${NC}"
echo -e "${BLUE}🌐 Your React app should now be available at: https://taxed.ch${NC}"
echo -e "${YELLOW}📋 Please verify the deployment by checking:${NC}"
echo -e "   - https://taxed.ch (main page)"
echo -e "   - https://taxed.ch/pricing (pricing page)"
echo -e "   - https://taxed.ch/about (about page)"
echo -e "${GREEN}✨ React app has been force deployed!${NC}"

# Test the website
echo -e "${BLUE}🔍 Testing website...${NC}"
sleep 5
if curl -s https://taxed.ch | grep -q "Taxed GmbH"; then
    echo -e "${GREEN}✅ React app is now live!${NC}"
else
    echo -e "${YELLOW}⚠️  Still showing default page. This may take a few minutes to propagate.${NC}"
    echo -e "${BLUE}💡 Try clearing your browser cache or try in incognito mode.${NC}"
fi
