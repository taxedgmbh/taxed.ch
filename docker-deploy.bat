@echo off
REM Taxed GmbH Docker Deployment Script for Windows CMD
REM This script deploys the Taxed GmbH website using Docker on Windows

setlocal enabledelayedexpansion

REM Check if parameters are provided
set "command=%~1"
set "service=%~2"

if "%command%"=="" set "command=deploy"
if "%service%"=="" set "service=frontend"

echo.
echo 🐳 Taxed GmbH Docker Deployment Script
echo =====================================
echo.

REM Check if Docker is installed and running
echo [INFO] Checking Docker installation...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed or not running. Please install Docker Desktop and start it.
    pause
    exit /b 1
)
echo [SUCCESS] Docker is available

REM Check if Docker Compose is available
echo [INFO] Checking Docker Compose...
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Docker Compose not found, trying 'docker compose' command...
    docker compose version >nul 2>&1
    if %errorlevel% neq 0 (
        echo [ERROR] Docker Compose is not available. Please install Docker Compose.
        pause
        exit /b 1
    )
    set "compose_cmd=docker compose"
) else (
    set "compose_cmd=docker-compose"
)
echo [SUCCESS] Docker Compose is available

REM Execute command based on parameter
if /i "%command%"=="deploy" goto :deploy
if /i "%command%"=="prod" goto :prod
if /i "%command%"=="stop" goto :stop
if /i "%command%"=="logs" goto :logs
if /i "%command%"=="clean" goto :clean
if /i "%command%"=="help" goto :help
goto :unknown

:deploy
echo [INFO] 🚀 Starting Taxed GmbH Docker Deployment (development)...
echo [INFO] Stopping existing containers...
%compose_cmd% down >nul 2>&1
echo [INFO] Building development containers...
%compose_cmd% build --no-cache
if %errorlevel% neq 0 (
    echo [ERROR] Failed to build development containers.
    pause
    exit /b 1
)
echo [INFO] Starting development containers...
%compose_cmd% up -d
if %errorlevel% neq 0 (
    echo [ERROR] Failed to start development containers.
    pause
    exit /b 1
)
echo [INFO] Waiting for services to be ready...
timeout /t 15 /nobreak >nul
echo [INFO] Checking service health...
curl -f http://localhost/health >nul 2>&1
if %errorlevel% equ 0 (
    echo [SUCCESS] ✅ Frontend is healthy!
) else (
    echo [WARNING] ⚠️  Frontend health check failed, but service might still be starting...
)
echo [INFO] Running containers:
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo [SUCCESS] 🎉 Deployment completed!
echo [INFO] Your website is available at:
echo   🌐 Frontend: http://localhost
echo   🔧 Backend API: http://localhost:3000
echo   🗄️  Database: localhost:3306
echo   📊 Redis: localhost:6379
goto :end

:prod
echo [INFO] 🚀 Starting Taxed GmbH Docker Deployment (production)...
echo [INFO] Stopping existing containers...
%compose_cmd% -f docker-compose.prod.yml down >nul 2>&1
echo [INFO] Building production containers...
%compose_cmd% -f docker-compose.prod.yml build --no-cache
if %errorlevel% neq 0 (
    echo [ERROR] Failed to build production containers.
    pause
    exit /b 1
)
echo [INFO] Starting production containers...
%compose_cmd% -f docker-compose.prod.yml up -d
if %errorlevel% neq 0 (
    echo [ERROR] Failed to start production containers.
    pause
    exit /b 1
)
echo [INFO] Waiting for services to be ready...
timeout /t 15 /nobreak >nul
echo [INFO] Checking service health...
curl -f http://localhost/health >nul 2>&1
if %errorlevel% equ 0 (
    echo [SUCCESS] ✅ Frontend is healthy!
) else (
    echo [WARNING] ⚠️  Frontend health check failed, but service might still be starting...
)
echo [INFO] Running containers:
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo [SUCCESS] 🎉 Production deployment completed!
echo [INFO] Your website is available at:
echo   🌐 Frontend: http://localhost
echo   🔧 Backend API: http://localhost:3000
echo   🗄️  Database: localhost:3306
echo   📊 Redis: localhost:6379
goto :end

:stop
echo [INFO] Stopping all services...
%compose_cmd% down
%compose_cmd% -f docker-compose.prod.yml down >nul 2>&1
echo [SUCCESS] All services stopped.
goto :end

:logs
echo [INFO] Showing logs for %service%...
%compose_cmd% logs -f %service%
goto :end

:clean
echo [INFO] Cleaning up Docker resources...
%compose_cmd% down -v
%compose_cmd% -f docker-compose.prod.yml down -v >nul 2>&1
docker system prune -f
echo [SUCCESS] Cleanup completed.
goto :end

:help
echo Taxed GmbH Docker Deployment Script for Windows CMD
echo.
echo Usage: docker-deploy.bat [command] [options]
echo.
echo Commands:
echo   deploy [dev^|prod]  Deploy the application (default: dev)
echo   prod              Deploy production version
echo   stop              Stop all services
echo   logs [service]    Show logs for a service (default: frontend)
echo   clean             Clean up Docker resources
echo   help              Show this help message
echo.
echo Examples:
echo   docker-deploy.bat deploy         # Deploy development version
echo   docker-deploy.bat prod           # Deploy production version
echo   docker-deploy.bat logs frontend  # Show frontend logs
echo   docker-deploy.bat stop          # Stop all services
echo.
echo Prerequisites:
echo   - Docker Desktop must be installed and running
echo   - At least 2GB RAM and 10GB disk space available
echo   - Windows 10/11 (64-bit) recommended
goto :end

:unknown
echo [ERROR] Unknown command: %command%
echo Use 'docker-deploy.bat help' for usage information.
pause
exit /b 1

:end
echo.
pause
