# Taxed.ch Project Context

**Project Name**: Taxed GmbH Website
**Live URL**: https://taxed.ch
**Version**: 1.0 (Production)
**Last Updated**: November 28, 2025

---

## 🎯 Project Overview

Professional Swiss tax consulting platform built for expatriates and businesses. The website provides comprehensive tax services, digital filing, client portal, and automated blog content generation.

### Mission
To provide world-class digital platform for Swiss tax consulting services, enabling expatriates and businesses to access professional tax advice, document management, and comprehensive tax solutions with Swiss precision.

### Key Metrics
- **47+ Pages** - Comprehensive content coverage
- **500+ Happy Clients** - Client testimonials
- **98% Success Rate** - Tax filing accuracy
- **24/7 Support** - Client assistance
- **Lighthouse Score** - 95+ Accessibility

---

## 🏗️ Technical Architecture

### Technology Stack

```yaml
Frontend:
  - Framework: React 18.2.0
  - Build Tool: Vite 4.4.5
  - Language: JavaScript (ES6+) + TypeScript (select files)
  - Routing: React Router DOM 6.16.0
  - UI Components: Radix UI
  - Styling: Tailwind CSS 3.3.3
  - Animations: Framer Motion 10.16.4
  - State Management: React Hooks + Context API

Backend:
  - Runtime: Node.js + Express
  - Database: Firebase Firestore
  - Authentication: Firebase Auth
  - Storage: Firebase Storage
  - Functions: Firebase Cloud Functions

Development:
  - Package Manager: npm
  - Version Control: Git + GitHub
  - Testing: Playwright 1.56.1
  - Linting: ESLint 8.57.1
  - Deployment: Hostinger (Production)

APIs & Services:
  - AI Content: OpenAI GPT-4
  - Analytics: Google Analytics + Bing Webmaster
  - Email: Custom SMTP
  - Payment: Stripe (planned)
```

### Project Structure

```
taxed.ch/
├── .claude/                      # Claude Code documentation
│   ├── DESIGN_SYSTEM.md         # Design guidelines
│   ├── PROJECT_CONTEXT.md       # This file
│   ├── COMPONENTS_CATALOG.md    # Component reference
│   ├── README.md                # Navigation hub
│   └── settings.local.json      # Claude permissions
│
├── src/
│   ├── components/              # React components
│   │   ├── ui/                 # Base UI components (30+)
│   │   │   ├── button.jsx      # Button variants
│   │   │   ├── card.jsx        # Card components
│   │   │   ├── input.jsx       # Form inputs
│   │   │   ├── dropdown-menu.jsx
│   │   │   ├── accordion.jsx
│   │   │   └── ...
│   │   ├── landing/            # Landing page sections
│   │   │   ├── HeroSection.jsx
│   │   │   ├── BenefitsSection.jsx
│   │   │   ├── PackagesSection.jsx
│   │   │   ├── FaqSection.jsx
│   │   │   └── ContactSection.jsx
│   │   ├── sections/           # Reusable page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── NewsletterSection.tsx
│   │   ├── layout/             # Layout components
│   │   │   ├── Layout.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── common/             # Common utilities
│   │   │   ├── Analytics.tsx
│   │   │   ├── SEO.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── features/           # Feature modules
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── blog/
│   │   │   └── cart/
│   │   ├── Header.jsx          # Global header
│   │   ├── Footer.jsx          # Global footer
│   │   └── ShoppingCart.jsx    # Cart component
│   │
│   ├── pages/                  # Page components (47+)
│   │   ├── LandingPage.jsx    # Homepage
│   │   ├── AboutPage.jsx      # Company info
│   │   ├── ServicesPage.jsx   # Tax services
│   │   ├── StorePage.jsx      # E-commerce
│   │   ├── BlogPage.jsx       # Blog listing
│   │   ├── BlogPostPage.jsx   # Individual posts
│   │   ├── AdminPage.jsx      # Admin dashboard
│   │   ├── ClientPortalPage.jsx
│   │   └── ... (40+ more pages)
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useCart.jsx       # Shopping cart state
│   │   ├── useAuth.jsx       # Authentication
│   │   └── useLocalStorage.jsx
│   │
│   ├── services/              # Business logic
│   │   ├── authService.js    # Firebase auth
│   │   ├── newsService.js    # News fetching
│   │   ├── aiBlogGenerator.js # AI content
│   │   ├── dailyBlogScheduler.js
│   │   └── imageService.js
│   │
│   ├── utils/                 # Utility functions
│   │   ├── analytics.js      # GA tracking
│   │   ├── performance.js    # Web Vitals
│   │   └── bing.js          # Bing SEO
│   │
│   ├── api/                   # API integration
│   │   └── EcommerceApi.js
│   │
│   ├── lib/                   # Library utilities
│   │   └── utils.js          # cn() helper
│   │
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   │
│   ├── App.jsx               # Root component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
│
├── public/                    # Static assets
│   ├── documents/            # PDF downloads
│   ├── llms.txt              # AI crawler hints
│   ├── rss.xml               # Blog feed
│   └── sitemap.xml           # SEO sitemap
│
├── backend/                   # Backend services
│   └── ... (MySQL, Express setup)
│
├── server/                    # Server configuration
│   └── ... (deployment scripts)
│
├── tests/                     # Playwright tests
│   └── apple-design-compliance.spec.ts
│
├── tools/                     # Build tools
│   ├── generate-rss.js
│   └── generate-llms.js
│
├── docs/                      # Documentation
│   └── README.md
│
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind setup
├── tsconfig.json             # TypeScript config
└── playwright.config.ts      # Test configuration
```

