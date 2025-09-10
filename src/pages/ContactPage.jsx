import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  Star, 
  CheckCircle, 
  XCircle, 
  Award, 
  Users, 
  Zap, 
  Shield, 
  DollarSign,
  TrendingUp,
  Target,
  Clock3,
  Globe,
  Building2,
  Calculator,
  FileText,
  Headphones
} from 'lucide-react';
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

  const handleEmailClick = () => {
    const subject = encodeURIComponent(formData.subject || 'Swiss Tax Consulting Inquiry');
    const body = encodeURIComponent(
      `Hello Taxed GmbH,\n\nI'm interested in your Swiss tax consulting services.\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`
    );
    const emailUrl = `mailto:info@taxed.ch?subject=${subject}&body=${body}`;
    window.open(emailUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: MessageCircle,
      title: 'Contact Form',
      details: 'Professional inquiry',
      description: 'Structured communication for complex matters',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@taxed.ch',
      description: 'Primary communication channel - we respond within 24 hours',
      color: 'bg-warm-red-tint text-steel-blue'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'Aegertenstrasse 10, 2503 Biel/Bienne',
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

  const big4Comparison = [
    {
      feature: "Hourly Rate",
      big4: "CHF 400-800+",
      taxed: "CHF 150-300",
      advantage: "60%+ Savings",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      feature: "Response Time",
      big4: "3-7 days",
      taxed: "Same day",
      advantage: "Instant Access",
      icon: Zap,
      color: "text-blue-600"
    },
    {
      feature: "Personal Attention",
      big4: "Junior staff",
      taxed: "Senior experts",
      advantage: "Direct Access",
      icon: Users,
      color: "text-purple-600"
    },
    {
      feature: "Swiss Expertise",
      big4: "Global focus",
      taxed: "Swiss specialists",
      advantage: "Local Knowledge",
      icon: Globe,
      color: "text-red-600"
    },
    {
      feature: "Flexibility",
      big4: "Rigid processes",
      taxed: "Adaptive approach",
      advantage: "Tailored Solutions",
      icon: Target,
      color: "text-orange-600"
    },
    {
      feature: "Technology",
      big4: "Legacy systems",
      taxed: "Modern tools",
      advantage: "Efficiency",
      icon: Calculator,
      color: "text-indigo-600"
    }
  ];

  const urgencyReasons = [
    {
      icon: Clock3,
      title: "Tax Deadline Approaching",
      description: "Don't risk penalties - get expert help now",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: FileText,
      title: "Complex Tax Situation",
      description: "Multi-country income, investments, or business",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Building2,
      title: "Business Tax Needs",
      description: "Corporate tax, VAT, or payroll compliance",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: TrendingUp,
      title: "Tax Optimization",
      description: "Maximize deductions and minimize liability",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Get Expert Swiss Tax Help Now | Taxed GmbH - Better Than Big 4</title>
        <meta name="description" content="Skip the Big 4 bureaucracy. Get direct access to senior Swiss tax experts at 60% lower rates. Email info@taxed.ch for professional consultation." />
        <meta property="og:title" content="Get Expert Swiss Tax Help Now | Taxed GmbH - Better Than Big 4" />
        <meta property="og:description" content="Skip the Big 4 bureaucracy. Get direct access to senior Swiss tax experts at 60% lower rates. Email info@taxed.ch for professional consultation." />
      </Helmet>

      {/* Hero Section - Maximum CTA */}
      <section className="relative py-32 bg-gradient-to-br from-steel-blue via-blue-600 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-sm font-semibold">Swiss Tax Experts • 15+ Years Experience • 500+ Happy Clients</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Skip the Big 4
              <br />
              <span className="text-yellow-400">Get Swiss Tax Experts</span>
              <br />
              <span className="text-4xl lg:text-5xl">60% Lower Rates</span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Why pay Big 4 prices for junior staff when you can get <strong>direct access to senior Swiss tax experts</strong> 
              at a fraction of the cost? <strong>Same-day response, personalized service, Swiss precision.</strong>
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                className="bg-steel-blue hover:bg-blue-700 text-white text-xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-200"
                onClick={handleEmailClick}
              >
                <Mail className="mr-3 h-6 w-6" />
                Email: info@taxed.ch
              </Button>
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white text-xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-200"
                onClick={() => {
                  const subject = encodeURIComponent('Swiss Tax Consulting Inquiry');
                  const body = encodeURIComponent("Hello Taxed GmbH,\n\nI want to skip the Big 4 and get expert Swiss tax help at 60% lower rates. Can you help me?");
                  const emailUrl = `mailto:info@taxed.ch?subject=${subject}&body=${body}`;
                  window.open(emailUrl, '_blank');
                }}
              >
                <Mail className="mr-3 h-6 w-6" />
                Email Expert
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">98%</div>
                <div className="text-sm text-blue-200">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">24h</div>
                <div className="text-sm text-blue-200">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">60%</div>
                <div className="text-sm text-blue-200">Cost Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">15+</div>
                <div className="text-sm text-blue-200">Years Experience</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Big 4 Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-dark-gray mb-6">
              Why Choose Taxed GmbH Over Big 4?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get the expertise of Big 4 professionals without the bureaucracy, delays, and premium pricing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {big4Comparison.map((item, index) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-2 border-gray-200 hover:border-steel-blue/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4`}>
                      <item.icon className={`h-8 w-8 ${item.color}`} />
                    </div>
                    <CardTitle className="text-xl text-dark-gray">{item.feature}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-600">Big 4</span>
                      <span className="text-lg font-bold text-red-600">{item.big4}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-600">Taxed GmbH</span>
                      <span className="text-lg font-bold text-green-600">{item.taxed}</span>
                    </div>
                    <div className="text-center">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${item.color} bg-gray-100`}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {item.advantage}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Urgency Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-dark-gray mb-8">
              Need Help Right Now? We're Here!
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {urgencyReasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-steel-blue/50 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-full ${reason.color} flex items-center justify-center mx-auto mb-4`}>
                    <reason.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-dark-gray mb-2">{reason.title}</h4>
                  <p className="text-sm text-gray-600">{reason.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark-gray mb-6">
              Multiple Ways to Reach Our Experts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the method that works best for you. All channels connect you directly to our senior tax experts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full card-hover border-steel-blue/20 shadow-lg text-center hover:shadow-xl transition-all duration-300">
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
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form Section */}
      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-dark-gray mb-6">
              Get Your Free Tax Consultation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Skip the Big 4 wait times. Get direct access to our senior Swiss tax experts for a personalized consultation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-steel-blue/30 shadow-2xl bg-white">
                <CardHeader className="bg-gradient-to-r from-steel-blue to-blue-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center">
                    <Headphones className="mr-3 h-6 w-6" />
                    Free Expert Consultation
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Get personalized advice from senior Swiss tax experts - no Big 4 bureaucracy.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-dark-gray font-semibold">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                          className="bg-light-gray-bg-1/50 border-2 border-gray-200 focus:border-steel-blue"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-dark-gray font-semibold">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                          className="bg-light-gray-bg-1/50 border-2 border-gray-200 focus:border-steel-blue"
                        />
                      </div>
                    </div>
                    

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-dark-gray font-semibold">Tax Situation *</Label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border-2 border-gray-200 rounded-lg bg-light-gray-bg-1/50 focus:border-steel-blue focus:outline-none"
                      >
                        <option value="">Select your tax situation</option>
                        <option value="Individual Tax Return">Individual Tax Return</option>
                        <option value="Business Tax">Business Tax</option>
                        <option value="Expat Tax Filing">Expat Tax Filing</option>
                        <option value="Tax Optimization">Tax Optimization</option>
                        <option value="Urgent Deadline">Urgent Deadline</option>
                        <option value="Complex Situation">Complex Situation</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-dark-gray font-semibold">Tell Us More *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Describe your tax situation, deadlines, or specific questions. The more details you provide, the better we can help you."
                        rows={6}
                        required
                        className="bg-light-gray-bg-1/50 border-2 border-gray-200 focus:border-steel-blue"
                      />
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-start space-x-3">
                        <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-1">Your Information is Secure</h4>
                          <p className="text-sm text-blue-700">
                            We use bank-level encryption and never share your information with third parties. 
                            Swiss privacy laws protect your data.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button type="submit" className="w-full bg-steel-blue hover:bg-steel-blue/90 text-white text-lg py-4" size="lg">
                        <Send className="mr-2 h-5 w-5" />
                        Get Free Consultation
                      </Button>
                      <Button 
                        type="button" 
                        onClick={handleEmailClick}
                        className="w-full bg-steel-blue hover:bg-blue-700 text-white text-lg py-4" 
                        size="lg"
                      >
                        <Mail className="mr-2 h-5 w-5" />
                        Email Expert
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
              {/* Why Choose Us Card */}
              <Card className="border-2 border-green-200 shadow-xl bg-gradient-to-br from-green-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-2xl text-dark-gray flex items-center">
                    <Award className="mr-3 h-6 w-6 text-green-600" />
                    Why Choose Taxed GmbH?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-dark-gray font-medium">Direct access to senior experts</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-dark-gray font-medium">60% lower rates than Big 4</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-dark-gray font-medium">Same-day response guaranteed</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-dark-gray font-medium">15+ years Swiss tax experience</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-dark-gray font-medium">500+ satisfied clients</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-dark-gray font-medium">98% success rate</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Urgent Help Card */}
              <Card className="border-l-4 border-red-500 shadow-xl bg-white">
                <CardHeader>
                  <CardTitle className="text-xl text-dark-gray flex items-center">
                    <Clock3 className="mr-3 h-5 w-5 text-red-500" />
                    Need Urgent Help?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-dark-gray/80 mb-4">
                    Tax deadline approaching? Don't risk penalties. Get immediate expert assistance:
                  </p>
                  <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-steel-blue font-semibold">
                        <Mail className="h-5 w-5" />
                        <span>info@taxed.ch</span>
                      </div>
                    <button
                      onClick={() => {
                        const subject = encodeURIComponent('URGENT: Swiss Tax Deadline');
                        const body = encodeURIComponent("Hello Taxed GmbH,\n\nURGENT: I have a tax deadline approaching and need immediate expert help. Can you assist me?");
                        const emailUrl = `mailto:info@taxed.ch?subject=${subject}&body=${body}`;
                        window.open(emailUrl, '_blank');
                      }}
                      className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Urgent Email</span>
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Location Card */}
              <Card className="border-0 shadow-xl overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-steel-blue/20 to-blue-600/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-steel-blue mx-auto mb-4" />
                    <p className="text-lg font-semibold text-dark-gray">Aegertenstrasse 10</p>
                    <p className="text-dark-gray/80">2503 Biel/Bienne, Switzerland</p>
                    <p className="text-sm text-dark-gray/60 mt-2">Serving clients throughout Switzerland</p>
                    <button
                      onClick={() => {
                        const address = "Aegertenstrasse 10, 2503 Biel, Switzerland";
                        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
                        window.open(mapsUrl, '_blank');
                      }}
                      className="mt-3 px-4 py-2 bg-steel-blue text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      View on Google Maps
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Maximum CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-red-600 via-red-700 to-red-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Zap className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-sm font-semibold">Limited Time: Free Consultation + 10% Discount</span>
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Don't Let Big 4 Bureaucracy
              <br />
              <span className="text-yellow-400">Cost You Money</span>
            </h2>
            
            <p className="text-xl lg:text-2xl mb-12 text-red-100 max-w-4xl mx-auto leading-relaxed">
              Every day you wait is money lost. <strong>Get expert Swiss tax help now</strong> and save thousands 
              compared to Big 4 rates. <strong>Free consultation + 10% discount for new clients.</strong>
            </p>

            {/* Final CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                className="bg-white text-red-600 hover:bg-gray-100 text-xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-200 font-bold"
                onClick={handleEmailClick}
              >
                <Mail className="mr-3 h-6 w-6" />
                Email: info@taxed.ch
              </Button>
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white text-xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-200 font-bold"
                onClick={() => {
                  const subject = encodeURIComponent('Free Consultation + 10% Discount');
                  const body = encodeURIComponent("Hello Taxed GmbH,\n\nI want the free consultation + 10% discount! Help me skip the Big 4 and get expert Swiss tax assistance.");
                  const emailUrl = `mailto:info@taxed.ch?subject=${subject}&body=${body}`;
                  window.open(emailUrl, '_blank');
                }}
              >
                <MessageCircle className="mr-3 h-6 w-6" />
                Get Free Consultation
              </Button>
            </div>

            {/* Final Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">FREE</div>
                <div className="text-sm text-red-200">Consultation</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">10%</div>
                <div className="text-sm text-red-200">Discount</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">24h</div>
                <div className="text-sm text-red-200">Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">500+</div>
                <div className="text-sm text-red-200">Happy Clients</div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-red-200 mb-4">
                <strong>Don't wait!</strong> Tax deadlines don't wait for Big 4 bureaucracy.
              </p>
              <p className="text-sm text-red-300">
                *Free consultation includes 30-minute expert review of your tax situation. 10% discount applies to first-time clients.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;