import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  Globe, 
  Mail, 
  Linkedin, 
  CheckCircle,
  Star,
  Building,
  GraduationCap,
  Calendar
} from 'lucide-react';

const TeamPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Emanuel Flury",
      position: "Founder & Senior Tax Consultant",
      specialization: "Swiss Tax Filing & Expat Services",
      experience: "10+ years",
      education: "Swiss Tax Advisory Certification",
      languages: ["German", "English", "French"],
      image: "https://eflury.com/images/portraits/emanuel-aaron-flury-portrait.png",
      bio: "Founder of Taxed GmbH, specializing in helping expats and professionals navigate Swiss tax requirements with transparent, flat-rate services."
    },
    {
      id: 2,
      name: "Angela Samson",
      position: "Tax Return Preparer",
      specialization: "Individual Tax Returns",
      experience: "Professional Experience",
      education: "Tax Preparation Certification",
      languages: ["English"],
      image: null,
      initials: "AS",
      bio: "Dedicated tax return preparer helping clients file accurate and compliant Swiss tax returns."
    },
    {
      id: 3,
      name: "Patricia Marie Fangon",
      position: "Tax Return Preparer",
      specialization: "Individual Tax Returns",
      experience: "Professional Experience",
      education: "Tax Preparation Certification",
      languages: ["French", "English"],
      image: null,
      initials: "PF",
      bio: "Experienced tax return preparer providing bilingual support for French and English speaking clients."
    }
  ];

  const stats = [
    { number: "500+", label: "Clients Served", icon: Users },
    { number: "15+", label: "Years Experience", icon: Calendar },
    { number: "98%", label: "Success Rate", icon: CheckCircle },
    { number: "5★", label: "Average Rating", icon: Star }
  ];

  return (
    <>
      <Helmet>
        <title>Our Team - Taxed GmbH | Expert Swiss Tax Advisors</title>
        <meta name="description" content="Meet our team of expert Swiss tax advisors. Experienced professionals specializing in expat taxes, international tax law, and digital asset taxation." />
        <meta name="keywords" content="Swiss tax advisors, tax experts, expat tax specialists, international tax consultants, Taxed GmbH team" />
        <link rel="canonical" href="https://taxed.ch/team" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-steel-blue via-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Meet Our Expert Team
              </h1>
              <p className="text-xl lg:text-2xl max-w-3xl mx-auto text-blue-100">
                Experienced Swiss tax professionals dedicated to helping you navigate 
                complex tax requirements with confidence and precision.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="h-12 w-12 text-steel-blue mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Tax Experts
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our team combines deep Swiss tax expertise with international experience 
                to provide you with the best possible service.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-w-1 aspect-h-1">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-64 object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gradient-to-br from-steel-blue to-blue-600 flex items-center justify-center">
                        <span className="text-6xl font-bold text-white">
                          {member.initials}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-steel-blue font-medium mb-2">{member.position}</p>
                    <p className="text-gray-600 mb-4">{member.specialization}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {member.experience}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        {member.education}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Globe className="h-4 w-4 mr-2" />
                        {member.languages.join(", ")}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4">{member.bio}</p>
                    
                    <div className="flex space-x-3">
                      <button className="flex items-center text-steel-blue hover:text-blue-700 transition-colors">
                        <Mail className="h-4 w-4 mr-1" />
                        Contact
                      </button>
                      <button className="flex items-center text-steel-blue hover:text-blue-700 transition-colors">
                        <Linkedin className="h-4 w-4 mr-1" />
                        LinkedIn
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Our Team */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our Team?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center p-6"
              >
                <Award className="h-12 w-12 text-steel-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Certified Experts</h3>
                <p className="text-gray-600">
                  All our advisors are certified Swiss tax professionals with advanced degrees 
                  and continuous professional development.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center p-6"
              >
                <Globe className="h-12 w-12 text-steel-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">International Experience</h3>
                <p className="text-gray-600">
                  Our team has extensive experience working with international clients 
                  and complex cross-border tax situations.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center p-6"
              >
                <Users className="h-12 w-12 text-steel-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Client-Focused</h3>
                <p className="text-gray-600">
                  We prioritize clear communication, personalized service, and building 
                  long-term relationships with our clients.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-steel-blue via-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to Work with Our Team?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Get in touch today to discuss your Swiss tax needs with our expert advisors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-white text-steel-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Contact Our Team
                </a>
                <a
                  href="/pricing"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-steel-blue transition-colors"
                >
                  View Our Services
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TeamPage;
