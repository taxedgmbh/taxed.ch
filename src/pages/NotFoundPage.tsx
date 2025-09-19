import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Home, 
  Search, 
  Calculator, 
  FileText, 
  Users, 
  Globe, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle,
  AlertTriangle,
  Compass,
  Building,
  Shield,
  Award
} from 'lucide-react';

interface PopularService {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  href: string;
  color: string;
}

interface QuickLink {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
}

const NotFoundPage: React.FC = () => {
  const popularServices: PopularService[] = [
    {
      title: 'Tax Calculators',
      description: 'Free Swiss tax calculation tools',
      icon: Calculator,
      href: '/calculators',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Expat Tax Guide',
      description: 'Complete guide for expatriates',
      icon: Globe,
      href: '/resources',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Our Services',
      description: 'Professional Swiss tax consulting',
      icon: Building,
      href: '/services',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Contact Us',
      description: 'Get expert tax advice',
      icon: Users,
      href: '/contact',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const quickLinks: QuickLink[] = [
    { name: 'About Us', href: '/about', icon: Building },
    { name: 'FAQ', href: '/faq', icon: FileText },
    { name: 'Blog', href: '/blog', icon: FileText },
    { name: 'News', href: '/news', icon: FileText },
    { name: 'Team', href: '/team', icon: Users },
    { name: 'Case Studies', href: '/case-studies', icon: Award }
  ];

  const handleEmailClick = (): void => {
    const subject = encodeURIComponent("Inquiry");
    const body = encodeURIComponent("Hello Taxed GmbH,\n\nI have a question about your services. Could you please help me?");
    const emailUrl = `mailto:info@taxed.ch?subject=${subject}&body=${body}`;
    window.open(emailUrl, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Page Not Found - 404 | Taxed GmbH</title>
        <meta name="description" content="The page you're looking for couldn't be found. Explore our comprehensive Swiss expat tax services and resources." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-steel-blue via-blue-600 to-purple-700 text-white relative overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center">
            {/* 404 Number */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="text-9xl lg:text-[12rem] font-bold text-white/90 mb-4">
                404
              </div>
              <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
            </motion.div>

            {/* Main Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Page Not Found
              </h1>
              <p className="text-xl lg:text-2xl max-w-3xl mx-auto text-blue-100 mb-8">
                The page you're looking for couldn't be found. But don't worry - 
                we're here to help you navigate Swiss expat taxes with Swiss precision.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link
                to="/"
                className="inline-flex items-center px-8 py-4 bg-white text-steel-blue font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Help
              </Link>
            </motion.div>

            {/* Search Suggestion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-yellow-400 mr-2" />
                  <h3 className="text-lg font-semibold">Can't find what you're looking for?</h3>
                </div>
                <p className="text-blue-100 mb-4">
                  Try searching our comprehensive Swiss expat tax resources or explore the popular services below.
                </p>
                <Link
                  to="/sitemap"
                  className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  View Full Sitemap
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-4">
              Popular Services & Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our most popular Swiss expat tax services and resources
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={service.href}
                  className="block group"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-steel-blue/30">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-dark-gray mb-3 group-hover:text-steel-blue transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center text-steel-blue font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-4">
              Quick Navigation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find what you need quickly with our organized navigation
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={link.href}
                  className="block group"
                >
                  <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-steel-blue/30">
                    <div className="w-12 h-12 bg-gradient-to-r from-steel-blue to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <link.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-dark-gray group-hover:text-steel-blue transition-colors">
                      {link.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 swiss-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-10 w-10 text-yellow-400" />
                </div>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Still Can't Find What You Need?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Our expert team is here to help you navigate Swiss expat taxes. 
                Get personalized assistance from Swiss tax professionals.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Phone className="h-6 w-6 mx-auto mb-2 text-blue-200" />
                  <p className="text-sm text-blue-100">info@taxed.ch</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Mail className="h-6 w-6 mx-auto mb-2 text-blue-200" />
                  <p className="text-sm text-blue-100">info@taxed.ch</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <MessageCircle className="h-6 w-6 mx-auto mb-2 text-blue-200" />
                  <p className="text-sm text-blue-100">Email Chat</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-3 bg-white text-steel-blue font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Schedule Consultation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <button
                  onClick={handleEmailClick}
                  className="inline-flex items-center px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Email Chat
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Swiss Excellence Section */}
      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-200">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-dark-gray mb-4">
                Swiss Excellence in Expat Tax Services
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                At Taxed GmbH, we combine Swiss precision with international expertise to provide 
                the most comprehensive expat tax services in Switzerland.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Swiss Quality</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">International Expertise</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Compass className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Guided Navigation</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;
