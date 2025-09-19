#!/bin/bash

# Taxed GmbH Docker Deployment Script
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

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Function to build and deploy
deploy() {
    local environment=${1:-dev}
    
    print_status "🚀 Starting Taxed GmbH Docker Deployment ($environment)..."
    
    # Stop existing containers
    print_status "Stopping existing containers..."
    docker-compose -f docker-compose.yml down 2>/dev/null || true
    
    if [ "$environment" = "prod" ]; then
        docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
    fi
    
    # Build and start containers
    if [ "$environment" = "prod" ]; then
        print_status "Building production containers..."
        docker-compose -f docker-compose.prod.yml build --no-cache
        
        print_status "Starting production containers..."
        docker-compose -f docker-compose.prod.yml up -d
    else
        print_status "Building development containers..."
        docker-compose build --no-cache
        
        print_status "Starting development containers..."
        docker-compose up -d
    fi
    
    # Wait for services to be ready
    print_status "Waiting for services to be ready..."
    sleep 10
    
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

# Function to stop services
stop() {
    print_status "Stopping all services..."
    docker-compose down
    docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
    print_success "All services stopped."
}

# Function to show logs
logs() {
    local service=${1:-frontend}
    print_status "Showing logs for $service..."
    docker-compose logs -f $service
}

# Function to clean up
clean() {
    print_status "Cleaning up Docker resources..."
    docker-compose down -v
    docker-compose -f docker-compose.prod.yml down -v 2>/dev/null || true
    docker system prune -f
    print_success "Cleanup completed."
}

# Main script logic
case "${1:-deploy}" in
    "deploy")
        deploy "${2:-dev}"
        ;;
    "prod")
        deploy "prod"
        ;;
    "stop")
        stop
        ;;
    "logs")
        logs "$2"
        ;;
    "clean")
        clean
        ;;
    "help")
        echo "Taxed GmbH Docker Deployment Script"
        echo ""
        echo "Usage: $0 [command] [options]"
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
        echo "  $0 deploy         # Deploy development version"
        echo "  $0 prod           # Deploy production version"
        echo "  $0 logs frontend  # Show frontend logs"
        echo "  $0 stop          # Stop all services"
        ;;
    *)
        print_error "Unknown command: $1"
        echo "Use '$0 help' for usage information."
        exit 1
        ;;
esac
