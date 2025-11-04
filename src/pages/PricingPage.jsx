import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Shield, 
  Clock, 
  Users, 
  Award, 
  Zap,
  TrendingUp,
  Calculator,
  FileText,
  MessageCircle,
  Phone,
  Crown,
  Sparkles,
  Target,
  Lock,
  DollarSign,
  Percent,
  Eye,
  AlertCircle,
  Info,
  X,
  Plus,
  Minus,
  Check,
  XCircle,
  Building2,
  Globe,
  CreditCard,
  Receipt
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PricingPage = () => {
  const [selectedComplexity, setSelectedComplexity] = useState('standard');
  const [showCalculator, setShowCalculator] = useState(false);
  const [customFeatures, setCustomFeatures] = useState({
    businessIncome: false,
    foreignIncome: false,
    investments: false,
    realEstate: false,
    crypto: false,
    auditSupport: false,
    multipleStates: false,
    estatePlanning: false
  });

  const packages = [
    {
      id: 'basic',
      name: 'Basic Tax Return',
      subtitle: 'Perfect for simple tax situations',
      price: 'CHF 249',
      originalPrice: 'CHF 349',
      savings: 'CHF 100',
      popular: false,
      features: [
        'Individual tax return preparation',
        'Standard deductions included',
        'Electronic filing with tax authorities',
        'Final tax return copy',
        'Email support (48h response)',
        'Basic tax optimization'
      ],
      limitations: [
        'Single income source only',
        'No business income',
        'No foreign income',
        'Standard deductions only'
      ],
      color: 'border-gray-300',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
      icon: FileText,
      complexity: 'Simple',
      timeToComplete: '2-3 days',
      bestFor: 'Employees with single income source'
    },
    {
      id: 'standard',
      name: 'Standard Tax Return',
      subtitle: 'Most popular for expats and professionals',
      price: 'CHF 449',
      originalPrice: 'CHF 649',
      savings: 'CHF 200',
      popular: true,
      features: [
        'Individual tax return preparation',
        'Multiple income sources',
        'Foreign income handling',
        'Advanced deductions & credits',
        'Tax optimization strategies',
        'Electronic filing with tax authorities',
        'Final tax return copy',
        'Priority email support (24h response)',
        'Phone consultation (30 min)',
        'Post-filing support'
      ],
      limitations: [
        'No business tax returns',
        'No complex investment portfolios',
        'Standard audit support'
      ],
      color: 'border-steel-blue',
      buttonColor: 'bg-steel-blue hover:bg-steel-blue/90',
      icon: Calculator,
      complexity: 'Medium',
      timeToComplete: '3-5 days',
      bestFor: 'Expats, professionals, multiple income sources'
    },
    {
      id: 'premium',
      name: 'Premium Tax Return',
      subtitle: 'Complete solution for complex situations',
      price: 'CHF 799',
      originalPrice: 'CHF 1,199',
      savings: 'CHF 400',
      popular: false,
      features: [
        'Individual tax return preparation',
        'Business tax returns (if applicable)',
        'Multiple income sources',
        'Foreign income & tax treaties',
        'Complex investment portfolios',
        'Advanced tax optimization',
        'Electronic filing with tax authorities',
        'Final tax return copy',
        'Priority support (same-day response)',
        'Phone consultation (60 min)',
        'Video consultation available',
        'Audit support included',
        'Tax planning for next year',
        'Dedicated tax expert assigned'
      ],
      limitations: [],
      color: 'border-yellow-500',
      buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
      icon: Crown,
      complexity: 'Complex',
      timeToComplete: '5-7 days',
      bestFor: 'Business owners, complex investments, audit support needed'
    }
  ];

  const big4Comparison = [
    {
      service: 'Basic Tax Return',
      taxedPrice: 'CHF 249',
      big4Price: 'CHF 800-1,200',
      savings: 'CHF 500-900',
      savingsPercent: '62-75%',
      features: ['Junior staff', 'Standard processing', 'Basic support']
    },
    {
      service: 'Standard Tax Return',
      taxedPrice: 'CHF 449',
      big4Price: 'CHF 1,500-2,500',
      savings: 'CHF 1,000-2,000',
      savingsPercent: '67-80%',
      features: ['Senior staff', 'Priority processing', 'Phone support']
    },
    {
      service: 'Premium Tax Return',
      taxedPrice: 'CHF 799',
      big4Price: 'CHF 2,500-4,000',
      savings: 'CHF 1,700-3,200',
      savingsPercent: '68-80%',
      features: ['Partner level', 'Express processing', 'Dedicated support']
    }
  ];

  const competitors = [
    {
      name: 'Big 4 Firms',
      logo: '🏢',
      basicPrice: 'CHF 800-1,200',
      standardPrice: 'CHF 1,500-2,500',
      premiumPrice: 'CHF 2,500-4,000',
      pros: ['Brand recognition', 'Global presence'],
      cons: ['High costs', 'Junior staff', 'Slow response', 'Bureaucracy']
    },
    {
      name: 'Local Tax Advisors',
      logo: '🏪',
      basicPrice: 'CHF 400-600',
      standardPrice: 'CHF 700-1,200',
      premiumPrice: 'CHF 1,200-2,000',
      pros: ['Local knowledge', 'Personal service'],
      cons: ['Limited expertise', 'No guarantees', 'Inconsistent quality']
    },
    {
      name: 'Online Tax Software',
      logo: '💻',
      basicPrice: 'CHF 50-150',
      standardPrice: 'CHF 100-300',
      premiumPrice: 'CHF 200-500',
      pros: ['Low cost', 'Self-service'],
      cons: ['No expert help', 'High error risk', 'No support', 'Complex situations']
    }
  ];

  const pricingGuarantees = [
    {
      icon: Shield,
      title: '100% Price Transparency',
      description: 'What you see is what you pay. No hidden fees, no surprise charges, no extra costs.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Lock,
      title: 'Price Lock Guarantee',
      description: 'Your quoted price is locked in. No price increases during the process.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Award,
      title: 'Best Price Guarantee',
      description: 'Find a lower price for the same service? We\'ll match it and give you 10% off.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Clock,
      title: 'Fast Delivery Promise',
      description: 'Complete your tax return on time or get 50% refund. No excuses.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: CheckCircle,
      title: 'Accuracy Guarantee',
      description: 'If we make an error, we fix it for free and cover any penalties.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Direct access to certified Swiss tax professionals with 15+ years experience.',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const calculateCustomPrice = () => {
    let basePrice = 249; // Basic package base
    
    if (selectedComplexity === 'standard') basePrice = 449;
    if (selectedComplexity === 'premium') basePrice = 799;
    
    let additionalCost = 0;
    if (customFeatures.businessIncome) additionalCost += 200;
    if (customFeatures.foreignIncome) additionalCost += 150;
    if (customFeatures.investments) additionalCost += 100;
    if (customFeatures.realEstate) additionalCost += 150;
    if (customFeatures.crypto) additionalCost += 200;
    if (customFeatures.auditSupport) additionalCost += 300;
    if (customFeatures.multipleStates) additionalCost += 100;
    if (customFeatures.estatePlanning) additionalCost += 250;
    
    return basePrice + additionalCost;
  };

  const toggleFeature = (feature) => {
    setCustomFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  return (
    <>
      <Helmet>
        <title>100% Transparent Pricing | Taxed GmbH - No Hidden Costs, Clear Swiss Tax Rates</title>
        <meta name="description" content="Complete price transparency for Swiss tax returns. See exactly what you pay with our interactive calculator. Save 60-80% vs Big 4. No hidden fees, no surprises. Free consultation included." />
        <meta property="og:title" content="100% Transparent Pricing | Taxed GmbH - No Hidden Costs, Clear Swiss Tax Rates" />
        <meta property="og:description" content="Complete price transparency for Swiss tax returns. See exactly what you pay with our interactive calculator. Save 60-80% vs Big 4. No hidden fees, no surprises. Free consultation included." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-green-600 via-green-700 to-green-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Eye className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-sm font-semibold">100% Price Transparency - No Hidden Costs Ever!</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Crystal Clear
              <br />
              <span className="text-yellow-400">Pricing</span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-12 text-green-100 max-w-4xl mx-auto leading-relaxed">
              See exactly what you pay. <strong>No hidden fees, no surprises, no extra charges.</strong> 
              Compare our transparent rates to Big 4 and save up to <strong>80%</strong>.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">0</div>
                <div className="text-sm text-green-200">Hidden Fees</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">80%</div>
                <div className="text-sm text-green-200">Less Than Big 4</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">100%</div>
                <div className="text-sm text-green-200">Price Transparency</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">FREE</div>
                <div className="text-sm text-green-200">Consultation</div>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100 text-xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-200 font-bold"
                onClick={() => setShowCalculator(true)}
              >
                <Calculator className="mr-3 h-6 w-6" />
                Calculate My Price
              </Button>
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-200 font-bold"
                onClick={() => {
                  const subject = encodeURIComponent("Inquiry");
    const body = encodeURIComponent("Hello Taxed GmbH,\n\nI have a question about your services. Could you please help me?");
                  const message = encodeURIComponent("💰 I want to see your transparent pricing! Can you give me a free quote?");
                  window.open(emailUrl, '_blank');
                }}
              >
                <MessageCircle className="mr-3 h-6 w-6" />
                Get Free Quote
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Pricing Calculator */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-dark-gray">Custom Price Calculator</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCalculator(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tax Complexity Level
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {['basic', 'standard', 'premium'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedComplexity(level)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedComplexity === level
                          ? 'border-steel-blue bg-blue-50 text-steel-blue'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold capitalize">{level}</div>
                      <div className="text-sm text-gray-600">
                        {packages.find(p => p.id === level)?.price}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Additional Features (Optional)
                </label>
                <div className="space-y-3">
                  {[
                    { key: 'businessIncome', label: 'Business Income', price: '+CHF 200' },
                    { key: 'foreignIncome', label: 'Foreign Income', price: '+CHF 150' },
                    { key: 'investments', label: 'Investment Portfolio', price: '+CHF 100' },
                    { key: 'realEstate', label: 'Real Estate Income', price: '+CHF 150' },
                    { key: 'crypto', label: 'Cryptocurrency', price: '+CHF 200' },
                    { key: 'auditSupport', label: 'Audit Support', price: '+CHF 300' },
                    { key: 'multipleStates', label: 'Multiple Cantons', price: '+CHF 100' },
                    { key: 'estatePlanning', label: 'Estate Planning', price: '+CHF 250' }
                  ].map((feature) => (
                    <button
                      key={feature.key}
                      onClick={() => toggleFeature(feature.key)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                        customFeatures[feature.key]
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        {customFeatures[feature.key] ? (
                          <Check className="h-5 w-5 text-green-600 mr-3" />
                        ) : (
                          <div className="h-5 w-5 border-2 border-gray-300 rounded mr-3" />
                        )}
                        <span className="font-medium">{feature.label}</span>
                      </div>
                      <span className="text-sm font-semibold">{feature.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Your Custom Price</div>
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    CHF {calculateCustomPrice()}
                  </div>
                  <div className="text-sm text-gray-600">
                    All-inclusive • No hidden fees • Free consultation included
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  className="flex-1 bg-steel-blue hover:bg-steel-blue/90 text-white"
                  onClick={() => {
                    const subject = encodeURIComponent("Inquiry");
    const body = encodeURIComponent("Hello Taxed GmbH,\n\nI have a question about your services. Could you please help me?");
                    const message = encodeURIComponent(`💰 I calculated my custom price: CHF ${calculateCustomPrice()}. Can you help me get started?`);
                    window.open(emailUrl, '_blank');
                    setShowCalculator(false);
                  }}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Get This Price
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowCalculator(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Interactive Price Comparison Chart */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-dark-gray mb-6">
              Interactive Price Comparison Chart
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See the dramatic savings with our transparent pricing compared to Big 4 firms. Hover over the bars to see detailed savings.
            </p>
          </motion.div>

          {/* Chart Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 shadow-xl"
          >
            {/* Chart Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="font-semibold text-dark-gray">Taxed GmbH</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="font-semibold text-dark-gray">Big 4 Firms</span>
              </div>
            </div>

            {/* Chart Bars */}
            <div className="space-y-8">
              {big4Comparison.map((comparison, index) => {
                const taxedPrice = parseInt(comparison.taxedPrice.replace('CHF ', '').replace(',', ''));
                const big4MinPrice = parseInt(comparison.big4Price.split('-')[0].replace('CHF ', '').replace(',', ''));
                const big4MaxPrice = parseInt(comparison.big4Price.split('-')[1].replace('CHF ', '').replace(',', ''));
                const big4AvgPrice = (big4MinPrice + big4MaxPrice) / 2;
                const maxPrice = Math.max(taxedPrice, big4MaxPrice);
                const taxedWidth = (taxedPrice / maxPrice) * 100;
                const big4Width = (big4AvgPrice / maxPrice) * 100;

                return (
                  <motion.div
                    key={comparison.service}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    <h3 className="text-lg font-semibold text-dark-gray mb-4">{comparison.service}</h3>
                    
                    <div className="relative h-20 bg-white rounded-xl shadow-inner overflow-hidden border-2 border-gray-200">
                      {/* Taxed GmbH Bar */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${taxedWidth}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-end pr-4 group-hover:from-green-500 group-hover:to-green-700 transition-all duration-300"
                      >
                        <span className="text-white font-bold text-sm drop-shadow-lg">{comparison.taxedPrice}</span>
                      </motion.div>
                      
                      {/* Big 4 Bar */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${big4Width}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.7 }}
                        viewport={{ once: true }}
                        className="absolute right-0 top-0 h-full bg-gradient-to-l from-red-400 to-red-600 flex items-center justify-start pl-4 group-hover:from-red-500 group-hover:to-red-700 transition-all duration-300"
                      >
                        <span className="text-white font-bold text-sm drop-shadow-lg">{comparison.big4Price}</span>
                      </motion.div>
                    </div>
                    
                    {/* Savings Display */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <span className="text-green-600 font-semibold">You Save: {comparison.savings}</span>
                      </div>
                      <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {comparison.savingsPercent} Less
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Chart Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border-2 border-green-200"
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-dark-gray mb-2">Average Savings with Taxed GmbH</h3>
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">CHF 1,400</div>
                    <div className="text-sm text-gray-600">Average Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">70%</div>
                    <div className="text-sm text-gray-600">Less Than Big 4</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">24h</div>
                    <div className="text-sm text-gray-600">Response Time</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-dark-gray mb-6">
              How We Compare to the Competition
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our transparent pricing and expert service stacks up against other options
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {competitors.map((competitor, index) => (
              <motion.div
                key={competitor.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{competitor.logo}</div>
                  <h3 className="text-xl font-bold text-dark-gray">{competitor.name}</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Basic:</span>
                    <span className="text-sm font-semibold">{competitor.basicPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Standard:</span>
                    <span className="text-sm font-semibold">{competitor.standardPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Premium:</span>
                    <span className="text-sm font-semibold">{competitor.premiumPrice}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-green-600 mb-2">Pros:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {competitor.pros.map((pro, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-red-600 mb-2">Cons:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {competitor.cons.map((con, idx) => (
                        <li key={idx} className="flex items-center">
                          <XCircle className="h-3 w-3 text-red-500 mr-2" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-steel-blue to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                🏆 Why Taxed GmbH is the Best Choice
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-yellow-400">60-80%</div>
                  <div className="text-sm">Less than Big 4</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-400">Expert</div>
                  <div className="text-sm">Senior professionals</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-400">24h</div>
                  <div className="text-sm">Response time</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Package Comparison */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-dark-gray mb-6">
              Choose Your Perfect Package
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent pricing with no hidden costs. All packages include expert preparation and filing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative ${pkg.popular ? 'lg:scale-105' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      <Star className="w-4 h-4 inline mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <Card className={`h-full border-2 ${pkg.color} shadow-2xl hover:shadow-3xl transition-all duration-300 ${pkg.popular ? 'ring-2 ring-yellow-400' : ''}`}>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${pkg.id === 'basic' ? 'from-gray-400 to-gray-600' : pkg.id === 'standard' ? 'from-steel-blue to-blue-600' : 'from-yellow-400 to-orange-500'} flex items-center justify-center mx-auto mb-4`}>
                      <pkg.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-dark-gray">{pkg.name}</CardTitle>
                    <CardDescription className="text-gray-600">{pkg.subtitle}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Pricing */}
                    <div className="text-center">
                      <div className="flex items-baseline justify-center gap-2 mb-2">
                        <span className="text-4xl font-bold text-dark-gray">{pkg.price}</span>
                        <span className="text-lg text-gray-500 line-through">{pkg.originalPrice}</span>
                      </div>
                      <div className="inline-flex items-center bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Save {pkg.savings}
                      </div>
                    </div>

                    {/* Package Details */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Complexity:</span>
                        <span className="text-sm font-semibold">{pkg.complexity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Time to Complete:</span>
                        <span className="text-sm font-semibold">{pkg.timeToComplete}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Best For:</span>
                        <span className="text-sm font-semibold text-right">{pkg.bestFor}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-dark-gray mb-3">What's Included:</h4>
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Limitations */}
                    {pkg.limitations.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-600 mb-2 text-sm">Not Included:</h4>
                        {pkg.limitations.map((limitation, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <XCircle className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-gray-500">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA Button */}
                    <div className="pt-4">
                      <Button 
                        className={`w-full ${pkg.buttonColor} text-white text-lg py-4 font-bold`}
                        size="lg"
                        onClick={() => {
                          const subject = encodeURIComponent("Inquiry");
    const body = encodeURIComponent("Hello Taxed GmbH,\n\nI have a question about your services. Could you please help me?");
                          const message = encodeURIComponent(`💰 I'm interested in the ${pkg.name} package (${pkg.price}). Can you help me get started?`);
                          window.open(emailUrl, '_blank');
                        }}
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Get Started Now
                      </Button>
                      
                      <div className="text-center mt-3">
                        <Link 
                          to="/contact" 
                          className="text-sm text-steel-blue hover:text-steel-blue/80 font-medium"
                        >
                          Need help choosing? Contact us
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Guarantees */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-dark-gray mb-4">
              Our Pricing Guarantees
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We guarantee complete price transparency and fair pricing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingGuarantees.map((guarantee, index) => (
              <motion.div
                key={guarantee.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-green-500/50 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${guarantee.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <guarantee.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-dark-gray mb-2">{guarantee.title}</h4>
                <p className="text-sm text-gray-600">{guarantee.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-dark-gray mb-4">
              What's Included in Every Package
            </h2>
            <p className="text-lg text-dark-gray">
              All our packages include these essential services at no extra cost
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              'Secure Document Upload', 'Expert Review & Preparation', 'Complete Filing with Tax Authorities',
              'Final Tax Return Copy', 'Post-Filing Support', 'No Hidden Fees Guaranteed'
            ].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500"
              >
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-dark-gray">{feature}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-dark-gray mb-4">
              Additional Tax Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our additional tax services and tools
            </p>
          </motion.div>
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-dark-gray mb-4">Additional Services Coming Soon</h3>
            <p className="text-gray-600">We're working on expanding our service offerings. Contact us for custom tax solutions.</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-steel-blue to-blue-800 rounded-3xl overflow-hidden mx-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <DollarSign className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-sm font-semibold">100% Transparent Pricing • No Hidden Costs</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to See Your Exact Price?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Get a free, no-obligation quote. <strong>No hidden fees, no surprises, no pressure.</strong> 
              Just honest, transparent pricing for your Swiss tax return.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-steel-blue hover:bg-gray-100 text-lg px-8 py-4 font-bold"
                onClick={() => setShowCalculator(true)}
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate My Price
              </Button>
            <Button 
              size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-steel-blue text-lg px-8 py-4 font-bold"
                onClick={() => {
                  const subject = encodeURIComponent("Inquiry");
    const body = encodeURIComponent("Hello Taxed GmbH,\n\nI have a question about your services. Could you please help me?");
                  const message = encodeURIComponent("💰 I want to see your transparent pricing! Can you give me a free quote?");
                  window.open(emailUrl, '_blank');
                }}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Get Free Quote
            </Button>
            </div>

            <div className="mt-8 text-sm text-blue-200">
              <p>✨ Free consultation included • 🔒 Secure & confidential • ⚡ Same-day response</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PricingPage;

