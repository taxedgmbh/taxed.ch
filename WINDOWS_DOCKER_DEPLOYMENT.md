# 🪟 Windows Docker Deployment Guide for Taxed GmbH Website

This guide explains how to deploy your Taxed GmbH website using Docker on Windows with PowerShell.

## 📋 Prerequisites

### Required Software
- **Windows 10/11** (64-bit) or **Windows Server 2019/2022**
- **Docker Desktop for Windows** (latest version)
- **PowerShell 5.1+** or **PowerShell Core 7+**
- **Git for Windows** (optional, for version control)
- **Visual Studio Code** (optional, for editing)

### System Requirements
- **RAM**: 4GB+ (8GB recommended)
- **Disk Space**: 20GB+ free space
- **CPU**: 2+ cores (4+ cores recommended)
- **Virtualization**: Enabled in BIOS/UEFI

## 🚀 Quick Start

### 1. Install Docker Desktop
1. Download Docker Desktop from: https://www.docker.com/products/docker-desktop/
2. Run the installer as Administrator
3. Enable WSL 2 integration (recommended)
4. Restart your computer if prompted

### 2. Verify Installation
Open PowerShell as Administrator and run:
```powershell
# Check Docker version
docker --version

# Check Docker Compose version
docker-compose --version

# Test Docker
docker run hello-world
```

### 3. Set PowerShell Execution Policy
```powershell
# Allow script execution (run as Administrator)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Or for all users (requires Administrator)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine
```

### 4. Deploy the Application
```powershell
# Navigate to your project directory
cd "C:\path\to\your\taxed-homepage"

# Deploy development version
.\docker-deploy.ps1 deploy

# Or deploy production version
.\docker-deploy.ps1 prod
```

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React +      │◄──►│   (Node.js +    │◄──►│   (MySQL 8.0)   │
│    Nginx)       │    │    Express)     │    │                 │
│   Port: 80      │    │   Port: 3000    │    │   Port: 3306    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Redis         │
                    │   (Caching)     │
                    │   Port: 6379    │
                    └─────────────────┘
```

## 📁 Windows-Specific Files

```
├── docker-deploy.ps1              # PowerShell deployment script
├── docker-compose.windows.yml     # Windows-optimized compose file
├── Dockerfile                     # Multi-stage build for React app
├── nginx.conf                    # Nginx configuration
├── .dockerignore                  # Build context exclusions
└── WINDOWS_DOCKER_DEPLOYMENT.md   # This guide
```

## 🔧 PowerShell Commands

### Basic Deployment Commands
```powershell
# Deploy development version
.\docker-deploy.ps1 deploy

# Deploy production version
.\docker-deploy.ps1 prod

# Stop all services
.\docker-deploy.ps1 stop

# View logs
.\docker-deploy.ps1 logs frontend
.\docker-deploy.ps1 logs backend

# Clean up resources
.\docker-deploy.ps1 clean

# Show help
.\docker-deploy.ps1 help
```

### Manual Docker Commands
```powershell
# Build and start services
docker-compose up -d

# Build without cache
docker-compose build --no-cache

# View running containers
docker ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Clean up
docker system prune -a
```

## 🛠️ Troubleshooting Common Issues

### 1. PowerShell Execution Policy Error
**Error**: `execution of scripts is disabled on this system`

**Solution**:
```powershell
# Run as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine
```

### 2. Docker Desktop Not Running
**Error**: `Cannot connect to the Docker daemon`

**Solutions**:
1. Start Docker Desktop from Start Menu
2. Wait for Docker to fully start (whale icon in system tray)
3. Restart Docker Desktop if needed
4. Check if Hyper-V is enabled

### 3. Port Already in Use
**Error**: `port is already allocated`

**Solutions**:
```powershell
# Check what's using the port
netstat -ano | findstr :80
netstat -ano | findstr :3000

# Stop conflicting services
# Stop IIS (if running)
iisreset /stop

# Stop Apache (if running)
net stop apache2.4
```

### 4. WSL 2 Issues
**Error**: `WSL 2 installation is incomplete`

**Solutions**:
1. Enable WSL 2: `wsl --install`
2. Update WSL: `wsl --update`
3. Set WSL 2 as default: `wsl --set-default-version 2`

### 5. Memory Issues
**Error**: `out of memory` or slow performance

**Solutions**:
1. Increase Docker Desktop memory limit:
   - Open Docker Desktop
   - Go to Settings → Resources → Advanced
   - Increase Memory to 4GB+ (8GB recommended)
2. Close other applications
3. Restart Docker Desktop

### 6. File Permission Issues
**Error**: `permission denied` or `access denied`

**Solutions**:
```powershell
# Run PowerShell as Administrator
# Grant full access to project folder
icacls "C:\path\to\your\project" /grant Everyone:F /T

