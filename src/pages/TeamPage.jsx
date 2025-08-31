import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Award, 
  GraduationCap, 
  Briefcase, 
  Globe, 
  Users, 
  Star,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  TrendingUp,
  Shield,
  CheckCircle,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TeamPage = () => {
  const [selectedExpertise, setSelectedExpertise] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const expertiseAreas = [
    { id: 'all', name: 'All Expertise' },
    { id: 'international-tax', name: 'International Tax' },
    { id: 'corporate-tax', name: 'Corporate Tax' },
    { id: 'personal-tax', name: 'Personal Tax' },
    { id: 'transfer-pricing', name: 'Transfer Pricing' },
    { id: 'tax-planning', name: 'Tax Planning' },
    { id: 'compliance', name: 'Compliance' },
    { id: 'crypto-tax', name: 'Crypto Taxation' }
  ];

  const experienceLevels = [
    { id: 'all', name: 'All Levels' },
    { id: 'partner', name: 'Partner Level' },
    { id: 'senior', name: 'Senior Level' },
    { id: 'mid', name: 'Mid Level' },
    { id: 'junior', name: 'Junior Level' }
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Müller",
      title: "Managing Partner & Tax Director",
      expertise: ["international-tax", "corporate-tax", "tax-planning"],
      experience: "partner",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      education: [
        "PhD in Tax Law, University of Zurich",
        "Master of International Tax, Vienna University of Economics",
        "Bachelor of Law, University of Bern"
      ],
      certifications: [
        "Swiss Certified Tax Expert (SCTE)",
        "Chartered Tax Adviser (CTA)",
        "Certified Public Accountant (CPA)"
      ],
      experience: [
        "15+ years in international tax consulting",
        "Former Senior Manager at PwC Switzerland",
        "Expert in Swiss-German tax treaties",
        "Specialized in expat tax optimization"
      ],
      languages: ["German", "English", "French", "Italian"],
      specializations: [
        "International Tax Planning",
        "Corporate Tax Optimization",
        "Expat Tax Strategy",
        "Tax Treaty Applications"
      ],
      achievements: [
        "Led 500+ successful expat tax cases",
        "Published 25+ articles on Swiss taxation",
        "Speaker at international tax conferences",
        "Member of Swiss Tax Expert Association"
      ],
      contact: {
        email: "sarah.mueller@taxed.ch",
        phone: "+41 79 910 77 87",
        linkedin: "https://linkedin.com/in/sarah-mueller-taxed"
      },
      featured: true,
      yearsExperience: 15,
      clientSatisfaction: 4.9,
      casesHandled: 500
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Senior Tax Advisor",
      expertise: ["personal-tax", "crypto-tax", "compliance"],
      experience: "senior",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      education: [
        "Master of Tax Law, University of St. Gallen",
        "Bachelor of Economics, ETH Zurich",
        "Certification in Digital Asset Taxation"
      ],
      certifications: [
        "Swiss Certified Tax Expert (SCTE)",
        "Certified Blockchain Professional",
        "Digital Asset Tax Specialist"
      ],
      experience: [
        "10+ years in personal tax consulting",
        "Former Tax Manager at Deloitte Switzerland",
        "Expert in crypto and digital asset taxation",
        "Specialized in tech industry taxation"
      ],
      languages: ["English", "German", "Mandarin"],
      specializations: [
        "Crypto Asset Taxation",
        "Personal Tax Optimization",
        "Tech Industry Tax Planning",
        "Digital Asset Compliance"
      ],
      achievements: [
        "Handled 300+ crypto tax cases",
        "Developed crypto tax reporting framework",
        "Expert witness in crypto tax disputes",
        "Regular speaker at blockchain conferences"
      ],
      contact: {
        email: "michael.chen@taxed.ch",
        phone: "+41 79 910 77 88",
        linkedin: "https://linkedin.com/in/michael-chen-taxed"
      },
      featured: true,
      yearsExperience: 10,
      clientSatisfaction: 4.8,
      casesHandled: 300
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      title: "International Tax Specialist",
      expertise: ["international-tax", "transfer-pricing", "corporate-tax"],
      experience: "senior",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      education: [
        "Master of International Tax Law, University of Amsterdam",
        "Bachelor of Business Administration, IE Business School",
        "Specialization in Transfer Pricing"
      ],
      certifications: [
        "Swiss Certified Tax Expert (SCTE)",
        "Transfer Pricing Specialist",
        "International Tax Certificate"
      ],
      experience: [
        "12+ years in international tax consulting",
        "Former Senior Consultant at KPMG Netherlands",
        "Expert in transfer pricing and BEPS",
        "Specialized in multinational corporations"
      ],
      languages: ["Spanish", "English", "German", "Dutch"],
      specializations: [
        "Transfer Pricing",
        "International Tax Planning",
        "BEPS Implementation",
        "Multinational Tax Strategy"
      ],
      achievements: [
        "Managed 200+ transfer pricing cases",
        "Developed BEPS compliance frameworks",
        "Published research on international tax trends",
        "Member of OECD Transfer Pricing Network"
      ],
      contact: {
        email: "elena.rodriguez@taxed.ch",
        phone: "+41 79 910 77 89",
        linkedin: "https://linkedin.com/in/elena-rodriguez-taxed"
      },
      featured: false,
      yearsExperience: 12,
      clientSatisfaction: 4.9,
      casesHandled: 200
    },
    {
      id: 4,
      name: "David Johnson",
      title: "Tax Compliance Manager",
      expertise: ["compliance", "personal-tax", "corporate-tax"],
      experience: "mid",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      education: [
        "Master of Tax Law, University of Geneva",
        "Bachelor of Accounting, University of Lausanne",
        "Certification in Swiss Tax Compliance"
      ],
      certifications: [
        "Swiss Certified Tax Expert (SCTE)",
        "Certified Compliance Professional",
        "Risk Management Specialist"
      ],
      experience: [
        "8+ years in tax compliance",
        "Former Compliance Manager at EY Switzerland",
        "Expert in Swiss tax regulations",
        "Specialized in audit support"
      ],
      languages: ["English", "French", "German"],
      specializations: [
        "Tax Compliance",
        "Audit Support",
        "Risk Management",
        "Regulatory Reporting"
      ],
      achievements: [
        "Maintained 100% compliance rate",
        "Reduced audit findings by 90%",
        "Developed compliance monitoring systems",
        "Trained 50+ professionals in tax compliance"
      ],
      contact: {
        email: "david.johnson@taxed.ch",
        phone: "+41 79 910 77 90",
        linkedin: "https://linkedin.com/in/david-johnson-taxed"
      },
      featured: false,
      yearsExperience: 8,
      clientSatisfaction: 4.7,
      casesHandled: 150
    },
    {
      id: 5,
      name: "Anna Kowalski",
      title: "Junior Tax Advisor",
      expertise: ["personal-tax", "compliance"],
      experience: "junior",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      education: [
        "Master of Tax Law, University of Basel",
        "Bachelor of Economics, University of Zurich",
        "Internship at Swiss Federal Tax Administration"
      ],
      certifications: [
        "Swiss Certified Tax Expert (SCTE) - In Progress",
        "Digital Tax Filing Specialist"
      ],
      experience: [
        "3+ years in tax consulting",
        "Former Tax Intern at Swiss Federal Tax Administration",
        "Expert in digital tax filing",
        "Specialized in expat tax returns"
      ],
      languages: ["Polish", "English", "German", "French"],
      specializations: [
        "Expat Tax Returns",
        "Digital Tax Filing",
        "Personal Tax Planning",
        "Tax Software Implementation"
      ],
      achievements: [
        "Processed 100+ expat tax returns",
        "Implemented digital filing systems",
        "Achieved 95% client satisfaction rate",
        "Mentored by senior tax advisors"
      ],
      contact: {
        email: "anna.kowalski@taxed.ch",
        phone: "+41 79 910 77 91",
        linkedin: "https://linkedin.com/in/anna-kowalski-taxed"
      },
      featured: false,
      yearsExperience: 3,
      clientSatisfaction: 4.6,
      casesHandled: 100
    },
    {
      id: 6,
      name: "Dr. Thomas Weber",
      title: "Tax Research & Development",
      expertise: ["tax-planning", "international-tax", "corporate-tax"],
      experience: "partner",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      education: [
        "PhD in Tax Economics, University of Zurich",
        "Master of Tax Law, University of St. Gallen",
        "Postdoctoral Research at Harvard University"
      ],
      certifications: [
        "Swiss Certified Tax Expert (SCTE)",
        "Research Fellow at Swiss Tax Institute",
        "Academic Advisor to Swiss Parliament"
      ],
      experience: [
        "20+ years in tax research and consulting",
        "Former Research Director at Swiss Tax Institute",
        "Published 50+ academic papers",
        "Advisor to Swiss Federal Council on tax policy"
      ],
      languages: ["German", "English", "French", "Italian"],
      specializations: [
        "Tax Policy Research",
        "Economic Impact Analysis",
        "Legislative Advisory",
        "Academic Collaboration"
      ],
      achievements: [
        "Published 50+ peer-reviewed papers",
        "Advised on 10+ tax law reforms",
        "Led international research projects",
        "Recipient of Swiss Tax Research Award"
      ],
      contact: {
        email: "thomas.weber@taxed.ch",
        phone: "+41 79 910 77 92",
        linkedin: "https://linkedin.com/in/thomas-weber-taxed"
      },
      featured: true,
      yearsExperience: 20,
      clientSatisfaction: 4.9,
      casesHandled: 50
    }
  ];

  const filteredTeamMembers = teamMembers.filter(member => {
    const matchesExpertise = selectedExpertise === 'all' || member.expertise.includes(selectedExpertise);
    const matchesExperience = selectedExperience === 'all' || member.experience === selectedExperience;
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesExpertise && matchesExperience && matchesSearch;
  });

  const getExperienceColor = (experience) => {
    switch (experience) {
      case 'partner': return 'text-purple-600 bg-purple-50';
      case 'senior': return 'text-blue-600 bg-blue-50';
      case 'mid': return 'text-green-600 bg-green-50';
      case 'junior': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <>
      <Helmet>
        <title>Our Team - Expert Tax Advisors | Taxed GmbH</title>
        <meta name="description" content="Meet our team of expert tax advisors with extensive experience in Swiss and international taxation. Certified professionals dedicated to optimizing your tax situation." />
        <meta property="og:title" content="Our Team - Expert Tax Advisors | Taxed GmbH" />
        <meta property="og:description" content="Meet our team of expert tax advisors with extensive experience in Swiss and international taxation. Certified professionals dedicated to optimizing your tax situation." />
      </Helmet>

      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 rounded-full bg-warm-red-tint text-brand-red flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-dark-gray mb-6">
              Meet Our Expert Team
            </h1>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              Our team of certified tax experts brings decades of combined experience from Big 4 firms, 
              government agencies, and specialized tax consulting. We're dedicated to providing you with 
              the highest level of expertise and personalized service.
            </p>
          </motion.div>

          {/* Team Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          >
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">6</p>
                <p className="text-sm text-gray-600">Expert Advisors</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">68+</p>
                <p className="text-sm text-gray-600">Years Combined Experience</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <GraduationCap className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">15+</p>
                <p className="text-sm text-gray-600">Professional Certifications</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Star className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">4.8/5</p>
                <p className="text-sm text-gray-600">Average Client Rating</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search team members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expertise</label>
                  <select
                    value={selectedExpertise}
                    onChange={(e) => setSelectedExpertise(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-steel-blue"
                  >
                    {expertiseAreas.map(area => (
                      <option key={area.id} value={area.id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-steel-blue"
                  >
                    {experienceLevels.map(level => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={() => {
                      setSelectedExpertise('all');
                      setSelectedExperience('all');
                      setSearchTerm('');
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-lg text-dark-gray/80">
              Showing <span className="font-semibold text-steel-blue">{filteredTeamMembers.length}</span> team members
            </p>
          </div>

          {/* Featured Team Members */}
          {filteredTeamMembers.filter(member => member.featured).length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-dark-gray mb-8">Leadership Team</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredTeamMembers.filter(member => member.featured).map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full border-steel-blue/20 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="relative">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-64 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="px-2 py-1 bg-steel-blue text-white text-xs font-medium rounded-full">
                            Leadership
                          </span>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <CardTitle className="text-xl text-dark-gray mb-2">
                              {member.name}
                            </CardTitle>
                            <p className="text-steel-blue font-medium mb-3">{member.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center space-x-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{member.yearsExperience} years experience</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4" />
                            <span>{member.clientSatisfaction}/5 rating</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Specializations</h4>
                          <div className="flex flex-wrap gap-2">
                            {member.specializations.map((spec, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
                          <ul className="space-y-1">
                            {member.education.slice(0, 2).map((edu, idx) => (
                              <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                                <GraduationCap className="h-3 w-3 text-steel-blue flex-shrink-0" />
                                <span>{edu}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-2">Key Achievements</h4>
                          <ul className="space-y-1">
                            {member.achievements.slice(0, 2).map((achievement, idx) => (
                              <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                                <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="text-center">
                              <p className="text-lg font-bold text-green-600">{member.casesHandled}+</p>
                              <p className="text-xs text-gray-500">Cases Handled</p>
                            </div>
                            <div className="text-center">
                              <p className="text-lg font-bold text-blue-600">{member.yearsExperience}</p>
                              <p className="text-xs text-gray-500">Years Experience</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Linkedin className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* All Team Members */}
          <div>
            <h2 className="text-2xl font-bold text-dark-gray mb-8">Our Expert Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full border-steel-blue/20 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {member.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="px-2 py-1 bg-steel-blue text-white text-xs font-medium rounded-full">
                            Leadership
                          </span>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg text-dark-gray mb-2">
                        {member.name}
                      </CardTitle>
                      <p className="text-steel-blue font-medium text-sm mb-3">{member.title}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Briefcase className="h-3 w-3" />
                          <span>{member.yearsExperience} years</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3" />
                          <span>{member.clientSatisfaction}/5</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Expertise</h4>
                        <div className="flex flex-wrap gap-1">
                          {member.expertise.map((exp, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {expertiseAreas.find(area => area.id === exp)?.name || exp}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                        <div className="flex flex-wrap gap-1">
                          {member.languages.map((lang, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center justify-between">
                          <div className="text-center">
                            <p className="text-lg font-bold text-green-600">{member.casesHandled}+</p>
                            <p className="text-xs text-gray-500">Cases</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-blue-600">{member.yearsExperience}</p>
                            <p className="text-xs text-gray-500">Years</p>
                          </div>
                          <div className="text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceColor(member.experience)}`}>
                              {experienceLevels.find(level => level.id === member.experience)?.name || member.experience}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Linkedin className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button variant="outline" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Card className="bg-gradient-to-r from-steel-blue to-blue-600 text-white">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold mb-4">Ready to Work with Our Experts?</h3>
                <p className="text-xl mb-8 text-blue-100">
                  Our team of certified tax experts is ready to help you optimize your Swiss tax situation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-steel-blue hover:bg-gray-100"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Schedule Consultation
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-steel-blue"
                    onClick={() => {
                      const phoneNumber = '+41799107787';
                      const message = encodeURIComponent("Hello! I'd like to schedule a consultation with one of your tax experts. Could you please provide more information?");
                      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                  >
                    WhatsApp Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TeamPage;