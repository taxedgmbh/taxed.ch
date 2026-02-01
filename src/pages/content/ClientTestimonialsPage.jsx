import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Star,
  Quote,
  Play,
  Download,
  ArrowRight,
  Users,
  Building,
  Globe,
  CheckCircle,
  Award,
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  AlertTriangle
} from 'lucide-react';

const ClientTestimonialsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const categories = [
    { id: 'all', name: 'All Testimonials', icon: Users },
    { id: 'individual', name: 'Individual Tax', icon: Users },
    { id: 'business', name: 'Business Tax', icon: Building },
    { id: 'expat', name: 'Expatriates', icon: Globe }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'Tech Startup AG',
      location: 'Zurich',
      category: 'expat',
      rating: 5,
      title: 'Saved me CHF 2,400 in taxes',
      content: 'As an American expat, I was completely lost with Swiss tax requirements. Taxed GmbH not only handled my complex international tax situation but also saved me CHF 2,400 through proper tax planning. Their expertise in expat tax matters is unmatched.',
      videoUrl: 'https://example.com/video1',
      image: 'Professional headshot of Sarah Johnson, a marketing director',
      savings: 'CHF 2,400',
      service: 'Expat Tax Return',
      duration: '2 years',
      challenges: [
        'Complex international tax situation',
        'Double taxation concerns',
        'Swiss tax residency questions',
        'Foreign income reporting'
      ],
      results: [
        'CHF 2,400 in tax savings',
        'Proper tax residency determination',
        'Optimized international tax structure',
        'Peace of mind with compliance'
      ]
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'CEO',
      company: 'Swiss Manufacturing Ltd',
      location: 'Basel',
      category: 'business',
      rating: 5,
      title: 'Streamlined our entire tax process',
      content: 'We were struggling with complex corporate tax requirements and VAT compliance. Taxed GmbH transformed our entire tax process, making it efficient and compliant. Their business tax expertise saved us both time and money.',
      videoUrl: 'https://example.com/video2',
      image: 'Professional headshot of Michael Chen, a CEO',
      savings: 'CHF 8,500',
      service: 'Corporate Tax & VAT',
      duration: '3 years',
      challenges: [
        'Complex corporate tax structure',
        'VAT compliance issues',
        'International business transactions',
        'Tax optimization opportunities'
      ],
      results: [
        'CHF 8,500 in annual tax savings',
        'Streamlined VAT compliance',
        'Optimized corporate tax structure',
        'Reduced administrative burden'
      ]
    },
    {
      id: 3,
      name: 'Emma Thompson',
      role: 'Freelance Consultant',
      company: 'Independent',
      location: 'Geneva',
      category: 'individual',
      rating: 5,
      title: 'Professional and reliable service',
      content: 'As a freelancer, I needed someone who understood self-employment tax requirements. Taxed GmbH provided excellent service, ensuring I was compliant while maximizing my deductions. Highly recommend their individual tax services.',
      videoUrl: 'https://example.com/video3',
      image: 'Professional headshot of Emma Thompson, a freelance consultant',
      savings: 'CHF 1,200',
      service: 'Self-Employment Tax',
      duration: '2 years',
      challenges: [
        'Self-employment tax complexity',
        'Deduction optimization',
        'Quarterly tax planning',
        'Business expense documentation'
      ],
      results: [
        'CHF 1,200 in tax savings',
        'Optimized deduction strategy',
        'Simplified tax compliance',
        'Professional guidance'
      ]
    },
    {
      id: 4,
      name: 'David Rodriguez',
      role: 'Investment Manager',
      company: 'Private Banking',
      location: 'Lugano',
      category: 'expat',
      rating: 5,
      title: 'Exceptional expertise in international tax',
      content: 'Working in private banking with complex investment income, I needed expert tax advice. Taxed GmbH provided outstanding service, handling my intricate tax situation with precision and saving me significant amounts in taxes.',
      videoUrl: 'https://example.com/video4',
      image: 'Professional headshot of David Rodriguez, an investment manager',
      savings: 'CHF 5,800',
      service: 'Investment Tax Planning',
      duration: '4 years',
      challenges: [
        'Complex investment income',
        'International tax implications',
        'Wealth tax optimization',
        'Cross-border tax planning'
      ],
      results: [
        'CHF 5,800 in tax savings',
        'Optimized investment structure',
        'International tax compliance',
        'Wealth preservation strategies'
      ]
    },
    {
      id: 5,
      name: 'Lisa Müller',
      role: 'HR Director',
      company: 'Pharmaceutical Company',
      location: 'Bern',
      category: 'business',
      rating: 5,
      title: 'Transformed our tax compliance',
      content: 'Our company was facing complex tax compliance issues with international operations. Taxed GmbH provided comprehensive solutions, ensuring full compliance while optimizing our tax position. Their business tax expertise is outstanding.',
      videoUrl: 'https://example.com/video5',
      image: 'Professional headshot of Lisa Müller, an HR director',
      savings: 'CHF 12,000',
      service: 'Corporate Tax Optimization',
      duration: '2 years',
      challenges: [
        'International tax compliance',
        'Transfer pricing issues',
        'Corporate tax optimization',
        'Cross-border transactions'
      ],
      results: [
        'CHF 12,000 in annual savings',
        'Full tax compliance',
        'Optimized international structure',
        'Reduced tax risk'
      ]
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'Retired Executive',
      company: 'Former CEO',
      location: 'Lausanne',
      category: 'individual',
      rating: 5,
      title: 'Peace of mind in retirement',
      content: 'Retirement brought new tax complexities with pension income and investments. Taxed GmbH provided excellent guidance, ensuring my retirement income was tax-optimized while maintaining full compliance.',
      videoUrl: 'https://example.com/video6',
      image: 'Professional headshot of James Wilson, a retired executive',
      savings: 'CHF 3,200',
      service: 'Retirement Tax Planning',
      duration: '3 years',
      challenges: [
        'Pension income taxation',
        'Investment income optimization',
        'Retirement tax planning',
        'Estate tax considerations'
      ],
      results: [
        'CHF 3,200 in tax savings',
        'Optimized retirement income',
        'Estate tax planning',
        'Peace of mind'
      ]
    }
  ];

  const filteredTestimonials = testimonials.filter(testimonial => {
    if (selectedCategory !== 'all' && testimonial.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const stats = [
    { label: 'Happy Clients', value: '500+', icon: Users },
    { label: 'Average Savings', value: 'CHF 3,200', icon: DollarSign },
    { label: 'Success Rate', value: '99.8%', icon: CheckCircle },
    { label: 'Years Experience', value: '15+', icon: Award }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <>
      <Helmet>
        <title>Client Testimonials & Success Stories | Taxed GmbH</title>
        <meta name="description" content="Read real client testimonials and success stories. See how we've helped 500+ clients save money on their Swiss taxes with professional tax services." />
        <meta property="og:title" content="Client Testimonials & Success Stories | Taxed GmbH" />
        <meta property="og:description" content="Read real client testimonials and success stories. See how we've helped 500+ clients save money on their Swiss taxes with professional tax services." />
        <link rel="canonical" href="https://taxed.ch/testimonials" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-steel-blue to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Client Testimonials & Success Stories
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              See how we've helped 500+ clients save money and achieve peace of mind with their Swiss taxes. Real stories from real people.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                <Play className="inline-block mr-2 h-5 w-5" />
                Watch Video Testimonials
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-steel-blue transition-colors">
                <Download className="inline-block mr-2 h-5 w-5" />
                Download Case Studies
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4 mx-auto w-fit">
                    <Icon className="h-8 w-8 text-steel-blue" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-steel-blue text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                  {/* Client Info */}
                  <div className="flex items-start space-x-4 mb-6 lg:mb-0 lg:w-1/3">
                    <div className="w-16 h-16 bg-steel-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-8 w-8 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{testimonial.name}</h3>
                      <p className="text-gray-600 mb-1">{testimonial.role}</p>
                      <p className="text-sm text-gray-500 mb-3">{testimonial.company}, {testimonial.location}</p>
                      <div className="flex items-center space-x-1 mb-2">
                        {renderStars(testimonial.rating)}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                          Saved {testimonial.savings}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                          {testimonial.service}
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                          {testimonial.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="lg:w-2/3">
                    <div className="flex items-start space-x-4 mb-4">
                      <Quote className="h-6 w-6 text-steel-blue flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{testimonial.title}</h4>
                        <p className="text-gray-700 mb-4">{testimonial.content}</p>
                      </div>
                    </div>

                    {/* Challenges and Results */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
                          Challenges
                        </h5>
                        <ul className="space-y-2">
                          {testimonial.challenges.map((challenge, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          Results
                        </h5>
                        <ul className="space-y-2">
                          {testimonial.results.map((result, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 bg-steel-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-steel-blue/90 transition-colors">
                        <Play className="inline-block mr-2 h-4 w-4" />
                        Watch Video
                      </button>
                      <button className="flex-1 border-2 border-steel-blue text-steel-blue px-6 py-3 rounded-lg font-semibold hover:bg-steel-blue hover:text-white transition-colors">
                        <Download className="inline-block mr-2 h-4 w-4" />
                        Download Case Study
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Video Testimonials
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear directly from our clients about their experience with Taxed GmbH and how we've helped them save money on their taxes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <button className="bg-steel-blue text-white p-4 rounded-full hover:bg-steel-blue/90 transition-colors">
                    <Play className="h-8 w-8" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{testimonial.name}</h3>
                  <p className="text-gray-600 mb-3">{testimonial.role}, {testimonial.company}</p>
                  <p className="text-sm text-gray-700 mb-4">{testimonial.title}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {renderStars(testimonial.rating)}
                    </div>
                    <span className="text-sm font-semibold text-green-600">Saved {testimonial.savings}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-steel-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Join 500+ Happy Clients
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience the same professional tax service that has helped our clients save thousands of francs. 
              Let us handle your Swiss taxes while you focus on what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                Get Your Tax Quote
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-steel-blue transition-colors">
                Schedule Free Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ClientTestimonialsPage;
