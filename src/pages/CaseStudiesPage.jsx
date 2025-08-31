import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users, 
  Building, 
  Globe, 
  Award,
  CheckCircle,
  ArrowRight,
  Filter,
  Search,
  Download,
  Eye,
  Calendar,
  MapPin,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CaseStudiesPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedService, setSelectedService] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const industries = [
    { id: 'all', name: 'All Industries' },
    { id: 'technology', name: 'Technology' },
    { id: 'finance', name: 'Finance & Banking' },
    { id: 'pharmaceutical', name: 'Pharmaceutical' },
    { id: 'manufacturing', name: 'Manufacturing' },
    { id: 'consulting', name: 'Consulting' }
  ];

  const services = [
    { id: 'all', name: 'All Services' },
    { id: 'tax-returns', name: 'Tax Returns' },
    { id: 'tax-planning', name: 'Tax Planning' },
    { id: 'international', name: 'International Tax' },
    { id: 'compliance', name: 'Compliance' },
    { id: 'optimization', name: 'Tax Optimization' }
  ];

  const caseStudies = [
    {
      id: 1,
      title: "Tech Executive Tax Optimization",
      subtitle: "Reduced tax burden by 45% for senior tech executive",
      industry: "technology",
      service: "tax-optimization",
      client: "Senior Software Engineer at Google Switzerland",
      challenge: "High-income tech executive with complex international income sources, RSUs, and crypto investments facing 60% effective tax rate.",
      solution: "Implemented comprehensive tax planning strategy including Pillar 3a optimization, foreign tax credits, and investment structure optimization.",
      results: [
        "45% reduction in effective tax rate",
        "CHF 85,000 in tax savings",
        "Optimized investment portfolio structure",
        "Compliant international tax reporting"
      ],
      metrics: {
        taxSavings: "CHF 85,000",
        timeSaved: "40 hours",
        complexity: "High",
        satisfaction: 5
      },
      duration: "3 months",
      team: "2 tax advisors",
      tags: ["High Net Worth", "International Income", "RSUs", "Crypto"],
      featured: true,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      title: "Pharmaceutical Executive Compliance",
      subtitle: "Streamlined tax compliance for pharmaceutical executive",
      industry: "pharmaceutical",
      service: "compliance",
      client: "Clinical Research Director at Roche",
      challenge: "Complex compensation package including stock options, bonuses, and international assignments requiring multi-jurisdictional tax compliance.",
      solution: "Developed comprehensive compliance framework with automated reporting systems and proactive tax planning.",
      results: [
        "100% compliance rate achieved",
        "CHF 25,000 in tax savings",
        "Streamlined reporting process",
        "Reduced audit risk by 80%"
      ],
      metrics: {
        taxSavings: "CHF 25,000",
        timeSaved: "25 hours",
        complexity: "Medium",
        satisfaction: 5
      },
      duration: "2 months",
      team: "1 tax advisor",
      tags: ["Stock Options", "International Assignment", "Compliance"],
      featured: false,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      title: "Banking Professional Tax Planning",
      subtitle: "Optimized tax strategy for banking professional",
      industry: "finance",
      service: "tax-planning",
      client: "Investment Manager at UBS",
      challenge: "High-earning banking professional with complex bonus structures, deferred compensation, and international investments.",
      solution: "Implemented strategic tax planning including timing optimization, deduction maximization, and investment structure planning.",
      results: [
        "35% reduction in tax liability",
        "CHF 65,000 in tax savings",
        "Optimized bonus timing strategy",
        "Enhanced retirement planning"
      ],
      metrics: {
        taxSavings: "CHF 65,000",
        timeSaved: "30 hours",
        complexity: "High",
        satisfaction: 5
      },
      duration: "4 months",
      team: "2 tax advisors",
      tags: ["Banking", "Bonus Optimization", "Investment Planning"],
      featured: true,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      title: "Manufacturing Executive International Tax",
      subtitle: "Resolved complex international tax issues",
      industry: "manufacturing",
      service: "international",
      client: "Operations Director at ABB",
      challenge: "Executive with income from multiple countries, including Switzerland, Germany, and the US, facing double taxation issues.",
      solution: "Leveraged tax treaties and implemented proper tax credit strategies to eliminate double taxation and optimize overall tax position.",
      results: [
        "Eliminated double taxation",
        "CHF 40,000 in tax savings",
        "Streamlined international reporting",
        "Reduced compliance complexity"
      ],
      metrics: {
        taxSavings: "CHF 40,000",
        timeSaved: "35 hours",
        complexity: "Very High",
        satisfaction: 5
      },
      duration: "5 months",
      team: "3 tax advisors",
      tags: ["International Tax", "Double Taxation", "Tax Treaties"],
      featured: false,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 5,
      title: "Consulting Partner Tax Returns",
      subtitle: "Comprehensive tax filing for consulting partner",
      industry: "consulting",
      service: "tax-returns",
      client: "Partner at McKinsey Switzerland",
      challenge: "Partner-level consultant with complex partnership income, multiple business interests, and international client work.",
      solution: "Comprehensive tax return preparation with proper partnership income allocation and international income reporting.",
      results: [
        "Accurate partnership income reporting",
        "CHF 30,000 in tax savings",
        "Optimized business deductions",
        "Enhanced compliance framework"
      ],
      metrics: {
        taxSavings: "CHF 30,000",
        timeSaved: "20 hours",
        complexity: "Medium",
        satisfaction: 5
      },
      duration: "2 months",
      team: "1 tax advisor",
      tags: ["Partnership", "Business Income", "International Clients"],
      featured: false,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 6,
      title: "Startup Founder Tax Strategy",
      subtitle: "Strategic tax planning for startup founder",
      industry: "technology",
      service: "tax-planning",
      client: "Founder of Swiss FinTech Startup",
      challenge: "Startup founder with equity compensation, international investors, and complex business structure requiring strategic tax planning.",
      solution: "Developed comprehensive tax strategy including equity compensation optimization, business structure planning, and investor relations.",
      results: [
        "Optimized equity compensation structure",
        "CHF 50,000 in tax savings",
        "Enhanced investor relations",
        "Future-proofed tax strategy"
      ],
      metrics: {
        taxSavings: "CHF 50,000",
        timeSaved: "45 hours",
        complexity: "Very High",
        satisfaction: 5
      },
      duration: "6 months",
      team: "3 tax advisors",
      tags: ["Startup", "Equity Compensation", "Investor Relations"],
      featured: true,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  const filteredCaseStudies = caseStudies.filter(study => {
    const matchesIndustry = selectedIndustry === 'all' || study.industry === selectedIndustry;
    const matchesService = selectedService === 'all' || study.service === selectedService;
    const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.client.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesIndustry && matchesService && matchesSearch;
  });

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Very High': return 'text-red-600 bg-red-50';
      case 'High': return 'text-orange-600 bg-orange-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <>
      <Helmet>
        <title>Case Studies - Client Success Stories | Taxed GmbH</title>
        <meta name="description" content="Explore real client success stories and case studies showcasing how Taxed GmbH has helped expats optimize their Swiss tax situation." />
        <meta property="og:title" content="Case Studies - Client Success Stories | Taxed GmbH" />
        <meta property="og:description" content="Explore real client success stories and case studies showcasing how Taxed GmbH has helped expats optimize their Swiss tax situation." />
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
              <TrendingUp className="h-8 w-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-dark-gray mb-6">
              Client Success Stories
            </h1>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              Real results from real clients. Discover how we've helped expats optimize their Swiss tax situation 
              and achieve significant savings while ensuring full compliance.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          >
            <Card className="text-center">
              <CardContent className="p-6">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">CHF 295K+</p>
                <p className="text-sm text-gray-600">Total Tax Savings</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-600">Happy Clients</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">1,200+</p>
                <p className="text-sm text-gray-600">Hours Saved</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">4.9/5</p>
                <p className="text-sm text-gray-600">Client Satisfaction</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search case studies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-steel-blue"
                  >
                    {industries.map(industry => (
                      <option key={industry.id} value={industry.id}>
                        {industry.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-steel-blue"
                  >
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={() => {
                      setSelectedIndustry('all');
                      setSelectedService('all');
                      setSearchTerm('');
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-lg text-dark-gray/80">
              Showing <span className="font-semibold text-steel-blue">{filteredCaseStudies.length}</span> case studies
            </p>
          </div>

          {/* Featured Case Studies */}
          {filteredCaseStudies.filter(study => study.featured).length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-dark-gray mb-8">Featured Case Studies</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredCaseStudies.filter(study => study.featured).map((study, index) => (
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full border-steel-blue/20 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="relative">
                        <img
                          src={study.image}
                          alt={study.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="px-2 py-1 bg-steel-blue text-white text-xs font-medium rounded-full">
                            Featured
                          </span>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <CardTitle className="text-xl text-dark-gray mb-2">
                              {study.title}
                            </CardTitle>
                            <p className="text-steel-blue font-medium mb-3">{study.subtitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center space-x-1">
                            <Building className="h-4 w-4" />
                            <span>{study.client}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{study.duration}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                          <p className="text-gray-600 text-sm">{study.challenge}</p>
                        </div>
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                          <p className="text-gray-600 text-sm">{study.solution}</p>
                        </div>
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-2">Results</h4>
                          <ul className="space-y-1">
                            {study.results.map((result, idx) => (
                              <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span>{result}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="text-center">
                              <p className="text-lg font-bold text-green-600">{study.metrics.taxSavings}</p>
                              <p className="text-xs text-gray-500">Tax Savings</p>
                            </div>
                            <div className="text-center">
                              <p className="text-lg font-bold text-blue-600">{study.metrics.timeSaved}</p>
                              <p className="text-xs text-gray-500">Time Saved</p>
                            </div>
                          </div>
                          <Button className="bg-steel-blue hover:bg-steel-blue/90 text-white">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* All Case Studies */}
          <div>
            <h2 className="text-2xl font-bold text-dark-gray mb-8">All Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCaseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full border-steel-blue/20 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative">
                      <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      {study.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="px-2 py-1 bg-steel-blue text-white text-xs font-medium rounded-full">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg text-dark-gray mb-2">
                        {study.title}
                      </CardTitle>
                      <p className="text-steel-blue font-medium text-sm mb-3">{study.subtitle}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Building className="h-3 w-3" />
                          <span>{study.client}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{study.duration}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <p className="text-gray-600 text-sm line-clamp-3">{study.challenge}</p>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center justify-between">
                          <div className="text-center">
                            <p className="text-lg font-bold text-green-600">{study.metrics.taxSavings}</p>
                            <p className="text-xs text-gray-500">Tax Savings</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-blue-600">{study.metrics.timeSaved}</p>
                            <p className="text-xs text-gray-500">Time Saved</p>
                          </div>
                          <div className="text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(study.metrics.complexity)}`}>
                              {study.metrics.complexity}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">Complexity</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {[...Array(study.metrics.satisfaction)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <Button variant="outline" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

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
                <h3 className="text-3xl font-bold mb-4">Ready to Achieve Similar Results?</h3>
                <p className="text-xl mb-8 text-blue-100">
                  Let us help you optimize your Swiss tax situation and achieve significant savings.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-steel-blue hover:bg-gray-100"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Get Started Today
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-steel-blue"
                    onClick={() => {
                      const phoneNumber = '+41799107787';
                      const message = encodeURIComponent("Hello! I'd like to discuss how you can help me optimize my Swiss tax situation. Could you please provide more information about your services?");
                      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                  >
                    WhatsApp Consultation
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

export default CaseStudiesPage;
