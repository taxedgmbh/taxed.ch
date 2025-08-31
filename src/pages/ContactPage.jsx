import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 5000,
    });
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '+41799107787';
    const message = encodeURIComponent(
      `Hello! I'm interested in your Swiss tax consulting services.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\n\nMessage: ${formData.message}`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+41 79 910 77 87',
      description: 'Call us during business hours',
      color: 'bg-warm-red-tint text-brand-red'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: '+41 79 910 77 87',
      description: 'Chat with us instantly',
      color: 'bg-green-100 text-green-600',
      isWhatsApp: true
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@taxed.ch',
      description: 'We respond within 24 hours',
      color: 'bg-warm-red-tint text-steel-blue'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'Biel/Bienne, Switzerland',
      description: 'Serving clients throughout Switzerland',
      color: 'bg-warm-red-tint text-brand-red'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Fri: 9:00-18:00',
      description: 'Swiss time (CET/CEST)',
      color: 'bg-warm-red-tint text-steel-blue'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | Taxed GmbH - Get Expert Swiss Tax Help Today</title>
        <meta name="description" content="Contact Taxed GmbH for expert Swiss tax consulting. Call +41 79 910 77 87 or email info@taxed.ch. Located in Biel/Bienne, serving all of Switzerland." />
        <meta property="og:title" content="Contact Us | Taxed GmbH - Get Expert Swiss Tax Help Today" />
        <meta property="og:description" content="Contact Taxed GmbH for expert Swiss tax consulting. Call +41 79 910 77 87 or email info@taxed.ch. Located in Biel/Bienne, serving all of Switzerland." />
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
              Contact Us
            </h1>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              Ready to simplify your Swiss tax filing? Get in touch with our expert team 
              for a free consultation and personalized guidance.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full card-hover border-steel-blue/20 shadow-lg text-center">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full ${info.color} flex items-center justify-center mx-auto mb-4`}>
                      <info.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl text-dark-gray">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-dark-gray mb-2">{info.details}</p>
                    <CardDescription className="text-dark-gray/80">
                      {info.description}
                    </CardDescription>
                    {info.isWhatsApp && (
                      <button
                        onClick={() => {
                          const phoneNumber = '+41799107787';
                          const message = encodeURIComponent("Hello! I'm interested in your Swiss tax consulting services. Could you please provide more information?");
                          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                          window.open(whatsappUrl, '_blank');
                        }}
                        className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Start Chat</span>
                      </button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-steel-blue/20 shadow-xl bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-dark-gray">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                          className="bg-light-gray-bg-1/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                           className="bg-light-gray-bg-1/50"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your tax situation and how we can help..."
                        rows={6}
                        required
                         className="bg-light-gray-bg-1/50"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button type="submit" className="w-full bg-steel-blue hover:bg-steel-blue/90 text-white" size="lg">
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                      <Button 
                        type="button" 
                        onClick={handleWhatsAppClick}
                        className="w-full bg-green-500 hover:bg-green-600 text-white" 
                        size="lg"
                      >
                        Send via WhatsApp
                        <MessageCircle className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Card className="border-0 shadow-xl overflow-hidden">
                <div className="h-64 bg-steel-blue/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-steel-blue mx-auto mb-4" />
                    <p className="text-lg font-semibold text-dark-gray">Biel/Bienne, Switzerland</p>
                    <p className="text-dark-gray/80">Interactive map coming soon</p>
                  </div>
                </div>
              </Card>

              <Card className="border-l-4 border-brand-red shadow-xl bg-white">
                <CardHeader>
                  <CardTitle className="text-xl text-dark-gray">Need Urgent Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-dark-gray/80 mb-4">
                    If you have an urgent tax deadline approaching, don't hesitate to call us directly:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-steel-blue font-semibold">
                      <Phone className="h-5 w-5" />
                      <span>+41 79 910 77 87</span>
                    </div>
                    <button
                      onClick={() => {
                        const phoneNumber = '+41799107787';
                        const message = encodeURIComponent("Hello! I have an urgent tax matter that needs immediate attention. Could you please help me?");
                        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                        window.open(whatsappUrl, '_blank');
                      }}
                      className="w-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Urgent WhatsApp</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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
              Ready to Simplify Your Swiss Taxes?
            </h2>
            <p className="text-xl mb-8 text-white/80">
              Don't let tax complexity stress you out. Contact us today and discover 
              how easy Swiss tax filing can be with the right expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-brand-red text-white hover:bg-brand-red/90 text-lg px-8 py-4"
                onClick={() => window.location.href = 'tel:+41799107787'}
              >
                Call Now: +41 79 910 77 87
              </Button>
              <Button 
                size="lg" 
                className="bg-green-500 text-white hover:bg-green-600 text-lg px-8 py-4"
                onClick={() => {
                  const phoneNumber = '+41799107787';
                  const message = encodeURIComponent("Hello! I'm ready to simplify my Swiss taxes. Could you please help me get started?");
                  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                WhatsApp Chat
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-steel-blue text-lg px-8 py-4"
                onClick={() => window.location.href = 'mailto:info@taxed.ch'}
              >
                Email: info@taxed.ch
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;