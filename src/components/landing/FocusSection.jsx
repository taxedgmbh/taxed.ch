import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, FileText, Globe, ShieldCheck, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FocusSection = () => {
  const focusAreas = [
    {
      icon: UserCheck,
      title: 'Individual Expat Tax Returns',
      description: 'We handle the entire process for your ordinary tax return (ordentliche Veranlagung), ensuring all deductions are claimed and compliance is met.',
    },
    {
      icon: FileText,
      title: 'Quellensteuer Adjustments',
      description: 'If you are taxed at source, we analyze your situation to see if a tariff correction or a subsequent ordinary assessment can lead to a tax refund.',
    },
    {
      icon: Globe,
      title: 'International Income Reporting',
      description: 'Expertly navigate the complexities of declaring foreign assets, income, and property to avoid double taxation and ensure full compliance.',
    },
    {
      icon: ShieldCheck,
      title: 'Digital & Secure Filing',
      description: 'Our fully digital workflow uses secure, encrypted platforms for document exchange and communication, making the process fast and safe.',
    },
    {
      icon: Tag,
      title: 'Flat-Rate Pricing',
      description: 'No surprises. Our transparent, all-inclusive packages mean you know the exact cost upfront, regardless of the complexity.',
    },
  ];

  return (
    <section id="focus" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-4">
            Our Focus
          </h2>
          <p className="text-xl text-dark-gray max-w-3xl mx-auto">
            We concentrate on what matters most to expats in Switzerland.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex"
            >
              <Card className="w-full card-hover border-steel-blue/20 shadow-lg bg-light-gray-bg-1 flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-warm-red-tint text-brand-red flex items-center justify-center flex-shrink-0">
                      <area.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg text-dark-gray">{area.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-dark-gray text-base">{area.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusSection;