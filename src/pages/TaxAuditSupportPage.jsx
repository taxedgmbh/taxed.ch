import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Target,
  Users,
  Building,
  FileText,
  Calculator,
  Globe,
  CreditCard,
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
  PieChart,
  TrendingUp,
  DollarSign,
  Download,
  Bell,
  Star,
  Eye,
  Share2,
  ExternalLink,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock3,
  Building2,
  Headphones,
  Gift,
  Database,
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
  Fish,
  Bug,
  Virus,
  Database as DatabaseIcon,
  Shield as ShieldIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  Zap as ZapIcon,
  GraduationCap as GraduationCapIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TaxAuditSupportPage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedAuditType, setSelectedAuditType] = useState('all');
  const [selectedUrgency, setSelectedUrgency] = useState('standard');

  const sections = [
    { id: 'overview', name: 'Overview', icon: Target },
    { id: 'services', name: 'Audit Services', icon: Shield },
    { id: 'process', name: 'Our Process', icon: Workflow },
    { id: 'support', name: 'Support Types', icon: Headphones },
    { id: 'preparation', name: 'Preparation', icon: BookOpen },
    { id: 'representation', name: 'Representation', icon: Users }
  ];

  const auditTypes = [
    { id: 'all', name: 'All Audit Types', icon: Shield },
    { id: 'individual', name: 'Individual Tax Audit', icon: Users },
    { id: 'corporate', name: 'Corporate Tax Audit', icon: Building },
    { id: 'vat', name: 'VAT Audit', icon: Calculator },
    { id: 'international', name: 'International Audit', icon: Globe },
    { id: 'compliance', name: 'Compliance Audit', icon: CheckCircle }
  ];

  const urgencyLevels = [
    { id: 'standard', name: 'Standard (2-4 weeks)', icon: Clock, color: 'bg-blue-100 text-blue-800' },
    { id: 'urgent', name: 'Urgent (1-2 weeks)', icon: Zap, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'critical', name: 'Critical (24-48 hours)', icon: AlertTriangle, color: 'bg-red-100 text-red-800' }
  ];

  const auditServices = [
    {
      id: 'pre-audit',
      title: 'Pre-Audit Preparation',
      description: 'Comprehensive preparation before the audit begins',
      features: [
        'Document organization and review',
        'Potential issue identification',
        'Strategy development',
        'Client briefing and preparation'
      ],
      price: 'CHF 500-1,500',
      duration: '1-2 weeks',
      icon: BookOpen
    },
    {
      id: 'audit-representation',
      title: 'Audit Representation',
      description: 'Professional representation during the audit process',
      features: [
        'Direct communication with tax authorities',
        'Document presentation and explanation',
        'Issue resolution and negotiation',
        'Real-time support and guidance'
      ],
      price: 'CHF 200-400/hour',
      duration: 'As needed',
      icon: Users
    },
    {
      id: 'post-audit',
      title: 'Post-Audit Support',
      description: 'Comprehensive support after audit completion',
      features: [
        'Audit result analysis',
        'Appeal preparation if needed',
        'Future compliance planning',
        'Ongoing support and monitoring'
      ],
      price: 'CHF 300-800',
      duration: '1-3 weeks',
      icon: CheckCircle
    },
    {
      id: 'emergency',
      title: 'Emergency Audit Support',
      description: 'Immediate support for urgent audit situations',
      features: [
        '24/7 emergency consultation',
        'Rapid document preparation',
        'Immediate representation',
        'Crisis management'
      ],
      price: 'CHF 500-1,000/hour',
      duration: '24-48 hours',
      icon: Zap
    }
  ];

  const supportTypes = [
    {
      category: 'Individual Tax Audits',
      services: [
        'Personal income tax audit support',
        'Wealth tax audit assistance',
        'Pillar 3a audit representation',
        'Real estate tax audit support'
      ],
      icon: Users
    },
    {
      category: 'Corporate Tax Audits',
      services: [
        'Corporate income tax audit support',
        'VAT audit representation',
        'Transfer pricing audit assistance',
        'International tax audit support'
      ],
      icon: Building
    },
    {
      category: 'Specialized Audits',
      services: [
        'Cross-border tax audit support',
        'Expat tax audit assistance',
        'Business tax audit representation',
        'Compliance audit support'
      ],
      icon: Globe
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Initial Consultation',
      description: 'Comprehensive assessment of your audit situation',
      duration: '1-2 hours',
      icon: Phone
    },
    {
      step: 2,
      title: 'Document Review',
      description: 'Thorough analysis of all relevant documents',
      duration: '2-5 days',
      icon: FileText
    },
    {
      step: 3,
      title: 'Strategy Development',
      description: 'Development of comprehensive audit defense strategy',
      duration: '1-3 days',
      icon: Target
    },
    {
      step: 4,
      title: 'Audit Representation',
      description: 'Professional representation during audit proceedings',
      duration: 'As required',
      icon: Users
    },
    {
      step: 5,
      title: 'Resolution & Follow-up',
      description: 'Resolution of issues and ongoing support',
      duration: '1-4 weeks',
      icon: CheckCircle
    }
  ];

  const successStories = [
    {
      client: 'International Tech Company',
      issue: 'VAT audit with CHF 2.3M in questioned deductions',
      result: 'Reduced liability by 85% to CHF 345,000',
      savings: 'CHF 1,955,000',
      icon: Building
    },
    {
      client: 'Expatriate Executive',
      issue: 'Complex international tax audit',
      result: 'Complete resolution with no additional tax',
      savings: 'CHF 120,000',
      icon: Users
    },
    {
      client: 'Swiss Manufacturing Firm',
      issue: 'Transfer pricing audit',
      result: 'Negotiated favorable settlement',
      savings: 'CHF 890,000',
      icon: Globe
    }
  ];

  return (
    <>
      <Helmet>
        <title>Tax Audit Support Services | Taxed GmbH - Professional Swiss Tax Audit Assistance</title>
        <meta name="description" content="Expert Swiss tax audit support services. Professional representation, pre-audit preparation, and post-audit assistance. Protect your interests with our experienced tax audit specialists." />
        <meta property="og:title" content="Tax Audit Support Services | Taxed GmbH" />
        <meta property="og:description" content="Expert Swiss tax audit support services. Professional representation, pre-audit preparation, and post-audit assistance." />
      </Helmet>

      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-red-100 rounded-full">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tax Audit Support Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Professional Swiss tax audit support and representation. Protect your interests with our experienced tax audit specialists who understand Swiss tax law and audit procedures.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Professional Representation
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                24/7 Emergency Support
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                Proven Track Record
              </Badge>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full mb-12">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-8 bg-white shadow-lg rounded-xl p-2">
              {sections.map((section) => (
                <TabsTrigger 
                  key={section.id} 
                  value={section.id} 
                  className="flex items-center space-x-2 text-sm font-medium"
                >
                  <section.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{section.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Overview Section */}
            <TabsContent value="overview">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-12"
              >
                {/* Why Choose Our Audit Support */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Why Choose Our Tax Audit Support?
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Expert Knowledge</h4>
                          <p className="text-gray-600">Deep understanding of Swiss tax law and audit procedures</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Proven Results</h4>
                          <p className="text-gray-600">Track record of successful audit resolutions</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">24/7 Support</h4>
                          <p className="text-gray-600">Emergency support when you need it most</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Cost Effective</h4>
                          <p className="text-gray-600">Transparent pricing with no hidden fees</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Audit Support Statistics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-600">95%</div>
                        <div className="text-sm text-gray-600">Success Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-600">CHF 2.3M</div>
                        <div className="text-sm text-gray-600">Average Savings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-600">24h</div>
                        <div className="text-sm text-gray-600">Response Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-600">500+</div>
                        <div className="text-sm text-gray-600">Audits Handled</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Success Stories */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Success Stories</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {successStories.map((story, index) => (
                      <Card key={index} className="border-l-4 border-l-red-500">
                        <CardHeader>
                          <div className="flex items-center space-x-3">
                            <story.icon className="w-8 h-8 text-red-600" />
                            <div>
                              <CardTitle className="text-lg">{story.client}</CardTitle>
                              <CardDescription>{story.issue}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Result:</span>
                              <span className="text-sm font-semibold text-green-600">{story.result}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Savings:</span>
                              <span className="text-sm font-bold text-red-600">{story.savings}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Services Section */}
            <TabsContent value="services">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Audit Support Services</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Comprehensive tax audit support services tailored to your specific needs and situation.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {auditServices.map((service) => (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <service.icon className="w-8 h-8 text-red-600" />
                          <div>
                            <CardTitle className="text-xl">{service.title}</CardTitle>
                            <CardDescription>{service.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 mb-4">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex justify-between items-center pt-4 border-t">
                          <div>
                            <div className="text-lg font-bold text-red-600">{service.price}</div>
                            <div className="text-sm text-gray-500">{service.duration}</div>
                          </div>
                          <Button className="bg-red-600 hover:bg-red-700">
                            Learn More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Process Section */}
            <TabsContent value="process">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Audit Support Process</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    A systematic approach to protecting your interests during tax audits.
                  </p>
                </div>

                <div className="space-y-8">
                  {processSteps.map((step, index) => (
                    <div key={step.step} className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-red-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h4 className="text-xl font-semibold text-gray-900">{step.title}</h4>
                          <Badge variant="outline" className="text-red-600 border-red-200">
                            {step.duration}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Support Types Section */}
            <TabsContent value="support">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Types of Audit Support</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Specialized support for different types of tax audits and situations.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {supportTypes.map((type, index) => (
                    <Card key={index} className="text-center">
                      <CardHeader>
                        <type.icon className="w-12 h-12 text-red-600 mx-auto mb-4" />
                        <CardTitle className="text-xl">{type.category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {type.services.map((service, serviceIndex) => (
                            <li key={serviceIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-gray-600">{service}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Preparation Section */}
            <TabsContent value="preparation">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Audit Preparation Checklist</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Essential steps to prepare for a tax audit and protect your interests.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BookOpen className="w-6 h-6 text-red-600" />
                        <span>Document Preparation</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Organize all tax returns and supporting documents</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Gather bank statements and financial records</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Prepare expense receipts and invoices</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Review correspondence with tax authorities</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="w-6 h-6 text-red-600" />
                        <span>Legal Preparation</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Understand your rights and obligations</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Prepare for potential questions and scenarios</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Review relevant tax law and regulations</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Consider potential outcomes and strategies</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            {/* Representation Section */}
            <TabsContent value="representation">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Audit Representation</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Expert representation during tax audits to protect your interests and achieve the best possible outcome.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-xl">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">What We Do</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                          <span>Direct communication with tax authorities</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                          <span>Document presentation and explanation</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                          <span>Issue resolution and negotiation</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                          <span>Real-time support and guidance</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Benefits</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-3">
                          <Star className="w-5 h-5 text-yellow-600 mt-1" />
                          <span>Reduced stress and anxiety</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <Star className="w-5 h-5 text-yellow-600 mt-1" />
                          <span>Professional expertise and experience</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <Star className="w-5 h-5 text-yellow-600 mt-1" />
                          <span>Better negotiation outcomes</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <Star className="w-5 h-5 text-yellow-600 mt-1" />
                          <span>Time and cost savings</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Need Immediate Audit Support?</h3>
              <p className="text-xl opacity-90">
                Don't face a tax audit alone. Get professional support and representation.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Phone className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Emergency Hotline</h4>
                <p className="text-sm opacity-90">+41 32 123 4567</p>
              </div>
              <div className="text-center">
                <Mail className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Email Support</h4>
                <p className="text-sm opacity-90">audit@taxed.ch</p>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Response Time</h4>
                <p className="text-sm opacity-90">24 hours or less</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                Get Emergency Support
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TaxAuditSupportPage;
