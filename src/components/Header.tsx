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

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  external?: boolean;
  icon?: React.ComponentType<any>;
  description?: string;
}

interface MegaMenuProps {
  navItem: NavItem;
}

interface HeaderProps {
  isLandingPage?: boolean;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ navItem }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [menuPosition, setMenuPosition] = useState<{ left: string; transform: string }>({ 
    left: '50%', 
    transform: 'translateX(-50%)' 
  });
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Focus trap for accessibility and position calculation
  useEffect(() => {
    if (isOpen && menuRef.current && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      let left = triggerRect.left + (triggerRect.width / 2) - (menuRect.width / 2);
      
      // Keep menu within viewport
      if (left < 20) left = 20;
      if (left + menuRect.width > viewportWidth - 20) {
        left = viewportWidth - menuRect.width - 20;
      }
      
      setMenuPosition({
        left: `${left}px`,
        transform: 'none'
      });
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={(e) => {
          if (!menuRef.current?.contains(e.relatedTarget as Node)) {
            setIsOpen(false);
          }
        }}
        className="flex items-center gap-1 text-gray-700 hover:text-steel-blue transition-colors py-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {navItem.label}
        <ChevronDown className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-6"
            style={menuPosition}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onKeyDown={handleKeyDown}
            role="menu"
          >
            <div className="flex gap-8 px-6">
              {/* Navigation sections */}
              <div className="flex flex-col gap-1 min-w-[200px]">
                {navItem.children?.map((section, index) => (
                  <button
                    key={section.href}
                    onClick={() => setActiveSection(index)}
                    className={`text-left px-3 py-2 rounded-md transition-colors ${
                      activeSection === index
                        ? 'bg-steel-blue/10 text-steel-blue'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {section.icon && <section.icon className="w-4 h-4" />}
                      <span className="font-medium">{section.label}</span>
                    </div>
                    {section.description && (
                      <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                    )}
                  </button>
                ))}
              </div>

              {/* Active section content */}
              <div className="min-w-[300px]">
                {navItem.children?.[activeSection] && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">
                      {navItem.children[activeSection].label}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {navItem.children[activeSection].children?.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.icon && <item.icon className="w-4 h-4 text-gray-500" />}
                          <span>{item.label}</span>
                          {item.external && <ExternalLink className="w-3 h-3 text-gray-400" />}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({ isLandingPage = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const location = useLocation();
  const { getTotalItems } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navigation: NavItem[] = [
    {
      label: 'Services',
      href: '/services',
      children: [
        {
          label: 'Tax Services',
          description: 'Comprehensive tax solutions for individuals and businesses',
          children: [
            { label: 'Individual Tax Returns', href: '/services/individual', icon: FileText },
            { label: 'Business Tax Returns', href: '/services/business', icon: Building },
            { label: 'Expat Tax Services', href: '/services/expat', icon: Globe },
            { label: 'Tax Planning', href: '/services/planning', icon: TrendingUp }
          ]
        },
        {
          label: 'Specialized Services',
          description: 'Expert services for complex tax situations',
          children: [
            { label: 'Crypto Tax Services', href: '/services/crypto', icon: Shield },
            { label: 'International Tax', href: '/services/international', icon: Globe },
            { label: 'Tax Audits', href: '/services/audits', icon: Search },
            { label: 'Tax Appeals', href: '/services/appeals', icon: Scale }
          ]
        }
      ]
    },
    {
      label: 'Resources',
      href: '/resources',
      children: [
        {
          label: 'Learning Center',
          description: 'Educational resources and guides',
          children: [
            { label: 'Tax Guides', href: '/guides', icon: BookOpen },
            { label: 'Blog', href: '/blog', icon: Newspaper },
            { label: 'Case Studies', href: '/case-studies', icon: Briefcase },
            { label: 'FAQ', href: '/faq', icon: FileText }
          ]
        },
        {
          label: 'Tools & Calculators',
          description: 'Interactive tools for tax planning',
          children: [
            { label: 'Tax Calculator', href: '/calculators', icon: Calculator },
            { label: 'Tax Tools', href: '/tools', icon: Zap },
            { label: 'Resource Center', href: '/resources', icon: BookOpen }
          ]
        }
      ]
    },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled || !isLandingPage 
        ? 'bg-white/95 backdrop-blur-sm shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-steel-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Taxed GmbH</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              item.children ? (
                <MegaMenu key={item.label} navItem={item} />
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-gray-700 hover:text-steel-blue transition-colors"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/client-portal" className="text-gray-700 hover:text-steel-blue transition-colors">
              Client Portal
            </Link>
            <Button variant="outline" size="sm">
              Get Quote
            </Button>
            <Button size="sm">
              Start Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-steel-blue hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => (
                  <div key={item.label}>
                    <Link
                      to={item.href}
                      className="block px-4 py-2 text-gray-700 hover:text-steel-blue hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="ml-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-steel-blue hover:bg-gray-50 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    to="/client-portal"
                    className="block px-4 py-2 text-gray-700 hover:text-steel-blue hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Client Portal
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
