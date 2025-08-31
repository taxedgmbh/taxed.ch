import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Upload, FileCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const HowItWorksPage = () => {
  const steps = [
    {
      icon: Calendar,
      title: 'Choose Your Package',
      description: 'Select the tax return package from our store that best fits your situation.',
      details: [
        'Review our transparent packages',
        'Choose based on complexity',
        'Secure online payment',
        'Instant confirmation',
        'No consultation needed to start'
      ],
      color: 'bg-warm-red-tint text-brand-red',
      gradient: 'from-brand-red to-brand-red/80'
    },
    {
      icon: Upload,
      title: 'Upload Tax Documents Securely',
      description: 'Use our secure platform to upload all necessary tax documents and information.',
      details: [
        'Secure, encrypted document upload',
        'Clear checklist of required documents',
        'Support for multiple file formats',
        'Progress tracking dashboard',
        'Direct communication with your tax expert'
      ],
      color: 'bg-warm-red-tint text-steel-blue',
      gradient: 'from-steel-blue to-steel-blue/80'
    },
    {
      icon: FileCheck,
      title: 'We File Your Return & Provide Support',
      description: 'Our experts prepare and file your tax return, keeping you informed throughout the process.',
      details: [
        'Expert preparation and review',
        'Direct filing with Swiss authorities',
        'Regular progress updates',
        'Final review and explanation',
        'Ongoing support for any questions'
      ],
      color: 'bg-warm-red-tint text-brand-red',
      gradient: 'from-brand-red to-brand-red/80'
    }
  ];

  const timeline = [
    { phase: 'Purchase & Onboarding', duration: '1 day', description: 'Choose your package and get access to our secure portal.' },
    { phase: 'Document Collection', duration: '3-5 days', description: 'Gather and upload all required documents' },
    { phase: 'Preparation', duration: '5-10 days', description: 'Expert preparation and review of your tax return' },
    { phase: 'Filing & Completion', duration: '1-2 days', description: 'Final filing and delivery of completed return' }
  ];

  return (
    <>
      <Helmet>
        <title>How It Works | Taxed GmbH - Simple 3-Step Swiss Tax Filing Process</title>
        <meta name="description" content="Simple 3-step process: Book free consultation, upload documents securely, we file your return. Fast, secure, and stress-free Swiss tax filing." />
        <meta property="og:title" content="How It Works | Taxed GmbH - Simple 3-Step Swiss Tax Filing Process" />
        <meta property="og:description" content="Simple 3-step process: Book free consultation, upload documents securely, we file your return. Fast, secure, and stress-free Swiss tax filing." />
      </Helmet>

      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-dark-gray mb-6">
              How It Works
            </h1>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              Our streamlined 3-step process makes Swiss tax filing simple, secure, and stress-free. 
              From purchase to completion, we guide you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mr-4`}>
                        <step.icon className="h-8 w-8" />
                      </div>
                      <div className="text-4xl font-bold text-light-gray-bg-1">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-dark-gray mb-4">
                      {step.title}
                    </h2>
                    <p className="text-lg text-dark-gray/80 mb-6">
                      {step.description}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-steel-blue rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-dark-gray">{detail}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {index === 0 && (
                      <Button asChild
                        className="bg-steel-blue hover:bg-steel-blue/90 text-white"
                      >
                        <Link to="/store">
                          View Packages
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                  
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-2xl transform rotate-3 opacity-20`}></div>
                      <Card className="relative bg-light-gray-bg-1 border-2 border-steel-blue/10 shadow-xl rounded-2xl overflow-hidden">
                        <div className={`h-2 bg-gradient-to-r ${step.gradient}`}></div>
                        <CardHeader className="text-center py-12">
                          <div className={`w-24 h-24 rounded-full ${step.color} bg-white flex items-center justify-center mx-auto mb-6`}>
                            <step.icon className="h-12 w-12" />
                          </div>
                          <CardTitle className="text-2xl text-dark-gray">{step.title}</CardTitle>
                          <CardDescription className="text-dark-gray/80 mt-2 text-lg">
                            Step {index + 1}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-4">
              Typical Timeline
            </h2>
            <p className="text-xl text-dark-gray">
              From start to finish, most tax returns are completed within 2-3 weeks
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-steel-blue/20"></div>
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start"
                >
                  <div className="w-16 h-16 bg-steel-blue rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg">
                    {index + 1}
                  </div>
                  <div className="ml-8 flex-1">
                    <div className="bg-white rounded-lg shadow-md p-6 border border-steel-blue/10">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-dark-gray">{item.phase}</h3>
                        <span className="text-sm font-medium text-steel-blue bg-warm-red-tint px-3 py-1 rounded-full">
                          {item.duration}
                        </span>
                      </div>
                      <p className="text-dark-gray/80">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 swiss-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-white/80">
              Browse our packages and take the first step toward stress-free Swiss tax filing.
            </p>
            <Button asChild
              size="lg" 
              className="bg-brand-red text-white hover:bg-brand-red/90 text-lg px-8 py-4"
            >
              <Link to="/store">
                Go to Store
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HowItWorksPage;