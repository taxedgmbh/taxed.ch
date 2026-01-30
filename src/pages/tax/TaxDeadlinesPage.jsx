import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, Clock, AlertTriangle, CheckCircle, Download, Bell, FileText, Users, Building, Globe } from 'lucide-react';

const TaxDeadlinesPage = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear, currentYear + 1];

  const categories = [
    { id: 'all', name: 'All Deadlines', icon: Calendar },
    { id: 'individual', name: 'Individual Tax', icon: Users },
    { id: 'corporate', name: 'Corporate Tax', icon: Building },
    { id: 'vat', name: 'VAT', icon: FileText },
    { id: 'international', name: 'International', icon: Globe }
  ];

  const deadlines = [
    {
      id: 1,
      title: 'Individual Tax Return Submission',
      description: 'Deadline for submitting individual tax returns to Swiss tax authorities',
      date: 'March 31, 2025',
      category: 'individual',
      priority: 'high',
      status: 'upcoming',
      daysRemaining: 173,
      icon: Users,
      details: [
        'Complete tax return form (Form 204)',
        'Attach all required supporting documents',
        'Submit electronically or by mail',
        'Late submission penalty: CHF 100-500'
      ],
      tips: [
        'Start gathering documents in January',
        'Use our tax preparation service for guaranteed accuracy',
        'Consider early submission for faster processing'
      ]
    },
    {
      id: 2,
      title: 'Corporate Tax Return',
      description: 'Deadline for corporate tax returns for Swiss companies',
      date: 'March 31, 2025',
      category: 'corporate',
      priority: 'high',
      status: 'upcoming',
      daysRemaining: 173,
      icon: Building,
      details: [
        'Complete corporate tax return (Form 200)',
        'Attach financial statements and audit reports',
        'Submit to cantonal tax authorities',
        'Late submission penalty: CHF 500-2,000'
      ],
      tips: [
        'Ensure financial statements are audited',
        'Review transfer pricing documentation',
        'Consider tax optimization strategies'
      ]
    },
    {
      id: 3,
      title: 'VAT Return Submission',
      description: 'Monthly/quarterly VAT return submission deadline',
      date: 'January 31, 2025',
      category: 'vat',
      priority: 'medium',
      status: 'upcoming',
      daysRemaining: 113,
      icon: FileText,
      details: [
        'Submit VAT return for previous period',
        'Pay any VAT due to tax authorities',
        'File electronically through ESTV portal',
        'Late submission penalty: CHF 50-200'
      ],
      tips: [
        'Set up automatic reminders',
        'Keep detailed VAT records',
        'Consider VAT optimization strategies'
      ]
    },
    {
      id: 4,
      title: 'Quellensteuer Adjustment',
      description: 'Deadline for withholding tax adjustments and refunds',
      date: 'March 31, 2025',
      category: 'individual',
      priority: 'high',
      status: 'upcoming',
      daysRemaining: 173,
      icon: Users,
      details: [
        'Submit Quellensteuer adjustment request',
        'Attach supporting documentation',
        'Request refund for overpaid withholding tax',
        'Processing time: 2-4 months'
      ],
      tips: [
        'Gather all income statements',
        'Calculate potential refund amount',
        'Submit early for faster processing'
      ]
    },
    {
      id: 5,
      title: 'International Tax Reporting',
      description: 'Deadline for international tax compliance (FATCA, CRS)',
      date: 'June 30, 2025',
      category: 'international',
      priority: 'medium',
      status: 'upcoming',
      daysRemaining: 264,
      icon: Globe,
      details: [
        'Submit FATCA reporting to IRS',
        'Complete CRS reporting for Swiss authorities',
        'File international tax forms',
        'Late submission penalty: CHF 1,000-5,000'
      ],
      tips: [
        'Review all foreign accounts and assets',
        'Ensure proper documentation',
        'Consider professional assistance for complex cases'
      ]
    },
    {
      id: 6,
      title: 'Tax Payment Deadline',
      description: 'Final deadline for tax payments to avoid penalties',
      date: 'December 31, 2025',
      category: 'individual',
      priority: 'high',
      status: 'upcoming',
      daysRemaining: 83,
      icon: Clock,
      details: [
        'Pay any outstanding tax liabilities',
        'Avoid late payment penalties',
        'Consider installment payment options',
        'Late payment penalty: 5% per year'
      ],
      tips: [
        'Set up automatic payments',
        'Review tax calculations carefully',
        'Consider tax optimization opportunities'
      ]
    }
  ];

  const filteredDeadlines = deadlines.filter(deadline => {
    if (selectedCategory !== 'all' && deadline.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'due': return 'text-red-600 bg-red-100';
      case 'overdue': return 'text-red-800 bg-red-200';
      case 'completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      <Helmet>
        <title>Swiss Tax Deadlines 2025 - Important Dates & Reminders | Taxed GmbH</title>
        <meta name="description" content="Stay compliant with Swiss tax deadlines. Complete calendar of individual, corporate, VAT, and international tax deadlines for 2025. Get reminders and avoid penalties." />
        <meta property="og:title" content="Swiss Tax Deadlines 2025 - Important Dates & Reminders | Taxed GmbH" />
        <meta property="og:description" content="Stay compliant with Swiss tax deadlines. Complete calendar of individual, corporate, VAT, and international tax deadlines for 2025. Get reminders and avoid penalties." />
        <link rel="canonical" href="https://taxed.ch/tax-deadlines" />
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
              Swiss Tax Deadlines 2025
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Stay compliant with all Swiss tax deadlines. Never miss an important date with our comprehensive calendar and automated reminders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                <Bell className="inline-block mr-2 h-5 w-5" />
                Set Reminders
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-steel-blue transition-colors">
                <Download className="inline-block mr-2 h-5 w-5" />
                Download Calendar
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Year and Category Filters */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Year Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-700">Year:</span>
              <div className="flex space-x-2">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedYear === year
                        ? 'bg-steel-blue text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-steel-blue text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Deadlines Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {filteredDeadlines.map((deadline, index) => {
              const Icon = deadline.icon;
              return (
                <motion.div
                  key={deadline.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                      <div className="bg-steel-blue/10 p-3 rounded-xl">
                        <Icon className="h-6 w-6 text-steel-blue" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {deadline.title}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {deadline.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(deadline.priority)}`}>
                            {deadline.priority.toUpperCase()} PRIORITY
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(deadline.status)}`}>
                            {deadline.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-steel-blue mb-1">
                        {deadline.date}
                      </div>
                      <div className="text-sm text-gray-600">
                        {deadline.daysRemaining} days remaining
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Details */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Requirements
                      </h4>
                      <ul className="space-y-2">
                        {deadline.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tips */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Pro Tips
                      </h4>
                      <ul className="space-y-2">
                        {deadline.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 bg-steel-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-steel-blue/90 transition-colors">
                        Get Professional Help
                      </button>
                      <button className="flex-1 border-2 border-steel-blue text-steel-blue px-6 py-3 rounded-lg font-semibold hover:bg-steel-blue hover:text-white transition-colors">
                        Set Reminder
                      </button>
                    </div>
                  </div>
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
              Never Miss a Tax Deadline Again
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Our tax experts will handle all your deadlines and ensure compliance. Focus on your business while we handle the paperwork.
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

export default TaxDeadlinesPage;
