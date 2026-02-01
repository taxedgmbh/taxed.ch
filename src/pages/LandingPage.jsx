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
  BookOpen,
  Scale,
  UserCheck,
  Settings,
  PieChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { websiteSchema } from '@/utils/structuredData';

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

  const stats = [
    { number: "500+", label: "Happy Clients", icon: Users },
    { number: "98%", label: "Success Rate", icon: CheckCircle },
    { number: "24/7", label: "Support", icon: Clock },
    { number: "CHF 0", label: "Hidden Fees", icon: Shield }
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

  const features = [
    {
      title: "Professional Client Portal",
      description: "Secure dashboard for document management and communication",
      icon: Lock,
      link: "/client-portal"
    },
    {
      title: "Expert Team Profiles",
      description: "Meet our certified tax experts with proven track records",
      icon: UserCheck,
      link: "/team"
    },
    {
      title: "Industry Specializations",
      description: "Deep expertise across various sectors and industries",
      icon: Building,
      link: "/industry-specializations"
    },
    {
      title: "Advanced Tax Tools",
      description: "Sophisticated analysis and planning tools for complex cases",
      icon: PieChart,
      link: "/advanced-tax-tools"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Müller",
      role: "Expat from Germany",
      content: "Taxed GmbH made my Swiss tax filing incredibly simple. The digital process was smooth and their expertise saved me money.",
      rating: 5
    },
    {
      name: "James Wilson",
      role: "International Consultant",
      content: "Professional service with transparent pricing. They handled my complex international income situation perfectly.",
      rating: 5
    },
    {
      name: "Maria Rodriguez",
      role: "Tech Professional",
      content: "The client portal is fantastic. I can track everything online and communicate easily with my tax expert.",
      rating: 5
    }
  ];

  return (
    <>
      <Helmet>
        <title>Taxed GmbH | Professional Swiss Tax Services for Expats & Businesses</title>
        <meta name="description" content="Leading Swiss tax consulting firm offering expert services for expatriates and businesses. Professional client portal, advanced tools, and comprehensive tax solutions." />
        <meta name="keywords" content="Swiss tax services, tax consultant Switzerland, Steuererklärung Schweiz, expat taxes, Quellensteuer, Swiss tax return, Steuerberater Zürich, professional tax filing, Swiss tax planning, international tax Switzerland, tax optimization, digital tax filing" />
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
                "closes": "17:00"
              }
            ],
            "currenciesAccepted": "CHF",
            "paymentAccepted": "Cash, Credit Card, Bank Transfer",
            "sameAs": [
              "https://www.linkedin.com/company/taxed-gmbh",
              "https://www.facebook.com/taxedgmbh",
              "https://twitter.com/taxedgmbh"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "3",
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": [
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Sarah Müller"
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "reviewBody": "Taxed GmbH made my Swiss tax filing incredibly simple. The digital process was smooth and their expertise saved me money.",
                "datePublished": "2024-03-15"
              },
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "James Wilson"
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "reviewBody": "Professional service with transparent pricing. They handled my complex international income situation perfectly.",
                "datePublished": "2024-05-22"
              },
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Maria Rodriguez"
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "reviewBody": "The client portal is fantastic. I can track everything online and communicate easily with my tax expert.",
                "datePublished": "2024-07-10"
              }
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
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-gray-900 px-4 py-2 rounded-md z-50">
        Skip to main content
      </a>

      {/* Hero Section - Improved Contrast and Responsiveness */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-steel-blue via-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
            className="text-white"
          >
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm border border-white/30">
                <Award className="h-4 w-4 mr-2" aria-hidden="true" />
                Professional Swiss Tax Services
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              Expert Swiss Tax
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Solutions
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-white max-w-4xl mx-auto leading-relaxed">
              Professional tax consulting services for expatriates and businesses.
              <span className="block mt-2">Advanced tools, secure client portal, and expert guidance for all your Swiss tax needs.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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
                className="border-2 border-white bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
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

            {/* Stats - Better Responsive Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={fadeInUp.initial}
                  animate={fadeInUp.animate}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-6 sm:h-8 w-6 sm:w-8 text-yellow-300" aria-hidden="true" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-white">{stat.label}</div>
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
                          <span className="px-2 py-1 bg-white/20 rounded-full text-xs">10+ Years Experience</span>
                          <span className="px-2 py-1 bg-white/20 rounded-full text-xs">500+ Clients</span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>Save up to 80% compared to Big 4 firms</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>Certified Swiss tax experts</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>500+ satisfied expat clients</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>GDPR compliant & Swiss data residency</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>Response within 24 hours guaranteed</span>
                      </li>
                    </ul>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap gap-3 pt-4">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Swiss Tax Expert</span>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm">GDPR Compliant</span>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Data Protection</span>
                    </div>
                  </div>

                  {/* HubSpot Form - Right Side */}
                  <div className="lg:col-span-3 bg-white rounded-xl p-4 sm:p-6 shadow-inner">
                    <iframe
                      src="https://share-eu1.hsforms.com/1xA0NQrALToW5NH7CkatXWA2ds4ox"
                      width="100%"
                      height="950"
                      frameBorder="0"
                      scrolling="no"
                      title="Free Tax Assessment Form"
                      className="border-0 rounded-lg"
                      style={{ minHeight: '950px' }}
                    />
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
                Comprehensive Swiss tax solutions designed for expatriates and businesses.
                Expert guidance, transparent pricing, and digital-first approach.
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
                        className="inline-flex items-center text-blue-700 hover:text-blue-900 font-medium focus:outline-none focus:underline"
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
                Access our comprehensive suite of tax tools, calculators, and resources.
                Everything you need to understand and optimize your Swiss tax situation.
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
                          <div className="flex flex-wrap gap-2 mb-4">
                            {tool.features.map((feature, idx) => (
                              <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-900 text-xs sm:text-sm rounded-full font-medium">
                                {feature}
                              </span>
                            ))}
                          </div>
                          <Link
                            to={tool.link}
                            className="inline-flex items-center text-blue-700 hover:text-blue-900 font-medium focus:outline-none focus:underline"
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

        {/* Professional Features Section - Improved Responsiveness */}
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
                Professional Features
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
                Enterprise-level tools and services that rival the Big 4 consulting firms.
                Secure, professional, and designed for serious tax optimization.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={fadeInUp.initial}
                  whileInView={fadeInUp.whileInView}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group focus-within:ring-2 focus-within:ring-blue-500">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="p-3 bg-gradient-to-r from-blue-700 to-blue-600 rounded-lg text-white group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                            <feature.icon className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                          <p className="text-gray-700 mb-4 text-sm sm:text-base">{feature.description}</p>
                          <Link
                            to={feature.link}
                            className="inline-flex items-center text-blue-700 hover:text-blue-900 font-medium focus:outline-none focus:underline"
                            aria-label={`Explore ${feature.title} feature`}
                          >
                            Explore Feature <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
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

        {/* Testimonials Section - Fixed Contrast */}
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
                What Our Clients Say
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white max-w-3xl mx-auto">
                Join hundreds of satisfied clients who trust Taxed GmbH with their Swiss tax needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={fadeInUp.initial}
                  whileInView={fadeInUp.whileInView}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex mb-4" role="img" aria-label={`${testimonial.rating} star rating`}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-300 fill-current" aria-hidden="true" />
                        ))}
                      </div>
                      <Quote className="h-8 w-8 text-white/80 mb-4" aria-hidden="true" />
                      <p className="text-white mb-6 italic text-sm sm:text-base">"{testimonial.content}"</p>
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-gray-200 text-sm">{testimonial.role}</div>
                      </div>
                    </CardContent>
                  </Card>
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
                Join hundreds of expatriates and businesses who trust Taxed GmbH for their Swiss tax needs.
                Professional service, transparent pricing, and expert guidance.
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
                  className="border-2 border-white bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-2">500+</div>
                  <div className="text-gray-300 text-sm sm:text-base">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-2">98%</div>
                  <div className="text-gray-300 text-sm sm:text-base">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-2">24/7</div>
                  <div className="text-gray-300 text-sm sm:text-base">Support Available</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LandingPage;