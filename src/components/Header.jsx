import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, ShoppingCart, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { MegaMenu, SearchModal, navigation } from '@/components/header/index';

const Header = ({ isLandingPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const { cartItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Close the mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setExpandedSection(null);
  }, [location.pathname]);

  const getLinkClass = (href) => {
    return `px-4 py-3 min-h-[44px] inline-flex items-center rounded-lg text-base font-medium transition-all duration-200 ${
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
          <div className="flex justify-between items-center text-base">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
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
                  src="/logo-64.png"
                  alt="Taxed GmbH Logo"
                  width="40"
                  height="40"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchpriority="high"
                />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-steel-blue transition-colors whitespace-nowrap leading-tight">
                  Taxed GmbH
                </div>
                <div className="hidden sm:block text-sm text-gray-500 whitespace-nowrap leading-tight">Swiss Tax Experts</div>
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
                  <Link to={navItem.href} className={getLinkClass(navItem.href)}>
                    {navItem.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative"
              aria-label={`Shopping cart${cartItemCount > 0 ? `, ${cartItemCount} items` : ''}`}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" aria-hidden="true">
                  {cartItemCount}
                </span>
              )}
            </Button>

            <Button
              asChild
              className="hidden min-[400px]:inline-flex bg-gradient-to-r from-steel-blue to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 px-3 sm:px-4 whitespace-nowrap"
            >
              <Link to="/contact">Get Started</Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
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
            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto">
              {/* Search (icon is hidden in the bar on small phones) */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="sm:hidden flex items-center w-full space-x-3 text-base font-medium text-gray-700 hover:text-steel-blue py-3 min-h-[44px]"
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </button>

              {navigation.map((navItem) => (
                <div key={navItem.name}>
                  {navItem.type === 'mega' ? (
                    <div>
                      {navItem.items.map((section) => {
                        const isExpanded = expandedSection === section.title;
                        return (
                          <div key={section.title} className="border-b border-gray-100 last:border-b-0">
                            <button
                              type="button"
                              onClick={() => setExpandedSection(isExpanded ? null : section.title)}
                              aria-expanded={isExpanded}
                              className="flex items-center justify-between w-full text-base font-semibold text-gray-900 py-3 min-h-[44px]"
                            >
                              <span>{section.title}</span>
                              <ChevronDown
                                className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                              />
                            </button>
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pb-2">
                                    {section.items.map((item) => (
                                      <Link
                                        key={item.href + item.name}
                                        to={item.href}
                                        className="block text-base text-gray-600 hover:text-steel-blue py-2.5 pl-4 min-h-[44px] flex items-center"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                      >
                                        {item.name}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <Link
                      to={navItem.href}
                      className="block text-base font-semibold text-gray-900 hover:text-steel-blue py-3 min-h-[44px] border-b border-gray-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {navItem.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Primary CTA */}
              <div className="pt-4">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-steel-blue to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-semibold min-h-[48px]"
                >
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;
