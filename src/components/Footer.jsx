import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Rss,
  ArrowRight,
  Shield,
  Award,
  Users,
  Globe,
  FileText,
  Settings,
  Map
} from 'lucide-react';
import { InteractiveMap, footerSections, socialLinks, certifications } from '@/components/footer/index';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section with CTA */}
        <div className="py-12 border-b border-gray-800">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-steel-blue to-blue-400 bg-clip-text text-transparent">
              Ready to Simplify Your Swiss Taxes?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of expats who trust Taxed GmbH for their Swiss tax filing.
              Get started today with our transparent, flat-rate service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                onClick={handleLinkClick}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-steel-blue to-blue-600 hover:from-steel-blue/90 hover:to-blue-600/90 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/pricing"
                onClick={handleLinkClick}
                className="inline-flex items-center px-6 py-3 border border-gray-600 hover:border-steel-blue text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-200"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-steel-blue to-blue-600 rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
                  <img
                    src="/favicon-192x192.png"
                    alt="Taxed GmbH Logo"
                    width="48"
                    height="48"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">Taxed GmbH</div>
                  <div className="text-sm text-gray-400">Expat Tax Consulting Made Simple</div>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                We make Swiss tax filing simple, digital, and stress-free — with no hidden costs.
                Transparent, flat-rate solutions for expats and professionals across Switzerland.
              </p>

              {/* Contact Information */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-steel-blue/20 rounded-lg flex items-center justify-center">
                    <Phone className="h-4 w-4 text-steel-blue" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">+41 79 910 77 87</div>
                    <div className="text-xs text-gray-500">Mon-Fri 9:00-18:00</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-steel-blue/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-4 w-4 text-steel-blue" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">info@taxed.ch</div>
                    <div className="text-xs text-gray-500">24/7 support</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-8 h-8 bg-steel-blue/20 rounded-lg flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-steel-blue" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Biel/Bienne, Switzerland</div>
                    <div className="text-xs text-gray-500">Serving all of Switzerland</div>
                  </div>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4 flex items-center">
                  <Map className="h-4 w-4 mr-2 text-steel-blue" />
                  Our Location
                </h4>
                <InteractiveMap />
              </div>

              {/* Certifications */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Certifications & Standards</h4>
                <div className="grid grid-cols-2 gap-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs text-gray-400">
                      <cert.icon className="h-3 w-3 text-steel-blue" />
                      <span>{cert.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Follow Us</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 hover:bg-steel-blue rounded-lg flex items-center justify-center transition-all duration-200 group"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <social.icon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {footerSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                      {section.title === "Services" && <Settings className="h-5 w-5 mr-2 text-steel-blue" />}
                      {section.title === "Resources" && <FileText className="h-5 w-5 mr-2 text-steel-blue" />}
                      {section.title === "Experience" && <Award className="h-5 w-5 mr-2 text-steel-blue" />}
                      {section.title === "Company" && <Users className="h-5 w-5 mr-2 text-steel-blue" />}
                      {section.title}
                    </h3>
                    <ul className="space-y-4">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            to={link.href}
                            onClick={handleLinkClick}
                            className="group flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
                          >
                            <div className="flex items-center justify-center w-6 h-6 bg-steel-blue/20 rounded-md group-hover:bg-steel-blue group-hover:text-white transition-colors mt-0.5">
                              <ArrowRight className="h-3 w-3 text-steel-blue group-hover:text-white" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                                {link.name}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {link.description}
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
              <p>&copy; {currentYear} Taxed GmbH. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <Link to="/impressum" onClick={handleLinkClick} className="hover:text-white transition-colors">
                  Impressum
                </Link>
                <Link to="/privacy" onClick={handleLinkClick} className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" onClick={handleLinkClick} className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link to="/cookies" onClick={handleLinkClick} className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-white transition-colors"
                aria-label="RSS Feed"
              >
                <Rss className="h-4 w-4" />
                <span>RSS</span>
              </a>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-white transition-colors"
                aria-label="Sitemap"
              >
                <Globe className="h-4 w-4" />
                <span>Sitemap</span>
              </a>
              <Link to="/accessibility" onClick={handleLinkClick} className="flex items-center space-x-2 hover:text-white transition-colors">
                <Shield className="h-4 w-4" />
                <span>Accessibility</span>
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-6 text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <Shield className="h-3 w-3 text-green-400" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-3 w-3 text-yellow-400" />
                  <span>Swiss Quality</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-3 w-3 text-blue-400" />
                  <span>500+ Happy Clients</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Made with love in Switzerland
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
