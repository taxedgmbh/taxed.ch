import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle,
  TrendingUp,
  Shield
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  content: string;
  rating: number;
  image: string;
  industry: string;
  savings: string;
  service: string;
}

interface TestimonialsSectionProps {
  className?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 'testimonial-1',
      name: 'Anna Schmidt',
      company: 'TechStart AG',
      position: 'CEO',
      content: 'Taxed GmbH helped us save over CHF 50,000 in taxes during our first year. Their expertise in startup tax optimization is unmatched. The team is professional, responsive, and truly understands the challenges of growing a business in Switzerland.',
      rating: 5,
      image: '/images/testimonials/anna-schmidt.jpg',
      industry: 'Technology',
      savings: 'CHF 50,000',
      service: 'Business Tax Optimization'
    },
    {
      id: 'testimonial-2',
      name: 'Robert Müller',
      company: 'Müller & Associates',
      position: 'Managing Partner',
      content: 'As a small law firm, we needed reliable bookkeeping and tax services. Taxed GmbH has been our partner for 3 years now. They handle everything professionally and we can focus on our clients. Highly recommended!',
      rating: 5,
      image: '/images/testimonials/robert-mueller.jpg',
      industry: 'Legal Services',
      savings: 'CHF 15,000',
      service: 'Bookkeeping & Tax Services'
    },
    {
      id: 'testimonial-3',
      name: 'Sarah Johnson',
      company: 'Johnson Consulting',
      position: 'Independent Consultant',
      content: 'I was overwhelmed with Swiss tax regulations as an expat. Emmanuel and his team made everything clear and helped me optimize my tax situation. I saved money and gained peace of mind. Excellent service!',
      rating: 5,
      image: '/images/testimonials/sarah-johnson.jpg',
      industry: 'Consulting',
      savings: 'CHF 8,000',
      service: 'Individual Tax Consulting'
    },
    {
      id: 'testimonial-4',
      name: 'Michael Weber',
      company: 'Weber Manufacturing',
      position: 'Owner',
      content: 'We\'ve been working with Taxed GmbH for 5 years. They helped us restructure our business and save significantly on taxes. Their knowledge of Swiss business law is impressive. Trustworthy and professional.',
      rating: 5,
      image: '/images/testimonials/michael-weber.jpg',
      industry: 'Manufacturing',
      savings: 'CHF 75,000',
      service: 'Business Restructuring'
    },
    {
      id: 'testimonial-5',
      name: 'Lisa Chen',
      company: 'Chen Trading Ltd',
      position: 'Director',
      content: 'International tax compliance was a nightmare until we found Taxed GmbH. They handle all our cross-border tax issues and ensure we stay compliant. Professional, knowledgeable, and always available when we need them.',
      rating: 5,
      image: '/images/testimonials/lisa-chen.jpg',
      industry: 'Trading',
      savings: 'CHF 30,000',
      service: 'International Tax Compliance'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

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
            What Our <span className="text-blue-600">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience with Taxed GmbH.
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white p-8 lg:p-12 shadow-xl">
                <div className="flex items-start space-x-6">
                  {/* Quote Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <Quote className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
                      "{currentTestimonial.content}"
                    </blockquote>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 text-lg">
                          {currentTestimonial.name}
                        </div>
                        <div className="text-blue-600 font-medium">
                          {currentTestimonial.position}, {currentTestimonial.company}
                        </div>
                        <div className="text-sm text-gray-500">
                          {currentTestimonial.industry} • {currentTestimonial.service}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {currentTestimonial.savings}
                        </div>
                        <div className="text-sm text-gray-500">Saved</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="w-10 h-10 p-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="w-10 h-10 p-0"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          <Card className="bg-white p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
            <div className="text-gray-600">Client Satisfaction Rate</div>
          </Card>
          
          <Card className="bg-white p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">CHF 2M+</div>
            <div className="text-gray-600">Total Client Savings</div>
          </Card>
          
          <Card className="bg-white p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
            <div className="text-gray-600">Compliance Rate</div>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">
            Join Our Satisfied Clients
          </h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Experience the same level of professional service and tax optimization that our clients rave about.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4">
              Get Free Consultation
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              View Case Studies
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
