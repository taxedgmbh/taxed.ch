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
  Phone
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
          title: 'Tech Startup Tax Optimization',
          description: 'Helped a Series B startup save CHF 150,000 through strategic tax planning',
          savings: 'CHF 150,000'
        },
        {
          title: 'Google Switzerland Executive',
          description: 'Optimized tax strategy for senior executive with complex RSU compensation',
          savings: 'CHF 85,000'
        }
      ],
      services: [
        'Equity Compensation Tax Planning',
        'International Tax Strategy',
        'R&D Tax Credit Optimization',
        'Crypto Asset Taxation',
        'Tech Executive Tax Planning'
      ],
      stats: {
        clients: 150,
        averageSavings: 'CHF 75,000',
        satisfaction: 4.9,
        yearsExperience: 8
      }
    },
    {
      id: 'finance',
      name: 'Finance & Banking',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      description: 'Specialized tax services for financial institutions, investment professionals, and banking executives.',
      challenges: [
        'Complex bonus and deferred compensation structures',
        'Investment income and capital gains optimization',
        'Regulatory compliance and reporting requirements',
        'International banking and cross-border transactions',
        'Private banking and wealth management taxation'
      ],
      solutions: [
        'Bonus timing and structure optimization',
        'Investment portfolio tax planning',
        'Regulatory compliance frameworks',
        'International banking tax strategy',
        'Wealth management tax optimization'
      ],
      caseStudies: [
        {
          title: 'UBS Investment Manager',
          description: 'Optimized tax strategy for high-earning investment professional',
          savings: 'CHF 65,000'
        },
        {
          title: 'Private Banking Client',
          description: 'Comprehensive wealth management tax planning',
          savings: 'CHF 120,000'
        }
      ],
      services: [
        'Banking Executive Tax Planning',
        'Investment Income Optimization',
        'Regulatory Compliance',
        'Private Banking Tax Strategy',
        'Capital Gains Planning'
      ],
      stats: {
        clients: 200,
        averageSavings: 'CHF 90,000',
        satisfaction: 4.8,
        yearsExperience: 12
      }
    },
    {
      id: 'pharmaceutical',
      name: 'Pharmaceutical & Life Sciences',
      icon: Flask,
      color: 'from-purple-500 to-pink-600',
      description: 'Expert tax services for pharmaceutical companies, biotech firms, and life sciences professionals.',
      challenges: [
        'Clinical trial and R&D tax incentives',
        'International patent and licensing structures',
        'Regulatory compliance and reporting',
        'Cross-border clinical research taxation',
        'Pharmaceutical executive compensation'
      ],
      solutions: [
        'R&D tax credit maximization',
        'International patent tax planning',
        'Regulatory compliance frameworks',
        'Clinical research tax optimization',
        'Executive compensation planning'
      ],
      caseStudies: [
        {
          title: 'Roche Clinical Director',
          description: 'Optimized tax strategy for clinical research director',
          savings: 'CHF 25,000'
        },
        {
          title: 'Biotech Startup',
          description: 'R&D tax credit optimization for early-stage biotech',
          savings: 'CHF 80,000'
        }
      ],
      services: [
        'R&D Tax Credit Optimization',
        'Patent and Licensing Tax Planning',
        'Clinical Research Tax Strategy',
        'Pharmaceutical Executive Planning',
        'Regulatory Compliance'
      ],
      stats: {
        clients: 75,
        averageSavings: 'CHF 45,000',
        satisfaction: 4.9,
        yearsExperience: 10
      }
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing & Industrial',
      icon: Factory,
      color: 'from-orange-500 to-red-600',
      description: 'Comprehensive tax solutions for manufacturing companies, industrial firms, and supply chain operations.',
      challenges: [
        'International supply chain and transfer pricing',
        'Manufacturing incentives and tax credits',
        'Cross-border operations and compliance',
        'Industrial executive compensation',
        'Environmental and sustainability tax incentives'
      ],
      solutions: [
        'Transfer pricing optimization',
        'Manufacturing tax credit maximization',
        'International operations tax planning',
        'Executive compensation planning',
        'Sustainability tax incentives'
      ],
      caseStudies: [
        {
          title: 'ABB Operations Director',
          description: 'Resolved complex international tax issues for manufacturing executive',
          savings: 'CHF 40,000'
        },
        {
          title: 'Manufacturing Company',
          description: 'Transfer pricing optimization for international operations',
          savings: 'CHF 200,000'
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
      name: 'Consulting & Professional Services',
      icon: Users,
      color: 'from-indigo-500 to-blue-600',
      description: 'Specialized tax services for consulting firms, professional service providers, and independent consultants.',
      challenges: [
        'Partnership and LLP tax structures',
        'International client work and cross-border income',
        'Professional service executive compensation',
        'Business development and expansion taxation',
        'Independent consultant tax optimization'
      ],
      solutions: [
        'Partnership tax optimization',
        'International income planning',
        'Executive compensation strategies',
        'Business expansion tax planning',
        'Independent consultant optimization'
      ],
      caseStudies: [
        {
          title: 'McKinsey Partner',
          description: 'Comprehensive tax filing for consulting partner',
          savings: 'CHF 30,000'
        },
        {
          title: 'Independent Consultant',
          description: 'Tax optimization for international consultant',
          savings: 'CHF 25,000'
        }
      ],
      services: [
        'Partnership Tax Planning',
        'International Income Optimization',
        'Professional Service Executive Planning',
        'Business Expansion Tax Strategy',
        'Independent Consultant Planning'
      ],
      stats: {
        clients: 125,
        averageSavings: 'CHF 35,000',
        satisfaction: 4.8,
        yearsExperience: 9
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
      </Helmet>

      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 rounded-full bg-warm-red-tint text-brand-red flex items-center justify-center mx-auto mb-6">
              <Building className="h-8 w-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-dark-gray mb-6">
              Industry Specializations
            </h1>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              Deep sector expertise across major industries. Our specialized knowledge ensures you get 
              the most relevant and effective tax solutions for your specific industry challenges.
            </p>
          </motion.div>

          {/* Industry Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          >
            <Card className="text-center">
              <CardContent className="p-6">
                <Building className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-sm text-gray-600">Industry Sectors</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">650+</p>
                <p className="text-sm text-gray-600">Industry Clients</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">CHF 25M+</p>
                <p className="text-sm text-gray-600">Total Tax Savings</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">4.8/5</p>
                <p className="text-sm text-gray-600">Industry Satisfaction</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Industry Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => setSelectedIndustry(industry.id)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedIndustry === industry.id
                      ? `bg-gradient-to-r ${industry.color} text-white shadow-lg`
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  <industry.icon className="h-5 w-5" />
                  <span>{industry.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Selected Industry Content */}
          {selectedIndustryData && (
            <motion.div
              key={selectedIndustryData.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Industry Overview */}
              <div className="text-center mb-12">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${selectedIndustryData.color} flex items-center justify-center mx-auto mb-6`}>
                  <selectedIndustryData.icon className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-dark-gray mb-4">
                  {selectedIndustryData.name} Tax Expertise
                </h2>
                <p className="text-xl text-dark-gray/80 max-w-4xl mx-auto">
                  {selectedIndustryData.description}
                </p>
              </div>

              {/* Industry Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-gray-900">{selectedIndustryData.stats.clients}+</p>
                    <p className="text-sm text-gray-600">Clients Served</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-gray-900">{selectedIndustryData.stats.averageSavings}</p>
                    <p className="text-sm text-gray-600">Average Savings</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Award className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-gray-900">{selectedIndustryData.stats.satisfaction}/5</p>
                    <p className="text-sm text-gray-600">Client Satisfaction</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Clock className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                    <p className="text-2xl font-bold text-gray-900">{selectedIndustryData.stats.yearsExperience}</p>
                    <p className="text-sm text-gray-600">Years Experience</p>
                  </CardContent>
                </Card>
              </div>

              {/* Challenges and Solutions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-red-600">
                      <Shield className="h-5 w-5" />
                      <span>Common Challenges</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {selectedIndustryData.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span>Our Solutions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {selectedIndustryData.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Case Studies */}
              <div>
                <h3 className="text-2xl font-bold text-dark-gray mb-6">Success Stories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedIndustryData.caseStudies.map((study, index) => (
                    <Card key={index} className="border-steel-blue/20">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-dark-gray mb-2">{study.title}</h4>
                        <p className="text-gray-600 mb-4">{study.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-green-600">{study.savings}</span>
                          <Button variant="outline" size="sm">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-2xl font-bold text-dark-gray mb-6">Specialized Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedIndustryData.services.map((service, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-steel-blue/10 rounded-lg flex items-center justify-center">
                            <Calculator className="h-4 w-4 text-steel-blue" />
                          </div>
                          <span className="font-medium text-gray-900">{service}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Card className="bg-gradient-to-r from-steel-blue to-blue-600 text-white">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold mb-4">Ready to Optimize Your Industry Tax Strategy?</h3>
                <p className="text-xl mb-8 text-blue-100">
                  Our industry experts are ready to help you navigate the complex tax challenges specific to your sector.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-steel-blue hover:bg-gray-100"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Get Industry Consultation
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-steel-blue"
                    onClick={() => {
                      const subject = encodeURIComponent("Inquiry");
    const body = encodeURIComponent("Hello Taxed GmbH,\n\nI have a question about your services. Could you please help me?");
                      const message = encodeURIComponent(`Hello! I'm interested in your ${selectedIndustryData?.name} tax expertise. Could you please provide more information about your specialized services?`);
                      window.open(emailUrl, '_blank');
                    }}
                  >
                    Email Industry Expert
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default IndustrySpecializationsPage;
