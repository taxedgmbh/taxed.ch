#!/bin/bash

# Simple Docker test script for macOS
# This script tests if Docker is working properly

set -e

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

echo "🧪 Docker Test Script for macOS"
echo "==============================="
echo ""

# Test 1: Check if Docker is installed
print_status "Testing Docker installation..."
if command -v docker &> /dev/null; then
    print_success "Docker is installed: $(docker --version)"
else
    print_error "Docker is not installed. Please install Docker Desktop for Mac."
    exit 1
fi

# Test 2: Check if Docker is running
print_status "Testing Docker daemon..."
if docker info &> /dev/null; then
    print_success "Docker daemon is running"
else
    print_error "Docker daemon is not running. Please start Docker Desktop."
    exit 1
fi

# Test 3: Check Docker Compose
print_status "Testing Docker Compose..."
if command -v docker-compose &> /dev/null; then
    print_success "Docker Compose is available: $(docker-compose --version)"
    COMPOSE_CMD="docker-compose"
elif docker compose version &> /dev/null; then
    print_success "Docker Compose is available: $(docker compose version)"
    COMPOSE_CMD="docker compose"
else
    print_error "Docker Compose is not available."
    exit 1
fi

# Test 4: Test basic Docker functionality
print_status "Testing basic Docker functionality..."
if docker run --rm hello-world &> /dev/null; then
    print_success "Docker basic functionality works"
else
    print_error "Docker basic functionality test failed"
    exit 1
fi

# Test 5: Check system resources
print_status "Checking system resources..."
total_mem=$(sysctl -n hw.memsize)
total_mem_gb=$((total_mem / 1024 / 1024 / 1024))
if [ $total_mem_gb -ge 4 ]; then
    print_success "System has $total_mem_gb GB RAM (4GB+ required)"
else
    print_warning "System has $total_mem_gb GB RAM (4GB+ recommended)"
fi

# Test 6: Check available disk space
print_status "Checking available disk space..."
available_space=$(df -h . | awk 'NR==2 {print $4}' | sed 's/G//')
if [ ${available_space%.*} -ge 10 ]; then
    print_success "Available disk space: ${available_space}GB (10GB+ required)"
else
    print_warning "Available disk space: ${available_space}GB (10GB+ recommended)"
fi

# Test 7: Check if ports are available
print_status "Checking port availability..."
ports=(80 3000 3306 6379)
for port in "${ports[@]}"; do
    if lsof -i :$port &> /dev/null; then
        print_warning "Port $port is already in use"
    else
        print_success "Port $port is available"
    fi
done

# Test 8: Check if project files exist
print_status "Checking project files..."
required_files=("Dockerfile" "docker-compose.yml" "nginx.conf" "package.json")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        print_success "Found $file"
    else
        print_error "Missing $file"
        exit 1
    fi
done

# Test 9: Check if scripts are executable
print_status "Checking script permissions..."
scripts=("macos-deploy.sh" "docker-deploy.sh")
for script in "${scripts[@]}"; do
    if [ -f "$script" ]; then
        if [ -x "$script" ]; then
            print_success "$script is executable"
        else
            print_warning "$script is not executable, fixing..."
            chmod +x "$script"
            print_success "$script is now executable"
        fi
    fi
done

echo ""
print_success "🎉 All Docker tests passed!"
print_status "You can now run:"
echo "  ./macos-deploy.sh deploy    # Deploy development version"
echo "  ./macos-deploy.sh prod      # Deploy production version"
echo "  ./macos-deploy.sh help      # Show help"
echo ""
print_status "Your system is ready for Docker deployment! 🐳"
