import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Mail, Phone, Globe, User, List } from 'lucide-react';

const ImpressumPage = () => {
  const details = [
    { icon: Building, label: 'Company Name', value: 'Taxed GmbH' },
    { icon: List, label: 'Legal Form', value: 'Limited Liability Company (GmbH)' },
    { icon: Globe, label: 'Registered Office', value: 'Aegertenstrasse 10, 2503 Biel/Bienne, Switzerland' },
    { icon: Phone, label: 'Phone', value: '+41 79 910 77 87' },
    { icon: Mail, label: 'Email', value: 'info@taxed.ch' },
    { icon: Building, label: 'Company Registration Number', value: 'CHE-350.820.923' },
    { icon: List, label: 'VAT Number', value: 'CHE-350.820.923 MWST' },
    { icon: User, label: 'Managing Directors', value: 'Emanuel Flury' },
  ];

  return (
    <>
      <Helmet>
        <title>Impressum | Taxed GmbH</title>
        <meta name="description" content="Legal disclosure and company information for Taxed GmbH, a Swiss tax consulting firm." />
      </Helmet>
      <div className="bg-light-gray-bg-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-dark-gray sm:text-5xl">Impressum</h1>
            <p className="mt-4 text-xl text-gray-600">Legal Disclosure</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="w-full bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-dark-gray">Contact & Company Information</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-6">
                  {details.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-8 text-center">
                        <item.icon className="h-6 w-6 text-steel-blue mx-auto" aria-hidden="true" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">{item.label}</p>
                        <p className="text-lg text-dark-gray">{item.value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            <Card className="w-full bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-dark-gray">Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-dark-gray">
                <p>
                  The author assumes no liability for the correctness, accuracy, timeliness, reliability, or completeness of the information provided. Liability claims against the author for material or immaterial damage resulting from access to, use of, or non-use of the published information, from misuse of the connection, or from technical malfunctions are excluded.
                </p>
                <p>
                  All offers are non-binding. The author expressly reserves the right to change, supplement, or delete parts of the pages or the entire offer without prior notice, or to cease publication temporarily or permanently.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ImpressumPage;