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

const InteractiveMap = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showInfo, setShowInfo] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
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

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleMarkerClick = () => {
    setShowInfo(!showInfo);
  };

  const openDirections = () => {
    window.open('https://maps.google.com/maps?q=Biel+Bienne+Switzerland', '_blank');
  };

  const openStreetView = () => {
    window.open('https://www.google.com/maps/@47.1371,7.2471,3a,75y,0h,90t/data=!3m6!1e1!3m4!1s!2e0!7i16384!8i8192', '_blank');
  };

  return (
    <div className="relative group">
      {/* Map Container */}
      <div 
        className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden relative cursor-grab border border-gray-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Map Background Pattern */}
        <div 
          className="absolute inset-0 opacity-20 transition-transform duration-300"
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            background: 'linear-gradient(45deg, #2d3748 25%, transparent 25%), linear-gradient(-45deg, #2d3748 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2d3748 75%), linear-gradient(-45deg, transparent 75%, #2d3748 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        ></div>

        {/* Grid Lines */}
        <div 
          className="absolute inset-0 opacity-10 transition-transform duration-300"
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        ></div>

        {/* Roads and Streets */}
        <div 
          className="absolute inset-0 opacity-15 transition-transform duration-300"
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px),
              linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
              linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 60px 60px, 40px 40px, 40px 40px'
          }}
        ></div>

        {/* Location Marker */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 cursor-pointer"
          style={{ transform: `translate(-50%, -50%) scale(${zoom})` }}
          onClick={handleMarkerClick}
        >
          <div className="relative">
            {/* Pulse Animation */}
            <div className="absolute inset-0 w-8 h-8 bg-steel-blue/30 rounded-full animate-ping"></div>
            <div className="absolute inset-0 w-8 h-8 bg-steel-blue/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            
            {/* Main Marker */}
            <div className="relative w-8 h-8 bg-gradient-to-br from-steel-blue to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
              <MapPin className="h-4 w-4 text-white" />
            </div>

            {/* Info Tooltip */}
            {showInfo && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white text-gray-900 rounded-lg shadow-xl p-3 min-w-48 z-10">
                <div className="text-sm font-semibold mb-1">Taxed GmbH</div>
                <div className="text-xs text-gray-600 mb-2">Biel/Bienne, Switzerland</div>
                <div className="text-xs text-gray-500 mb-3">Swiss Tax Consulting</div>
                <div className="flex space-x-2">
                  <button 
                    onClick={openDirections}
                    className="text-xs bg-steel-blue text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
                  >
                    Directions
                  </button>
                  <button 
                    onClick={openStreetView}
                    className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition-colors"
                  >
                    Street View
                  </button>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
              </div>
            )}
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute top-2 right-2 flex flex-col space-y-1">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors"
            aria-label="Zoom in"
          >
            <span className="text-lg font-bold">+</span>
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors"
            aria-label="Zoom out"
          >
            <span className="text-lg font-bold">−</span>
          </button>
        </div>

        {/* Zoom Level Indicator */}
        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {Math.round(zoom * 100)}%
        </div>

        {/* Overlay with Location Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center space-x-2 text-white">
            <MapPin className="h-4 w-4 text-steel-blue" />
            <div>
              <div className="text-sm font-semibold">Biel/Bienne, Switzerland</div>
              <div className="text-xs text-gray-300">Our headquarters</div>
            </div>
          </div>
        </div>

        {/* Interactive Overlay */}
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="text-center text-white">
            <Map className="h-8 w-8 mx-auto mb-2 text-steel-blue" />
            <div className="text-sm font-semibold">Interactive Map</div>
            <div className="text-xs text-gray-300 mb-3">Drag to move • Click marker for info</div>
            <div className="flex space-x-2 justify-center">
              <button 
                onClick={openDirections}
                className="text-xs bg-steel-blue text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
              >
                Get Directions
              </button>
              <button 
                onClick={openStreetView}
                className="text-xs bg-white/20 text-white px-3 py-1 rounded hover:bg-white/30 transition-colors"
              >
                Street View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center space-x-4">
          <button 
            onClick={openDirections}
            className="flex items-center space-x-1 hover:text-steel-blue transition-colors"
          >
            <Navigation className="h-3 w-3" />
            <span>Directions</span>
          </button>
          <button 
            onClick={openStreetView}
            className="flex items-center space-x-1 hover:text-steel-blue transition-colors"
          >
            <Clock className="h-3 w-3" />
            <span>Street View</span>
          </button>
        </div>
        <div className="text-steel-blue font-medium">Fully Interactive</div>
      </div>
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Individual Tax Returns", href: "/services", description: "Personal tax filing for expats" },
        { name: "Quellensteuer Adjustments", href: "/services", description: "Withholding tax corrections" },
        { name: "International Income", href: "/services", description: "Cross-border income reporting" },
        { name: "Tax Planning", href: "/services", description: "Strategic tax optimization" },
        { name: "Client Portal", href: "/client-portal", description: "Secure client access" },
        { name: "Advanced Tax Tools", href: "/advanced-tax-tools", description: "Professional analysis tools" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Tax Calculators", href: "/calculators", description: "Free Swiss tax calculators" },
        { name: "Resource Center", href: "/resources", description: "Guides, checklists & templates" },
        { name: "News & Updates", href: "/news", description: "Latest Swiss tax news" },
        { name: "Law Section", href: "/law", description: "Legal documents & regulations" },
        { name: "Blog", href: "/blog", description: "Expert insights & tips" },
        { name: "FAQ", href: "/faq", description: "Frequently asked questions" },
      ]
    },
    {
      title: "Expertise",
      links: [
        { name: "Case Studies", href: "/case-studies", description: "Client success stories" },
        { name: "Our Team", href: "/team", description: "Meet our tax experts" },
        { name: "Industry Specializations", href: "/industry-specializations", description: "Sector expertise" },
        { name: "Advanced Tax Tools", href: "/advanced-tax-tools", description: "Professional analysis tools" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about", description: "Our story & mission" },
        { name: "How It Works", href: "/how-it-works", description: "Our process explained" },
        { name: "Pricing", href: "/pricing", description: "Transparent flat-rate pricing" },
        { name: "Contact", href: "/contact", description: "Get in touch with us" },
        { name: "Careers", href: "/careers", description: "Join our team" },
      ]
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", href: "https://linkedin.com/company/taxed-gmbh", icon: Linkedin },
    { name: "Twitter", href: "https://twitter.com/taxed_gmbh", icon: Twitter },
    { name: "Facebook", href: "https://facebook.com/taxedgmbh", icon: Facebook },
    { name: "Instagram", href: "https://instagram.com/taxed_gmbh", icon: Instagram },
  ];

  const certifications = [
    { name: "Swiss Tax Expert", icon: Award },
    { name: "GDPR Compliant", icon: Shield },
    { name: "ISO 27001", icon: Shield },
    { name: "Swiss Quality", icon: Award },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
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
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-steel-blue to-blue-600 hover:from-steel-blue/90 hover:to-blue-600/90 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/pricing"
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
            {/* Company Info - 4 columns */}
            <div className="lg:col-span-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-steel-blue to-blue-600 rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
                  <img
                    src="https://horizons-cdn.hostinger.com/86f5c9ae-a957-4d85-920f-0e91670860ff/screenshot-2025-06-09-at-08.29.24-cnebr.png"
                    alt="Taxed GmbH Logo"
                    className="w-full h-full object-cover"
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

            {/* Footer Links - 8 columns */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {footerSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                      {section.title === "Services" && <Settings className="h-5 w-5 mr-2 text-steel-blue" />}
                      {section.title === "Resources" && <FileText className="h-5 w-5 mr-2 text-steel-blue" />}
                      {section.title === "Company" && <Users className="h-5 w-5 mr-2 text-steel-blue" />}
                      {section.title}
                    </h3>
                    <ul className="space-y-4">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            to={link.href}
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
            {/* Copyright and Legal */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
              <p>© {currentYear} Taxed GmbH. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <Link to="/impressum" className="hover:text-white transition-colors">
                  Impressum
                </Link>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>

            {/* Additional Links */}
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
              <Link to="/accessibility" className="flex items-center space-x-2 hover:text-white transition-colors">
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
                Made with ❤️ in Switzerland
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;