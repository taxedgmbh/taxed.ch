import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Shield, 
  Clock, 
  Users, 
  Award, 
  Zap,
  TrendingUp,
  Calculator,
  FileText,
  Headphones,
  MessageCircle,
  Phone,
  Crown,
  Sparkles,
  Target,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProductsList from '@/components/ProductsList';

const PackagesSection = () => {
  const [selectedPackage, setSelectedPackage] = useState('standard');

  const packages = [
    {
      id: 'basic',
      name: 'Basic Tax Return',
      subtitle: 'Perfect for simple tax situations',
      price: 'CHF 299',
      originalPrice: 'CHF 399',
      savings: 'CHF 100',
      popular: false,
      features: [
        'Individual tax return preparation',
        'Standard deductions included',
        'Electronic filing with tax authorities',
        'Final tax return copy',
        'Email support (48h response)',
        'Basic tax optimization'
      ],
      limitations: [
        'Single income source only',
        'No business income',
        'No foreign income',
        'Standard deductions only'
      ],
      color: 'border-gray-300',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
      icon: FileText
    },
    {
      id: 'standard',
      name: 'Standard Tax Return',
      subtitle: 'Most popular for expats and professionals',
      price: 'CHF 499',
      originalPrice: 'CHF 699',
      savings: 'CHF 200',
      popular: true,
      features: [
        'Individual tax return preparation',
        'Multiple income sources',
        'Foreign income handling',
        'Advanced deductions & credits',
        'Tax optimization strategies',
        'Electronic filing with tax authorities',
        'Final tax return copy',
        'Priority email support (24h response)',
        'Phone consultation (30 min)',
        'Post-filing support'
      ],
      limitations: [
        'No business tax returns',
        'No complex investment portfolios',
        'Standard audit support'
      ],
      color: 'border-steel-blue',
      buttonColor: 'bg-steel-blue hover:bg-steel-blue/90',
      icon: Calculator
    },
    {
      id: 'premium',
      name: 'Premium Tax Return',
      subtitle: 'Complete solution for complex situations',
      price: 'CHF 799',
      originalPrice: 'CHF 1,199',
      savings: 'CHF 400',
      popular: false,
      features: [
        'Individual tax return preparation',
        'Business tax returns (if applicable)',
        'Multiple income sources',
        'Foreign income & tax treaties',
        'Complex investment portfolios',
        'Advanced tax optimization',
        'Electronic filing with tax authorities',
        'Final tax return copy',
        'Priority support (same-day response)',
        'Phone consultation (60 min)',
        'Video consultation available',
        'Audit support included',
        'Tax planning for next year',
        'Dedicated tax expert assigned'
      ],
      limitations: [],
      color: 'border-yellow-500',
      buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
      icon: Crown
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Expat in Zurich',
      content: 'The Standard package was perfect for my situation. Saved me CHF 200 and got my taxes done in 3 days!',
      rating: 5,
      package: 'Standard'
    },
    {
      name: 'Michael R.',
      role: 'Business Owner',
      content: 'Premium package handled my complex business taxes flawlessly. Worth every franc!',
      rating: 5,
      package: 'Premium'
    },
    {
      name: 'Emma L.',
      role: 'Freelancer',
      content: 'Basic package was exactly what I needed. Simple, fast, and affordable.',
      rating: 5,
      package: 'Basic'
    }
  ];

  const guarantees = [
    {
      icon: Shield,
      title: '100% Accuracy Guarantee',
      description: 'If we make an error, we fix it for free and cover any penalties'
    },
    {
      icon: Clock,
      title: 'On-Time Filing',
      description: 'We guarantee your taxes are filed before the deadline or we pay the late fees'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Direct access to certified Swiss tax professionals with 15+ years experience'
    },
    {
      icon: Award,
      title: 'Satisfaction Guarantee',
      description: 'Not happy? Get a full refund within 30 days, no questions asked'
    }
  ];

  return (
    <section id="packages" className="py-32 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center bg-green-100 text-green-800 rounded-full px-6 py-3 mb-8">
            <Sparkles className="w-5 h-5 mr-2" />
            <span className="font-semibold">Limited Time: Save up to CHF 400 on all packages!</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-dark-gray mb-6 leading-tight">
            Swiss Tax Returns
            <br />
            <span className="text-steel-blue">Done Right</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
            Skip the Big 4 bureaucracy and get your Swiss taxes done by <strong>certified experts</strong> 
            at <strong>60% lower rates</strong>. Choose your package and get started today.
          </p>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">500+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">15+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">24h</div>
              <div className="text-sm text-gray-600">Response Time</div>
            </div>
          </div>
        </motion.div>

        {/* Package Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative ${pkg.popular ? 'lg:scale-105' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      <Star className="w-4 h-4 inline mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <Card className={`h-full border-2 ${pkg.color} shadow-2xl hover:shadow-3xl transition-all duration-300 ${pkg.popular ? 'ring-2 ring-yellow-400' : ''}`}>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${pkg.id === 'basic' ? 'from-gray-400 to-gray-600' : pkg.id === 'standard' ? 'from-steel-blue to-blue-600' : 'from-yellow-400 to-orange-500'} flex items-center justify-center mx-auto mb-4`}>
                      <pkg.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-dark-gray">{pkg.name}</CardTitle>
                    <CardDescription className="text-gray-600">{pkg.subtitle}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Pricing */}
                    <div className="text-center">
                      <div className="flex items-baseline justify-center gap-2 mb-2">
                        <span className="text-4xl font-bold text-dark-gray">{pkg.price}</span>
                        <span className="text-lg text-gray-500 line-through">{pkg.originalPrice}</span>
                      </div>
                      <div className="inline-flex items-center bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Save {pkg.savings}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-dark-gray mb-3">What's Included:</h4>
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Limitations */}
                    {pkg.limitations.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-600 mb-2 text-sm">Not Included:</h4>
                        {pkg.limitations.map((limitation, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-xs text-gray-500">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA Button */}
                    <div className="pt-4">
                      <Button 
                        className={`w-full ${pkg.buttonColor} text-white text-lg py-4 font-bold`}
                        size="lg"
                        onClick={() => {
                          const subject = encodeURIComponent(`Interest in ${pkg.name} Package`);
                          const body = encodeURIComponent(`Hello Taxed GmbH,\n\nI'm interested in the ${pkg.name} package (${pkg.price}). Can you help me get started?`);
                          const emailUrl = `mailto:info@taxed.ch?subject=${subject}&body=${body}`;
                          window.open(emailUrl, '_blank');
                        }}
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Get Started Now
                      </Button>
                      
                      <div className="text-center mt-3">
                        <Link 
                          to="/contact" 
                          className="text-sm text-steel-blue hover:text-steel-blue/80 font-medium"
                        >
                          Need help choosing? Contact us
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Guarantees Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-dark-gray mb-4">
              Our Guarantees to You
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We stand behind our work with these ironclad guarantees
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={guarantee.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-steel-blue/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-steel-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <guarantee.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-dark-gray mb-2">{guarantee.title}</h4>
                <p className="text-sm text-gray-600">{guarantee.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-dark-gray mb-4">
              What Our Clients Say
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real feedback from real clients who chose the right package
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-dark-gray">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                  <div className="text-xs bg-steel-blue text-white px-2 py-1 rounded-full">
                    {testimonial.package}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative py-20 bg-gradient-to-br from-steel-blue to-blue-800 rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative text-center text-white px-8">
            <h3 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Get Your Taxes Done?
            </h3>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Join 500+ satisfied clients who chose the smart alternative to Big 4 bureaucracy. 
              Get started today and save up to CHF 400!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-steel-blue hover:bg-gray-100 text-lg px-8 py-4 font-bold"
                onClick={() => {
                  const subject = encodeURIComponent('Swiss Tax Package Selection');
                  const body = encodeURIComponent("Hello Taxed GmbH,\n\nI'm ready to get my Swiss taxes done! Can you help me choose the right package?");
                  const emailUrl = `mailto:info@taxed.ch?subject=${subject}&body=${body}`;
                  window.open(emailUrl, '_blank');
                }}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Get Started Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-steel-blue text-lg px-8 py-4 font-bold"
                onClick={() => window.location.href = 'tel:+41799107787'}
              >
                <Mail className="mr-2 h-5 w-5" />
                Email: info@taxed.ch
              </Button>
            </div>

            <div className="mt-8 text-sm text-blue-200">
              <p>✨ Free consultation included • 🔒 Secure & confidential • ⚡ Same-day response</p>
            </div>
          </div>
        </motion.div>

        {/* Fallback to ProductsList for existing products */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-dark-gray mb-4">
              Additional Services
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our additional tax services and tools
            </p>
          </div>
        <ProductsList />
        </motion.div>
      </div>
    </section>
  );
};

export default PackagesSection;