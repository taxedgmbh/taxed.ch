#!/bin/bash

# Taxed GmbH Website - Hostinger Deployment Script
# This script builds and prepares the website for Hostinger deployment

set -e

echo "🚀 Starting Taxed GmbH Website Deployment to Hostinger..."

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

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root directory."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js and try again."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm and try again."
    exit 1
fi

print_status "Installing dependencies..."
npm install

print_status "Building production version..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    print_error "Build failed. dist directory not found."
    exit 1
fi

print_success "Build completed successfully!"

# Create deployment package
print_status "Creating deployment package..."

# Create a temporary directory for deployment
DEPLOY_DIR="hostinger-deploy-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$DEPLOY_DIR"

# Copy dist contents to deployment directory
cp -r dist/* "$DEPLOY_DIR/"

# Create .htaccess file for Hostinger
print_status "Creating .htaccess file for Hostinger..."
cat > "$DEPLOY_DIR/.htaccess" << 'EOF'
# .htaccess for Taxed.ch
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Force www (optional - uncomment if you want www.taxed.ch)
# RewriteCond %{HTTP_HOST} !^www\. [NC]
# RewriteRule ^(.*)$ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle React Router (SPA)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType application/pdf "access plus 1 month"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
EOF

# Create robots.txt
print_status "Creating robots.txt..."
cat > "$DEPLOY_DIR/robots.txt" << 'EOF'
User-agent: *
Allow: /

# Sitemap
Sitemap: https://taxed.ch/sitemap.xml

# Disallow admin areas (if any)
Disallow: /admin/
Disallow: /api/
EOF

# Create sitemap.xml
print_status "Creating sitemap.xml..."
cat > "$DEPLOY_DIR/sitemap.xml" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://taxed.ch/</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://taxed.ch/about</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://taxed.ch/services</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://taxed.ch/blog</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://taxed.ch/contact</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>https://taxed.ch/client-portal</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>https://taxed.ch/pricing</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://taxed.ch/store</loc>
        <lastmod>2025-01-15</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
</urlset>
EOF

# Create deployment instructions
print_status "Creating deployment instructions..."
cat > "$DEPLOY_DIR/DEPLOYMENT_INSTRUCTIONS.txt" << 'EOF'
TAXED.CH DEPLOYMENT INSTRUCTIONS
================================

1. LOGIN TO HOSTINGER
   - Go to: https://hpanel.hostinger.com
   - Login with your Hostinger credentials
   - Select your domain: taxed.ch

2. ACCESS FILE MANAGER
   - Click on "File Manager" in the control panel
   - Navigate to "public_html" directory

3. UPLOAD FILES
   - Delete all existing files in public_html (backup first if needed)
   - Upload ALL files from this directory to public_html
   - Make sure .htaccess file is uploaded (it might be hidden)

4. CONFIGURE SSL
   - Go to "SSL" in Hostinger control panel
   - Enable SSL for your domain
   - Wait 5-10 minutes for activation
   - Enable "Force HTTPS"

5. ENABLE CACHING
   - Go to "Performance" in Hostinger control panel
   - Enable: Browser Caching, Gzip Compression, Minify CSS/JS

6. TEST YOUR WEBSITE
   - Visit: https://taxed.ch
   - Test all pages and functionality
   - Check mobile responsiveness

7. SET UP ANALYTICS
   - Add Google Analytics tracking code
   - Set up Google Search Console
   - Submit sitemap: https://taxed.ch/sitemap.xml

IMPORTANT FILES TO UPLOAD:
- index.html (main page)
- assets/ folder (CSS and JS files)
- documents/ folder (PDF files)
- .htaccess (for URL rewriting and security)
- robots.txt (for search engines)
- sitemap.xml (for SEO)

SUPPORT:
- If you need help, check the HOSTINGER_DEPLOYMENT_GUIDE.md file
- For technical issues, contact your developer

Your website will be live at: https://taxed.ch
EOF

# Create ZIP file for easy upload
print_status "Creating ZIP file for easy upload..."
cd "$DEPLOY_DIR"
zip -r "../taxed-ch-deployment.zip" . -x "*.DS_Store" "*.git*"
cd ..

print_success "Deployment package created successfully!"
print_status "Deployment directory: $DEPLOY_DIR"
print_status "ZIP file: taxed-ch-deployment.zip"

echo ""
print_success "🎉 READY FOR HOSTINGER DEPLOYMENT!"
echo ""
print_status "Next steps:"
echo "1. 📁 Upload files from '$DEPLOY_DIR' to Hostinger public_html"
echo "2. 📄 Or upload 'taxed-ch-deployment.zip' and extract it"
echo "3. 🔒 Enable SSL in Hostinger control panel"
echo "4. ⚡ Enable caching in Hostinger control panel"
echo "5. 🌐 Visit https://taxed.ch to test your website"
echo ""
print_status "📖 Read DEPLOYMENT_INSTRUCTIONS.txt for detailed steps"
print_status "📚 Full guide available in HOSTINGER_DEPLOYMENT_GUIDE.md"
echo ""
print_warning "Remember to:"
echo "- Backup existing files before uploading"
echo "- Enable SSL certificate"
echo "- Test all pages after deployment"
echo "- Set up Google Analytics"
echo ""

# Show file sizes
print_status "Deployment package contents:"
ls -la "$DEPLOY_DIR"
echo ""
print_status "Total size: $(du -sh "$DEPLOY_DIR" | cut -f1)"
print_status "ZIP size: $(du -sh taxed-ch-deployment.zip | cut -f1)"

print_success "Deployment preparation completed! 🚀"
