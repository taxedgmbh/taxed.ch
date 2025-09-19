import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Rss, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram,
  ArrowRight,
  Shield,
  Award,
  Users,
  Globe,
  FileText,
  Calculator,
  Newspaper,
  Settings,
  ShoppingBag,
  ExternalLink,
  Map,
  Clock,
  Navigation
} from 'lucide-react';

interface InteractiveMapProps {
  className?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ className = '' }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newZoom = Math.max(0.5, Math.min(3, zoom + (e.deltaY > 0 ? -0.1 : 0.1)));
    setZoom(newZoom);
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-100 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
          transition: isDragging ? 'none' : 'transform 0.3s ease'
        }}
      >
        {/* Simplified map representation */}
        <div className="w-full h-48 bg-gradient-to-br from-green-100 to-blue-100 relative">
          {/* Switzerland outline */}
          <div className="absolute inset-4 border-2 border-gray-400 rounded-lg bg-white/50">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium">Zurich Office</span>
              </div>
              <div className="text-xs text-gray-600">
                <p>Bahnhofstrasse 1</p>
                <p>8001 Zurich, Switzerland</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map controls */}
      <div className="absolute top-2 right-2 flex flex-col gap-1">
        <button
          onClick={() => setZoom(prev => Math.min(3, prev + 0.2))}
          className="w-8 h-8 bg-white/80 hover:bg-white rounded border border-gray-200 flex items-center justify-center text-sm font-bold"
        >
          +
        </button>
        <button
          onClick={() => setZoom(prev => Math.max(0.5, prev - 0.2))}
          className="w-8 h-8 bg-white/80 hover:bg-white rounded border border-gray-200 flex items-center justify-center text-sm font-bold"
        >
          −
        </button>
      </div>

      {/* Info panel */}
      {showInfo && (
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Navigation className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">Interactive Map</span>
          </div>
          <p className="text-xs text-gray-600">
            Drag to pan, scroll to zoom
          </p>
        </div>
      )}
    </div>
  );
};

const Footer: React.FC = () => {
  const [isMapExpanded, setIsMapExpanded] = useState<boolean>(false);

  const footerLinks = {
    services: [
      { label: 'Individual Tax Returns', href: '/services/individual' },
      { label: 'Business Tax Returns', href: '/services/business' },
      { label: 'Expat Tax Services', href: '/services/expat' },
      { label: 'Tax Planning', href: '/services/planning' },
      { label: 'Crypto Tax Services', href: '/services/crypto' },
      { label: 'Tax Audits', href: '/services/audits' }
    ],
    resources: [
      { label: 'Tax Guides', href: '/guides' },
      { label: 'Blog', href: '/blog' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Tax Calculator', href: '/calculators' },
      { label: 'Resource Center', href: '/resources' }
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'News', href: '/news' },
      { label: 'Client Portal', href: '/client-portal' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Accessibility', href: '/accessibility' },
      { label: 'Impressum', href: '/impressum' },
      { label: 'Sitemap', href: '/sitemap' }
    ]
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/company/taxed-gmbh', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/taxed_gmbh', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com/taxed.gmbh', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/taxed_gmbh', label: 'Instagram' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-steel-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold">Taxed GmbH</span>
            </div>
            <p className="text-gray-300 mb-4">
              Professional Swiss tax consulting firm offering expert services for expatriates and businesses.
            </p>
            
            {/* Contact info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-steel-blue" />
                <span>+41 44 123 4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-steel-blue" />
                <span>info@taxed.ch</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-steel-blue" />
                <span>Zurich, Switzerland</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 hover:bg-steel-blue rounded-lg flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interactive map section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Our Location</h3>
            <button
              onClick={() => setIsMapExpanded(!isMapExpanded)}
              className="text-steel-blue hover:text-white transition-colors text-sm flex items-center gap-1"
            >
              {isMapExpanded ? 'Collapse' : 'Expand'} Map
              <ArrowRight className={`w-4 h-4 transition-transform ${isMapExpanded ? 'rotate-90' : ''}`} />
            </button>
          </div>
          
          <div className={`transition-all duration-300 ${isMapExpanded ? 'h-64' : 'h-32'}`}>
            <InteractiveMap className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              © 2024 Taxed GmbH. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
