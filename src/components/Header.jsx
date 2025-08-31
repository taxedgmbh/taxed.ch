import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, ShoppingCart, ChevronDown, Calculator, FileText, Newspaper, Settings, ShoppingBag, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

const MegaMenu = ({ navItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  // Focus trap for accessibility
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [isOpen]);

  const getIcon = (name) => {
    switch (name) {
      case 'Tax Calculators': return <Calculator className="w-4 h-4" />;
      case 'Resource Center': return <FileText className="w-4 h-4" />;
      case 'News & Updates': return <Newspaper className="w-4 h-4" />;
      case 'Our Services': return <Settings className="w-4 h-4" />;
      case 'All Packages': return <ShoppingBag className="w-4 h-4" />;
      case 'How It Works': return <Settings className="w-4 h-4" />;
      case 'Pricing & Packages': return <ShoppingBag className="w-4 h-4" />;
      case 'Tax Consultations': return <FileText className="w-4 h-4" />;
      default: return null;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
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
        className="flex items-center text-gray-700 hover:text-steel-blue hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-200"
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
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[800px] max-w-[90vw] bg-white shadow-2xl rounded-2xl border border-gray-100 z-50 backdrop-blur-sm"
            role="menu"
            aria-label={`${navItem.name} submenu`}
          >
            <div className="p-6">
              <div className="grid grid-cols-3 gap-8">
                {navItem.items.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="space-y-4">
                    <div className="flex items-center space-x-3 pb-2 border-b border-gray-100">
                      <div className="w-8 h-8 bg-gradient-to-br from-steel-blue to-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {section.title.charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                        {section.title}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          to={item.href}
                          className="group flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200"
                          onClick={() => setIsOpen(false)}
                          role="menuitem"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              window.location.href = item.href;
                            }
                          }}
                        >
                          <div className="flex items-center justify-center w-10 h-10 bg-steel-blue/10 rounded-lg group-hover:bg-steel-blue group-hover:text-white transition-colors">
                            {getIcon(item.name)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-gray-900 group-hover:text-steel-blue transition-colors">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Featured CTA */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="bg-gradient-to-r from-steel-blue to-blue-600 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold mb-1">Need Expert Tax Advice?</h4>
                      <p className="text-blue-100 text-xs mb-3">
                        Get personalized Swiss tax consulting
                      </p>
                      <Link
                        to="/contact"
                        className="inline-flex items-center px-3 py-1.5 bg-white text-steel-blue rounded-lg text-xs font-semibold hover:bg-blue-50 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Book Consultation
                        <span className="ml-1">→</span>
                      </Link>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
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
          ]
        },
        {
          title: 'Expertise & Insights',
          items: [
            { name: 'Case Studies', href: '/case-studies', description: 'Client success stories' },
            { name: 'Our Team', href: '/team', description: 'Meet our tax experts' },
            { name: 'Industry Specializations', href: '/industry-specializations', description: 'Sector expertise' },
            { name: 'Advanced Tax Tools', href: '/advanced-tax-tools', description: 'Professional analysis tools' },
          ]
        },
        {
          title: 'Tools & Resources',
          items: [
            { name: 'Tax Calculators', href: '/calculators', description: 'Free Swiss tax calculators' },
            { name: 'Resource Center', href: '/resources', description: 'Guides, checklists & templates' },
            { name: 'News & Updates', href: '/news', description: 'Latest Swiss tax news' },
            { name: 'Law Section', href: '/law', description: 'Legal documents & regulations' },
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
                <Phone className="h-3 w-3" />
                <span>+41 79 910 77 87</span>
              </div>
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
                <div className="text-xs text-gray-500">Expat Tax Consulting</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((navItem) => (
              navItem.type === 'link' ? (
                <Link key={navItem.name} to={navItem.href} className={getLinkClass(navItem.href)}>
                  {navItem.name}
                </Link>
              ) : (
                <MegaMenu key={navItem.name} navItem={navItem} />
              )
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center text-gray-600 hover:text-steel-blue hover:bg-gray-50"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Cart */}
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-brand-red text-white text-xs flex items-center justify-center font-medium">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* CTA Button */}
            <Button className="hidden md:inline-flex bg-gradient-to-r from-steel-blue to-blue-600 hover:from-steel-blue/90 hover:to-blue-600/90 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
              Get Started
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-steel-blue hover:bg-gray-50 transition-colors"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
              role="navigation"
              aria-label="Mobile navigation menu"
            >
              <div className="py-4 space-y-2 border-t border-gray-100">
                {navigation.map((navItem) => (
                  <React.Fragment key={navItem.name}>
                    {navItem.type === 'link' ? (
                      <Link
                        to={navItem.href}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${getLinkClass(navItem.href)}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {navItem.name}
                      </Link>
                    ) : (
                      <>
                        <div className="px-4 py-2 text-sm font-semibold text-gray-900 uppercase tracking-wide">
                          {navItem.name}
                        </div>
                        <div className="ml-4 space-y-1">
                          {navItem.items.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="space-y-1">
                              <div className="px-4 py-1 text-xs font-semibold text-steel-blue uppercase tracking-wide">
                                {section.title}
                              </div>
                              {section.items.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.href}
                                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg text-sm transition-colors ${getLinkClass(item.href)}`}
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <div className="flex items-center justify-center w-8 h-8 bg-steel-blue/10 rounded-lg">
                                    {getIcon(item.name)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </React.Fragment>
                ))}
                
                {/* Mobile CTA */}
                <div className="px-4 pt-4">
                  <Button className="w-full bg-gradient-to-r from-steel-blue to-blue-600 hover:from-steel-blue/90 hover:to-blue-600/90 text-white py-3 rounded-lg font-medium">
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;