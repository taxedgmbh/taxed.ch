import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Users, 
  Building, 
  Home, 
  CreditCard, 
  Heart, 
  Briefcase, 
  Car, 
  BookOpen, 
  GraduationCap, 
  ShoppingCart, 
  Phone, 
  Wifi, 
  Utensils, 
  Shirt, 
  Gamepad2, 
  Plane, 
  Camera, 
  Music, 
  Paintbrush, 
  Dumbbell, 
  Stethoscope, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Download, 
  ExternalLink,
  PieChart,
  BarChart3,
  Target,
  Award,
  Clock,
  Calendar,
  MapPin,
  Globe,
  Lock,
  Eye,
  Search,
  Filter,
  Plus,
  Minus,
  Edit,
  Save,
  Trash2,
  Copy,
  Share2,
  Star,
  Bookmark,
  Flag,
  Bell,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  RefreshCw,
  Zap,
  Lightbulb,
  Target as TargetIcon,
  TrendingUp as TrendingUpIcon,
  BarChart3 as BarChart3Icon,
  PieChart as PieChartIcon
} from 'lucide-react';

const TaxReturnExplainedPage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedIncomeType, setSelectedIncomeType] = useState(null);
  const [selectedDeductionType, setSelectedDeductionType] = useState(null);

  const sections = [
    { id: 'overview', name: 'Overview', icon: FileText },
    { id: 'income', name: 'Income', icon: DollarSign },
    { id: 'wealth', name: 'Wealth', icon: TrendingUp },
    { id: 'deductions', name: 'Deductions', icon: Calculator },
    { id: 'calculation', name: 'Calculation', icon: BarChart3 },
    { id: 'deadlines', name: 'Deadlines', icon: Calendar }
  ];

  const incomeTypes = [
    {
      id: 'employment',
      name: 'Employment Income',
      icon: Briefcase,
      description: 'Salary, wages, bonuses, and other employment-related income',
      examples: [
        'Gross salary from employment',
        'Bonuses and commissions',
        'Overtime payments',
        'Benefits in kind',
        'Stock options',
        'Severance payments'
      ],
      taxTreatment: 'Fully taxable at progressive rates',
      color: 'bg-blue-500'
    },
    {
      id: 'business',
      name: 'Business Income',
      icon: Building,
      description: 'Income from self-employment, business activities, and professional services',
      examples: [
        'Self-employment income',
        'Business profits',
        'Professional fees',
        'Consulting income',
        'Freelance work',
        'Partnership income'
      ],
      taxTreatment: 'Taxable after business expenses',
      color: 'bg-green-500'
    },
    {
      id: 'investment',
      name: 'Investment Income',
      icon: TrendingUp,
      description: 'Income from investments, dividends, interest, and capital gains',
      examples: [
        'Dividend income',
        'Interest from bank accounts',
        'Capital gains from securities',
        'Rental income',
        'Royalties',
        'Annuities'
      ],
      taxTreatment: 'Various rates depending on type',
      color: 'bg-purple-500'
    },
    {
      id: 'pension',
      name: 'Pension Income',
      icon: Heart,
      description: 'Retirement benefits, pensions, and social security payments',
      examples: [
        'AHV pension',
        'BVG pension',
        'Private pension',
        'Disability benefits',
        'Survivor benefits',
        'Early retirement benefits'
      ],
      taxTreatment: 'Generally taxable',
      color: 'bg-red-500'
    }
  ];

  const deductionCategories = [
    {
      id: 'professional',
      name: 'Professional Expenses',
      icon: Briefcase,
      description: 'Work-related expenses that can be deducted',
      maxAmount: 'CHF 2,000',
      examples: [
        'Professional training and education',
        'Work-related travel expenses',
        'Professional literature and subscriptions',
        'Work equipment and tools',
        'Professional association fees',
        'Work-related phone and internet'
      ],
      color: 'bg-blue-100',
      textColor: 'text-blue-800'
    },
    {
      id: 'social',
      name: 'Social Security',
      icon: Shield,
      description: 'Social security contributions and insurance premiums',
      maxAmount: 'Unlimited',
      examples: [
        'AHV contributions',
        'BVG contributions',
        'Health insurance premiums',
        'Accident insurance',
        'Disability insurance',
        'Unemployment insurance'
      ],
      color: 'bg-green-100',
      textColor: 'text-green-800'
    },
    {
      id: 'family',
      name: 'Family Expenses',
      icon: Users,
      description: 'Family-related expenses and childcare costs',
      maxAmount: 'CHF 10,000 per child',
      examples: [
        'Childcare expenses',
        'School fees',
        'Educational materials',
        'Family health insurance',
        'Child support payments',
        'Adoption expenses'
      ],
      color: 'bg-purple-100',
      textColor: 'text-purple-800'
    },
    {
      id: 'housing',
      name: 'Housing Costs',
      icon: Home,
      description: 'Housing-related expenses and mortgage interest',
      maxAmount: 'Varies by canton',
      examples: [
        'Mortgage interest',
        'Property maintenance',
        'Home insurance',
        'Property taxes',
        'Rent (in some cases)',
        'Home office expenses'
      ],
      color: 'bg-orange-100',
      textColor: 'text-orange-800'
    },
    {
      id: 'charitable',
      name: 'Charitable Donations',
      icon: Heart,
      description: 'Donations to charitable organizations and causes',
      maxAmount: '20% of income',
      examples: [
        'Charitable donations',
        'Religious contributions',
        'Cultural donations',
        'Educational donations',
        'Medical research donations',
        'Environmental donations'
      ],
      color: 'bg-red-100',
      textColor: 'text-red-800'
    }
  ];

  const taxCalculationSteps = [
    {
      step: 1,
      title: 'Total Income',
      description: 'Sum of all income sources',
      amount: 'CHF 120,000',
      color: 'bg-blue-500'
    },
    {
      step: 2,
      title: 'Total Deductions',
      description: 'Sum of all allowable deductions',
      amount: 'CHF 15,000',
      color: 'bg-green-500'
    },
    {
      step: 3,
      title: 'Taxable Income',
      description: 'Income minus deductions',
      amount: 'CHF 105,000',
      color: 'bg-purple-500'
    },
    {
      step: 4,
      title: 'Federal Tax',
      description: 'Progressive federal tax calculation',
      amount: 'CHF 8,500',
      color: 'bg-red-500'
    },
    {
      step: 5,
      title: 'Cantonal Tax',
      description: 'Cantonal tax (varies by location)',
      amount: 'CHF 12,000',
      color: 'bg-yellow-500'
    },
    {
      step: 6,
      title: 'Municipal Tax',
      description: 'Municipal tax (varies by municipality)',
      amount: 'CHF 3,000',
      color: 'bg-indigo-500'
    },
    {
      step: 7,
      title: 'Total Tax',
      description: 'Sum of all taxes',
      amount: 'CHF 23,500',
      color: 'bg-gray-800'
    }
  ];

  const deadlines = [
    {
      date: 'March 31',
      description: 'Tax return filing deadline',
      importance: 'High',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      date: 'April 30',
      description: 'Extension request deadline',
      importance: 'Medium',
      icon: Clock,
      color: 'text-yellow-600'
    },
    {
      date: 'June 30',
      description: 'Final deadline with penalty',
      importance: 'High',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      date: 'December 31',
      description: 'Tax year end',
      importance: 'Low',
      icon: Calendar,
      color: 'text-gray-600'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Swiss Tax Return Explained - Complete Guide | Taxed GmbH</title>
        <meta name="description" content="Comprehensive guide to Swiss tax returns. Learn about income, wealth, deductions, and tax calculation with visual examples and step-by-step explanations." />
        <meta property="og:title" content="Swiss Tax Return Explained - Complete Guide | Taxed GmbH" />
        <meta property="og:description" content="Comprehensive guide to Swiss tax returns. Learn about income, wealth, deductions, and tax calculation with visual examples and step-by-step explanations." />
        <link rel="canonical" href="https://taxed.ch/tax-return-explained" />
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
              Swiss Tax Return Explained
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Complete visual guide to understanding Swiss tax returns. 
              Learn about income, wealth, deductions, and tax calculation with interactive examples.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                <Download className="inline-block mr-2 h-5 w-5" />
                Download Guide
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-steel-blue transition-colors">
                <Calculator className="inline-block mr-2 h-5 w-5" />
                Tax Calculator
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    activeSection === section.id
                      ? 'bg-steel-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{section.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Swiss Tax Return Overview
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understanding the fundamental principles of Swiss tax returns
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Income Declaration',
                  description: 'All sources of income must be declared',
                  icon: DollarSign,
                  color: 'bg-blue-500',
                  details: ['Employment income', 'Business income', 'Investment income', 'Pension income']
                },
                {
                  title: 'Wealth Declaration',
                  description: 'Assets and liabilities must be reported',
                  icon: TrendingUp,
                  color: 'bg-green-500',
                  details: ['Real estate', 'Bank accounts', 'Investments', 'Personal property']
                },
                {
                  title: 'Deductions',
                  description: 'Allowable expenses reduce taxable income',
                  icon: Calculator,
                  color: 'bg-purple-500',
                  details: ['Professional expenses', 'Social security', 'Family costs', 'Charitable donations']
                },
                {
                  title: 'Tax Calculation',
                  description: 'Progressive tax rates apply to taxable income',
                  icon: BarChart3,
                  color: 'bg-red-500',
                  details: ['Federal tax', 'Cantonal tax', 'Municipal tax', 'Total tax liability']
                },
                {
                  title: 'Filing Deadline',
                  description: 'Tax returns must be filed by March 31',
                  icon: Calendar,
                  color: 'bg-yellow-500',
                  details: ['Annual deadline', 'Extension possible', 'Penalties for late filing', 'Electronic filing available']
                },
                {
                  title: 'Compliance',
                  description: 'Accurate reporting is legally required',
                  icon: Shield,
                  color: 'bg-indigo-500',
                  details: ['Legal obligation', 'Penalties for non-compliance', 'Audit risk', 'Professional assistance recommended']
                }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className={`${item.color} p-4 rounded-xl mb-6 w-fit`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 mb-6">{item.description}</p>
                    <ul className="space-y-2">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Income Section */}
      {activeSection === 'income' && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Income Sources
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                All income must be declared on your Swiss tax return
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {incomeTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                      selectedIncomeType === type.id ? 'border-steel-blue ring-2 ring-steel-blue' : ''
                    }`}
                    onClick={() => setSelectedIncomeType(selectedIncomeType === type.id ? null : type.id)}
                  >
                    <div className="flex items-start space-x-4 mb-6">
                      <div className={`${type.color} p-3 rounded-xl`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{type.name}</h3>
                        <p className="text-gray-600 mb-4">{type.description}</p>
                        <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700">
                          {type.taxTreatment}
                        </div>
                      </div>
                    </div>

                    {selectedIncomeType === type.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="border-t pt-6"
                      >
                        <h4 className="font-semibold text-gray-900 mb-3">Examples:</h4>
                        <ul className="space-y-2">
                          {type.examples.map((example, idx) => (
                            <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>{example}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Income Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Income Distribution Example</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { name: 'Employment', amount: 'CHF 80,000', percentage: 67, color: 'bg-blue-500' },
                  { name: 'Business', amount: 'CHF 20,000', percentage: 17, color: 'bg-green-500' },
                  { name: 'Investment', amount: 'CHF 15,000', percentage: 12, color: 'bg-purple-500' },
                  { name: 'Pension', amount: 'CHF 5,000', percentage: 4, color: 'bg-red-500' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <div className={`${item.color} rounded-full w-full h-full flex items-center justify-center text-white font-bold text-lg`}>
                        {item.percentage}%
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.amount}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Wealth Section */}
      {activeSection === 'wealth' && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Wealth Declaration
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Assets and liabilities must be reported for wealth tax calculation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Real Estate',
                  icon: Home,
                  color: 'bg-blue-500',
                  items: ['Primary residence', 'Investment properties', 'Vacation homes', 'Commercial real estate'],
                  taxRate: '0.3-1.0% per year'
                },
                {
                  title: 'Financial Assets',
                  icon: TrendingUp,
                  color: 'bg-green-500',
                  items: ['Bank accounts', 'Stocks and bonds', 'Investment funds', 'Cryptocurrency'],
                  taxRate: '0.3-1.0% per year'
                },
                {
                  title: 'Personal Property',
                  icon: Car,
                  color: 'bg-purple-500',
                  items: ['Vehicles', 'Jewelry', 'Art and antiques', 'Collectibles'],
                  taxRate: '0.3-1.0% per year'
                },
                {
                  title: 'Business Assets',
                  icon: Building,
                  color: 'bg-red-500',
                  items: ['Business equipment', 'Inventory', 'Intellectual property', 'Goodwill'],
                  taxRate: '0.3-1.0% per year'
                },
                {
                  title: 'Pension Assets',
                  icon: Heart,
                  color: 'bg-yellow-500',
                  items: ['BVG assets', 'Private pension', 'Life insurance', 'Annuities'],
                  taxRate: '0.3-1.0% per year'
                },
                {
                  title: 'Liabilities',
                  icon: CreditCard,
                  color: 'bg-gray-500',
                  items: ['Mortgages', 'Personal loans', 'Credit card debt', 'Business loans'],
                  taxRate: 'Deductible from assets'
                }
              ].map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`${category.color} p-3 rounded-xl`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                        <p className="text-sm text-gray-600">{category.taxRate}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Deductions Section */}
      {activeSection === 'deductions' && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Tax Deductions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Allowable expenses that reduce your taxable income
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {deductionCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                      selectedDeductionType === category.id ? 'border-steel-blue ring-2 ring-steel-blue' : ''
                    }`}
                    onClick={() => setSelectedDeductionType(selectedDeductionType === category.id ? null : category.id)}
                  >
                    <div className="flex items-start space-x-4 mb-6">
                      <div className={`${category.color} p-3 rounded-xl`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                        <p className="text-gray-600 mb-4">{category.description}</p>
                        <div className={`${category.color} ${category.textColor} px-3 py-2 rounded-lg text-sm font-semibold`}>
                          Max: {category.maxAmount}
                        </div>
                      </div>
                    </div>

                    {selectedDeductionType === category.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="border-t pt-6"
                      >
                        <h4 className="font-semibold text-gray-900 mb-3">Examples:</h4>
                        <ul className="space-y-2">
                          {category.examples.map((example, idx) => (
                            <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>{example}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Deduction Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Deduction Breakdown Example</h3>
              <div className="grid md:grid-cols-5 gap-6">
                {[
                  { name: 'Professional', amount: 'CHF 2,000', color: 'bg-blue-500' },
                  { name: 'Social Security', amount: 'CHF 8,000', color: 'bg-green-500' },
                  { name: 'Family', amount: 'CHF 3,000', color: 'bg-purple-500' },
                  { name: 'Housing', amount: 'CHF 1,500', color: 'bg-orange-500' },
                  { name: 'Charitable', amount: 'CHF 500', color: 'bg-red-500' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className={`${item.color} h-24 rounded-lg mb-4 flex items-end justify-center`} style={{ height: `${(parseInt(item.amount.replace(/[^\d]/g, '')) / 100) * 24}px` }}>
                      <span className="text-white font-bold text-sm mb-2">{item.amount}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Calculation Section */}
      {activeSection === 'calculation' && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Tax Calculation Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Step-by-step breakdown of how your tax is calculated
              </p>
            </motion.div>

            <div className="space-y-6">
              {taxCalculationSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center space-x-6">
                    <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 mb-2">{step.description}</p>
                      <div className="text-2xl font-bold text-steel-blue">{step.amount}</div>
                    </div>
                    {index < taxCalculationSteps.length - 1 && (
                      <ArrowRight className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tax Rate Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Progressive Tax Rates</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-4">Federal Tax</h4>
                  <div className="space-y-2">
                    {[
                      { range: 'CHF 0 - 14,500', rate: '0.77%' },
                      { range: 'CHF 14,501 - 31,600', rate: '0.88%' },
                      { range: 'CHF 31,601 - 41,400', rate: '2.64%' },
                      { range: 'CHF 41,401 - 55,200', rate: '2.97%' },
                      { range: 'CHF 55,201 - 72,800', rate: '5.94%' },
                      { range: 'CHF 72,801 - 78,100', rate: '6.60%' },
                      { range: 'CHF 78,101+', rate: '8.80%' }
                    ].map((bracket, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600">{bracket.range}</span>
                        <span className="font-semibold text-gray-900">{bracket.rate}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-4">Cantonal Tax</h4>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Varies by canton</p>
                    <p className="text-lg font-bold text-blue-600">2-8%</p>
                    <p className="text-xs text-gray-500">of taxable income</p>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-4">Municipal Tax</h4>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Varies by municipality</p>
                    <p className="text-lg font-bold text-green-600">0.5-3%</p>
                    <p className="text-xs text-gray-500">of cantonal tax</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Deadlines Section */}
      {activeSection === 'deadlines' && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Important Deadlines
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Key dates for Swiss tax return filing and compliance
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {deadlines.map((deadline, index) => {
                const Icon = deadline.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="text-center">
                      <div className={`${deadline.color} p-4 rounded-xl mb-6 w-fit mx-auto`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{deadline.date}</h3>
                      <p className="text-gray-600 mb-4">{deadline.description}</p>
                      <div className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                        deadline.importance === 'High' ? 'bg-red-100 text-red-800' :
                        deadline.importance === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {deadline.importance} Priority
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Timeline Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tax Year Timeline</h3>
              <div className="relative">
                <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-300 transform -translate-y-1/2"></div>
                {[
                  { month: 'Jan', event: 'Tax Year Begins', color: 'bg-blue-500' },
                  { month: 'Mar', event: 'Filing Deadline', color: 'bg-red-500' },
                  { month: 'Apr', event: 'Extension Deadline', color: 'bg-yellow-500' },
                  { month: 'Jun', event: 'Final Deadline', color: 'bg-red-500' },
                  { month: 'Dec', event: 'Tax Year Ends', color: 'bg-gray-500' }
                ].map((item, index) => (
                  <div key={index} className="absolute left-0 top-0 transform -translate-x-1/2" style={{ left: `${index * 25}%` }}>
                    <div className={`${item.color} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mb-2`}>
                      {index + 1}
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{item.month}</div>
                      <div className="text-xs text-gray-600">{item.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

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
              Need Help with Your Tax Return?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Our tax experts can help you understand and complete your Swiss tax return. 
              Get professional guidance and ensure compliance with Swiss tax law.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                Get Tax Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-steel-blue transition-colors">
                Download Tax Guide
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TaxReturnExplainedPage;
