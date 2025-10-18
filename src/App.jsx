import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShoppingCart from '@/components/ShoppingCart';
import LandingPage from '@/pages/LandingPage';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import HowItWorksPage from '@/pages/HowItWorksPage';
import ContactPage from '@/pages/ContactPage';
import StorePage from '@/pages/StorePage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import SuccessPage from '@/pages/SuccessPage';
import ImpressumPage from '@/pages/ImpressumPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import AccessibilityPage from '@/pages/AccessibilityPage';
import SitemapPage from '@/pages/SitemapPage';
import FAQPage from '@/pages/FAQPage';
import CareersPage from '@/pages/CareersPage';
import LawSectionPage from '@/pages/LawSectionPage';
import PricingPage from '@/pages/PricingPage';
import CartPage from '@/pages/CartPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import AdminPage from '@/pages/AdminPage';
import TaxCalculatorPage from '@/pages/TaxCalculatorPage';
import ResourceCenterPage from '@/pages/ResourceCenterPage';
import NewsPage from '@/pages/NewsPage';
import ClientPortalPage from '@/pages/ClientPortalPage';
import CaseStudiesPage from '@/pages/CaseStudiesPage';
import TeamPage from '@/pages/TeamPage';
import IndustrySpecializationsPage from '@/pages/IndustrySpecializationsPage';
import AdvancedTaxToolsPage from '@/pages/AdvancedTaxToolsPage';
import TaxDeadlinesPage from '@/pages/TaxDeadlinesPage';
import ExpatTaxGuidePage from '@/pages/ExpatTaxGuidePage';
import ClientTestimonialsPage from '@/pages/ClientTestimonialsPage';
import TaxPlanningGuidePage from '@/pages/TaxPlanningGuidePage';
import BusinessTaxGuidePage from '@/pages/BusinessTaxGuidePage';
import InternationalTaxPage from '@/pages/InternationalTaxPage';
import TaxFormsPage from '@/pages/TaxFormsPage';
import TaxUpdatesPage from '@/pages/TaxUpdatesPage';
import TaxWebinarsPage from '@/pages/TaxWebinarsPage';
import TaxTechnologyPage from '@/pages/TaxTechnologyPage';
import TaxSecurityPage from '@/pages/TaxSecurityPage';
import TaxSupportPage from '@/pages/TaxSupportPage';
import TaxGlossaryPage from '@/pages/TaxGlossaryPage';
import TaxReturnExplainedPage from '@/pages/TaxReturnExplainedPage';
import TaxEventsPage from '@/pages/TaxEventsPage';
import TaxAuditSupportPage from '@/pages/TaxAuditSupportPage';
import TaxCompliancePage from '@/pages/TaxCompliancePage';
import TaxRecoveryPage from '@/pages/TaxRecoveryPage';
import PartnershipPage from '@/pages/PartnershipPage';
import ForumPage from '@/pages/ForumPageSimple';
import ForumCategoryPage from '@/pages/ForumCategoryPage';
import ForumTopicPage from '@/pages/ForumTopicPage';
import ForumTestPage from '@/pages/ForumTestPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { useCart } from '@/hooks/useCart';
import { initializeDailyBlogScheduler } from '@/services/dailyBlogScheduler';
import { initializeAnalytics, trackWebVitals } from '@/utils/analytics';
import { initializePerformanceOptimizations } from '@/utils/performance';
import { initializeBingOptimizations } from '@/utils/bing';

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

  return (
    <div className="min-h-screen bg-light-gray-bg-1 flex flex-col">
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed for Taxed GmbH" href="/rss.xml" />
      </Helmet>
      
      <Header isLandingPage={isLandingPage} />
      <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      
      <main className="flex-grow">
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
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<PrivacyPolicyPage />} />
          <Route path="/cookies" element={<PrivacyPolicyPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/law" element={<LawSectionPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/calculators" element={<TaxCalculatorPage />} />
          <Route path="/resources" element={<ResourceCenterPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/client-portal" element={<ClientPortalPage />} />
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
          <Route path="/forum-test" element={<ForumTestPage />} />
          
          
          {/* 404 - Catch all undefined routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;