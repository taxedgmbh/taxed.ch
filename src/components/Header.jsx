import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Mail, 
  ShoppingCart, 
  ChevronDown, 
  Calculator, 
  FileText, 
  Newspaper, 
  Settings, 
  ShoppingBag, 
  Search,
  Users,
  Building,
  TrendingUp,
  Shield,
  Globe,
  Award,
  Briefcase,
  BookOpen,
  Scale,
  Zap,
  Target,
  BarChart3,
  PieChart,
  Lock,
  Eye,
  Download,
  Calendar,
  DollarSign,
  Star,
  ArrowRight,
  Play,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

const MegaMenu = ({ navItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [menuPosition, setMenuPosition] = useState({ left: '50%', transform: 'translateX(-50%)' });
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  // Focus trap for accessibility and position calculation
  useEffect(() => {
    if (isOpen) {
      calculateMenuPosition();
      
      if (menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    }
  }, [isOpen]);

  // Recalculate position on window resize
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        calculateMenuPosition();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const getIcon = (name) => {
    switch (name) {
      case 'Tax Calculators': return <Calculator className="w-5 h-5" />;
      case 'Resource Center': return <FileText className="w-5 h-5" />;
      case 'News & Updates': return <Newspaper className="w-5 h-5" />;
      case 'Our Services': return <Settings className="w-5 h-5" />;
      case 'All Packages': return <ShoppingBag className="w-5 h-5" />;
      case 'How It Works': return <Settings className="w-5 h-5" />;
      case 'Pricing & Packages': return <DollarSign className="w-5 h-5" />;
      case 'Tax Consultations': return <FileText className="w-5 h-5" />;
      case 'Client Portal': return <Lock className="w-5 h-5" />;
      case 'Case Studies': return <BarChart3 className="w-5 h-5" />;
      case 'Our Team': return <Users className="w-5 h-5" />;
      case 'Industry Specializations': return <Building className="w-5 h-5" />;
      case 'Advanced Tax Tools': return <PieChart className="w-5 h-5" />;
      case 'Law Section': return <Scale className="w-5 h-5" />;
      default: return <ArrowRight className="w-5 h-5" />;
    }
  };

  const getSectionImage = (title) => {
    const images = {
      'Core Services': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'Expertise & Insights': 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'Tools & Resources': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'Shop': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    };
    return images[title] || images['Core Services'];
  };

  const getSectionColor = (title) => {
    const colors = {
      'Core Services': 'from-blue-600 to-blue-700',
      'Expertise & Insights': 'from-purple-600 to-purple-700',
      'Tools & Resources': 'from-green-600 to-green-700',
      'Shop': 'from-orange-600 to-orange-700'
    };
    return colors[title] || 'from-blue-600 to-blue-700';
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const calculateMenuPosition = () => {
    if (triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      // Calculate optimal width and position that ensures no overflow
      const triggerCenter = triggerRect.left + (triggerRect.width / 2);
      const margin = 30; // 30px margin from edges
      const maxAvailableWidth = viewportWidth - (margin * 2); // Total available width
      
      // Set menu width with proper constraints - SMALLER VERSION
      const menuWidth = Math.max(400, Math.min(600, maxAvailableWidth)); // Min 400px, max 600px, never exceed viewport
      
      // Calculate ideal center position
      let left = triggerCenter - (menuWidth / 2);
      
      // Ensure menu doesn't go off the left edge
      if (left < margin) {
        left = margin;
      }
      
      // Ensure menu doesn't go off the right edge
      if (left + menuWidth > viewportWidth - margin) {
        left = viewportWidth - menuWidth - margin;
      }
      
      // Final safety check - ensure menu is never positioned outside viewport
      left = Math.max(0, Math.min(left, viewportWidth - menuWidth));
      
      // Enhanced debug logging
      console.log('🔍 MEGA MENU DEBUG:', {
        'Viewport Width': viewportWidth,
        'Trigger Rect': {
          left: triggerRect.left,
          right: triggerRect.right,
          width: triggerRect.width,
          center: triggerCenter
        },
        'Menu Dimensions': {
          width: menuWidth,
          left: left,
          right: left + menuWidth
        },
        'Boundaries': {
          leftMargin: margin,
          rightMargin: viewportWidth - margin,
          maxAvailableWidth: maxAvailableWidth
        },
        'Position Check': {
          leftOverflow: left < 0,
          rightOverflow: left + menuWidth > viewportWidth,
          withinBounds: left >= 0 && left + menuWidth <= viewportWidth
        }
      });
      
      // Test alternative positioning approach - SMALLER VERSION
      const alternativePosition = {
        left: '50%',
        transform: 'translateX(-50%)',
        width: `${Math.min(600, viewportWidth - 60)}px`,
        maxWidth: 'calc(100vw - 60px)'
      };
      
      console.log('🔄 ALTERNATIVE POSITION:', alternativePosition);
      
      setMenuPosition({
        left: `${left}px`,
        transform: 'none',
        width: `${menuWidth}px`
      });
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onKeyDown={handleKeyDown}
      ref={menuRef}
    >
      <Button
        ref={triggerRef}
        variant="ghost"
        className="flex items-center text-gray-700 hover:text-steel-blue hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`${navItem.name} menu`}
        onFocus={() => setIsOpen(true)}
      >
        {navItem.name}
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full mt-3 bg-white shadow-2xl rounded-3xl border border-gray-200 z-50 backdrop-blur-xl overflow-hidden"
            style={{
              left: menuPosition.left,
              transform: menuPosition.transform,
              width: menuPosition.width || '600px',
              maxWidth: 'calc(100vw - 60px)',
              minWidth: '400px',
            }}
            role="menu"
            aria-label={`${navItem.name} submenu`}
          >
            {/* Header with gradient - SMALLER */}
            <div className={`bg-gradient-to-r ${getSectionColor(navItem.items[activeSection]?.title)} text-white p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold mb-1">{navItem.name}</h2>
                  <p className="text-blue-100 text-xs">Swiss tax solutions</p>
                </div>
                <div className="flex space-x-2">
                  {navItem.items.map((section, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSection(index)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        activeSection === index 
                          ? 'bg-white/20 text-white' 
                          : 'text-blue-100 hover:bg-white/10'
                      }`}
                    >
                      {section.title.charAt(0)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-0">
              {/* Left side - Navigation - COMPACT */}
              <div className="col-span-12 p-4">
                <div className="grid grid-cols-1 gap-4">
                  {navItem.items.map((section, sectionIndex) => (
                    <motion.div
                      key={sectionIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: activeSection === sectionIndex ? 1 : 0.3,
                        x: activeSection === sectionIndex ? 0 : -20
                      }}
                      transition={{ duration: 0.3 }}
                      className={`space-y-4 ${activeSection === sectionIndex ? 'block' : 'hidden'}`}
                    >
                      <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                        <div className={`w-8 h-8 bg-gradient-to-br ${getSectionColor(section.title)} rounded-lg flex items-center justify-center shadow-lg`}>
                          <span className="text-white text-sm font-bold">
                            {section.title.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-gray-900">
                            {section.title}
                          </h3>
                          <p className="text-xs text-gray-500">Professional solutions</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            to={item.href}
                            className="group flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 border border-transparent hover:border-blue-100"
                            onClick={() => setIsOpen(false)}
                            role="menuitem"
                            tabIndex={0}
                          >
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-gradient-to-br from-steel-blue to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                {getIcon(item.name)}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-steel-blue transition-colors duration-200">
                                  {item.name}
                                </h4>
                                <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-steel-blue group-hover:translate-x-1 transition-all duration-200" />
                              </div>
                              <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-700 transition-colors duration-200">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right side - REMOVED FOR COMPACT DESIGN */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = ({ isLandingPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navigation = [
    {
      name: 'Services',
      type: 'mega',
      items: [
        {
          title: 'Core Services',
          items: [
            { name: 'How It Works', href: '/how-it-works', description: 'Learn about our process' },
            { name: 'Our Services', href: '/services', description: 'Comprehensive tax solutions' },
            { name: 'Pricing & Packages', href: '/pricing', description: 'Transparent pricing' },
            { name: 'Client Portal', href: '/client-portal', description: 'Secure client access' },
            { name: 'Tax Support', href: '/support', description: 'Help center & support' },
            { name: 'Tax Security', href: '/security', description: 'Data protection & security' },
          ]
        },
        {
          title: 'Expertise & Insights',
          items: [
            { name: 'Case Studies', href: '/case-studies', description: 'Client success stories' },
            { name: 'About Our Team', href: '/about', description: 'Meet our tax experts' },
            { name: 'Industry Specializations', href: '/industry-specializations', description: 'Sector-specific expertise' },
            { name: 'Advanced Tax Tools', href: '/advanced-tax-tools', description: 'Professional analysis tools' },
            { name: 'Client Testimonials', href: '/testimonials', description: 'Client success stories' },
            { name: 'Business Tax Guide', href: '/business-tax-guide', description: 'Corporate tax guidance' },
            { name: 'International Tax', href: '/international-tax', description: 'Cross-border tax services' },
          ]
        },
        {
          title: 'Tools & Resources',
          items: [
            { name: 'Tax Calculators', href: '/calculators', description: 'Free Swiss tax calculators' },
            { name: 'Resource Center', href: '/resources', description: 'Guides, checklists & templates' },
            { name: 'News & Updates', href: '/news', description: 'Latest Swiss tax news' },
            { name: 'Law Section', href: '/law', description: 'Legal documents & regulations' },
            { name: 'Tax Deadlines', href: '/tax-deadlines', description: 'Swiss tax deadline calendar' },
            { name: 'Tax Forms', href: '/tax-forms', description: 'Downloadable tax forms' },
            { name: 'Tax Technology', href: '/technology', description: 'Digital tax solutions' },
            { name: 'Tax Glossary', href: '/tax-glossary', description: 'Swiss tax terminology' },
          ]
        },
        {
          title: 'Shop',
          items: [
            { name: 'All Packages', href: '/store', description: 'Browse all services' },
            { name: 'Tax Consultations', href: '/store', description: 'Professional advice' },
          ]
        }
      ],
    },
    {
      name: 'About Us',
      type: 'link',
      href: '/about',
    },
    { name: 'Blog', href: '/blog', type: 'link' },
    { name: 'Contact', href: '/contact', type: 'link' },
  ];

  const getLinkClass = (href) => {
    return `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      location.pathname === href || (href.startsWith('/blog') && location.pathname.startsWith('/blog'))
        ? 'text-steel-blue bg-steel-blue/10'
        : 'text-gray-700 hover:text-steel-blue hover:bg-gray-50'
    }`;
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-steel-blue to-blue-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Mail className="h-3 w-3" />
                <span>info@taxed.ch</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span className="text-blue-100">Biel/Bienne, Switzerland</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-steel-blue to-blue-600 rounded-xl flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                <img 
                  src="https://horizons-cdn.hostinger.com/86f5c9ae-a957-4d85-920f-0e91670860ff/screenshot-2025-06-09-at-08.29.24-cnebr.png" 
                  alt="Taxed GmbH Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 group-hover:text-steel-blue transition-colors">
                  Taxed GmbH
                </div>
                <div className="text-xs text-gray-500">Swiss Tax Experts</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((navItem) => (
              <div key={navItem.name}>
                {navItem.type === 'mega' ? (
                  <MegaMenu navItem={navItem} />
                ) : (
                  <Link
                    to={navItem.href}
                    className={getLinkClass(navItem.href)}
                  >
                    {navItem.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Search className="h-4 w-4" />
            </Button>

            {/* Cart */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>

            {/* CTA Button */}
            <Button 
              asChild
              className="bg-gradient-to-r from-steel-blue to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Link to="/contact">
                Get Started
              </Link>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((navItem) => (
                <div key={navItem.name}>
                  {navItem.type === 'mega' ? (
                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-3">
                        {navItem.name}
                      </div>
                      <div className="space-y-2 ml-4">
                        {navItem.items.map((section, sectionIndex) => (
                          <div key={sectionIndex}>
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                              {section.title}
                            </div>
                            <div className="space-y-1 ml-4">
                              {section.items.map((item, itemIndex) => (
                                <Link
                                  key={itemIndex}
                                  to={item.href}
                                  className="block text-sm text-gray-700 hover:text-steel-blue py-1"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={navItem.href}
                      className="block text-sm font-medium text-gray-700 hover:text-steel-blue py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {navItem.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;