---

## 🚀 Development Workflow

### Getting Started

```bash
# Clone repository
git clone https://github.com/taxedgmbh/taxed.ch.git
cd taxed.ch

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with Firebase credentials

# Start development server
npm run dev
# Opens http://localhost:5173
```

### Available Scripts

```bash
# Development
npm run dev              # Start dev server (Vite)
npm run preview          # Preview production build

# Building
npm run build            # Build for production
                        # Runs: generate-rss + generate-llms + vite build

# Testing
npm test                 # Run all Playwright tests
npm run test:ui          # Open Playwright UI
npm run test:apple-design # Apple HIG compliance tests
npm run test:report      # Show test report

# Design Validation
npm run validate:design       # Check Apple HIG compliance
npm run validate:design:fix   # Auto-fix violations
npm run validate:design:pr    # Create PR with fixes
```

### Environment Variables

```bash
# .env file structure
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

VITE_OPENAI_API_KEY=sk-...
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

---

## 📦 Key Dependencies

### Production Dependencies

```json
{
  "react": "^18.2.0",                      // UI framework
  "react-dom": "^18.2.0",                  // DOM rendering
  "react-router-dom": "^6.16.0",           // Client routing
  "react-helmet": "^6.1.0",                // SEO meta tags

  "@radix-ui/react-*": "^1.0+",           // Accessible UI primitives
  "framer-motion": "^10.16.4",            // Animations
  "lucide-react": "^0.285.0",             // Icon library

  "firebase": "^12.5.0",                  // Backend services
  "openai": "^5.16.0",                    // AI content generation

  "tailwindcss": "^3.3.3",                // CSS framework
  "tailwind-merge": "^1.14.0",            // Class merging
  "class-variance-authority": "^0.7.1",   // Component variants
  "clsx": "^2.0.0"                        // Class names utility
}
```

### Development Dependencies

```json
{
  "@vitejs/plugin-react": "^4.0.3",
  "@playwright/test": "^1.56.1",
  "@types/react": "^18.3.24",
  "@types/react-dom": "^18.3.7",
  "typescript": "^5.9.2",
  "eslint": "^8.57.1",
  "autoprefixer": "^10.4.16",
  "postcss": "^8.4.31"
}
```

---

## 🎨 Design Patterns

### Component Structure

```jsx
// Standard component pattern
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const FeatureCard = ({ title, description, icon: Icon, className }) => {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow",
      className
    )}>
      <div className="flex items-center gap-4 mb-4">
        <Icon className="w-8 h-8 text-steel-blue" />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
```

### Page Structure

```jsx
// Standard page pattern
import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/sections/HeroSection';
import ContentSection from '@/components/sections/ContentSection';

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Swiss Tax Services | Taxed.ch</title>
        <meta name="description" content="Professional tax filing for expats" />
      </Helmet>

      <HeroSection
        title="Professional Tax Services"
        description="Expert guidance for Swiss tax filing"
      />

      <ContentSection>
        {/* Page content */}
      </ContentSection>
    </>
  );
};

