import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Calculator, 
  FileText, 
  Users, 
  Shield, 
  TrendingUp, 
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  price: string;
  popular?: boolean;
}

interface ServicesSectionProps {
  className?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ className = '' }) => {
  const services: Service[] = [
    {
      id: 'tax-consulting',
      title: 'Tax Consulting',
      description: 'Personal tax advice and optimization strategies for individuals and families.',
      icon: <Calculator className="w-8 h-8" />,
      features: [
        'Personal tax planning',
        'Tax optimization strategies',
        'Annual tax returns',
        'Tax audit support'
      ],
      price: 'From CHF 150/hour'
    },
    {
      id: 'bookkeeping',
      title: 'Bookkeeping',
      description: 'Professional bookkeeping services for small and medium businesses.',
      icon: <FileText className="w-8 h-8" />,
      features: [
        'Monthly bookkeeping',
        'Financial statements',
        'VAT returns',
        'Payroll management'
      ],
      price: 'From CHF 200/month',
      popular: true
    },
    {
      id: 'payroll',
      title: 'Payroll Services',
      description: 'Complete payroll processing and HR administration for your employees.',
      icon: <Users className="w-8 h-8" />,
      features: [
        'Salary calculations',
        'Social security',
        'Pension fund management',
        'HR administration'
      ],
      price: 'From CHF 50/employee'
    },
    {
      id: 'compliance',
      title: 'Tax Compliance',
      description: 'Ensure full compliance with Swiss tax laws and regulations.',
      icon: <Shield className="w-8 h-8" />,
      features: [
        'Regulatory compliance',
        'Tax law updates',
        'Audit preparation',
        'Documentation'
      ],
      price: 'From CHF 300/month'
    },
    {
      id: 'business-setup',
      title: 'Business Setup',
      description: 'Complete company formation and business registration services.',
      icon: <TrendingUp className="w-8 h-8" />,
      features: [
        'Company registration',
        'Business permits',
        'Tax registration',
        'Legal compliance'
      ],
      price: 'From CHF 1,500'
    },
    {
      id: 'tax-audit',
      title: 'Tax Audit Support',
      description: 'Professional representation during tax audits and investigations.',
      icon: <Clock className="w-8 h-8" />,
      features: [
        'Audit representation',
        'Document preparation',
        'Legal support',
        'Settlement negotiations'
      ],
      price: 'From CHF 200/hour'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className={`py-20 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive tax and accounting services tailored to your needs. 
            From individual tax consulting to complete business solutions.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Card className={`relative h-full p-8 hover:shadow-xl transition-all duration-300 ${
                service.popular ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white'
              }`}>
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    service.popular ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <div className="text-lg font-bold text-blue-600">
                    {service.price}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full ${
                    service.popular 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-white rounded-2xl p-12 shadow-lg"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Need a Custom Solution?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Every business is unique. Let us create a tailored package that fits your specific needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
              Get Custom Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4">
              Schedule Consultation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
