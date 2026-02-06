import React, { Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShoppingCart from '@/components/ShoppingCart';
import ProtectedClientRoute from '@/components/ProtectedClientRoute';
import { useCart } from '@/hooks/useCart';
import { ClientAuthProvider } from '@/contexts/ClientAuthContext';
import { initializeDailyBlogScheduler } from '@/services/dailyBlogScheduler';
import { initializeAnalytics, trackWebVitals } from '@/utils/analytics';
import { initializePerformanceOptimizations } from '@/utils/performance';
import { initializeBingOptimizations } from '@/utils/bing';

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-steel-blue"></div>
  </div>
);

// Lazy load all page components for code splitting

// Root pages
const LandingPage = React.lazy(() => import('@/pages/LandingPage'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage'));

// Core marketing pages
const AboutPage = React.lazy(() => import('@/pages/core/AboutPage'));
const ServicesPage = React.lazy(() => import('@/pages/core/ServicesPage'));
const HowItWorksPage = React.lazy(() => import('@/pages/core/HowItWorksPage'));
const ContactPage = React.lazy(() => import('@/pages/core/ContactPage'));
const CareersPage = React.lazy(() => import('@/pages/core/CareersPage'));
const PricingPage = React.lazy(() => import('@/pages/core/PricingPage'));
const TeamPage = React.lazy(() => import('@/pages/core/TeamPage'));
const PartnershipPage = React.lazy(() => import('@/pages/core/PartnershipPage'));

// Store pages
const StorePage = React.lazy(() => import('@/pages/store/StorePage'));
const ProductDetailPage = React.lazy(() => import('@/pages/store/ProductDetailPage'));
const SuccessPage = React.lazy(() => import('@/pages/store/SuccessPage'));
const CartPage = React.lazy(() => import('@/pages/store/CartPage'));

// Legal pages
const ImpressumPage = React.lazy(() => import('@/pages/legal/ImpressumPage'));
const PrivacyPolicyPage = React.lazy(() => import('@/pages/legal/PrivacyPolicyPage'));
const AccessibilityPage = React.lazy(() => import('@/pages/legal/AccessibilityPage'));
const TermsOfServicePage = React.lazy(() => import('@/pages/legal/TermsOfServicePage'));
const CookiePolicyPage = React.lazy(() => import('@/pages/legal/CookiePolicyPage'));

// Content pages
const SitemapPage = React.lazy(() => import('@/pages/content/SitemapPage'));
const FAQPage = React.lazy(() => import('@/pages/content/FAQPage'));
const LawSectionPage = React.lazy(() => import('@/pages/content/LawSectionPage'));
const ResourceCenterPage = React.lazy(() => import('@/pages/content/ResourceCenterPage'));
const NewsPage = React.lazy(() => import('@/pages/content/NewsPage'));
const CaseStudiesPage = React.lazy(() => import('@/pages/content/CaseStudiesPage'));
const IndustrySpecializationsPage = React.lazy(() => import('@/pages/content/IndustrySpecializationsPage'));
const ClientTestimonialsPage = React.lazy(() => import('@/pages/content/ClientTestimonialsPage'));

// Blog pages
const BlogPage = React.lazy(() => import('@/pages/blog/BlogPage'));
const BlogPostPage = React.lazy(() => import('@/pages/blog/BlogPostPage'));

// Admin
const AdminApp = React.lazy(() => import('@/pages/admin/AdminApp'));

// Tax resource pages
const TaxCalculatorPage = React.lazy(() => import('@/pages/tax/TaxCalculatorPage'));
const TaxDeadlinesPage = React.lazy(() => import('@/pages/tax/TaxDeadlinesPage'));
const TaxFormsPage = React.lazy(() => import('@/pages/tax/TaxFormsPage'));
const TaxUpdatesPage = React.lazy(() => import('@/pages/tax/TaxUpdatesPage'));
const TaxWebinarsPage = React.lazy(() => import('@/pages/tax/TaxWebinarsPage'));
const TaxTechnologyPage = React.lazy(() => import('@/pages/tax/TaxTechnologyPage'));
const TaxSecurityPage = React.lazy(() => import('@/pages/tax/TaxSecurityPage'));
const TaxSupportPage = React.lazy(() => import('@/pages/tax/TaxSupportPage'));
const TaxGlossaryPage = React.lazy(() => import('@/pages/tax/TaxGlossaryPage'));
const TaxReturnExplainedPage = React.lazy(() => import('@/pages/tax/TaxReturnExplainedPage'));
const TaxEventsPage = React.lazy(() => import('@/pages/tax/TaxEventsPage'));
const TaxAuditSupportPage = React.lazy(() => import('@/pages/tax/TaxAuditSupportPage'));
const TaxCompliancePage = React.lazy(() => import('@/pages/tax/TaxCompliancePage'));
const TaxRecoveryPage = React.lazy(() => import('@/pages/tax/TaxRecoveryPage'));

// Guides pages
const AdvancedTaxToolsPage = React.lazy(() => import('@/pages/guides/AdvancedTaxToolsPage'));
const ExpatTaxGuidePage = React.lazy(() => import('@/pages/guides/ExpatTaxGuidePage'));
const TaxPlanningGuidePage = React.lazy(() => import('@/pages/guides/TaxPlanningGuidePage'));
const BusinessTaxGuidePage = React.lazy(() => import('@/pages/guides/BusinessTaxGuidePage'));
const InternationalTaxPage = React.lazy(() => import('@/pages/guides/InternationalTaxPage'));

// Client portal pages
const ClientPortalPage = React.lazy(() => import('@/pages/client/ClientPortalPage'));
const ClientLoginPage = React.lazy(() => import('@/pages/client/ClientLoginPage'));

// Forum pages
const ForumPage = React.lazy(() => import('@/pages/forum/ForumPageSimple'));
const ForumCategoryPage = React.lazy(() => import('@/pages/forum/ForumCategoryPage'));
const ForumTopicPage = React.lazy(() => import('@/pages/forum/ForumTopicPage'));

function App() {
  // Initialize services
  React.useEffect(() => {
    try {
      initializeDailyBlogScheduler();
      initializeAnalytics();
      trackWebVitals();
      initializePerformanceOptimizations();
      initializeBingOptimizations();
    } catch (error) {
      console.warn('Error initializing services:', error);
    }
  }, []);
  
  const { isCartOpen, setIsCartOpen } = useCart();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  // Get current path for hreflang tags
  const currentPath = location.pathname;
  const baseUrl = 'https://taxed.ch';

  return (
    <ClientAuthProvider>
      <div className="min-h-screen bg-light-gray-bg-1 flex flex-col overflow-x-hidden">
        <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed for Taxed GmbH" href="/rss.xml" />

        {/* Preload critical resources for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Hreflang tags for multilingual support */}
        <link rel="alternate" hrefLang="de-CH" href={`${baseUrl}/de${currentPath}`} />
        <link rel="alternate" hrefLang="en-CH" href={`${baseUrl}${currentPath}`} />
        <link rel="alternate" hrefLang="fr-CH" href={`${baseUrl}/fr${currentPath}`} />
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${currentPath}`} />
      </Helmet>
      
      <Header isLandingPage={isLandingPage} />
      <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      
      <main className="flex-grow w-full max-w-full overflow-x-hidden">
        <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/cookies" element={<CookiePolicyPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/law" element={<LawSectionPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          {/* Admin Portal - Separate routing context */}
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/calculators" element={<TaxCalculatorPage />} />
          <Route path="/resources" element={<ResourceCenterPage />} />
          <Route path="/news" element={<NewsPage />} />
          {/* Client Portal Routes */}
          <Route path="/client-portal/login" element={<ClientLoginPage />} />
          <Route
            path="/client-portal"
            element={
              <ProtectedClientRoute>
                <ClientPortalPage />
              </ProtectedClientRoute>
            }
          />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/industry-specializations" element={<IndustrySpecializationsPage />} />
          <Route path="/advanced-tax-tools" element={<AdvancedTaxToolsPage />} />
          
          {/* Phase 1 Critical Pages */}
          <Route path="/tax-deadlines" element={<TaxDeadlinesPage />} />
          <Route path="/expat-tax-guide" element={<ExpatTaxGuidePage />} />
          <Route path="/testimonials" element={<ClientTestimonialsPage />} />
          <Route path="/tax-planning-guide" element={<TaxPlanningGuidePage />} />
          
          {/* Phase 2 Professional Pages */}
          <Route path="/business-tax-guide" element={<BusinessTaxGuidePage />} />
          <Route path="/international-tax" element={<InternationalTaxPage />} />
          <Route path="/tax-forms" element={<TaxFormsPage />} />
          <Route path="/tax-updates" element={<TaxUpdatesPage />} />
          <Route path="/webinars" element={<TaxWebinarsPage />} />
          
          {/* Phase 3 Advanced Pages */}
          <Route path="/technology" element={<TaxTechnologyPage />} />
          <Route path="/security" element={<TaxSecurityPage />} />
          <Route path="/support" element={<TaxSupportPage />} />
          <Route path="/tax-glossary" element={<TaxGlossaryPage />} />
          <Route path="/tax-return-explained" element={<TaxReturnExplainedPage />} />
          <Route path="/events" element={<TaxEventsPage />} />
          
          {/* High Priority Missing Pages */}
          <Route path="/tax-audit-support" element={<TaxAuditSupportPage />} />
          <Route path="/tax-compliance" element={<TaxCompliancePage />} />
          <Route path="/tax-recovery" element={<TaxRecoveryPage />} />
          <Route path="/partnership" element={<PartnershipPage />} />
          
          {/* Forum Routes */}
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum/category/:categorySlug" element={<ForumCategoryPage />} />
          <Route path="/forum/topic/:topicSlug" element={<ForumTopicPage />} />
          
          
          {/* 404 - Catch all undefined routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
      </main>
      
      <Footer />
      </div>
    </ClientAuthProvider>
  );
}

export default App;