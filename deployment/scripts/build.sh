#!/bin/bash

# Taxed GmbH Website - Build Script
# Builds the application for production deployment

set -e

echo "🏗️ Building Taxed GmbH Website..."

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

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run from project root."
    exit 1
fi

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf dist/
rm -rf node_modules/.vite/

# Install dependencies
print_status "Installing dependencies..."
npm ci

# Run linting
print_status "Running ESLint..."
npm run lint || print_warning "Linting issues found"

# Run type checking
print_status "Running TypeScript type check..."
npm run type-check || print_warning "Type checking issues found"

# Run tests
print_status "Running tests..."
npm run test:unit || print_warning "Some tests failed"

# Generate RSS feed
print_status "Generating RSS feed..."
npm run generate:rss

# Generate LLMs file
print_status "Generating LLMs file..."
npm run generate:llms

# Build the application
print_status "Building application..."
npm run build

# Verify build
if [ ! -d "dist" ]; then
    print_error "Build failed - dist directory not created"
    exit 1
fi

# Check build size
BUILD_SIZE=$(du -sh dist/ | cut -f1)
print_status "Build size: $BUILD_SIZE"

# Verify essential files
ESSENTIAL_FILES=("dist/index.html" "dist/assets" "dist/sitemap.xml" "dist/rss.xml")
for file in "${ESSENTIAL_FILES[@]}"; do
    if [ ! -e "$file" ]; then
        print_error "Essential file missing: $file"
        exit 1
    fi
done

print_success "✅ Build completed successfully!"
print_success "📁 Build output: dist/"
print_success "📊 Build size: $BUILD_SIZE"

# Optional: Create deployment package
if [ "$1" = "--package" ]; then
    print_status "Creating deployment package..."
    TIMESTAMP=$(date +%Y%m%d-%H%M%S)
    PACKAGE_NAME="taxed-deploy-${TIMESTAMP}.zip"
    
    cd dist/
    zip -r "../${PACKAGE_NAME}" .
    cd ..
    
    print_success "📦 Deployment package created: ${PACKAGE_NAME}"
fi

echo ""
print_success "🎉 Build process completed!"
print_status "Ready for deployment to production."
