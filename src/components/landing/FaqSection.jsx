import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'What services does Taxed GmbH offer?',
    answer: 'We specialize in:\n\nSwiss tax returns (Quellensteuer and ordentliche Veranlagung)\nExpatriate tax advisory\nReal estate taxation (buying, renting, selling property)\nInternational tax planning\nEmployer consulting for cross-border workers',
  },
  {
    question: 'Am I required to file a tax return in Switzerland if I’m taxed at source?',
    answer: 'Yes, under the following conditions:\n\nAnnual income exceeds CHF 120\'000 (CHF 500\'000 in Geneva)\nYou own property in Switzerland or abroad\nYou wish to claim deductions (e.g. childcare, 3a, interest)\nWe help determine your obligation and handle the process.',
  },
  {
    question: 'What is the deadline for filing a Swiss tax return?',
    answer: 'Normal deadline: 31 March of the following year\nExtensions: Possible until September or November, depending on the canton\nWe apply for all necessary extensions on your behalf.',
  },
  {
    question: 'How much does it cost to file my tax return with Taxed GmbH?',
    answer: 'We offer flat-rate packages. You can see our current pricing in our online store.',
  },
  {
    question: 'What documents do I need for my tax return?',
    answer: 'You’ll typically need:\n\nSalary certificate (Lohnausweis)\nBank statements (31.12.)\nPension/insurance contributions\n3a pillar certificates\nRental income or mortgage interest (if applicable)\nWe provide a full checklist based on your profile.',
  },
  {
    question: 'How do you ensure data protection?',
    answer: 'We comply with:\n\nSwiss DSG and EU GDPR\nSecure hosting in Switzerland\nEncrypted document upload and email systems\nYour data is never shared without your written consent.',
  },
  {
    question: 'How do I get started with Taxed GmbH?',
    answer: 'Simply visit our online store, choose the service package that fits your needs, and complete the purchase. We will then contact you with the next steps within 24–48 hours.',
  },
  {
    question: 'Are your services 100% online?',
    answer: 'Yes, our process is fully remote:\n\nSecure upload of documents\nE-signature of tax returns\nVideo meetings for consultations\nWe also offer in-person appointments at our Grenchen office upon request.',
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="py-20 bg-light-gray-bg-1">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-dark-gray">
            Trusted answers for international taxpayers in Switzerland.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base text-dark-gray/80">
                  {item.answer.split('\n').map((line, i) => (
                    <p key={i} className={i === 0 ? '' : 'mt-2'}>{line}</p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;