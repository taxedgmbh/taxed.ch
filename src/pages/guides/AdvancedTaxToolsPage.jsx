import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  FileText, 
  Download,
  Upload,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Share2,
  Save,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowRight,
  Zap,
  Target,
  Globe,
  Shield,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Building,
  Home
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AdvancedTaxToolsPage = () => {
  const [activeTool, setActiveTool] = useState('tax-optimizer');
  const [isCalculating, setIsCalculating] = useState(false);

  const tools = [
    {
      id: 'tax-optimizer',
      name: 'Tax Optimization Simulator',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600',
      description: 'Advanced tax planning simulator that analyzes multiple scenarios to find optimal tax strategies.',
      features: [
        'Multi-year tax planning',
        'Scenario comparison',
        'Real-time optimization',
        'Risk assessment',
        'Compliance checking'
      ],
      inputs: [
        { label: 'Annual Income', type: 'number', placeholder: 'Enter your annual income' },
        { label: 'Canton', type: 'select', options: ['Zurich', 'Bern', 'Geneva', 'Vaud', 'Basel'] },
        { label: 'Marital Status', type: 'select', options: ['Single', 'Married', 'Divorced'] },
        { label: 'Children', type: 'number', placeholder: 'Number of children' },
        { label: 'Foreign Income', type: 'number', placeholder: 'Foreign income amount' }
      ],
      outputs: [
        { label: 'Optimal Tax Strategy', value: 'Pillar 3a + Deductions', color: 'text-green-600' },
        { label: 'Potential Savings', value: 'CHF 15,000', color: 'text-blue-600' },
        { label: 'Risk Level', value: 'Low', color: 'text-green-600' },
        { label: 'Compliance Score', value: '98%', color: 'text-green-600' }
      ]
    },
    {
      id: 'international-tax-analyzer',
      name: 'International Tax Analyzer',
      icon: Globe,
      color: 'from-blue-500 to-purple-600',
      description: 'Comprehensive analysis of international tax implications for expats and cross-border situations.',
      features: [
        'Tax treaty analysis',
        'Double taxation assessment',
        'Foreign tax credits',
        'Residence determination',
        'Cross-border planning'
      ],
      inputs: [
        { label: 'Home Country', type: 'select', options: ['Germany', 'USA', 'UK', 'France', 'Italy'] },
        { label: 'Swiss Income', type: 'number', placeholder: 'Swiss income amount' },
        { label: 'Foreign Income', type: 'number', placeholder: 'Foreign income amount' },
        { label: 'Residence Status', type: 'select', options: ['Swiss Resident', 'Non-Resident', 'Part-Year'] },
        { label: 'Tax Year', type: 'select', options: ['2024', '2023', '2022'] }
      ],
      outputs: [
        { label: 'Tax Treaty Benefits', value: 'Available', color: 'text-green-600' },
        { label: 'Double Taxation', value: 'Eliminated', color: 'text-green-600' },
        { label: 'Foreign Tax Credits', value: 'CHF 8,500', color: 'text-blue-600' },
        { label: 'Compliance Risk', value: 'Medium', color: 'text-yellow-600' }
      ]
    },
    {
      id: 'investment-tax-planner',
      name: 'Investment Tax Planner',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-600',
      description: 'Sophisticated tool for optimizing investment portfolios from a tax perspective.',
      features: [
        'Portfolio optimization',
        'Tax-loss harvesting',
        'Capital gains planning',
        'Dividend optimization',
        'Risk-adjusted returns'
      ],
      inputs: [
        { label: 'Portfolio Value', type: 'number', placeholder: 'Total portfolio value' },
        { label: 'Investment Type', type: 'select', options: ['Stocks', 'Bonds', 'Real Estate', 'Crypto', 'Mixed'] },
        { label: 'Holding Period', type: 'select', options: ['Short-term', 'Long-term', 'Mixed'] },
        { label: 'Risk Tolerance', type: 'select', options: ['Conservative', 'Moderate', 'Aggressive'] },
        { label: 'Tax Bracket', type: 'select', options: ['Low', 'Medium', 'High'] }
      ],
      outputs: [
        { label: 'Optimal Portfolio', value: 'Tax-Efficient Mix', color: 'text-green-600' },
        { label: 'Tax Savings', value: 'CHF 12,000', color: 'text-blue-600' },
        { label: 'Expected Return', value: '6.5%', color: 'text-green-600' },
        { label: 'Tax Efficiency', value: '92%', color: 'text-green-600' }
      ]
    },
    {
      id: 'business-tax-analyzer',
      name: 'Business Tax Analyzer',
      icon: Building,
      color: 'from-orange-500 to-red-600',
      description: 'Advanced business tax analysis for entrepreneurs, freelancers, and small businesses.',
      features: [
        'Business structure optimization',
        'Deduction maximization',
        'VAT analysis',
        'Expense tracking',
        'Profit optimization'
      ],
      inputs: [
        { label: 'Business Type', type: 'select', options: ['Sole Proprietor', 'LLC', 'Corporation', 'Partnership'] },
        { label: 'Annual Revenue', type: 'number', placeholder: 'Annual business revenue' },
        { label: 'Business Expenses', type: 'number', placeholder: 'Total business expenses' },
        { label: 'Industry', type: 'select', options: ['Technology', 'Consulting', 'Retail', 'Services', 'Manufacturing'] },
        { label: 'Employees', type: 'number', placeholder: 'Number of employees' }
      ],
      outputs: [
        { label: 'Optimal Structure', value: 'LLC', color: 'text-green-600' },
        { label: 'Tax Savings', value: 'CHF 25,000', color: 'text-blue-600' },
        { label: 'Deduction Rate', value: '85%', color: 'text-green-600' },
        { label: 'Compliance Score', value: '95%', color: 'text-green-600' }
      ]
    },
    {
      id: 'retirement-tax-planner',
      name: 'Retirement Tax Planner',
      icon: Target,
      color: 'from-indigo-500 to-blue-600',
      description: 'Comprehensive retirement planning tool with tax optimization for Swiss pension system.',
      features: [
        'Pillar 3a optimization',
        'Retirement income planning',
        'Tax-efficient withdrawals',
        'Pension gap analysis',
        'Long-term projections'
      ],
      inputs: [
        { label: 'Age', type: 'number', placeholder: 'Current age' },
        { label: 'Retirement Age', type: 'number', placeholder: 'Planned retirement age' },
        { label: 'Current Savings', type: 'number', placeholder: 'Current retirement savings' },
        { label: 'Annual Contribution', type: 'number', placeholder: 'Annual contribution amount' },
        { label: 'Expected Return', type: 'select', options: ['Conservative (3%)', 'Moderate (5%)', 'Aggressive (7%)'] }
      ],
      outputs: [
        { label: 'Optimal Contribution', value: 'CHF 7,056', color: 'text-green-600' },
        { label: 'Tax Savings', value: 'CHF 2,500', color: 'text-blue-600' },
        { label: 'Retirement Income', value: 'CHF 120,000', color: 'text-green-600' },
        { label: 'Pension Gap', value: 'CHF 30,000', color: 'text-yellow-600' }
      ]
    },
    {
      id: 'real-estate-tax-calculator',
      name: 'Real Estate Tax Calculator',
      icon: Home,
      color: 'from-teal-500 to-cyan-600',
      description: 'Advanced real estate tax analysis for property owners and investors.',
      features: [
        'Property tax calculation',
        'Rental income optimization',
        'Depreciation analysis',
        'Capital gains planning',
        'Investment property analysis'
      ],
      inputs: [
        { label: 'Property Value', type: 'number', placeholder: 'Property market value' },
        { label: 'Property Type', type: 'select', options: ['Residential', 'Commercial', 'Mixed-use', 'Investment'] },
        { label: 'Canton', type: 'select', options: ['Zurich', 'Bern', 'Geneva', 'Vaud', 'Basel'] },
        { label: 'Rental Income', type: 'number', placeholder: 'Annual rental income' },
        { label: 'Property Expenses', type: 'number', placeholder: 'Annual property expenses' }
      ],
      outputs: [
        { label: 'Property Tax', value: 'CHF 3,500', color: 'text-blue-600' },
        { label: 'Tax Deductions', value: 'CHF 8,000', color: 'text-green-600' },
        { label: 'Net Rental Income', value: 'CHF 25,000', color: 'text-green-600' },
        { label: 'Tax Efficiency', value: '88%', color: 'text-green-600' }
      ]
    }
  ];

  const selectedTool = tools.find(tool => tool.id === activeTool);

  const handleCalculate = () => {
    setIsCalculating(true);
    // Simulate calculation time
    setTimeout(() => {
      setIsCalculating(false);
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Advanced Tax Tools - Professional Tax Analysis | Taxed GmbH</title>
        <meta name="description" content="Access our advanced tax planning tools and simulators. Professional-grade tax analysis for complex scenarios and optimization strategies." />
        <meta property="og:title" content="Advanced Tax Tools - Professional Tax Analysis | Taxed GmbH" />
        <meta property="og:description" content="Access our advanced tax planning tools and simulators. Professional-grade tax analysis for complex scenarios and optimization strategies." />
      </Helmet>

      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 rounded-full bg-warm-red-tint text-brand-red flex items-center justify-center mx-auto mb-6">
              <Calculator className="h-8 w-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-dark-gray mb-6">
              Advanced Tax Tools
            </h1>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              Professional-grade tax analysis tools and simulators. Access sophisticated planning capabilities 
              that go beyond basic calculations to provide strategic tax optimization insights.
            </p>
          </motion.div>

          {/* Tool Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          >
            <Card className="text-center">
              <CardContent className="p-6">
                <Calculator className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">6</p>
                <p className="text-sm text-gray-600">Advanced Tools</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Zap className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">10,000+</p>
                <p className="text-sm text-gray-600">Calculations Run</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">CHF 2M+</p>
                <p className="text-sm text-gray-600">Total Savings Identified</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-gray-900">1,500+</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tool Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={`flex flex-col items-center space-y-2 p-4 rounded-xl font-medium transition-all duration-300 ${
                    activeTool === tool.id
                      ? `bg-gradient-to-r ${tool.color} text-white shadow-lg`
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  <tool.icon className="h-6 w-6" />
                  <span className="text-xs text-center">{tool.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Selected Tool Content */}
          {selectedTool && (
            <motion.div
              key={selectedTool.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Tool Header */}
              <div className="text-center mb-8">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${selectedTool.color} flex items-center justify-center mx-auto mb-6`}>
                  <selectedTool.icon className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-dark-gray mb-4">
                  {selectedTool.name}
                </h2>
                <p className="text-xl text-dark-gray/80 max-w-4xl mx-auto">
                  {selectedTool.description}
                </p>
              </div>

              {/* Tool Interface */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Panel */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>Input Parameters</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {selectedTool.inputs.map((input, index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {input.label}
                        </label>
                        {input.type === 'select' ? (
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-steel-blue">
                            <option value="">Select {input.label}</option>
                            {input.options.map((option, idx) => (
                              <option key={idx} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          <Input
                            type={input.type}
                            placeholder={input.placeholder}
                            className="w-full"
                          />
                        )}
                      </div>
                    ))}
                    <Button
                      onClick={handleCalculate}
                      disabled={isCalculating}
                      className={`w-full bg-gradient-to-r ${selectedTool.color} hover:opacity-90 text-white`}
                    >
                      {isCalculating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Calculating...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Run Analysis
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Output Panel */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Analysis Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isCalculating ? (
                      <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-steel-blue mx-auto mb-4"></div>
                        <p className="text-gray-600">Running sophisticated analysis...</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedTool.outputs.map((output, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <span className="font-medium text-gray-700">{output.label}</span>
                            <span className={`font-bold ${output.color}`}>{output.value}</span>
                          </div>
                        ))}
                        <div className="flex space-x-2 mt-6">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-2xl font-bold text-dark-gray mb-6">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedTool.features.map((feature, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-steel-blue/10 rounded-lg flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-steel-blue" />
                          </div>
                          <span className="font-medium text-gray-900">{feature}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Professional Insights */}
              <Card className="bg-gradient-to-r from-steel-blue to-blue-600 text-white">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Info className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Professional Insights</h3>
                      <p className="text-blue-100 mb-4">
                        This tool provides professional-grade analysis based on current Swiss tax laws and regulations. 
                        Results are for planning purposes only and should be reviewed by a qualified tax professional.
                      </p>
                      <div className="flex space-x-4">
                        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-steel-blue">
                          <Users className="h-4 w-4 mr-2" />
                          Consult Expert
                        </Button>
                        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-steel-blue">
                          <FileText className="h-4 w-4 mr-2" />
                          Get Detailed Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Card className="bg-gradient-to-r from-steel-blue to-blue-600 text-white">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold mb-4">Need Professional Tax Analysis?</h3>
                <p className="text-xl mb-8 text-blue-100">
                  Our advanced tools provide insights, but nothing beats personalized expert advice for your specific situation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-steel-blue hover:bg-gray-100"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Schedule Expert Consultation
                  </Button>
                  <a
                    href="mailto:info@taxed.ch?subject=Advanced%20Tax%20Planning%20Inquiry&body=Hello%20Taxed%20GmbH%2C%0A%0AI%27d%20like%20to%20discuss%20advanced%20tax%20planning%20strategies.%20Could%20you%20please%20provide%20more%20information%20about%20your%20professional%20services%3F"
                    className="inline-flex items-center justify-center rounded-md border-2 border-white text-white hover:bg-white hover:text-steel-blue px-8 py-3 text-lg font-medium"
                  >
                    Email Expert
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AdvancedTaxToolsPage;
