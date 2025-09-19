# 🍎 macOS Docker Deployment Guide for Taxed GmbH Website

This guide explains how to deploy your Taxed GmbH website using Docker on macOS (MacBook, iMac, Mac Studio, etc.).

## 📋 Prerequisites

### Required Software
- **macOS 10.15+** (Catalina) or later (macOS 12+ Monterey recommended)
- **Docker Desktop for Mac** (latest version)
- **Xcode Command Line Tools** (for development)
- **Homebrew** (optional, for package management)

### System Requirements
- **RAM**: 4GB+ (8GB recommended)
- **Disk Space**: 20GB+ free space
- **CPU**: Intel or Apple Silicon (M1/M2/M3)
- **Architecture**: x86_64 or ARM64

## 🚀 Quick Start

### 1. Install Docker Desktop
1. Download Docker Desktop from: https://www.docker.com/products/docker-desktop/
2. Install the `.dmg` file
3. Launch Docker Desktop from Applications
4. Wait for Docker to start (whale icon in menu bar)

### 2. Verify Installation
Open Terminal and run:
```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker-compose --version

# Test Docker
docker run hello-world
```

### 3. Deploy the Application
```bash
# Navigate to your project directory
cd /path/to/your/taxed-homepage

# Deploy development version
./macos-deploy.sh deploy

# Or deploy production version
./macos-deploy.sh prod
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

## 📁 macOS-Specific Files

```
├── macos-deploy.sh              # macOS deployment script
├── docker-compose.macos.yml     # macOS-optimized compose file
├── Dockerfile                   # Multi-stage build for React app
├── nginx.conf                   # Nginx configuration
├── .dockerignore                # Build context exclusions
└── MACOS_DOCKER_DEPLOYMENT.md   # This guide
```

## 🔧 Deployment Commands

### Basic Deployment Commands
```bash
# Deploy development version
./macos-deploy.sh deploy

# Deploy production version
./macos-deploy.sh prod

# Stop all services
./macos-deploy.sh stop

# View logs
./macos-deploy.sh logs frontend
./macos-deploy.sh logs backend

# Clean up resources
./macos-deploy.sh clean

# Show help
./macos-deploy.sh help
```

### Manual Docker Commands
```bash
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

### 1. Docker Desktop Not Running
**Error**: `Docker is not running. Please start Docker Desktop.`

**Solutions**:
1. Open Docker Desktop from Applications
2. Wait for the whale icon to appear in the menu bar
3. Check if Docker is running: `docker info`
4. Restart Docker Desktop if needed

### 2. Permission Issues
**Error**: `permission denied` or `access denied`

**Solutions**:
```bash
# Make scripts executable
chmod +x macos-deploy.sh
chmod +x docker-deploy.sh

# Check file permissions
ls -la *.sh

# Fix ownership if needed
sudo chown -R $(whoami) .
```

### 3. Port Already in Use
**Error**: `port is already allocated`

**Solutions**:
```bash
# Check what's using the port
lsof -i :80
lsof -i :3000
lsof -i :3306

# Stop conflicting services
sudo lsof -ti:80 | xargs kill -9
sudo lsof -ti:3000 | xargs kill -9
```

### 4. Apple Silicon (M1/M2/M3) Issues
**Error**: `exec format error` or `platform not supported`

**Solutions**:
```bash
# Use platform-specific build
docker build --platform linux/amd64 -t taxed-frontend .

# Or use the macOS compose file
docker-compose -f docker-compose.macos.yml up -d
```

### 5. Memory Issues
**Error**: `out of memory` or slow performance

**Solutions**:
1. Increase Docker Desktop memory limit:
   - Open Docker Desktop
   - Go to Settings → Resources → Advanced
   - Increase Memory to 4GB+ (8GB recommended)
2. Close other applications
3. Restart Docker Desktop

### 6. File System Issues
**Error**: `too many open files` or `file system error`

**Solutions**:
```bash
# Increase file descriptor limit
ulimit -n 65536

# Check current limit
ulimit -n

# Add to ~/.zshrc or ~/.bash_profile
echo "ulimit -n 65536" >> ~/.zshrc
```

## 🔍 Debugging Commands

### Check System Status
```bash
# Check Docker status
docker info

# Check running containers
docker ps -a

# Check Docker Compose status
docker-compose ps

# Check system resources
top -l 1 | head -10
```

### View Logs
```bash
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
```bash
# Test localhost connectivity
curl -I http://localhost
curl -I http://localhost:3000

# Check if services are responding
curl -f http://localhost/health
curl -f http://localhost:3000/health
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

### Apple Silicon Optimization
```bash
# Use native ARM64 images when available
docker-compose -f docker-compose.macos.yml up -d

# Or force x86_64 emulation
docker-compose --platform linux/amd64 up -d
```

### Custom Docker Compose
Use the macOS-specific compose file:
```bash
# Use macOS-optimized configuration
docker-compose -f docker-compose.macos.yml up -d
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

### macOS-Specific Optimizations
```bash
# Optimize Docker for Apple Silicon
export DOCKER_DEFAULT_PLATFORM=linux/amd64

# Increase file descriptor limit
echo "ulimit -n 65536" >> ~/.zshrc

# Optimize Docker Desktop settings
# - Enable "Use Rosetta for x86/amd64 emulation"
# - Enable "Use gRPC FUSE for file sharing"
```

## 🔄 Updates and Maintenance

### Update Application
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
./macos-deploy.sh stop
./macos-deploy.sh clean
./macos-deploy.sh deploy
```

### Backup Database
```bash
# Create database backup
docker-compose exec db mysqldump -u root -p taxed_db > backup.sql

# Restore from backup
docker-compose exec -T db mysql -u root -p taxed_db < backup.sql
```

### Update Docker Images
```bash
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
```bash
# 1. Set environment variables
export DB_PASSWORD="your_secure_password"
export JWT_SECRET="your_very_secure_secret"

# 2. Deploy production version
./macos-deploy.sh prod

# 3. Set up SSL (optional)
# Configure nginx with SSL certificates

# 4. Set up monitoring
# Configure logging and health checks
```

## 🍎 Apple Silicon Specific Notes

### M1/M2/M3 Macs
- **Native Performance**: Use ARM64 images when available
- **Emulation**: x86_64 images run via Rosetta 2
- **Memory**: May need more RAM for emulation
- **Performance**: Native ARM64 is faster than emulated x86_64

### Recommended Settings
```bash
# For Apple Silicon Macs
export DOCKER_DEFAULT_PLATFORM=linux/arm64

# For Intel Macs or compatibility
export DOCKER_DEFAULT_PLATFORM=linux/amd64
```

## 📚 Additional Resources

- [Docker Desktop for Mac](https://docs.docker.com/desktop/mac/)
- [Apple Silicon Docker Guide](https://docs.docker.com/desktop/mac/apple-silicon/)
- [macOS Terminal Guide](https://support.apple.com/guide/terminal/)
- [Homebrew Package Manager](https://brew.sh/)

## 🆘 Support

If you encounter issues:

1. **Check Docker Desktop**: Ensure it's running and healthy
2. **Check System Resources**: Ensure sufficient RAM and disk space
3. **Check Network**: Verify no port conflicts
4. **Review Logs**: Use `./macos-deploy.sh logs` to see error details
5. **Check Architecture**: Ensure correct platform for your Mac

### Common Solutions
- Restart Docker Desktop
- Check file permissions
- Verify port availability
- Check system resources
- Review Docker Desktop settings

---

**Your Taxed GmbH website is now ready for macOS Docker deployment! 🍎🐳🚀**
