import React from 'react';
import { Helmet } from 'react-helmet';
import { Shield, Eye, Lock, Database, Users, Globe, Mail, Phone } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Taxed GmbH | Swiss Tax Consulting</title>
        <meta name="description" content="Privacy policy and data protection information for Taxed GmbH. Learn how we protect your personal data in compliance with GDPR and Swiss law." />
        <meta name="keywords" content="privacy policy, data protection, GDPR, Swiss law, personal data, Taxed GmbH" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600">How we protect and handle your personal data</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            
            {/* Introduction */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 text-steel-blue mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Data Protection Commitment</h2>
              </div>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  At Taxed GmbH, we are committed to protecting your privacy and ensuring the security of your personal data. 
                  This Privacy Policy explains how we collect, use, store, and protect your information in compliance with 
                  the General Data Protection Regulation (GDPR) and Swiss data protection laws.
                </p>
                
                <p className="text-gray-700 mb-4">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </section>

            {/* Data Controller */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Database className="h-6 w-6 mr-3 text-steel-blue" />
                Data Controller Information
              </h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Taxed GmbH</h3>
                    <div className="space-y-2 text-gray-700">
                      <p>Biel/Bienne, Switzerland</p>
                      <p>Email: info@taxed.ch</p>
                      <p>Phone: info@taxed.ch</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Data Protection Officer</h3>
                    <div className="space-y-2 text-gray-700">
                      <p>For privacy-related inquiries:</p>
                      <p>Email: privacy@taxed.ch</p>
                      <p>Response time: Within 48 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Collection */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Eye className="h-6 w-6 mr-3 text-steel-blue" />
                What Data We Collect
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-steel-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Name, address, and contact details</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-steel-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Swiss residence permit information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-steel-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Employment and income details</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-steel-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Bank account information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-steel-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Tax-related documents and forms</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Technical Data</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-steel-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>IP address and device information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-steel-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Website usage analytics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-steel-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Cookies and session data</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-steel-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Communication preferences</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Usage */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">How We Use Your Data</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Primary Purposes</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Tax return preparation and filing</li>
                    <li>• Quellensteuer adjustments</li>
                    <li>• Tax planning and consultation</li>
                    <li>• Compliance with Swiss tax laws</li>
                    <li>• Client communication and support</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Legal Basis</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Contract performance</li>
                    <li>• Legal obligations</li>
                    <li>• Legitimate business interests</li>
                    <li>• Your explicit consent</li>
                    <li>• Public interest (tax compliance)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Sharing */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Users className="h-6 w-6 mr-3 text-steel-blue" />
                Data Sharing and Transfers
              </h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">We may share your data with:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Swiss Authorities</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Federal Tax Administration (FTA)</li>
                      <li>• Cantonal tax offices</li>
                      <li>• Municipal tax authorities</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Service Providers</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Secure cloud storage providers</li>
                      <li>• Email and communication services</li>
                      <li>• Payment processing services</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-steel-blue text-white rounded-lg">
                  <h4 className="font-medium mb-2">Data Protection Guarantees</h4>
                  <p className="text-sm">
                    All third-party service providers are carefully selected and bound by strict data protection agreements. 
                    We never sell your personal data to third parties.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Lock className="h-6 w-6 mr-3 text-steel-blue" />
                Data Security Measures
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <Lock className="h-12 w-12 text-steel-blue mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Encryption</h3>
                  <p className="text-gray-700 text-sm">All data is encrypted in transit and at rest using industry-standard protocols</p>
                </div>
                
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <Shield className="h-12 w-12 text-steel-blue mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Access Control</h3>
                  <p className="text-gray-700 text-sm">Strict access controls and authentication measures protect your data</p>
                </div>
                
                <div className="text-center p-6 border border-gray-200 rounded-lg">
                  <Database className="h-12 w-12 text-steel-blue mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Regular Audits</h3>
                  <p className="text-gray-700 text-sm">Regular security audits and updates ensure ongoing protection</p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Data Protection Rights</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Access and Control</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Right to access your personal data</li>
                    <li>• Right to rectification of inaccurate data</li>
                    <li>• Right to erasure ("right to be forgotten")</li>
                    <li>• Right to data portability</li>
                    <li>• Right to restrict processing</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Consent and Objection</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Right to withdraw consent</li>
                    <li>• Right to object to processing</li>
                    <li>• Right to lodge a complaint</li>
                    <li>• Right to compensation</li>
                    <li>• Right to representation</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Data Retention Periods</h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Tax Documents</h3>
                    <p className="text-gray-700 mb-2">Retained for 10 years as required by Swiss tax law</p>
                    <p className="text-sm text-gray-500">This includes tax returns, supporting documents, and correspondence</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Client Records</h3>
                    <p className="text-gray-700 mb-2">Retained for 7 years after service completion</p>
                    <p className="text-sm text-gray-500">Includes contact information and service history</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Us</h2>
              
              <div className="bg-steel-blue text-white rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Privacy Inquiries</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>privacy@taxed.ch</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>info@taxed.ch</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Response Time</h3>
                    <p className="mb-2">We aim to respond to all privacy inquiries within:</p>
                    <p className="font-medium">48 hours</p>
                    <p className="text-sm mt-2">For complex requests, we may need up to 30 days</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Updates */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                This Privacy Policy may be updated periodically. We will notify you of any material changes via email or through our website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;
