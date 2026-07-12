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
  const [selectedYear, setSelectedYear] = useState(2026);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Updates', icon: Newspaper },
    { id: 'individual', name: 'Individual Tax', icon: Users },
    { id: 'corporate', name: 'Corporate Tax', icon: Building },
    { id: 'vat', name: 'VAT', icon: Calculator },
    { id: 'international', name: 'International', icon: Globe },
    { id: 'legislation', name: 'Legislation', icon: FileText }
  ];

  const years = [2023, 2024, 2025, 2026];

  const taxUpdates = [
    {
      id: 'update-2026-001',
      title: 'Imputed Rental Value to Be Abolished After 2025 Referendum',
      description: 'Swiss voters approved the abolition of the imputed rental value (Eigenmietwert) system in the September 2025 referendum',
      category: 'legislation',
      date: '2026-01-15',
      priority: 'high',
      impact: 'All Swiss homeowners',
      summary: 'On 28 September 2025, Swiss voters approved the reform package that abolishes the taxation of imputed rental value on owner-occupied homes. Implementation details are still being finalized, and the changes are not expected to take effect before 2028.',
      details: [
        'Imputed rental value will no longer be taxed on owner-occupied primary residences',
        'Deductions for mortgage interest and property maintenance will be significantly restricted',
        'Cantons may introduce a special property tax on second homes',
        'Entry into force is expected no earlier than 2028',
        'Transitional rules are still being drafted'
      ],
      implications: [
        'Homeowners with low mortgages will generally benefit',
        'Highly leveraged owners should review their financing strategy',
        'Consider the timing of major renovations while deductions still apply',
        'Second-home owners should monitor cantonal property tax plans'
      ],
      effectiveDate: '2028-01-01',
      source: 'Swiss Federal Chancellery referendum results',
      icon: FileText
    },
    {
      id: 'update-2025-001',
      title: 'Retroactive Pillar 3a Buy-Ins Possible From 2025',
      description: 'Contribution gaps from 2025 onwards can be closed retroactively for up to ten years',
      category: 'individual',
      date: '2025-01-08',
      priority: 'high',
      impact: 'All individuals with pillar 3a accounts',
      summary: 'Since 1 January 2025, anyone with AHV-liable income in Switzerland can retroactively close pillar 3a contribution gaps that arise from 2025 onwards, going back up to ten years. Buy-ins are fully tax-deductible in addition to the regular annual contribution.',
      details: [
        'Applies to contribution gaps arising from 2025 onwards',
        'Gaps can be closed up to ten years later',
        'Buy-in requires AHV-liable income in the year of the gap and the year of the buy-in',
        'Buy-ins are tax-deductible in addition to the regular annual maximum',
        'Maximum buy-in per year equals the small contribution limit'
      ],
      implications: [
        'Review your contribution history from 2025 onwards',
        'Plan buy-ins for high-income years to maximize tax savings',
        'Keep documentation of AHV-liable income',
        'Combine with regular contributions for maximum deduction'
      ],
      effectiveDate: '2025-01-01',
      source: 'Swiss Federal Council / BSV',
      icon: TrendingUp
    },
    {
      id: 'update-2025-002',
      title: 'Pillar 3a Maximum Contribution Raised to CHF 7,258',
      description: 'Updated pension parameters for 2025 including pillar 3a limits and BVG thresholds',
      category: 'individual',
      date: '2025-01-03',
      priority: 'medium',
      impact: 'All employees and self-employed persons',
      summary: 'For 2025, the pillar 3a maximum contribution rises to CHF 7,258 for employees with a pension fund and CHF 36,288 (max. 20% of net income) for those without. BVG parameters were adjusted accordingly.',
      details: [
        'Pillar 3a maximum with pension fund: CHF 7,258',
        'Pillar 3a maximum without pension fund: CHF 36,288 (max. 20% of net income)',
        'BVG entry threshold: CHF 22,680',
        'BVG coordination deduction: CHF 26,460',
        'Minimum AHV contribution for non-employed persons: CHF 530'
      ],
      implications: [
        'Adjust standing orders to the new maximum',
        'Self-employed should recalculate their 20% limit',
        'Review BVG coverage for part-time employees',
        'Update payroll parameters for 2025'
      ],
      effectiveDate: '2025-01-01',
      source: 'Swiss Federal Social Insurance Office (BSV)',
      icon: Calculator
    },
    {
      id: 'update-2024-001',
      title: 'VAT Rates Increased to 8.1% / 2.6% / 3.8%',
      description: 'Swiss VAT rates rose on 1 January 2024 to finance the AHV reform',
      category: 'vat',
      date: '2024-01-02',
      priority: 'high',
      impact: 'All VAT-registered businesses and consumers',
      summary: 'Following the AHV 21 vote, Swiss VAT rates increased on 1 January 2024: the standard rate from 7.7% to 8.1%, the reduced rate from 2.5% to 2.6%, and the special accommodation rate from 3.7% to 3.8%.',
      details: [
        'Standard rate: 8.1% (previously 7.7%)',
        'Reduced rate for essential goods: 2.6% (previously 2.5%)',
        'Special rate for accommodation: 3.8% (previously 3.7%)',
        'Net tax rates for the simplified method were adjusted accordingly',
        'The additional revenue is earmarked for AHV financing'
      ],
      implications: [
        'Update invoicing, tills, and accounting systems',
        'Check contracts spanning the rate change',
        'Apply the correct rate based on the date of supply',
        'Review net tax rate method elections'
      ],
      effectiveDate: '2024-01-01',
      source: 'Swiss Federal Tax Administration (FTA)',
      icon: Calculator
    },
    {
      id: 'update-2024-002',
      title: 'AHV 21 Reform in Force: Reference Age 65 for All',
      description: 'Unified reference age and flexible retirement options since 1 January 2024',
      category: 'individual',
      date: '2024-01-05',
      priority: 'high',
      impact: 'All employees, particularly women born 1961-1969',
      summary: 'The AHV 21 reform took effect on 1 January 2024. The reference age for women rises stepwise to 65 from 2025, retirement becomes more flexible, and the transitional generation receives compensation measures.',
      details: [
        'Uniform reference age of 65 for men and women (phased in for women from 2025)',
        'Pension can be drawn flexibly between 63 and 70',
        'Partial pension withdrawal is possible',
        'Compensation supplements for women of the transitional generation (born 1961-1969)',
        'Working beyond 65 can now improve the pension'
      ],
      implications: [
        'Women born 1961-1969 should review their retirement planning',
        'Consider partial retirement options',
        'Evaluate whether deferring the pension pays off',
        'Employers should update HR and payroll processes'
      ],
      effectiveDate: '2024-01-01',
      source: 'Swiss Federal Social Insurance Office (BSV)',
      icon: Users
    },
    {
      id: 'update-2024-003',
      title: 'OECD Minimum Tax: 15% for Large Multinationals',
      description: 'Switzerland applies the OECD/G20 minimum tax to large corporate groups since 2024',
      category: 'corporate',
      date: '2024-01-10',
      priority: 'medium',
      impact: 'Multinational groups with revenue above EUR 750 million',
      summary: 'Following the June 2023 constitutional vote, Switzerland introduced a qualified domestic minimum top-up tax (QDMTT) of 15% for large multinational groups from 1 January 2024. SMEs and purely domestic companies are not affected.',
      details: [
        'Applies to groups with consolidated revenue of EUR 750 million or more',
        'Implemented as a domestic top-up tax (QDMTT)',
        'Ordinary cantonal and federal profit taxes remain unchanged',
        'Cantons keep the majority of the additional revenue',
        'International top-up elements (IIR) applied from 2025'
      ],
      implications: [
        'Affected groups must calculate their effective tax rate per jurisdiction',
        'Review group structures and intercompany arrangements',
        'SMEs below the threshold are not affected',
        'Monitor cantonal responses such as location incentives'
      ],
      effectiveDate: '2024-01-01',
      source: 'Swiss Federal Department of Finance (FDF)',
      icon: Building
    },
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
        <title>Latest Swiss Tax Updates & Law Changes 2026 | Taxed GmbH</title>
        <meta name="description" content="Stay updated with the latest Swiss tax law changes, updates, and new regulations for 2026. Get expert analysis and implications for your tax situation." />
        <meta property="og:title" content="Latest Swiss Tax Updates & Law Changes 2026 | Taxed GmbH" />
        <meta property="og:description" content="Stay updated with the latest Swiss tax law changes, updates, and new regulations for 2026. Get expert analysis and implications for your tax situation." />
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
