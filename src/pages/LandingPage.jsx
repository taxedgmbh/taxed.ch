import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/landing/HeroSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import FocusSection from '@/components/landing/FocusSection';
import PackagesSection from '@/components/landing/PackagesSection';
import FaqSection from '@/components/landing/FaqSection';
import ContactSection from '@/components/landing/ContactSection';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>Taxed GmbH | Swiss Tax Returns for Expats - Simple & Digital</title>
        <meta name="description" content="Taxed GmbH offers specialized, flat-rate Swiss tax return services for expatriates. Simple, digital, and transparent process. Get started today!" />
        <meta property="og:title" content="Taxed GmbH | Swiss Tax Returns for Expats - Simple & Digital" />
        <meta property="og:description" content="Taxed GmbH offers specialized, flat-rate Swiss tax return services for expatriates. Simple, digital, and transparent process. Get started today!" />
      </Helmet>

      <HeroSection />
      <BenefitsSection />
      <FocusSection />
      <PackagesSection />
      <FaqSection />
      <ContactSection />
    </>
  );
};

export default LandingPage;