#!/bin/bash

# Taxed GmbH Docker Deployment Script for macOS
# This script deploys the Taxed GmbH website using Docker on macOS

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

# Check if Docker is installed and running
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker Desktop for Mac."
        print_status "Download from: https://www.docker.com/products/docker-desktop/"
        exit 1
    fi
    
    if ! docker info &> /dev/null; then
        print_error "Docker is not running. Please start Docker Desktop."
        exit 1
    fi
    
    print_success "Docker is available: $(docker --version)"
}

# Check if Docker Compose is available
check_docker_compose() {
    if command -v docker-compose &> /dev/null; then
        COMPOSE_CMD="docker-compose"
        print_success "Docker Compose is available: $(docker-compose --version)"
    elif docker compose version &> /dev/null; then
        COMPOSE_CMD="docker compose"
        print_success "Docker Compose is available: $(docker compose version)"
    else
        print_error "Docker Compose is not available. Please install Docker Compose."
        exit 1
    fi
}

# Deploy function
deploy_application() {
    local environment=${1:-dev}
    
    print_status "🚀 Starting Taxed GmbH Docker Deployment ($environment)..."
    
    # Stop existing containers
    print_status "Stopping existing containers..."
    if [ "$environment" = "prod" ]; then
        $COMPOSE_CMD -f docker-compose.prod.yml down 2>/dev/null || true
    else
        $COMPOSE_CMD down 2>/dev/null || true
    fi
    
    # Build and start containers
    if [ "$environment" = "prod" ]; then
        print_status "Building production containers..."
        $COMPOSE_CMD -f docker-compose.prod.yml build --no-cache
        
        if [ $? -ne 0 ]; then
            print_error "Failed to build production containers."
            exit 1
        fi
        
        print_status "Starting production containers..."
        $COMPOSE_CMD -f docker-compose.prod.yml up -d
        
        if [ $? -ne 0 ]; then
            print_error "Failed to start production containers."
            exit 1
        fi
    else
        print_status "Building development containers..."
        $COMPOSE_CMD build --no-cache
        
        if [ $? -ne 0 ]; then
            print_error "Failed to build development containers."
            exit 1
        fi
        
        print_status "Starting development containers..."
        $COMPOSE_CMD up -d
        
        if [ $? -ne 0 ]; then
            print_error "Failed to start development containers."
            exit 1
        fi
    fi
    
    # Wait for services to be ready
    print_status "Waiting for services to be ready..."
    sleep 15
    
    # Check health
    print_status "Checking service health..."
    if curl -f http://localhost/health > /dev/null 2>&1; then
        print_success "✅ Frontend is healthy!"
    else
        print_warning "⚠️  Frontend health check failed, but service might still be starting..."
    fi
    
    # Show running containers
    print_status "Running containers:"
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    
    print_success "🎉 Deployment completed!"
    print_status "Your website is available at:"
    echo "  🌐 Frontend: http://localhost"
    echo "  🔧 Backend API: http://localhost:3000"
    echo "  🗄️  Database: localhost:3306"
    echo "  📊 Redis: localhost:6379"
}

# Stop function
stop_services() {
    print_status "Stopping all services..."
    $COMPOSE_CMD down
    $COMPOSE_CMD -f docker-compose.prod.yml down 2>/dev/null || true
    print_success "All services stopped."
}

# Logs function
show_logs() {
    local service=${1:-frontend}
    print_status "Showing logs for $service..."
    $COMPOSE_CMD logs -f $service
}

# Clean function
clean_resources() {
    print_status "Cleaning up Docker resources..."
    $COMPOSE_CMD down -v
    $COMPOSE_CMD -f docker-compose.prod.yml down -v 2>/dev/null || true
    docker system prune -f
    print_success "Cleanup completed."
}

# Help function
show_help() {
    echo "Taxed GmbH Docker Deployment Script for macOS"
    echo ""
    echo "Usage: ./macos-deploy.sh [command] [options]"
    echo ""
    echo "Commands:"
    echo "  deploy [dev|prod]  Deploy the application (default: dev)"
    echo "  prod              Deploy production version"
    echo "  stop              Stop all services"
    echo "  logs [service]    Show logs for a service (default: frontend)"
    echo "  clean             Clean up Docker resources"
    echo "  help              Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./macos-deploy.sh deploy         # Deploy development version"
    echo "  ./macos-deploy.sh prod           # Deploy production version"
    echo "  ./macos-deploy.sh logs frontend  # Show frontend logs"
    echo "  ./macos-deploy.sh stop          # Stop all services"
    echo ""
    echo "Prerequisites:"
    echo "  - Docker Desktop for Mac must be installed and running"
    echo "  - At least 2GB RAM and 10GB disk space available"
    echo "  - macOS 10.15+ (Catalina) or later"
}

# Main script logic
echo "🐳 Taxed GmbH Docker Deployment Script for macOS"
echo "================================================"
echo ""

# Check prerequisites
check_docker
check_docker_compose

# Execute command
case "${1:-deploy}" in
    "deploy")
        env=${2:-dev}
        deploy_application $env
        ;;
    "prod")
        deploy_application "prod"
        ;;
    "stop")
        stop_services
        ;;
    "logs")
        show_logs "$2"
        ;;
    "clean")
        clean_resources
        ;;
    "help")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo "Use './macos-deploy.sh help' for usage information."
        exit 1
        ;;
esac
