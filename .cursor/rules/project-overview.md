# Taxed GmbH Website - Project Overview

## Project Description
Professional Swiss tax consulting firm website built with React, TypeScript, and modern web technologies. Features client portal, document management, and comprehensive tax services.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI components
- **Backend**: Node.js, Express, MySQL
- **Deployment**: Docker, Nginx, Hostinger
- **Database**: MySQL 8.0 with client portal schema

## Key Features
- Multi-page React application with routing
- Client portal with authentication
- Document library (PDF downloads)
- SEO optimization (sitemap, robots.txt, RSS)
- Responsive design with modern UI
- Docker containerization
- Production-ready deployment

## File Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API services
├── types/              # TypeScript type definitions
└── lib/                # Utility functions

backend/
├── admin-auth.php      # Admin authentication
├── client-portal.php   # Client portal API
├── contact-form.php    # Contact form handler
└── database-setup.sql  # Database schema

deployment/
├── hostinger-deploy-*/ # Deployment packages
└── scripts/            # Deployment scripts
```

## Development Guidelines
- Use TypeScript for all new code
- Follow React best practices and hooks
- Implement responsive design with Tailwind
- Use Radix UI for accessible components
- Maintain SEO optimization
- Follow Docker best practices
