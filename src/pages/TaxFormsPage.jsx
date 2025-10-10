import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Clock, 
  Target,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Users,
  Building,
  CreditCard,
  Calculator,
  Globe,
  Home,
  Briefcase,
  GraduationCap,
  Heart,
  Lock,
  Award,
  Zap,
  Search,
  Filter,
  Calendar,
  BookOpen,
  Info,
  Shield,
  PieChart,
  Truck,
  ShoppingCart,
  Utensils,
  Music
} from 'lucide-react';

const TaxFormsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Forms', icon: FileText },
    { id: 'individual', name: 'Individual Tax', icon: Users },
    { id: 'corporate', name: 'Corporate Tax', icon: Building },
    { id: 'vat', name: 'VAT', icon: Calculator },
    { id: 'payroll', name: 'Payroll Tax', icon: CreditCard },
    { id: 'international', name: 'International', icon: Globe }
  ];

  const taxForms = [
    {
      id: 'form-204',
      name: 'Form 204 - Individual Tax Return',
      description: 'Main tax return form for individuals',
      category: 'individual',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 8,
      difficulty: 'Medium',
      requirements: [
        'Income statements and certificates',
        'Bank statements and investment records',
        'Deduction receipts and documentation',
        'Previous year tax return'
      ],
      icon: Users,
      downloadUrl: '/documents/forms/form-204.pdf',
      instructionsUrl: '/documents/forms/form-204-instructions.pdf'
    },
    {
      id: 'form-204a',
      name: 'Form 204A - Simplified Tax Return',
      description: 'Simplified form for simple tax situations',
      category: 'individual',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 4,
      difficulty: 'Easy',
      requirements: [
        'Simple income structure',
        'Standard deductions only',
        'No complex investments',
        'No business income'
      ],
      icon: Users,
      downloadUrl: '/documents/forms/form-204a.pdf',
      instructionsUrl: '/documents/forms/form-204a-instructions.pdf'
    },
    {
      id: 'form-204b',
      name: 'Form 204B - Tax Return for Non-Residents',
      description: 'Form for non-residents with Swiss source income',
      category: 'individual',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 6,
      difficulty: 'Medium',
      requirements: [
        'Non-resident status documentation',
        'Swiss source income statements',
        'Foreign tax credit documentation',
        'Residency certificates'
      ],
      icon: Globe,
      downloadUrl: '/documents/forms/form-204b.pdf',
      instructionsUrl: '/documents/forms/form-204b-instructions.pdf'
    },
    {
      id: 'form-204c',
      name: 'Form 204C - Tax Return for Couples',
      description: 'Joint tax return for married couples',
      category: 'individual',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 10,
      difficulty: 'Medium',
      requirements: [
        'Marriage certificate',
        'Both spouses income statements',
        'Joint bank accounts and investments',
        'Previous year joint return'
      ],
      icon: Heart,
      downloadUrl: '/documents/forms/form-204c.pdf',
      instructionsUrl: '/documents/forms/form-204c-instructions.pdf'
    },
    {
      id: 'form-200',
      name: 'Form 200 - Corporate Tax Return',
      description: 'Corporate tax return for Swiss companies',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 12,
      difficulty: 'High',
      requirements: [
        'Audited financial statements',
        'Corporate resolutions and minutes',
        'Shareholder information',
        'Previous year corporate return'
      ],
      icon: Building,
      downloadUrl: '/documents/forms/form-200.pdf',
      instructionsUrl: '/documents/forms/form-200-instructions.pdf'
    },
    {
      id: 'form-200a',
      name: 'Form 200A - Simplified Corporate Tax Return',
      description: 'Simplified corporate tax return for small companies',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 6,
      difficulty: 'Medium',
      requirements: [
        'Simple corporate structure',
        'Standard business operations',
        'No complex transactions',
        'Small company criteria met'
      ],
      icon: Building,
      downloadUrl: '/documents/forms/form-200a.pdf',
      instructionsUrl: '/documents/forms/form-200a-instructions.pdf'
    },
    {
      id: 'form-200b',
      name: 'Form 200B - Tax Return for Foreign Companies',
      description: 'Tax return for foreign companies with Swiss operations',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 10,
      difficulty: 'High',
      requirements: [
        'Foreign company documentation',
        'Swiss operations documentation',
        'Transfer pricing documentation',
        'International tax treaties'
      ],
      icon: Globe,
      downloadUrl: '/documents/forms/form-200b.pdf',
      instructionsUrl: '/documents/forms/form-200b-instructions.pdf'
    },
    {
      id: 'form-200c',
      name: 'Form 200C - Tax Return for Partnerships',
      description: 'Tax return for partnerships and joint ventures',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 8,
      difficulty: 'High',
      requirements: [
        'Partnership agreement',
        'Partner information and contributions',
        'Profit and loss allocation',
        'Partnership financial statements'
      ],
      icon: Users,
      downloadUrl: '/documents/forms/form-200c.pdf',
      instructionsUrl: '/documents/forms/form-200c-instructions.pdf'
    },
    {
      id: 'form-200d',
      name: 'Form 200D - Tax Return for Holding Companies',
      description: 'Tax return for holding companies and investment structures',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 14,
      difficulty: 'Very High',
      requirements: [
        'Holding company documentation',
        'Investment portfolio details',
        'Dividend and interest income',
        'International tax planning'
      ],
      icon: Building,
      downloadUrl: '/documents/forms/form-200d.pdf',
      instructionsUrl: '/documents/forms/form-200d-instructions.pdf'
    },
    {
      id: 'form-200e',
      name: 'Form 200E - Tax Return for Group Companies',
      description: 'Tax return for group companies and consolidated structures',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 16,
      difficulty: 'Very High',
      requirements: [
        'Group structure documentation',
        'Consolidated financial statements',
        'Intercompany transactions',
        'Transfer pricing documentation'
      ],
      icon: Building,
      downloadUrl: '/documents/forms/form-200e.pdf',
      instructionsUrl: '/documents/forms/form-200e-instructions.pdf'
    },
    {
      id: 'form-200f',
      name: 'Form 200F - Tax Return for International Companies',
      description: 'Tax return for international companies with Swiss operations',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 18,
      difficulty: 'Very High',
      requirements: [
        'International company documentation',
        'Swiss operations documentation',
        'Transfer pricing documentation',
        'International tax treaties'
      ],
      icon: Globe,
      downloadUrl: '/documents/forms/form-200f.pdf',
      instructionsUrl: '/documents/forms/form-200f-instructions.pdf'
    },
    {
      id: 'form-200g',
      name: 'Form 200G - Tax Return for Financial Companies',
      description: 'Tax return for financial companies and banks',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 20,
      difficulty: 'Very High',
      requirements: [
        'Financial company documentation',
        'Banking and financial statements',
        'Regulatory compliance documentation',
        'Financial services documentation'
      ],
      icon: CreditCard,
      downloadUrl: '/documents/forms/form-200g.pdf',
      instructionsUrl: '/documents/forms/form-200g-instructions.pdf'
    },
    {
      id: 'form-200h',
      name: 'Form 200H - Tax Return for Insurance Companies',
      description: 'Tax return for insurance companies and reinsurers',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 22,
      difficulty: 'Very High',
      requirements: [
        'Insurance company documentation',
        'Insurance and reinsurance statements',
        'Regulatory compliance documentation',
        'Insurance services documentation'
      ],
      icon: Shield,
      downloadUrl: '/documents/forms/form-200h.pdf',
      instructionsUrl: '/documents/forms/form-200h-instructions.pdf'
    },
    {
      id: 'form-200i',
      name: 'Form 200I - Tax Return for Real Estate Companies',
      description: 'Tax return for real estate companies and property developers',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 16,
      difficulty: 'High',
      requirements: [
        'Real estate company documentation',
        'Property and real estate statements',
        'Real estate development documentation',
        'Property management documentation'
      ],
      icon: Home,
      downloadUrl: '/documents/forms/form-200i.pdf',
      instructionsUrl: '/documents/forms/form-200i-instructions.pdf'
    },
    {
      id: 'form-200j',
      name: 'Form 200J - Tax Return for Technology Companies',
      description: 'Tax return for technology companies and startups',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 14,
      difficulty: 'High',
      requirements: [
        'Technology company documentation',
        'Technology and innovation statements',
        'Research and development documentation',
        'Technology services documentation'
      ],
      icon: Zap,
      downloadUrl: '/documents/forms/form-200j.pdf',
      instructionsUrl: '/documents/forms/form-200j-instructions.pdf'
    },
    {
      id: 'form-200k',
      name: 'Form 200K - Tax Return for Manufacturing Companies',
      description: 'Tax return for manufacturing companies and industrial businesses',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 16,
      difficulty: 'High',
      requirements: [
        'Manufacturing company documentation',
        'Manufacturing and production statements',
        'Industrial operations documentation',
        'Manufacturing services documentation'
      ],
      icon: Building,
      downloadUrl: '/documents/forms/form-200k.pdf',
      instructionsUrl: '/documents/forms/form-200k-instructions.pdf'
    },
    {
      id: 'form-200l',
      name: 'Form 200L - Tax Return for Service Companies',
      description: 'Tax return for service companies and professional services',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 12,
      difficulty: 'Medium',
      requirements: [
        'Service company documentation',
        'Service and professional statements',
        'Service operations documentation',
        'Professional services documentation'
      ],
      icon: Briefcase,
      downloadUrl: '/documents/forms/form-200l.pdf',
      instructionsUrl: '/documents/forms/form-200l-instructions.pdf'
    },
    {
      id: 'form-200m',
      name: 'Form 200M - Tax Return for Trading Companies',
      description: 'Tax return for trading companies and import/export businesses',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 14,
      difficulty: 'High',
      requirements: [
        'Trading company documentation',
        'Trading and commerce statements',
        'Import/export documentation',
        'International trade documentation'
      ],
      icon: Globe,
      downloadUrl: '/documents/forms/form-200m.pdf',
      instructionsUrl: '/documents/forms/form-200m-instructions.pdf'
    },
    {
      id: 'form-200n',
      name: 'Form 200N - Tax Return for Investment Companies',
      description: 'Tax return for investment companies and fund managers',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 18,
      difficulty: 'Very High',
      requirements: [
        'Investment company documentation',
        'Investment and fund statements',
        'Portfolio management documentation',
        'Investment services documentation'
      ],
      icon: PieChart,
      downloadUrl: '/documents/forms/form-200n.pdf',
      instructionsUrl: '/documents/forms/form-200n-instructions.pdf'
    },
    {
      id: 'form-200o',
      name: 'Form 200O - Tax Return for Consulting Companies',
      description: 'Tax return for consulting companies and advisory services',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 10,
      difficulty: 'Medium',
      requirements: [
        'Consulting company documentation',
        'Consulting and advisory statements',
        'Professional services documentation',
        'Advisory services documentation'
      ],
      icon: Users,
      downloadUrl: '/documents/forms/form-200o.pdf',
      instructionsUrl: '/documents/forms/form-200o-instructions.pdf'
    },
    {
      id: 'form-200p',
      name: 'Form 200P - Tax Return for Healthcare Companies',
      description: 'Tax return for healthcare companies and medical services',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 12,
      difficulty: 'High',
      requirements: [
        'Healthcare company documentation',
        'Healthcare and medical statements',
        'Medical services documentation',
        'Healthcare services documentation'
      ],
      icon: Heart,
      downloadUrl: '/documents/forms/form-200p.pdf',
      instructionsUrl: '/documents/forms/form-200p-instructions.pdf'
    },
    {
      id: 'form-200q',
      name: 'Form 200Q - Tax Return for Education Companies',
      description: 'Tax return for education companies and training services',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 10,
      difficulty: 'Medium',
      requirements: [
        'Education company documentation',
        'Education and training statements',
        'Educational services documentation',
        'Training services documentation'
      ],
      icon: GraduationCap,
      downloadUrl: '/documents/forms/form-200q.pdf',
      instructionsUrl: '/documents/forms/form-200q-instructions.pdf'
    },
    {
      id: 'form-200r',
      name: 'Form 200R - Tax Return for Transportation Companies',
      description: 'Tax return for transportation companies and logistics services',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 12,
      difficulty: 'High',
      requirements: [
        'Transportation company documentation',
        'Transportation and logistics statements',
        'Logistics services documentation',
        'Transportation services documentation'
      ],
      icon: Truck,
      downloadUrl: '/documents/forms/form-200r.pdf',
      instructionsUrl: '/documents/forms/form-200r-instructions.pdf'
    },
    {
      id: 'form-200s',
      name: 'Form 200S - Tax Return for Energy Companies',
      description: 'Tax return for energy companies and utility services',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 14,
      difficulty: 'High',
      requirements: [
        'Energy company documentation',
        'Energy and utility statements',
        'Energy services documentation',
        'Utility services documentation'
      ],
      icon: Zap,
      downloadUrl: '/documents/forms/form-200s.pdf',
      instructionsUrl: '/documents/forms/form-200s-instructions.pdf'
    },
    {
      id: 'form-200t',
      name: 'Form 200T - Tax Return for Tourism Companies',
      description: 'Tax return for tourism companies and hospitality services',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 12,
      difficulty: 'Medium',
      requirements: [
        'Tourism company documentation',
        'Tourism and hospitality statements',
        'Hospitality services documentation',
        'Tourism services documentation'
      ],
      icon: Globe,
      downloadUrl: '/documents/forms/form-200t.pdf',
      instructionsUrl: '/documents/forms/form-200t-instructions.pdf'
    },
    {
      id: 'form-200u',
      name: 'Form 200U - Tax Return for Construction Companies',
      description: 'Tax return for construction companies and building services',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 14,
      difficulty: 'High',
      requirements: [
        'Construction company documentation',
        'Construction and building statements',
        'Building services documentation',
        'Construction services documentation'
      ],
      icon: Building,
      downloadUrl: '/documents/forms/form-200u.pdf',
      instructionsUrl: '/documents/forms/form-200u-instructions.pdf'
    },
    {
      id: 'form-200v',
      name: 'Form 200V - Tax Return for Agriculture Companies',
      description: 'Tax return for agriculture companies and farming services',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 12,
      difficulty: 'Medium',
      requirements: [
        'Agriculture company documentation',
        'Agriculture and farming statements',
        'Farming services documentation',
        'Agriculture services documentation'
      ],
      icon: Home,
      downloadUrl: '/documents/forms/form-200v.pdf',
      instructionsUrl: '/documents/forms/form-200v-instructions.pdf'
    },
    {
      id: 'form-200w',
      name: 'Form 200W - Tax Return for Retail Companies',
      description: 'Tax return for retail companies and sales services',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 10,
      difficulty: 'Medium',
      requirements: [
        'Retail company documentation',
        'Retail and sales statements',
        'Sales services documentation',
        'Retail services documentation'
      ],
      icon: ShoppingCart,
      downloadUrl: '/documents/forms/form-200w.pdf',
      instructionsUrl: '/documents/forms/form-200w-instructions.pdf'
    },
    {
      id: 'form-200x',
      name: 'Form 200X - Tax Return for Wholesale Companies',
      description: 'Tax return for wholesale companies and distribution services',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 12,
      difficulty: 'Medium',
      requirements: [
        'Wholesale company documentation',
        'Wholesale and distribution statements',
        'Distribution services documentation',
        'Wholesale services documentation'
      ],
      icon: Truck,
      downloadUrl: '/documents/forms/form-200x.pdf',
      instructionsUrl: '/documents/forms/form-200x-instructions.pdf'
    },
    {
      id: 'form-200y',
      name: 'Form 200Y - Tax Return for Food Companies',
      description: 'Tax return for food companies and catering services',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 10,
      difficulty: 'Medium',
      requirements: [
        'Food company documentation',
        'Food and catering statements',
        'Catering services documentation',
        'Food services documentation'
      ],
      icon: Utensils,
      downloadUrl: '/documents/forms/form-200y.pdf',
      instructionsUrl: '/documents/forms/form-200y-instructions.pdf'
    },
    {
      id: 'form-200z',
      name: 'Form 200Z - Tax Return for Entertainment Companies',
      description: 'Tax return for entertainment companies and media services',
      category: 'corporate',
      deadline: 'March 31, 2025',
      language: 'German/French/Italian',
      pages: 12,
      difficulty: 'Medium',
      requirements: [
        'Entertainment company documentation',
        'Entertainment and media statements',
        'Media services documentation',
        'Entertainment services documentation'
      ],
      icon: Music,
      downloadUrl: '/documents/forms/form-200z.pdf',
      instructionsUrl: '/documents/forms/form-200z-instructions.pdf'
    }
  ];

  const filteredForms = taxForms.filter(form => {
    if (activeCategory !== 'all' && form.category !== activeCategory) {
      return false;
    }
    if (searchTerm && !form.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Very High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      <Helmet>
        <title>Swiss Tax Forms - Downloadable Forms & Instructions | Taxed GmbH</title>
        <meta name="description" content="Download all Swiss tax forms including individual, corporate, VAT, and payroll tax forms. Complete instructions and filing requirements for 2025." />
        <meta property="og:title" content="Swiss Tax Forms - Downloadable Forms & Instructions | Taxed GmbH" />
        <meta property="og:description" content="Download all Swiss tax forms including individual, corporate, VAT, and payroll tax forms. Complete instructions and filing requirements for 2025." />
        <link rel="canonical" href="https://taxed.ch/tax-forms" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-steel-blue to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Swiss Tax Forms & Instructions
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Download all Swiss tax forms with complete instructions and filing requirements. 
              Get the right forms for your tax situation and ensure compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                <Download className="inline-block mr-2 h-5 w-5" />
                Download All Forms
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-steel-blue transition-colors">
                Get Form Help
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tax forms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-blue focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                      activeCategory === category.id
                        ? 'bg-steel-blue text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Forms Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {filteredForms.map((form, index) => (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                  {/* Form Info */}
                  <div className="flex items-start space-x-4 mb-6 lg:mb-0 lg:w-1/3">
                    <div className="bg-steel-blue/10 p-3 rounded-xl">
                      <form.icon className="h-6 w-6 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{form.name}</h3>
                      <p className="text-gray-600 mb-3">{form.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                          Deadline: {form.deadline}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(form.difficulty)}`}>
                          {form.difficulty}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {form.pages} pages
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="lg:w-1/3">
                    <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                    <ul className="space-y-2">
                      {form.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="lg:w-1/3">
                    <div className="space-y-3">
                      <button className="w-full bg-steel-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-steel-blue/90 transition-colors flex items-center justify-center">
                        <Download className="h-4 w-4 mr-2" />
                        Download Form
                      </button>
                      <button className="w-full border-2 border-steel-blue text-steel-blue px-6 py-3 rounded-lg font-semibold hover:bg-steel-blue hover:text-white transition-colors flex items-center justify-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Instructions
                      </button>
                      <button className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                        <Info className="h-4 w-4 mr-2" />
                        Get Help
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Quick Access to Popular Forms
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get instant access to the most commonly used Swiss tax forms.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Form 204 - Individual Tax Return', icon: Users, color: 'bg-blue-500' },
              { name: 'Form 200 - Corporate Tax Return', icon: Building, color: 'bg-green-500' },
              { name: 'Form 204A - Simplified Tax Return', icon: FileText, color: 'bg-yellow-500' },
              { name: 'Form 204B - Non-Resident Tax Return', icon: Globe, color: 'bg-purple-500' }
            ].map((form, index) => {
              const Icon = form.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <div className={`${form.color} p-4 rounded-xl mb-4 w-fit`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{form.name}</h3>
                  <button className="w-full bg-steel-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-steel-blue/90 transition-colors">
                    Download Now
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-steel-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Need Help with Your Tax Forms?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Our tax experts can help you complete your tax forms correctly and ensure compliance. 
              Get professional assistance for your specific tax situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                Get Form Assistance
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-steel-blue transition-colors">
                Schedule Tax Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TaxFormsPage;
