import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  PlayCircle, 
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
  ExternalLink,
  Video,
  Headphones,
  Mic,
  Camera,
  Wifi,
  WifiOff
} from 'lucide-react';

const TaxWebinarsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Webinars', icon: PlayCircle },
    { id: 'individual', name: 'Individual Tax', icon: Users },
    { id: 'business', name: 'Business Tax', icon: Building },
    { id: 'international', name: 'International', icon: Globe },
    { id: 'planning', name: 'Tax Planning', icon: PieChart },
    { id: 'compliance', name: 'Compliance', icon: Shield }
  ];

  const types = [
    { id: 'all', name: 'All Types', icon: PlayCircle },
    { id: 'live', name: 'Live Webinars', icon: Video },
    { id: 'recorded', name: 'Recorded', icon: PlayCircle },
    { id: 'series', name: 'Series', icon: BookOpen }
  ];

  const webinars = [
    {
      id: 'webinar-001',
      title: 'Swiss Tax Fundamentals for Expats',
      description: 'Complete guide to Swiss tax system for expatriates and international workers',
      category: 'individual',
      type: 'live',
      date: '2025-01-20',
      time: '14:00 CET',
      duration: '90 minutes',
      instructor: 'Dr. Sarah Müller',
      level: 'Beginner',
      language: 'English',
      price: 'Free',
      attendees: 150,
      maxAttendees: 200,
      status: 'upcoming',
      topics: [
        'Swiss tax residency rules',
        'Individual tax return preparation',
        'Double taxation treaties',
        'Tax planning strategies'
      ],
      benefits: [
        'Understand Swiss tax system',
        'Learn tax return preparation',
        'Optimize your tax position',
        'Avoid common mistakes'
      ],
      requirements: [
        'Basic understanding of taxes',
        'Computer with internet connection',
        'Notebook for taking notes',
        'Questions for Q&A session'
      ],
      icon: Users
    },
    {
      id: 'webinar-002',
      title: 'Corporate Tax Optimization Strategies',
      description: 'Advanced strategies for optimizing corporate tax position in Switzerland',
      category: 'business',
      type: 'live',
      date: '2025-01-25',
      time: '10:00 CET',
      duration: '120 minutes',
      instructor: 'Prof. Michael Weber',
      level: 'Advanced',
      language: 'German',
      price: 'CHF 299',
      attendees: 75,
      maxAttendees: 100,
      status: 'upcoming',
      topics: [
        'Corporate tax structure optimization',
        'Transfer pricing strategies',
        'International tax planning',
        'Tax-efficient business structures'
      ],
      benefits: [
        'Reduce corporate tax burden',
        'Optimize business structure',
        'Implement tax-efficient strategies',
        'Avoid tax pitfalls'
      ],
      requirements: [
        'Advanced tax knowledge',
        'Business tax experience',
        'Computer with internet connection',
        'Business case studies'
      ],
      icon: Building
    },
    {
      id: 'webinar-003',
      title: 'VAT Compliance for Swiss Businesses',
      description: 'Complete guide to VAT registration, returns, and compliance requirements',
      category: 'compliance',
      type: 'recorded',
      date: '2024-12-15',
      time: 'On-demand',
      duration: '75 minutes',
      instructor: 'Anna Schmidt',
      level: 'Intermediate',
      language: 'German',
      price: 'CHF 199',
      attendees: 0,
      maxAttendees: 'Unlimited',
      status: 'available',
      topics: [
        'VAT registration requirements',
        'VAT return preparation',
        'VAT audit procedures',
        'VAT optimization strategies'
      ],
      benefits: [
        'Master VAT compliance',
        'Avoid VAT penalties',
        'Optimize VAT position',
        'Implement VAT best practices'
      ],
      requirements: [
        'Basic business knowledge',
        'Computer with internet connection',
        'VAT-related questions',
        'Business documentation'
      ],
      icon: Calculator
    },
    {
      id: 'webinar-004',
      title: 'International Tax Planning Masterclass',
      description: 'Advanced international tax planning for multinational businesses',
      category: 'international',
      type: 'series',
      date: '2025-02-01',
      time: '16:00 CET',
      duration: '180 minutes',
      instructor: 'Dr. Thomas Müller',
      level: 'Expert',
      language: 'English',
      price: 'CHF 599',
      attendees: 25,
      maxAttendees: 50,
      status: 'upcoming',
      topics: [
        'International tax structures',
        'Transfer pricing optimization',
        'Tax treaty benefits',
        'Cross-border tax planning'
      ],
      benefits: [
        'Master international tax planning',
        'Optimize global tax position',
        'Implement tax-efficient structures',
        'Navigate complex tax issues'
      ],
      requirements: [
        'Expert tax knowledge',
        'International tax experience',
        'Computer with internet connection',
        'Complex tax scenarios'
      ],
      icon: Globe
    },
    {
      id: 'webinar-005',
      title: 'Tax Planning for High Net Worth Individuals',
      description: 'Specialized tax planning strategies for wealthy individuals',
      category: 'planning',
      type: 'live',
      date: '2025-01-30',
      time: '18:00 CET',
      duration: '105 minutes',
      instructor: 'Dr. Lisa Weber',
      level: 'Advanced',
      language: 'English',
      price: 'CHF 399',
      attendees: 40,
      maxAttendees: 60,
      status: 'upcoming',
      topics: [
        'Wealth tax optimization',
        'Investment tax planning',
        'Estate planning strategies',
        'Tax-efficient investments'
      ],
      benefits: [
        'Optimize wealth tax position',
        'Plan tax-efficient investments',
        'Implement estate planning',
        'Maximize tax savings'
      ],
      requirements: [
        'Advanced tax knowledge',
        'High net worth experience',
        'Computer with internet connection',
        'Investment portfolio details'
      ],
      icon: DollarSign
    },
    {
      id: 'webinar-006',
      title: 'Swiss Tax Deadlines and Compliance',
      description: 'Essential guide to Swiss tax deadlines and compliance requirements',
      category: 'compliance',
      type: 'recorded',
      date: '2024-11-20',
      time: 'On-demand',
      duration: '60 minutes',
      instructor: 'Markus Fischer',
      level: 'Beginner',
      language: 'German',
      price: 'Free',
      attendees: 0,
      maxAttendees: 'Unlimited',
      status: 'available',
      topics: [
        'Tax deadline calendar',
        'Compliance requirements',
        'Penalty avoidance',
        'Tax planning timeline'
      ],
      benefits: [
        'Never miss tax deadlines',
        'Avoid penalties',
        'Plan tax compliance',
        'Stay organized'
      ],
      requirements: [
        'Basic tax knowledge',
        'Computer with internet connection',
        'Tax calendar',
        'Compliance checklist'
      ],
      icon: Calendar
    },
    {
      id: 'webinar-007',
      title: 'Digital Tax Compliance and Automation',
      description: 'Modern approaches to tax compliance using digital tools and automation',
      category: 'compliance',
      type: 'live',
      date: '2025-02-05',
      time: '11:00 CET',
      duration: '90 minutes',
      instructor: 'Tech Tax Solutions',
      level: 'Intermediate',
      language: 'English',
      price: 'CHF 249',
      attendees: 60,
      maxAttendees: 100,
      status: 'upcoming',
      topics: [
        'Digital tax tools',
        'Automation strategies',
        'Cloud-based compliance',
        'Tax technology trends'
      ],
      benefits: [
        'Implement digital tax tools',
        'Automate tax processes',
        'Improve compliance efficiency',
        'Stay current with technology'
      ],
      requirements: [
        'Basic computer skills',
        'Tax compliance experience',
        'Computer with internet connection',
        'Digital tax questions'
      ],
      icon: Zap
    },
    {
      id: 'webinar-008',
      title: 'Tax Planning for Small Businesses',
      description: 'Essential tax planning strategies for small and medium businesses',
      category: 'business',
      type: 'recorded',
      date: '2024-10-15',
      time: 'On-demand',
      duration: '80 minutes',
      instructor: 'Business Tax Experts',
      level: 'Intermediate',
      language: 'German',
      price: 'CHF 149',
      attendees: 0,
      maxAttendees: 'Unlimited',
      status: 'available',
      topics: [
        'Small business tax optimization',
        'Deduction strategies',
        'Business structure planning',
        'Tax-efficient operations'
      ],
      benefits: [
        'Optimize small business taxes',
        'Maximize deductions',
        'Plan business structure',
        'Improve tax efficiency'
      ],
      requirements: [
        'Small business experience',
        'Basic tax knowledge',
        'Computer with internet connection',
        'Business tax questions'
      ],
      icon: Briefcase
    }
  ];

  const filteredWebinars = webinars.filter(webinar => {
    if (activeCategory !== 'all' && webinar.category !== activeCategory) {
      return false;
    }
    if (selectedType !== 'all' && webinar.type !== selectedType) {
      return false;
    }
    if (searchTerm && !webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !webinar.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'available': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-orange-600 bg-orange-100';
      case 'Expert': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      <Helmet>
        <title>Tax Webinars & Educational Events | Taxed GmbH</title>
        <meta name="description" content="Join our expert-led tax webinars and educational events. Learn about Swiss tax law, compliance, and optimization strategies from certified tax professionals." />
        <meta property="og:title" content="Tax Webinars & Educational Events | Taxed GmbH" />
        <meta property="og:description" content="Join our expert-led tax webinars and educational events. Learn about Swiss tax law, compliance, and optimization strategies from certified tax professionals." />
        <link rel="canonical" href="https://taxed.ch/webinars" />
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
              Tax Webinars & Educational Events
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Learn from certified tax professionals through our comprehensive webinars and educational events. 
              Stay updated with the latest tax strategies and compliance requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                <Bell className="inline-block mr-2 h-5 w-5" />
                Get Notified
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-steel-blue transition-colors">
                <Download className="inline-block mr-2 h-5 w-5" />
                Download Schedule
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
                  placeholder="Search webinars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-blue focus:border-transparent"
                />
              </div>
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

      {/* Webinars Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {filteredWebinars.map((webinar, index) => (
              <motion.div
                key={webinar.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                  {/* Webinar Info */}
                  <div className="flex items-start space-x-4 mb-6 lg:mb-0 lg:w-1/3">
                    <div className="bg-steel-blue/10 p-3 rounded-xl">
                      <webinar.icon className="h-6 w-6 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(webinar.status)}`}>
                          {webinar.status.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(webinar.level)}`}>
                          {webinar.level}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{webinar.title}</h3>
                      <p className="text-gray-600 mb-3">{webinar.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {webinar.date}
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {webinar.duration}
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {webinar.language}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="lg:w-1/3">
                    <h4 className="font-semibold text-gray-900 mb-3">Instructor & Details</h4>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Instructor: {webinar.instructor}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Time: {webinar.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Attendees: {webinar.attendees}/{webinar.maxAttendees}</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-steel-blue mb-2">{webinar.price}</div>
                  </div>

                  {/* Topics and Actions */}
                  <div className="lg:w-1/3">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Topics</h4>
                    <ul className="space-y-1 mb-6">
                      {webinar.topics.slice(0, 3).map((topic, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-2">
                      {webinar.status === 'upcoming' ? (
                        <button className="w-full bg-steel-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-steel-blue/90 transition-colors flex items-center justify-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Register Now
                        </button>
                      ) : (
                        <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Watch Now
                        </button>
                      )}
                      <button className="w-full border-2 border-steel-blue text-steel-blue px-6 py-3 rounded-lg font-semibold hover:bg-steel-blue hover:text-white transition-colors flex items-center justify-center">
                        <Info className="h-4 w-4 mr-2" />
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Webinar */}
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
              Featured Webinar Series
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our comprehensive webinar series covering all aspects of Swiss taxation.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="lg:w-1/3">
                <div className="bg-steel-blue/10 p-6 rounded-xl mb-4">
                  <PlayCircle className="h-12 w-12 text-steel-blue mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Swiss Tax Masterclass</h3>
                <p className="text-gray-600 mb-4">
                  A comprehensive 6-part webinar series covering all aspects of Swiss taxation for individuals and businesses.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    6 Sessions
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    12 Hours
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Expert Level
                  </span>
                </div>
              </div>
              <div className="lg:w-1/3">
                <h4 className="font-semibold text-gray-900 mb-3">What You'll Learn</h4>
                <ul className="space-y-2">
                  {[
                    'Swiss tax system fundamentals',
                    'Individual tax optimization',
                    'Corporate tax strategies',
                    'International tax planning',
                    'VAT compliance and optimization',
                    'Tax planning and compliance'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-steel-blue mb-2">CHF 999</div>
                  <div className="text-sm text-gray-600 mb-4">Complete Series</div>
                  <button className="w-full bg-steel-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-steel-blue/90 transition-colors mb-2">
                    Register for Series
                  </button>
                  <button className="w-full border-2 border-steel-blue text-steel-blue px-6 py-3 rounded-lg font-semibold hover:bg-steel-blue hover:text-white transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
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
              Ready to Master Swiss Taxation?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join our expert-led webinars and gain the knowledge you need to optimize your tax position 
              and ensure compliance with Swiss tax law.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                View All Webinars
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-steel-blue transition-colors">
                Get Personalized Recommendations
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TaxWebinarsPage;
