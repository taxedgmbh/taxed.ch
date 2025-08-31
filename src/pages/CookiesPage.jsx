import React from 'react';
import { Helmet } from 'react-helmet';
import { Cookie, Settings, Shield, Eye, Database } from 'lucide-react';

const CookiesPage = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - Taxed GmbH | Swiss Tax Consulting</title>
        <meta name="description" content="Cookie policy for Taxed GmbH website. Learn about how we use cookies and your options for managing them." />
        <meta name="keywords" content="cookie policy, cookies, data protection, Taxed GmbH, Swiss tax consulting" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Cookie Policy</h1>
            <p className="text-gray-600">How we use cookies on our website</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            
            {/* Introduction */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Cookie className="h-8 w-8 text-steel-blue mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">What Are Cookies?</h2>
              </div>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Cookies are small text files that are stored on your device when you visit our website. 
                  They help us provide you with a better experience and understand how you use our site.
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

            {/* Cookie Types */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Types of Cookies We Use</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Shield className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Essential Cookies</h3>
                  </div>
                  <p className="text-gray-700 mb-3">Required for basic website functionality</p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Session management</li>
                    <li>• Security features</li>
                    <li>• Shopping cart functionality</li>
                    <li>• User authentication</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Settings className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Functional Cookies</h3>
                  </div>
                  <p className="text-gray-700 mb-3">Enhance your browsing experience</p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Language preferences</li>
                    <li>• Form auto-completion</li>
                    <li>• User interface customization</li>
                    <li>• Calculator settings</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Eye className="h-5 w-5 text-purple-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Analytics Cookies</h3>
                  </div>
                  <p className="text-gray-700 mb-3">Help us understand website usage</p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Page visit statistics</li>
                    <li>• User behavior analysis</li>
                    <li>• Performance monitoring</li>
                    <li>• Content optimization</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Database className="h-5 w-5 text-orange-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Marketing Cookies</h3>
                  </div>
                  <p className="text-gray-700 mb-3">Used for advertising and marketing</p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    <li>• Targeted advertising</li>
                    <li>• Social media integration</li>
                    <li>• Campaign tracking</li>
                    <li>• Conversion optimization</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookie Details */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Detailed Cookie Information</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Cookie Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Purpose</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Duration</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900 font-mono">session_id</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Maintains user session</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Session</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Essential</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900 font-mono">language</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Stores language preference</td>
                      <td className="px-4 py-3 text-sm text-gray-700">1 year</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Functional</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900 font-mono">_ga</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Google Analytics tracking</td>
                      <td className="px-4 py-3 text-sm text-gray-700">2 years</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Analytics</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900 font-mono">_fbp</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Facebook pixel tracking</td>
                      <td className="px-4 py-3 text-sm text-gray-700">3 months</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Marketing</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900 font-mono">calculator_settings</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Saves calculator preferences</td>
                      <td className="px-4 py-3 text-sm text-gray-700">6 months</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Functional</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Third-Party Cookies</h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">We use cookies from the following third-party services:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Google Analytics</h4>
                    <p className="text-sm text-gray-700 mb-2">Website analytics and performance monitoring</p>
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-steel-blue text-sm hover:underline">
                      Google Privacy Policy →
                    </a>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Facebook Pixel</h4>
                    <p className="text-sm text-gray-700 mb-2">Advertising and conversion tracking</p>
                    <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer" className="text-steel-blue text-sm hover:underline">
                      Facebook Privacy Policy →
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookie Management */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Managing Your Cookie Preferences</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Browser Settings</h3>
                  <p className="text-gray-700 mb-3">You can control cookies through your browser settings:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Chrome: Settings → Privacy and security → Cookies</li>
                    <li>• Firefox: Options → Privacy & Security → Cookies</li>
                    <li>• Safari: Preferences → Privacy → Cookies</li>
                    <li>• Edge: Settings → Cookies and site permissions</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Cookie Consent</h3>
                  <p className="text-gray-700 mb-3">Our cookie consent banner allows you to:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Accept all cookies</li>
                    <li>• Reject non-essential cookies</li>
                    <li>• Customize cookie preferences</li>
                    <li>• Change settings anytime</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Impact of Disabling */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Impact of Disabling Cookies</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-yellow-900 mb-3">Please Note</h3>
                <div className="space-y-2 text-yellow-800">
                  <p>• Essential cookies cannot be disabled as they are required for basic website functionality</p>
                  <p>• Disabling functional cookies may limit some website features</p>
                  <p>• Disabling analytics cookies will prevent us from improving our services</p>
                  <p>• Marketing cookies are optional and can be safely disabled</p>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Updates to This Policy</h2>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 mb-3">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
                </p>
                <p className="text-gray-700">
                  When we make material changes, we will notify you through our website or by email, and update the "Last updated" date at the top of this policy.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Us</h2>
              
              <div className="bg-steel-blue text-white rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Cookie Questions</h3>
                    <p className="mb-2">For questions about our use of cookies:</p>
                    <p className="font-medium">privacy@taxed.ch</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Response Time</h3>
                    <p className="mb-2">We aim to respond to all inquiries within:</p>
                    <p className="font-medium">48 hours</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiesPage;
