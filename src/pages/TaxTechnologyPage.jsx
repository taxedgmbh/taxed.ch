import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  Calculator, 
  Clock, 
  Target,
  CheckCircle,
  AlertTriangle,
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
  Globe,
  Search,
  Filter,
  Calendar,
  Info,
  Download,
  Bell,
  Star,
  Eye,
  Share2,
  ExternalLink,
  Video,
  Headphones,
  Mic,
  Camera,
  Wifi,
  WifiOff,
  Database,
  Cloud,
  Smartphone,
  Laptop,
  Monitor,
  Server,
  Cpu,
  HardDrive,
  Network,
  Settings,
  Code,
  Terminal,
  GitBranch,
  Layers,
  Workflow
} from 'lucide-react';

const TaxTechnologyPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const categories = [
    { id: 'all', name: 'All Solutions', icon: Zap },
    { id: 'automation', name: 'Automation', icon: Workflow },
    { id: 'compliance', name: 'Compliance', icon: Shield },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'integration', name: 'Integration', icon: Network },
    { id: 'security', name: 'Security', icon: Lock }
  ];

  const types = [
    { id: 'all', name: 'All Types', icon: Zap },
    { id: 'software', name: 'Software', icon: Code },
    { id: 'platform', name: 'Platform', icon: Cloud },
    { id: 'api', name: 'API', icon: Terminal },
    { id: 'mobile', name: 'Mobile', icon: Smartphone }
  ];

  const technologySolutions = [
    {
      id: 'solution-001',
      name: 'Tax Automation Platform',
      description: 'Complete automation platform for tax compliance and reporting',
      category: 'automation',
      type: 'platform',
      features: [
        'Automated tax return preparation',
        'Real-time compliance monitoring',
        'Automated deadline tracking',
        'Integrated document management',
        'AI-powered tax optimization'
      ],
      benefits: [
        'Reduce manual work by 80%',
        'Eliminate compliance errors',
        'Save 20+ hours per month',
        'Improve accuracy by 95%',
        'Reduce audit risk by 60%'
      ],
      pricing: 'CHF 299/month',
      setup: 'CHF 1,500',
      icon: Workflow,
      status: 'available',
      rating: 4.9,
      users: 250
    },
    {
      id: 'solution-002',
      name: 'Digital Tax Compliance Suite',
      description: 'Comprehensive digital compliance solution for Swiss tax requirements',
      category: 'compliance',
      type: 'software',
      features: [
        'VAT return automation',
        'Payroll tax calculations',
        'Corporate tax compliance',
        'International reporting',
        'Audit trail management'
      ],
      benefits: [
        'Ensure 100% compliance',
        'Automate all tax filings',
        'Reduce audit risk',
        'Save compliance costs',
        'Improve efficiency'
      ],
      pricing: 'CHF 199/month',
      setup: 'CHF 1,000',
      icon: Shield,
      status: 'available',
      rating: 4.8,
      users: 180
    },
    {
      id: 'solution-003',
      name: 'Tax Analytics Dashboard',
      description: 'Advanced analytics and reporting for tax optimization',
      category: 'analytics',
      type: 'platform',
      features: [
        'Real-time tax analytics',
        'Predictive tax modeling',
        'Optimization recommendations',
        'Performance tracking',
        'Custom reporting'
      ],
      benefits: [
        'Optimize tax position',
        'Identify savings opportunities',
        'Track performance metrics',
        'Make data-driven decisions',
        'Improve tax efficiency'
      ],
      pricing: 'CHF 149/month',
      setup: 'CHF 800',
      icon: BarChart3,
      status: 'available',
      rating: 4.7,
      users: 120
    },
    {
      id: 'solution-004',
      name: 'Tax API Integration',
      description: 'Seamless integration with existing business systems',
      category: 'integration',
      type: 'api',
      features: [
        'RESTful API endpoints',
        'Real-time data sync',
        'Custom integrations',
        'Webhook notifications',
        'Documentation and support'
      ],
      benefits: [
        'Integrate with existing systems',
        'Automate data flow',
        'Reduce manual entry',
        'Improve data accuracy',
        'Streamline processes'
      ],
      pricing: 'CHF 99/month',
      setup: 'CHF 500',
      icon: Network,
      status: 'available',
      rating: 4.6,
      users: 80
    },
    {
      id: 'solution-005',
      name: 'Mobile Tax App',
      description: 'Mobile application for tax management and compliance',
      category: 'compliance',
      type: 'mobile',
      features: [
        'Mobile tax return preparation',
        'Document scanning and upload',
        'Real-time notifications',
        'Offline capability',
        'Secure data storage'
      ],
      benefits: [
        'Access anywhere, anytime',
        'Scan and upload documents',
        'Receive instant notifications',
        'Work offline when needed',
        'Secure mobile access'
      ],
      pricing: 'CHF 49/month',
      setup: 'CHF 200',
      icon: Smartphone,
      status: 'available',
      rating: 4.5,
      users: 300
    },
    {
      id: 'solution-006',
      name: 'Tax Security Suite',
      description: 'Advanced security solution for tax data protection',
      category: 'security',
      type: 'software',
      features: [
        'End-to-end encryption',
        'Multi-factor authentication',
        'Data backup and recovery',
        'Access control management',
        'Security monitoring'
      ],
      benefits: [
        'Protect sensitive tax data',
        'Meet compliance requirements',
        'Prevent data breaches',
        'Ensure data privacy',
        'Maintain audit trails'
      ],
      pricing: 'CHF 79/month',
      setup: 'CHF 300',
      icon: Lock,
      status: 'available',
      rating: 4.9,
      users: 150
    }
  ];

  const technologyFeatures = [
    {
      title: 'AI-Powered Tax Optimization',
      description: 'Advanced artificial intelligence for tax planning and optimization',
      features: [
        'Machine learning algorithms',
        'Predictive tax modeling',
        'Automated optimization',
        'Risk assessment',
        'Compliance monitoring'
      ],
      icon: Cpu,
      benefits: [
        'Maximize tax savings',
        'Minimize compliance risk',
        'Optimize tax strategies',
        'Predict tax outcomes',
        'Automate decision making'
      ]
    },
    {
      title: 'Cloud-Based Tax Platform',
      description: 'Secure cloud platform for tax management and collaboration',
      features: [
        'Cloud storage and backup',
        'Real-time collaboration',
        'Scalable infrastructure',
        'Global accessibility',
        'Automatic updates'
      ],
      icon: Cloud,
      benefits: [
        'Access from anywhere',
        'Collaborate in real-time',
        'Scale as needed',
        'Automatic backups',
        'Always up-to-date'
      ]
    },
    {
      title: 'Blockchain Tax Records',
      description: 'Immutable blockchain technology for tax record keeping',
      features: [
        'Immutable tax records',
        'Smart contract automation',
        'Decentralized storage',
        'Cryptographic verification',
        'Audit trail integrity'
      ],
      icon: Database,
      benefits: [
        'Tamper-proof records',
        'Automated compliance',
        'Enhanced security',
        'Simplified audits',
        'Reduced fraud risk'
      ]
    },
    {
      title: 'Real-Time Tax Monitoring',
      description: 'Continuous monitoring and alerting for tax compliance',
      features: [
        'Real-time compliance tracking',
        'Automated alerts',
        'Deadline monitoring',
        'Risk assessment',
        'Performance metrics'
      ],
      icon: Monitor,
      benefits: [
        'Stay compliant always',
        'Never miss deadlines',
        'Identify risks early',
        'Track performance',
        'Make informed decisions'
      ]
    }
  ];

  const integrationPartners = [
    {
      name: 'SAP',
      description: 'Enterprise resource planning integration',
      logo: 'SAP',
      features: [
        'Seamless data integration',
        'Automated data transfer',
        'Real-time synchronization',
        'Custom field mapping'
      ],
      icon: Building
    },
    {
      name: 'Microsoft Dynamics',
      description: 'Business management software integration',
      logo: 'Microsoft',
      features: [
        'ERP system integration',
        'Automated workflows',
        'Data synchronization',
        'Custom reporting'
      ],
      icon: Building
    },
    {
      name: 'QuickBooks',
      description: 'Accounting software integration',
      logo: 'QuickBooks',
      features: [
        'Accounting data sync',
        'Automated bookkeeping',
        'Financial reporting',
        'Tax preparation'
      ],
      icon: Calculator
    },
    {
      name: 'Xero',
      description: 'Cloud accounting platform integration',
      logo: 'Xero',
      features: [
        'Cloud accounting sync',
        'Automated transactions',
        'Real-time reporting',
        'Multi-currency support'
      ],
      icon: Cloud
    }
  ];

  const filteredSolutions = technologySolutions.filter(solution => {
    if (activeCategory !== 'all' && solution.category !== activeCategory) {
      return false;
    }
    if (selectedType !== 'all' && solution.type !== selectedType) {
      return false;
    }
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'coming-soon': return 'text-blue-600 bg-blue-100';
      case 'beta': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      <Helmet>
        <title>Tax Technology Solutions & Digital Tools | Taxed GmbH</title>
        <meta name="description" content="Advanced tax technology solutions for Swiss businesses. Automation, compliance, analytics, and integration tools for modern tax management." />
        <meta property="og:title" content="Tax Technology Solutions & Digital Tools | Taxed GmbH" />
        <meta property="og:description" content="Advanced tax technology solutions for Swiss businesses. Automation, compliance, analytics, and integration tools for modern tax management." />
        <link rel="canonical" href="https://taxed.ch/technology" />
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
              Tax Technology Solutions
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Transform your tax management with cutting-edge technology solutions. 
              Automate compliance, optimize processes, and ensure accuracy with our digital tax tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                <Download className="inline-block mr-2 h-5 w-5" />
                Download Brochure
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-steel-blue transition-colors">
                <PlayCircle className="inline-block mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
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

            {/* Type Filter */}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-700">Type:</span>
              <div className="flex space-x-2">
                {types.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                        selectedType === type.id
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
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {filteredSolutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                  {/* Solution Info */}
                  <div className="flex items-start space-x-4 mb-6 lg:mb-0 lg:w-1/3">
                    <div className="bg-steel-blue/10 p-3 rounded-xl">
                      <solution.icon className="h-6 w-6 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(solution.status)}`}>
                          {solution.status.toUpperCase()}
                        </span>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(solution.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">({solution.rating})</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{solution.name}</h3>
                      <p className="text-gray-600 mb-3">{solution.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {solution.users} users
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {solution.pricing}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="lg:w-1/3">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits and Actions */}
                  <div className="lg:w-1/3">
                    <h4 className="font-semibold text-gray-900 mb-3">Benefits</h4>
                    <ul className="space-y-2 mb-6">
                      {solution.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                          <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-2">
                      <button className="w-full bg-steel-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-steel-blue/90 transition-colors">
                        <ExternalLink className="h-4 w-4 mr-2 inline-block" />
                        Learn More
                      </button>
                      <button className="w-full border-2 border-steel-blue text-steel-blue px-6 py-3 rounded-lg font-semibold hover:bg-steel-blue hover:text-white transition-colors">
                        <PlayCircle className="h-4 w-4 mr-2 inline-block" />
                        Watch Demo
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Features */}
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
              Advanced Technology Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge technology features that set our tax solutions apart from the competition.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {technologyFeatures.map((feature, index) => {
              const Icon = feature.icon;
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
                      <Icon className="h-8 w-8 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-700 mb-4">{feature.description}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Features</h5>
                      <ul className="space-y-2">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Benefits</h5>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration Partners */}
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
              Integration Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seamlessly integrate with your existing business systems and software.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {integrationPartners.map((partner, index) => {
              const Icon = partner.icon;
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
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{partner.name}</h3>
                  <p className="text-gray-600 mb-4">{partner.description}</p>
                  <ul className="space-y-2">
                    {partner.features.map((feature, idx) => (
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
              Ready to Transform Your Tax Management?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover how our tax technology solutions can automate your processes, 
              improve accuracy, and save you time and money.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                Schedule Technology Demo
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-steel-blue transition-colors">
                Get Technology Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TaxTechnologyPage;
