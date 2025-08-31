import React from 'react';
import { Helmet } from 'react-helmet';
import { FileText, Scale, Shield, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Taxed GmbH | Swiss Tax Consulting</title>
        <meta name="description" content="Terms of service and conditions for using Taxed GmbH's Swiss tax consulting services. Read our terms and conditions." />
        <meta name="keywords" content="terms of service, terms and conditions, legal terms, Taxed GmbH, Swiss tax consulting" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-gray-600">Terms and conditions for using our services</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            
            {/* Introduction */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 text-steel-blue mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Agreement to Terms</h2>
              </div>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  These Terms of Service ("Terms") govern your use of the services provided by Taxed GmbH ("we," "us," or "our"). 
                  By accessing or using our services, you agree to be bound by these Terms.
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

            {/* Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Services Description</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Tax Consulting Services</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Personal tax return preparation</li>
                    <li>• Quellensteuer (withholding tax) adjustments</li>
                    <li>• International income reporting</li>
                    <li>• Tax planning and optimization</li>
                    <li>• Digital filing and submission</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Digital Platform</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Secure document upload and storage</li>
                    <li>• Real-time status tracking</li>
                    <li>• Online communication tools</li>
                    <li>• Tax calculators and resources</li>
                    <li>• Mobile-friendly access</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Client Responsibilities */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <CheckCircle className="h-6 w-6 mr-3 text-steel-blue" />
                Client Responsibilities
              </h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">You agree to:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Information Accuracy</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Provide accurate and complete information</li>
                      <li>• Update information when changes occur</li>
                      <li>• Disclose all relevant financial details</li>
                      <li>• Submit required documents on time</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Cooperation</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Respond to requests for information</li>
                      <li>• Attend scheduled consultations</li>
                      <li>• Review and approve documents</li>
                      <li>• Pay fees in a timely manner</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Responsibilities */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Shield className="h-6 w-6 mr-3 text-steel-blue" />
                Our Responsibilities
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Professional Services</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Provide expert tax consulting</li>
                    <li>• Ensure compliance with Swiss law</li>
                    <li>• Maintain client confidentiality</li>
                    <li>• Meet agreed deadlines</li>
                    <li>• Provide clear communication</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Data Protection</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Secure data storage and transmission</li>
                    <li>• GDPR and Swiss law compliance</li>
                    <li>• Regular security audits</li>
                    <li>• Limited data access</li>
                    <li>• Secure disposal procedures</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Fees and Payment */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Fees and Payment Terms</h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Fee Structure</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Transparent flat-rate pricing</li>
                      <li>• No hidden fees or charges</li>
                      <li>• Clear service packages</li>
                      <li>• Competitive market rates</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Terms</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Payment due upon service completion</li>
                      <li>• Accepted payment methods listed</li>
                      <li>• Late payment fees may apply</li>
                      <li>• Refund policy available</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Limitations and Disclaimers */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-3 text-steel-blue" />
                Limitations and Disclaimers
              </h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Service Limitations</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Services are for Swiss tax matters only</li>
                    <li>• We do not provide legal advice</li>
                    <li>• Complex international cases may require additional expertise</li>
                    <li>• Services subject to Swiss law and regulations</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Liability Limitations</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Maximum liability limited to fees paid</li>
                    <li>• No liability for indirect or consequential damages</li>
                    <li>• Client responsible for final review and approval</li>
                    <li>• Force majeure events excluded</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Intellectual Property</h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Our Rights</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Website and platform ownership</li>
                      <li>• Proprietary tax calculation methods</li>
                      <li>• Brand and trademark rights</li>
                      <li>• Software and tools ownership</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Your Rights</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Personal tax documents ownership</li>
                      <li>• Right to use completed tax returns</li>
                      <li>• Access to your personal data</li>
                      <li>• Portability of your information</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Termination */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <XCircle className="h-6 w-6 mr-3 text-steel-blue" />
                Termination
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Client Termination</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 30 days written notice required</li>
                    <li>• Outstanding fees must be paid</li>
                    <li>• Data will be returned or deleted</li>
                    <li>• No refund for completed services</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Our Termination</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Breach of terms or non-payment</li>
                    <li>• Illegal or fraudulent activity</li>
                    <li>• Non-cooperation or false information</li>
                    <li>• Service discontinuation (with notice)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Scale className="h-6 w-6 mr-3 text-steel-blue" />
                Governing Law and Disputes
              </h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Jurisdiction</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Swiss law governs these terms</li>
                      <li>• Swiss courts have jurisdiction</li>
                      <li>• Bern, Switzerland as venue</li>
                      <li>• Swiss consumer protection applies</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Dispute Resolution</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Mediation preferred first step</li>
                      <li>• Arbitration if mediation fails</li>
                      <li>• Court proceedings as last resort</li>
                      <li>• Reasonable attorney fees</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Clock className="h-6 w-6 mr-3 text-steel-blue" />
                Changes to Terms
              </h2>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Modification Process</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• We may update these terms periodically</li>
                  <li>• 30 days notice for material changes</li>
                  <li>• Continued use constitutes acceptance</li>
                  <li>• Right to terminate if changes unacceptable</li>
                  <li>• Current terms always available on website</li>
                </ul>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="bg-steel-blue text-white rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Questions About Terms</h3>
                    <p className="mb-2">For questions about these terms or legal matters:</p>
                    <p className="font-medium">info@taxed.ch</p>
                    <p className="text-sm mt-2">+41 79 910 77 87</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Response Time</h3>
                    <p className="mb-2">We aim to respond to all inquiries within:</p>
                    <p className="font-medium">2 business days</p>
                    <p className="text-sm mt-2">For urgent matters, please call directly</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Acceptance */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  <strong>By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;
