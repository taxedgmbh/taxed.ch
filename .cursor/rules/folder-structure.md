# Taxed GmbH Website - Comprehensive Folder Structure Rules

## 🎯 **PURPOSE**
This rule defines the complete folder structure for the Taxed GmbH website, optimized for AI development and scalable growth. It ensures consistent organization, maintainability, and efficient development workflows.

---

## 📁 **ROOT DIRECTORY STRUCTURE**

```
taxedgmbh-homepage/
├── 📁 src/                          # Source code (React/TypeScript)
├── 📁 backend/                      # PHP backend services
├── 📁 public/                       # Static assets (pre-build)
├── 📁 dist/                         # Built assets (generated)
├── 📁 plugins/                      # Custom Vite plugins
├── 📁 tools/                        # Build and utility scripts
├── 📁 deployment/                   # Deployment configurations
├── 📁 docs/                         # Documentation
├── 📁 tests/                        # Test files
├── 📄 Configuration files           # Root config files
└── 📄 Deployment scripts           # Root deployment files
```

---

## 🎨 **FRONTEND STRUCTURE (`src/`)**

### **Core Application Files**
```
src/
├── 📄 main.tsx                      # Application entry point
├── 📄 App.tsx                       # Main application component
├── 📄 index.css                     # Global styles
└── 📄 vite-env.d.ts                 # Vite type definitions
```

### **Components Structure**
```
src/components/
├── 📁 ui/                          # Reusable UI components
│   ├── 📄 button.tsx               # Button component
│   ├── 📄 input.tsx                # Input component
│   ├── 📄 modal.tsx                # Modal component
│   ├── 📄 card.tsx                 # Card component
│   ├── 📄 badge.tsx                # Badge component
│   ├── 📄 dropdown.tsx             # Dropdown component
│   ├── 📄 tooltip.tsx              # Tooltip component
│   ├── 📄 spinner.tsx              # Loading spinner
│   ├── 📄 toast.tsx                # Toast notifications
│   ├── 📄 table.tsx                # Data table
│   ├── 📄 pagination.tsx           # Pagination component
│   ├── 📄 form.tsx                 # Form wrapper
│   ├── 📄 field.tsx                # Form field
│   └── 📄 index.ts                 # Component exports
├── 📁 layout/                      # Layout components
│   ├── 📄 Header.tsx               # Site header
│   ├── 📄 Footer.tsx               # Site footer
│   ├── 📄 Navigation.tsx           # Navigation menu
│   ├── 📄 Sidebar.tsx              # Sidebar component
│   └── 📄 Layout.tsx               # Main layout wrapper
├── 📁 sections/                    # Page sections
│   ├── 📄 HeroSection.tsx          # Hero banner
│   ├── 📄 ServicesSection.tsx      # Services showcase
│   ├── 📄 TeamSection.tsx          # Team members
│   ├── 📄 TestimonialsSection.tsx  # Customer testimonials
│   ├── 📄 ContactSection.tsx       # Contact form
│   └── 📄 NewsletterSection.tsx    # Newsletter signup
├── 📁 features/                    # Feature-specific components
│   ├── 📁 auth/                    # Authentication
│   │   ├── 📄 LoginForm.tsx
│   │   ├── 📄 RegisterForm.tsx
│   │   └── 📄 AuthGuard.tsx
│   ├── 📁 cart/                    # Shopping cart
│   │   ├── 📄 CartItem.tsx
│   │   ├── 📄 CartSummary.tsx
│   │   └── 📄 CartDrawer.tsx
│   ├── 📁 blog/                    # Blog functionality
│   │   ├── 📄 BlogCard.tsx
│   │   ├── 📄 BlogList.tsx
│   │   └── 📄 BlogFilters.tsx
│   └── 📁 admin/                   # Admin components
│       ├── 📄 AdminDashboard.tsx
│       ├── 📄 UserManagement.tsx
│       └── 📄 ContentEditor.tsx
└── 📁 common/                      # Shared components
    ├── 📄 LoadingSpinner.tsx
    ├── 📄 ErrorBoundary.tsx
    ├── 📄 SEO.tsx
    └── 📄 Analytics.tsx
```

### **Pages Structure**
```
src/pages/
├── 📁 public/                      # Public pages
│   ├── 📄 HomePage.tsx             # Landing page
│   ├── 📄 AboutPage.tsx            # About us
│   ├── 📄 ServicesPage.tsx          # Services overview
│   ├── 📄 ContactPage.tsx          # Contact form
│   ├── 📄 TeamPage.tsx             # Team members
│   ├── 📄 FAQPage.tsx              # Frequently asked questions
│   ├── 📄 PrivacyPage.tsx          # Privacy policy
│   ├── 📄 TermsPage.tsx            # Terms of service
│   └── 📄 NotFoundPage.tsx         # 404 page
├── 📁 services/                    # Service-specific pages
│   ├── 📄 TaxConsultingPage.tsx
│   ├── 📄 BookkeepingPage.tsx
│   ├── 📄 PayrollPage.tsx
│   └── 📄 AuditPage.tsx
├── 📁 blog/                        # Blog pages
│   ├── 📄 BlogPage.tsx             # Blog listing
│   ├── 📄 BlogPostPage.tsx         # Individual post
│   └── 📄 BlogCategoryPage.tsx     # Category listing
├── 📁 shop/                        # E-commerce pages
│   ├── 📄 StorePage.tsx            # Product listing
│   ├── 📄 ProductPage.tsx          # Product details
│   ├── 📄 CartPage.tsx             # Shopping cart
│   └── 📄 CheckoutPage.tsx         # Checkout process
├── 📁 client/                      # Client portal pages
│   ├── 📄 ClientDashboard.tsx
│   ├── 📄 DocumentsPage.tsx
│   ├── 📄 InvoicesPage.tsx
│   └── 📄 ProfilePage.tsx
└── 📁 admin/                       # Admin pages
    ├── 📄 AdminDashboard.tsx
    ├── 📄 UserManagement.tsx
    ├── 📄 ContentManagement.tsx
    └── 📄 AnalyticsPage.tsx
```

### **Hooks Structure**
```
src/hooks/
├── 📄 useAuth.ts                   # Authentication hook
├── 📄 useCart.ts                   # Shopping cart hook
├── 📄 useApi.ts                    # API calls hook
├── 📄 useLocalStorage.ts           # Local storage hook
├── 📄 useDebounce.ts               # Debounce hook
├── 📄 useIntersection.ts           # Intersection observer
├── 📄 useMediaQuery.ts             # Media query hook
├── 📄 useForm.ts                   # Form handling hook
├── 📄 usePagination.ts            # Pagination hook
└── 📄 useAnalytics.ts              # Analytics tracking
```

### **Services Structure**
```
src/services/
├── 📄 api.ts                       # API configuration
├── 📄 auth.ts                      # Authentication service
├── 📄 cart.ts                      # Cart management
├── 📄 blog.ts                      # Blog service
├── 📄 products.ts                  # Product service
├── 📄 payments.ts                  # Payment processing
├── 📄 email.ts                     # Email service
├── 📄 analytics.ts                 # Analytics service
└── 📄 storage.ts                   # Storage service
```

### **Types Structure**
```
src/types/
├── 📄 index.ts                     # Main type exports
├── 📄 api.ts                       # API types
├── 📄 auth.ts                      # Authentication types
├── 📄 cart.ts                      # Cart types
├── 📄 blog.ts                      # Blog types
├── 📄 products.ts                  # Product types
├── 📄 user.ts                      # User types
├── 📄 common.ts                    # Common types
└── 📄 forms.ts                     # Form types
```

