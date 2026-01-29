# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Professional Swiss tax consulting website (https://taxed.ch) - React 18 + Vite + Tailwind CSS + Firebase.

## Commands

```bash
# Development
npm run dev              # Start dev server at http://localhost:5173
npm run build            # Build (runs generate-rss + generate-llms + vite build)
npm run preview          # Preview production build

# Testing
npm test                 # Run Playwright tests
npm run test:ui          # Playwright UI mode
npm run test:apple-design # Apple HIG compliance tests

# Design Validation
npm run validate:design       # Check Apple HIG compliance
npm run validate:design:fix   # Auto-fix violations
```

## Architecture

```
src/
├── components/
│   ├── ui/              # Base UI (button, card, input, accordion, etc.) - Radix UI primitives
│   ├── landing/         # Landing page sections (HeroSection, BenefitsSection, etc.)
│   ├── sections/        # Reusable page sections (.tsx)
│   ├── layout/          # Layout, Navigation, Sidebar (.tsx)
│   ├── common/          # SEO, Analytics, ErrorBoundary, LoadingSpinner (.tsx)
│   ├── Header.jsx       # Global header
│   └── Footer.jsx       # Global footer
├── pages/               # 47+ page components
│   ├── admin/           # Admin portal (AdminApp.tsx, Dashboard, Documents, etc.)
│   └── *.jsx            # Public pages
├── services/            # Business logic (authService, newsService, aiBlogGenerator, etc.)
├── hooks/               # Custom hooks (useCart, useAuth, useLocalStorage)
├── contexts/            # React Context (ClientAuthContext)
├── utils/               # Utilities (analytics, performance, bing)
├── config/              # firebase.ts configuration
├── lib/utils.js         # cn() helper for class merging
└── App.jsx              # Root with all routes
```

## Key Patterns

### Import Alias
Use `@/` for src imports:
```javascript
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
```

### Component Pattern
```jsx
import { cn } from '@/lib/utils';

const Component = ({ className, ...props }) => (
  <div className={cn("base-classes", className)} {...props} />
);
```

### Page Pattern
```jsx
import { Helmet } from 'react-helmet';

const Page = () => (
  <>
    <Helmet>
      <title>Page Title | Taxed.ch</title>
      <meta name="description" content="..." />
    </Helmet>
    {/* Content */}
  </>
);
```

### Routing
All routes defined in `src/App.jsx`. Admin portal uses nested routing at `/admin/*` with separate `AdminApp.tsx`.

## Design System

### Brand Colors (tailwind.config.js)
- `steel-blue`: #375A7F (primary)
- `brand-red`: #C7242E (Swiss flag accent)
- `dark-gray`: #333333 (text)
- `light-gray-bg-1`: #FAFAFA
- `light-gray-bg-2`: #F2F2F2

### Compliance Requirements
- WCAG 2.1 Level AA (4.5:1 contrast ratio)
- Apple HIG (44x44pt minimum touch targets)
- Mobile-first responsive design

## Firebase

Environment variables (`.env`):
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Firebase initialized in `src/config/firebase.ts`, exports: `auth`, `db`, `storage`, `functions`.

## Build Process

`npm run build` runs:
1. `node tools/generate-rss.js` - Generates `/public/rss.xml`
2. `node tools/generate-llms.js` - Generates `/public/llms.txt`
3. `vite build` - Outputs to `/dist`

## Testing

Playwright configured with Apple device presets (iPhone 15, iPad Pro, Desktop Safari). Tests in `/tests/`. Config includes auto-start of dev server.

```bash
npm run test:apple-design  # Run Apple HIG compliance suite
```

## Backend

PHP backend in `/backend/` for MySQL database operations (forum, auth, contact forms). Deployed separately to Hostinger.

## Additional Documentation

Detailed documentation in `.claude/`:
- `DESIGN_SYSTEM.md` - Colors, typography, components, accessibility
- `PROJECT_CONTEXT.md` - Full technical architecture
- `COMPONENTS_CATALOG.md` - Component reference with examples
