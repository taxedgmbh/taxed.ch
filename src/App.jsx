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
import PrivacyPage from '@/pages/PrivacyPage';
import TermsPage from '@/pages/TermsPage';
import CookiesPage from '@/pages/CookiesPage';
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
import { useCart } from '@/hooks/useCart';
import { initializeDailyBlogScheduler } from '@/services/dailyBlogScheduler';
import WhatsAppChat from '@/components/WhatsAppChat';

function App() {
  // Initialize daily blog scheduler
  React.useEffect(() => {
    initializeDailyBlogScheduler();
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
      <WhatsAppChat />
      
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
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
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
               </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;