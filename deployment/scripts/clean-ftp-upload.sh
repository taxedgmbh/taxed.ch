#!/bin/bash

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
NC='\033[0m' # No Color

echo -e "${GREEN}🧹 Starting CLEAN deployment to taxed.ch...${NC}"

# Check if deployment directory exists
if [ ! -d "$DEPLOY_DIR" ]; then
    echo -e "${RED}❌ Deployment directory $DEPLOY_DIR not found!${NC}"
    exit 1
fi

# Function to delete file/directory with retry
delete_remote() {
    local path="$1"
    local retries=3
    local count=0
    
    while [ $count -lt $retries ]; do
        if curl -s --ftp-create-dirs "ftp://$FTP_USER:$FTP_PASS@$FTP_HOST$path" -Q "DELE $path" > /dev/null 2>&1; then
            echo -e "${GREEN}🗑️  Deleted: $path${NC}"
            return 0
        else
            count=$((count + 1))
            echo -e "${YELLOW}⚠️  Retry $count/$retries for delete: $path${NC}"
            sleep 1
        fi
    done
    
    echo -e "${YELLOW}⚠️  Could not delete: $path (may not exist)${NC}"
    return 1
}

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

echo -e "${YELLOW}🧹 Cleaning old files...${NC}"

# Clean old assets directory
delete_remote "$FTP_DIR/assets"

# Clean old main files
delete_remote "$FTP_DIR/index.html"
delete_remote "$FTP_DIR/.htaccess"
delete_remote "$FTP_DIR/robots.txt"
delete_remote "$FTP_DIR/sitemap.xml"

echo -e "${YELLOW}📁 Creating fresh directories...${NC}"

# Create main directories
create_directory "$FTP_DIR"
create_directory "$FTP_DIR/assets"

echo -e "${YELLOW}📤 Uploading fresh files...${NC}"

# Upload main files
upload_file "$DEPLOY_DIR/index.html" "$FTP_DIR/index.html"
upload_file "$DEPLOY_DIR/.htaccess" "$FTP_DIR/.htaccess"
upload_file "$DEPLOY_DIR/robots.txt" "$FTP_DIR/robots.txt"
upload_file "$DEPLOY_DIR/sitemap.xml" "$FTP_DIR/sitemap.xml"

# Upload assets
if [ -d "$DEPLOY_DIR/assets" ]; then
    for file in "$DEPLOY_DIR/assets"/*; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            upload_file "$file" "$FTP_DIR/assets/$filename"
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

echo -e "${GREEN}🎉 CLEAN deployment completed!${NC}"
echo -e "${YELLOW}🌐 Your website should be available at: https://taxed.ch${NC}"
echo -e "${YELLOW}📋 Please verify the deployment by checking:${NC}"
echo -e "   - https://taxed.ch (main page)"
echo -e "   - https://taxed.ch/pricing (pricing page)"
echo -e "   - https://taxed.ch/about (about page)"
echo -e "${GREEN}✨ All old files have been cleaned and fresh assets uploaded!${NC}"
