import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  AlertTriangle, 
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
  Database as DatabaseIcon,
  Shield as ShieldIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  Zap as ZapIcon,
  GraduationCap as GraduationCapIcon,
  Scale,
  Gavel,
  Book,
  Clipboard,
  FileCheck,
  AlertCircle,
  TrendingDown,
  BarChart3,
  LineChart,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TaxCompliancePage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedComplianceType, setSelectedComplianceType] = useState('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('low');

  const sections = [
    { id: 'overview', name: 'Overview', icon: Target },
    { id: 'services', name: 'Compliance Services', icon: Shield },
    { id: 'requirements', name: 'Requirements', icon: FileText },
    { id: 'monitoring', name: 'Monitoring', icon: Activity },
    { id: 'reporting', name: 'Reporting', icon: BarChart3 },
    { id: 'training', name: 'Training', icon: GraduationCap }
  ];

  const complianceTypes = [
    { id: 'all', name: 'All Compliance Areas', icon: Shield },
    { id: 'individual', name: 'Individual Tax Compliance', icon: Users },
    { id: 'corporate', name: 'Corporate Tax Compliance', icon: Building },
    { id: 'vat', name: 'VAT Compliance', icon: Calculator },
    { id: 'international', name: 'International Compliance', icon: Globe },
    { id: 'regulatory', name: 'Regulatory Compliance', icon: Scale }
  ];

  const riskLevels = [
    { id: 'low', name: 'Low Risk', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
    { id: 'medium', name: 'Medium Risk', icon: AlertTriangle, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'high', name: 'High Risk', icon: AlertCircle, color: 'bg-red-100 text-red-800' }
  ];

  const complianceServices = [
    {
      id: 'compliance-assessment',
      title: 'Compliance Assessment',
      description: 'Comprehensive evaluation of your current tax compliance status',
      features: [
        'Current compliance status review',
        'Risk identification and analysis',
        'Gap analysis and recommendations',
        'Compliance improvement roadmap'
      ],
      price: 'CHF 800-2,500',
      duration: '2-4 weeks',
      icon: FileCheck
    },
    {
      id: 'ongoing-monitoring',
      title: 'Ongoing Compliance Monitoring',
      description: 'Continuous monitoring and management of tax compliance requirements',
      features: [
        'Regular compliance reviews',
        'Deadline tracking and reminders',
        'Regulatory change monitoring',
        'Proactive compliance management'
      ],
      price: 'CHF 300-800/month',
      duration: 'Ongoing',
      icon: Activity
    },
    {
      id: 'compliance-reporting',
      title: 'Compliance Reporting',
      description: 'Comprehensive reporting on compliance status and requirements',
      features: [
        'Monthly compliance reports',
        'Risk assessment reports',
        'Regulatory change summaries',
        'Compliance dashboard'
      ],
      price: 'CHF 200-500/report',
      duration: 'Monthly',
      icon: BarChart3
    },
    {
      id: 'compliance-training',
      title: 'Compliance Training',
      description: 'Training programs for staff on tax compliance requirements',
      features: [
        'Staff training sessions',
        'Compliance procedures training',
        'Regulatory updates training',
        'Best practices workshops'
      ],
      price: 'CHF 500-1,500/session',
      duration: 'As needed',
      icon: GraduationCap
    }
  ];

  const complianceRequirements = [
    {
      category: 'Individual Tax Compliance',
      requirements: [
        'Annual tax return filing',
        'Wealth tax declarations',
        'Pillar 3a contributions',
        'Real estate tax compliance',
        'International tax reporting'
      ],
      deadlines: ['March 31', 'Various', 'December 31', 'Various', 'Various'],
      icon: Users
    },
    {
      category: 'Corporate Tax Compliance',
      requirements: [
        'Corporate income tax returns',
        'VAT returns and payments',
        'Withholding tax compliance',
        'Transfer pricing documentation',
        'International tax reporting'
      ],
      deadlines: ['March 31', 'Monthly', 'Various', 'Various', 'Various'],
      icon: Building
    },
    {
      category: 'VAT Compliance',
      requirements: [
        'VAT registration and deregistration',
        'Monthly/quarterly VAT returns',
        'VAT payment obligations',
        'VAT record keeping',
        'VAT audit preparation'
      ],
      deadlines: ['Various', 'Monthly', 'Monthly', 'Ongoing', 'As needed'],
      icon: Calculator
    }
  ];

  const complianceSteps = [
    {
      step: 1,
      title: 'Compliance Assessment',
      description: 'Comprehensive evaluation of current compliance status',
      duration: '1-2 weeks',
      icon: FileCheck
    },
    {
      step: 2,
      title: 'Risk Analysis',
      description: 'Identification and analysis of compliance risks',
      duration: '1 week',
      icon: AlertTriangle
    },
    {
      step: 3,
      title: 'Action Plan Development',
      description: 'Development of compliance improvement plan',
      duration: '1 week',
      icon: Target
    },
    {
      step: 4,
      title: 'Implementation',
      description: 'Implementation of compliance measures',
      duration: '2-4 weeks',
      icon: Workflow
    },
    {
      step: 5,
      title: 'Monitoring & Reporting',
      description: 'Ongoing monitoring and reporting',
      duration: 'Ongoing',
      icon: Activity
    }
  ];

  const complianceBenefits = [
    {
      benefit: 'Reduced Risk',
      description: 'Minimize tax compliance risks and penalties',
      icon: Shield,
      color: 'text-green-600'
    },
    {
      benefit: 'Cost Savings',
      description: 'Avoid costly penalties and interest charges',
      icon: DollarSign,
      color: 'text-blue-600'
    },
    {
      benefit: 'Peace of Mind',
      description: 'Confidence in your tax compliance status',
      icon: Heart,
      color: 'text-purple-600'
    },
    {
      benefit: 'Efficiency',
      description: 'Streamlined compliance processes',
      icon: Zap,
      color: 'text-orange-600'
    }
  ];

  const complianceMetrics = [
    {
      metric: 'Compliance Rate',
      value: '99.8%',
      description: 'Average client compliance rate',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      metric: 'Penalty Reduction',
      value: '95%',
      description: 'Average penalty reduction achieved',
      icon: TrendingDown,
      color: 'text-blue-600'
    },
    {
      metric: 'Cost Savings',
      value: 'CHF 2.1M',
      description: 'Total client savings achieved',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      metric: 'Response Time',
      value: '24h',
      description: 'Average response time for compliance issues',
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Tax Compliance Services | Taxed GmbH - Swiss Tax Compliance Management</title>
        <meta name="description" content="Professional Swiss tax compliance services. Comprehensive compliance management, monitoring, and reporting. Ensure full compliance with Swiss tax regulations." />
        <meta property="og:title" content="Tax Compliance Services | Taxed GmbH" />
        <meta property="og:description" content="Professional Swiss tax compliance services. Comprehensive compliance management, monitoring, and reporting." />
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
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tax Compliance Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comprehensive Swiss tax compliance management. Ensure full compliance with all tax regulations through our expert compliance services and monitoring.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Full Compliance
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Activity className="w-4 h-4 mr-2" />
                Continuous Monitoring
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                Risk Reduction
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
                {/* Why Choose Our Compliance Services */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Why Choose Our Compliance Services?
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Expert Knowledge</h4>
                          <p className="text-gray-600">Deep understanding of Swiss tax compliance requirements</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Proactive Approach</h4>
                          <p className="text-gray-600">Prevent compliance issues before they occur</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Continuous Monitoring</h4>
                          <p className="text-gray-600">Ongoing compliance monitoring and management</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Cost Effective</h4>
                          <p className="text-gray-600">Avoid costly penalties and compliance issues</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Compliance Metrics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {complianceMetrics.map((metric, index) => (
                        <div key={index} className="text-center">
                          <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                          <div className="text-sm text-gray-600">{metric.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Compliance Benefits */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Compliance Benefits</h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    {complianceBenefits.map((benefit, index) => (
                      <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <benefit.icon className={`w-12 h-12 ${benefit.color} mx-auto mb-4`} />
                          <CardTitle className="text-lg">{benefit.benefit}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{benefit.description}</p>
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Compliance Services</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Comprehensive tax compliance services tailored to your specific needs and requirements.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {complianceServices.map((service) => (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <service.icon className="w-8 h-8 text-blue-600" />
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
                            <div className="text-lg font-bold text-blue-600">{service.price}</div>
                            <div className="text-sm text-gray-500">{service.duration}</div>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">
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

            {/* Requirements Section */}
            <TabsContent value="requirements">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Compliance Requirements</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Understanding Swiss tax compliance requirements across different areas and categories.
                  </p>
                </div>

                <div className="space-y-8">
                  {complianceRequirements.map((category, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <category.icon className="w-8 h-8 text-blue-600" />
                          <div>
                            <CardTitle className="text-xl">{category.category}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {category.requirements.map((requirement, reqIndex) => (
                            <div key={reqIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="font-medium">{requirement}</span>
                              </div>
                              <Badge variant="outline" className="text-blue-600 border-blue-200">
                                {category.deadlines[reqIndex]}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Monitoring Section */}
            <TabsContent value="monitoring">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Compliance Monitoring</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Continuous monitoring and management of your tax compliance status and requirements.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="text-center">
                    <CardHeader>
                      <Activity className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <CardTitle className="text-xl">Real-time Monitoring</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Continuous monitoring of compliance status and regulatory changes
                      </p>
                      <ul className="text-left space-y-2">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Automated compliance checks</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Deadline tracking</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Risk alerts</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardHeader>
                      <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <CardTitle className="text-xl">Compliance Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Comprehensive dashboard showing compliance status and metrics
                      </p>
                      <ul className="text-left space-y-2">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Compliance score</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Risk assessment</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Progress tracking</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardHeader>
                      <Bell className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <CardTitle className="text-xl">Alert System</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Proactive alerts and notifications for compliance issues
                      </p>
                      <ul className="text-left space-y-2">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Deadline reminders</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Risk notifications</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Update alerts</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            {/* Reporting Section */}
            <TabsContent value="reporting">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Compliance Reporting</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Comprehensive reporting on compliance status, requirements, and regulatory changes.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="w-6 h-6 text-blue-600" />
                        <span>Monthly Compliance Reports</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Compliance status summary</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Risk assessment updates</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Regulatory change summaries</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Action items and recommendations</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="w-6 h-6 text-blue-600" />
                        <span>Compliance Analytics</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Compliance trend analysis</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Performance metrics</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Benchmark comparisons</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Predictive analytics</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            {/* Training Section */}
            <TabsContent value="training">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Compliance Training</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Comprehensive training programs to ensure your team understands tax compliance requirements.
                  </p>
                </div>

                <div className="space-y-8">
                  {complianceSteps.map((step, index) => (
                    <div key={step.step} className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h4 className="text-xl font-semibold text-gray-900">{step.title}</h4>
                          <Badge variant="outline" className="text-blue-600 border-blue-200">
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
          </Tabs>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Need Compliance Support?</h3>
              <p className="text-xl opacity-90">
                Ensure full compliance with Swiss tax regulations. Get expert compliance management.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Phone className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Compliance Hotline</h4>
                <p className="text-sm opacity-90">+41 32 123 4567</p>
              </div>
              <div className="text-center">
                <Mail className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Email Support</h4>
                <p className="text-sm opacity-90">compliance@taxed.ch</p>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Response Time</h4>
                <p className="text-sm opacity-90">24 hours or less</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Compliance Support
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TaxCompliancePage;
