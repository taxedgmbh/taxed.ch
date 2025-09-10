#!/bin/bash

# Client Portal Backend Deployment Script
# Taxed.ch - Swiss Tax Consulting

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_header() {
    echo -e "${BLUE}🚀 $1${NC}"
}

# FTP Configuration
FTP_HOST="89.116.147.159"
FTP_USER="u497646184.taxed.ch"
FTP_PASS="Hauskauf629!"
FTP_DIR="/public_html"

print_header "Starting Client Portal Backend Deployment..."

# Check if backend directory exists
if [ ! -d "backend" ]; then
    print_error "Backend directory not found. Please run this script from the project root."
    exit 1
fi

print_info "Uploading backend files to Hostinger..."

# Create API directory and upload files
lftp -c "
set ftp:ssl-allow no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd $FTP_DIR
mkdir -p api
cd api
put backend/auth.php
put backend/client-portal.php
put backend/client-portal-schema.sql
quit
"

if [ $? -eq 0 ]; then
    print_success "Backend files uploaded successfully!"
else
    print_error "Failed to upload backend files"
    exit 1
fi

print_info "Setting file permissions..."

# Set correct file permissions
lftp -c "
set ftp:ssl-allow no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd $FTP_DIR/api
chmod 644 auth.php
chmod 644 client-portal.php
chmod 644 client-portal-schema.sql
quit
"

print_success "File permissions set successfully!"

print_info "Testing API endpoints..."

# Test API endpoints
echo "Testing authentication endpoint..."
AUTH_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "https://taxed.ch/api/auth.php?action=verify" -X POST -H "Content-Type: application/json" -d '{"sessionToken":"test"}')

if [ "$AUTH_RESPONSE" = "400" ] || [ "$AUTH_RESPONSE" = "401" ]; then
    print_success "Authentication API is responding correctly (HTTP $AUTH_RESPONSE)"
else
    print_warning "Authentication API returned unexpected response (HTTP $AUTH_RESPONSE)"
fi

echo "Testing client portal endpoint..."
PORTAL_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "https://taxed.ch/api/client-portal.php?action=dashboard")

if [ "$PORTAL_RESPONSE" = "401" ]; then
    print_success "Client Portal API is responding correctly (HTTP $PORTAL_RESPONSE - Authentication required)"
else
    print_warning "Client Portal API returned unexpected response (HTTP $PORTAL_RESPONSE)"
fi

print_header "Backend Deployment Summary"

echo ""
print_success "🎉 Backend deployment completed successfully!"
echo ""
print_info "📁 Files deployed:"
echo "   • /api/auth.php - Authentication system"
echo "   • /api/client-portal.php - Client portal API"
echo "   • /api/client-portal-schema.sql - Database schema"
echo ""
print_info "🔗 API Endpoints:"
echo "   • https://taxed.ch/api/auth.php - Authentication"
echo "   • https://taxed.ch/api/client-portal.php - Client portal"
echo ""
print_warning "⚠️  Next steps:"
echo "   1. Execute the database schema on Hostinger MySQL"
echo "   2. Test client registration and login"
echo "   3. Deploy the updated frontend"
echo "   4. Run comprehensive testing"
echo ""
print_info "📖 See CLIENT_PORTAL_PRODUCTION_PLAN.md for detailed next steps"
echo ""
print_success "Your client portal backend is now live! 🚀"
