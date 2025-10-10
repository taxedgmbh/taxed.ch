import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Building, 
  Code, 
  DollarSign, 
  Beaker, 
  Factory, 
  Users, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Globe,
  Shield,
  Clock,
  Award,
  BookOpen,
  Calculator,
  FileText,
  MessageSquare,
  Phone,
  Star,
  Target,
  Zap,
  BarChart3,
  PieChart,
  Lock,
  Eye,
  Download,
  Calendar,
  Play,
  ExternalLink,
  Briefcase,
  Scale,
  Heart,
  Stethoscope,
  Car,
  Home,
  Plane,
  ShoppingCart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const IndustrySpecializationsPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('technology');

  const industries = [
    {
      id: 'technology',
      name: 'Technology',
      icon: Code,
      color: 'from-blue-500 to-purple-600',
      description: 'Comprehensive tax solutions for tech companies, startups, and professionals in the digital economy.',
      challenges: [
        'Complex equity compensation structures (RSUs, stock options)',
        'International expansion and transfer pricing',
        'R&D tax credits and innovation incentives',
        'Crypto and digital asset taxation',
        'Cross-border employee mobility'
      ],
      solutions: [
        'Equity compensation optimization strategies',
        'International tax planning for tech expansion',
        'R&D tax credit maximization',
        'Crypto asset compliance and planning',
        'Expat tax optimization for tech professionals'
      ],
      caseStudies: [
        {
          title: 'Tech Startup IPO Preparation',
          description: 'Helped a fintech startup optimize equity structures before IPO',
          savings: 'CHF 2.5M in tax savings'
        },
        {
          title: 'International Tech Expansion',
          description: 'Structured tax-efficient expansion for a SaaS company',
          savings: 'CHF 1.8M in transfer pricing optimization'
        }
      ],
      services: [
        'Equity Compensation Planning',
        'International Tax Structures',
        'R&D Tax Credit Optimization',
        'Crypto Asset Compliance',
        'Tech Executive Tax Planning'
      ],
      stats: {
        clients: 150,
        averageSavings: 'CHF 85,000',
        satisfaction: 4.9,
        yearsExperience: 12
      }
    },
    {
      id: 'finance',
      name: 'Finance & Banking',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      description: 'Specialized tax consulting for financial institutions, investment firms, and banking professionals.',
      challenges: [
        'Complex investment structures and fund taxation',
        'Regulatory compliance and reporting requirements',
        'Cross-border financial transactions',
        'Private banking and wealth management taxation',
        'Fintech and digital banking compliance'
      ],
      solutions: [
        'Investment fund tax optimization',
        'Regulatory compliance frameworks',
        'Cross-border transaction structuring',
        'Private banking tax strategies',
        'Fintech compliance and planning'
      ],
      caseStudies: [
        {
          title: 'Private Banking Optimization',
          description: 'Restructured private banking operations for tax efficiency',
          savings: 'CHF 3.2M in annual tax savings'
        },
        {
          title: 'Investment Fund Structure',
          description: 'Optimized fund structure for international investors',
          savings: 'CHF 1.5M in withholding tax optimization'
        }
      ],
      services: [
        'Investment Fund Taxation',
        'Private Banking Optimization',
        'Cross-border Finance Planning',
        'Regulatory Compliance',
        'Wealth Management Tax Strategies'
      ],
      stats: {
        clients: 120,
        averageSavings: 'CHF 95,000',
        satisfaction: 4.8,
        yearsExperience: 15
      }
    },
    {
      id: 'pharmaceutical',
      name: 'Pharmaceutical & Life Sciences',
      icon: Beaker,
      color: 'from-purple-500 to-pink-600',
      description: 'Expert tax guidance for pharmaceutical companies, biotech firms, and healthcare organizations.',
      challenges: [
        'R&D tax incentives and patent strategies',
        'International clinical trial taxation',
        'Pharmaceutical pricing and transfer pricing',
        'Healthcare facility and medical device taxation',
        'Regulatory compliance in multiple jurisdictions'
      ],
      solutions: [
        'R&D tax incentive maximization',
        'Patent and IP tax strategies',
        'Clinical trial tax optimization',
        'Healthcare facility planning',
        'Multi-jurisdictional compliance'
      ],
      caseStudies: [
        {
          title: 'Biotech R&D Optimization',
          description: 'Maximized R&D tax credits for a biotech company',
          savings: 'CHF 4.1M in R&D tax credits'
        },
        {
          title: 'International Clinical Trials',
          description: 'Structured tax-efficient clinical trial operations',
          savings: 'CHF 2.3M in operational tax savings'
        }
      ],
      services: [
        'R&D Tax Credit Optimization',
        'Patent Tax Strategies',
        'Clinical Trial Tax Planning',
        'Healthcare Facility Planning',
        'Multi-jurisdictional Compliance'
      ],
      stats: {
        clients: 80,
        averageSavings: 'CHF 120,000',
        satisfaction: 4.9,
        yearsExperience: 18
      }
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing & Industrial',
      icon: Factory,
      color: 'from-orange-500 to-red-600',
      description: 'Tailored tax solutions for manufacturing companies, industrial firms, and production facilities.',
      challenges: [
        'Transfer pricing for manufacturing operations',
        'Industrial tax credits and incentives',
        'International supply chain taxation',
        'Manufacturing facility and equipment depreciation',
        'Environmental and sustainability tax incentives'
      ],
      solutions: [
        'Transfer pricing optimization',
        'Manufacturing tax credit maximization',
        'Supply chain tax planning',
        'Equipment depreciation strategies',
        'Sustainability tax incentives'
      ],
      caseStudies: [
        {
          title: 'Manufacturing Transfer Pricing',
          description: 'Optimized transfer pricing for global manufacturing operations',
          savings: 'CHF 5.2M in transfer pricing optimization'
        },
        {
          title: 'Industrial Tax Credits',
          description: 'Maximized manufacturing tax credits and incentives',
          savings: 'CHF 2.8M in tax credits'
        }
      ],
      services: [
        'Transfer Pricing Optimization',
        'Manufacturing Tax Credits',
        'International Operations Planning',
        'Industrial Executive Planning',
        'Sustainability Tax Incentives'
      ],
      stats: {
        clients: 100,
        averageSavings: 'CHF 60,000',
        satisfaction: 4.7,
        yearsExperience: 15
      }
    },
    {
      id: 'consulting',
      name: 'Professional Services & Consulting',
      icon: Users,
      color: 'from-teal-500 to-cyan-600',
      description: 'Specialized tax services for consulting firms, professional services, and advisory businesses.',
      challenges: [
        'Partnership and LLP taxation',
        'Professional services billing and VAT',
        'International consulting operations',
        'Professional liability and insurance taxation',
        'Client billing and expense optimization'
      ],
      solutions: [
        'Partnership tax optimization',
        'Professional services VAT planning',
        'International consulting structures',
        'Professional liability tax strategies',
        'Client billing optimization'
      ],
      caseStudies: [
        {
          title: 'Consulting Partnership Optimization',
          description: 'Restructured partnership for tax efficiency',
          savings: 'CHF 1.8M in partnership tax savings'
        },
        {
          title: 'International Consulting Structure',
          description: 'Optimized international consulting operations',
          savings: 'CHF 2.1M in operational tax savings'
        }
      ],
      services: [
        'Partnership Tax Planning',
        'Professional Services VAT',
        'International Consulting Structures',
        'Professional Liability Planning',
        'Client Billing Optimization'
      ],
      stats: {
        clients: 90,
        averageSavings: 'CHF 45,000',
        satisfaction: 4.8,
        yearsExperience: 12
      }
    },
    {
      id: 'healthcare',
      name: 'Healthcare & Medical',
      icon: Stethoscope,
      color: 'from-red-500 to-pink-600',
      description: 'Comprehensive tax solutions for healthcare providers, medical practices, and healthcare organizations.',
      challenges: [
        'Medical practice and clinic taxation',
        'Healthcare facility and equipment depreciation',
        'Medical professional tax planning',
        'Healthcare insurance and billing taxation',
        'International medical practice operations'
      ],
      solutions: [
        'Medical practice tax optimization',
        'Healthcare facility planning',
        'Medical professional tax strategies',
        'Healthcare billing optimization',
        'International medical practice planning'
      ],
      caseStudies: [
        {
          title: 'Medical Practice Optimization',
          description: 'Optimized tax structure for large medical practice',
          savings: 'CHF 1.2M in practice tax savings'
        },
        {
          title: 'Healthcare Facility Planning',
          description: 'Structured tax-efficient healthcare facility expansion',
          savings: 'CHF 3.5M in facility tax optimization'
        }
      ],
      services: [
        'Medical Practice Tax Planning',
        'Healthcare Facility Optimization',
        'Medical Professional Planning',
        'Healthcare Billing Optimization',
        'International Medical Practice Planning'
      ],
      stats: {
        clients: 70,
        averageSavings: 'CHF 55,000',
        satisfaction: 4.9,
        yearsExperience: 14
      }
    }
  ];

  const selectedIndustryData = industries.find(industry => industry.id === selectedIndustry);

  return (
    <>
      <Helmet>
        <title>Industry Specializations - Sector Expertise | Taxed GmbH</title>
        <meta name="description" content="Deep industry expertise across technology, finance, pharmaceutical, manufacturing, and consulting sectors. Specialized tax solutions tailored to your industry." />
        <meta property="og:title" content="Industry Specializations - Sector Expertise | Taxed GmbH" />
        <meta property="og:description" content="Deep industry expertise across technology, finance, pharmaceutical, manufacturing, and consulting sectors. Specialized tax solutions tailored to your industry." />
        <link rel="canonical" href="https://taxed.ch/industry-specializations" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-steel-blue to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Industry Specializations
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
              Deep expertise across key sectors with specialized tax solutions tailored to your industry's unique challenges and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-steel-blue hover:bg-gray-100 px-8 py-4 text-lg">
                <a href="#industries">
                  Explore Industries
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-steel-blue px-8 py-4 text-lg">
                <a href="/contact">
                  Get Industry Consultation
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry Selection */}
      <section id="industries" className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-6">
              Choose Your Industry
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select your industry to see our specialized expertise and solutions tailored to your sector's unique tax challenges.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {industries.map((industry, index) => (
              <motion.div
                  key={industry.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    selectedIndustry === industry.id 
                      ? 'ring-2 ring-steel-blue shadow-xl' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedIndustry(industry.id)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${industry.color} flex items-center justify-center mx-auto mb-4`}>
                      <industry.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-dark-gray">{industry.name}</CardTitle>
                    <p className="text-gray-600 text-sm">{industry.description}</p>
                  </CardHeader>
                </Card>
              </motion.div>
              ))}
            </div>
        </div>
      </section>

      {/* Selected Industry Details */}
          {selectedIndustryData && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              key={selectedIndustry}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${selectedIndustryData.color} flex items-center justify-center mx-auto mb-6`}>
                  <selectedIndustryData.icon className="h-10 w-10 text-white" />
                </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-6">
                {selectedIndustryData.name} Expertise
                </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                  {selectedIndustryData.description}
                </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-steel-blue mb-2">{selectedIndustryData.stats.clients}+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-steel-blue mb-2">{selectedIndustryData.stats.averageSavings}</div>
                <div className="text-sm text-gray-600">Average Savings</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-steel-blue mb-2">{selectedIndustryData.stats.satisfaction}/5</div>
                <div className="text-sm text-gray-600">Client Rating</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-steel-blue mb-2">{selectedIndustryData.stats.yearsExperience}+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </motion.div>
              </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Challenges */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-dark-gray flex items-center">
                      <Target className="h-5 w-5 text-red-500 mr-2" />
                      Industry Challenges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {selectedIndustryData.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Solutions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-dark-gray flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Our Solutions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {selectedIndustryData.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              </div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16"
            >
              <h3 className="text-2xl font-bold text-dark-gray text-center mb-8">
                Specialized Services for {selectedIndustryData.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedIndustryData.services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${selectedIndustryData.color} flex items-center justify-center mr-3`}>
                            <selectedIndustryData.icon className="h-5 w-5 text-white" />
                          </div>
                          <h4 className="font-semibold text-dark-gray">{service}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  ))}
              </div>
            </motion.div>

            {/* Case Studies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16"
            >
              <h3 className="text-2xl font-bold text-dark-gray text-center mb-8">
                Success Stories in {selectedIndustryData.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {selectedIndustryData.caseStudies.map((study, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle className="text-lg text-dark-gray">{study.title}</CardTitle>
                        <p className="text-gray-600">{study.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Tax Savings</span>
                          <span className="text-lg font-bold text-green-600">{study.savings}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  ))}
              </div>
            </motion.div>
          </div>
        </section>
          )}

          {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-steel-blue to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Optimize Your Industry Tax Strategy?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Our industry specialists are ready to help you navigate the complex tax landscape specific to your sector.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-steel-blue hover:bg-gray-100 px-8 py-4 text-lg">
                <a href="/contact">
                  Get Industry-Specific Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                  </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-steel-blue px-8 py-4 text-lg">
                <a href="/services">
                  View All Services
                </a>
                  </Button>
                </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default IndustrySpecializationsPage;