import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Newspaper, 
  Clock, 
  Target,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Users,
  Building,
  CreditCard,
  Calculator,
  Globe,
  Home,
  Briefcase,
  GraduationCap,
  Heart,
  Lock,
  Award,
  Zap,
  Search,
  Filter,
  Calendar,
  BookOpen,
  Info,
  Shield,
  PieChart,
  TrendingUp,
  DollarSign,
  FileText,
  Download,
  Bell,
  Star,
  Eye,
  Share2,
  ExternalLink
} from 'lucide-react';

const TaxUpdatesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState(2025);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Updates', icon: Newspaper },
    { id: 'individual', name: 'Individual Tax', icon: Users },
    { id: 'corporate', name: 'Corporate Tax', icon: Building },
    { id: 'vat', name: 'VAT', icon: Calculator },
    { id: 'international', name: 'International', icon: Globe },
    { id: 'legislation', name: 'Legislation', icon: FileText }
  ];

  const years = [2023, 2024, 2025];

  const taxUpdates = [
    {
      id: 'update-2025-001',
      title: 'New Corporate Tax Rates for 2025',
      description: 'Swiss Federal Council announces updated corporate tax rates and cantonal variations for 2025',
      category: 'corporate',
      date: '2025-01-15',
      priority: 'high',
      impact: 'All Swiss companies',
      summary: 'The Federal Council has updated corporate tax rates for 2025, with significant changes in several cantons including Zurich, Geneva, and Basel-City.',
      details: [
        'Zurich corporate tax rate reduced to 18.2% (from 19.2%)',
        'Geneva corporate tax rate increased to 13.8% (from 13.2%)',
        'Basel-City maintains lowest rate at 13.0%',
        'New tax incentives for R&D investments',
        'Updated transfer pricing documentation requirements'
      ],
      implications: [
        'Companies should review their tax planning strategies',
        'Consider relocating to more tax-friendly cantons',
        'Update transfer pricing documentation',
        'Review R&D investment opportunities'
      ],
      effectiveDate: '2025-01-01',
      source: 'Swiss Federal Tax Administration',
      icon: Building
    },
    {
      id: 'update-2025-002',
      title: 'VAT Rate Changes and New Categories',
      description: 'Updated VAT rates and new categories for digital services and e-commerce',
      category: 'vat',
      date: '2025-01-10',
      priority: 'high',
      impact: 'All VAT-registered businesses',
      summary: 'Switzerland introduces new VAT categories and rate adjustments for digital services, e-commerce, and cross-border transactions.',
      details: [
        'New 2.5% rate for essential digital services',
        'Updated 7.7% rate for standard digital services',
        'New e-commerce VAT registration requirements',
        'Updated cross-border VAT rules',
        'New digital service provider obligations'
      ],
      implications: [
        'Review VAT registration requirements',
        'Update pricing for digital services',
        'Implement new VAT collection systems',
        'Train staff on new VAT rules'
      ],
      effectiveDate: '2025-01-01',
      source: 'Swiss Federal Tax Administration',
      icon: Calculator
    },
    {
      id: 'update-2025-003',
      title: 'Individual Tax Deduction Limits Increased',
      description: 'Increased deduction limits for individual taxpayers in 2025',
      category: 'individual',
      date: '2025-01-05',
      priority: 'medium',
      impact: 'All individual taxpayers',
      summary: 'Swiss tax authorities have increased deduction limits for various expenses including medical costs, education, and home office expenses.',
      details: [
        'Medical expense deduction limit increased to CHF 2,500',
        'Education expense deduction limit increased to CHF 1,500',
        'Home office deduction limit increased to CHF 1,200',
        'New deduction for digital health services',
        'Updated travel expense deduction rates'
      ],
      implications: [
        'Review and update expense documentation',
        'Consider timing of major expenses',
        'Update tax planning strategies',
        'Take advantage of new deductions'
      ],
      effectiveDate: '2025-01-01',
      source: 'Swiss Federal Tax Administration',
      icon: Users
    },
    {
      id: 'update-2025-004',
      title: 'New International Tax Treaty with United States',
      description: 'Updated tax treaty between Switzerland and the United States',
      category: 'international',
      date: '2024-12-20',
      priority: 'high',
      impact: 'US-Swiss cross-border transactions',
      summary: 'The updated US-Switzerland tax treaty includes new provisions for digital services, cryptocurrency, and enhanced information exchange.',
      details: [
        'New provisions for digital service taxation',
        'Updated cryptocurrency tax treatment',
        'Enhanced information exchange requirements',
        'New dispute resolution procedures',
        'Updated withholding tax rates'
      ],
      implications: [
        'Review cross-border transaction structures',
        'Update tax planning for US operations',
        'Implement new reporting requirements',
        'Consider cryptocurrency tax implications'
      ],
      effectiveDate: '2025-01-01',
      source: 'Swiss Federal Department of Finance',
      icon: Globe
    },
    {
      id: 'update-2025-005',
      title: 'Payroll Tax and Social Security Updates',
      description: 'Updated payroll tax rates and social security contribution limits',
      category: 'individual',
      date: '2024-12-15',
      priority: 'medium',
      impact: 'All employers and employees',
      summary: 'Swiss authorities have updated payroll tax rates and social security contribution limits for 2025.',
      details: [
        'AHV/IV/EO contribution rate increased to 8.7%',
        'Unemployment insurance rate increased to 1.1%',
        'New contribution limits for high earners',
        'Updated payroll tax calculation methods',
        'New reporting requirements for employers'
      ],
      implications: [
        'Update payroll systems and calculations',
        'Review employee compensation structures',
        'Implement new reporting requirements',
        'Consider tax optimization strategies'
      ],
      effectiveDate: '2025-01-01',
      source: 'Swiss Federal Social Insurance Office',
      icon: CreditCard
    },
    {
      id: 'update-2025-006',
      title: 'Digital Tax Compliance Requirements',
      description: 'New digital tax compliance and reporting requirements',
      category: 'legislation',
      date: '2024-12-10',
      priority: 'high',
      impact: 'All businesses',
      summary: 'Switzerland introduces new digital tax compliance requirements including electronic filing, digital signatures, and automated reporting.',
      details: [
        'Mandatory electronic tax return filing',
        'Digital signature requirements',
        'Automated tax calculation systems',
        'New data protection requirements',
        'Updated audit and compliance procedures'
      ],
      implications: [
        'Implement digital tax systems',
        'Train staff on new procedures',
        'Update data protection measures',
        'Prepare for automated reporting'
      ],
      effectiveDate: '2025-01-01',
      source: 'Swiss Federal Tax Administration',
      icon: FileText
    },
    {
      id: 'update-2025-007',
      title: 'Environmental Tax Incentives',
      description: 'New tax incentives for environmental and sustainable investments',
      category: 'individual',
      date: '2024-12-05',
      priority: 'medium',
      impact: 'Individual and corporate taxpayers',
      summary: 'Switzerland introduces new tax incentives for environmental investments, renewable energy, and sustainable business practices.',
      details: [
        'Tax credits for renewable energy investments',
        'Deductions for environmental certifications',
        'Incentives for electric vehicle purchases',
        'Tax benefits for sustainable building improvements',
        'New green investment tax breaks'
      ],
      implications: [
        'Consider environmental investments',
        'Review sustainable business practices',
        'Take advantage of new tax incentives',
        'Update investment strategies'
      ],
      effectiveDate: '2025-01-01',
      source: 'Swiss Federal Office for the Environment',
      icon: Heart
    },
    {
      id: 'update-2025-008',
      title: 'Cryptocurrency Tax Treatment',
      description: 'Updated tax treatment for cryptocurrency and digital assets',
      category: 'individual',
      date: '2024-11-30',
      priority: 'high',
      impact: 'Cryptocurrency investors and businesses',
      summary: 'Switzerland clarifies tax treatment for cryptocurrency transactions, mining, and digital asset investments.',
      details: [
        'Clear tax treatment for cryptocurrency trading',
        'Updated mining income taxation',
        'New reporting requirements for digital assets',
        'Tax treatment for DeFi transactions',
        'Updated capital gains tax rules'
      ],
      implications: [
        'Review cryptocurrency tax obligations',
        'Implement proper record keeping',
        'Consider tax optimization strategies',
        'Update investment documentation'
      ],
      effectiveDate: '2025-01-01',
      source: 'Swiss Federal Tax Administration',
      icon: Zap
    },
    {
      id: 'update-2025-009',
      title: 'Real Estate Tax Updates',
      description: 'Updated tax rules for real estate investments and transactions',
      category: 'individual',
      date: '2024-11-25',
      priority: 'medium',
      impact: 'Real estate investors and property owners',
      summary: 'Switzerland updates tax rules for real estate investments, including new deduction limits and reporting requirements.',
      details: [
        'Updated mortgage interest deduction limits',
        'New property tax calculation methods',
        'Updated rental income taxation',
        'New reporting requirements for property sales',
        'Updated capital gains tax for real estate'
      ],
      implications: [
        'Review real estate tax strategies',
        'Update property investment planning',
        'Consider timing of property transactions',
        'Implement new reporting requirements'
      ],
      effectiveDate: '2025-01-01',
      source: 'Swiss Federal Tax Administration',
      icon: Home
    },
    {
      id: 'update-2025-010',
      title: 'International Tax Reporting Requirements',
      description: 'Enhanced international tax reporting and compliance requirements',
      category: 'international',
      date: '2024-11-20',
      priority: 'high',
      impact: 'International businesses and expatriates',
      summary: 'Switzerland enhances international tax reporting requirements including CRS, FATCA, and country-by-country reporting.',
      details: [
        'Enhanced CRS reporting requirements',
        'Updated FATCA compliance procedures',
        'New country-by-country reporting rules',
        'Enhanced information exchange procedures',
        'Updated penalty structures for non-compliance'
      ],
      implications: [
        'Review international tax compliance',
        'Implement enhanced reporting systems',
        'Consider tax structure optimization',
        'Prepare for increased scrutiny'
      ],
      effectiveDate: '2025-01-01',
      source: 'Swiss Federal Department of Finance',
      icon: Globe
    }
  ];

  const filteredUpdates = taxUpdates.filter(update => {
    if (activeCategory !== 'all' && update.category !== activeCategory) {
      return false;
    }
    if (searchTerm && !update.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !update.description.toLowerCase().includes(searchTerm.toLowerCase())) {
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

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return AlertTriangle;
      case 'medium': return Clock;
      case 'low': return CheckCircle;
      default: return Info;
    }
  };

  return (
    <>
      <Helmet>
        <title>Latest Swiss Tax Updates & Law Changes 2025 | Taxed GmbH</title>
        <meta name="description" content="Stay updated with the latest Swiss tax law changes, updates, and new regulations for 2025. Get expert analysis and implications for your tax situation." />
        <meta property="og:title" content="Latest Swiss Tax Updates & Law Changes 2025 | Taxed GmbH" />
        <meta property="og:description" content="Stay updated with the latest Swiss tax law changes, updates, and new regulations for 2025. Get expert analysis and implications for your tax situation." />
        <link rel="canonical" href="https://taxed.ch/tax-updates" />
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
              Latest Swiss Tax Updates
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Stay informed with the latest Swiss tax law changes, updates, and new regulations. 
              Get expert analysis and understand the implications for your tax situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                <Bell className="inline-block mr-2 h-5 w-5" />
                Subscribe to Updates
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-steel-blue transition-colors">
                <Download className="inline-block mr-2 h-5 w-5" />
                Download Report
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tax updates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-blue focus:border-transparent"
                />
              </div>
            </div>

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
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                      activeCategory === category.id
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

      {/* Updates Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {filteredUpdates.map((update, index) => {
              const PriorityIcon = getPriorityIcon(update.priority);
              return (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                    {/* Update Info */}
                    <div className="flex items-start space-x-4 mb-6 lg:mb-0 lg:w-1/3">
                      <div className="bg-steel-blue/10 p-3 rounded-xl">
                        <update.icon className="h-6 w-6 text-steel-blue" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <PriorityIcon className="h-5 w-5 text-red-500" />
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(update.priority)}`}>
                            {update.priority.toUpperCase()} PRIORITY
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{update.title}</h3>
                        <p className="text-gray-600 mb-3">{update.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {update.date}
                          </span>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                            Effective: {update.effectiveDate}
                          </span>
                          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {update.impact}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Summary and Details */}
                    <div className="lg:w-2/3">
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Summary</h4>
                        <p className="text-gray-700 mb-4">{update.summary}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Key Changes</h5>
                          <ul className="space-y-2">
                            {update.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Implications</h5>
                          <ul className="space-y-2">
                            {update.implications.map((implication, idx) => (
                              <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                                <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                <span>{implication}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-500">
                          Source: {update.source}
                        </div>
                        <div className="flex space-x-2">
                          <button className="bg-steel-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-steel-blue/90 transition-colors flex items-center">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Read More
                          </button>
                          <button className="border-2 border-steel-blue text-steel-blue px-4 py-2 rounded-lg font-semibold hover:bg-steel-blue hover:text-white transition-colors flex items-center">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
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
              Stay Updated with Tax Changes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Subscribe to our tax update newsletter and never miss important changes that could affect your tax situation.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-blue focus:border-transparent"
                />
                <button className="bg-steel-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-steel-blue/90 transition-colors flex items-center justify-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center">
                We'll send you weekly tax updates and important changes. Unsubscribe anytime.
              </p>
            </div>
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
              Need Help Understanding Tax Changes?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Our tax experts can help you understand how these changes affect your specific situation 
              and optimize your tax position accordingly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                Get Tax Impact Analysis
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-steel-blue transition-colors">
                Schedule Tax Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TaxUpdatesPage;
