import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, ShoppingCart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { MegaMenu, SearchModal, navigation } from '@/components/header/index';

const Header = ({ isLandingPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
                  <Link to={navItem.href} className={getLinkClass(navItem.href)}>
                    {navItem.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>

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

            <Button
              asChild
              className="bg-gradient-to-r from-steel-blue to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Link to="/contact">Get Started</Link>
            </Button>

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

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;
