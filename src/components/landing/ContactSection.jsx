import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Send, MapPin, Mail, MessageCircle } from 'lucide-react';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 5000,
    });
  };
  
  return (
    <section id="contact" className="py-20 bg-light-gray-bg-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-dark-gray">
            Have a question? Fill out the form below and we'll get back to you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="border-steel-blue/20 shadow-xl bg-white">
              <CardContent className="p-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Full Name *</Label>
                    <Input id="contact-name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your full name" required className="bg-light-gray-bg-1/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email Address *</Label>
                    <Input id="contact-email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="your.email@example.com" required className="bg-light-gray-bg-1/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message *</Label>
                    <Textarea id="contact-message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us how we can help..." rows={5} required className="bg-light-gray-bg-1/50" />
                  </div>
                  <Button type="submit" className="w-full bg-steel-blue hover:bg-steel-blue/90 text-white" size="lg">
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="border-steel-blue/20 shadow-xl bg-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-dark-gray mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-gray">Contact Form</h4>
                      <p className="text-gray-600">Professional inquiry</p>
                      <p className="text-sm text-gray-500">Structured communication for complex matters</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-gray">Email Support</h4>
                      <p className="text-gray-600">info@taxed.ch</p>
                      <p className="text-sm text-gray-500">Professional consultation available</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-gray">Email</h4>
                      <p className="text-gray-600">info@taxed.ch</p>
                      <p className="text-sm text-gray-500">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-gray">Address</h4>
                      <p className="text-gray-600">Aegertenstrasse 10</p>
                      <p className="text-gray-600">2503 Biel/Bienne, Switzerland</p>
                      <button
                        onClick={() => {
                          const address = "Aegertenstrasse 10, 2503 Biel, Switzerland";
                          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
                          window.open(mapsUrl, '_blank');
                        }}
                        className="mt-2 text-sm text-steel-blue hover:text-blue-700 font-medium"
                      >
                        View on Google Maps →
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 shadow-xl bg-gradient-to-br from-green-50 to-blue-50">
              <CardContent className="p-6">
                <h4 className="font-semibold text-dark-gray mb-3">Quick Contact</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Need professional assistance? Email us for detailed consultation from our Swiss tax experts.
                </p>
                <Button
                  onClick={() => {
                    const subject = encodeURIComponent('Swiss Tax Consulting Inquiry');
                    const body = encodeURIComponent("Hello Taxed GmbH,\n\nI have a question about Swiss tax services. Can you help me?");
                    const emailUrl = `mailto:info@taxed.ch?subject=${subject}&body=${body}`;
                    window.open(emailUrl, '_blank');
                  }}
                  className="w-full bg-steel-blue hover:bg-blue-700 text-white"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;