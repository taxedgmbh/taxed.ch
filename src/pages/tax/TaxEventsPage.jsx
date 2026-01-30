import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users,
  Target,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
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
  Phone,
  Wifi as WifiIcon,
  Shield as SecurityShield,
  Lock as SecurityLock,
  Eye as SecurityEye,
  AlertTriangle as SecurityAlert,
  CheckCircle as SecurityCheck,
  Clock as ClockIcon,
  Globe as GlobeIcon,
  Building as BuildingIcon,
  Users as UsersIcon,
  FileText as FileTextIcon,
  CreditCard as CreditCardIcon,
  Calculator as CalculatorIcon,
  PieChart as PieChartIcon,
  BarChart3 as BarChart3Icon,
  TrendingUp as TrendingUpIcon,
  DollarSign as DollarSignIcon,
  Briefcase as BriefcaseIcon,
  Home as HomeIcon,
  GraduationCap as GraduationCapIcon,
  Heart as HeartIcon,
  Award as AwardIcon,
  Globe as GlobeIconIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  Calendar as CalendarIcon,
  Info as InfoIcon,
  Download as DownloadIcon,
  Bell as BellIcon,
  Star as StarIcon,
  Share2 as Share2Icon,
  ExternalLink as ExternalLinkIcon,
  Video as VideoIcon,
  Headphones as HeadphonesIcon,
  Mic as MicIcon,
  Camera as CameraIcon,
  Wifi as WifiIconIcon,
  WifiOff as WifiOffIcon,
  Database as DatabaseIcon,
  Cloud as CloudIcon,
  Smartphone as SmartphoneIcon,
  Laptop as LaptopIcon,
  Monitor as MonitorIcon,
  Server as ServerIcon,
  Cpu as CpuIcon,
  HardDrive as HardDriveIcon,
  Network as NetworkIcon,
  Settings as SettingsIcon,
  Code as CodeIcon,
  Terminal as TerminalIcon,
  GitBranch as GitBranchIcon,
  Layers as LayersIcon,
  Workflow as WorkflowIcon,
  Gift
} from 'lucide-react';

const TaxEventsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Events', icon: Calendar },
    { id: 'seminars', name: 'Seminars', icon: GraduationCap },
    { id: 'workshops', name: 'Workshops', icon: Briefcase },
    { id: 'conferences', name: 'Conferences', icon: Users },
    { id: 'webinars', name: 'Webinars', icon: Video },
    { id: 'networking', name: 'Networking', icon: Globe }
  ];

  const types = [
    { id: 'all', name: 'All Types', icon: Calendar },
    { id: 'upcoming', name: 'Upcoming', icon: Clock },
    { id: 'live', name: 'Live', icon: PlayCircle },
    { id: 'recorded', name: 'Recorded', icon: Video },
    { id: 'free', name: 'Free', icon: Gift },
    { id: 'paid', name: 'Paid', icon: CreditCard }
  ];

  const taxEvents = [
    {
      id: 'event-001',
      title: 'Swiss Tax Law Update 2025',
      description: 'Comprehensive update on the latest Swiss tax law changes and their impact on businesses and individuals',
      category: 'seminars',
      type: 'upcoming',
      date: '2025-01-25',
      time: '09:00 - 17:00',
      location: 'Zurich, Switzerland',
      venue: 'Swissotel Zurich',
      price: 'CHF 299',
      capacity: 150,
      registered: 120,
      status: 'open',
      features: [
        'Latest tax law changes',
        'Impact analysis',
        'Q&A session',
        'Networking lunch',
        'Certificate of attendance'
      ],
      speakers: [
        'Dr. Sarah Müller - Tax Law Expert',
        'Prof. Michael Weber - Corporate Tax Specialist',
        'Anna Schmidt - International Tax Advisor'
      ],
      icon: FileText,
      difficulty: 'Intermediate',
      language: 'German/English',
      cpd: '8 hours'
    },
    {
      id: 'event-002',
      title: 'VAT Compliance Workshop',
      description: 'Hands-on workshop for VAT registration, returns, and compliance requirements',
      category: 'workshops',
      type: 'upcoming',
      date: '2025-02-15',
      time: '14:00 - 18:00',
      location: 'Geneva, Switzerland',
      venue: 'Geneva Convention Centre',
      price: 'CHF 199',
      capacity: 50,
      registered: 35,
      status: 'open',
      features: [
        'VAT registration process',
        'Return preparation',
        'Compliance requirements',
        'Practical exercises',
        'Take-home materials'
      ],
      speakers: [
        'Markus Fischer - VAT Specialist',
        'Lisa Weber - Compliance Expert'
      ],
      icon: Calculator,
      difficulty: 'Beginner',
      language: 'German',
      cpd: '4 hours'
    },
    {
      id: 'event-003',
      title: 'International Tax Planning Conference',
      description: 'Advanced conference on international tax planning strategies for multinational businesses',
      category: 'conferences',
      type: 'upcoming',
      date: '2025-03-20',
      time: '08:30 - 18:00',
      location: 'Basel, Switzerland',
      venue: 'Basel Congress Centre',
      price: 'CHF 599',
      capacity: 300,
      registered: 250,
      status: 'open',
      features: [
        'International tax strategies',
        'Transfer pricing optimization',
        'Tax treaty benefits',
        'Case studies',
        'Networking dinner'
      ],
      speakers: [
        'Dr. Thomas Müller - International Tax Expert',
        'Prof. Lisa Weber - Transfer Pricing Specialist',
        'Markus Fischer - Tax Treaty Advisor'
      ],
      icon: Globe,
      difficulty: 'Advanced',
      language: 'English',
      cpd: '8 hours'
    },
    {
      id: 'event-004',
      title: 'Tax Technology Innovation Summit',
      description: 'Exploring the latest tax technology solutions and digital transformation',
      category: 'conferences',
      type: 'upcoming',
      date: '2025-04-10',
      time: '09:00 - 16:00',
      location: 'Lucerne, Switzerland',
      venue: 'Lucerne Culture and Congress Centre',
      price: 'CHF 399',
      capacity: 200,
      registered: 180,
      status: 'open',
      features: [
        'Tax technology trends',
        'Digital transformation',
        'Automation solutions',
        'Technology demonstrations',
        'Vendor exhibitions'
      ],
      speakers: [
        'Tech Tax Solutions - Technology Experts',
        'Dr. Sarah Müller - Digital Tax Specialist',
        'Prof. Michael Weber - Tax Technology Advisor'
      ],
      icon: Zap,
      difficulty: 'Intermediate',
      language: 'English',
      cpd: '6 hours'
    },
    {
      id: 'event-005',
      title: 'Individual Tax Planning Seminar',
      description: 'Comprehensive seminar on individual tax planning and optimization strategies',
      category: 'seminars',
      type: 'upcoming',
      date: '2025-05-05',
      time: '10:00 - 15:00',
      location: 'Bern, Switzerland',
      venue: 'Bern Congress Centre',
      price: 'CHF 149',
      capacity: 100,
      registered: 75,
      status: 'open',
      features: [
        'Tax planning strategies',
        'Deduction optimization',
        'Retirement planning',
        'Investment tax considerations',
        'Q&A session'
      ],
      speakers: [
        'Anna Schmidt - Individual Tax Specialist',
        'Dr. Lisa Weber - Tax Planning Expert'
      ],
      icon: Users,
      difficulty: 'Beginner',
      language: 'German',
      cpd: '5 hours'
    },
    {
      id: 'event-006',
      title: 'Tax Compliance Workshop',
      description: 'Workshop on tax compliance requirements and best practices',
      category: 'workshops',
      type: 'upcoming',
      date: '2025-06-12',
      time: '13:00 - 17:00',
      location: 'St. Gallen, Switzerland',
      venue: 'St. Gallen University',
      price: 'CHF 179',
      capacity: 40,
      registered: 30,
      status: 'open',
      features: [
        'Compliance requirements',
        'Best practices',
        'Risk management',
        'Practical exercises',
        'Compliance checklist'
      ],
      speakers: [
        'Markus Fischer - Compliance Specialist',
        'Dr. Sarah Müller - Risk Management Expert'
      ],
      icon: Shield,
      difficulty: 'Intermediate',
      language: 'German',
      cpd: '4 hours'
    },
    {
      id: 'event-007',
      title: 'Tax Networking Evening',
      description: 'Networking event for tax professionals and business owners',
      category: 'networking',
      type: 'upcoming',
      date: '2025-07-18',
      time: '18:00 - 21:00',
      location: 'Zurich, Switzerland',
      venue: 'Zurich Marriott Hotel',
      price: 'CHF 49',
      capacity: 80,
      registered: 60,
      status: 'open',
      features: [
        'Professional networking',
        'Industry insights',
        'Cocktail reception',
        'Guest speakers',
        'Business opportunities'
      ],
      speakers: [
        'Industry Leaders',
        'Tax Professionals',
        'Business Owners'
      ],
      icon: Globe,
      difficulty: 'All Levels',
      language: 'German/English',
      cpd: '3 hours'
    },
    {
      id: 'event-008',
      title: 'Tax Webinar Series: Swiss Tax Fundamentals',
      description: 'Online webinar series covering Swiss tax fundamentals',
      category: 'webinars',
      type: 'upcoming',
      date: '2025-08-01',
      time: '14:00 - 15:30',
      location: 'Online',
      venue: 'Zoom Webinar',
      price: 'Free',
      capacity: 500,
      registered: 350,
      status: 'open',
      features: [
        'Live online presentation',
        'Interactive Q&A',
        'Recording available',
        'Downloadable materials',
        'Certificate of attendance'
      ],
      speakers: [
        'Dr. Sarah Müller - Tax Expert',
        'Prof. Michael Weber - Tax Specialist'
      ],
      icon: Video,
      difficulty: 'Beginner',
      language: 'English',
      cpd: '1.5 hours'
    }
  ];

  const filteredEvents = taxEvents.filter(event => {
    if (activeCategory !== 'all' && event.category !== activeCategory) {
      return false;
    }
    if (selectedType !== 'all' && event.type !== selectedType) {
      return false;
    }
    if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !event.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-green-600 bg-green-100';
      case 'full': return 'text-red-600 bg-red-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
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
        <title>Tax Events, Seminars & Workshops | Taxed GmbH</title>
        <meta name="description" content="Join our tax events, seminars, workshops, and conferences. Learn from tax experts, network with professionals, and stay updated with Swiss tax law." />
        <meta property="og:title" content="Tax Events, Seminars & Workshops | Taxed GmbH" />
        <meta property="og:description" content="Join our tax events, seminars, workshops, and conferences. Learn from tax experts, network with professionals, and stay updated with Swiss tax law." />
        <link rel="canonical" href="https://taxed.ch/events" />
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
              Tax Events & Seminars
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Join our expert-led tax events, seminars, workshops, and conferences. 
              Learn from industry leaders, network with professionals, and stay updated with Swiss tax law.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                <Calendar className="inline-block mr-2 h-5 w-5" />
                View All Events
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-steel-blue transition-colors">
                <Bell className="inline-block mr-2 h-5 w-5" />
                Get Notified
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
                  placeholder="Search events..."
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

      {/* Events Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                  {/* Event Info */}
                  <div className="flex items-start space-x-4 mb-6 lg:mb-0 lg:w-1/3">
                    <div className="bg-steel-blue/10 p-3 rounded-xl">
                      <event.icon className="h-6 w-6 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(event.status)}`}>
                          {event.status.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(event.difficulty)}`}>
                          {event.difficulty}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-3">{event.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {event.date}
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {event.time}
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {event.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="lg:w-1/3">
                    <h4 className="font-semibold text-gray-900 mb-3">Event Details</h4>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Building className="h-4 w-4 text-green-500" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="h-4 w-4 text-purple-500" />
                        <span>{event.registered}/{event.capacity} registered</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Globe className="h-4 w-4 text-orange-500" />
                        <span>{event.language}</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-steel-blue mb-2">{event.price}</div>
                  </div>

                  {/* Features and Actions */}
                  <div className="lg:w-1/3">
                    <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
                    <ul className="space-y-2 mb-6">
                      {event.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-2">
                      <button className="w-full bg-steel-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-steel-blue/90 transition-colors">
                        <Calendar className="h-4 w-4 mr-2 inline-block" />
                        Register Now
                      </button>
                      <button className="w-full border-2 border-steel-blue text-steel-blue px-6 py-3 rounded-lg font-semibold hover:bg-steel-blue hover:text-white transition-colors">
                        <ExternalLink className="h-4 w-4 mr-2 inline-block" />
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

      {/* Featured Event */}
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
              Featured Event
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't miss our flagship tax conference featuring industry leaders and cutting-edge insights.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="lg:w-1/3">
                <div className="bg-steel-blue/10 p-6 rounded-xl mb-4">
                  <FileText className="h-12 w-12 text-steel-blue mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Swiss Tax Law Update 2025</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive update on the latest Swiss tax law changes and their impact on businesses and individuals.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    January 25, 2025
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Zurich, Switzerland
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                    CHF 299
                  </span>
                </div>
              </div>
              <div className="lg:w-1/3">
                <h4 className="font-semibold text-gray-900 mb-3">What You'll Learn</h4>
                <ul className="space-y-2">
                  {[
                    'Latest tax law changes',
                    'Impact analysis for businesses',
                    'Individual tax updates',
                    'Compliance requirements',
                    'Q&A with tax experts'
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
                  <div className="text-3xl font-bold text-steel-blue mb-2">CHF 299</div>
                  <div className="text-sm text-gray-600 mb-4">Early Bird Price</div>
                  <button className="w-full bg-steel-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-steel-blue/90 transition-colors mb-2">
                    Register Now
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
              Ready to Join Our Tax Events?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Don't miss out on valuable learning opportunities and networking events. 
              Register for our upcoming tax events and stay ahead of the curve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                <Calendar className="h-5 w-5 mr-2 inline-block" />
                View All Events
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-steel-blue transition-colors">
                <Bell className="h-5 w-5 mr-2 inline-block" />
                Get Event Notifications
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TaxEventsPage;