# Or change ownership
takeown /f "C:\path\to\your\project" /r /d y
```

## 🔍 Debugging Commands

### Check System Status
```powershell
# Check Docker status
docker info

# Check running containers
docker ps -a

# Check Docker Compose status
docker-compose ps

# Check system resources
Get-Process | Sort-Object CPU -Descending | Select-Object -First 10
```

### View Logs
```powershell
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs frontend
docker-compose logs backend
docker-compose logs db

# Follow logs in real-time
docker-compose logs -f frontend
```

### Network Diagnostics
```powershell
# Test localhost connectivity
Test-NetConnection -ComputerName localhost -Port 80
Test-NetConnection -ComputerName localhost -Port 3000

# Check if services are responding
Invoke-WebRequest -Uri "http://localhost" -TimeoutSec 10
Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 10
```

## 🚀 Advanced Configuration

### Environment Variables
Create a `.env` file in your project root:
```env
# Database Configuration
DB_HOST=db
DB_USER=taxed_user
DB_PASSWORD=your_secure_password
DB_NAME=taxed_db

# JWT Configuration
JWT_SECRET=your_very_secure_jwt_secret

# Redis Configuration
REDIS_HOST=redis
REDIS_PORT=6379

# Application Settings
NODE_ENV=production
API_PORT=3000
FRONTEND_PORT=80
```

### Custom Docker Compose
Use the Windows-specific compose file:
```powershell
# Use Windows-optimized configuration
docker-compose -f docker-compose.windows.yml up -d
```

### SSL/HTTPS Setup
```powershell
# Generate self-signed certificate (for development)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Or use Let's Encrypt for production
# (Requires domain configuration)
```

## 📊 Performance Optimization

### Docker Desktop Settings
1. **Resources**:
   - Memory: 4GB+ (8GB recommended)
   - CPUs: 2+ (4+ recommended)
   - Disk: 20GB+ (50GB+ recommended)

2. **Advanced Settings**:
   - Enable experimental features
   - Enable BuildKit
   - Enable Kubernetes (optional)

### Windows-Specific Optimizations
```powershell
# Disable Windows Defender real-time scanning for Docker folders
# Add Docker Desktop folders to exclusions:
# - C:\ProgramData\Docker
# - C:\Users\%USERNAME%\.docker

# Optimize Windows for containers
# Enable Hyper-V (if not already enabled)
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```

## 🔄 Updates and Maintenance

### Update Application
```powershell
# Pull latest changes
git pull origin main

# Rebuild and restart
.\docker-deploy.ps1 stop
.\docker-deploy.ps1 clean
.\docker-deploy.ps1 deploy
```

### Backup Database
```powershell
# Create database backup
docker-compose exec db mysqldump -u root -p taxed_db > backup.sql

# Restore from backup
docker-compose exec -T db mysql -u root -p taxed_db < backup.sql
```

### Update Docker Images
```powershell
# Pull latest images
docker-compose pull

# Rebuild with latest images
docker-compose build --no-cache
docker-compose up -d
```

## 🌐 Production Deployment

### Prerequisites for Production
1. **Domain Setup**: Configure DNS for your domain
2. **SSL Certificate**: Set up Let's Encrypt or custom SSL
3. **Environment Variables**: Configure production secrets
4. **Database**: Set up production database
5. **Monitoring**: Set up logging and monitoring

### Production Deployment Steps
```powershell
# 1. Set environment variables
$env:DB_PASSWORD = "your_secure_password"
$env:JWT_SECRET = "your_very_secure_secret"

# 2. Deploy production version
.\docker-deploy.ps1 prod

# 3. Set up SSL (optional)
# Configure nginx with SSL certificates

# 4. Set up monitoring
# Configure logging and health checks
```

## 📚 Additional Resources

- [Docker Desktop for Windows](https://docs.docker.com/desktop/windows/)
- [PowerShell Documentation](https://docs.microsoft.com/en-us/powershell/)
- [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

## 🆘 Support

If you encounter issues:

1. **Check Docker Desktop**: Ensure it's running and healthy
2. **Check PowerShell**: Verify execution policy and permissions
3. **Check System Resources**: Ensure sufficient RAM and disk space
4. **Check Network**: Verify no port conflicts
5. **Review Logs**: Use `.\docker-deploy.ps1 logs` to see error details

### Common Solutions
- Restart Docker Desktop
- Run PowerShell as Administrator
- Check Windows Defender exclusions
- Verify WSL 2 is properly installed
- Ensure virtualization is enabled in BIOS

---

**Your Taxed GmbH website is now ready for Windows Docker deployment! 🪟🐳🚀**
