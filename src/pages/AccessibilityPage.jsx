import React from 'react';
import { Helmet } from 'react-helmet';
import { Accessibility, Eye, Ear, Hand, Brain, CheckCircle, AlertTriangle } from 'lucide-react';

const AccessibilityPage = () => {
  return (
    <>
      <Helmet>
        <title>Accessibility - Taxed GmbH | Swiss Tax Consulting</title>
        <meta name="description" content="Accessibility information for Taxed GmbH website. Learn about our commitment to making our services accessible to all users." />
        <meta name="keywords" content="accessibility, WCAG, inclusive design, Taxed GmbH, Swiss tax consulting" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Accessibility</h1>
            <p className="text-gray-600">Making our services accessible to everyone</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            
            {/* Commitment */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Accessibility className="h-8 w-8 text-steel-blue mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Our Accessibility Commitment</h2>
              </div>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  At Taxed GmbH, we are committed to ensuring that our website and services are accessible to all users, 
                  including those with disabilities. We strive to provide an inclusive experience that meets or exceeds 
                  international accessibility standards.
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

            {/* Standards */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Accessibility Standards</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">WCAG 2.1 Compliance</h3>
                  <p className="text-gray-700 mb-3">We aim to meet WCAG 2.1 Level AA standards:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Perceivable: Information is presented in ways users can perceive</li>
                    <li>• Operable: Interface components are operable</li>
                    <li>• Understandable: Information and operation are understandable</li>
                    <li>• Robust: Content is compatible with assistive technologies</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Swiss Accessibility Standards</h3>
                  <p className="text-gray-700 mb-3">Compliance with Swiss accessibility requirements:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Swiss Disability Discrimination Act</li>
                    <li>• Federal Office for Buildings and Logistics standards</li>
                    <li>• Swiss e-government accessibility guidelines</li>
                    <li>• International best practices</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Accessibility Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Eye className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Visual Accessibility</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• High contrast color schemes</li>
                    <li>• Scalable text and zoom support</li>
                    <li>• Clear typography and spacing</li>
                    <li>• Alternative text for images</li>
                    <li>• Focus indicators for navigation</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Ear className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Auditory Accessibility</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Screen reader compatibility</li>
                    <li>• Keyboard navigation support</li>
                    <li>• Audio descriptions where needed</li>
                    <li>• Caption support for videos</li>
                    <li>• Clear audio cues and alerts</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Hand className="h-5 w-5 text-purple-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Motor Accessibility</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Keyboard-only navigation</li>
                    <li>• Large click targets</li>
                    <li>• Voice command compatibility</li>
                    <li>• Adjustable time limits</li>
                    <li>• Error prevention features</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Brain className="h-5 w-5 text-orange-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Cognitive Accessibility</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Clear and simple language</li>
                    <li>• Consistent navigation structure</li>
                    <li>• Error messages and help text</li>
                    <li>• Logical content organization</li>
                    <li>• Distraction-free design</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Assistive Technologies */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Assistive Technology Support</h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">We support the following assistive technologies:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Screen Readers</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• JAWS (Windows)</li>
                      <li>• NVDA (Windows)</li>
                      <li>• VoiceOver (macOS/iOS)</li>
                      <li>• TalkBack (Android)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Other Tools</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Magnification software</li>
                      <li>• Speech recognition software</li>
                      <li>• Switch navigation devices</li>
                      <li>• High contrast mode</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Known Issues */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-3 text-steel-blue" />
                Known Accessibility Issues
              </h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-yellow-900 mb-3">Current Limitations</h3>
                <div className="space-y-2 text-yellow-800">
                  <p>• Some third-party calculators may not be fully accessible</p>
                  <p>• PDF downloads may require additional accessibility tools</p>
                  <p>• Video content may not have full captioning</p>
                  <p>• Some interactive elements may need keyboard alternatives</p>
                </div>
                
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <p className="text-gray-700 text-sm">
                    <strong>Our Commitment:</strong> We are actively working to address these issues and improve accessibility. 
                    If you encounter any accessibility barriers, please contact us immediately.
                  </p>
                </div>
              </div>
            </section>

            {/* Testing */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Accessibility Testing</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Regular Testing</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Automated accessibility testing</li>
                    <li>• Manual testing with assistive technologies</li>
                    <li>• User testing with people with disabilities</li>
                    <li>• Regular audits and compliance checks</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Testing Tools</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• WAVE Web Accessibility Evaluator</li>
                    <li>• axe DevTools</li>
                    <li>• Lighthouse Accessibility Audit</li>
                    <li>• Manual testing with screen readers</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Feedback */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Feedback and Support</h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">We welcome your feedback</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Report Issues</h4>
                    <p className="text-sm text-gray-700 mb-2">If you encounter accessibility issues:</p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Email: accessibility@taxed.ch</li>
                      <li>• Phone: info@taxed.ch</li>
                      <li>• Include specific details about the issue</li>
                      <li>• Mention your assistive technology</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Response Time</h4>
                    <p className="text-sm text-gray-700 mb-2">We aim to respond to accessibility issues within:</p>
                    <p className="font-medium text-sm">24 hours for urgent issues</p>
                    <p className="text-sm text-gray-500">3 business days for general feedback</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Continuous Improvement */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <CheckCircle className="h-6 w-6 mr-3 text-steel-blue" />
                Continuous Improvement
              </h2>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Our Ongoing Commitment</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Regular accessibility audits and updates</li>
                  <li>• Staff training on accessibility best practices</li>
                  <li>• Integration of accessibility into development process</li>
                  <li>• Monitoring of new accessibility standards and guidelines</li>
                  <li>• User feedback integration and improvement</li>
                </ul>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Us</h2>
              
              <div className="bg-steel-blue text-white rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Accessibility Support</h3>
                    <p className="mb-2">For accessibility questions or issues:</p>
                    <p className="font-medium">accessibility@taxed.ch</p>
                    <p className="text-sm mt-2">info@taxed.ch</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Alternative Formats</h3>
                    <p className="mb-2">We can provide information in:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Large print</li>
                      <li>• Audio format</li>
                      <li>• Braille (by request)</li>
                      <li>• Plain language</li>
                    </ul>
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

export default AccessibilityPage;
