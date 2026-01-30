import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Cookie,
  Shield,
  Settings,
  BarChart3,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Info,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CookiePolicyPage = () => {
  const lastUpdated = 'January 30, 2026';

  const cookieTypes = [
    {
      name: 'Essential Cookies',
      icon: Shield,
      required: true,
      description: 'Required for the website to function properly. These cannot be disabled.',
      examples: ['Session management', 'Security tokens', 'User authentication', 'Shopping cart functionality'],
      retention: 'Session or up to 1 year'
    },
    {
      name: 'Functional Cookies',
      icon: Settings,
      required: false,
      description: 'Remember your preferences and enhance your experience.',
      examples: ['Language preferences', 'Theme settings', 'Form auto-fill', 'Recently viewed pages'],
      retention: 'Up to 1 year'
    },
    {
      name: 'Analytics Cookies',
      icon: BarChart3,
      required: false,
      description: 'Help us understand how visitors interact with our website.',
      examples: ['Page views', 'Traffic sources', 'User journey', 'Performance metrics'],
      retention: 'Up to 2 years'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Cookie Policy - Taxed GmbH | Swiss Tax Consulting</title>
        <meta name="description" content="Cookie Policy for Taxed GmbH. Learn how we use cookies on our website and how you can manage your preferences." />
        <meta name="keywords" content="cookie policy, cookies, privacy, Swiss data protection, Taxed GmbH" />
        <link rel="canonical" href="https://taxed.ch/cookies" />

        <meta property="og:title" content="Cookie Policy - Taxed GmbH" />
        <meta property="og:description" content="Learn how Taxed GmbH uses cookies and how to manage your preferences." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://taxed.ch/cookies" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-steel-blue to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Cookie className="h-16 w-16 text-white mx-auto mb-6" />
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
              Learn how we use cookies to improve your experience on our website and how you can control them.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-200">
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Last Updated: {lastUpdated}
              </span>
              <span className="flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                GDPR & Swiss Law Compliant
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">

            {/* What Are Cookies */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Info className="h-6 w-6 text-steel-blue mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">What Are Cookies?</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners information about how their site is being used.
                </p>
                <p className="text-gray-700">
                  Cookies can be "session" cookies (deleted when you close your browser) or "persistent" cookies (remain on your device for a set period or until you delete them).
                </p>
              </CardContent>
            </Card>

            {/* Cookie Types */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>

            {cookieTypes.map((cookie, index) => (
              <Card key={index} className="mb-6">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <cookie.icon className="h-6 w-6 text-steel-blue mr-3" />
                      <h3 className="text-xl font-bold text-gray-900 m-0">{cookie.name}</h3>
                    </div>
                    {cookie.required ? (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Required
                      </span>
                    ) : (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Optional
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-4">{cookie.description}</p>
                  <div className="mb-4">
                    <p className="font-medium text-gray-900 mb-2">Examples:</p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      {cookie.examples.map((example, i) => (
                        <li key={i}>{example}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-gray-500">
                    <strong>Retention:</strong> {cookie.retention}
                  </p>
                </CardContent>
              </Card>
            ))}

            {/* Third-Party Cookies */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <AlertCircle className="h-6 w-6 text-warm-red mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">Third-Party Cookies</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  Some cookies on our website are set by third-party services that appear on our pages:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Google Analytics:</strong> We use Google Analytics to understand how visitors interact with our website. Google Analytics uses cookies to collect information about your visit.</li>
                  <li><strong>Payment Processors:</strong> When you make a payment, our payment processors may set cookies for security and fraud prevention.</li>
                  <li><strong>Social Media:</strong> If you interact with embedded social media content, those platforms may set cookies.</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Third-party cookies are governed by the respective third party's privacy policy.
                </p>
              </CardContent>
            </Card>

            {/* Managing Cookies */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Settings className="h-6 w-6 text-steel-blue mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">Managing Your Cookies</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  You have several options for controlling cookies:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li><strong>Browser Settings:</strong> Most browsers allow you to control cookies through their settings. You can block all cookies, accept all cookies, or choose to be notified when a cookie is set.</li>
                  <li><strong>Delete Cookies:</strong> You can delete cookies that have already been set in your browser.</li>
                  <li><strong>Opt-Out of Analytics:</strong> You can opt-out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" className="text-steel-blue hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</li>
                </ul>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 text-sm">
                    <strong>Note:</strong> Disabling essential cookies may affect the functionality of our website and prevent you from using certain features.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-steel-blue mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">Your Rights</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  Under Swiss data protection law and the GDPR, you have the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Be informed about how cookies are used on our website</li>
                  <li>Consent to or refuse non-essential cookies</li>
                  <li>Withdraw your consent at any time</li>
                  <li>Request information about the cookies we use</li>
                  <li>Request deletion of data collected through cookies</li>
                </ul>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-steel-blue mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">Updates to This Policy</h2>
                </div>
                <p className="text-gray-700">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. The date at the top of this page indicates when this policy was last revised. We encourage you to review this policy periodically.
                </p>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card className="bg-gray-50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-700 mb-6">
                  If you have any questions about our use of cookies, please contact us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-steel-blue" />
                    <span>privacy@taxed.ch</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-steel-blue" />
                    <span>+41 79 910 77 87</span>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-gray-700">
                    <strong>Taxed GmbH</strong><br />
                    Biel/Bienne, Switzerland<br />
                    CHE-350.820.923 MWST
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Button asChild className="bg-steel-blue hover:bg-steel-blue/90">
                    <a href="/contact">Contact Us</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="/privacy">View Privacy Policy</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </>
  );
};

export default CookiePolicyPage;
