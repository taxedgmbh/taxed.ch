import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail,
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
  Workflow,
  Zap,
  Shield,
  Key,
  Fingerprint,
  Calculator
} from 'lucide-react';

const TaxSupportPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Support', icon: HelpCircle },
    { id: 'technical', name: 'Technical', icon: Settings },
    { id: 'tax', name: 'Tax Questions', icon: Calculator },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'account', name: 'Account', icon: Users },
    { id: 'general', name: 'General', icon: Info }
  ];

  const supportChannels = [
    {
      id: 'channel-001',
      name: 'Live Chat Support',
      description: 'Get instant help from our support team',
      availability: '24/7',
      responseTime: 'Under 2 minutes',
      features: [
        'Real-time chat support',
        'File sharing capability',
        'Screen sharing option',
        'Chat history tracking',
        'Multi-language support'
      ],
      icon: MessageCircle,
      status: 'available',
      priority: 'high'
    },
    {
      id: 'channel-002',
      name: 'Phone Support',
      description: 'Speak directly with our tax experts',
      availability: 'Mon-Fri 9AM-6PM CET',
      responseTime: 'Immediate',
      features: [
        'Direct phone consultation',
        'Expert tax advice',
        'Complex issue resolution',
        'Follow-up support',
        'Emergency support'
      ],
      icon: Phone,
      status: 'available',
      priority: 'high'
    },
    {
      id: 'channel-003',
      name: 'Email Support',
      description: 'Detailed support via email',
      availability: '24/7',
      responseTime: 'Within 4 hours',
      features: [
        'Detailed email responses',
        'Document attachments',
        'Step-by-step guidance',
        'Follow-up assistance',
        'Knowledge base links'
      ],
      icon: Mail,
      status: 'available',
      priority: 'medium'
    },
    {
      id: 'channel-004',
      name: 'Video Call Support',
      description: 'Face-to-face support via video calls',
      availability: 'Mon-Fri 9AM-6PM CET',
      responseTime: 'Scheduled',
      features: [
        'Video consultation',
        'Screen sharing',
        'Document review',
        'Interactive guidance',
        'Recording available'
      ],
      icon: Video,
      status: 'available',
      priority: 'high'
    }
  ];

  const supportTopics = [
    {
      id: 'topic-001',
      title: 'Tax Return Preparation',
      description: 'Help with individual and corporate tax return preparation',
      category: 'tax',
      difficulty: 'Medium',
      estimatedTime: '30-60 minutes',
      steps: [
        'Gather required documents',
        'Complete tax return form',
        'Review calculations',
        'Submit to tax authorities',
        'Follow up on status'
      ],
      resources: [
        'Tax return checklist',
        'Document requirements guide',
        'Calculation examples',
        'Submission instructions',
        'Status tracking guide'
      ],
      icon: FileText,
      views: 1250,
      helpful: 95
    },
    {
      id: 'topic-002',
      title: 'VAT Registration and Returns',
      description: 'Assistance with VAT registration and monthly returns',
      category: 'tax',
      difficulty: 'High',
      estimatedTime: '60-120 minutes',
      steps: [
        'Determine VAT registration requirement',
        'Complete registration application',
        'Set up VAT accounting system',
        'Prepare monthly VAT returns',
        'Submit returns and payments'
      ],
      resources: [
        'VAT registration guide',
        'VAT return templates',
        'Calculation worksheets',
        'Submission deadlines',
        'Payment instructions'
      ],
      icon: Calculator,
      views: 980,
      helpful: 92
    },
    {
      id: 'topic-003',
      title: 'International Tax Planning',
      description: 'Cross-border tax planning and compliance',
      category: 'tax',
      difficulty: 'Expert',
      estimatedTime: '120+ minutes',
      steps: [
        'Analyze international tax situation',
        'Review tax treaties',
        'Plan tax-efficient structures',
        'Implement compliance measures',
        'Monitor ongoing requirements'
      ],
      resources: [
        'Tax treaty guide',
        'International tax checklist',
        'Compliance requirements',
        'Planning strategies',
        'Ongoing monitoring guide'
      ],
      icon: Globe,
      views: 750,
      helpful: 88
    },
    {
      id: 'topic-004',
      title: 'Account Setup and Configuration',
      description: 'Help setting up your tax account and preferences',
      category: 'account',
      difficulty: 'Easy',
      estimatedTime: '15-30 minutes',
      steps: [
        'Create account',
        'Verify email address',
        'Set up profile information',
        'Configure preferences',
        'Test account access'
      ],
      resources: [
        'Account setup guide',
        'Profile configuration',
        'Preference settings',
        'Security setup',
        'Access troubleshooting'
      ],
      icon: Users,
      views: 2100,
      helpful: 97
    },
    {
      id: 'topic-005',
      title: 'Billing and Payment Issues',
      description: 'Assistance with billing, payments, and invoices',
      category: 'billing',
      difficulty: 'Easy',
      estimatedTime: '15-30 minutes',
      steps: [
        'Review billing statement',
        'Check payment methods',
        'Update payment information',
        'Process payment',
        'Confirm payment receipt'
      ],
      resources: [
        'Billing guide',
        'Payment methods',
        'Invoice explanation',
        'Payment troubleshooting',
        'Receipt confirmation'
      ],
      icon: CreditCard,
      views: 1800,
      helpful: 94
    },
    {
      id: 'topic-006',
      title: 'Technical Issues and Troubleshooting',
      description: 'Help with technical problems and system issues',
      category: 'technical',
      difficulty: 'Medium',
      estimatedTime: '30-60 minutes',
      steps: [
        'Identify technical issue',
        'Check system requirements',
        'Try basic troubleshooting',
        'Contact technical support',
        'Follow resolution steps'
      ],
      resources: [
        'System requirements',
        'Troubleshooting guide',
        'Common issues',
        'Technical support',
        'Resolution steps'
      ],
      icon: Settings,
      views: 1650,
      helpful: 91
    }
  ];

  const faqItems = [
    {
      question: 'How do I prepare my Swiss tax return?',
      answer: 'To prepare your Swiss tax return, gather all required documents including income statements, bank statements, and deduction receipts. Use our tax return preparation guide and follow the step-by-step instructions.',
      category: 'tax',
      helpful: 95
    },
    {
      question: 'What are the VAT registration requirements?',
      answer: 'VAT registration is required if your annual turnover exceeds CHF 100,000. We can help you determine if registration is necessary and guide you through the process.',
      category: 'tax',
      helpful: 92
    },
    {
      question: 'How do I contact support?',
      answer: 'You can contact our support team through live chat, phone, email, or video call. Live chat is available 24/7, while phone and video support is available during business hours.',
      category: 'general',
      helpful: 98
    },
    {
      question: 'What documents do I need for tax preparation?',
      answer: 'Required documents include income statements, bank statements, investment records, deduction receipts, and previous year tax returns. Our document checklist provides a complete list.',
      category: 'tax',
      helpful: 94
    },
    {
      question: 'How do I update my payment information?',
      answer: 'You can update your payment information in your account settings. Go to Billing & Payments section and update your payment method. Changes take effect immediately.',
      category: 'billing',
      helpful: 96
    },
    {
      question: 'What if I need help with complex tax issues?',
      answer: 'For complex tax issues, we recommend scheduling a consultation with our tax experts. You can book a video call or phone consultation through your account dashboard.',
      category: 'tax',
      helpful: 89
    }
  ];

  const filteredTopics = supportTopics.filter(topic => {
    if (activeCategory !== 'all' && topic.category !== activeCategory) {
      return false;
    }
    if (searchTerm && !topic.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !topic.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const filteredFaqs = faqItems.filter(faq => {
    if (activeCategory !== 'all' && faq.category !== activeCategory) {
      return false;
    }
    if (searchTerm && !faq.question.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !faq.answer.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Expert': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      <Helmet>
        <title>Tax Support & Help Center | Taxed GmbH</title>
        <meta name="description" content="Get expert tax support and assistance. Live chat, phone support, video calls, and comprehensive help center for all your tax needs." />
        <meta property="og:title" content="Tax Support & Help Center | Taxed GmbH" />
        <meta property="og:description" content="Get expert tax support and assistance. Live chat, phone support, video calls, and comprehensive help center for all your tax needs." />
        <link rel="canonical" href="https://taxed.ch/support" />
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
              Tax Support & Help Center
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Get expert help with your tax questions and issues. Our support team is here to assist you 
              with comprehensive guidance and personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                <MessageCircle className="inline-block mr-2 h-5 w-5" />
                Start Live Chat
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-steel-blue transition-colors">
                <Phone className="inline-block mr-2 h-5 w-5" />
                Call Support
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              How Can We Help You?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the support channel that works best for you. We're here to help with all your tax needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportChannels.map((channel, index) => {
              const Icon = channel.icon;
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
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{channel.name}</h3>
                  <p className="text-gray-600 mb-4">{channel.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span>{channel.availability}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Zap className="h-4 w-4 text-green-500" />
                      <span>{channel.responseTime}</span>
                    </div>
                  </div>
                  <button className="w-full bg-steel-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-steel-blue/90 transition-colors">
                    Get Help Now
                  </button>
                </motion.div>
              );
            })}
          </div>
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
                  placeholder="Search support topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-blue focus:border-transparent"
                />
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

      {/* Support Topics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
            Support Topics & Guides
          </h2>
          <div className="grid gap-8">
            {filteredTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                  {/* Topic Info */}
                  <div className="flex items-start space-x-4 mb-6 lg:mb-0 lg:w-1/3">
                    <div className="bg-steel-blue/10 p-3 rounded-xl">
                      <topic.icon className="h-6 w-6 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(topic.difficulty)}`}>
                          {topic.difficulty}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {topic.estimatedTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
                      <p className="text-gray-600 mb-3">{topic.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{topic.views} views</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4" />
                          <span>{topic.helpful}% helpful</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="lg:w-1/3">
                    <h4 className="font-semibold text-gray-900 mb-3">Steps</h4>
                    <ol className="space-y-2">
                      {topic.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                          <span className="bg-steel-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold mt-0.5 flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Resources and Actions */}
                  <div className="lg:w-1/3">
                    <h4 className="font-semibold text-gray-900 mb-3">Resources</h4>
                    <ul className="space-y-2 mb-6">
                      {topic.resources.map((resource, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                          <BookOpen className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{resource}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-steel-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-steel-blue/90 transition-colors">
                      <ExternalLink className="h-4 w-4 mr-2 inline-block" />
                      Get Help
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find quick answers to common questions about our tax services and support.
            </p>
          </motion.div>

          <div className="grid gap-6">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-steel-blue/10 p-2 rounded-lg">
                    <HelpCircle className="h-5 w-5 text-steel-blue" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-700 mb-3">{faq.answer}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {faq.helpful}% found this helpful
                      </span>
                      <div className="flex space-x-2">
                        <button className="text-sm text-gray-500 hover:text-steel-blue">
                          <CheckCircle className="h-4 w-4 inline-block mr-1" />
                          Helpful
                        </button>
                        <button className="text-sm text-gray-500 hover:text-steel-blue">
                          <Share2 className="h-4 w-4 inline-block mr-1" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
              Still Need Help?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Our expert support team is ready to help you with any tax questions or issues. 
              Get personalized assistance from certified tax professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                <MessageCircle className="h-5 w-5 mr-2 inline-block" />
                Start Live Chat
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-steel-blue transition-colors">
                <Phone className="h-5 w-5 mr-2 inline-block" />
                Call Support
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TaxSupportPage;
