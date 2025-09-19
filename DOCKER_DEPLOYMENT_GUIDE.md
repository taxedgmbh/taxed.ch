# 🐳 Docker Deployment Guide for Taxed GmbH Website

This guide explains how to deploy your Taxed GmbH website using Docker containers for better scalability, consistency, and management.

## 📋 Prerequisites

- Docker Engine 20.10+ 
- Docker Compose 2.0+
- Git
- 2GB+ RAM available
- 10GB+ disk space

## 🚀 Quick Start

### 1. Start Docker Desktop
Make sure Docker Desktop is running on your system.

### 2. Deploy Development Version
```bash
# Deploy with all services
./docker-deploy.sh deploy

# Or use docker-compose directly
docker-compose up -d
```

### 3. Access Your Website
- **Frontend**: http://localhost
- **Backend API**: http://localhost:3000
- **Database**: localhost:3306
- **Redis**: localhost:6379

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

## 📁 Docker Files Structure

```
├── Dockerfile                 # Multi-stage build for React app
├── docker-compose.yml         # Development environment
├── docker-compose.prod.yml    # Production environment
├── nginx.conf                 # Nginx configuration
├── .dockerignore             # Files to exclude from build
└── docker-deploy.sh          # Deployment script
```

## 🔧 Configuration Files

### Dockerfile
- **Multi-stage build**: Optimized for production
- **Nginx**: Serves static files efficiently
- **Security**: Includes security headers
- **Health checks**: Monitors container health

### docker-compose.yml (Development)
- Frontend React app
- Backend API server
- MySQL database
- Redis cache
- Volume mounts for development

### docker-compose.prod.yml (Production)
- Production-optimized settings
- Environment variables
- Persistent volumes
- Health checks
- Restart policies

## 🚀 Deployment Commands

### Development Deployment
```bash
# Deploy development version
./docker-deploy.sh deploy

# Or manually
docker-compose up -d
```

### Production Deployment
```bash
# Deploy production version
./docker-deploy.sh prod

# Or manually
docker-compose -f docker-compose.prod.yml up -d
```

### Management Commands
```bash
# Stop all services
./docker-deploy.sh stop

# View logs
./docker-deploy.sh logs frontend
./docker-deploy.sh logs backend

# Clean up resources
./docker-deploy.sh clean

# Get help
./docker-deploy.sh help
```

## 🔍 Service Details

### Frontend Service
- **Image**: Custom React build
- **Port**: 80 (HTTP)
- **Features**:
  - Nginx web server
  - Gzip compression
  - Static asset caching
  - Security headers
  - React Router support

### Backend Service
- **Image**: Node.js API
- **Port**: 3000
- **Features**:
  - Express.js server
  - Database integration
  - JWT authentication
  - File uploads
  - API rate limiting

### Database Service
- **Image**: MySQL 8.0
- **Port**: 3306
- **Features**:
  - Persistent data storage
  - Automatic schema setup
  - Backup capabilities
  - Performance optimization

### Redis Service
- **Image**: Redis 7
- **Port**: 6379
- **Features**:
  - Session storage
  - Caching layer
  - Rate limiting
  - Performance boost

## 🔒 Security Features

### Nginx Security Headers
```nginx
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Container Security
- Non-root user execution
- Minimal base images
- Security scanning
- Network isolation
- Resource limits

## 📊 Monitoring & Health Checks

### Health Check Endpoints
- **Frontend**: `http://localhost/health`
- **Backend**: `http://localhost:3000/health`

### Monitoring Commands
```bash
# Check container status
docker ps

# View resource usage
docker stats

# Check logs
docker-compose logs -f

# Health check
curl http://localhost/health
```

## 🔄 Environment Variables

### Development (.env)
```env
NODE_ENV=development
DB_HOST=db
DB_USER=taxed_user
DB_PASSWORD=taxed_password
DB_NAME=taxed_db
JWT_SECRET=your-secret-key
```

### Production (.env.prod)
```env
NODE_ENV=production
DB_HOST=db
DB_USER=your_prod_user
DB_PASSWORD=your_secure_password
DB_NAME=taxed_prod_db
JWT_SECRET=your_very_secure_secret
```

## 📈 Performance Optimization

### Nginx Optimizations
- Gzip compression
- Static asset caching
- Connection pooling
- Rate limiting

### Database Optimizations
- Connection pooling
- Query optimization
- Indexing
- Caching strategies

### Container Optimizations
- Multi-stage builds
- Layer caching
- Resource limits
- Health checks

## 🚨 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using the port
lsof -i :80
lsof -i :3000

# Stop conflicting services
sudo systemctl stop apache2  # If Apache is running
sudo systemctl stop nginx    # If Nginx is running
```

#### 2. Docker Daemon Not Running
```bash
# Start Docker Desktop
# Or start Docker daemon manually
sudo systemctl start docker
```

#### 3. Permission Issues
```bash
# Add user to docker group
sudo usermod -aG docker $USER
# Log out and back in
```

#### 4. Build Failures
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

### Debug Commands
```bash
# Check container logs
docker-compose logs frontend
docker-compose logs backend

# Enter container for debugging
docker-compose exec frontend sh
docker-compose exec backend sh

# Check container resources
docker stats

# Inspect container configuration
docker inspect taxed-frontend
```

## 🔄 Updates & Maintenance

### Updating the Application
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Database Backups
```bash
# Create backup
docker-compose exec db mysqldump -u root -p taxed_db > backup.sql

# Restore backup
docker-compose exec -T db mysql -u root -p taxed_db < backup.sql
```

### Log Management
```bash
# View logs
docker-compose logs -f --tail=100

# Rotate logs
docker-compose exec frontend nginx -s reload
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
export DB_PASSWORD=your_secure_password
export JWT_SECRET=your_very_secure_secret

# 2. Deploy production version
./docker-deploy.sh prod

# 3. Set up SSL (optional)
# Configure nginx with SSL certificates

# 4. Set up monitoring
# Configure logging and health checks
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Configuration Guide](https://nginx.org/en/docs/)
- [React Deployment Best Practices](https://create-react-app.dev/docs/deployment/)

## 🆘 Support

If you encounter issues:

1. Check the logs: `./docker-deploy.sh logs`
2. Verify Docker is running: `docker --version`
3. Check container status: `docker ps`
4. Review this guide for troubleshooting steps

---

**Your Taxed GmbH website is now ready for Docker deployment! 🐳🚀**