### **Utils Structure**
```
src/utils/
├── 📄 constants.ts                 # Application constants
├── 📄 helpers.ts                   # Helper functions
├── 📄 validators.ts                # Validation functions
├── 📄 formatters.ts                # Data formatters
├── 📄 dateUtils.ts                 # Date utilities
├── 📄 stringUtils.ts               # String utilities
├── 📄 numberUtils.ts               # Number utilities
├── 📄 urlUtils.ts                  # URL utilities
└── 📄 storageUtils.ts              # Storage utilities
```

---

## 🔧 **BACKEND STRUCTURE (`backend/`)**

```
backend/
├── 📁 api/                         # API endpoints
│   ├── 📄 auth.php                 # Authentication API
│   ├── 📄 users.php                # User management
│   ├── 📄 products.php             # Product API
│   ├── 📄 orders.php                # Order processing
│   ├── 📄 blog.php                 # Blog API
│   ├── 📄 contact.php              # Contact form
│   └── 📄 admin.php                # Admin API
├── 📁 config/                      # Configuration
│   ├── 📄 database.php             # Database config
│   ├── 📄 email.php                # Email config
│   ├── 📄 security.php             # Security config
│   └── 📄 constants.php            # Backend constants
├── 📁 models/                      # Data models
│   ├── 📄 User.php                 # User model
│   ├── 📄 Product.php              # Product model
│   ├── 📄 Order.php                # Order model
│   ├── 📄 BlogPost.php             # Blog post model
│   └── 📄 Contact.php              # Contact model
├── 📁 middleware/                  # Middleware functions
│   ├── 📄 auth.php                 # Authentication
│   ├── 📄 cors.php                 # CORS handling
│   ├── 📄 rateLimit.php            # Rate limiting
│   └── 📄 validation.php           # Input validation
├── 📁 utils/                       # Utility functions
│   ├── 📄 helpers.php              # Helper functions
│   ├── 📄 validators.php           # Validation functions
│   ├── 📄 formatters.php           # Data formatters
│   └── 📄 security.php             # Security utilities
├── 📁 uploads/                     # File uploads
│   ├── 📁 documents/               # Document uploads
│   ├── 📁 images/                  # Image uploads
│   └── 📁 temp/                    # Temporary files
├── 📄 .htaccess                    # Apache configuration
├── 📄 composer.json                # PHP dependencies
└── 📄 Dockerfile                   # Backend container
```

---

## 📁 **PUBLIC ASSETS STRUCTURE (`public/`)**

```
public/
├── 📁 images/                      # Static images
│   ├── 📁 logos/                   # Company logos
│   ├── 📁 icons/                   # Icon files
│   ├── 📁 team/                    # Team photos
│   ├── 📁 services/                # Service images
│   └── 📁 backgrounds/             # Background images
├── 📁 documents/                   # Static documents
│   ├── 📄 privacy-policy.pdf
│   ├── 📄 terms-of-service.pdf
│   ├── 📄 tax-guides/
│   └── 📄 legal-documents/
├── 📁 fonts/                       # Custom fonts
├── 📁 videos/                      # Video files
├── 📁 favicons/                    # Favicon files
├── 📄 robots.txt                   # SEO robots file
├── 📄 sitemap.xml                  # XML sitemap
├── 📄 manifest.json                # PWA manifest
└── 📄 .htaccess                    # Apache rules
```

---

## 🧪 **TESTING STRUCTURE (`tests/`)**

```
tests/
├── 📁 unit/                        # Unit tests
│   ├── 📁 components/              # Component tests
│   ├── 📁 hooks/                   # Hook tests
│   ├── 📁 utils/                   # Utility tests
│   └── 📁 services/                # Service tests
├── 📁 integration/                 # Integration tests
│   ├── 📁 api/                     # API tests
│   ├── 📁 auth/                    # Authentication tests
│   └── 📁 database/                # Database tests
├── 📁 e2e/                         # End-to-end tests
│   ├── 📁 user-flows/              # User journey tests
│   ├── 📁 admin-flows/             # Admin workflow tests
│   └── 📁 checkout-flows/         # E-commerce tests
├── 📁 fixtures/                    # Test data
├── 📁 mocks/                       # Mock files
├── 📄 setup.ts                     # Test setup
└── 📄 jest.config.js               # Jest configuration
```

