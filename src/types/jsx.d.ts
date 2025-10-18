// TypeScript declarations for .jsx files
declare module '@/components/ShoppingCart' {
  import { FC } from 'react';
  interface ShoppingCartProps {
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
  }
  const ShoppingCart: FC<ShoppingCartProps>;
  export default ShoppingCart;
}

declare module '@/pages/LandingPage' {
  import { FC } from 'react';
  const LandingPage: FC;
  export default LandingPage;
}

declare module '@/pages/AboutPage' {
  import { FC } from 'react';
  const AboutPage: FC;
  export default AboutPage;
}

declare module '@/pages/ServicesPage' {
  import { FC } from 'react';
  const ServicesPage: FC;
  export default ServicesPage;
}

declare module '@/pages/HowItWorksPage' {
  import { FC } from 'react';
  const HowItWorksPage: FC;
  export default HowItWorksPage;
}

declare module '@/pages/ContactPage' {
  import { FC } from 'react';
  const ContactPage: FC;
  export default ContactPage;
}

declare module '@/pages/StorePage' {
  import { FC } from 'react';
  const StorePage: FC;
  export default StorePage;
}

declare module '@/pages/ProductDetailPage' {
  import { FC } from 'react';
  const ProductDetailPage: FC;
  export default ProductDetailPage;
}

declare module '@/pages/SuccessPage' {
  import { FC } from 'react';
  const SuccessPage: FC;
  export default SuccessPage;
}

declare module '@/pages/ImpressumPage' {
  import { FC } from 'react';
  const ImpressumPage: FC;
  export default ImpressumPage;
}

declare module '@/pages/PrivacyPage' {
  import { FC } from 'react';
  const PrivacyPage: FC;
  export default PrivacyPage;
}

declare module '@/pages/TermsPage' {
  import { FC } from 'react';
  const TermsPage: FC;
  export default TermsPage;
}

declare module '@/pages/CookiesPage' {
  import { FC } from 'react';
  const CookiesPage: FC;
  export default CookiesPage;
}

declare module '@/pages/AccessibilityPage' {
  import { FC } from 'react';
  const AccessibilityPage: FC;
  export default AccessibilityPage;
}

declare module '@/pages/SitemapPage' {
  import { FC } from 'react';
  const SitemapPage: FC;
  export default SitemapPage;
}

declare module '@/pages/FAQPage' {
  import { FC } from 'react';
  const FAQPage: FC;
  export default FAQPage;
}

declare module '@/pages/CareersPage' {
  import { FC } from 'react';
  const CareersPage: FC;
  export default CareersPage;
}

declare module '@/pages/LawSectionPage' {
  import { FC } from 'react';
  const LawSectionPage: FC;
  export default LawSectionPage;
}

declare module '@/pages/PricingPage' {
  import { FC } from 'react';
  const PricingPage: FC;
  export default PricingPage;
}

declare module '@/pages/CartPage' {
  import { FC } from 'react';
  const CartPage: FC;
  export default CartPage;
}

declare module '@/pages/BlogPage' {
  import { FC } from 'react';
  const BlogPage: FC;
  export default BlogPage;
}

declare module '@/pages/BlogPostPage' {
  import { FC } from 'react';
  const BlogPostPage: FC;
  export default BlogPostPage;
}

declare module '@/pages/AdminPage' {
  import { FC } from 'react';
  const AdminPage: FC;
  export default AdminPage;
}

declare module '@/pages/TaxCalculatorPage' {
  import { FC } from 'react';
  const TaxCalculatorPage: FC;
  export default TaxCalculatorPage;
}

declare module '@/pages/ResourceCenterPage' {
  import { FC } from 'react';
  const ResourceCenterPage: FC;
  export default ResourceCenterPage;
}

declare module '@/pages/NewsPage' {
  import { FC } from 'react';
  const NewsPage: FC;
  export default NewsPage;
}

declare module '@/pages/ClientPortalPage' {
  import { FC } from 'react';
  const ClientPortalPage: FC;
  export default ClientPortalPage;
}

declare module '@/pages/CaseStudiesPage' {
  import { FC } from 'react';
  const CaseStudiesPage: FC;
  export default CaseStudiesPage;
}

declare module '@/pages/NotFoundPage' {
  import { FC } from 'react';
  const NotFoundPage: FC;
  export default NotFoundPage;
}

declare module '@/services/dailyBlogScheduler' {
  export const initializeDailyBlogScheduler: () => void;
}






