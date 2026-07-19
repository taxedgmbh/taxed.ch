import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Shield,
  Clock,
  Calculator,
  FileText,
  TrendingUp,
  Globe,
  Award,
  Zap,
  Target,
  BarChart3,
  Building,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Play,
  Quote,
  Calendar,
  DollarSign,
  Lock,
  Eye,
  Download,
  Newspaper,
  Upload,
  Send,
  BookOpen,
  Scale,
  UserCheck,
  Settings,
  PieChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { websiteSchema } from '@/utils/structuredData';
import blogIndex from '@/data/blogIndex.json';
import HubSpotContactForm from '@/components/forms/HubSpotContactForm';

const LandingPage = () => {
  // Respect user's motion preferences for accessibility
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Animation variants that respect reduced motion preference
  const fadeInUp = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } };

  const fadeIn = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0 }, animate: { opacity: 1 } };

  const latestPosts = blogIndex.slice(0, 3);

  const stats = [
    { label: "Registered Swiss GmbH", detail: "Biel/Bienne", icon: Shield },
    { label: "Flat rate from CHF 249", detail: "No hidden fees", icon: CheckCircle },
    { label: "English · German · French", detail: "International team", icon: Users },
    { label: "Secure client portal", detail: "Fully digital filing", icon: Clock }
  ];

  const processSteps = [
    {
      title: "Tell us about you",
      text: "Send the free assessment form. We confirm your flat rate — before any work starts.",
      icon: FileText
    },
    {
      title: "Upload securely",
      text: "Share your documents through the encrypted client portal, from anywhere.",
      icon: Upload
    },
    {
      title: "We prepare your return",
      text: "Our experts complete your filing and check every deduction you're entitled to.",
      icon: Calculator
    },
    {
      title: "Review & file",
      text: "You approve online — we submit to your canton and handle the follow-up.",
      icon: Send
    }
  ];

  const services = [
    {
      title: "Individual Tax Returns",
      description: "Complete Swiss tax filing for expatriates with expert guidance",
      icon: FileText,
      color: "bg-blue-600",
      link: "/services"
    },
    {
      title: "Tax Planning",
      description: "Strategic optimization to minimize your tax burden legally",
      icon: TrendingUp,
      color: "bg-green-600",
      link: "/services"
    },
    {
      title: "Digital Filing",
      description: "Secure online submission with real-time tracking",
      icon: Zap,
      color: "bg-purple-600",
      link: "/services"
    },
    {
      title: "International Income",
      description: "Cross-border income reporting and compliance",
      icon: Globe,
      color: "bg-orange-600",
      link: "/services"
    }
  ];

  const tools = [
    {
      title: "Tax Calculators",
      description: "Free Swiss tax calculators for income, wealth, and real estate",
      icon: Calculator,
      link: "/calculators",
      features: ["Income Tax", "Wealth Tax", "Pillar 3a", "Real Estate"]
    },
    {
      title: "Resource Center",
      description: "Downloadable guides, checklists, and templates",
      icon: Download,
      link: "/resources",
      features: ["Tax Guides", "Checklists", "Templates", "Forms"]
    },
    {
      title: "News & Updates",
      description: "Latest Swiss tax law changes and regulatory updates",
      icon: Newspaper,
      link: "/news",
      features: ["Daily Updates", "AI Rewritten", "Source Referenced", "Expert Analysis"]
    },
    {
      title: "Legal Documents",
      description: "Comprehensive collection of tax-related legal documents",
      icon: Scale,
      link: "/law",
      features: ["PDF Downloads", "Searchable", "Categorized", "Updated"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Taxed GmbH | Professional Swiss Tax Services for Expats & Businesses</title>
        <meta name="description" content="Leading Swiss tax consulting firm offering expert services for expatriates and businesses. Professional client portal, advanced tools, and comprehensive tax solutions." />
        <meta property="og:title" content="Taxed GmbH | Professional Swiss Tax Services for Expats & Businesses" />
        <meta property="og:description" content="Leading Swiss tax consulting firm offering expert services for expatriates and businesses. Professional client portal, advanced tools, and comprehensive tax solutions." />
        <link rel="canonical" href="https://taxed.ch" />

        {/* Structured Data - Enhanced for Bing */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Taxed GmbH",
            "alternateName": "Taxed Swiss Tax Consulting",
            "description": "Leading Swiss tax consulting firm offering expert services for expatriates and businesses. Specializing in Swiss tax returns, Quellensteuer adjustments, and international tax planning.",
            "url": "https://taxed.ch",
            "logo": "https://taxed.ch/images/logos/taxed-logo.png",
            "image": "https://taxed.ch/images/og-taxed-logo.jpg",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Biel/Bienne",
              "addressRegion": "Bern",
              "addressCountry": "CH",
              "postalCode": "2500"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "47.1368",
              "longitude": "7.2476"
            },
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+41-79-910-7787",
                "email": "info@taxed.ch",
                "contactType": "customer service",
                "availableLanguage": ["German", "English", "French"]
              }
            ],
            "serviceType": ["Tax Consulting", "Tax Preparation", "Tax Planning", "Quellensteuer Services"],
            "areaServed": {
              "@type": "Country",
              "name": "Switzerland"
            },
            "priceRange": "CHF 249-799",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              }
            ],
            "currenciesAccepted": "CHF",
            "paymentAccepted": "Cash, Credit Card, Bank Transfer",
            "sameAs": [
              "https://www.facebook.com/taxedgmbh",
              "https://www.instagram.com/taxed_gmbh"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Tax Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Swiss Tax Return Preparation",
                    "description": "Complete Swiss tax return preparation for individuals and businesses"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Quellensteuer Adjustment",
                    "description": "Withholding tax adjustments for Swiss residents"
                  }
                }
              ]
            }
          })}
        </script>

        {/* WebSite Schema for Sitelinks Search Box */}
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Helmet>

      {/* Skip Navigation Link for Accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-gray-900 px-6 py-3 min-h-[44px] inline-flex items-center rounded-md z-50 font-medium shadow-lg">
        Skip to main content
      </a>

      {/* Hero Section - Improved Contrast and Responsiveness */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-steel-blue via-blue-600 to-blue-800">
        {/* Swiss scenery (Lauterbrunnen, Unsplash) as a subtle backdrop under the brand gradient */}
        <img
          src="/images/hero-switzerland.jpg"
          alt=""
          aria-hidden="true"
          width="1600"
          height="1066"
          decoding="async"
          fetchpriority="low"
          className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-steel-blue/70 via-blue-600/60 to-blue-800/70"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
            className="text-white text-center lg:text-left"
          >
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-900 shadow-lg">
                <Award className="h-4 w-4 mr-2" aria-hidden="true" />
                Professional Swiss Tax Services
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              Expert Swiss Tax
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Solutions
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-white max-w-4xl mx-auto lg:mx-0 leading-relaxed">
              Flat-rate Swiss tax filing for expatriates and businesses — fully digital, personally handled.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
              >
                <Link to="/store" aria-label="Get started with our services today">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-gray-900 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[44px] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 font-semibold shadow-lg"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Get a free tax assessment"
              >
                <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                Free Assessment
              </Button>
            </div>
          </motion.div>

          {/* Branded illustration (desktop) */}
          <motion.div
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 1, delay: 0.2 }}
            className="flex justify-center mt-2 lg:mt-0"
          >
            <img
              src="/images/hero-illustration.svg"
              alt=""
              aria-hidden="true"
              width="560"
              height="457"
              decoding="async"
              className="w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[560px] h-auto"
            />
          </motion.div>
          </div>

          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.3 }}
            className="text-white mt-12 lg:mt-16"
          >
            {/* Verifiable facts, stated once */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
              {stats.map((fact, index) => (
                <motion.div
                  key={fact.label}
                  initial={fadeInUp.initial}
                  animate={fadeInUp.animate}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-2.5 sm:gap-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-left"
                >
                  <fact.icon className="h-5 w-5 text-yellow-300 flex-shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-semibold text-white leading-tight">{fact.label}</div>
                    <div className="hidden sm:block text-xs text-blue-100">{fact.detail}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          aria-label="Scroll down for more content"
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
            transition={prefersReducedMotion ? {} : { duration: 2, repeat: Infinity }}
            className="text-white"
          >
            <ChevronRight className="h-6 w-6 rotate-90" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <main id="main-content">
        {/* How It Works - visual process */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white" aria-labelledby="how-it-works-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={fadeInUp.initial}
              whileInView={fadeInUp.whileInView}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-14"
            >
              <h2 id="how-it-works-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                How Filing With Us Works
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Four steps. Everything online, one fixed price.
              </p>
            </motion.div>

            <div className="relative">
              {/* Connector line - desktop */}
              <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-steel-blue/15 via-steel-blue/40 to-steel-blue/15" aria-hidden="true"></div>

              <ol className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 list-none">
                {processSteps.map((step, index) => (
                  <motion.li
                    key={step.title}
                    initial={fadeInUp.initial}
                    whileInView={fadeInUp.whileInView}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.12 }}
                    viewport={{ once: true }}
                    className="relative flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0 lg:text-center"
                  >
                    {/* Connector line - mobile */}
                    {index < processSteps.length - 1 && (
                      <div className="lg:hidden absolute left-8 top-[4.5rem] -bottom-6 w-0.5 bg-steel-blue/15" aria-hidden="true"></div>
                    )}

                    <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-steel-blue to-blue-700 text-white flex items-center justify-center shadow-lg lg:mb-5">
                      <step.icon className="h-7 w-7" aria-hidden="true" />
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-red text-white text-xs font-bold flex items-center justify-center shadow">
                        {index + 1}
                      </span>
                    </div>

                    <div className="pt-1 lg:pt-0 lg:px-2">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1.5">{step.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.text}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>

            <motion.div
              initial={fadeInUp.initial}
              whileInView={fadeInUp.whileInView}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-10 sm:mt-12"
            >
              <Button
                size="lg"
                className="bg-steel-blue hover:bg-blue-700 text-white px-8"
                onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start with step 1 — it's free
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Lead Capture Section - After Hero */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50" id="get-started">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={fadeInUp.initial}
              whileInView={fadeInUp.whileInView}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Section Header */}
              <div className="text-center mb-8">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                  <CheckCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                  Free Assessment - No Obligation
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Get Your Personalized Tax Assessment
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Fill out this quick form and our Swiss tax experts will contact you within 24 hours with a personalized assessment.
                </p>
              </div>

              {/* Form Container */}
              <div className="bg-gradient-to-br from-steel-blue to-blue-700 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
                <div className="grid lg:grid-cols-5 gap-8 items-start">
                  {/* Trust Indicators - Left Side */}
                  <div className="lg:col-span-2 text-white space-y-6">
                    {/* Founder Section with Photo */}
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0">
                        <img
                          src="https://eflury.com/images/portraits/emanuel-aaron-flury-portrait.png"
                          alt="Emanuel Flury - Founder & Senior Tax Consultant"
                          className="w-28 h-36 sm:w-32 sm:h-44 object-cover object-top rounded-xl shadow-lg border-2 border-white/30"
                        />
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="text-xl font-semibold mb-2">Why Choose Taxed GmbH?</h3>
                        <p className="text-blue-100 text-sm mb-3">
                          Founded by <span className="font-semibold text-white">Emanuel Flury</span>,
                          our team provides transparent, flat-rate Swiss tax services for expats.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-white text-gray-900 rounded-full text-xs font-medium shadow-sm">10+ Years Experience</span>
                          <span className="px-2 py-1 bg-white text-gray-900 rounded-full text-xs font-medium shadow-sm">Swiss Based</span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>Boutique attention at transparent flat rates</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>Certified Swiss tax experts</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>Fully digital process — file from anywhere</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>GDPR compliant & Swiss data residency</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>Response within one business day</span>
                      </li>
                    </ul>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap gap-3 pt-4">
                      <span className="px-3 py-1 bg-white text-gray-900 rounded-full text-sm font-medium shadow-sm">Swiss Tax Expert</span>
                      <span className="px-3 py-1 bg-white text-gray-900 rounded-full text-sm font-medium shadow-sm">GDPR Compliant</span>
                      <span className="px-3 py-1 bg-white text-gray-900 rounded-full text-sm font-medium shadow-sm">Data Protection</span>
                    </div>
                  </div>

                  {/* HubSpot Form - Right Side */}
                  <div className="lg:col-span-3 bg-white rounded-xl p-4 sm:p-6 shadow-inner">
                    <HubSpotContactForm />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section - Fixed Color Contrast */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={fadeInUp.initial}
              whileInView={fadeInUp.whileInView}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Professional Tax Services
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
                Swiss tax solutions for expatriates and businesses — expert, transparent, digital.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={fadeInUp.initial}
                  whileInView={fadeInUp.whileInView}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group focus-within:ring-2 focus-within:ring-blue-500">
                    <CardContent className="p-4 sm:p-6">
                      <div className={`inline-flex p-3 rounded-lg ${service.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`} aria-hidden="true">
                        <service.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-700 mb-4 text-sm sm:text-base">{service.description}</p>
                      <Link
                        to={service.link}
                        className="inline-flex items-center text-blue-800 hover:text-blue-900 font-medium focus:outline-none focus:underline py-2 min-h-[44px]"
                        aria-label={`Learn more about ${service.title}`}
                      >
                        Learn More <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools & Resources Section - Fixed Contrast */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={fadeInUp.initial}
              whileInView={fadeInUp.whileInView}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Free Tools & Resources
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
                Free calculators, guides, and updates to understand your Swiss tax situation.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="p-3 bg-blue-700 rounded-lg text-white" aria-hidden="true">
                            <tool.icon className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{tool.title}</h3>
                          <p className="text-gray-700 mb-4 text-sm sm:text-base">{tool.description}</p>
                          <div className="hidden sm:flex flex-wrap gap-2 mb-4">
                            {tool.features.map((feature, idx) => (
                              <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-900 text-xs sm:text-sm rounded-full font-medium">
                                {feature}
                              </span>
                            ))}
                          </div>
                          <Link
                            to={tool.link}
                            className="inline-flex items-center text-blue-800 hover:text-blue-900 font-medium focus:outline-none focus:underline py-2 min-h-[44px]"
                            aria-label={`Access ${tool.title} now`}
                          >
                            Access Now <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Clients Choose Us - verifiable facts only */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-700 to-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={fadeInUp.initial}
              whileInView={fadeInUp.whileInView}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Why Clients Choose Us
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl mx-auto">
                Built for expatriates and businesses that expect precision, discretion, and clear pricing.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  icon: DollarSign,
                  title: 'Flat-Rate Pricing',
                  text: 'Transparent packages from CHF 249 — the price you see is the price you pay.'
                },
                {
                  icon: Lock,
                  title: 'Secure Client Portal',
                  text: 'Upload documents and track your return online, protected end to end.'
                },
                {
                  icon: MapPin,
                  title: 'Swiss-Based Team',
                  text: 'Real experts in Biel/Bienne serving clients across all 26 cantons.'
                },
                {
                  icon: Globe,
                  title: 'Three Languages',
                  text: 'Advice in English, German, and French — built for international clients.'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={fadeInUp.initial}
                  whileInView={fadeInUp.whileInView}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors">
                    <CardContent className="p-6 sm:p-8 text-center">
                      <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-200 text-sm">{item.text}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Insights - thought leadership */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={fadeInUp.initial}
              whileInView={fadeInUp.whileInView}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Latest Swiss Tax Insights
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
                  Analysis and guidance from our advisory practice — reforms, deadlines, and planning opportunities.
                </p>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center text-steel-blue font-semibold hover:text-blue-700 transition-colors whitespace-nowrap min-h-[44px]"
              >
                All insights
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={fadeInUp.initial}
                  whileInView={fadeInUp.whileInView}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block h-full bg-gray-50 hover:bg-white border border-gray-200 hover:border-steel-blue/40 rounded-2xl p-6 transition-all duration-200 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-4 text-sm">
                      <span className="px-3 py-1 bg-steel-blue/10 text-steel-blue rounded-full font-medium">
                        {post.category}
                      </span>
                      <span className="text-gray-500">
                        {new Date(post.date).toLocaleDateString('en-CH', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-steel-blue transition-colors leading-snug mb-4">
                      {post.title}
                    </h3>
                    <span className="inline-flex items-center text-sm font-medium text-steel-blue">
                      Read analysis
                      <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Fixed Contrast */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={fadeInUp.initial}
              whileInView={fadeInUp.whileInView}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Ready to Optimize Your Swiss Taxes?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto">
                Fixed prices, a clear digital process, and personal service from a Swiss team.
                Start your tax filing today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                >
                  <Link to="/store" aria-label="Get started with our services">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-gray-900 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[44px] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 font-semibold shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  aria-label="Get a free tax assessment"
                >
                  <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                  Free Assessment
                </Button>
              </div>


            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LandingPage;