import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Rss } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-gray text-light-gray-bg-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-steel-blue rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="https://horizons-cdn.hostinger.com/86f5c9ae-a957-4d85-920f-0e91670860ff/screenshot-2025-06-09-at-08.29.24-cnebr.png"
                  alt="Taxed GmbH Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xl font-bold">Taxed GmbH</div>
                <div className="text-sm text-light-gray-bg-1/80">Expat Tax Consulting Made Simple</div>
              </div>
            </div>
            <p className="text-light-gray-bg-1/80 mb-4 max-w-md">
              We make Swiss tax filing simple, digital, and stress-free — with no hidden costs. 
              Transparent, flat-rate solutions for expats and professionals.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-light-gray-bg-1/80">
                <Phone className="h-4 w-4" />
                <span>+41 79 910 77 87</span>
              </div>
              <div className="flex items-center space-x-2 text-light-gray-bg-1/80">
                <Mail className="h-4 w-4" />
                <span>info@taxed.ch</span>
              </div>
              <div className="flex items-center space-x-2 text-light-gray-bg-1/80">
                <MapPin className="h-4 w-4" />
                <span>Biel/Bienne, Switzerland</span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Quick Links</span>
            <ul className="space-y-2">
              <li><Link to="/" className="text-light-gray-bg-1/80 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-light-gray-bg-1/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-light-gray-bg-1/80 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/how-it-works" className="text-light-gray-bg-1/80 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/services" className="text-light-gray-bg-1/80 hover:text-white transition-colors">Our Services</Link></li>
              <li><Link to="/pricing" className="text-light-gray-bg-1/80 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/store" className="text-light-gray-bg-1/80 hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/contact" className="text-light-gray-bg-1/80 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Our Focus</span>
            <ul className="space-y-2 text-light-gray-bg-1/80">
              <li>Individual Expat Tax Returns</li>
              <li>Quellensteuer Adjustments</li>
              <li>International Income Reporting</li>
              <li>Digital & Secure Filing</li>
              <li>Flat-Rate Pricing</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-light-gray-bg-1/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-light-gray-bg-1/80 text-sm">
              © 2025 Taxed GmbH. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link to="/impressum" className="text-light-gray-bg-1/80 hover:text-white text-sm transition-colors">
                Impressum
              </Link>
              <Link to="/privacy" className="text-light-gray-bg-1/80 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-light-gray-bg-1/80 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="text-light-gray-bg-1/80 hover:text-white transition-colors">
                <Rss className="h-5 w-5" />
                <span className="sr-only">RSS Feed</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;