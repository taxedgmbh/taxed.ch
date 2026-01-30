import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Users, 
  Heart, 
  Zap, 
  Target, 
  MapPin, 
  Clock, 
  DollarSign, 
  Briefcase,
  ArrowRight,
  Send,
  MessageCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const companyValues = [
    {
      icon: Heart,
      title: "Passion for Excellence",
      description: "We're passionate about delivering exceptional service and helping our clients succeed in Switzerland."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We embrace technology and innovative solutions to make tax filing simple and efficient."
    },
    {
      icon: Target,
      title: "Client-Focused",
      description: "Our clients' success is our success. We put their needs first in everything we do."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "We believe in the power of teamwork and support each other to achieve our goals."
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Salary",
      description: "Attractive compensation package with performance bonuses"
    },
    {
      icon: Clock,
      title: "Flexible Working",
      description: "Hybrid work model with flexible hours and remote options"
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: Briefcase,
      title: "Professional Growth",
      description: "Continuous learning opportunities and career development"
    }
  ];

  const openPositions = [
    {
      id: 1,
      title: "Senior Tax Consultant",
      type: "Full-time",
      location: "Biel/Bienne, Switzerland",
      department: "Tax Services",
      experience: "5+ years",
      description: "We're looking for an experienced tax consultant to join our team and help expats navigate Swiss tax complexities.",
      responsibilities: [
        "Provide expert tax consulting services to expat clients",
        "Prepare and review Swiss tax returns",
        "Advise on tax planning and optimization strategies",
        "Build and maintain client relationships",
        "Stay updated on Swiss tax law changes"
      ],
      requirements: [
        "Bachelor's degree in Accounting, Finance, or related field",
        "5+ years of experience in Swiss tax consulting",
        "Fluent in English and German (French is a plus)",
        "Strong analytical and problem-solving skills",
        "Excellent communication and client service abilities"
      ]
    },
    {
      id: 2,
      title: "Tax Assistant",
      type: "Full-time",
      location: "Biel/Bienne, Switzerland",
      department: "Tax Services",
      experience: "1-3 years",
      description: "Join our team as a tax assistant and learn from experienced professionals while supporting our tax consulting services.",
      responsibilities: [
        "Assist with tax return preparation and filing",
        "Support senior consultants with client work",
        "Maintain organized client files and documentation",
        "Help with administrative tasks and client communication",
        "Learn Swiss tax regulations and procedures"
      ],
      requirements: [
        "Bachelor's degree in Accounting, Finance, or related field",
        "1-3 years of experience in accounting or tax",
        "Fluent in English (German or French is a plus)",
        "Detail-oriented with strong organizational skills",
        "Willingness to learn and grow professionally"
      ]
    },
    {
      id: 3,
      title: "Marketing Specialist",
      type: "Part-time",
      location: "Remote / Biel/Bienne",
      department: "Marketing",
      experience: "2+ years",
      description: "Help us grow our digital presence and reach more expats who need Swiss tax assistance.",
      responsibilities: [
        "Develop and execute digital marketing strategies",
        "Create engaging content for website and social media",
        "Manage social media accounts and campaigns",
        "Analyze marketing performance and optimize campaigns",
        "Support lead generation and client acquisition"
      ],
      requirements: [
        "Bachelor's degree in Marketing, Communications, or related field",
        "2+ years of digital marketing experience",
        "Experience with social media marketing and content creation",
        "Fluent in English (German or French is a plus)",
        "Creative mindset with analytical skills"
      ]
    }
  ];

  const handleApply = (job) => {
    const phoneNumber = '+41799107787';
    const message = encodeURIComponent(
      `Hello! I'm interested in applying for the ${job.title} position at Taxed GmbH.\n\nI have ${job.experience} of experience and I'm excited about the opportunity to join your team.\n\nCould you please provide more information about the application process?`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Careers - Join Our Team | Taxed GmbH</title>
        <meta name="description" content="Join Taxed GmbH and help expats navigate Swiss taxes. View open positions and learn about our company culture and benefits." />
        <meta property="og:title" content="Careers - Join Our Team | Taxed GmbH" />
        <meta property="og:description" content="Join Taxed GmbH and help expats navigate Swiss taxes. View open positions and learn about our company culture and benefits." />
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
              Join Our Team
            </h1>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              Help us make Swiss tax filing simple and accessible for expats. 
              Join a team that's passionate about excellence and client success.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-6">
              Our Values
            </h2>
            <p className="text-lg text-dark-gray/80 max-w-2xl mx-auto">
              These core values guide everything we do and shape our company culture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center border-steel-blue/20 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-steel-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-steel-blue" />
                    </div>
                    <CardTitle className="text-xl text-dark-gray">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-dark-gray/80">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-6">
              Benefits & Perks
            </h2>
            <p className="text-lg text-dark-gray/80 max-w-2xl mx-auto">
              We believe in taking care of our team with comprehensive benefits and a great work environment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center border-steel-blue/20 shadow-lg">
                  <CardHeader>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl text-dark-gray">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-dark-gray/80">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-6">
              Open Positions
            </h2>
            <p className="text-lg text-dark-gray/80 max-w-2xl mx-auto">
              Ready to join our team? Check out our current openings and find the perfect role for you.
            </p>
          </motion.div>

          <div className="space-y-8">
            {openPositions.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-steel-blue/20 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <CardTitle className="text-2xl text-dark-gray mb-2">{job.title}</CardTitle>
                        <div className="flex flex-wrap gap-4 text-sm text-dark-gray/70">
                          <div className="flex items-center space-x-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.experience}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 lg:mt-0">
                        <Button
                          onClick={() => handleApply(job)}
                          className="bg-steel-blue hover:bg-steel-blue/90 text-white"
                        >
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-dark-gray/80 mb-6">{job.description}</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-dark-gray mb-3">Responsibilities:</h4>
                        <ul className="space-y-2">
                          {job.responsibilities.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-dark-gray/80">
                              <div className="w-1.5 h-1.5 bg-steel-blue rounded-full mt-2 flex-shrink-0"></div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark-gray mb-3">Requirements:</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((item, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-dark-gray/80">
                              <div className="w-1.5 h-1.5 bg-steel-blue rounded-full mt-2 flex-shrink-0"></div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              Ready to Join Our Team?
            </h2>
            <p className="text-xl mb-8 text-white/80">
              Don't see the perfect role? We're always looking for talented individuals 
              who share our passion for helping expats succeed in Switzerland.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-steel-blue hover:bg-gray-100 text-lg px-8 py-4"
                onClick={() => {
                  const phoneNumber = '+41799107787';
                  const message = encodeURIComponent("Hello! I'm interested in career opportunities at Taxed GmbH. Could you please tell me more about potential openings?");
                  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Us
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-steel-blue text-lg px-8 py-4"
                onClick={() => window.location.href = 'mailto:careers@taxed.ch'}
              >
                <Send className="mr-2 h-5 w-5" />
                Email: careers@taxed.ch
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CareersPage;
