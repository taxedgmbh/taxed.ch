import React from 'react';
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

const LandingPage = () => {
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
      color: "bg-blue-500",
      link: "/services"
    },
    {
      title: "Tax Planning",
      description: "Strategic optimization to minimize your tax burden legally",
      icon: TrendingUp,
      color: "bg-green-500",
      link: "/services"
    },
    {
      title: "Digital Filing",
      description: "Secure online submission with real-time tracking",
      icon: Zap,
      color: "bg-purple-500",
      link: "/services"
    },
    {
      title: "International Income",
      description: "Cross-border income reporting and compliance",
      icon: Globe,
      color: "bg-orange-500",
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
            "openingHours": "Mo-Fr 09:00-17:00",
            "sameAs": [
              "https://www.linkedin.com/company/taxed-gmbh",
              "https://www.facebook.com/taxedgmbh"
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
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-steel-blue via-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20">
                <Award className="h-4 w-4 mr-2" />
                Professional Swiss Tax Services
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Expert Swiss Tax
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Solutions
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-4xl mx-auto leading-relaxed">
              Professional tax consulting services for expatriates and businesses. 
              <span className="block mt-2">Advanced tools, secure client portal, and expert guidance for all your Swiss tax needs.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-white text-steel-blue hover:bg-gray-100 text-lg px-8 py-4">
                <Link to="/store">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-steel-blue text-lg px-8 py-4">
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Free Consultation
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-8 w-8 text-yellow-300" />
                  </div>
                  <div className="text-3xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60"
          >
            <ChevronRight className="h-6 w-6 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Professional Tax Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive Swiss tax solutions designed for expatriates and businesses. 
              Expert guidance, transparent pricing, and digital-first approach.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-lg ${service.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Link to={service.link} className="inline-flex items-center text-steel-blue hover:text-blue-700 font-medium">
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Resources Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Free Tools & Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access our comprehensive suite of tax tools, calculators, and resources. 
              Everything you need to understand and optimize your Swiss tax situation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-steel-blue rounded-lg text-white">
                          <tool.icon className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.title}</h3>
                        <p className="text-gray-600 mb-4">{tool.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tool.features.map((feature, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                        <Link to={tool.link} className="inline-flex items-center text-steel-blue hover:text-blue-700 font-medium">
                          Access Now <ArrowRight className="ml-1 h-4 w-4" />
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

      {/* Professional Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Professional Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enterprise-level tools and services that rival the Big 4 consulting firms. 
              Secure, professional, and designed for serious tax optimization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-gradient-to-r from-steel-blue to-blue-600 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                        <p className="text-gray-600 mb-4">{feature.description}</p>
                        <Link to={feature.link} className="inline-flex items-center text-steel-blue hover:text-blue-700 font-medium">
                          Explore Feature <ArrowRight className="ml-1 h-4 w-4" />
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-steel-blue to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Join hundreds of satisfied clients who trust Taxed GmbH with their Swiss tax needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-300 fill-current" />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-white/60 mb-4" />
                    <p className="text-white/90 mb-6 italic">"{testimonial.content}"</p>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-white/70 text-sm">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Optimize Your Swiss Taxes?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join hundreds of expatriates and businesses who trust Taxed GmbH for their Swiss tax needs. 
              Professional service, transparent pricing, and expert guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4">
                <Link to="/store">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4">
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Free Consultation
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-gray-400">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">98%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-400">Support Available</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;