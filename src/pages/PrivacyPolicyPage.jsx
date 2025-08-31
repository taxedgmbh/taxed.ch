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

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Taxed GmbH</title>
        <meta name="description" content="Our privacy policy explains how Taxed GmbH collects, uses, and protects your personal data in compliance with Swiss FADP and GDPR." />
      </Helmet>
      <div className="bg-light-gray-bg-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-dark-gray sm:text-5xl">Privacy Policy</h1>
            <p className="mt-4 text-xl text-gray-600">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 sm:p-12 rounded-lg shadow-lg"
          >
            <Section title="1. Introduction">
              <p>
                Taxed GmbH ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website taxed.ch (the "Site") and use our services. This policy is governed by the Swiss Federal Act on Data Protection (FADP) and, where applicable, the EU General Data Protection Regulation (GDPR).
              </p>
            </Section>

            <Section title="2. Data Controller">
              <p>The controller responsible for data processing is:</p>
              <p>
                Taxed GmbH <br />
                Aegertenstrasse 10 <br />
                2502 Biel/Bienne, Switzerland <br />
                Email: info@taxed.ch
              </p>
            </Section>

            <Section title="3. Data We Collect">
              <p>We may collect the following types of personal data:</p>
              <ul>
                <li><strong>Personal Identification Information:</strong> Name, email address, phone number, postal address, date of birth, nationality, permit type.</li>
                <li><strong>Financial Information:</strong> Income details, bank account information, investment data, real estate information, and other data necessary for tax return preparation.</li>
                <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting, operating system, and other technology on the devices you use to access this website.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website and services.</li>
              </ul>
            </Section>

            <Section title="4. Purpose of Data Processing">
              <p>We use your data for the following purposes:</p>
              <ul>
                <li>To provide and manage our tax consulting services.</li>
                <li>To communicate with you and respond to your inquiries.</li>
                <li>To process payments for our services.</li>
                <li>To comply with our legal and regulatory obligations.</li>
                <li>To improve our website and services.</li>
              </ul>
            </Section>

            <Section title="5. Data Sharing and Third Parties">
              <p>
                We do not sell your personal data. We may share your data with trusted third parties only when necessary to provide our services, such as cantonal tax authorities for filing your tax return. All third parties are required to respect the security of your personal data and to treat it in accordance with the law.
              </p>
            </Section>

            <Section title="6. Data Security">
              <p>
                We have implemented appropriate technical and organizational security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.
              </p>
            </Section>

            <Section title="7. Your Data Protection Rights">
              <p>Under data protection law, you have rights including:</p>
              <ul>
                <li><strong>Right to access:</strong> You have the right to request copies of your personal data.</li>
                <li><strong>Right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
                <li><strong>Right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
                <li><strong>Right to object to processing:</strong> You have the right to object to our processing of your personal data, under certain conditions.</li>
              </ul>
              <p>To exercise these rights, please contact us at info@taxed.ch.</p>
            </Section>
            
            <Section title="8. Changes to This Policy">
              <p>
                We may update this privacy policy from time to time. The updated version will be indicated by a "Last Updated" date and will be effective as soon as it is accessible.
              </p>
            </Section>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;