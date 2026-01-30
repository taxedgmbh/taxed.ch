import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Shield, 
  Calculator, 
  Clock, 
  Target,
  CheckCircle,
  AlertTriangle,
  Download,
  ArrowRight,
  Users,
  Building,
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
  Zap,
  MapPin,
  Plane,
  Banknote
} from 'lucide-react';

const InternationalTaxPage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedCountry, setSelectedCountry] = useState('all');

  const sections = [
    { id: 'overview', name: 'Overview', icon: Target },
    { id: 'treaties', name: 'Tax Treaties', icon: Globe },
    { id: 'residency', name: 'Tax Residency', icon: Home },
    { id: 'withholding', name: 'Withholding Tax', icon: CreditCard },
    { id: 'transfer', name: 'Transfer Pricing', icon: BarChart3 },
    { id: 'planning', name: 'Tax Planning', icon: PieChart }
  ];

  const countries = [
    { id: 'all', name: 'All Countries', icon: Globe },
    { id: 'us', name: 'United States', icon: MapPin },
    { id: 'uk', name: 'United Kingdom', icon: MapPin },
    { id: 'de', name: 'Germany', icon: MapPin },
    { id: 'fr', name: 'France', icon: MapPin },
    { id: 'it', name: 'Italy', icon: MapPin }
  ];

  const taxTreaties = [
    {
      country: 'United States',
      flag: '🇺🇸',
      treaty: 'US-Switzerland Tax Treaty',
      effectiveDate: '1997',
      keyBenefits: [
        'Eliminates double taxation on income',
        'Reduced withholding tax on dividends (5-15%)',
        'Reduced withholding tax on interest (0-10%)',
        'Special rules for pensions and social security',
        'Exchange of information provisions'
      ],
      withholdingRates: {
        dividends: '5-15%',
        interest: '0-10%',
        royalties: '0-5%',
        pensions: '0-15%'
      },
      icon: Globe
    },
    {
      country: 'United Kingdom',
      flag: '🇬🇧',
      treaty: 'UK-Switzerland Tax Treaty',
      effectiveDate: '2018',
      keyBenefits: [
        'Eliminates double taxation on income',
        'Reduced withholding tax on dividends (5-15%)',
        'Reduced withholding tax on interest (0-10%)',
        'Special rules for pensions and social security',
        'Exchange of information provisions'
      ],
      withholdingRates: {
        dividends: '5-15%',
        interest: '0-10%',
        royalties: '0-5%',
        pensions: '0-15%'
      },
      icon: Globe
    },
    {
      country: 'Germany',
      flag: '🇩🇪',
      treaty: 'Germany-Switzerland Tax Treaty',
      effectiveDate: '2012',
      keyBenefits: [
        'Eliminates double taxation on income',
        'Reduced withholding tax on dividends (5-15%)',
        'Reduced withholding tax on interest (0-10%)',
        'Special rules for pensions and social security',
        'Exchange of information provisions'
      ],
      withholdingRates: {
        dividends: '5-15%',
        interest: '0-10%',
        royalties: '0-5%',
        pensions: '0-15%'
      },
      icon: Globe
    },
    {
      country: 'France',
      flag: '🇫🇷',
      treaty: 'France-Switzerland Tax Treaty',
      effectiveDate: '1966',
      keyBenefits: [
        'Eliminates double taxation on income',
        'Reduced withholding tax on dividends (5-15%)',
        'Reduced withholding tax on interest (0-10%)',
        'Special rules for pensions and social security',
        'Exchange of information provisions'
      ],
      withholdingRates: {
        dividends: '5-15%',
        interest: '0-10%',
        royalties: '0-5%',
        pensions: '0-15%'
      },
      icon: Globe
    }
  ];

  const residencyRules = [
    {
      title: 'Physical Presence Test',
      description: 'You are considered a Swiss tax resident if you spend more than 90 days in Switzerland',
      details: [
        'Count all days spent in Switzerland during the tax year',
        'Include partial days (arrival and departure days count)',
        'Business trips and vacation days both count',
        'Exception: Days spent in Switzerland for medical treatment may not count'
      ],
      icon: Clock
    },
    {
      title: 'Center of Vital Interests',
      description: 'Your center of vital interests is in Switzerland if your family, work, or main activities are here',
      details: [
        'Family residence and dependents in Switzerland',
        'Primary employment or business activities in Switzerland',
        'Main bank accounts and financial interests in Switzerland',
        'Social and cultural ties to Switzerland'
      ],
      icon: Heart
    },
    {
      title: 'Domicile Test',
      description: 'You have a permanent home in Switzerland available for your use',
      details: [
        'Own or rent a permanent residence in Switzerland',
        'Residence must be available for your use throughout the year',
        'Temporary absence (e.g., business travel) does not break domicile',
        'Shared ownership or rental arrangements may qualify'
      ],
      icon: Home
    }
  ];

  const withholdingTaxRates = [
    {
      incomeType: 'Dividends',
      swissRate: '35%',
      treatyRate: '5-15%',
      description: 'Dividend payments from Swiss companies to foreign shareholders',
      requirements: [
        'Tax treaty benefits must be claimed',
        'Proper documentation required',
        'Residency certificate needed',
        'Form 8233 (US) or equivalent required'
      ],
      icon: CreditCard
    },
    {
      incomeType: 'Interest',
      swissRate: '35%',
      treatyRate: '0-10%',
      description: 'Interest payments from Swiss sources to foreign recipients',
      requirements: [
        'Tax treaty benefits must be claimed',
        'Proper documentation required',
        'Residency certificate needed',
        'Form 8233 (US) or equivalent required'
      ],
      icon: Banknote
    },
    {
      incomeType: 'Royalties',
      swissRate: '35%',
      treatyRate: '0-5%',
      description: 'Royalty payments for intellectual property',
      requirements: [
        'Tax treaty benefits must be claimed',
        'Proper documentation required',
        'Residency certificate needed',
        'Form 8233 (US) or equivalent required'
      ],
      icon: FileText
    },
    {
      incomeType: 'Pensions',
      swissRate: '35%',
      treatyRate: '0-15%',
      description: 'Pension payments from Swiss sources',
      requirements: [
        'Tax treaty benefits must be claimed',
        'Proper documentation required',
        'Residency certificate needed',
        'Form 8233 (US) or equivalent required'
      ],
      icon: GraduationCap
    }
  ];

  const transferPricingRules = [
    {
      title: 'Arm\'s Length Principle',
      description: 'Transactions between related parties must be at arm\'s length',
      methods: [
        'Comparable Uncontrolled Price (CUP)',
        'Resale Price Method',
        'Cost Plus Method',
        'Transactional Net Margin Method (TNMM)',
        'Profit Split Method'
      ],
      documentation: [
        'Transfer pricing documentation required',
        'Country-by-country reporting',
        'Master file and local file',
        'Annual compliance requirements'
      ],
      icon: BarChart3
    },
    {
      title: 'Documentation Requirements',
      description: 'Comprehensive documentation of transfer pricing policies',
      methods: [
        'Functional analysis',
        'Economic analysis',
        'Comparability analysis',
        'Transfer pricing policy documentation'
      ],
      documentation: [
        'Master file documentation',
        'Local file documentation',
        'Country-by-country reporting',
        'Annual compliance requirements'
      ],
      icon: FileText
    }
  ];

  const taxPlanningStrategies = [
    {
      title: 'Tax Residency Optimization',
      description: 'Optimize your tax residency status for maximum tax efficiency',
      benefits: [
        'Minimize tax burden',
        'Avoid double taxation',
        'Optimize tax treaty benefits',
        'Plan international moves'
      ],
      examples: [
        'Time residency changes strategically',
        'Plan international assignments',
        'Optimize tax treaty benefits',
        'Consider holding company structures'
      ],
      potentialSavings: 'CHF 10,000-100,000',
      icon: Home
    },
    {
      title: 'Withholding Tax Optimization',
      description: 'Minimize withholding taxes through proper planning',
      benefits: [
        'Reduce withholding tax burden',
        'Optimize tax treaty benefits',
        'Improve cash flow',
        'Minimize compliance costs'
      ],
      examples: [
        'Claim tax treaty benefits',
        'Structure payments efficiently',
        'Plan dividend distributions',
        'Optimize interest payments'
      ],
      potentialSavings: 'CHF 5,000-50,000',
      icon: CreditCard
    },
    {
      title: 'Transfer Pricing Optimization',
      description: 'Optimize transfer pricing for international operations',
      benefits: [
        'Minimize tax burden',
        'Optimize profit allocation',
        'Reduce compliance costs',
        'Improve cash flow'
      ],
      examples: [
        'Optimize transfer pricing policies',
        'Plan profit allocation',
        'Consider cost sharing arrangements',
        'Optimize intellectual property structures'
      ],
      potentialSavings: 'CHF 20,000-200,000',
      icon: BarChart3
    },
    {
      title: 'International Tax Structures',
      description: 'Optimize international tax structures for efficiency',
      benefits: [
        'Minimize overall tax burden',
        'Optimize cash flow',
        'Reduce compliance costs',
        'Improve tax efficiency'
      ],
      examples: [
        'Holding company structures',
        'Financing company structures',
        'Trading company structures',
        'Intellectual property structures'
      ],
      potentialSavings: 'CHF 50,000-500,000',
      icon: Building
    }
  ];

  const internationalServices = [
    {
      title: 'Tax Treaty Optimization',
      description: 'Optimize tax treaty benefits for international operations',
      price: 'CHF 2,500-10,000',
      features: [
        'Tax treaty analysis and optimization',
        'Withholding tax minimization',
        'Double taxation relief',
        'Compliance documentation'
      ],
      icon: Globe
    },
    {
      title: 'Transfer Pricing Services',
      description: 'Complete transfer pricing documentation and compliance',
      price: 'CHF 5,000-25,000',
      features: [
        'Transfer pricing documentation',
        'Country-by-country reporting',
        'Transfer pricing audits',
        'Compliance management'
      ],
      icon: BarChart3
    },
    {
      title: 'International Tax Planning',
      description: 'Strategic international tax planning and optimization',
      price: 'CHF 3,000-15,000',
      features: [
        'International tax planning',
        'Tax structure optimization',
        'Cross-border transactions',
        'Tax efficiency analysis'
      ],
      icon: PieChart
    },
    {
      title: 'Expatriate Tax Services',
      description: 'Comprehensive expatriate tax services and compliance',
      price: 'CHF 1,500-8,000',
      features: [
        'Expatriate tax planning',
        'Tax residency optimization',
        'International compliance',
        'Tax return preparation'
      ],
      icon: Users
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-steel-blue/10 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">International Tax Overview</h3>
              <p className="text-lg text-gray-700 mb-6">
                Switzerland has tax treaties with over 100 countries to prevent double taxation and promote international business. 
                Understanding these treaties is crucial for international tax planning.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4">
                    <Globe className="h-8 w-8 text-steel-blue mx-auto" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Tax Treaties</h4>
                  <p className="text-sm text-gray-600">100+ countries with tax treaties</p>
                </div>
                <div className="text-center">
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4">
                    <Shield className="h-8 w-8 text-steel-blue mx-auto" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Double Taxation</h4>
                  <p className="text-sm text-gray-600">Elimination of double taxation</p>
                </div>
                <div className="text-center">
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4">
                    <Calculator className="h-8 w-8 text-steel-blue mx-auto" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Withholding Tax</h4>
                  <p className="text-sm text-gray-600">Reduced withholding tax rates</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'treaties':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Swiss Tax Treaties</h3>
              <p className="text-lg text-gray-700">
                Switzerland has comprehensive tax treaties with major countries to prevent double taxation.
              </p>
            </div>
            <div className="grid gap-8">
              {taxTreaties.map((treaty, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="text-4xl">{treaty.flag}</div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{treaty.country}</h4>
                      <p className="text-gray-700 mb-2">{treaty.treaty}</p>
                      <p className="text-sm text-gray-600 mb-4">Effective: {treaty.effectiveDate}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Key Benefits</h5>
                      <ul className="space-y-2">
                        {treaty.keyBenefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Withholding Rates</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Dividends:</span>
                          <span className="font-semibold text-steel-blue">{treaty.withholdingRates.dividends}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Interest:</span>
                          <span className="font-semibold text-steel-blue">{treaty.withholdingRates.interest}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Royalties:</span>
                          <span className="font-semibold text-steel-blue">{treaty.withholdingRates.royalties}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Pensions:</span>
                          <span className="font-semibold text-steel-blue">{treaty.withholdingRates.pensions}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'residency':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tax Residency Rules</h3>
              <p className="text-lg text-gray-700">
                Understanding Swiss tax residency rules is crucial for international tax planning.
              </p>
            </div>
            <div className="grid gap-8">
              {residencyRules.map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-steel-blue/10 p-3 rounded-xl">
                      <rule.icon className="h-6 w-6 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{rule.title}</h4>
                      <p className="text-gray-700 mb-4">{rule.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {rule.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'withholding':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Withholding Tax Rates</h3>
              <p className="text-lg text-gray-700">
                Swiss withholding tax rates and how to minimize them through tax treaties.
              </p>
            </div>
            <div className="grid gap-8">
              {withholdingTaxRates.map((rate, index) => (
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
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{rate.incomeType}</h4>
                      <p className="text-gray-700 mb-4">{rate.description}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">{rate.swissRate}</div>
                          <div className="text-sm text-gray-600">Swiss Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{rate.treatyRate}</div>
                          <div className="text-sm text-gray-600">Treaty Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Requirements for Treaty Benefits</h5>
                    <ul className="space-y-2">
                      {rate.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'transfer':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Transfer Pricing Rules</h3>
              <p className="text-lg text-gray-700">
                Swiss transfer pricing rules and documentation requirements for related party transactions.
              </p>
            </div>
            <div className="grid gap-8">
              {transferPricingRules.map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-steel-blue/10 p-3 rounded-xl">
                      <rule.icon className="h-6 w-6 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{rule.title}</h4>
                      <p className="text-gray-700 mb-4">{rule.description}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Methods</h5>
                      <ul className="space-y-2">
                        {rule.methods.map((method, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{method}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Documentation</h5>
                      <ul className="space-y-2">
                        {rule.documentation.map((doc, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <FileText className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>{doc}</span>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">International Tax Planning</h3>
              <p className="text-lg text-gray-700">
                Strategic international tax planning to optimize your tax position.
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
        <title>International Tax Services & Cross-Border Tax Planning | Taxed GmbH</title>
        <meta name="description" content="Expert international tax services for cross-border transactions. Tax treaties, withholding tax optimization, transfer pricing, and international tax planning." />
        <meta property="og:title" content="International Tax Services & Cross-Border Tax Planning | Taxed GmbH" />
        <meta property="og:description" content="Expert international tax services for cross-border transactions. Tax treaties, withholding tax optimization, transfer pricing, and international tax planning." />
        <link rel="canonical" href="https://taxed.ch/international-tax" />
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
              International Tax Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Expert cross-border tax services for international businesses and expatriates. 
              Optimize your international tax position with our specialized expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                <Download className="inline-block mr-2 h-5 w-5" />
                Download Guide
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-steel-blue transition-colors">
                Get International Tax Help
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Country Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {countries.map((country) => {
              const Icon = country.icon;
              return (
                <button
                  key={country.id}
                  onClick={() => setSelectedCountry(country.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    selectedCountry === country.id
                      ? 'bg-steel-blue text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{country.name}</span>
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

      {/* International Services */}
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
              International Tax Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive international tax services for cross-border transactions and compliance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {internationalServices.map((service, index) => {
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
              Optimize Your International Tax Position
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Our international tax experts can help you minimize your tax burden while ensuring full compliance. 
              Get personalized advice for your specific international tax situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                Get International Tax Quote
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-steel-blue transition-colors">
                Schedule International Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default InternationalTaxPage;
