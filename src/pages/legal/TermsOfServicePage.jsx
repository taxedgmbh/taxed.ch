import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  FileText,
  Shield,
  Scale,
  Users,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  Mail,
  Phone
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TermsOfServicePage = () => {
  const lastUpdated = 'January 30, 2026';

  return (
    <>
      <Helmet>
        <title>Terms of Service - Taxed GmbH | Swiss Tax Consulting</title>
        <meta name="description" content="Terms of Service for Taxed GmbH. Read our terms and conditions for using our Swiss tax consulting and filing services." />
        <meta name="keywords" content="terms of service, terms and conditions, AGB, Swiss tax services, Taxed GmbH" />
        <link rel="canonical" href="https://taxed.ch/terms" />

        <meta property="og:title" content="Terms of Service - Taxed GmbH" />
        <meta property="og:description" content="Terms and conditions for using Taxed GmbH Swiss tax consulting services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://taxed.ch/terms" />
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
              Terms of Service
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
              Please read these terms carefully before using our services. By using Taxed GmbH services, you agree to these terms.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-200">
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Last Updated: {lastUpdated}
              </span>
              <span className="flex items-center">
                <Scale className="h-4 w-4 mr-1" />
                Swiss Law Applicable
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">

            {/* Section 1 */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-steel-blue mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">1. Introduction</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  These Terms of Service ("Terms") govern your use of the services provided by Taxed GmbH ("Company", "we", "us", or "our"), a Swiss limited liability company registered under CHE-350.820.923 MWST, located in Biel/Bienne, Switzerland.
                </p>
                <p className="text-gray-700">
                  By accessing or using our tax consulting, tax preparation, and related services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use our services.
                </p>
              </CardContent>
            </Card>

            {/* Section 2 */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-steel-blue mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">2. Services Provided</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  Taxed GmbH provides tax consulting and tax return preparation services primarily for expatriates and individuals with international income residing in Switzerland. Our services include:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Individual Swiss tax return preparation and filing</li>
                  <li>Quellensteuer (withholding tax) adjustments and refunds</li>
                  <li>Tax planning and optimization advice</li>
                  <li>Assistance with international tax matters</li>
                  <li>Communication with cantonal tax authorities on your behalf</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 3 */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-steel-blue mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">3. Client Responsibilities</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  As a client, you agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Provide accurate, complete, and timely information required for tax preparation</li>
                  <li>Inform us of any changes to your personal or financial situation that may affect your tax return</li>
                  <li>Review all documents and returns we prepare on your behalf before submission</li>
                  <li>Respond promptly to our requests for additional information or clarification</li>
                  <li>Pay for services in accordance with our agreed pricing</li>
                  <li>Maintain confidentiality of your account credentials</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 4 */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <CreditCard className="h-6 w-6 text-steel-blue mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">4. Pricing and Payment</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  Our pricing is transparent and clearly communicated before any services begin:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>All prices are quoted in Swiss Francs (CHF) and include applicable VAT</li>
                  <li>Payment is due upon completion of services unless otherwise agreed</li>
                  <li>We accept payment via bank transfer, credit card, and other methods specified on our website</li>
                  <li>Additional services beyond the original scope may incur extra charges, which will be communicated in advance</li>
                  <li>Refunds are provided according to our refund policy, available upon request</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 5 */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-warm-red mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">5. Limitation of Liability</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  While we strive for accuracy and compliance:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Our services are based on the information you provide. We are not liable for errors resulting from incomplete or inaccurate information provided by you.</li>
                  <li>Tax laws and regulations may change. We provide advice based on current laws at the time of service.</li>
                  <li>Our liability is limited to the fees paid for the specific service in question.</li>
                  <li>We are not responsible for decisions made by tax authorities or changes in their interpretation of tax laws.</li>
                  <li>We maintain professional liability insurance to protect our clients.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 6 */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-steel-blue mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">6. Confidentiality</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  We treat all client information with strict confidentiality:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>All personal and financial information is protected under Swiss data protection laws</li>
                  <li>Information is only shared with tax authorities as required for service provision</li>
                  <li>We do not sell, rent, or share your information with third parties for marketing purposes</li>
                  <li>Our full data handling practices are detailed in our <a href="/privacy" className="text-steel-blue hover:underline">Privacy Policy</a></li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 7 */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-steel-blue mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">7. Service Timeline</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  We aim to provide timely service:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Standard processing time is 2-5 business days after receiving all required documents</li>
                  <li>Processing by Swiss tax authorities typically takes 2-6 months</li>
                  <li>We cannot guarantee specific timelines for tax authority decisions</li>
                  <li>Rush services may be available for an additional fee</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 8 */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Scale className="h-6 w-6 text-steel-blue mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">8. Governing Law and Disputes</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  These Terms are governed by Swiss law:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>These Terms shall be governed by and construed in accordance with the laws of Switzerland</li>
                  <li>Any disputes shall be subject to the exclusive jurisdiction of the courts of Biel/Bienne, Canton of Bern</li>
                  <li>We encourage clients to contact us directly to resolve any concerns before pursuing legal action</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 9 */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-steel-blue mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 m-0">9. Modifications to Terms</h2>
                </div>
                <p className="text-gray-700">
                  We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of our services after changes constitutes acceptance of the modified Terms. We will notify existing clients of material changes via email.
                </p>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card className="bg-gray-50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-700 mb-6">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-steel-blue" />
                    <span>info@taxed.ch</span>
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
                <div className="mt-6">
                  <Button asChild className="bg-steel-blue hover:bg-steel-blue/90">
                    <a href="/contact">Contact Us</a>
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

export default TermsOfServicePage;
