import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BenefitsSection = () => {
  const benefits = [
    { icon: Users, title: 'Expat Expertise', description: 'We specialize exclusively in tax situations for foreign nationals in Switzerland.' },
    { icon: BarChart, title: 'Flat-Rate Fees', description: 'Transparent, fixed pricing with no hidden costs. You know the price upfront.' },
    { icon: Zap, title: 'Digital Process', description: 'A simple, secure, and fully digital process from start to finish. No paperwork hassle.' },
  ];

  return (
    <section id="benefits" className="py-20 bg-light-gray-bg-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full text-center card-hover border-steel-blue/20 shadow-lg bg-white">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-warm-red-tint text-brand-red flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl text-dark-gray">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-dark-gray text-base">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;