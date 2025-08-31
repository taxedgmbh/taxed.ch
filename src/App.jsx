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
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import PricingPage from '@/pages/PricingPage';
import CartPage from '@/pages/CartPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import AdminPage from '@/pages/AdminPage';
import { useCart } from '@/hooks/useCart';
import { initializeDailyBlogScheduler } from '@/services/dailyBlogScheduler';

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
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/cart" element={<CartPage />} />
                           <Route path="/blog" element={<BlogPage />} />
                 <Route path="/blog/:slug" element={<BlogPostPage />} />
                 <Route path="/admin" element={<AdminPage />} />
               </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;