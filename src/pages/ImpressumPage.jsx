import React from 'react';
import { Helmet } from 'react-helmet';
import { MapPin, Phone, Mail, Globe, Building, User, Shield } from 'lucide-react';

const ImpressumPage = () => {
  return (
    <>
      <Helmet>
        <title>Impressum - Taxed GmbH | Swiss Tax Consulting</title>
        <meta name="description" content="Legal information and company details for Taxed GmbH, Swiss tax consulting services for expats and professionals." />
        <meta name="keywords" content="impressum, legal, company information, Taxed GmbH, Swiss tax consulting" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Impressum</h1>
            <p className="text-gray-600">Legal information and company details</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            
            {/* Company Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Building className="h-6 w-6 mr-3 text-steel-blue" />
                Company Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Taxed GmbH</h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-steel-blue mt-0.5" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p>Biel/Bienne, Switzerland</p>
                        <p className="text-sm text-gray-500">Serving all of Switzerland</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-steel-blue mt-0.5" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p>info@taxed.ch</p>
                        <p className="text-sm text-gray-500">Mon-Fri 9:00-18:00</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-steel-blue mt-0.5" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p>info@taxed.ch</p>
                        <p className="text-sm text-gray-500">24/7 support available</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Globe className="h-5 w-5 text-steel-blue mt-0.5" />
                      <div>
                        <p className="font-medium">Website</p>
                        <p>www.taxed.ch</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Legal Details</h3>
                  <div className="space-y-3 text-gray-700">
                    <div>
                      <p className="font-medium">Legal Form</p>
                      <p>GmbH (Limited Liability Company)</p>
                    </div>
                    
                    <div>
                      <p className="font-medium">Commercial Register</p>
                      <p>Registered in Switzerland</p>
                    </div>
                    
                    <div>
                      <p className="font-medium">VAT Number</p>
                      <p>CHE-XXX.XXX.XXX MWST</p>
                    </div>
                    
                    <div>
                      <p className="font-medium">Business Purpose</p>
                      <p>Swiss tax consulting and filing services for expats and professionals</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Management */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <User className="h-6 w-6 mr-3 text-steel-blue" />
                Management
              </h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-steel-blue rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Managing Director</h3>
                    <p className="text-gray-700">Taxed GmbH Management</p>
                    <p className="text-sm text-gray-500 mt-1">Responsible for all business operations and compliance</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Professional Qualifications */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Shield className="h-6 w-6 mr-3 text-steel-blue" />
                Professional Qualifications & Certifications
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Swiss Tax Expertise</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Certified Swiss Tax Consultant</li>
                    <li>• Specialized in expat tax matters</li>
                    <li>• Quellensteuer (withholding tax) expert</li>
                    <li>• International tax compliance</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Compliance & Standards</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• GDPR compliant</li>
                    <li>• Swiss data protection standards</li>
                    <li>• Professional liability insurance</li>
                    <li>• Regular continuing education</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Services Offered</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Individual Tax Services</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Personal tax return preparation</li>
                    <li>• Quellensteuer adjustments</li>
                    <li>• International income reporting</li>
                    <li>• Tax planning and optimization</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Digital Services</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Secure online filing</li>
                    <li>• Digital document management</li>
                    <li>• Real-time status updates</li>
                    <li>• Mobile-friendly platform</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Legal Notice */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Legal Notice</h2>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  This website is operated by Taxed GmbH. All information provided on this website is for general informational purposes only and does not constitute professional tax advice.
                </p>
                
                <p className="text-gray-700 mb-4">
                  While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website for any purpose.
                </p>
                
                <p className="text-gray-700 mb-4">
                  Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, arising from loss of data or profits arising out of, or in connection with, the use of this website.
                </p>
                
                <p className="text-gray-700">
                  For specific tax advice tailored to your individual circumstances, please contact us directly for a consultation.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact for Legal Matters</h2>
              
              <div className="bg-steel-blue text-white rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Legal Inquiries</h3>
                    <p className="mb-2">For legal matters, compliance questions, or formal communications:</p>
                    <p className="font-medium">info@taxed.ch</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Response Time</h3>
                    <p className="mb-2">We aim to respond to all legal inquiries within:</p>
                    <p className="font-medium">2 business days</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Last Updated */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImpressumPage;