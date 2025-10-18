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
  Activity,
  RefreshCw,
  RotateCcw,
  Undo,
  Redo,
  RotateCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TaxRecoveryPage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedRecoveryType, setSelectedRecoveryType] = useState('all');
  const [selectedAmount, setSelectedAmount] = useState('small');

  const sections = [
    { id: 'overview', name: 'Overview', icon: Target },
    { id: 'services', name: 'Recovery Services', icon: Shield },
    { id: 'process', name: 'Our Process', icon: Workflow },
    { id: 'success', name: 'Success Stories', icon: Star },
    { id: 'fees', name: 'Fees & Costs', icon: DollarSign },
    { id: 'contact', name: 'Get Started', icon: Phone }
  ];

  const recoveryTypes = [
    { id: 'all', name: 'All Recovery Types', icon: Shield },
    { id: 'withholding', name: 'Withholding Tax Recovery', icon: CreditCard },
    { id: 'overpayment', name: 'Tax Overpayment Recovery', icon: DollarSign },
    { id: 'refund', name: 'Tax Refund Recovery', icon: RotateCcw },
    { id: 'penalty', name: 'Penalty Recovery', icon: AlertTriangle },
    { id: 'interest', name: 'Interest Recovery', icon: TrendingUp }
  ];

  const amountRanges = [
    { id: 'small', name: 'Under CHF 10,000', icon: DollarSign, color: 'bg-green-100 text-green-800' },
    { id: 'medium', name: 'CHF 10,000 - 50,000', icon: TrendingUp, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'large', name: 'Over CHF 50,000', icon: BarChart3, color: 'bg-red-100 text-red-800' }
  ];

  const recoveryServices = [
    {
      id: 'withholding-recovery',
      title: 'Withholding Tax Recovery',
      description: 'Recovery of Swiss withholding tax for non-residents',
      features: [
        'Quellensteuer refund applications',
        'Double taxation relief',
        'International tax treaty benefits',
        'Cross-border tax optimization'
      ],
      price: '15% of recovered amount',
      duration: '3-6 months',
      icon: CreditCard
    },
    {
      id: 'overpayment-recovery',
      title: 'Tax Overpayment Recovery',
      description: 'Recovery of overpaid taxes and penalties',
      features: [
        'Overpayment identification',
        'Refund application preparation',
        'Appeal and objection procedures',
        'Interest calculation and recovery'
      ],
      price: '20% of recovered amount',
      duration: '2-4 months',
      icon: DollarSign
    },
    {
      id: 'penalty-recovery',
      title: 'Penalty Recovery',
      description: 'Recovery of incorrectly imposed penalties',
      features: [
        'Penalty assessment review',
        'Appeal preparation and filing',
        'Negotiation with tax authorities',
        'Penalty reduction strategies'
      ],
      price: '25% of recovered amount',
      duration: '1-3 months',
      icon: AlertTriangle
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Initial Assessment',
      description: 'Review your tax situation and recovery potential',
      duration: '1-2 days',
      icon: Search
    },
    {
      step: 2,
      title: 'Document Preparation',
      description: 'Gather and prepare all necessary documentation',
      duration: '1-2 weeks',
      icon: FileText
    },
    {
      step: 3,
      title: 'Application Filing',
      description: 'File recovery applications with tax authorities',
      duration: '1-3 days',
      icon: Send
    },
    {
      step: 4,
      title: 'Follow-up & Negotiation',
      description: 'Monitor progress and negotiate with authorities',
      duration: '2-6 months',
      icon: Users
    },
    {
      step: 5,
      title: 'Recovery & Payment',
      description: 'Secure recovery and process payment',
      duration: '1-2 weeks',
      icon: CheckCircle
    }
  ];

  const successStories = [
    {
      client: 'International Executive',
      issue: 'CHF 45,000 in overpaid withholding tax',
      result: 'Full recovery of CHF 45,000',
      timeline: '4 months',
      icon: Users
    },
    {
      client: 'Swiss Corporation',
      issue: 'CHF 120,000 in penalty charges',
      result: 'Reduced to CHF 15,000 (87% reduction)',
      timeline: '3 months',
      icon: Building
    },
    {
      client: 'Expatriate Family',
      issue: 'CHF 25,000 in tax overpayments',
      result: 'Full recovery with interest',
      timeline: '5 months',
      icon: Globe
    }
  ];

  return (
    <>
      <Helmet>
        <title>Tax Recovery Services | Taxed GmbH - Swiss Tax Recovery Specialists</title>
        <meta name="description" content="Expert Swiss tax recovery services. Recover overpaid taxes, penalties, and withholding tax. Professional tax recovery specialists with proven track record." />
        <meta property="og:title" content="Tax Recovery Services | Taxed GmbH" />
        <meta property="og:description" content="Expert Swiss tax recovery services. Recover overpaid taxes, penalties, and withholding tax." />
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
              <div className="p-3 bg-green-100 rounded-full">
                <RotateCcw className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tax Recovery Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Expert Swiss tax recovery services. Recover overpaid taxes, penalties, and withholding tax with our proven recovery specialists.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <RotateCcw className="w-4 h-4 mr-2" />
                Tax Recovery
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <DollarSign className="w-4 h-4 mr-2" />
                No Win, No Fee
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                Proven Results
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
                {/* Why Choose Our Recovery Services */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Why Choose Our Tax Recovery Services?
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">No Win, No Fee</h4>
                          <p className="text-gray-600">We only get paid when you recover money</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Expert Knowledge</h4>
                          <p className="text-gray-600">Deep understanding of Swiss tax recovery procedures</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Proven Track Record</h4>
                          <p className="text-gray-600">Successfully recovered millions for our clients</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Transparent Process</h4>
                          <p className="text-gray-600">Clear communication throughout the recovery process</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Recovery Statistics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">95%</div>
                        <div className="text-sm text-gray-600">Success Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">CHF 2.8M</div>
                        <div className="text-sm text-gray-600">Total Recovered</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">4.2</div>
                        <div className="text-sm text-gray-600">Months Average</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">200+</div>
                        <div className="text-sm text-gray-600">Cases Handled</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Success Stories */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Success Stories</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {successStories.map((story, index) => (
                      <Card key={index} className="border-l-4 border-l-green-500">
                        <CardHeader>
                          <div className="flex items-center space-x-3">
                            <story.icon className="w-8 h-8 text-green-600" />
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
                              <span className="text-sm text-gray-600">Timeline:</span>
                              <span className="text-sm font-bold text-green-600">{story.timeline}</span>
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Recovery Services</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Comprehensive tax recovery services for various types of tax overpayments and penalties.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {recoveryServices.map((service) => (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <service.icon className="w-8 h-8 text-green-600" />
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
                            <div className="text-lg font-bold text-green-600">{service.price}</div>
                            <div className="text-sm text-gray-500">{service.duration}</div>
                          </div>
                          <Button className="bg-green-600 hover:bg-green-700">
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Recovery Process</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    A systematic approach to maximizing your tax recovery potential.
                  </p>
                </div>

                <div className="space-y-8">
                  {processSteps.map((step, index) => (
                    <div key={step.step} className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h4 className="text-xl font-semibold text-gray-900">{step.title}</h4>
                          <Badge variant="outline" className="text-green-600 border-green-200">
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

            {/* Success Section */}
            <TabsContent value="success">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Recovery Success Stories</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Real examples of successful tax recoveries for our clients.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {successStories.map((story, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <story.icon className="w-8 h-8 text-green-600" />
                          <div>
                            <CardTitle className="text-lg">{story.client}</CardTitle>
                            <CardDescription>{story.issue}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Recovery Result:</span>
                            <span className="text-sm font-semibold text-green-600">{story.result}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Timeline:</span>
                            <span className="text-sm font-bold text-green-600">{story.timeline}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Fees Section */}
            <TabsContent value="fees">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Fees & Costs</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Transparent pricing with no upfront costs. We only get paid when you recover money.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="text-center">
                    <CardHeader>
                      <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <CardTitle className="text-xl">No Win, No Fee</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        We only charge if we successfully recover money for you
                      </p>
                      <div className="text-2xl font-bold text-green-600">0% upfront</div>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardHeader>
                      <Percent className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <CardTitle className="text-xl">Success Fee</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Percentage of recovered amount only
                      </p>
                      <div className="text-2xl font-bold text-green-600">15-25%</div>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardHeader>
                      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <CardTitle className="text-xl">Transparent</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        No hidden fees or surprise charges
                      </p>
                      <div className="text-2xl font-bold text-green-600">100% transparent</div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            {/* Contact Section */}
            <TabsContent value="contact">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Your Recovery Process</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Get a free assessment of your tax recovery potential. No obligation, no upfront costs.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Free Recovery Assessment</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Free initial consultation</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Recovery potential assessment</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>No obligation to proceed</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Confidential consultation</span>
                        </li>
                      </ul>
                    </div>
                    <div className="text-center">
                      <Button size="lg" className="bg-green-600 hover:bg-green-700 mb-4">
                        Get Free Assessment
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                      <p className="text-sm text-gray-600">
                        Or call us directly: +41 32 123 4567
                      </p>
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
            className="mt-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Ready to Recover Your Taxes?</h3>
              <p className="text-xl opacity-90">
                Get a free assessment of your tax recovery potential. No win, no fee.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Phone className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Recovery Hotline</h4>
                <p className="text-sm opacity-90">+41 32 123 4567</p>
              </div>
              <div className="text-center">
                <Mail className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Email Support</h4>
                <p className="text-sm opacity-90">recovery@taxed.ch</p>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Response Time</h4>
                <p className="text-sm opacity-90">24 hours or less</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Start Recovery Process
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TaxRecoveryPage;
