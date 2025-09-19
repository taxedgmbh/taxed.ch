# Taxed GmbH Website Documentation

## 📚 **Overview**

This documentation provides comprehensive guides for the Taxed GmbH website, covering development, deployment, API usage, and maintenance.

## 🏗️ **Architecture**

### **Frontend**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + Context
- **Routing**: React Router v6
- **UI Components**: Radix UI + Custom Components

### **Backend**
- **Language**: PHP 8.2+
- **Database**: MySQL 8.0
- **Authentication**: JWT + Session Management
- **Security**: Argon2ID Password Hashing
- **API**: RESTful JSON API

### **Deployment**
- **Containerization**: Docker + Docker Compose
- **Web Server**: Nginx
- **SSL**: Let's Encrypt
- **Hosting**: Hostinger

## 🚀 **Quick Start**

### **Development Setup**
```bash
# Clone repository
git clone https://github.com/taxedgmbh/homepage.git
cd homepage

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### **Docker Development**
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📁 **Project Structure**

See [Folder Structure Guide](./folder-structure.md) for detailed organization.

## 🔧 **Development**

### **Code Standards**
- TypeScript strict mode enabled
- ESLint + Prettier configuration
- Component-based architecture
- Custom hooks for logic reuse
- Comprehensive error handling

### **Testing**
- Unit tests with Jest + React Testing Library
- Integration tests for API endpoints
- E2E tests with Playwright
- Test coverage reporting

### **Performance**
- Code splitting and lazy loading
- Image optimization
- Bundle size monitoring
- Caching strategies

## 🌐 **API Documentation**

### **Authentication Endpoints**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### **Client Portal Endpoints**
- `GET /api/clients/documents` - Get client documents
- `POST /api/clients/upload` - Upload document
- `GET /api/clients/invoices` - Get invoices
- `POST /api/clients/contact` - Contact form

## 🚀 **Deployment**

### **Production Deployment**
1. Build the application: `npm run build`
2. Deploy to Hostinger via FTP
3. Configure SSL certificates
4. Set up monitoring and backups

### **Docker Deployment**
1. Build Docker images
2. Deploy with Docker Compose
3. Configure environment variables
4. Set up reverse proxy

## 🔒 **Security**

### **Frontend Security**
- Input validation and sanitization
- XSS protection
- CSRF tokens
- Secure headers

### **Backend Security**
- SQL injection prevention
- Rate limiting
- Secure password hashing
- Session management
- Audit logging

## 📊 **Monitoring**

### **Performance Monitoring**
- Page load times
- API response times
- Error rates
- User analytics

### **Security Monitoring**
- Failed login attempts
- Suspicious activity
- SSL certificate status
- Database performance

## 🛠️ **Maintenance**

### **Regular Tasks**
- Update dependencies
- Security patches
- Performance optimization
- Content updates
- Backup verification

### **Monitoring**
- Error tracking
- Performance metrics
- Security alerts
- Uptime monitoring

## 📞 **Support**

For technical support or questions:
- **Email**: support@taxed.ch
- **Documentation**: [docs.taxed.ch](https://docs.taxed.ch)
- **Issues**: [GitHub Issues](https://github.com/taxedgmbh/homepage/issues)

## 📄 **License**

This project is proprietary software owned by Taxed GmbH. All rights reserved.
