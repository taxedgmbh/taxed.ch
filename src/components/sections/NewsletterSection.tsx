import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Shield,
  Users,
  Gift
} from 'lucide-react';

interface NewsletterSectionProps {
  className?: string;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setEmail('');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Tax Optimization Tips',
      description: 'Monthly strategies to legally reduce your tax burden'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Compliance Updates',
      description: 'Stay informed about Swiss tax law changes'
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: 'Exclusive Offers',
      description: 'Special discounts and early access to new services'
    }
  ];

  const stats = [
    { number: '2,500+', label: 'Subscribers' },
    { number: '95%', label: 'Satisfaction Rate' },
    { number: 'Weekly', label: 'Updates' }
  ];

  return (
    <section className={`py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Stay Updated with <span className="text-yellow-300">Tax Insights</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Get expert tax advice, Swiss law updates, and exclusive tips delivered to your inbox. 
              Join our community of smart taxpayers.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Newsletter Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Subscribe to Our Newsletter
                  </h3>
                  <p className="text-blue-100">
                    Get weekly tax tips and exclusive insights from our experts.
                  </p>
                </div>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-lg flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-green-100">Successfully subscribed! Check your email for confirmation.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg flex items-center space-x-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-300" />
                    <span className="text-red-100">Something went wrong. Please try again.</span>
                  </motion.div>
                )}

                {/* HubSpot Newsletter Signup Form */}
                <div className="hubspot-newsletter-container">
                  <iframe 
                    src="https://share-eu1.hsforms.com/1uITtAEHOS8OOaBP67HZnYQ2ds4ox"
                    width="100%"
                    height="400"
                    frameBorder="0"
                    scrolling="no"
                    title="Taxed GmbH Newsletter Signup"
                    className="border-0 rounded-lg"
                    style={{ minHeight: '400px', backgroundColor: 'transparent' }}
                  />
                </div>

                <p className="text-sm text-blue-200 mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </Card>
            </motion.div>

            {/* Benefits & Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Benefits */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  What You'll Get
                </h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-blue-100 text-sm">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4"
                  >
                    <div className="text-2xl font-bold text-white">
                      {stat.number}
                    </div>
                    <div className="text-blue-100 text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Join Our Community</div>
                    <div className="text-blue-100 text-sm">2,500+ smart taxpayers</div>
                  </div>
                </div>
                <p className="text-blue-100 text-sm">
                  "The newsletter has helped me save over CHF 5,000 in taxes this year alone. 
                  The tips are practical and easy to implement." - Sarah M.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Additional CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Optimize Your Taxes?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Don't wait for the newsletter. Get a personalized consultation with our tax experts 
                and start saving money today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
                  View Services
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};



