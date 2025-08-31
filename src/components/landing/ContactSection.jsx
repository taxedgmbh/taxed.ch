import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Send } from 'lucide-react';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
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
                  <Label htmlFor="contact-phone">Phone (Optional)</Label>
                  <Input id="contact-phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="Your phone number" className="bg-light-gray-bg-1/50" />
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
      </div>
    </section>
  );
};

export default ContactSection;