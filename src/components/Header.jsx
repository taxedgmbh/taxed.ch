import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Phone, Mail, ShoppingCart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useCart } from '@/hooks/useCart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleScroll = (e, targetId) => {
    if (isLandingPage) {
      e.preventDefault();
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    }
  };

  const navigation = [
    {
      name: 'Services',
      type: 'dropdown',
      items: [
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'Our Services', href: '/services' },
      ],
    },
    {
      name: 'Pricing & Packages',
      type: 'dropdown',
      items: [
        { name: 'Pricing', href: '/pricing' },
        { name: 'Shop All Packages', href: '/store' },
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
    return `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      location.pathname === href || (href.startsWith('/blog') && location.pathname.startsWith('/blog'))
        ? 'text-steel-blue bg-warm-red-tint'
        : 'text-dark-gray hover:text-steel-blue hover:bg-warm-red-tint'
    }`;
  };

  return (
    <header className="bg-light-gray-bg-1 shadow-sm sticky top-0 z-50">
      <div className="bg-steel-blue text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+41 79 910 77 87</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@taxed.ch</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Biel/Bienne, Switzerland</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-steel-blue rounded-lg flex items-center justify-center overflow-hidden">
                <img src="https://horizons-cdn.hostinger.com/86f5c9ae-a957-4d85-920f-0e91670860ff/screenshot-2025-06-09-at-08.29.24-cnebr.png" alt="Taxed GmbH Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-xl font-bold text-dark-gray">Taxed GmbH</div>
                <div className="text-xs text-gray-600">Expat Tax Consulting</div>
              </div>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((navItem) => (
                navItem.type === 'link' ? (
                  <Link key={navItem.name} to={navItem.href} className={getLinkClass(navItem.href)}>
                    {navItem.name}
                  </Link>
                ) : (
                  <DropdownMenu key={navItem.name}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center text-dark-gray hover:text-steel-blue hover:bg-warm-red-tint"
                      >
                        {navItem.name}
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-md p-1">
                      {navItem.items.map((item, index) => (
                        <React.Fragment key={item.name}>
                          <DropdownMenuItem asChild>
                            <Link to={item.href} className="block px-2 py-1.5 text-sm text-dark-gray hover:bg-warm-red-tint rounded-sm">
                              {item.name}
                            </Link>
                          </DropdownMenuItem>
                          {index < navItem.items.length - 1 && <DropdownMenuSeparator />}
                        </React.Fragment>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
             <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-warm-red-tint rounded-full">
              <ShoppingCart className="h-6 w-6 text-dark-gray" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-brand-red text-white text-xs flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-dark-gray hover:text-steel-blue hover:bg-warm-red-tint"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-light-gray-bg-1 border-t border-steel-blue/20">
              {navigation.map((navItem) => (
                <React.Fragment key={navItem.name}>
                  {navItem.type === 'link' ? (
                    <Link
                      to={navItem.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium ${getLinkClass(navItem.href)}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {navItem.name}
                    </Link>
                  ) : (
                    <>
                      <div className="flex items-center justify-between px-3 py-2 text-base font-medium text-dark-gray">
                        {navItem.name}
                      </div>
                      <div className="ml-4 border-l border-steel-blue/20 pl-4 space-y-1">
                        {navItem.items.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`block px-3 py-2 rounded-md text-sm font-medium ${getLinkClass(item.href)}`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;