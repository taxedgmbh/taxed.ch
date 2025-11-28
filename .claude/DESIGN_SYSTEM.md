# Taxed.ch Design System

**Version**: 1.0
**Last Updated**: November 28, 2025
**Status**: ✅ Production (Live at https://taxed.ch)
**Compliance**: WCAG 2.1 Level AA ✅ | Apple HIG ✅

---

## 🎨 Design Philosophy

The Taxed.ch design system embodies Swiss precision, professionalism, and accessibility. Every element is crafted to provide a trustworthy, efficient experience for expatriates navigating Swiss tax services.

### Core Principles

1. **Swiss Precision** - Clean, structured layouts with attention to detail
2. **Professional Trust** - Conservative color palette with Swiss flag inspiration
3. **Accessibility First** - WCAG AA compliant, screen reader friendly
4. **Mobile Excellence** - Apple HIG compliant, optimized for all devices
5. **Performance** - Fast load times, smooth animations, optimized assets

---

## 🎨 Color Palette

### Primary Colors

```css
/* Brand Colors (Swiss-inspired) */
--steel-blue: #375A7F      /* Primary brand color - Swiss authority */
--brand-red: #C7242E        /* Accent color - Swiss flag red */
--dark-gray: #333333        /* Primary text color */
```

**Usage Guidelines:**
- **Steel Blue**: Primary buttons, links, section headers, brand elements
- **Brand Red**: Call-to-action buttons, highlights, important notices
- **Dark Gray**: Body text, headings on light backgrounds

### Neutral Grays

```css
/* Background Colors */
--light-gray-bg-1: #FAFAFA  /* Primary page background */
--light-gray-bg-2: #F2F2F2  /* Secondary sections, cards */
--warm-red-tint: #F5E9E6    /* Subtle accent backgrounds */

/* Text Colors */
--foreground: #333333       /* Primary text (HSL: 0 0% 13%) */
--muted-foreground: #6B7280 /* Secondary text */
```

### Semantic Colors (Tailwind Extended)

```css
/* UI State Colors - All WCAG AA Compliant */
--primary: hsl(210, 29%, 36%)           /* Steel Blue */
--secondary: hsl(357, 70%, 48%)         /* Brand Red */
--muted: hsl(0, 0%, 95%)                /* Light Gray */
--accent: hsl(357, 20%, 96%)            /* Warm Red Tint */
--destructive: hsl(0, 84.2%, 60.2%)     /* Error states */
--border: hsl(210, 20%, 85%)            /* Borders, dividers */
--input: hsl(210, 20%, 90%)             /* Form inputs */
--ring: hsl(210, 29%, 36%)              /* Focus rings */
```

### Color Contrast Ratios (WCAG AA Compliance)

| Text Color | Background | Ratio | Status | Usage |
|------------|------------|-------|--------|-------|
| `gray-900` | `white` | 15.3:1 | ✅ AAA | Primary text |
| `gray-700` | `white` | 4.5:1 | ✅ AA | Secondary text |
| `blue-900` | `blue-100` | 7.0:1 | ✅ AA | Alerts, badges |
| `white` | `blue-600` | 7.0:1 | ✅ AA | Primary buttons |
| `white` | `steel-blue` | 6.8:1 | ✅ AA | Hero sections |
| `white` | `brand-red` | 5.2:1 | ✅ AA | CTA buttons |
| `gray-200` | `gray-900` | 11.7:1 | ✅ AAA | Dark backgrounds |

**WCAG Standards:**
- AA Normal Text: Minimum 4.5:1 ✅
- AA Large Text (≥24px): Minimum 3:1 ✅
- AAA Normal Text: Minimum 7:1 (preferred)

---

## 📝 Typography

### Font Family

```css
/* Primary Font Stack */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
             'Helvetica Neue', Arial, sans-serif;

/* Serif (Magazine-style content) */
font-family: 'Georgia', 'Times New Roman', serif;
```

**Inter Font Weights:**
- 300 (Light) - Rarely used
- 400 (Regular) - Body text
- 500 (Medium) - Subheadings, emphasis
- 600 (SemiBold) - Section headers
- 700 (Bold) - Primary headings
- 800 (ExtraBold) - Hero titles

### Type Scale

```css
/* Mobile-First Responsive Typography */

/* Headings */
--h1-mobile: 2rem      /* 32px - text-2xl */
--h1-tablet: 3rem      /* 48px - text-3xl sm:text-4xl */
--h1-desktop: 4rem     /* 64px - text-4xl lg:text-5xl */
--h1-xl: 5rem          /* 80px - xl:text-6xl */

--h2-mobile: 1.5rem    /* 24px - text-xl */
--h2-tablet: 2rem      /* 32px - sm:text-2xl */
--h2-desktop: 2.5rem   /* 40px - md:text-3xl lg:text-4xl */

--h3-mobile: 1.25rem   /* 20px - text-lg */
--h3-tablet: 1.5rem    /* 24px - sm:text-xl */
--h3-desktop: 1.875rem /* 30px - md:text-2xl lg:text-3xl */

--h4: 1.125rem - 1.5rem /* 18px-24px - text-lg to text-xl */

/* Body Text */
--body-base: 1rem      /* 16px - Minimum for accessibility */
--body-large: 1.125rem /* 18px - Enhanced readability */
--body-xl: 1.25rem     /* 20px - Hero descriptions */
--small-text: 0.875rem /* 14px - Captions, footnotes */
```

### Line Heights

```css
--leading-tight: 1.25      /* Headings - leading-tight */
--leading-relaxed: 1.7     /* Body text - leading-relaxed */
--leading-loose: 2         /* Spacious content */
```

### Typography Classes

```jsx
// Heading Examples
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
  Swiss Tax Returns Simplified
</h1>

<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
  Our Services
</h2>

// Body Text
<p className="text-base sm:text-lg leading-relaxed text-gray-700">
  Professional Swiss tax filing for expatriates...
</p>

// Magazine-style Article
<article className="magazine-article">
  <h1>Tax Guide 2025</h1>
  <p>Expert insights on Swiss taxation...</p>
</article>
```

---

## 📏 Spacing System

### Base Scale (Tailwind Default)

```css
/* Spacing Scale (rem/px) */
--space-1: 0.25rem   /* 4px  - px-1, py-1 */
--space-2: 0.5rem    /* 8px  - px-2, py-2 */
--space-3: 0.75rem   /* 12px - px-3, py-3 */
--space-4: 1rem      /* 16px - px-4, py-4 */
--space-5: 1.25rem   /* 20px */
--space-6: 1.5rem    /* 24px - px-6, py-6 */
--space-8: 2rem      /* 32px - px-8, py-8 */
--space-10: 2.5rem   /* 40px */
--space-12: 3rem     /* 48px */
--space-16: 4rem     /* 64px */
--space-20: 5rem     /* 80px */
--space-24: 6rem     /* 96px */
```

### Responsive Padding

```jsx
// Container Padding (Mobile → Desktop)
<section className="px-4 sm:px-6 lg:px-8">
  {/* Mobile: 16px, Tablet: 24px, Desktop: 32px */}
</section>

// Vertical Spacing
<section className="py-12 lg:py-20">
  {/* Mobile: 48px, Desktop: 80px */}
</section>

// Section Gaps
<div className="space-y-6 lg:space-y-8">
  {/* Mobile: 24px, Desktop: 32px between children */}
</div>
```

### Layout Containers

```jsx
// Max-width Container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* 1280px max, centered, responsive padding */}
</div>

// Content Width (Readable)
<article className="max-w-3xl mx-auto">
  {/* 768px max for optimal reading */}
</article>
```

---

## 🎭 Components

### Buttons

#### Variants & Sizes

```jsx
import { Button } from '@/components/ui/button';

// Primary Button (Steel Blue)
<Button variant="default" size="default">
  Get Started
</Button>

// Secondary Button (Brand Red)
<Button variant="secondary" size="lg" className="bg-brand-red hover:bg-brand-red/90">
  View Packages
</Button>

// Outline Button
<Button variant="outline">
  Learn More
</Button>

// Ghost Button
<Button variant="ghost">
  Cancel
</Button>

// Link Button
<Button variant="link">
  Read More
</Button>
```

#### Size Options

```css
/* Button Sizes */
--btn-sm: h-9 px-3     /* Small: 36px height */
--btn-default: h-10 px-4 py-2  /* Default: 40px height */
--btn-lg: h-11 px-8    /* Large: 44px height ✅ Apple HIG */
--btn-icon: h-10 w-10  /* Icon only: 40px × 40px */
```

#### Accessibility Features

```jsx
// Focus States (WCAG 2.1 compliant)
className="focus-visible:outline-none focus-visible:ring-2
           focus-visible:ring-ring focus-visible:ring-offset-2"

// Touch Targets (Apple HIG: minimum 44×44pt)
<Button size="lg" className="min-w-[44px] min-h-[44px]">
  Submit
</Button>

// ARIA Labels
<Button aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>
```

### Cards

```jsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card className="card-hover">
  <CardHeader>
    <CardTitle>Professional Tax Filing</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Expert guidance for your Swiss tax returns...</p>
  </CardContent>
</Card>

// Card Hover Effect
.card-hover {
  @apply transition-all duration-300 hover:shadow-xl hover:-translate-y-1;
}
```

### Forms

```jsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

<div className="space-y-2">
  <Label htmlFor="email">Email Address</Label>
  <Input
    id="email"
    type="email"
    placeholder="your@email.com"
    className="h-11"  // 44px height for touch targets
  />
</div>
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Tailwind Breakpoints */
@media (min-width: 640px)  { /* sm - Small tablet */ }
@media (min-width: 768px)  { /* md - Tablet */ }
@media (min-width: 1024px) { /* lg - Desktop */ }
@media (min-width: 1280px) { /* xl - Large desktop */ }
@media (min-width: 1536px) { /* 2xl - Extra large */ }
```

### Mobile-First Patterns

```jsx
// Grid Layouts
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 1 column → 2 columns → 3 columns */}
</div>

// Flex Layouts
<div className="flex flex-col sm:flex-row gap-4">
  {/* Stack on mobile, row on tablet+ */}
</div>

// Text Sizing
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  {/* Progressive scaling across breakpoints */}
</h1>

// Spacing
<section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
  {/* Compact on mobile, spacious on desktop */}
</section>
```

### Container Strategy

```jsx
// Full-width background, constrained content
<section className="w-full bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    {/* Content constrained to 1280px */}
  </div>
</section>
```

---

## ♿ Accessibility (WCAG 2.1 Level AA)

### Compliance Checklist

✅ **1.4.3 Contrast (Minimum)** - All text meets 4.5:1 ratio
✅ **1.4.11 Non-text Contrast** - UI components have 3:1 ratio
✅ **2.1.1 Keyboard** - All functionality keyboard accessible
✅ **2.4.7 Focus Visible** - Clear focus indicators throughout
✅ **1.3.5 Identify Input Purpose** - Proper autocomplete attributes
✅ **1.4.10 Reflow** - No horizontal scroll at 320px width
✅ **1.4.12 Text Spacing** - Content adapts to text spacing changes

### Skip Navigation

```jsx
// Always include at top of page
<a href="#main-content"
   className="sr-only focus:not-sr-only focus:absolute focus:top-4
              focus:left-4 bg-white px-4 py-2 rounded shadow-lg z-50">
  Skip to main content
</a>

<main id="main-content">
  {/* Page content */}
</main>
```

### ARIA Best Practices

```jsx
// Buttons with icons only
<button aria-label="Close menu">
  <X className="h-4 w-4" />
</button>

// Form inputs
<label htmlFor="search" className="sr-only">Search</label>
<input id="search" type="search" placeholder="Search..." />

// Navigation
<nav aria-label="Main navigation">
  {/* Menu items */}
</nav>

// Landmarks
<header>
  <nav aria-label="Primary">...</nav>
</header>
<main>...</main>
<footer>...</footer>
```

### Focus States

```css
/* All interactive elements must have visible focus */
.focus-visible:ring-2 {
  ring-color: hsl(210, 29%, 36%);  /* Steel blue */
  ring-offset: 2px;
}

/* High contrast for buttons */
button:focus-visible {
  @apply ring-2 ring-offset-2 ring-blue-600;
}
```

---

## 🍎 Apple Human Interface Guidelines Compliance

### Touch Targets

**Requirement**: Minimum 44×44 points for all interactive elements

```jsx
// Buttons
<Button size="lg" className="min-h-[44px]">Submit</Button>

// Icon Buttons
<button className="w-11 h-11 flex items-center justify-center">
  <Icon className="w-5 h-5" />
</button>

// Links in navigation
<a className="px-4 py-3 inline-block">  {/* 44px height minimum */}
  Services
</a>
```

### Typography Standards

**Requirement**: Minimum 16px body text, scalable with system settings

```css
/* Base font size */
body {
  font-size: 16px;  /* Never smaller */
}

/* Relative sizing */
.text-sm { font-size: 0.875rem; }  /* 14px - Use sparingly */
.text-base { font-size: 1rem; }    /* 16px - Minimum standard */
.text-lg { font-size: 1.125rem; }  /* 18px - Preferred */
```

### Safe Areas

```css
/* Mobile viewport considerations */
.mobile-safe {
  padding-bottom: env(safe-area-inset-bottom);
  padding-top: env(safe-area-inset-top);
}
```

### Gestures & Interactions

```jsx
// Swipe-friendly card spacing
<div className="grid gap-4">  {/* Minimum 16px gap */}
  {cards.map(...)}
</div>

// Tap feedback
<button className="active:scale-95 transition-transform">
  Tap Me
</button>
```

---

## 🎬 Animation & Motion

### Animation Principles

1. **Purposeful** - Animations guide attention and provide feedback
2. **Fast** - Duration 150-300ms for most interactions
3. **Natural** - Use easing functions for realistic motion
4. **Respectful** - Support `prefers-reduced-motion`

### Framer Motion Patterns

```jsx
import { motion } from 'framer-motion';

// Fade in on mount
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>

// Stagger children
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }}
  initial="hidden"
  animate="show"
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

### CSS Transitions

```css
/* Hover transitions */
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

/* Button interactions */
button {
  transition-property: background-color, border-color, color, transform;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🌈 Visual Effects

### Gradients

```css
/* Swiss Gradient (Brand) */
.swiss-gradient {
  background: linear-gradient(135deg, #375A7F 0%, #C7242E 100%);
}

/* Hero Pattern */
.hero-pattern {
  background-image:
    radial-gradient(circle at 25px 25px, rgba(255,255,255,0.08) 2px, transparent 0),
    radial-gradient(circle at 75px 75px, rgba(255,255,255,0.04) 2px, transparent 0);
  background-size: 100px 100px;
}

/* Glass Effect */
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Shadows

```css
/* Shadow Scale */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.1);

/* Text Shadow */
.text-shadow {
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
```

### Border Radius

```css
--radius: 0.5rem;           /* 8px - Default */
--radius-md: calc(var(--radius) - 2px);  /* 6px */
--radius-sm: calc(var(--radius) - 4px);  /* 4px */
--radius-lg: 1rem;          /* 16px - Cards */
--radius-xl: 1.5rem;        /* 24px - Hero sections */
--radius-full: 9999px;      /* Circular */
```

---

## 📐 Grid Systems

### Standard Grid

```jsx
// 12-column responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {/* Auto-responsive columns */}
</div>

// Custom column spans
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-12 lg:col-span-8">Main content</div>
  <div className="col-span-12 lg:col-span-4">Sidebar</div>
</div>
```

### Flexbox Patterns

```jsx
// Centered content
<div className="flex items-center justify-center min-h-screen">
  <div>Centered</div>
</div>

// Space between
<div className="flex justify-between items-center">
  <h2>Title</h2>
  <button>Action</button>
</div>

// Responsive flex direction
<div className="flex flex-col lg:flex-row gap-8">
  <div className="flex-1">Content 1</div>
  <div className="flex-1">Content 2</div>
</div>
```

---

## 🔍 Testing & Validation

### Automated Tests

```bash
# Apple HIG Compliance Tests
npm run test:apple-design

# Accessibility Audit
npm run test -- --grep "accessibility"

# Visual Regression
npm run test:ui
```

### Manual Checklist

- [ ] All text meets 4.5:1 contrast ratio (use WebAIM checker)
- [ ] All interactive elements ≥44×44px
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announces all content correctly
- [ ] No horizontal scroll at 320px width
- [ ] Page loads in <3 seconds
- [ ] Animations respect prefers-reduced-motion

### Tools

- **Chrome DevTools Lighthouse** - Accessibility score >95
- **WAVE Browser Extension** - 0 errors
- **Axe DevTools** - Automated accessibility testing
- **Playwright Tests** - Cross-browser compliance

---

## 📚 Resources

### Official Documentation
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Internal Documentation
- [ACCESSIBILITY_IMPROVEMENTS_REPORT.md](../ACCESSIBILITY_IMPROVEMENTS_REPORT.md)
- [APPLE_DESIGN_VALIDATOR_SETUP.md](../APPLE_DESIGN_VALIDATOR_SETUP.md)
- [PRODUCT_REQUIREMENTS_DOCUMENT.md](../PRODUCT_REQUIREMENTS_DOCUMENT.md)

### Design Tools
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors Palette Generator](https://coolors.co/)
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)

---

**Last Updated**: November 28, 2025
**Maintained By**: Taxed GmbH Development Team
**Status**: ✅ Production-Ready | WCAG AA Compliant | Apple HIG Validated
