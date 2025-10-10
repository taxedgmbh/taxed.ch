import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  TrendingUp, 
  Shield, 
  Clock, 
  Target,
  CheckCircle,
  AlertTriangle,
  Download,
  ArrowRight,
  Users,
  Building,
  Globe,
  CreditCard,
  Home,
  Briefcase,
  GraduationCap,
  Heart,
  FileText,
  PieChart,
  BarChart3,
  Lightbulb,
  BookOpen,
  PlayCircle
} from 'lucide-react';

const TaxPlanningGuidePage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  const sections = [
    { id: 'overview', name: 'Overview', icon: Target },
    { id: 'individual', name: 'Individual Planning', icon: Users },
    { id: 'business', name: 'Business Planning', icon: Building },
    { id: 'expat', name: 'Expat Planning', icon: Globe },
    { id: 'retirement', name: 'Retirement Planning', icon: GraduationCap },
    { id: 'investment', name: 'Investment Planning', icon: PieChart }
  ];

  const planningStrategies = [
    {
      id: 'income-timing',
      title: 'Income Timing Strategies',
      description: 'Optimize when you receive income to minimize tax burden',
      category: 'individual',
      difficulty: 'Medium',
      timeHorizon: '1-2 years',
      potentialSavings: 'CHF 1,000-5,000',
      icon: Clock,
      strategies: [
        'Defer income to lower tax years',
        'Accelerate deductible expenses',
        'Plan year-end bonuses strategically',
        'Consider installment payments'
      ],
      examples: [
        'Defer year-end bonus to January',
        'Prepay deductible expenses in December',
        'Time capital gains realization',
        'Optimize dividend payment timing'
      ],
      considerations: [
        'Cash flow requirements',
        'Future tax rate changes',
        'Alternative minimum tax implications',
        'Social security considerations'
      ]
    },
    {
      id: 'deduction-optimization',
      title: 'Deduction Optimization',
      description: 'Maximize allowable deductions to reduce taxable income',
      category: 'individual',
      difficulty: 'Easy',
      timeHorizon: 'Annual',
      potentialSavings: 'CHF 500-3,000',
      icon: Calculator,
      strategies: [
        'Track all business expenses',
        'Maximize home office deductions',
        'Optimize charitable contributions',
        'Plan medical expense timing'
      ],
      examples: [
        'Document business meals and travel',
        'Calculate home office percentage',
        'Bundle charitable donations',
        'Time medical procedures strategically'
      ],
      considerations: [
        'Documentation requirements',
        'Audit risk factors',
        'Alternative deduction methods',
        'Future deduction limitations'
      ]
    },
    {
      id: 'retirement-planning',
      title: 'Retirement Tax Planning',
      description: 'Optimize retirement savings for tax efficiency',
      category: 'retirement',
      difficulty: 'High',
      timeHorizon: '10+ years',
      potentialSavings: 'CHF 5,000-15,000',
      icon: GraduationCap,
      strategies: [
        'Maximize 3rd pillar contributions',
        'Optimize 2nd pillar withdrawals',
        'Plan Roth conversion strategies',
        'Consider foreign retirement accounts'
      ],
      examples: [
        'Contribute maximum to 3rd pillar',
        'Time 2nd pillar withdrawals',
        'Convert traditional to Roth accounts',
        'Evaluate foreign pension options'
      ],
      considerations: [
        'Long-term tax implications',
        'Retirement income needs',
        'Estate planning goals',
        'International tax treaties'
      ]
    },
    {
      id: 'investment-optimization',
      title: 'Investment Tax Optimization',
      description: 'Structure investments for maximum tax efficiency',
      category: 'investment',
      difficulty: 'High',
      timeHorizon: '5+ years',
      potentialSavings: 'CHF 2,000-10,000',
      icon: PieChart,
      strategies: [
        'Tax-loss harvesting',
        'Asset location optimization',
        'Dividend timing strategies',
        'Capital gains planning'
      ],
      examples: [
        'Harvest losses to offset gains',
        'Place bonds in tax-deferred accounts',
        'Time dividend payments',
        'Plan capital gains realization'
      ],
      considerations: [
        'Investment risk tolerance',
        'Market timing factors',
        'Rebalancing requirements',
        'Tax law changes'
      ]
    },
    {
      id: 'business-structure',
      title: 'Business Structure Optimization',
      description: 'Choose optimal business structure for tax efficiency',
      category: 'business',
      difficulty: 'Very High',
      timeHorizon: '3-5 years',
      potentialSavings: 'CHF 10,000-50,000',
      icon: Building,
      strategies: [
        'Evaluate corporate vs. partnership',
        'Optimize salary vs. dividend mix',
        'Plan international structures',
        'Consider holding company benefits'
      ],
      examples: [
        'Form Swiss corporation vs. GmbH',
        'Structure international operations',
        'Optimize executive compensation',
        'Plan business succession'
      ],
      considerations: [
        'Business growth plans',
        'International expansion',
        'Exit strategy goals',
        'Regulatory requirements'
      ]
    },
    {
      id: 'expat-planning',
      title: 'Expatriate Tax Planning',
      description: 'Optimize tax position for international assignments',
      category: 'expat',
      difficulty: 'Very High',
      timeHorizon: '2-5 years',
      potentialSavings: 'CHF 5,000-25,000',
      icon: Globe,
      strategies: [
        'Tax residency optimization',
        'Foreign tax credit planning',
        'Tax treaty benefits',
        'International income structuring'
      ],
      examples: [
        'Time residency changes',
        'Optimize foreign tax credits',
        'Structure international income',
        'Plan repatriation strategies'
      ],
      considerations: [
        'International tax treaties',
        'Foreign exchange implications',
        'Compliance requirements',
        'Exit tax considerations'
      ]
    }
  ];

  const planningTools = [
    {
      title: 'Tax Calculator',
      description: 'Calculate your potential tax savings with different strategies',
      icon: Calculator,
      features: [
        'Income tax calculations',
        'Deduction optimization',
        'Retirement planning',
        'Investment analysis'
      ]
    },
    {
      title: 'Planning Checklist',
      description: 'Step-by-step guide for tax planning implementation',
      icon: CheckCircle,
      features: [
        'Annual planning checklist',
        'Quarterly review points',
        'Deadline reminders',
        'Action items tracking'
      ]
    },
    {
      title: 'Strategy Templates',
      description: 'Pre-built templates for common tax planning strategies',
      icon: FileText,
      features: [
        'Income timing templates',
        'Deduction worksheets',
        'Retirement planning guides',
        'Investment analysis forms'
      ]
    },
    {
      title: 'Expert Consultation',
      description: 'One-on-one consultation with tax planning experts',
      icon: Users,
      features: [
        'Personalized strategy development',
        'Implementation guidance',
        'Ongoing support',
        'Regular reviews'
      ]
    }
  ];

  const planningTimeline = [
    {
      period: 'January - March',
      title: 'Annual Planning Review',
      description: 'Review previous year and plan for current year',
      tasks: [
        'Analyze previous year tax return',
        'Identify optimization opportunities',
        'Set tax planning goals',
        'Update financial projections'
      ],
      icon: BookOpen
    },
    {
      period: 'April - June',
      title: 'Mid-Year Review',
      description: 'Assess progress and adjust strategies',
      tasks: [
        'Review year-to-date income',
        'Evaluate deduction opportunities',
        'Adjust retirement contributions',
        'Plan investment moves'
      ],
      icon: TrendingUp
    },
    {
      period: 'July - September',
      title: 'Strategy Implementation',
      description: 'Implement planned tax strategies',
      tasks: [
        'Execute income timing strategies',
        'Maximize deductions',
        'Optimize investments',
        'Plan year-end moves'
      ],
      icon: Target
    },
    {
      period: 'October - December',
      title: 'Year-End Optimization',
      description: 'Final optimization before year-end',
      tasks: [
        'Harvest tax losses',
        'Maximize deductions',
        'Plan charitable giving',
        'Prepare for next year'
      ],
      icon: Clock
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-steel-blue/10 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tax Planning Overview</h3>
              <p className="text-lg text-gray-700 mb-6">
                Effective tax planning involves understanding your financial situation and implementing strategies 
                to minimize your tax burden while remaining compliant with Swiss tax law.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4">
                    <Target className="h-8 w-8 text-steel-blue mx-auto" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Strategic Planning</h4>
                  <p className="text-sm text-gray-600">Long-term tax optimization strategies</p>
                </div>
                <div className="text-center">
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4">
                    <Clock className="h-8 w-8 text-steel-blue mx-auto" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Timing Optimization</h4>
                  <p className="text-sm text-gray-600">Optimal timing of income and expenses</p>
                </div>
                <div className="text-center">
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4">
                    <Shield className="h-8 w-8 text-steel-blue mx-auto" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Compliance</h4>
                  <p className="text-sm text-gray-600">Full compliance with tax regulations</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'individual':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Individual Tax Planning</h3>
              <p className="text-lg text-gray-700">
                Strategies for individuals to optimize their tax position and maximize savings.
              </p>
            </div>
            <div className="grid gap-8">
              {planningStrategies.filter(s => s.category === 'individual').map((strategy, index) => (
                <motion.div
                  key={strategy.id}
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
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {strategy.difficulty} Difficulty
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {strategy.potentialSavings} Savings
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {strategy.timeHorizon}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Strategies</h5>
                      <ul className="space-y-2">
                        {strategy.strategies.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Examples</h5>
                      <ul className="space-y-2">
                        {strategy.examples.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
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

      case 'business':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Tax Planning</h3>
              <p className="text-lg text-gray-700">
                Advanced strategies for businesses to optimize their tax position and structure.
              </p>
            </div>
            <div className="grid gap-8">
              {planningStrategies.filter(s => s.category === 'business').map((strategy, index) => (
                <motion.div
                  key={strategy.id}
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
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {strategy.difficulty} Difficulty
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {strategy.potentialSavings} Savings
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {strategy.timeHorizon}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Strategies</h5>
                      <ul className="space-y-2">
                        {strategy.strategies.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Examples</h5>
                      <ul className="space-y-2">
                        {strategy.examples.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
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

      case 'expat':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expatriate Tax Planning</h3>
              <p className="text-lg text-gray-700">
                Specialized strategies for expatriates to optimize their international tax position.
              </p>
            </div>
            <div className="grid gap-8">
              {planningStrategies.filter(s => s.category === 'expat').map((strategy, index) => (
                <motion.div
                  key={strategy.id}
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
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {strategy.difficulty} Difficulty
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {strategy.potentialSavings} Savings
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {strategy.timeHorizon}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Strategies</h5>
                      <ul className="space-y-2">
                        {strategy.strategies.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Examples</h5>
                      <ul className="space-y-2">
                        {strategy.examples.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
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

      case 'retirement':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Retirement Tax Planning</h3>
              <p className="text-lg text-gray-700">
                Strategies to optimize your retirement savings and minimize taxes in retirement.
              </p>
            </div>
            <div className="grid gap-8">
              {planningStrategies.filter(s => s.category === 'retirement').map((strategy, index) => (
                <motion.div
                  key={strategy.id}
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
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {strategy.difficulty} Difficulty
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {strategy.potentialSavings} Savings
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {strategy.timeHorizon}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Strategies</h5>
                      <ul className="space-y-2">
                        {strategy.strategies.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Examples</h5>
                      <ul className="space-y-2">
                        {strategy.examples.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
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

      case 'investment':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Investment Tax Planning</h3>
              <p className="text-lg text-gray-700">
                Strategies to optimize your investment portfolio for tax efficiency.
              </p>
            </div>
            <div className="grid gap-8">
              {planningStrategies.filter(s => s.category === 'investment').map((strategy, index) => (
                <motion.div
                  key={strategy.id}
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
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {strategy.difficulty} Difficulty
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {strategy.potentialSavings} Savings
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {strategy.timeHorizon}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Strategies</h5>
                      <ul className="space-y-2">
                        {strategy.strategies.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Examples</h5>
                      <ul className="space-y-2">
                        {strategy.examples.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
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
        <title>Comprehensive Tax Planning Guide 2025 | Taxed GmbH</title>
        <meta name="description" content="Master Swiss tax planning with our comprehensive guide. Learn strategies for individuals, businesses, expats, and retirement planning to minimize your tax burden." />
        <meta property="og:title" content="Comprehensive Tax Planning Guide 2025 | Taxed GmbH" />
        <meta property="og:description" content="Master Swiss tax planning with our comprehensive guide. Learn strategies for individuals, businesses, expats, and retirement planning to minimize your tax burden." />
        <link rel="canonical" href="https://taxed.ch/tax-planning-guide" />
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
              Comprehensive Tax Planning Guide
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Master Swiss tax planning with proven strategies for individuals, businesses, and expatriates. 
              Minimize your tax burden while maximizing your financial potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                <Download className="inline-block mr-2 h-5 w-5" />
                Download Guide
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-steel-blue transition-colors">
                <PlayCircle className="inline-block mr-2 h-5 w-5" />
                Watch Tutorial
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Planning Tools Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Tax Planning Tools & Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access professional tools and resources to implement effective tax planning strategies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {planningTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4 w-fit">
                    <Icon className="h-8 w-8 text-steel-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.title}</h3>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <ul className="space-y-2">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
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

      {/* Planning Timeline */}
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
              Annual Tax Planning Timeline
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow our structured approach to tax planning throughout the year for maximum effectiveness.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {planningTimeline.map((period, index) => {
              const Icon = period.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4 w-fit">
                    <Icon className="h-8 w-8 text-steel-blue" />
                  </div>
                  <div className="text-sm font-semibold text-steel-blue mb-2">{period.period}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{period.title}</h3>
                  <p className="text-gray-600 mb-4">{period.description}</p>
                  <ul className="space-y-2">
                    {period.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
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
              Ready to Optimize Your Tax Strategy?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Our tax planning experts can help you implement these strategies and save thousands of francs. 
              Get personalized advice tailored to your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                Get Personalized Tax Plan
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-steel-blue transition-colors">
                Schedule Planning Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TaxPlanningGuidePage;
