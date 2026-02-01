import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  Target, 
  Heart, 
  Mail, 
  MapPin, 
  Phone, 
  Globe, 
  TrendingUp, 
  Shield, 
  Clock, 
  CheckCircle, 
  Star, 
  Building, 
  Briefcase, 
  GraduationCap,
  Languages,
  Calculator,
  FileText,
  Zap,
  ArrowRight,
  Play,
  Calendar,
  DollarSign,
  BarChart3,
  Users2,
  Trophy,
  Lightbulb,
  Lock,
  Eye,
  Scale,
  BookOpen,
  Compass,
  Flag,
  Coffee,
  Mountain,
  Train,
  Car
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/Breadcrumbs';

const AboutPage = () => {
  const team = [
    {
      name: 'Emanuel Flury',
      role: 'Founder & Senior Tax Consultant',
      description: 'Emanuel Flury is the Founder of Taxed GmbH, specializing in helping expats and professionals navigate Swiss tax requirements with transparent, flat-rate services. He is responsible for the overall management of the firm and advises clients in matters related to Swiss taxation.',
      email: 'info@taxed.ch',
      image: 'https://eflury.com/images/portraits/emanuel-aaron-flury-portrait.png',
      experience: '10+ years',
      expertise: ['Swiss Taxation', 'Expat Tax Services', 'Tax Optimization', 'Business Strategy'],
      education: 'Swiss Tax Advisory Certification',
      languages: ['German', 'English', 'French'],
      achievements: ['Swiss Certified Tax Expert', '500+ Happy Clients', '98% Success Rate']
    },
    {
      name: 'Angela Samson',
      role: 'Tax Return Preparer',
      description: 'Angela Samson is a dedicated tax return preparer at Taxed GmbH, helping clients file accurate and compliant Swiss tax returns. She ensures all documentation is properly prepared and submitted on time.',
      email: 'info@taxed.ch',
      image: null,
      initials: 'AS',
      experience: 'Professional',
      expertise: ['Individual Tax Returns', 'Tax Compliance', 'Documentation', 'Client Support'],
      education: 'Tax Preparation Certification',
      languages: ['English'],
      achievements: ['Accuracy Excellence', 'Client Support Specialist', 'Documentation Expert']
    },
    {
      name: 'Patricia Marie Fangon',
      role: 'Tax Return Preparer',
      description: 'Patricia Marie Fangon is an experienced tax return preparer providing bilingual support for French and English speaking clients. She helps manage client documentation and the preparation of tax-related information.',
      email: 'info@taxed.ch',
      image: null,
      initials: 'PF',
      experience: 'Professional',
      expertise: ['Individual Tax Returns', 'Bilingual Support', 'Client Communication', 'Tax Documentation'],
      education: 'Tax Preparation Certification',
      languages: ['French', 'English'],
      achievements: ['Bilingual Specialist', 'Client Relations Expert', 'Documentation Excellence']
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Transparency',
      description: 'Clear, upfront pricing with no hidden fees or surprises. You know exactly what you pay.',
      color: 'bg-warm-red-tint text-brand-red',
      details: 'We believe in complete transparency in all our dealings. From our flat-rate pricing to our clear communication, you always know where you stand.'
    },
    {
      icon: Heart,
      title: 'Simplicity',
      description: 'We make complex Swiss tax laws simple and understandable for everyone.',
      color: 'bg-warm-red-tint text-steel-blue',
      details: 'Complex tax matters shouldn\'t be complicated for clients. We break down intricate Swiss tax regulations into clear, actionable advice.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality service and expert guidance.',
      color: 'bg-warm-red-tint text-brand-red',
      details: 'We maintain the highest standards of professional excellence, ensuring every client receives world-class service and expert guidance.'
    },
    {
      icon: Users,
      title: 'Personal Touch',
      description: 'Every client receives personalized attention and tailored solutions.',
      color: 'bg-warm-red-tint text-steel-blue',
      details: 'We treat every client as an individual, providing personalized solutions that address their unique tax situation and needs.'
    }
  ];

  const milestones = [
    {
      year: '2025',
      title: 'Customer Portal Implementation',
      description: 'Successfully implemented the customer portal on taxed.ch, providing clients with secure access to their tax documents, real-time updates, and streamlined communication',
      icon: Lock
    },
    {
      year: '2024',
      title: 'Expansion & Growth',
      description: 'Enhanced digital platforms and grew client base to 500+ happy clients across Switzerland',
      icon: TrendingUp
    },
    {
      year: '2023',
      title: 'Digital Transformation',
      description: 'Launched advanced online tools, client portal, and automated blog generation system',
      icon: Zap
    },
    {
      year: '2022',
      title: 'Team Expansion',
      description: 'Welcomed Patricia and Angela to strengthen our tax consulting capabilities',
      icon: Users2
    },
    {
      year: '2021',
      title: 'Foundation',
      description: 'Taxed GmbH founded by Emanuel Flury in Biel/Bienne, Switzerland',
      icon: Building
    }
  ];

  const services = [
    {
      icon: Calculator,
      title: 'Tax Calculators',
      description: 'Free Swiss tax calculators for income, wealth, and real estate taxes',
      features: ['Income Tax Calculator', 'Wealth Tax Calculator', 'Real Estate Tax Calculator', 'Pillar 3a Calculator']
    },
    {
      icon: FileText,
      title: 'Resource Center',
      description: 'Comprehensive guides, checklists, and templates for Swiss tax filing',
      features: ['Tax Guides', 'Checklists', 'Templates', 'Legal Documents']
    },
    {
      icon: BarChart3,
      title: 'Advanced Tools',
      description: 'Professional tax analysis tools and case studies',
      features: ['Case Studies', 'Industry Specializations', 'Advanced Analytics', 'Client Portal']
    },
    {
      icon: Globe,
      title: 'International Expertise',
      description: 'Specialized services for expatriates and international clients',
      features: ['Expatriate Services', 'Cross-border Taxation', 'International Compliance', 'Bilingual Support']
    }
  ];

  const stats = [
    { number: '500+', label: 'Happy Clients', icon: Users, color: 'text-blue-600' },
    { number: '98%', label: 'Success Rate', icon: CheckCircle, color: 'text-green-600' },
    { number: '10+', label: 'Years Experience', icon: Clock, color: 'text-purple-600' },
    { number: '3', label: 'Expert Team Members', icon: Award, color: 'text-orange-600' }
  ];

  const swissAdvantages = [
    {
      icon: Mountain,
      title: 'Swiss Quality',
      description: 'Benefit from Swiss precision, reliability, and attention to detail in every aspect of our service.'
    },
    {
      icon: Train,
      title: 'Central Location',
      description: 'Located in Biel/Bienne, we\'re easily accessible from all major Swiss cities and regions.'
    },
    {
      icon: Languages,
      title: 'Multilingual',
      description: 'Our team speaks German, English, French, Spanish, and Italian to serve international clients.'
    },
    {
      icon: Shield,
      title: 'Swiss Security',
      description: 'Experience the highest standards of data protection and confidentiality that Switzerland is known for.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Taxed GmbH - Expert Swiss Tax Consulting Team</title>
        <meta name="description" content="Meet the expert team at Taxed GmbH. Founded by Emanuel Flury in Biel/Bienne, Switzerland, we specialize in making Swiss tax filing simple for expats with 15+ years of experience and 500+ happy clients." />
        <meta property="og:title" content="About Us | Taxed GmbH - Expert Swiss Tax Consulting Team" />
        <meta property="og:description" content="Meet the expert team at Taxed GmbH. Founded by Emanuel Flury in Biel/Bienne, Switzerland, we specialize in making Swiss tax filing simple for expats with 15+ years of experience and 500+ happy clients." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ label: 'About', path: '/about' }]} />
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-steel-blue via-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              About Taxed GmbH
            </h1>
            <p className="text-xl lg:text-2xl max-w-4xl mx-auto mb-8 text-blue-100">
              Leading Swiss tax consulting firm specializing in expatriate services, 
              with 15+ years of experience and 500+ happy clients across Switzerland.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-6">
                Our Mission & Vision
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-steel-blue">
                  <h3 className="text-xl font-bold text-dark-gray mb-3">Our Mission</h3>
                  <p className="text-dark-gray/80">
                    "We make Swiss tax filing simple, digital, and stress-free — with no hidden costs."
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-brand-red">
                  <h3 className="text-xl font-bold text-dark-gray mb-3">Our Vision</h3>
                  <p className="text-dark-gray/80">
                    To become the leading Swiss tax consulting firm for expatriates and international professionals, 
                    known for innovation, transparency, and exceptional client service.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-steel-blue to-blue-600 p-6 rounded-2xl text-white">
                  <h3 className="text-xl font-bold mb-3">Our Promise</h3>
                  <p className="text-blue-100">
                    Transparent, flat-rate pricing ensures you always know what you're paying, 
                    while our bilingual team provides expert guidance in multiple languages.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <img  
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
                alt="Modern office in Biel/Bienne Switzerland"
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              />
              <div className="grid grid-cols-2 gap-4">
                <img  
                  className="rounded-xl shadow-lg w-full h-32 object-cover"
                  alt="Swiss mountains and business"
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                />
                <img  
                  className="rounded-xl shadow-lg w-full h-32 object-cover"
                  alt="Professional tax consultation"
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto mb-8">
              Our experienced professionals are dedicated to providing you with 
              the best possible tax consulting services.
            </p>
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg">
              <Users className="h-5 w-5 text-steel-blue" />
              <span className="text-sm font-medium text-dark-gray">3 Expert Team Members</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex"
              >
                <Card className="h-full w-full flex flex-col card-hover border-steel-blue/20 shadow-lg bg-white overflow-hidden">
                  <div className="bg-gradient-to-r from-steel-blue to-blue-600 p-6 text-white">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20 flex-shrink-0">
                        {member.image ? (
                          <img
                            className="w-full h-full object-cover object-top"
                            alt={member.name}
                            src={member.image}
                          />
                        ) : (
                          <div className="w-full h-full bg-white/20 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">{member.initials}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="text-blue-100 font-medium">{member.role}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm text-blue-100">{member.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="flex-grow p-6">
                    <p className="text-dark-gray/80 mb-4">
                      {member.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-dark-gray mb-2 flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2 text-steel-blue" />
                          Education
                        </h4>
                        <p className="text-sm text-dark-gray/70">{member.education}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-dark-gray mb-2 flex items-center">
                          <Languages className="h-4 w-4 mr-2 text-steel-blue" />
                          Languages
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {member.languages.map((lang) => (
                            <span key={lang} className="px-2 py-1 bg-steel-blue/10 text-steel-blue text-xs rounded-full">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-dark-gray mb-2 flex items-center">
                          <Star className="h-4 w-4 mr-2 text-steel-blue" />
                          Key Achievements
                        </h4>
                        <ul className="text-sm text-dark-gray/70 space-y-1">
                          {member.achievements.map((achievement) => (
                            <li key={achievement} className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-6 pt-0">
                    <a 
                      href={`mailto:${member.email}`} 
                      className="w-full bg-gradient-to-r from-steel-blue to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Contact {member.name.split(' ')[0]}</span>
                    </a>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              These core principles guide everything we do and shape how we serve our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full card-hover border-steel-blue/20 shadow-lg text-center bg-white group">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full ${value.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl text-dark-gray">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-dark-gray/80 mb-4">
                      {value.description}
                    </CardDescription>
                    <p className="text-sm text-dark-gray/70">
                      {value.details}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-4">
              Our Comprehensive Services
            </h2>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              From free calculators to advanced consulting, we provide everything you need for Swiss tax compliance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full card-hover border-steel-blue/20 shadow-lg bg-white group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-steel-blue to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-dark-gray">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-dark-gray/80 mb-4">
                      {service.description}
                    </CardDescription>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-dark-gray/70">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Swiss Advantages */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-4">
              Why Choose Swiss Expertise?
            </h2>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              Experience the advantages of working with a Swiss-based tax consulting firm.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {swissAdvantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full card-hover border-steel-blue/20 shadow-lg text-center bg-white">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-red to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <advantage.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-dark-gray">{advantage.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-dark-gray/80">
                      {advantage.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              From humble beginnings to becoming a leading Swiss tax consulting firm.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-steel-blue to-blue-600"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="bg-white shadow-lg border-steel-blue/20">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-steel-blue to-blue-600 rounded-full flex items-center justify-center">
                            <milestone.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl font-bold text-steel-blue">{milestone.year}</CardTitle>
                            <CardDescription className="text-lg font-semibold text-dark-gray">{milestone.title}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-dark-gray/80">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="w-8 h-8 bg-white border-4 border-steel-blue rounded-full z-10 relative"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              Ready to Experience Swiss Excellence?
            </h2>
            <p className="text-xl mb-8 text-white/80">
              Join 500+ satisfied clients who trust Taxed GmbH for their Swiss tax needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 glass-effect">
                <h3 className="text-lg font-bold mb-3">Get Started Today</h3>
                <p className="text-white/80 mb-4">Book a free consultation with our expert team</p>
                <Button asChild className="w-full bg-white text-steel-blue hover:bg-gray-100">
                  <Link to="/contact">
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 glass-effect">
                <h3 className="text-lg font-bold mb-3">Explore Our Tools</h3>
                <p className="text-white/80 mb-4">Try our free Swiss tax calculators</p>
                <Button asChild variant="outline" className="w-full border-white text-white hover:bg-white hover:text-steel-blue">
                  <Link to="/calculators">
                    Free Calculators
                    <Calculator className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 glass-effect">
              <h3 className="text-xl font-bold mb-4">Located in the Heart of Switzerland</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-200" />
                  <span>Biel/Bienne, Switzerland</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="h-5 w-5 text-blue-200" />
                  <span>info@taxed.ch</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="h-5 w-5 text-blue-200" />
                  <span>info@taxed.ch</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;