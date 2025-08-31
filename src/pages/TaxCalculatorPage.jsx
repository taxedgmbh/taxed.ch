import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Home, PiggyBank, Shield, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const TaxCalculatorPage = () => {
  const [activeTab, setActiveTab] = useState('income-tax');

  return (
    <>
      <Helmet>
        <title>Swiss Tax Calculators | Taxed GmbH - Calculate Your Swiss Taxes</title>
        <meta name="description" content="Free Swiss tax calculators for expats. Calculate income tax, wealth tax, Pillar 3a optimization, and more. Get accurate estimates for your Swiss tax obligations." />
        <meta property="og:title" content="Swiss Tax Calculators | Taxed GmbH" />
        <meta property="og:description" content="Free Swiss tax calculators for expats. Calculate income tax, wealth tax, Pillar 3a optimization, and more." />
      </Helmet>

      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-steel-blue rounded-full flex items-center justify-center">
                <Calculator className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-dark-gray mb-4 tracking-tight">
              Swiss Tax Calculators
            </h1>
            <p className="text-xl text-dark-gray/80 max-w-3xl mx-auto">
              Calculate your Swiss tax obligations with our free, accurate calculators. 
              Designed specifically for expats living in Switzerland.
            </p>
          </motion.div>

          {/* Calculator Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-white shadow-lg rounded-xl p-2">
              <TabsTrigger value="income-tax" className="flex items-center space-x-2 text-sm font-medium">
                <DollarSign className="w-4 h-4" />
                <span className="hidden sm:inline">Income Tax</span>
              </TabsTrigger>
              <TabsTrigger value="wealth-tax" className="flex items-center space-x-2 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Wealth Tax</span>
              </TabsTrigger>
              <TabsTrigger value="pillar-3a" className="flex items-center space-x-2 text-sm font-medium">
                <PiggyBank className="w-4 h-4" />
                <span className="hidden sm:inline">Pillar 3a</span>
              </TabsTrigger>
              <TabsTrigger value="real-estate" className="flex items-center space-x-2 text-sm font-medium">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Real Estate</span>
              </TabsTrigger>
            </TabsList>

            {/* Income Tax Calculator */}
            <TabsContent value="income-tax">
              <IncomeTaxCalculator />
            </TabsContent>

            {/* Wealth Tax Calculator */}
            <TabsContent value="wealth-tax">
              <WealthTaxCalculator />
            </TabsContent>

            {/* Pillar 3a Calculator */}
            <TabsContent value="pillar-3a">
              <Pillar3aCalculator />
            </TabsContent>

            {/* Real Estate Tax Calculator */}
            <TabsContent value="real-estate">
              <RealEstateTaxCalculator />
            </TabsContent>
          </Tabs>

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16"
          >
            <div className="bg-light-gray-bg-1 rounded-2xl p-8 border border-steel-blue/20">
              <h2 className="text-2xl font-bold text-dark-gray mb-6 text-center">
                Need Professional Tax Advice?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Shield className="w-12 h-12 text-steel-blue mx-auto mb-4" />
                  <h3 className="font-semibold text-dark-gray mb-2">Expert Consultation</h3>
                  <p className="text-dark-gray/70 text-sm">
                    Get personalized tax advice from Swiss tax experts
                  </p>
                </div>
                <div className="text-center">
                  <Calculator className="w-12 h-12 text-steel-blue mx-auto mb-4" />
                  <h3 className="font-semibold text-dark-gray mb-2">Tax Optimization</h3>
                  <p className="text-dark-gray/70 text-sm">
                    Maximize your savings with strategic tax planning
                  </p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-steel-blue mx-auto mb-4" />
                  <h3 className="font-semibold text-dark-gray mb-2">Ongoing Support</h3>
                  <p className="text-dark-gray/70 text-sm">
                    Year-round support for all your tax needs
                  </p>
                </div>
              </div>
              <div className="text-center mt-8">
                <Button asChild size="lg" className="bg-steel-blue hover:bg-steel-blue/90">
                  <a href="/contact">
                    Get Professional Tax Advice
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

// Income Tax Calculator Component
const IncomeTaxCalculator = () => {
  const [formData, setFormData] = useState({
    canton: 'zurich',
    income: '',
    maritalStatus: 'single',
    children: '0',
    residence: 'resident'
  });

  const [results, setResults] = useState(null);

  const cantons = [
    { value: 'zurich', label: 'Zürich' },
    { value: 'geneva', label: 'Genève' },
    { value: 'bern', label: 'Bern' },
    { value: 'vaud', label: 'Vaud' },
    { value: 'basel-stadt', label: 'Basel-Stadt' },
    { value: 'basel-landschaft', label: 'Basel-Landschaft' },
    { value: 'aargau', label: 'Aargau' },
    { value: 'st-gallen', label: 'St. Gallen' },
    { value: 'ticino', label: 'Ticino' },
    { value: 'luzern', label: 'Luzern' }
  ];

  const calculateTax = () => {
    const income = parseFloat(formData.income);
    if (!income || income <= 0) return;

    // Simplified tax calculation (in real implementation, use actual Swiss tax rates)
    let taxRate = 0.15; // Base rate
    let deductions = 0;

    // Adjust for canton
    const cantonRates = {
      'zurich': 0.12,
      'geneva': 0.18,
      'bern': 0.14,
      'vaud': 0.16,
      'basel-stadt': 0.13,
      'basel-landschaft': 0.14,
      'aargau': 0.13,
      'st-gallen': 0.14,
      'ticino': 0.15,
      'luzern': 0.13
    };

    taxRate = cantonRates[formData.canton] || 0.15;

    // Adjust for marital status
    if (formData.maritalStatus === 'married') {
      taxRate *= 0.9;
      deductions += 2000;
    }

    // Adjust for children
    const childCount = parseInt(formData.children);
    deductions += childCount * 1500;

    // Calculate tax
    const taxableIncome = Math.max(0, income - deductions);
    const federalTax = taxableIncome * 0.077; // Federal rate
    const cantonalTax = taxableIncome * taxRate;
    const communalTax = cantonalTax * 0.8; // Approximate communal rate
    const totalTax = federalTax + cantonalTax + communalTax;

    setResults({
      federalTax: Math.round(federalTax),
      cantonalTax: Math.round(cantonalTax),
      communalTax: Math.round(communalTax),
      totalTax: Math.round(totalTax),
      effectiveRate: Math.round((totalTax / income) * 100 * 100) / 100,
      deductions: deductions
    });
  };

  return (
    <Card className="max-w-5xl mx-auto bg-white shadow-xl border-0 rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-steel-blue to-blue-600 text-white rounded-t-2xl">
        <CardTitle className="flex items-center space-x-3 text-white">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold">Swiss Income Tax Calculator</span>
        </CardTitle>
        <p className="text-white/90 text-lg mt-2">
          Calculate your Swiss income tax based on canton, income, and personal circumstances.
        </p>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-dark-gray mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="canton" className="text-sm font-medium text-dark-gray">Canton of Residence</Label>
                  <Select value={formData.canton} onValueChange={(value) => setFormData({...formData, canton: value})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select canton" />
                    </SelectTrigger>
                    <SelectContent>
                      {cantons.map((canton) => (
                        <SelectItem key={canton.value} value={canton.value}>
                          {canton.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="income" className="text-sm font-medium text-dark-gray">Annual Gross Income (CHF)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="e.g., 120000"
                    value={formData.income}
                    onChange={(e) => setFormData({...formData, income: e.target.value})}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="maritalStatus" className="text-sm font-medium text-dark-gray">Marital Status</Label>
                  <Select value={formData.maritalStatus} onValueChange={(value) => setFormData({...formData, maritalStatus: value})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="children" className="text-sm font-medium text-dark-gray">Number of Children</Label>
                  <Select value={formData.children} onValueChange={(value) => setFormData({...formData, children: value})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button onClick={calculateTax} className="w-full bg-gradient-to-r from-steel-blue to-blue-600 hover:from-steel-blue/90 hover:to-blue-600/90 text-white font-semibold py-4 text-lg rounded-xl shadow-lg">
              Calculate Tax
            </Button>
          </div>

          <div className="space-y-4">
            {results ? (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 space-y-6 border border-blue-100">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-dark-gray mb-2">Tax Calculation Results</h3>
                  <p className="text-dark-gray/70">Your estimated Swiss tax obligation</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-dark-gray/70 text-sm">Federal Tax:</span>
                      <span className="font-bold text-lg">CHF {results.federalTax.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-dark-gray/70 text-sm">Cantonal Tax:</span>
                      <span className="font-bold text-lg">CHF {results.cantonalTax.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-dark-gray/70 text-sm">Communal Tax:</span>
                      <span className="font-bold text-lg">CHF {results.communalTax.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-dark-gray/70 text-sm">Deductions:</span>
                      <span className="font-bold text-lg text-green-600">CHF {results.deductions.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-steel-blue to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">Total Tax:</span>
                    <span className="text-3xl font-bold">CHF {results.totalTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-white/80">Effective Tax Rate:</span>
                    <span className="text-xl font-semibold">{results.effectiveRate}%</span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-800 font-medium mb-1">Important Note</p>
                      <p className="text-sm text-blue-700">
                        This is an estimate based on simplified calculations. Actual tax may vary based on specific circumstances, 
                        deductions, and cantonal variations. Consult a tax professional for accurate calculations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 text-center border border-gray-200">
                <div className="w-16 h-16 bg-steel-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-steel-blue" />
                </div>
                <h3 className="text-xl font-semibold text-dark-gray mb-2">Ready to Calculate</h3>
                <p className="text-dark-gray/70">
                  Enter your details and click "Calculate Tax" to see your estimated Swiss tax obligation.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Wealth Tax Calculator Component
const WealthTaxCalculator = () => {
  const [formData, setFormData] = useState({
    canton: 'zurich',
    wealth: '',
    maritalStatus: 'single'
  });

  const [results, setResults] = useState(null);

  const calculateWealthTax = () => {
    const wealth = parseFloat(formData.wealth);
    if (!wealth || wealth <= 0) return;

    // Simplified wealth tax calculation
    let taxRate = 0.001; // Base rate 0.1%
    
    const cantonRates = {
      'zurich': 0.0008,
      'geneva': 0.0012,
      'bern': 0.0009,
      'vaud': 0.0011,
      'basel-stadt': 0.0007,
      'basel-landschaft': 0.0008,
      'aargau': 0.0008,
      'st-gallen': 0.0009,
      'ticino': 0.0010,
      'luzern': 0.0008
    };

    taxRate = cantonRates[formData.canton] || 0.001;

    // Adjust for marital status
    if (formData.maritalStatus === 'married') {
      taxRate *= 0.9;
    }

    // Calculate tax
    const taxableWealth = Math.max(0, wealth - 100000); // Exemption threshold
    const wealthTax = taxableWealth * taxRate;

    setResults({
      taxableWealth: Math.round(taxableWealth),
      wealthTax: Math.round(wealthTax),
      effectiveRate: Math.round((wealthTax / wealth) * 100 * 1000) / 1000
    });
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-steel-blue" />
          <span>Swiss Wealth Tax Calculator</span>
        </CardTitle>
        <p className="text-dark-gray/70">
          Calculate your Swiss wealth tax based on your total assets and canton of residence.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="wealth-canton">Canton of Residence</Label>
              <Select value={formData.canton} onValueChange={(value) => setFormData({...formData, canton: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select canton" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zurich">Zürich</SelectItem>
                  <SelectItem value="geneva">Genève</SelectItem>
                  <SelectItem value="bern">Bern</SelectItem>
                  <SelectItem value="vaud">Vaud</SelectItem>
                  <SelectItem value="basel-stadt">Basel-Stadt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="wealth">Total Wealth (CHF)</Label>
              <Input
                id="wealth"
                type="number"
                placeholder="e.g., 1000000"
                value={formData.wealth}
                onChange={(e) => setFormData({...formData, wealth: e.target.value})}
              />
              <p className="text-sm text-dark-gray/60 mt-1">
                Include all assets: real estate, investments, bank accounts, etc.
              </p>
            </div>

            <div>
              <Label htmlFor="wealth-marital">Marital Status</Label>
              <Select value={formData.maritalStatus} onValueChange={(value) => setFormData({...formData, maritalStatus: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculateWealthTax} className="w-full bg-steel-blue hover:bg-steel-blue/90">
              Calculate Wealth Tax
            </Button>
          </div>

          <div className="space-y-4">
            {results ? (
              <div className="bg-light-gray-bg-1 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-dark-gray text-lg">Wealth Tax Results</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-dark-gray/70">Taxable Wealth:</span>
                    <span className="font-semibold">CHF {results.taxableWealth.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-steel-blue">
                      <span>Wealth Tax:</span>
                      <span>CHF {results.wealthTax.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-gray/70">Effective Rate:</span>
                    <span className="font-semibold">{results.effectiveRate}%</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                      Wealth tax rates vary significantly by canton. This is an estimate based on simplified calculations.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-light-gray-bg-1 rounded-lg p-6 text-center">
                <TrendingUp className="w-12 h-12 text-steel-blue mx-auto mb-4 opacity-50" />
                <p className="text-dark-gray/70">
                  Enter your wealth details to calculate your estimated Swiss wealth tax.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Pillar 3a Calculator Component
const Pillar3aCalculator = () => {
  const [formData, setFormData] = useState({
    income: '',
    age: '',
    currentSavings: '',
    contributionType: 'employee'
  });

  const [results, setResults] = useState(null);

  const calculatePillar3a = () => {
    const income = parseFloat(formData.income);
    const age = parseInt(formData.age);
    const currentSavings = parseFloat(formData.currentSavings) || 0;
    
    if (!income || !age) return;

    // Pillar 3a limits and calculations
    const maxContribution = formData.contributionType === 'employee' ? 7056 : 35328;
    const taxRate = 0.25; // Approximate marginal tax rate
    
    // Calculate tax savings
    const taxSavings = maxContribution * taxRate;
    
    // Calculate future value (simplified)
    const yearsToRetirement = Math.max(0, 65 - age);
    const annualReturn = 0.03; // 3% annual return
    const futureValue = maxContribution * ((Math.pow(1 + annualReturn, yearsToRetirement) - 1) / annualReturn);
    
    // Calculate total portfolio value
    const totalPortfolio = currentSavings + futureValue;

    setResults({
      maxContribution,
      taxSavings: Math.round(taxSavings),
      futureValue: Math.round(futureValue),
      totalPortfolio: Math.round(totalPortfolio),
      yearsToRetirement
    });
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <PiggyBank className="w-6 h-6 text-steel-blue" />
          <span>Pillar 3a Optimization Calculator</span>
        </CardTitle>
        <p className="text-dark-gray/70">
          Calculate your optimal Pillar 3a contribution and potential tax savings.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="pillar-income">Annual Income (CHF)</Label>
              <Input
                id="pillar-income"
                type="number"
                placeholder="e.g., 120000"
                value={formData.income}
                onChange={(e) => setFormData({...formData, income: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 35"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="current-savings">Current Pillar 3a Savings (CHF)</Label>
              <Input
                id="current-savings"
                type="number"
                placeholder="e.g., 50000"
                value={formData.currentSavings}
                onChange={(e) => setFormData({...formData, currentSavings: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="contribution-type">Contribution Type</Label>
              <Select value={formData.contributionType} onValueChange={(value) => setFormData({...formData, contributionType: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee (with Pillar 2)</SelectItem>
                  <SelectItem value="self-employed">Self-Employed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculatePillar3a} className="w-full bg-steel-blue hover:bg-steel-blue/90">
              Calculate Pillar 3a Benefits
            </Button>
          </div>

          <div className="space-y-4">
            {results ? (
              <div className="bg-light-gray-bg-1 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-dark-gray text-lg">Pillar 3a Analysis</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-dark-gray/70">Max Annual Contribution:</span>
                    <span className="font-semibold">CHF {results.maxContribution.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-gray/70">Annual Tax Savings:</span>
                    <span className="font-semibold text-green-600">CHF {results.taxSavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-gray/70">Future Value (at 65):</span>
                    <span className="font-semibold">CHF {results.futureValue.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-steel-blue">
                      <span>Total Portfolio:</span>
                      <span>CHF {results.totalPortfolio.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-gray/70">Years to Retirement:</span>
                    <span className="font-semibold">{results.yearsToRetirement}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-green-800">
                      Contributing the maximum amount could save you CHF {results.taxSavings.toLocaleString()} in taxes annually!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-light-gray-bg-1 rounded-lg p-6 text-center">
                <PiggyBank className="w-12 h-12 text-steel-blue mx-auto mb-4 opacity-50" />
                <p className="text-dark-gray/70">
                  Enter your details to see your Pillar 3a optimization potential and tax savings.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Real Estate Tax Calculator Component
const RealEstateTaxCalculator = () => {
  const [formData, setFormData] = useState({
    propertyValue: '',
    canton: 'zurich',
    propertyType: 'residential',
    mortgageAmount: '',
    rentalIncome: ''
  });

  const [results, setResults] = useState(null);

  const calculateRealEstateTax = () => {
    const propertyValue = parseFloat(formData.propertyValue);
    const mortgageAmount = parseFloat(formData.mortgageAmount) || 0;
    const rentalIncome = parseFloat(formData.rentalIncome) || 0;
    
    if (!propertyValue) return;

    // Simplified real estate tax calculations
    const imputedRentalValue = propertyValue * 0.006; // 0.6% of property value
    const mortgageInterest = mortgageAmount * 0.025; // 2.5% interest rate
    const maintenanceDeduction = propertyValue * 0.01; // 1% maintenance
    
    // Calculate net rental income
    const netRentalIncome = rentalIncome - mortgageInterest - maintenanceDeduction;
    
    // Calculate wealth tax on property
    const wealthTaxRate = 0.001; // 0.1%
    const wealthTax = propertyValue * wealthTaxRate;

    setResults({
      imputedRentalValue: Math.round(imputedRentalValue),
      mortgageInterest: Math.round(mortgageInterest),
      maintenanceDeduction: Math.round(maintenanceDeduction),
      netRentalIncome: Math.round(netRentalIncome),
      wealthTax: Math.round(wealthTax),
      totalTaxBurden: Math.round(imputedRentalValue + wealthTax)
    });
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Home className="w-6 h-6 text-steel-blue" />
          <span>Swiss Real Estate Tax Calculator</span>
        </CardTitle>
        <p className="text-dark-gray/70">
          Calculate taxes and deductions for Swiss real estate ownership.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="property-value">Property Value (CHF)</Label>
              <Input
                id="property-value"
                type="number"
                placeholder="e.g., 1000000"
                value={formData.propertyValue}
                onChange={(e) => setFormData({...formData, propertyValue: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="real-estate-canton">Canton</Label>
              <Select value={formData.canton} onValueChange={(value) => setFormData({...formData, canton: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zurich">Zürich</SelectItem>
                  <SelectItem value="geneva">Genève</SelectItem>
                  <SelectItem value="bern">Bern</SelectItem>
                  <SelectItem value="vaud">Vaud</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="property-type">Property Type</Label>
              <Select value={formData.propertyType} onValueChange={(value) => setFormData({...formData, propertyType: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential (Owner-occupied)</SelectItem>
                  <SelectItem value="rental">Rental Property</SelectItem>
                  <SelectItem value="vacation">Vacation Home</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="mortgage">Mortgage Amount (CHF)</Label>
              <Input
                id="mortgage"
                type="number"
                placeholder="e.g., 800000"
                value={formData.mortgageAmount}
                onChange={(e) => setFormData({...formData, mortgageAmount: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="rental-income">Annual Rental Income (CHF)</Label>
              <Input
                id="rental-income"
                type="number"
                placeholder="e.g., 60000"
                value={formData.rentalIncome}
                onChange={(e) => setFormData({...formData, rentalIncome: e.target.value})}
              />
            </div>

            <Button onClick={calculateRealEstateTax} className="w-full bg-steel-blue hover:bg-steel-blue/90">
              Calculate Real Estate Tax
            </Button>
          </div>

          <div className="space-y-4">
            {results ? (
              <div className="bg-light-gray-bg-1 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-dark-gray text-lg">Real Estate Tax Analysis</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-dark-gray/70">Imputed Rental Value:</span>
                    <span className="font-semibold">CHF {results.imputedRentalValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-gray/70">Mortgage Interest Deduction:</span>
                    <span className="font-semibold text-green-600">-CHF {results.mortgageInterest.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-gray/70">Maintenance Deduction:</span>
                    <span className="font-semibold text-green-600">-CHF {results.maintenanceDeduction.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-gray/70">Net Rental Income:</span>
                    <span className="font-semibold">CHF {results.netRentalIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-gray/70">Wealth Tax on Property:</span>
                    <span className="font-semibold">CHF {results.wealthTax.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-steel-blue">
                      <span>Total Tax Burden:</span>
                      <span>CHF {results.totalTaxBurden.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                      Imputed rental value is taxable income even if you live in the property. 
                      Mortgage interest and maintenance costs are deductible.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-light-gray-bg-1 rounded-lg p-6 text-center">
                <Home className="w-12 h-12 text-steel-blue mx-auto mb-4 opacity-50" />
                <p className="text-dark-gray/70">
                  Enter your property details to calculate your Swiss real estate tax obligations.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxCalculatorPage;
