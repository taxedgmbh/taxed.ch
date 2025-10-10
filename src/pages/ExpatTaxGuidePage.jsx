import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Users, 
  FileText, 
  Calculator, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Download,
  ArrowRight,
  Building,
  CreditCard,
  Home,
  Briefcase,
  GraduationCap,
  Heart
} from 'lucide-react';

const ExpatTaxGuidePage = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', name: 'Overview', icon: Globe },
    { id: 'residency', name: 'Tax Residency', icon: Home },
    { id: 'income', name: 'Income Tax', icon: CreditCard },
    { id: 'double', name: 'Double Taxation', icon: Shield },
    { id: 'forms', name: 'Forms & Deadlines', icon: FileText },
    { id: 'planning', name: 'Tax Planning', icon: Calculator }
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

  const incomeTypes = [
    {
      title: 'Employment Income',
      description: 'Salary, wages, bonuses, and benefits from Swiss employment',
      taxRate: 'Progressive rates from 0.77% to 11.5%',
      details: [
        'Gross salary minus social security contributions',
        '13th month salary and bonuses included',
        'Company car and other benefits taxable',
        'Foreign income may be subject to Swiss tax'
      ],
      icon: Briefcase
    },
    {
      title: 'Self-Employment Income',
      description: 'Income from freelance work, consulting, or business activities',
      taxRate: 'Progressive rates plus social security contributions',
      details: [
        'Net business income after expenses',
        'Social security contributions (AHV/IV/EO) required',
        'Professional liability insurance may be deductible',
        'Business expenses must be properly documented'
      ],
      icon: Building
    },
    {
      title: 'Investment Income',
      description: 'Dividends, interest, capital gains, and rental income',
      taxRate: 'Flat rate 35% withholding tax (may be reduced)',
      details: [
        'Swiss source dividends subject to 35% withholding tax',
        'Foreign dividends may be subject to Swiss tax',
        'Capital gains on Swiss real estate taxable',
        'Rental income from Swiss property taxable'
      ],
      icon: CreditCard
    },
    {
      title: 'Pension Income',
      description: 'Pension payments from Swiss and foreign sources',
      taxRate: 'Progressive rates, may be reduced by tax treaties',
      details: [
        'Swiss pension (AHV) payments taxable',
        'Foreign pension payments may be taxable',
        'Tax treaty benefits may apply',
        'Lump sum pension payments have special rules'
      ],
      icon: GraduationCap
    }
  ];

  const doubleTaxTreaties = [
    {
      country: 'United States',
      treaty: 'US-Switzerland Tax Treaty',
      benefits: [
        'Eliminates double taxation on income',
        'Reduced withholding tax rates on dividends (5-15%)',
        'Reduced withholding tax rates on interest (0-10%)',
        'Special rules for pensions and social security'
      ],
      icon: Globe
    },
    {
      country: 'United Kingdom',
      treaty: 'UK-Switzerland Tax Treaty',
      benefits: [
        'Eliminates double taxation on income',
        'Reduced withholding tax rates on dividends (5-15%)',
        'Reduced withholding tax rates on interest (0-10%)',
        'Special rules for pensions and social security'
      ],
      icon: Globe
    },
    {
      country: 'Germany',
      treaty: 'Germany-Switzerland Tax Treaty',
      benefits: [
        'Eliminates double taxation on income',
        'Reduced withholding tax rates on dividends (5-15%)',
        'Reduced withholding tax rates on interest (0-10%)',
        'Special rules for pensions and social security'
      ],
      icon: Globe
    },
    {
      country: 'France',
      treaty: 'France-Switzerland Tax Treaty',
      benefits: [
        'Eliminates double taxation on income',
        'Reduced withholding tax rates on dividends (5-15%)',
        'Reduced withholding tax rates on interest (0-10%)',
        'Special rules for pensions and social security'
      ],
      icon: Globe
    }
  ];

  const taxForms = [
    {
      title: 'Form 204 - Individual Tax Return',
      description: 'Main tax return form for individuals',
      deadline: 'March 31, 2025',
      required: 'All Swiss tax residents',
      icon: FileText
    },
    {
      title: 'Form 204A - Simplified Tax Return',
      description: 'Simplified form for simple tax situations',
      deadline: 'March 31, 2025',
      required: 'Taxpayers with simple income',
      icon: FileText
    },
    {
      title: 'Form 204B - Tax Return for Non-Residents',
      description: 'Form for non-residents with Swiss source income',
      deadline: 'March 31, 2025',
      required: 'Non-residents with Swiss income',
      icon: FileText
    },
    {
      title: 'Form 204C - Tax Return for Couples',
      description: 'Joint tax return for married couples',
      deadline: 'March 31, 2025',
      required: 'Married couples (optional)',
      icon: FileText
    }
  ];

  const planningStrategies = [
    {
      title: 'Timing of Income and Expenses',
      description: 'Optimize the timing of income recognition and expense deductions',
      strategies: [
        'Defer income to lower tax years',
        'Accelerate deductible expenses',
        'Consider year-end bonuses and timing',
        'Plan major purchases for tax benefits'
      ],
      icon: Clock
    },
    {
      title: 'Retirement Planning',
      description: 'Maximize retirement savings and tax benefits',
      strategies: [
        'Contribute to 3rd pillar retirement accounts',
        'Consider 2nd pillar (pension fund) contributions',
        'Evaluate foreign retirement account options',
        'Plan for tax-efficient retirement income'
      ],
      icon: GraduationCap
    },
    {
      title: 'Investment Optimization',
      description: 'Structure investments for tax efficiency',
      strategies: [
        'Consider tax-advantaged investment accounts',
        'Optimize dividend and interest income timing',
        'Plan capital gains realization',
        'Evaluate foreign investment reporting requirements'
      ],
      icon: CreditCard
    },
    {
      title: 'Estate Planning',
      description: 'Minimize estate taxes and plan for succession',
      strategies: [
        'Consider Swiss inheritance tax implications',
        'Plan for international estate tax issues',
        'Evaluate gifting strategies',
        'Structure assets for tax efficiency'
      ],
      icon: Shield
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-steel-blue/10 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Swiss Tax System Overview</h3>
              <p className="text-lg text-gray-700 mb-6">
                Switzerland has a federal tax system with three levels: federal, cantonal, and municipal. 
                As an expatriate, understanding these layers is crucial for proper tax compliance.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4">
                    <Building className="h-8 w-8 text-steel-blue mx-auto" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Federal Tax</h4>
                  <p className="text-sm text-gray-600">Progressive rates from 0.77% to 11.5%</p>
                </div>
                <div className="text-center">
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4">
                    <Home className="h-8 w-8 text-steel-blue mx-auto" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cantonal Tax</h4>
                  <p className="text-sm text-gray-600">Varies by canton, typically 5-15%</p>
                </div>
                <div className="text-center">
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4">
                    <Users className="h-8 w-8 text-steel-blue mx-auto" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Municipal Tax</h4>
                  <p className="text-sm text-gray-600">Multiplier of cantonal tax</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'residency':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Swiss Tax Residency Rules</h3>
              <p className="text-lg text-gray-700">
                Understanding your tax residency status is the first step in Swiss tax compliance.
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

      case 'income':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Types of Taxable Income</h3>
              <p className="text-lg text-gray-700">
                Different types of income are subject to different tax treatments in Switzerland.
              </p>
            </div>
            <div className="grid gap-8">
              {incomeTypes.map((income, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-steel-blue/10 p-3 rounded-xl">
                      <income.icon className="h-6 w-6 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{income.title}</h4>
                      <p className="text-gray-700 mb-2">{income.description}</p>
                      <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                        {income.taxRate}
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {income.details.map((detail, idx) => (
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

      case 'double':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Double Taxation Treaties</h3>
              <p className="text-lg text-gray-700">
                Switzerland has tax treaties with over 100 countries to prevent double taxation.
              </p>
            </div>
            <div className="grid gap-8">
              {doubleTaxTreaties.map((treaty, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-steel-blue/10 p-3 rounded-xl">
                      <treaty.icon className="h-6 w-6 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{treaty.country}</h4>
                      <p className="text-gray-700 mb-4">{treaty.treaty}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {treaty.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'forms':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Required Tax Forms</h3>
              <p className="text-lg text-gray-700">
                Understanding which forms you need to file is crucial for compliance.
              </p>
            </div>
            <div className="grid gap-8">
              {taxForms.map((form, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-steel-blue/10 p-3 rounded-xl">
                      <form.icon className="h-6 w-6 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{form.title}</h4>
                      <p className="text-gray-700 mb-4">{form.description}</p>
                      <div className="flex flex-wrap gap-4">
                        <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                          Deadline: {form.deadline}
                        </div>
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          Required: {form.required}
                        </div>
                      </div>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tax Planning Strategies</h3>
              <p className="text-lg text-gray-700">
                Proactive tax planning can help you minimize your tax burden legally and effectively.
              </p>
            </div>
            <div className="grid gap-8">
              {planningStrategies.map((strategy, index) => (
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
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {strategy.strategies.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
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
        <title>Complete Expat Tax Guide for Switzerland 2025 | Taxed GmbH</title>
        <meta name="description" content="Comprehensive guide for expatriates in Switzerland. Learn about tax residency, income tax, double taxation treaties, forms, and tax planning strategies." />
        <meta property="og:title" content="Complete Expat Tax Guide for Switzerland 2025 | Taxed GmbH" />
        <meta property="og:description" content="Comprehensive guide for expatriates in Switzerland. Learn about tax residency, income tax, double taxation treaties, forms, and tax planning strategies." />
        <link rel="canonical" href="https://taxed.ch/expat-tax-guide" />
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
              Complete Expat Tax Guide for Switzerland
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Everything you need to know about Swiss taxes as an expatriate. From residency rules to tax planning strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                <Download className="inline-block mr-2 h-5 w-5" />
                Download Guide
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-steel-blue transition-colors">
                Get Professional Help
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-gray-50 sticky top-0 z-10">
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
                      : 'bg-white text-gray-700 hover:bg-gray-100'
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
              Need Help with Your Swiss Taxes?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Our tax experts specialize in expatriate tax matters and can help you navigate the complexities of Swiss tax law.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                Get Professional Tax Service
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-steel-blue transition-colors">
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ExpatTaxGuidePage;