---

## 📚 **DOCUMENTATION STRUCTURE (`docs/`)**

```
docs/
├── 📁 api/                         # API documentation
├── 📁 components/                  # Component documentation
├── 📁 deployment/                  # Deployment guides
├── 📁 development/                 # Development guides
├── 📁 user-guides/                 # User documentation
├── 📁 architecture/                # System architecture
└── 📄 README.md                    # Main documentation
```

---

## 🚀 **DEPLOYMENT STRUCTURE**

```
deployment/
├── 📁 docker/                      # Docker configurations
│   ├── 📄 Dockerfile.frontend
│   ├── 📄 Dockerfile.backend
│   └── 📄 docker-compose.yml
├── 📁 scripts/                     # Deployment scripts
│   ├── 📄 build.sh
│   ├── 📄 deploy.sh
│   ├── 📄 backup.sh
│   └── 📄 rollback.sh
├── 📁 configs/                     # Environment configs
│   ├── 📄 production.env
│   ├── 📄 staging.env
│   └── 📄 development.env
└── 📁 monitoring/                  # Monitoring configs
    ├── 📄 nginx.conf
    ├── 📄 ssl.conf
    └── 📄 monitoring.yml
```

---

## 🎯 **AI OPTIMIZATION RULES**

### **File Naming Conventions**
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)
- **Utils**: camelCase (e.g., `dateUtils.ts`)
- **Types**: PascalCase (e.g., `UserTypes.ts`)
- **Pages**: PascalCase with `Page` suffix (e.g., `HomePage.tsx`)
- **Services**: camelCase (e.g., `authService.ts`)

### **Import Organization**
```typescript
// 1. React imports
import React from 'react';
import { useState, useEffect } from 'react';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

// 3. Internal imports (absolute paths)
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types/user';

// 4. Relative imports
import './Component.css';
```

### **Component Structure Template**
```typescript
// Component imports
import React from 'react';
import { ComponentProps } from '@/types/common';

// Component definition
interface ComponentNameProps extends ComponentProps {
  // Specific props
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  // Props destructuring
}) => {
  // Hooks
  // State
  // Effects
  // Handlers
  // Render
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};
```

### **Folder Growth Patterns**
- **Components**: Group by feature, not by type
- **Pages**: Mirror URL structure
- **Services**: One service per file
- **Types**: Group by domain
- **Utils**: Group by functionality

### **Scalability Guidelines**
1. **Feature-based organization** over type-based
2. **Barrel exports** for clean imports
3. **Consistent naming** across all files
4. **Clear separation** of concerns
5. **Modular architecture** for easy maintenance

---

## 🔄 **MAINTENANCE RULES**

### **Regular Cleanup**
- Remove unused imports and files
- Update type definitions
- Refactor large components
- Optimize bundle size
- Update dependencies

### **Growth Management**
- Monitor folder sizes
- Split large files
- Create feature modules
- Implement lazy loading
- Use code splitting

### **AI Development Support**
- Clear file purposes
- Consistent patterns
- Comprehensive types
- Good documentation
- Predictable structure

---

## 📋 **QUICK REFERENCE**

### **Essential Files**
- `src/main.tsx` - App entry point
- `src/App.tsx` - Main component
- `src/types/index.ts` - Type definitions
- `package.json` - Dependencies
- `vite.config.js` - Build configuration

### **Key Directories**
- `src/components/` - Reusable components
- `src/pages/` - Page components
- `src/hooks/` - Custom hooks
- `src/services/` - API services
- `src/types/` - TypeScript types

### **Build Output**
- `dist/` - Production build
- `public/` - Static assets
- `backend/` - PHP backend

This structure ensures the website can grow efficiently while maintaining organization and developer productivity.