export default ServicesPage;
```

### State Management

```jsx
// Context Pattern
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = (item) => {
    setItems(prev => [...prev, item]);
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{
      items,
      isCartOpen,
      setIsCartOpen,
      addItem,
      removeItem
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
```

---

## 🔒 Security Best Practices

### Environment Variables

```javascript
// ❌ NEVER commit API keys
const apiKey = 'sk-1234567890abcdef';

// ✅ Use environment variables
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

// ✅ Validate on server-side
if (!apiKey) {
  throw new Error('Missing VITE_OPENAI_API_KEY');
}
```

### Firebase Security Rules

```javascript
// Firestore rules (FIRESTORE_RULES_FOR_YOUR_STRUCTURE.txt)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Authenticated users only
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Admin-only access
    match /admin/{document=**} {
      allow read, write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### XSS Prevention

```jsx
// ✅ React escapes by default
<div>{userInput}</div>

// ❌ Dangerous HTML injection
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Sanitize if needed
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(userInput)
}} />
```

---

## 🧪 Testing Strategy

### Apple HIG Compliance Tests

```typescript
// tests/apple-design-compliance.spec.ts
import { test, expect } from '@playwright/test';

test('Touch targets meet 44×44pt minimum', async ({ page }) => {
  await page.goto('/');

  const buttons = page.locator('button');
  const count = await buttons.count();

  for (let i = 0; i < count; i++) {
    const box = await buttons.nth(i).boundingBox();
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
  }
});

test('Color contrast meets WCAG AA', async ({ page }) => {
  await page.goto('/');

  // Use axe-core for automated checks
  const violations = await page.evaluate(() => {
    return window.axe.run();
  });

  expect(violations.length).toBe(0);
});
```

### Component Tests

```typescript
// Example: Button component test
test.describe('Button Component', () => {
  test('renders with correct variant', async ({ page }) => {
    await page.goto('/test/button');

    const primaryBtn = page.locator('[data-variant="primary"]');
    await expect(primaryBtn).toHaveClass(/bg-blue-600/);
  });

  test('is keyboard accessible', async ({ page }) => {
    await page.goto('/test/button');

    await page.keyboard.press('Tab');
    await expect(page.locator('button:focus')).toBeVisible();

    await page.keyboard.press('Enter');
    // Assert button action
  });
});
```

---

## 📊 Performance Guidelines

### Core Web Vitals Targets

```yaml
Performance Metrics:
  - Largest Contentful Paint (LCP): < 2.5s
  - First Input Delay (FID): < 100ms
  - Cumulative Layout Shift (CLS): < 0.1
  - First Contentful Paint (FCP): < 1.8s
  - Time to Interactive (TTI): < 3.8s
```

### Optimization Techniques

```javascript
// Lazy loading routes
const AdminApp = React.lazy(() => import('@/pages/admin/AdminApp'));

<Suspense fallback={<LoadingSpinner />}>
  <AdminApp />
</Suspense>

// Image optimization
<img
  src="/images/hero.jpg"
  srcSet="/images/hero-sm.jpg 640w,
          /images/hero-md.jpg 1024w,
          /images/hero-lg.jpg 1920w"
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
  loading="lazy"
  alt="Swiss Tax Services"
/>

// Code splitting
import { trackWebVitals } from '@/utils/analytics';

// Only load analytics on client
if (typeof window !== 'undefined') {
  trackWebVitals();
}
```

---

## 🌍 SEO Strategy

### Meta Tags Pattern

```jsx
import { Helmet } from 'react-helmet';

<Helmet>
  {/* Primary Meta Tags */}
  <title>Swiss Tax Returns for Expats | Taxed.ch</title>
  <meta name="title" content="Swiss Tax Returns for Expats | Taxed.ch" />
  <meta name="description" content="Professional Swiss tax filing with transparent flat-rate fees. Expert guidance for expatriates and businesses." />

  {/* Open Graph / Facebook */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://taxed.ch/" />
  <meta property="og:title" content="Swiss Tax Returns for Expats | Taxed.ch" />
  <meta property="og:description" content="Professional Swiss tax filing..." />
  <meta property="og:image" content="https://taxed.ch/og-image.jpg" />

  {/* Twitter */}
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://taxed.ch/" />
  <meta property="twitter:title" content="Swiss Tax Returns for Expats" />

  {/* Structured Data */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Taxed GmbH",
      "url": "https://taxed.ch",
      "description": "Swiss tax consulting services"
    })}
  </script>
</Helmet>
```

### Sitemap & RSS

```javascript
// Auto-generated on build
npm run build
// → Generates /public/sitemap.xml
// → Generates /public/rss.xml
// → Generates /public/llms.txt (AI crawlers)
```

---

## 🛠️ Common Tasks

### Adding a New Page

```bash
# 1. Create page component
touch src/pages/NewPage.jsx

# 2. Add to routing (src/App.jsx)
import NewPage from '@/pages/NewPage';

<Route path="/new-page" element={<NewPage />} />

# 3. Add to navigation (src/components/Header.jsx)

# 4. Add to sitemap (tools/generate-sitemap.js)
```

### Adding a New Component

```bash
# 1. Create component
touch src/components/ui/new-component.jsx

# 2. Follow component pattern
import React from 'react';
import { cn } from '@/lib/utils';

export const NewComponent = ({ className, ...props }) => {
  return (
    <div className={cn("base-classes", className)} {...props}>
      {/* Component content */}
    </div>
  );
};

# 3. Export from index (if using barrel exports)
```

### Updating Design System

```bash
# 1. Modify Tailwind config
vim tailwind.config.js

# 2. Add custom CSS (if needed)
vim src/index.css

# 3. Document in design system
vim .claude/DESIGN_SYSTEM.md

# 4. Test across pages
npm run dev

# 5. Run compliance tests
npm run test:apple-design
```

---

## 🚢 Deployment

### Build Process

```bash
# 1. Build production bundle
npm run build
# Runs:
#   - node tools/generate-rss.js
#   - node tools/generate-llms.js
#   - vite build

# 2. Preview locally
npm run preview

# 3. Deploy to Hostinger
./deploy-hostinger.sh
./simple-upload.sh
./upload-assets.sh
./verify-upload.sh
```

### CI/CD Pipeline

```yaml
# GitHub Actions (.github/workflows/deploy.yml)
name: Deploy to Hostinger
on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - run: npm test
      - name: Deploy
        run: ./deploy-hostinger.sh
```

---

## 🐛 Troubleshooting

### Common Issues

**Build Fails**
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Vite Dev Server Port Conflict**
```bash
# Change port in vite.config.js
export default defineConfig({
  server: { port: 3000 }
});
```

**Firebase Connection Issues**
```bash
# Check environment variables
cat .env | grep VITE_FIREBASE

# Reinitialize Firebase
firebase init
```

**Playwright Tests Fail**
```bash
# Reinstall browsers
npx playwright install --with-deps

# Run in headed mode for debugging
npx playwright test --headed
```

---

## 📚 Additional Documentation

- [DESIGN_SYSTEM.md](.claude/DESIGN_SYSTEM.md) - Complete design guidelines
- [COMPONENTS_CATALOG.md](.claude/COMPONENTS_CATALOG.md) - Component reference
- [PRODUCT_REQUIREMENTS_DOCUMENT.md](../PRODUCT_REQUIREMENTS_DOCUMENT.md) - Full PRD
- [ACCESSIBILITY_IMPROVEMENTS_REPORT.md](../ACCESSIBILITY_IMPROVEMENTS_REPORT.md)
- [APPLE_DESIGN_VALIDATOR_SETUP.md](../APPLE_DESIGN_VALIDATOR_SETUP.md)
- [FIREBASE_SETUP.md](../FIREBASE_SETUP.md)
- [ADMIN_PORTAL_README.md](../ADMIN_PORTAL_README.md)

---

## 🤝 Contributing

### Code Style

```javascript
// Use functional components
const Component = () => { ... }

// Destructure props
const Component = ({ title, description }) => { ... }

// Use arrow functions
const handleClick = () => { ... }

// Use Tailwind utility classes
className="flex items-center gap-4 px-4 py-2"

// Extract repeated patterns
const cardClasses = cn(
  "bg-white rounded-lg shadow-md",
  "hover:shadow-xl transition-shadow",
  className
);
```

### Commit Messages

```bash
# Format: type(scope): message

feat(landing): add new testimonial section
fix(auth): resolve Firebase login timeout
docs(readme): update installation steps
style(button): improve hover states
test(forms): add validation tests
refactor(api): simplify error handling
```

### Pull Request Process

1. Create feature branch: `git checkout -b feat/new-feature`
2. Make changes with clear commits
3. Run tests: `npm test`
4. Run Apple HIG validation: `npm run validate:design`
5. Push and create PR
6. Wait for CI/CD checks
7. Request review from team
8. Merge after approval

---

**Project Maintained By**: Taxed GmbH Development Team
**Live Website**: https://taxed.ch
**Last Updated**: November 28, 2025
**Status**: ✅ Production | WCAG AA | Apple HIG Compliant
