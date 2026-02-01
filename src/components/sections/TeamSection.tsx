import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Linkedin, 
  Mail, 
  Award, 
  GraduationCap,
  MapPin,
  Calendar,
  Star
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  qualifications: string[];
  experience: string;
  location: string;
  email: string;
  linkedin: string;
  specialties: string[];
  rating: number;
  clients: number;
}

interface TeamSectionProps {
  className?: string;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ className = '' }) => {
  const teamMembers: TeamMember[] = [
    {
      id: 'emanuel-flury',
      name: 'Emanuel Flury',
      position: 'Founder & Senior Tax Consultant',
      bio: 'Founder of Taxed GmbH, specializing in helping expats and professionals navigate Swiss tax requirements with transparent, flat-rate services.',
      image: 'https://eflury.com/images/portraits/emanuel-aaron-flury-portrait.png',
      qualifications: ['Swiss Tax Advisory Certification'],
      experience: '10+ years',
      location: 'Biel/Bienne, Switzerland',
      email: 'info@taxed.ch',
      linkedin: 'https://linkedin.com/in/emanuel-flury',
      specialties: ['Swiss Tax Filing', 'Expat Services', 'Tax Optimization'],
      rating: 4.9,
      clients: 500
    },
    {
      id: 'angela-samson',
      name: 'Angela Samson',
      position: 'Tax Return Preparer',
      bio: 'Dedicated tax return preparer helping clients file accurate and compliant Swiss tax returns.',
      image: '',
      qualifications: ['Tax Preparation Certification'],
      experience: 'Professional',
      location: 'Biel/Bienne, Switzerland',
      email: 'info@taxed.ch',
      linkedin: '',
      specialties: ['Individual Tax Returns', 'Tax Compliance', 'Client Support'],
      rating: 4.8,
      clients: 100
    },
    {
      id: 'patricia-fangon',
      name: 'Patricia Marie Fangon',
      position: 'Tax Return Preparer',
      bio: 'Experienced tax return preparer providing bilingual support for French and English speaking clients.',
      image: '',
      qualifications: ['Tax Preparation Certification'],
      experience: 'Professional',
      location: 'Biel/Bienne, Switzerland',
      email: 'info@taxed.ch',
      linkedin: '',
      specialties: ['Individual Tax Returns', 'Bilingual Support', 'Client Relations'],
      rating: 4.8,
      clients: 100
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className={`py-20 bg-white ${className}`}>
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
            Meet Our <span className="text-blue-600">Expert Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our certified professionals bring decades of combined experience in Swiss tax law, 
            business consulting, and financial services.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {teamMembers.map((member) => (
            <motion.div key={member.id} variants={itemVariants}>
              <Card className="bg-white hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Member Image */}
                <div className="relative h-80 bg-gradient-to-br from-blue-50 to-green-50">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">{member.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-2">
                      {member.position}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  {/* Qualifications */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <GraduationCap className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-semibold text-gray-700">Qualifications</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {member.qualifications.map((qual, index) => (
                        <span 
                          key={index}
                          className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                        >
                          {qual}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-semibold text-gray-700">Specialties</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, index) => (
                        <span 
                          key={index}
                          className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900">{member.experience}</div>
                      <div className="text-xs text-gray-600">Experience</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900">{member.clients}+</div>
                      <div className="text-xs text-gray-600">Happy Clients</div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{member.location}</span>
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.open(`mailto:${member.email}`)}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.open(member.linkedin)}
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Years Combined Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Swiss Certified</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Client Support</div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Work with Our Experts?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule a consultation with one of our tax professionals and discover how we can help optimize your tax situation.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
            Schedule Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
