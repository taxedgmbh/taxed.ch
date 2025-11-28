# 🇨🇭 Taxed.ch - Claude Code Documentation Hub

**Professional Swiss Tax Consulting Platform**

[![Live](https://img.shields.io/badge/Status-Live-success)](https://taxed.ch)
[![WCAG AA](https://img.shields.io/badge/WCAG-AA-blue)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Apple HIG](https://img.shields.io/badge/Apple-HIG%20Compliant-lightgrey)](https://developer.apple.com/design/human-interface-guidelines/)
[![React](https://img.shields.io/badge/React-18.2-61dafb)](https://react.dev/)

---

## 📖 Quick Navigation

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** | Complete design guidelines, colors, typography, components | Implementing new features, ensuring consistency |
| **[PROJECT_CONTEXT.md](PROJECT_CONTEXT.md)** | Technical architecture, dev workflow, best practices | Onboarding, understanding project structure |
| **[COMPONENTS_CATALOG.md](COMPONENTS_CATALOG.md)** | Component reference with code examples | Building UI, learning component APIs |
| **[settings.local.json](settings.local.json)** | Claude Code permissions | Configuring Claude access |

---

## 🎯 What is This?

This is the **Claude Code documentation hub** for the Taxed.ch website. These files are specifically designed to help Claude Code (and human developers) understand:

- ✅ The current design system and visual language
- ✅ Component library and usage patterns
- ✅ Apple Human Interface Guidelines compliance
- ✅ Accessibility standards (WCAG 2.1 Level AA)
- ✅ Project structure and development workflow
- ✅ Best practices and coding conventions

---

## 🚀 Getting Started

### For Claude Code

When working on this project, reference these documents to:

1. **Maintain Design Consistency**
   - Check `DESIGN_SYSTEM.md` for colors, typography, spacing
   - Use existing components from `COMPONENTS_CATALOG.md`
   - Follow Apple HIG compliance guidelines

2. **Understand Project Structure**
   - Review `PROJECT_CONTEXT.md` for architecture
   - Follow established patterns and conventions
   - Use proper import paths and component composition

3. **Build New Features**
   - Use existing components whenever possible
   - Maintain WCAG AA accessibility standards
   - Ensure 44×44px minimum touch targets
   - Test across responsive breakpoints

### For Human Developers

```bash
# 1. Read this README first
cat .claude/README.md

# 2. Review design system
cat .claude/DESIGN_SYSTEM.md

# 3. Browse component catalog
cat .claude/COMPONENTS_CATALOG.md

# 4. Understand project context
cat .claude/PROJECT_CONTEXT.md

# 5. Start developing
npm run dev
```

---

## 📚 Documentation Index

### 1. Design System (`DESIGN_SYSTEM.md`)

Comprehensive design guidelines covering:

- **Color Palette**
  - Primary colors (Steel Blue, Brand Red, Dark Gray)
  - Neutral grays and semantic colors
  - WCAG AA contrast ratios

- **Typography**
  - Inter font family and weights
  - Responsive type scale
  - Line heights and spacing

- **Components**
  - Button variants and sizes
  - Card patterns
  - Form elements

- **Responsive Design**
  - Breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
  - Mobile-first patterns
  - Grid systems

- **Accessibility**
  - WCAG 2.1 Level AA compliance
  - Focus states and keyboard navigation
  - ARIA best practices

- **Apple HIG Compliance**
  - Touch targets (44×44pt minimum)
  - Typography standards
  - Gestures and interactions

- **Animation & Motion**
  - Framer Motion patterns
  - CSS transitions
  - Reduced motion support

### 2. Project Context (`PROJECT_CONTEXT.md`)

Technical documentation including:

- **Technology Stack**
  - React 18 + Vite
  - Tailwind CSS + Radix UI
  - Firebase backend
  - Playwright testing

- **Project Structure**
  - Detailed directory tree
  - File organization
  - Import patterns

- **Development Workflow**
  - Setup instructions
  - Available scripts
  - Environment variables

- **Design Patterns**
  - Component structure
  - State management
  - Page patterns

- **Testing Strategy**
  - Apple HIG compliance tests
  - Component tests
  - Accessibility testing

- **Deployment**
  - Build process
  - CI/CD pipeline
  - Hostinger deployment

### 3. Components Catalog (`COMPONENTS_CATALOG.md`)

Complete component reference with:

- **Base UI Components** (30+)
  - Button, Card, Input, Label, Textarea
  - Select, Accordion, Tabs, Dropdown
  - Badge, Toast, and more

- **Layout Components**
  - Navigation, Header, Footer
  - Layout wrapper

- **Section Components**
  - HeroSection, BenefitsSection
  - PackagesSection, FaqSection
  - TestimonialsSection, NewsletterSection

- **Feature Components**
  - ShoppingCart, AdminPanel
  - ClientPortal

- **Utility Components**
  - SEO, LoadingSpinner, ErrorBoundary
  - Analytics, ShareButton, ReadAloud

- **Code Examples**
  - Usage patterns
  - Props documentation
  - Accessibility features

---

## 🎨 Design Principles

### 1. Swiss Precision

Clean, structured layouts with meticulous attention to detail. Every element serves a purpose.

```jsx
// Example: Precise spacing and alignment
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Perfectly aligned grid */}
  </div>
</section>
```

### 2. Professional Trust

Conservative color palette inspired by Swiss flag. Authority and reliability.

```css
/* Brand Colors */
--steel-blue: #375A7F    /* Swiss authority */
--brand-red: #C7242E      /* Swiss flag red */
--dark-gray: #333333      /* Professional text */
```

### 3. Accessibility First

WCAG 2.1 Level AA compliance is not optional—it's the foundation.

```jsx
// Every component includes accessibility
<button
  aria-label="Submit tax return"
  className="focus-visible:ring-2 focus-visible:ring-offset-2"
>
  Submit
</button>
```

### 4. Mobile Excellence

Apple HIG compliant with optimized touch targets and responsive design.

```jsx
// 44×44px minimum touch targets
<Button size="lg" className="min-h-[44px]">
  Get Started
</Button>
```

### 5. Performance

Fast load times, optimized assets, smooth animations.

```javascript
// Lazy loading for better performance
const AdminApp = React.lazy(() => import('@/pages/admin/AdminApp'));
```

---

## ✅ Compliance Checklist

### WCAG 2.1 Level AA

- [x] **1.4.3 Contrast (Minimum)** - All text meets 4.5:1 ratio
- [x] **1.4.11 Non-text Contrast** - UI components have 3:1 ratio
- [x] **2.1.1 Keyboard** - All functionality keyboard accessible
- [x] **2.4.7 Focus Visible** - Clear focus indicators throughout
- [x] **1.3.5 Identify Input Purpose** - Proper autocomplete attributes
- [x] **1.4.10 Reflow** - No horizontal scroll at 320px width
- [x] **1.4.12 Text Spacing** - Content adapts to text spacing changes

### Apple Human Interface Guidelines

- [x] **Touch Targets** - Minimum 44×44 points for all interactive elements
- [x] **Typography** - Minimum 16px body text, scalable
- [x] **Color Contrast** - WCAG AA compliant across all states
- [x] **Accessibility Labels** - All interactive elements properly labeled
- [x] **Keyboard Navigation** - Full keyboard support
- [x] **Responsive Layout** - Optimized for iPhone SE to 4K displays

### Performance Metrics

- [x] **Largest Contentful Paint (LCP)** - < 2.5s
- [x] **First Input Delay (FID)** - < 100ms
- [x] **Cumulative Layout Shift (CLS)** - < 0.1
- [x] **First Contentful Paint (FCP)** - < 1.8s
- [x] **Lighthouse Accessibility Score** - > 95

---

## 🛠️ Development Quick Reference

### Common Tasks

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Check Apple HIG compliance
npm run test:apple-design

# Validate design system
npm run validate:design

# Auto-fix design violations
npm run validate:design:fix
```

### Import Patterns

```javascript
// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Layout Components
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Utilities
import { cn } from '@/lib/utils';

// Hooks
import { useCart } from '@/hooks/useCart';
```

### Component Template

```jsx
import React from 'react';
import { cn } from '@/lib/utils';

const MyComponent = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "base-classes-here",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default MyComponent;
```

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Total Pages** | 47+ |
| **UI Components** | 30+ |
| **Lines of Code** | 30,000+ |
| **Design Tokens** | 50+ (colors, spacing, typography) |
| **Accessibility Score** | 95+ (Lighthouse) |
| **Performance Score** | 90+ (Lighthouse) |
| **Test Coverage** | Apple HIG + WCAG AA |

---

## 🔄 Maintenance

### Updating Design System

When making design changes:

1. Update design tokens in `tailwind.config.js`
2. Document changes in `DESIGN_SYSTEM.md`
3. Update affected components
4. Run compliance tests: `npm run test:apple-design`
5. Verify across all breakpoints

### Adding New Components

1. Create component in appropriate directory
2. Follow component pattern from `COMPONENTS_CATALOG.md`
3. Ensure WCAG AA compliance
4. Add to `COMPONENTS_CATALOG.md` with examples
5. Include in exports if creating barrel exports

### Before Committing

```bash
# 1. Run linting
npm run lint

# 2. Run tests
npm test

# 3. Check design compliance
npm run validate:design

# 4. Build to catch errors
npm run build

# 5. Commit
git add .
git commit -m "feat: your feature description"
```

---

## 📖 Additional Documentation

### In Repository Root

- **[PRODUCT_REQUIREMENTS_DOCUMENT.md](../PRODUCT_REQUIREMENTS_DOCUMENT.md)** - Comprehensive PRD
- **[ACCESSIBILITY_IMPROVEMENTS_REPORT.md](../ACCESSIBILITY_IMPROVEMENTS_REPORT.md)** - Accessibility audit results
- **[APPLE_DESIGN_VALIDATOR_SETUP.md](../APPLE_DESIGN_VALIDATOR_SETUP.md)** - Automated testing setup
- **[LANDING_PAGE_AUDIT.md](../LANDING_PAGE_AUDIT.md)** - Design audit findings
- **[README.md](../README.md)** - Main project README

### Firebase Documentation

- **[FIREBASE_SETUP.md](../FIREBASE_SETUP.md)** - Firebase configuration
- **[FIRESTORE_RULES_FOR_YOUR_STRUCTURE.txt](../FIRESTORE_RULES_FOR_YOUR_STRUCTURE.txt)** - Security rules
- **[REQUIRED_FIRESTORE_INDEXES.md](../REQUIRED_FIRESTORE_INDEXES.md)** - Database indexes

### Admin Documentation

- **[ADMIN_PORTAL_README.md](../ADMIN_PORTAL_README.md)** - Admin panel guide
- **[ADMIN_PORTAL_QUICKSTART.md](../ADMIN_PORTAL_QUICKSTART.md)** - Quick setup
- **[ADMIN_PANEL_IMPROVEMENTS.md](../ADMIN_PANEL_IMPROVEMENTS.md)** - Improvement roadmap

---

## 🌟 Key Features

### Live Production Website
✅ https://taxed.ch - Fully operational Swiss tax consulting platform

### Professional Tax Services
- Individual tax returns for expatriates
- Business tax consulting
- International income reporting
- Digital filing and tracking

### Technical Excellence
- React 18 + Vite for modern development
- Tailwind CSS for responsive design
- Firebase for backend services
- Playwright for automated testing

### User Experience
- Mobile-first responsive design
- Apple HIG compliant touch targets
- WCAG AA accessibility standards
- Smooth Framer Motion animations

### Content & SEO
- 10+ blog articles on Swiss taxation
- AI-powered content generation
- RSS feed and sitemap
- Google Analytics + Bing Webmaster integration

---

## 🤝 Contributing

### Code Style

- Use functional components with hooks
- Follow mobile-first responsive patterns
- Maintain WCAG AA accessibility
- Use Tailwind utility classes
- Extract repeated patterns into components
- Include proper TypeScript types where applicable

### Commit Convention

```bash
feat(scope): add new feature
fix(scope): fix bug
docs(scope): update documentation
style(scope): formatting changes
refactor(scope): code refactoring
test(scope): add tests
```

### Pull Request Process

1. Create feature branch from `main`
2. Make changes with clear commits
3. Run tests: `npm test`
4. Check design compliance: `npm run validate:design`
5. Push and create PR
6. Wait for CI/CD checks
7. Merge after approval

---

## 🎓 Learning Resources

### Official Documentation
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)

### Design Guidelines
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design](https://m3.material.io/)

### Testing & Tools
- [Playwright](https://playwright.dev/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Chrome DevTools Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

## 🆘 Need Help?

### Common Issues

**Build Fails**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Design Violations**
```bash
npm run validate:design
# Review audit-results/fix-plan.md
npm run validate:design:fix
```

**Accessibility Errors**
```bash
npm run test:apple-design
# Check test reports in playwright-report/
```

### Getting Support

1. Check relevant documentation file in `.claude/`
2. Review project README files
3. Run applicable tests
4. Check GitHub issues
5. Contact development team

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Nov 28, 2025 | Initial Claude documentation hub created |
| - | Nov 5, 2025 | Accessibility improvements implemented |
| - | Oct 19, 2025 | Apple Design Validator setup |
| - | Sep 10, 2025 | Website launched at taxed.ch |

---

## 📞 Contact

**Project**: Taxed GmbH Website
**Website**: https://taxed.ch
**Repository**: Private
**Maintained By**: Taxed GmbH Development Team

---

**🇨🇭 Professional Swiss Tax Services for Expats Worldwide**

*Documentation last updated: November 28, 2025*

---

## ⚡ Quick Start Checklist

- [ ] Read this README
- [ ] Review `DESIGN_SYSTEM.md` for visual guidelines
- [ ] Browse `COMPONENTS_CATALOG.md` for available components
- [ ] Check `PROJECT_CONTEXT.md` for technical details
- [ ] Run `npm install`
- [ ] Start dev server: `npm run dev`
- [ ] Run tests: `npm test`
- [ ] Check compliance: `npm run validate:design`

✅ **Ready to build amazing features for Taxed.ch!**
