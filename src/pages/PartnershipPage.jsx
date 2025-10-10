import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target,
  CheckCircle,
  AlertTriangle,
  Clock,
  Building,
  Globe,
  Briefcase,
  Award,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Download,
  ExternalLink,
  Heart,
  Zap,
  Shield,
  TrendingUp,
  DollarSign,
  PieChart,
  BarChart3,
  LineChart,
  Activity,
  Lock,
  Eye,
  Share2,
  Bell,
  Gift,
  Headphones,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Rocket,
  Target as TargetIcon,
  Users as UsersIcon,
  Building as BuildingIcon,
  Globe as GlobeIcon,
  Briefcase as BriefcaseIcon,
  Award as AwardIcon,
  Star as StarIcon,
  Heart as HeartIcon,
  Zap as ZapIcon,
  Shield as ShieldIcon,
  TrendingUp as TrendingUpIcon,
  DollarSign as DollarSignIcon,
  PieChart as PieChartIcon,
  BarChart3 as BarChart3Icon,
  LineChart as LineChartIcon,
  Activity as ActivityIcon,
  Lock as LockIcon,
  Eye as EyeIcon,
  Share2 as Share2Icon,
  Bell as BellIcon,
  Gift as GiftIcon,
  Headphones as HeadphonesIcon,
  BookOpen as BookOpenIcon,
  GraduationCap as GraduationCapIcon,
  Lightbulb as LightbulbIcon,
  Rocket as RocketIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PartnershipPage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedPartnershipType, setSelectedPartnershipType] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const sections = [
    { id: 'overview', name: 'Overview', icon: Target },
    { id: 'opportunities', name: 'Opportunities', icon: Users },
    { id: 'benefits', name: 'Benefits', icon: Star },
    { id: 'requirements', name: 'Requirements', icon: CheckCircle },
    { id: 'process', name: 'Process', icon: Workflow },
    { id: 'contact', name: 'Get Started', icon: Phone }
  ];

  const partnershipTypes = [
    { id: 'all', name: 'All Partnership Types', icon: Users },
    { id: 'referral', name: 'Referral Partnership', icon: Users },
    { id: 'strategic', name: 'Strategic Partnership', icon: Building },
    { id: 'technology', name: 'Technology Partnership', icon: Globe },
    { id: 'affiliate', name: 'Affiliate Partnership', icon: Briefcase },
    { id: 'joint-venture', name: 'Joint Venture', icon: Award }
  ];

  const industries = [
    { id: 'all', name: 'All Industries', icon: Building },
    { id: 'finance', name: 'Finance & Banking', icon: DollarSign },
    { id: 'technology', name: 'Technology', icon: Globe },
    { id: 'consulting', name: 'Consulting', icon: Briefcase },
    { id: 'legal', name: 'Legal Services', icon: Shield },
    { id: 'accounting', name: 'Accounting', icon: Calculator }
  ];

  const partnershipOpportunities = [
    {
      id: 'referral-partnership',
      title: 'Referral Partnership',
      description: 'Earn commissions by referring clients to our tax services',
      features: [
        '15% commission on first-year fees',
        'Ongoing residual commissions',
        'Marketing support and materials',
        'Dedicated partnership manager'
      ],
      requirements: [
        'Professional network in Switzerland',
        'Minimum 5 referrals per year',
        'Maintain professional standards',
        'Complete partnership training'
      ],
      benefits: [
        'Additional revenue stream',
        'Enhanced client services',
        'Professional development',
        'Network expansion'
      ],
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: 'strategic-partnership',
      title: 'Strategic Partnership',
      description: 'Deep collaboration on joint projects and client services',
      features: [
        'Joint service development',
        'Shared client relationships',
        'Cross-referral agreements',
        'Collaborative marketing'
      ],
      requirements: [
        'Complementary service offerings',
        'Established market presence',
        'Shared values and standards',
        'Long-term commitment'
      ],
      benefits: [
        'Expanded service portfolio',
        'Increased market reach',
        'Shared resources and expertise',
        'Enhanced competitive position'
      ],
      icon: Building,
      color: 'text-green-600'
    },
    {
      id: 'technology-partnership',
      title: 'Technology Partnership',
      description: 'Integration and collaboration on tax technology solutions',
      features: [
        'API integrations',
        'Technology sharing',
        'Joint product development',
        'Technical support'
      ],
      requirements: [
        'Technology expertise',
        'Compatible systems',
        'Security standards compliance',
        'Development capabilities'
      ],
      benefits: [
        'Enhanced technology offerings',
        'Improved efficiency',
        'Competitive advantage',
        'Innovation opportunities'
      ],
      icon: Globe,
      color: 'text-purple-600'
    }
  ];

  const partnershipBenefits = [
    {
      benefit: 'Revenue Growth',
      description: 'Increase your revenue through partnership commissions and referrals',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      benefit: 'Client Expansion',
      description: 'Access new clients through our established network',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      benefit: 'Service Enhancement',
      description: 'Enhance your service offerings with our tax expertise',
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      benefit: 'Market Position',
      description: 'Strengthen your market position through strategic partnerships',
      icon: Award,
      color: 'text-purple-600'
    }
  ];

  const partnershipProcess = [
    {
      step: 1,
      title: 'Initial Discussion',
      description: 'Explore partnership opportunities and alignment',
      duration: '1-2 weeks',
      icon: Phone
    },
    {
      step: 2,
      title: 'Partnership Proposal',
      description: 'Develop customized partnership proposal',
      duration: '1-2 weeks',
      icon: FileText
    },
    {
      step: 3,
      title: 'Agreement Negotiation',
      description: 'Negotiate terms and finalize partnership agreement',
      duration: '2-4 weeks',
      icon: Users
    },
    {
      step: 4,
      title: 'Implementation',
      description: 'Launch partnership and begin collaboration',
      duration: '1-2 weeks',
      icon: Rocket
    },
    {
      step: 5,
      title: 'Ongoing Support',
      description: 'Continuous partnership management and support',
      duration: 'Ongoing',
      icon: Headphones
    }
  ];

  const successStories = [
    {
      partner: 'Swiss Financial Advisory',
      type: 'Referral Partnership',
      result: 'CHF 150,000 in additional revenue',
      timeline: '12 months',
      icon: Building
    },
    {
      partner: 'International Law Firm',
      type: 'Strategic Partnership',
      result: '50% increase in client base',
      timeline: '18 months',
      icon: Globe
    },
    {
      partner: 'Technology Solutions Provider',
      type: 'Technology Partnership',
      result: 'Streamlined tax processes',
      timeline: '6 months',
      icon: Globe
    }
  ];

  return (
    <>
      <Helmet>
        <title>Partnership Opportunities | Taxed GmbH - Strategic Tax Consulting Partnerships</title>
        <meta name="description" content="Join our network of strategic partners. Referral partnerships, strategic collaborations, and technology integrations. Grow your business with Taxed GmbH." />
        <meta property="og:title" content="Partnership Opportunities | Taxed GmbH" />
        <meta property="og:description" content="Join our network of strategic partners. Referral partnerships, strategic collaborations, and technology integrations." />
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
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Partnership Opportunities
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join our network of strategic partners. Grow your business through referral partnerships, strategic collaborations, and technology integrations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Strategic Partnerships
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <TrendingUp className="w-4 h-4 mr-2" />
                Revenue Growth
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Network Expansion
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
                {/* Why Partner With Us */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Why Partner With Taxed GmbH?
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Established Expertise</h4>
                          <p className="text-gray-600">Proven track record in Swiss tax consulting</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Growing Client Base</h4>
                          <p className="text-gray-600">Expanding network of satisfied clients</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Technology Integration</h4>
                          <p className="text-gray-600">Modern technology solutions and processes</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Partnership Support</h4>
                          <p className="text-gray-600">Dedicated support for all partners</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Partnership Statistics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">50+</div>
                        <div className="text-sm text-gray-600">Active Partners</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">CHF 2.5M</div>
                        <div className="text-sm text-gray-600">Partner Revenue</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">95%</div>
                        <div className="text-sm text-gray-600">Partner Satisfaction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">15%</div>
                        <div className="text-sm text-gray-600">Average Commission</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Partnership Benefits */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Partnership Benefits</h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    {partnershipBenefits.map((benefit, index) => (
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

            {/* Opportunities Section */}
            <TabsContent value="opportunities">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Partnership Opportunities</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Various partnership opportunities tailored to your business needs and goals.
                  </p>
                </div>

                <div className="space-y-8">
                  {partnershipOpportunities.map((opportunity) => (
                    <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <opportunity.icon className={`w-8 h-8 ${opportunity.color}`} />
                          <div>
                            <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                            <CardDescription>{opportunity.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                            <ul className="space-y-1">
                              {opportunity.features.map((feature, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span className="text-sm text-gray-600">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                            <ul className="space-y-1">
                              {opportunity.requirements.map((requirement, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                                  <span className="text-sm text-gray-600">{requirement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Benefits</h4>
                            <ul className="space-y-1">
                              {opportunity.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                  <Star className="w-4 h-4 text-yellow-600" />
                                  <span className="text-sm text-gray-600">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Benefits Section */}
            <TabsContent value="benefits">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Partnership Benefits</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Comprehensive benefits for all our partners across different partnership types.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <DollarSign className="w-6 h-6 text-green-600" />
                        <span>Financial Benefits</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Competitive commission rates</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Residual income opportunities</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Performance bonuses</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Revenue sharing programs</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="w-6 h-6 text-blue-600" />
                        <span>Business Benefits</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Access to our client network</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Enhanced service offerings</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Market expansion opportunities</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Competitive advantage</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Partnership Requirements</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    General requirements for all partnership types and specific requirements for each opportunity.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="w-6 h-6 text-blue-600" />
                        <span>General Requirements</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Professional business license</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Established market presence</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Professional references</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Compliance with regulations</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="w-6 h-6 text-purple-600" />
                        <span>Specific Requirements</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Minimum referral targets</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Partnership training completion</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Regular reporting and communication</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Quality standards maintenance</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Partnership Process</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Simple and transparent process to become our partner.
                  </p>
                </div>

                <div className="space-y-8">
                  {partnershipProcess.map((step, index) => (
                    <div key={step.step} className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-purple-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h4 className="text-xl font-semibold text-gray-900">{step.title}</h4>
                          <Badge variant="outline" className="text-purple-600 border-purple-200">
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

            {/* Contact Section */}
            <TabsContent value="contact">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Your Partnership</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Ready to become our partner? Get started with a free consultation.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-xl">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Partnership Consultation</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Free initial consultation</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Partnership opportunity assessment</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>Customized partnership proposal</span>
                        </li>
                        <li className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span>No obligation to proceed</span>
                        </li>
                      </ul>
                    </div>
                    <div className="text-center">
                      <Button size="lg" className="bg-purple-600 hover:bg-purple-700 mb-4">
                        Start Partnership Process
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
            className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Ready to Partner With Us?</h3>
              <p className="text-xl opacity-90">
                Join our network of successful partners and grow your business.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Phone className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Partnership Hotline</h4>
                <p className="text-sm opacity-90">+41 32 123 4567</p>
              </div>
              <div className="text-center">
                <Mail className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Email Support</h4>
                <p className="text-sm opacity-90">partnerships@taxed.ch</p>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Response Time</h4>
                <p className="text-sm opacity-90">24 hours or less</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Start Partnership Process
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PartnershipPage;
