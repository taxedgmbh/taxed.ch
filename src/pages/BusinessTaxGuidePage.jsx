import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Building, 
  Calculator, 
  Shield, 
  Clock, 
  Target,
  CheckCircle,
  AlertTriangle,
  Download,
  ArrowRight,
  Users,
  Globe,
  CreditCard,
  FileText,
  PieChart,
  BarChart3,
  Lightbulb,
  BookOpen,
  PlayCircle,
  TrendingUp,
  DollarSign,
  Briefcase,
  Home,
  GraduationCap,
  Heart,
  Lock,
  Award,
  Zap
} from 'lucide-react';

const BusinessTaxGuidePage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedBusinessType, setSelectedBusinessType] = useState('all');

  const sections = [
    { id: 'overview', name: 'Overview', icon: Target },
    { id: 'corporate', name: 'Corporate Tax', icon: Building },
    { id: 'vat', name: 'VAT', icon: Calculator },
    { id: 'payroll', name: 'Payroll Tax', icon: Users },
    { id: 'international', name: 'International', icon: Globe },
    { id: 'planning', name: 'Tax Planning', icon: PieChart }
  ];

  const businessTypes = [
    { id: 'all', name: 'All Business Types', icon: Building },
    { id: 'gmbh', name: 'GmbH', icon: Building },
    { id: 'ag', name: 'AG', icon: Building },
    { id: 'partnership', name: 'Partnership', icon: Users },
    { id: 'sole', name: 'Sole Proprietorship', icon: Briefcase }
  ];

  const corporateTaxRates = [
    {
      canton: 'Zurich',
      corporateRate: '18.2%',
      municipalRate: '7.5%',
      totalRate: '25.7%',
      description: 'Most business-friendly canton with competitive rates',
      icon: TrendingUp
    },
    {
      canton: 'Geneva',
      corporateRate: '13.8%',
      municipalRate: '8.5%',
      totalRate: '22.3%',
      description: 'International business hub with moderate rates',
      icon: Globe
    },
    {
      canton: 'Basel-City',
      corporateRate: '13.0%',
      municipalRate: '6.0%',
      totalRate: '19.0%',
      description: 'Lowest corporate tax rates in Switzerland',
      icon: Award
    },
    {
      canton: 'Bern',
      corporateRate: '21.6%',
      municipalRate: '8.0%',
      totalRate: '29.6%',
      description: 'Capital city with standard rates',
      icon: Building
    },
    {
      canton: 'Lucerne',
      corporateRate: '12.3%',
      municipalRate: '6.5%',
      totalRate: '18.8%',
      description: 'Attractive rates for business development',
      icon: Zap
    }
  ];

  const vatRates = [
    {
      rate: '7.7%',
      description: 'Standard VAT rate',
      applies: 'Most goods and services',
      examples: ['Retail sales', 'Professional services', 'Restaurant meals'],
      icon: CreditCard
    },
    {
      rate: '2.5%',
      description: 'Reduced VAT rate',
      applies: 'Essential goods and services',
      examples: ['Food and beverages', 'Books and newspapers', 'Public transport'],
      icon: Home
    },
    {
      rate: '3.7%',
      description: 'Special VAT rate',
      applies: 'Accommodation services',
      examples: ['Hotel stays', 'Holiday rentals', 'Conference facilities'],
      icon: Building
    },
    {
      rate: '0%',
      description: 'Zero-rated VAT',
      applies: 'Exports and certain services',
      examples: ['Export sales', 'International services', 'Medical services'],
      icon: Globe
    }
  ];

  const complianceRequirements = [
    {
      title: 'Corporate Tax Return',
      description: 'Annual corporate tax return filing requirements',
      deadline: 'March 31, 2025',
      frequency: 'Annual',
      requirements: [
        'Complete corporate tax return (Form 200)',
        'Attach audited financial statements',
        'Provide supporting documentation',
        'Submit to cantonal tax authorities'
      ],
      penalties: 'CHF 500-2,000 for late filing',
      icon: FileText
    },
    {
      title: 'VAT Return',
      description: 'Monthly or quarterly VAT return filing',
      deadline: 'End of following month',
      frequency: 'Monthly/Quarterly',
      requirements: [
        'Submit VAT return electronically',
        'Pay any VAT due',
        'Maintain detailed VAT records',
        'Keep invoices and receipts'
      ],
      penalties: 'CHF 50-200 for late filing',
      icon: Calculator
    },
    {
      title: 'Payroll Tax',
      description: 'Monthly payroll tax and social security contributions',
      deadline: 'End of following month',
      frequency: 'Monthly',
      requirements: [
        'Calculate and withhold payroll taxes',
        'Submit social security contributions',
        'File monthly payroll reports',
        'Maintain employee records'
      ],
      penalties: 'CHF 100-500 for late payment',
      icon: Users
    },
    {
      title: 'Financial Statements',
      description: 'Annual audited financial statements',
      deadline: '6 months after year-end',
      frequency: 'Annual',
      requirements: [
        'Prepare annual financial statements',
        'Obtain auditor certification',
        'File with commercial register',
        'Maintain accounting records'
      ],
      penalties: 'CHF 1,000-5,000 for non-compliance',
      icon: BarChart3
    }
  ];

  const taxPlanningStrategies = [
    {
      title: 'Corporate Structure Optimization',
      description: 'Choose optimal corporate structure for tax efficiency',
      benefits: [
        'Reduce effective tax rate',
        'Optimize dividend distribution',
        'Minimize compliance costs',
        'Maximize tax deductions'
      ],
      examples: [
        'Form holding company structure',
        'Optimize salary vs. dividend mix',
        'Plan international operations',
        'Consider group taxation'
      ],
      potentialSavings: 'CHF 10,000-50,000',
      icon: Building
    },
    {
      title: 'VAT Optimization',
      description: 'Optimize VAT position and cash flow',
      benefits: [
        'Improve cash flow management',
        'Reduce VAT compliance costs',
        'Optimize input VAT recovery',
        'Minimize VAT risks'
      ],
      examples: [
        'Optimize VAT registration timing',
        'Plan major purchases strategically',
        'Consider VAT grouping options',
        'Implement efficient VAT processes'
      ],
      potentialSavings: 'CHF 5,000-25,000',
      icon: Calculator
    },
    {
      title: 'International Tax Planning',
      description: 'Optimize international tax position',
      benefits: [
        'Minimize double taxation',
        'Optimize transfer pricing',
        'Reduce withholding taxes',
        'Plan international expansion'
      ],
      examples: [
        'Structure international operations',
        'Optimize transfer pricing policies',
        'Plan tax treaty benefits',
        'Consider holding company structures'
      ],
      potentialSavings: 'CHF 15,000-100,000',
      icon: Globe
    },
    {
      title: 'Payroll Tax Optimization',
      description: 'Optimize payroll tax and social security',
      benefits: [
        'Reduce payroll tax burden',
        'Optimize social security contributions',
        'Plan executive compensation',
        'Minimize compliance costs'
      ],
      examples: [
        'Optimize salary structures',
        'Plan bonus payments',
        'Consider equity compensation',
        'Optimize social security contributions'
      ],
      potentialSavings: 'CHF 3,000-15,000',
      icon: Users
    }
  ];

  const businessServices = [
    {
      title: 'Corporate Tax Compliance',
      description: 'Complete corporate tax return preparation and filing',
      price: 'CHF 1,500-5,000',
      features: [
        'Annual corporate tax return preparation',
        'Financial statement analysis',
        'Tax optimization recommendations',
        'Filing with tax authorities'
      ],
      icon: FileText
    },
    {
      title: 'VAT Compliance',
      description: 'VAT registration, returns, and compliance management',
      price: 'CHF 800-2,500',
      features: [
        'VAT registration and deregistration',
        'Monthly/quarterly VAT returns',
        'VAT audit support',
        'VAT optimization advice'
      ],
      icon: Calculator
    },
    {
      title: 'Payroll Tax Management',
      description: 'Complete payroll tax and social security management',
      price: 'CHF 1,200-3,000',
      features: [
        'Monthly payroll tax calculations',
        'Social security contributions',
        'Employee tax certificates',
        'Payroll tax optimization'
      ],
      icon: Users
    },
    {
      title: 'International Tax Services',
      description: 'Cross-border tax planning and compliance',
      price: 'CHF 2,500-10,000',
      features: [
        'International tax planning',
        'Transfer pricing documentation',
        'Tax treaty optimization',
        'Cross-border compliance'
      ],
      icon: Globe
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-steel-blue/10 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Swiss Business Tax System Overview</h3>
              <p className="text-lg text-gray-700 mb-6">
                Switzerland's business tax system is known for its competitiveness and efficiency. 
                Understanding the key components is essential for successful business operations.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4">
                    <Building className="h-8 w-8 text-steel-blue mx-auto" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Corporate Tax</h4>
                  <p className="text-sm text-gray-600">Federal, cantonal, and municipal rates</p>
                </div>
                <div className="text-center">
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4">
                    <Calculator className="h-8 w-8 text-steel-blue mx-auto" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">VAT</h4>
                  <p className="text-sm text-gray-600">Value-added tax compliance</p>
                </div>
                <div className="text-center">
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4">
                    <Users className="h-8 w-8 text-steel-blue mx-auto" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Payroll Tax</h4>
                  <p className="text-sm text-gray-600">Employee tax and social security</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'corporate':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Corporate Tax Rates by Canton</h3>
              <p className="text-lg text-gray-700">
                Swiss corporate tax rates vary significantly by canton. Choose the right location for your business.
              </p>
            </div>
            <div className="grid gap-8">
              {corporateTaxRates.map((canton, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-steel-blue/10 p-3 rounded-xl">
                      <canton.icon className="h-6 w-6 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{canton.canton}</h4>
                      <p className="text-gray-700 mb-4">{canton.description}</p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-steel-blue">{canton.corporateRate}</div>
                          <div className="text-sm text-gray-600">Corporate Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-steel-blue">{canton.municipalRate}</div>
                          <div className="text-sm text-gray-600">Municipal Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{canton.totalRate}</div>
                          <div className="text-sm text-gray-600">Total Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'vat':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Swiss VAT Rates</h3>
              <p className="text-lg text-gray-700">
                Understanding Swiss VAT rates is crucial for business compliance and pricing.
              </p>
            </div>
            <div className="grid gap-8">
              {vatRates.map((rate, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-steel-blue/10 p-3 rounded-xl">
                      <rate.icon className="h-6 w-6 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-gray-900">{rate.rate}</h4>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {rate.description}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">{rate.applies}</p>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Examples:</h5>
                        <ul className="space-y-1">
                          {rate.examples.map((example, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'payroll':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Payroll Tax & Social Security</h3>
              <p className="text-lg text-gray-700">
                Swiss payroll tax and social security system for employers and employees.
              </p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Social Security Contributions</h4>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-4">Employee Contributions</h5>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">AHV/IV/EO (Old Age & Survivors Insurance)</span>
                      <span className="font-semibold text-steel-blue">8.7%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Unemployment Insurance (ALV)</span>
                      <span className="font-semibold text-steel-blue">1.1%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Accident Insurance (UV)</span>
                      <span className="font-semibold text-steel-blue">0.5%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Non-occupational Accident Insurance</span>
                      <span className="font-semibold text-steel-blue">0.5%</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-4">Employer Contributions</h5>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">AHV/IV/EO (Old Age & Survivors Insurance)</span>
                      <span className="font-semibold text-steel-blue">8.7%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Unemployment Insurance (ALV)</span>
                      <span className="font-semibold text-steel-blue">1.1%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Accident Insurance (UV)</span>
                      <span className="font-semibold text-steel-blue">0.5%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Non-occupational Accident Insurance</span>
                      <span className="font-semibold text-steel-blue">0.5%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'international':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">International Tax Planning</h3>
              <p className="text-lg text-gray-700">
                Optimize your international tax position with Swiss tax treaties and planning strategies.
              </p>
            </div>
            <div className="grid gap-8">
              {taxPlanningStrategies.filter(s => s.title === 'International Tax Planning').map((strategy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-steel-blue/10 p-3 rounded-xl">
                      <strategy.icon className="h-6 w-6 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{strategy.title}</h4>
                      <p className="text-gray-700 mb-4">{strategy.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {strategy.potentialSavings} Savings
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Benefits</h5>
                      <ul className="space-y-2">
                        {strategy.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Examples</h5>
                      <ul className="space-y-2">
                        {strategy.examples.map((example, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'planning':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Tax Planning Strategies</h3>
              <p className="text-lg text-gray-700">
                Advanced tax planning strategies to optimize your business tax position.
              </p>
            </div>
            <div className="grid gap-8">
              {taxPlanningStrategies.map((strategy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-steel-blue/10 p-3 rounded-xl">
                      <strategy.icon className="h-6 w-6 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{strategy.title}</h4>
                      <p className="text-gray-700 mb-4">{strategy.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {strategy.potentialSavings} Savings
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Benefits</h5>
                      <ul className="space-y-2">
                        {strategy.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Examples</h5>
                      <ul className="space-y-2">
                        {strategy.examples.map((example, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Complete Business Tax Guide for Switzerland 2025 | Taxed GmbH</title>
        <meta name="description" content="Comprehensive business tax guide for Swiss companies. Learn about corporate tax, VAT, payroll tax, and international tax planning strategies." />
        <meta property="og:title" content="Complete Business Tax Guide for Switzerland 2025 | Taxed GmbH" />
        <meta property="og:description" content="Comprehensive business tax guide for Swiss companies. Learn about corporate tax, VAT, payroll tax, and international tax planning strategies." />
        <link rel="canonical" href="https://taxed.ch/business-tax-guide" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-steel-blue to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Complete Business Tax Guide for Switzerland
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Master Swiss business taxation with our comprehensive guide. From corporate tax to VAT compliance, 
              optimize your business tax position and maximize savings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                <Download className="inline-block mr-2 h-5 w-5" />
                Download Guide
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-steel-blue transition-colors">
                Get Business Tax Help
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Type Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {businessTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedBusinessType(type.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    selectedBusinessType === type.id
                      ? 'bg-steel-blue text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{type.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    activeSection === section.id
                      ? 'bg-steel-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{section.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </section>

      {/* Compliance Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Business Tax Compliance Requirements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay compliant with all Swiss business tax requirements and avoid penalties.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {complianceRequirements.map((requirement, index) => {
              const Icon = requirement.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-steel-blue/10 p-3 rounded-xl">
                      <Icon className="h-6 w-6 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{requirement.title}</h3>
                      <p className="text-gray-700 mb-4">{requirement.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                          Deadline: {requirement.deadline}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {requirement.frequency}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Requirements</h5>
                      <ul className="space-y-2">
                        {requirement.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-800 font-semibold">
                        <AlertTriangle className="inline-block h-4 w-4 mr-1" />
                        Penalties: {requirement.penalties}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Business Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Professional Business Tax Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let our experts handle your business tax compliance and optimization.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4 w-fit">
                    <Icon className="h-8 w-8 text-steel-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="text-xl font-bold text-steel-blue mb-4">{service.price}</div>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-steel-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-steel-blue/90 transition-colors">
                    Get Quote
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-steel-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Optimize Your Business Tax Position
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Our business tax experts can help you minimize your tax burden while ensuring full compliance. 
              Get personalized advice for your specific business situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                Get Business Tax Quote
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-steel-blue transition-colors">
                Schedule Business Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BusinessTaxGuidePage;
