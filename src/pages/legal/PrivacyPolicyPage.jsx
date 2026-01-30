import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Eye, 
  Lock, 
  Database, 
  Users, 
  Globe, 
  Mail, 
  Phone,
  Cookie,
  Settings,
  CheckCircle,
  AlertTriangle,
  FileText,
  Scale,
  Clock,
  MessageSquare,
  Smartphone,
  Server,
  Key,
  Download,
  Trash2,
  Edit,
  Send,
  UserCheck,
  Bell,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: Shield },
    { id: 'data-collection', title: 'Data Collection', icon: Database },
    { id: 'data-usage', title: 'Data Usage', icon: Eye },
    { id: 'data-sharing', title: 'Data Sharing', icon: Users },
    { id: 'data-security', title: 'Data Security', icon: Lock },
    { id: 'your-rights', title: 'Your Rights', icon: UserCheck },
    { id: 'cookies', title: 'Cookies', icon: Cookie },
    { id: 'whatsapp', title: 'WhatsApp API', icon: MessageSquare },
    { id: 'contact', title: 'Contact Us', icon: Phone }
  ];

  const getIcon = (sectionId) => {
    const section = sections.find(s => s.id === sectionId);
    return section ? section.icon : Shield;
  };

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Taxed GmbH | GDPR & WhatsApp API Compliant</title>
        <meta name="description" content="Comprehensive privacy policy for Taxed GmbH covering GDPR compliance, WhatsApp API usage, data protection, and your rights. Swiss tax consulting with full transparency." />
        <meta name="keywords" content="privacy policy, GDPR, WhatsApp API, data protection, Swiss law, personal data, Taxed GmbH, transparency" />
        <link rel="canonical" href="https://taxed.ch/privacy-policy" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Privacy Policy - Taxed GmbH | GDPR & WhatsApp API Compliant" />
        <meta property="og:description" content="Comprehensive privacy policy covering GDPR compliance, WhatsApp API usage, and data protection for Swiss tax consulting services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://taxed.ch/privacy-policy" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-steel-blue to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
              Your privacy matters. Learn how we protect your data in compliance with GDPR, Swiss law, and WhatsApp API requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-200">
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                GDPR Compliant
              </span>
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                WhatsApp API Compliant
              </span>
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Swiss Law Compliant
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 ${
                    activeSection === section.id 
                      ? 'bg-steel-blue text-white' 
                      : 'text-steel-blue border-steel-blue hover:bg-steel-blue hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {section.title}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {activeSection === 'overview' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Shield className="h-6 w-6 text-steel-blue mr-3" />
                    Privacy Policy Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-gray max-w-none">
                    <p className="text-lg text-gray-700 mb-6">
                      At Taxed GmbH, we are committed to protecting your privacy and ensuring the security of your personal data. 
                      This comprehensive Privacy Policy explains how we collect, use, store, and protect your information in compliance 
                      with the General Data Protection Regulation (GDPR), Swiss data protection laws, and WhatsApp API requirements.
                    </p>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                      <div className="flex items-center mb-3">
                        <Clock className="h-5 w-5 text-blue-600 mr-2" />
                        <strong className="text-blue-800">Last Updated:</strong>
                      </div>
                      <p className="text-blue-700">
                        {new Date().toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>

                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Our Commitment</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span>Full GDPR compliance with transparent data processing</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span>WhatsApp API compliance for secure messaging</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span>Swiss data protection law adherence</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span>Your data, your rights, your control</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === 'data-collection' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Database className="h-6 w-6 text-steel-blue mr-3" />
                    Data We Collect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                        <UserCheck className="h-5 w-5 mr-2" />
                        Personal Information
                      </h3>
                      <ul className="space-y-2 text-green-700">
                        <li>• Name and contact details</li>
                        <li>• Email address and phone number</li>
                        <li>• Tax identification numbers</li>
                        <li>• Financial information for tax services</li>
                        <li>• Professional information</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                        <Globe className="h-5 w-5 mr-2" />
                        Technical Data
                      </h3>
                      <ul className="space-y-2 text-blue-700">
                        <li>• IP address and device information</li>
                        <li>• Browser type and version</li>
                        <li>• Website usage patterns</li>
                        <li>• Cookies and tracking data</li>
                        <li>• Location data (if permitted)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      WhatsApp API Data
                    </h3>
                    <p className="text-yellow-700 mb-3">
                      When using our WhatsApp Business API integration:
                    </p>
                    <ul className="space-y-2 text-yellow-700">
                      <li>• WhatsApp phone numbers (with consent)</li>
                      <li>• Message content for tax consultation</li>
                      <li>• Profile information (name, status)</li>
                      <li>• Message delivery and read receipts</li>
                      <li>• Business conversation history</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === 'data-usage' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Eye className="h-6 w-6 text-steel-blue mr-3" />
                    How We Use Your Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Primary Purposes</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Providing tax consulting services</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Processing tax returns and documents</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Client communication and support</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">WhatsApp Business messaging</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Secondary Purposes</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Website analytics and improvement</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Marketing communications (with consent)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Legal compliance and reporting</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Service quality improvement</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-steel-blue/10 border border-steel-blue/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-steel-blue mb-3 flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      WhatsApp Business API Usage
                    </h3>
                    <p className="text-gray-700 mb-4">
                      We use WhatsApp Business API for secure, encrypted communication with our clients:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Sending tax documents and updates</li>
                      <li>• Scheduling appointments and reminders</li>
                      <li>• Providing customer support</li>
                      <li>• Sharing important tax deadlines</li>
                      <li>• All messages are end-to-end encrypted</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === 'data-sharing' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Users className="h-6 w-6 text-steel-blue mr-3" />
                    Data Sharing & Third Parties
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                      <Lock className="h-5 w-5 mr-2" />
                      We DO NOT Sell Your Data
                    </h3>
                    <p className="text-red-700">
                      Taxed GmbH never sells, rents, or trades your personal information to third parties for marketing purposes.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Authorized Sharing</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Swiss tax authorities (as required by law)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">WhatsApp (for messaging services)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Trusted service providers (under strict contracts)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Legal authorities (when legally required)</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Service Providers</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Server className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Hosting and cloud services</span>
                        </li>
                        <li className="flex items-start">
                          <Mail className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Email and communication services</span>
                        </li>
                        <li className="flex items-start">
                          <BarChart3 className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Analytics and tracking services</span>
                        </li>
                        <li className="flex items-start">
                          <Shield className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Security and backup services</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === 'data-security' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Lock className="h-6 w-6 text-steel-blue mr-3" />
                    Data Security & Protection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Technical Safeguards</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Key className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">End-to-end encryption for all communications</span>
                        </li>
                        <li className="flex items-start">
                          <Shield className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">SSL/TLS encryption for data transmission</span>
                        </li>
                        <li className="flex items-start">
                          <Database className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Encrypted data storage and backup</span>
                        </li>
                        <li className="flex items-start">
                          <Server className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Secure server infrastructure</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Organizational Measures</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Users className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Limited access to authorized personnel only</span>
                        </li>
                        <li className="flex items-start">
                          <Eye className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Regular security audits and monitoring</span>
                        </li>
                        <li className="flex items-start">
                          <FileText className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Staff training on data protection</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Incident response procedures</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      WhatsApp API Security
                    </h3>
                    <p className="text-green-700 mb-3">
                      Our WhatsApp Business API integration includes additional security measures:
                    </p>
                    <ul className="space-y-2 text-green-700">
                      <li>• End-to-end encryption for all WhatsApp messages</li>
                      <li>• Secure API authentication and authorization</li>
                      <li>• Message content filtering and monitoring</li>
                      <li>• Compliance with WhatsApp Business API policies</li>
                      <li>• Regular security updates and patches</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === 'your-rights' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <UserCheck className="h-6 w-6 text-steel-blue mr-3" />
                    Your Data Rights (GDPR)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">
                      Under GDPR, you have the following rights:
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Eye className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Right to Access</h4>
                          <p className="text-gray-700 text-sm">Request copies of your personal data</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Edit className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Right to Rectification</h4>
                          <p className="text-gray-700 text-sm">Correct inaccurate or incomplete data</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Trash2 className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Right to Erasure</h4>
                          <p className="text-gray-700 text-sm">Request deletion of your data</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Lock className="h-5 w-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Right to Restrict Processing</h4>
                          <p className="text-gray-700 text-sm">Limit how we use your data</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Download className="h-5 w-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Right to Data Portability</h4>
                          <p className="text-gray-700 text-sm">Receive your data in a portable format</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Right to Object</h4>
                          <p className="text-gray-700 text-sm">Object to processing for marketing</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Settings className="h-5 w-5 text-indigo-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Right to Withdraw Consent</h4>
                          <p className="text-gray-700 text-sm">Withdraw consent at any time</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Scale className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Right to Complain</h4>
                          <p className="text-gray-700 text-sm">Lodge complaints with supervisory authorities</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-steel-blue/10 border border-steel-blue/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-steel-blue mb-3 flex items-center">
                      <Phone className="h-5 w-5 mr-2" />
                      How to Exercise Your Rights
                    </h3>
                    <p className="text-gray-700 mb-4">
                      To exercise any of these rights, contact us at:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Email: privacy@taxed.ch</li>
                      <li>• Phone: +41-79-910-7787</li>
                      <li>• WhatsApp: +41-79-910-7787</li>
                      <li>• We will respond within 30 days</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === 'cookies' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Cookie className="h-6 w-6 text-steel-blue mr-3" />
                    Cookie Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Essential Cookies
                      </h3>
                      <p className="text-green-700 text-sm mb-3">Required for website functionality</p>
                      <ul className="space-y-1 text-green-700 text-sm">
                        <li>• Session management</li>
                        <li>• Security features</li>
                        <li>• User authentication</li>
                        <li>• Cannot be disabled</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2" />
                        Analytics Cookies
                      </h3>
                      <p className="text-blue-700 text-sm mb-3">Help us improve our website</p>
                      <ul className="space-y-1 text-blue-700 text-sm">
                        <li>• Google Analytics</li>
                        <li>• Usage statistics</li>
                        <li>• Performance monitoring</li>
                        <li>• Can be disabled</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
                        <Bell className="h-5 w-5 mr-2" />
                        Marketing Cookies
                      </h3>
                      <p className="text-purple-700 text-sm mb-3">Used for targeted advertising</p>
                      <ul className="space-y-1 text-purple-700 text-sm">
                        <li>• Social media integration</li>
                        <li>• Advertising networks</li>
                        <li>• Remarketing campaigns</li>
                        <li>• Require consent</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Cookie Management
                    </h3>
                    <p className="text-yellow-700 mb-4">
                      You can manage your cookie preferences at any time:
                    </p>
                    <ul className="space-y-2 text-yellow-700">
                      <li>• Use our cookie consent banner</li>
                      <li>• Adjust browser settings</li>
                      <li>• Contact us for assistance</li>
                      <li>• Essential cookies cannot be disabled</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === 'whatsapp' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <MessageSquare className="h-6 w-6 text-steel-blue mr-3" />
                    WhatsApp Business API Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      WhatsApp Business API Compliance
                    </h3>
                    <p className="text-green-700 mb-4">
                      We use WhatsApp Business API in full compliance with Meta's policies and GDPR requirements:
                    </p>
                    <ul className="space-y-2 text-green-700">
                      <li>• End-to-end encryption for all messages</li>
                      <li>• Explicit consent for WhatsApp communications</li>
                      <li>• Business-only messaging (no promotional content)</li>
                      <li>• Secure data handling and storage</li>
                      <li>• Regular compliance audits</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">WhatsApp Data Collection</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Smartphone className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Phone numbers (with consent)</span>
                        </li>
                        <li className="flex items-start">
                          <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Message content for tax services</span>
                        </li>
                        <li className="flex items-start">
                          <UserCheck className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Profile information (name, status)</span>
                        </li>
                        <li className="flex items-start">
                          <Send className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Delivery and read receipts</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">WhatsApp Data Usage</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <FileText className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Sending tax documents securely</span>
                        </li>
                        <li className="flex items-start">
                          <Calendar className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Appointment scheduling</span>
                        </li>
                        <li className="flex items-start">
                          <Bell className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Tax deadline reminders</span>
                        </li>
                        <li className="flex items-start">
                          <Phone className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">Customer support</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Important WhatsApp Policies
                    </h3>
                    <ul className="space-y-2 text-red-700">
                      <li>• We only send business-related messages</li>
                      <li>• No promotional or marketing content via WhatsApp</li>
                      <li>• Messages are sent only to consenting users</li>
                      <li>• All communications are professional and relevant</li>
                      <li>• Users can opt-out at any time</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === 'contact' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Phone className="h-6 w-6 text-steel-blue mr-3" />
                    Contact Us About Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Protection Officer</h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 text-steel-blue mr-3" />
                            <span className="text-gray-700">privacy@taxed.ch</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 text-steel-blue mr-3" />
                            <span className="text-gray-700">+41-79-910-7787</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-5 w-5 text-steel-blue mr-3" />
                            <span className="text-gray-700">WhatsApp: +41-79-910-7787</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
                        <div className="space-y-2 text-gray-700">
                          <p><strong>Taxed GmbH</strong></p>
                          <p>Biel/Bienne, Switzerland</p>
                          <p>CHE-350.820.923 MWST</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Times</h3>
                        <ul className="space-y-2 text-gray-700">
                          <li>• General inquiries: 24-48 hours</li>
                          <li>• Data subject requests: 30 days</li>
                          <li>• Privacy complaints: 7 days</li>
                          <li>• Emergency security issues: 24 hours</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Supervisory Authority</h3>
                        <div className="text-gray-700">
                          <p>Swiss Federal Data Protection and Information Commissioner (FDPIC)</p>
                          <p>Website: <a href="https://www.edoeb.admin.ch" className="text-steel-blue hover:underline">www.edoeb.admin.ch</a></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-steel-blue/10 border border-steel-blue/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-steel-blue mb-3 flex items-center">
                      <Send className="h-5 w-5 mr-2" />
                      Quick Contact Form
                    </h3>
                    <p className="text-gray-700 mb-4">
                      For privacy-related inquiries, you can also use our contact form:
                    </p>
                    <Button asChild className="bg-steel-blue hover:bg-steel-blue/90">
                      <a href="/contact">
                        Contact Us Now
                        <Phone className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;
