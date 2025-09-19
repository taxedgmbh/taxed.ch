# Taxed GmbH Docker Deployment Script for PowerShell
# This script deploys the Taxed GmbH website using Docker on Windows

param(
    [Parameter(Position=0)]
    [ValidateSet("deploy", "prod", "stop", "logs", "clean", "help")]
    [string]$Command = "deploy",
    
    [Parameter(Position=1)]
    [string]$Service = "frontend"
)

# Colors for output
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"
$White = "White"

function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor $Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $Red
}

# Check if Docker is installed and running
function Test-Docker {
    try {
        $dockerVersion = docker --version 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Docker is not installed or not running. Please install Docker Desktop and start it."
            return $false
        }
        Write-Status "Docker is available: $dockerVersion"
        return $true
    }
    catch {
        Write-Error "Docker is not installed or not running. Please install Docker Desktop and start it."
        return $false
    }
}

# Check if Docker Compose is available
function Test-DockerCompose {
    try {
        # Try docker-compose first (older versions)
        $composeVersion = docker-compose --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Status "Docker Compose is available: $composeVersion"
            return $true
        }
        
        # Try docker compose (newer versions)
        Write-Warning "Docker Compose not found, trying 'docker compose' command..."
        $composeVersion = docker compose version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Status "Docker Compose is available: $composeVersion"
            return $true
        }
        
        Write-Error "Docker Compose is not available. Please install Docker Compose."
        return $false
    }
    catch {
        Write-Error "Docker Compose is not available. Please install Docker Compose."
        return $false
    }
}

# Deploy function
function Deploy-Application {
    param([string]$Environment = "dev")
    
    Write-Status "🚀 Starting Taxed GmbH Docker Deployment ($Environment)..."
    
    # Stop existing containers
    Write-Status "Stopping existing containers..."
    try {
        if ($Environment -eq "prod") {
            docker-compose -f docker-compose.prod.yml down 2>$null
        } else {
            docker-compose down 2>$null
        }
    }
    catch {
        Write-Warning "No existing containers to stop."
    }
    
    # Build and start containers
    if ($Environment -eq "prod") {
        Write-Status "Building production containers..."
        docker-compose -f docker-compose.prod.yml build --no-cache
        
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Failed to build production containers."
            return $false
        }
        
        Write-Status "Starting production containers..."
        docker-compose -f docker-compose.prod.yml up -d
        
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Failed to start production containers."
            return $false
        }
    } else {
        Write-Status "Building development containers..."
        docker-compose build --no-cache
        
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Failed to build development containers."
            return $false
        }
        
        Write-Status "Starting development containers..."
        docker-compose up -d
        
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Failed to start development containers."
            return $false
        }
    }
    
    # Wait for services to be ready
    Write-Status "Waiting for services to be ready..."
    Start-Sleep -Seconds 15
    
    # Check health
    Write-Status "Checking service health..."
    try {
        $response = Invoke-WebRequest -Uri "http://localhost/health" -TimeoutSec 10 -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            Write-Success "✅ Frontend is healthy!"
        } else {
            Write-Warning "⚠️  Frontend health check returned status: $($response.StatusCode)"
        }
    }
    catch {
        Write-Warning "⚠️  Frontend health check failed, but service might still be starting..."
    }
    
    # Show running containers
    Write-Status "Running containers:"
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    
    Write-Success "🎉 Deployment completed!"
    Write-Status "Your website is available at:"
    Write-Host "  🌐 Frontend: http://localhost" -ForegroundColor $Green
    Write-Host "  🔧 Backend API: http://localhost:3000" -ForegroundColor $Green
    Write-Host "  🗄️  Database: localhost:3306" -ForegroundColor $Green
    Write-Host "  📊 Redis: localhost:6379" -ForegroundColor $Green
    
    return $true
}

# Stop function
function Stop-Services {
    Write-Status "Stopping all services..."
    try {
        docker-compose down
        docker-compose -f docker-compose.prod.yml down 2>$null
        Write-Success "All services stopped."
    }
    catch {
        Write-Warning "Some services may not have been running."
    }
}

# Logs function
function Show-Logs {
    param([string]$ServiceName = "frontend")
    Write-Status "Showing logs for $ServiceName..."
    try {
        docker-compose logs -f $ServiceName
    }
    catch {
        Write-Error "Failed to show logs for $ServiceName"
    }
}

# Clean function
function Clean-Resources {
    Write-Status "Cleaning up Docker resources..."
    try {
        docker-compose down -v
        docker-compose -f docker-compose.prod.yml down -v 2>$null
        docker system prune -f
        Write-Success "Cleanup completed."
    }
    catch {
        Write-Warning "Some cleanup operations may have failed."
    }
}

# Help function
function Show-Help {
    Write-Host "Taxed GmbH Docker Deployment Script for PowerShell" -ForegroundColor $Blue
    Write-Host ""
    Write-Host "Usage: .\docker-deploy.ps1 [command] [options]" -ForegroundColor $White
    Write-Host ""
    Write-Host "Commands:" -ForegroundColor $Yellow
    Write-Host "  deploy [dev|prod]  Deploy the application (default: dev)" -ForegroundColor $White
    Write-Host "  prod              Deploy production version" -ForegroundColor $White
    Write-Host "  stop              Stop all services" -ForegroundColor $White
    Write-Host "  logs [service]    Show logs for a service (default: frontend)" -ForegroundColor $White
    Write-Host "  clean             Clean up Docker resources" -ForegroundColor $White
    Write-Host "  help              Show this help message" -ForegroundColor $White
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor $Yellow
    Write-Host "  .\docker-deploy.ps1 deploy         # Deploy development version" -ForegroundColor $White
    Write-Host "  .\docker-deploy.ps1 prod           # Deploy production version" -ForegroundColor $White
    Write-Host "  .\docker-deploy.ps1 logs frontend  # Show frontend logs" -ForegroundColor $White
    Write-Host "  .\docker-deploy.ps1 stop          # Stop all services" -ForegroundColor $White
    Write-Host ""
    Write-Host "Prerequisites:" -ForegroundColor $Yellow
    Write-Host "  - Docker Desktop must be installed and running" -ForegroundColor $White
    Write-Host "  - PowerShell execution policy must allow script execution" -ForegroundColor $White
    Write-Host "  - At least 2GB RAM and 10GB disk space available" -ForegroundColor $White
}

# Main script logic
Write-Host "🐳 Taxed GmbH Docker Deployment Script" -ForegroundColor $Blue
Write-Host "=====================================" -ForegroundColor $Blue
Write-Host ""

# Check prerequisites
if (-not (Test-Docker)) {
    exit 1
}

if (-not (Test-DockerCompose)) {
    exit 1
}

# Execute command
switch ($Command.ToLower()) {
    "deploy" {
        $env = if ($Service -and $Service -ne "frontend") { $Service } else { "dev" }
        Deploy-Application -Environment $env
    }
    "prod" {
        Deploy-Application -Environment "prod"
    }
    "stop" {
        Stop-Services
    }
    "logs" {
        Show-Logs -ServiceName $Service
    }
    "clean" {
        Clean-Resources
    }
    "help" {
        Show-Help
    }
    default {
        Write-Error "Unknown command: $Command"
        Write-Host "Use '.\docker-deploy.ps1 help' for usage information." -ForegroundColor $Yellow
        exit 1
    }
}
