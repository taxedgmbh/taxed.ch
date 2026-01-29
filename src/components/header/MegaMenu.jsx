import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Calculator,
  FileText,
  Newspaper,
  Settings,
  ShoppingBag,
  Users,
  Building,
  BarChart3,
  PieChart,
  Lock,
  DollarSign,
  Scale,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const getIcon = (name) => {
  const icons = {
    'Tax Calculators': Calculator,
    'Resource Center': FileText,
    'News & Updates': Newspaper,
    'Our Services': Settings,
    'All Packages': ShoppingBag,
    'How It Works': Settings,
    'Pricing & Packages': DollarSign,
    'Tax Consultations': FileText,
    'Client Portal': Lock,
    'Case Studies': BarChart3,
    'Our Team': Users,
    'Industry Specializations': Building,
    'Advanced Tax Tools': PieChart,
    'Law Section': Scale,
  };
  const Icon = icons[name] || ArrowRight;
  return <Icon className="w-5 h-5" />;
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

const MegaMenu = ({ navItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [menuPosition, setMenuPosition] = useState({ left: '50%', transform: 'translateX(-50%)' });
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  const calculateMenuPosition = () => {
    if (triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const triggerCenter = triggerRect.left + (triggerRect.width / 2);
      const margin = 30;
      const maxAvailableWidth = viewportWidth - (margin * 2);
      const menuWidth = Math.max(400, Math.min(600, maxAvailableWidth));

      let left = triggerCenter - (menuWidth / 2);

      if (left < margin) {
        left = margin;
      }

      if (left + menuWidth > viewportWidth - margin) {
        left = viewportWidth - menuWidth - margin;
      }

      left = Math.max(0, Math.min(left, viewportWidth - menuWidth));

      setMenuPosition({
        left: `${left}px`,
        transform: 'none',
        width: `${menuWidth}px`
      });
    }
  };

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

  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        calculateMenuPosition();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

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
            {/* Header with gradient */}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MegaMenu;
