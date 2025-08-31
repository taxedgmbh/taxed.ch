import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-bold text-dark-gray mb-4 pb-2 border-b border-steel-blue/20">{title}</h2>
    <div className="space-y-4 text-dark-gray/90 text-lg leading-relaxed">
      {children}
    </div>
  </div>
);

const TermsOfServicePage = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Taxed GmbH</title>
        <meta name="description" content="Read the terms of service for using the website and tax consulting services of Taxed GmbH." />
      </Helmet>
      <div className="bg-light-gray-bg-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-dark-gray sm:text-5xl">Terms of Service</h1>
            <p className="mt-4 text-xl text-gray-600">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 sm:p-12 rounded-lg shadow-lg"
          >
            <Section title="1. Agreement to Terms">
              <p>
                By accessing our website taxed.ch (the "Site") or using our services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use our Site or services.
              </p>
            </Section>

            <Section title="2. Scope of Services">
              <p>
                Taxed GmbH provides tax consulting and tax return preparation services for expatriates in Switzerland. The specific scope of services for each client is defined by the service package purchased or the individual agreement concluded. Our services are based on the information and documents you provide.
              </p>
            </Section>

            <Section title="3. User Obligations">
              <p>
                You are responsible for providing complete, accurate, and timely information necessary for the provision of our services. You agree to review all documents prepared by us for accuracy and completeness before submission to the tax authorities. Taxed GmbH is not liable for any damages resulting from incorrect or incomplete information provided by you.
              </p>
            </Section>

            <Section title="4. Payment Terms">
              <p>
                Fees for our services are based on the pricing listed on our Site or as otherwise agreed upon. Payment is due upon purchase of a service package or as specified in your invoice. All prices are in Swiss Francs (CHF).
              </p>
            </Section>

            <Section title="5. Intellectual Property">
              <p>
                The Site and its original content, features, and functionality are and will remain the exclusive property of Taxed GmbH. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
              </p>
            </Section>

            <Section title="6. Limitation of Liability">
              <p>
                To the fullest extent permitted by applicable law, Taxed GmbH shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly. Our liability is limited to damages caused by gross negligence or willful misconduct.
              </p>
            </Section>
            
            <Section title="7. Governing Law and Jurisdiction">
              <p>
                These Terms shall be governed and construed in accordance with the laws of Switzerland, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts located in Biel/Bienne, Switzerland.
              </p>
            </Section>

            <Section title="8. Changes to Terms">
                <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
                </p>
            </Section>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TermsOfServicePage;