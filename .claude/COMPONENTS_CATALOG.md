# Taxed.ch Components Catalog

**Version**: 1.0
**Last Updated**: November 28, 2025
**Total Components**: 30+

---

## 📚 Table of Contents

1. [Base UI Components](#base-ui-components)
2. [Form Components](#form-components)
3. [Layout Components](#layout-components)
4. [Section Components](#section-components)
5. [Feature Components](#feature-components)
6. [Utility Components](#utility-components)

---

## Base UI Components

### Button

**Path**: `src/components/ui/button.jsx`

Versatile button component with multiple variants and sizes. Apple HIG compliant with 44px minimum touch targets.

#### Variants

```jsx
import { Button } from '@/components/ui/button';

// Default (Primary - Steel Blue)
<Button variant="default">
  Get Started
</Button>

// Secondary (Brand Red)
<Button variant="secondary">
  View Packages
</Button>

// Destructive (Error/Delete actions)
<Button variant="destructive">
  Delete Account
</Button>

// Outline (Secondary actions)
<Button variant="outline">
  Learn More
</Button>

// Ghost (Tertiary actions)
<Button variant="ghost">
  Cancel
</Button>

// Link (Text-only button)
<Button variant="link">
  Read Documentation
</Button>
```

#### Sizes

```jsx
// Small (36px height)
<Button size="sm">Small</Button>

// Default (40px height)
<Button size="default">Default</Button>

// Large (44px height - Apple HIG minimum)
<Button size="lg">Large</Button>

// Icon only (40×40px)
<Button size="icon">
  <Search className="h-4 w-4" />
</Button>
```

#### With Icons

```jsx
import { ArrowRight, Download, Mail } from 'lucide-react';

<Button>
  Continue
  <ArrowRight className="ml-2 h-4 w-4" />
</Button>

<Button variant="outline">
  <Download className="mr-2 h-4 w-4" />
  Download PDF
</Button>
```

#### As Link (React Router)

```jsx
import { Link } from 'react-router-dom';

<Button asChild>
  <Link to="/services">View Services</Link>
</Button>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'ghost' \| 'link'` | `'default'` | Button style variant |
| `size` | `'sm' \| 'default' \| 'lg' \| 'icon'` | `'default'` | Button size |
| `asChild` | `boolean` | `false` | Use child as button element |
| `className` | `string` | `''` | Additional CSS classes |
| `disabled` | `boolean` | `false` | Disable button |

#### Accessibility

- ✅ Keyboard accessible (Tab, Enter, Space)
- ✅ Focus visible states (ring-2)
- ✅ ARIA-compliant
- ✅ 44×44px minimum (size="lg")

---

### Card

**Path**: `src/components/ui/card.jsx`

Container component for grouped content with optional header, title, and description.

#### Basic Usage

```jsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Professional Tax Filing</CardTitle>
    <CardDescription>
      Expert guidance for your Swiss tax returns
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Comprehensive tax services including...</p>
  </CardContent>
  <CardFooter>
    <Button>Learn More</Button>
  </CardFooter>
</Card>
```

#### With Hover Effect

```jsx
<Card className="card-hover">
  <CardContent>
    Hover over me for lift effect
  </CardContent>
</Card>

/* CSS in index.css */
.card-hover {
  @apply transition-all duration-300 hover:shadow-xl hover:-translate-y-1;
}
```

#### Pricing Card

```jsx
<Card className="pricing-card">
  <CardHeader>
    <CardTitle>Basic Package</CardTitle>
    <div className="text-3xl font-bold">CHF 250</div>
  </CardHeader>
  <CardContent>
    <ul className="space-y-2">
      <li>✓ Individual tax return</li>
      <li>✓ Digital filing</li>
      <li>✓ Email support</li>
    </ul>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Get Started</Button>
  </CardFooter>
</Card>
```

#### Components

- `Card` - Main container
- `CardHeader` - Optional header section
- `CardTitle` - Card title (h3 by default)
- `CardDescription` - Subtitle/description (p)
- `CardContent` - Main content area
- `CardFooter` - Optional footer section

---

### Input

**Path**: `src/components/ui/input.jsx`

Text input component with consistent styling and accessibility features.

#### Basic Usage

```jsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

<div className="space-y-2">
  <Label htmlFor="email">Email Address</Label>
  <Input
    id="email"
    type="email"
    placeholder="your@email.com"
  />
</div>
```

#### Input Types

```jsx
// Text
<Input type="text" placeholder="Enter your name" />

// Email
<Input type="email" placeholder="your@email.com" />

// Password
<Input type="password" placeholder="••••••••" />

// Number
<Input type="number" min="0" max="100" />

// Search
<Input type="search" placeholder="Search..." />

// Date
<Input type="date" />
```

#### With Icons

```jsx
import { Search, Mail } from 'lucide-react';

<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
  <Input
    className="pl-10"
    placeholder="Search..."
  />
</div>
```

#### Disabled State

```jsx
<Input disabled placeholder="This field is disabled" />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | HTML input type |
| `placeholder` | `string` | `''` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable input |
| `className` | `string` | `''` | Additional CSS classes |
| `id` | `string` | - | Input ID (for label) |

---

### Label

**Path**: `src/components/ui/label.jsx`

Form label component with proper accessibility.

```jsx
import { Label } from '@/components/ui/label';

<Label htmlFor="username">Username</Label>
<Input id="username" />
```

---

### Textarea

**Path**: `src/components/ui/textarea.jsx`

Multi-line text input component.

```jsx
import { Textarea } from '@/components/ui/textarea';

<Textarea
  placeholder="Tell us about your tax situation..."
  rows={5}
/>
```

---

### Select

**Path**: `src/components/ui/select.jsx`

Dropdown select component (Radix UI based).

```jsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select canton" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="zh">Zürich</SelectItem>
    <SelectItem value="be">Bern</SelectItem>
    <SelectItem value="ge">Geneva</SelectItem>
  </SelectContent>
</Select>
```

---

### Accordion

**Path**: `src/components/ui/accordion.jsx`

Collapsible content sections (FAQ, etc.).

```jsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>What documents do I need?</AccordionTrigger>
    <AccordionContent>
      You'll need your salary statements, tax certificate...
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger>How long does filing take?</AccordionTrigger>
    <AccordionContent>
      Typically 2-3 business days...
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

---

### Tabs

**Path**: `src/components/ui/tabs.jsx`

Tab navigation component.

```jsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

<Tabs defaultValue="individual">
  <TabsList>
    <TabsTrigger value="individual">Individual</TabsTrigger>
    <TabsTrigger value="business">Business</TabsTrigger>
    <TabsTrigger value="expat">Expat</TabsTrigger>
  </TabsList>

  <TabsContent value="individual">
    Individual tax filing information...
  </TabsContent>

  <TabsContent value="business">
    Business tax services...
  </TabsContent>

  <TabsContent value="expat">
    Expat-specific guidance...
  </TabsContent>
</Tabs>
```

---

### Dropdown Menu

**Path**: `src/components/ui/dropdown-menu.jsx`

Context menu / dropdown component.

```jsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### Badge

**Path**: `src/components/ui/badge.jsx`

Small status/label component.

```jsx
import { Badge } from '@/components/ui/badge';

<Badge>New</Badge>
<Badge variant="secondary">Popular</Badge>
<Badge variant="destructive">Urgent</Badge>
<Badge variant="outline">Draft</Badge>
```

---

### Toast

**Path**: `src/components/ui/toast.jsx`, `use-toast.js`

Notification component for feedback.

```jsx
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

// In your component
const { toast } = useToast();

const handleSubmit = () => {
  toast({
    title: "Success!",
    description: "Your tax return has been submitted.",
  });
};

// In App.jsx
<Toaster />
```

#### Variants

```jsx
// Success
toast({
  title: "Success",
  description: "Operation completed successfully",
});

// Error
toast({
  variant: "destructive",
  title: "Error",
  description: "Something went wrong",
});

// With action
toast({
  title: "Email sent",
  description: "Check your inbox for confirmation",
  action: <Button size="sm">Undo</Button>,
});
```

---

## Layout Components

### Navigation

**Path**: `src/components/layout/Navigation.tsx`

Main navigation component with mobile-responsive menu.

```tsx
import { Navigation } from '@/components/layout/Navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Blog', href: '/blog' },
      { label: 'Calculators', href: '/calculators' },
      { label: 'Downloads', href: '/resources' },
    ]
  },
  { label: 'Contact', href: '/contact' },
];

<Navigation items={navItems} />
```

#### Features
- ✅ Mobile hamburger menu
- ✅ Dropdown submenus
- ✅ Keyboard accessible
- ✅ Active state highlighting

---

### Header

**Path**: `src/components/Header.jsx`

Global site header with logo, navigation, and cart.

```jsx
import Header from '@/components/Header';

<Header isLandingPage={false} />
```

#### Features
- Logo and branding
- Navigation menu
- Shopping cart icon
- Mobile responsive
- Sticky on scroll (optional)

---

### Footer

**Path**: `src/components/Footer.jsx`

Site-wide footer with links, contact info, and legal.

```jsx
import Footer from '@/components/Footer';

<Footer />
```

#### Sections
- Company info
- Quick links
- Legal pages
- Social media
- Newsletter signup

---

### Layout

**Path**: `src/components/layout/Layout.tsx`

Wrapper component for consistent page structure.

```tsx
import { Layout } from '@/components/layout/Layout';

<Layout>
  <YourPageContent />
</Layout>
```

---

## Section Components

### HeroSection (Landing)

**Path**: `src/components/landing/HeroSection.jsx`

Homepage hero with gradient background and CTA.

```jsx
import HeroSection from '@/components/landing/HeroSection';

<HeroSection />
```

#### Features
- Swiss gradient background
- Animated hero pattern
- Call-to-action button
- Responsive text sizing
- Framer Motion animations

---

### BenefitsSection

**Path**: `src/components/landing/BenefitsSection.jsx`

Feature highlights with icons and descriptions.

```jsx
import BenefitsSection from '@/components/landing/BenefitsSection';

<BenefitsSection />
```

---

### PackagesSection

**Path**: `src/components/landing/PackagesSection.jsx`

Pricing tiers with feature lists.

```jsx
import PackagesSection from '@/components/landing/PackagesSection';

<PackagesSection />
```

---

### FaqSection

**Path**: `src/components/landing/FaqSection.jsx`

Frequently asked questions accordion.

```jsx
import FaqSection from '@/components/landing/FaqSection';

<FaqSection />
```

---

### ContactSection

**Path**: `src/components/landing/ContactSection.jsx`

Contact form with validation.

```jsx
import ContactSection from '@/components/landing/ContactSection';

<ContactSection />
```

---

### TestimonialsSection

**Path**: `src/components/sections/TestimonialsSection.tsx`

Client testimonials carousel.

```tsx
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';

<TestimonialsSection />
```

---

### NewsletterSection

**Path**: `src/components/sections/NewsletterSection.tsx`

Email newsletter signup.

```tsx
import { NewsletterSection } from '@/components/sections/NewsletterSection';

<NewsletterSection />
```

---

## Feature Components

### ShoppingCart

**Path**: `src/components/ShoppingCart.jsx`

Slide-out cart panel with item management.

```jsx
import ShoppingCart from '@/components/ShoppingCart';
import { useCart } from '@/hooks/useCart';

const { isCartOpen, setIsCartOpen } = useCart();

<ShoppingCart
  isCartOpen={isCartOpen}
  setIsCartOpen={setIsCartOpen}
/>
```

#### Features
- Add/remove items
- Quantity adjustment
- Price calculation
- Checkout button
- Slide animation

---

### AdminPanel

**Path**: `src/components/AdminPanel.jsx`

Admin dashboard with analytics.

```jsx
import AdminPanel from '@/components/AdminPanel';

<AdminPanel />
```

---

### ClientPortal

**Path**: `src/components/ClientPortal.jsx`

Client dashboard with documents and communication.

```jsx
import ClientPortal from '@/components/ClientPortal';

<ClientPortal />
```

---

## Utility Components

### SEO

**Path**: `src/components/common/SEO.tsx`

SEO meta tags helper.

```tsx
import { SEO } from '@/components/common/SEO';

<SEO
  title="Swiss Tax Services | Taxed.ch"
  description="Professional tax filing for expatriates"
  image="https://taxed.ch/og-image.jpg"
  url="https://taxed.ch/services"
/>
```

---

### LoadingSpinner

**Path**: `src/components/common/LoadingSpinner.tsx`

Loading indicator.

```tsx
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

{isLoading && <LoadingSpinner />}
```

---

### ErrorBoundary

**Path**: `src/components/common/ErrorBoundary.tsx`

Error handling wrapper.

```tsx
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

---

### Analytics

**Path**: `src/components/common/Analytics.tsx`

Google Analytics integration.

```tsx
import { Analytics } from '@/components/common/Analytics';

<Analytics trackingId="G-XXXXXXXXXX" />
```

---

### ShareButton

**Path**: `src/components/ui/ShareButton.jsx`

Social media share button.

```jsx
import ShareButton from '@/components/ui/ShareButton';

<ShareButton
  url="https://taxed.ch/blog/tax-guide-2025"
  title="Swiss Tax Guide 2025"
/>
```

---

### ReadAloud

**Path**: `src/components/ui/ReadAloud.jsx`

Text-to-speech button (accessibility).

```jsx
import ReadAloud from '@/components/ui/ReadAloud';

<ReadAloud text={articleContent} />
```

---

### ImmersiveReader

**Path**: `src/components/ui/ImmersiveReader.jsx`

Full-screen reading mode.

```jsx
import ImmersiveReader from '@/components/ui/ImmersiveReader';

<ImmersiveReader content={blogPost} />
```

---

## Component Patterns & Best Practices

### Composition Pattern

```jsx
// ✅ Good: Composable components
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>

// ❌ Bad: Monolithic props
<Card
  title="Title"
  description="Description"
  content="Content here"
/>
```

### Prop Spreading

```jsx
// ✅ Good: Accept additional props
const Button = ({ className, children, ...props }) => (
  <button className={cn(baseClasses, className)} {...props}>
    {children}
  </button>
);

// Usage
<Button onClick={handleClick} aria-label="Submit form">
  Submit
</Button>
```

### Ref Forwarding

```jsx
// ✅ Good: Use React.forwardRef for form elements
const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(baseClasses, className)}
    {...props}
  />
));
Input.displayName = 'Input';
```

### Conditional Rendering

```jsx
// ✅ Good: Optional children
<Card>
  {header && <CardHeader>{header}</CardHeader>}
  <CardContent>{content}</CardContent>
  {footer && <CardFooter>{footer}</CardFooter>}
</Card>
```

### Accessibility First

```jsx
// ✅ Always include accessibility attributes
<button
  aria-label="Close dialog"
  aria-pressed={isOpen}
  onClick={handleClose}
>
  <X className="h-4 w-4" />
</button>

// ✅ Keyboard support
const handleKeyDown = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleClick();
  }
};
```

---

## Component Testing

### Example Test

```typescript
import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test('renders all variants correctly', async ({ page }) => {
    await page.goto('/test/button');

    const defaultBtn = page.locator('[data-variant="default"]');
    await expect(defaultBtn).toBeVisible();
    await expect(defaultBtn).toHaveClass(/bg-primary/);
  });

  test('handles click events', async ({ page }) => {
    await page.goto('/test/button');

    const btn = page.locator('button').first();
    await btn.click();

    // Assert expected behavior
  });

  test('is keyboard accessible', async ({ page }) => {
    await page.goto('/test/button');

    await page.keyboard.press('Tab');
    const focusedBtn = page.locator('button:focus');
    await expect(focusedBtn).toBeVisible();
  });
});
```

---

## Quick Reference

### Import Paths

```javascript
// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Layout
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Sections
import HeroSection from '@/components/landing/HeroSection';

// Utilities
import { cn } from '@/lib/utils';
```

### Common Patterns

```jsx
// Form field
<div className="space-y-2">
  <Label htmlFor="field">Field Label</Label>
  <Input id="field" placeholder="Enter value" />
</div>

// Card with action
<Card className="card-hover">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>
    <Button className="w-full">Action</Button>
  </CardFooter>
</Card>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id}>{item.content}</Card>)}
</div>
```

---

**Last Updated**: November 28, 2025
**Maintained By**: Taxed GmbH Development Team
**Total Components**: 30+
**Status**: ✅ Production Ready | WCAG AA | Apple HIG Compliant
