import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
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
  ShoppingCart,
  Mail,
  X,
  Trash2,
  Plus,
  Minus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
// import ProductsList from '@/components/ProductsList';

const StorePage = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (pkg) => {
    const existingItem = cart.find(item => item.id === pkg.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === pkg.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...pkg, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (pkgId) => {
    setCart(cart.filter(item => item.id !== pkgId));
  };

  const updateQuantity = (pkgId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(pkgId);
    } else {
      setCart(cart.map(item => 
        item.id === pkgId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace('CHF ', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  };

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
      color: 'border-gray-300',
      buttonColor: 'bg-steel-blue hover:bg-blue-800',
      icon: FileText
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
      color: 'border-steel-blue',
      buttonColor: 'bg-steel-blue hover:bg-steel-blue/90',
      icon: Calculator
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
      color: 'border-brand-gold',
      buttonColor: 'bg-brand-gold hover:bg-yellow-600',
      icon: Crown
    }
  ];

  const guarantees = [
    {
      icon: Shield,
      title: '100% Accuracy Guarantee',
      description: 'If we make an error, we fix it for free and cover any penalties'
    },
    {
      icon: Clock,
      title: 'On-Time Filing',
      description: 'We guarantee your taxes are filed before the deadline or we pay the late fees'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Direct access to certified Swiss tax professionals with 15+ years experience'
    },
    {
      icon: Award,
      title: 'Satisfaction Guarantee',
      description: 'Not happy? Get a full refund within 30 days, no questions asked'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Swiss Tax Return Packages | Taxed GmbH - Save up to CHF 400</title>
        <meta name="description" content="Get your Swiss tax return done by certified experts at 60% lower rates than Big 4. Choose from Basic (CHF 249), Standard (CHF 449), or Premium (CHF 799) packages. Limited time savings!" />
        <meta property="og:title" content="Swiss Tax Return Packages | Taxed GmbH - Save up to CHF 400" />
        <meta property="og:description" content="Get your Swiss tax return done by certified experts at 60% lower rates than Big 4. Choose from Basic (CHF 249), Standard (CHF 449), or Premium (CHF 799) packages. Limited time savings!" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={[{ label: 'Store', path: '/store' }]} />
      </div>

      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-steel-blue via-blue-600 to-blue-800 overflow-hidden">
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
              <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-sm font-semibold">Limited Time: Save up to CHF 400 on all packages!</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Swiss Tax Returns
              <br />
              <span className="text-yellow-400">Done Right</span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Skip the Big 4 bureaucracy and get your Swiss taxes done by <strong>certified experts</strong> 
              at <strong>60% lower rates</strong>. Choose your package and get started today.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">500+</div>
                <div className="text-sm text-blue-200">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">98%</div>
                <div className="text-sm text-blue-200">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">15+</div>
                <div className="text-sm text-blue-200">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">24h</div>
                <div className="text-sm text-blue-200">Response Time</div>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-steel-blue hover:bg-gray-100 text-xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-200 font-bold"
                asChild
              >
                <Link to="#packages">
                  <ShoppingCart className="mr-3 h-6 w-6" />
                  Choose Your Package
                </Link>
              </Button>
              <Button 
                size="lg" 
                className="bg-steel-blue hover:bg-blue-800 text-white text-xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-200 font-bold"
                onClick={() => window.location.href = 'tel:+41799107787'}
              >
                <Mail className="mr-3 h-6 w-6" />
                Email: info@taxed.ch
              </Button>
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
                    <div className="bg-brand-gold text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
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
                      <div className="inline-flex items-center bg-blue-100 text-steel-blue rounded-full px-3 py-1 text-sm font-semibold">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Save {pkg.savings}
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

                    {/* CTA Button */}
                    <div className="pt-4">
                      <Button 
                        className={`w-full ${pkg.buttonColor} text-white text-lg py-4 font-bold`}
                        size="lg"
                        onClick={() => addToCart(pkg)}
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart
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

      {/* Guarantees Section */}
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
              Our Guarantees to You
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We stand behind our work with these ironclad guarantees
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={guarantee.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-steel-blue/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-steel-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <guarantee.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-dark-gray mb-2">{guarantee.title}</h4>
                <p className="text-sm text-gray-600">{guarantee.description}</p>
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
          <div className="text-center">
            <h3 className="text-xl font-semibold text-dark-gray mb-4">Additional Services Coming Soon</h3>
            <p className="text-gray-600">We're working on expanding our service offerings. Contact us for custom tax solutions.</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-red-600 via-red-700 to-red-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Zap className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-sm font-semibold">Limited Time: Free Consultation + 10% Discount</span>
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Don't Let Tax Deadlines
              <br />
              <span className="text-yellow-400">Stress You Out</span>
            </h2>
            
            <p className="text-xl lg:text-2xl mb-12 text-red-100 max-w-4xl mx-auto leading-relaxed">
              Every day you wait is money lost. <strong>Get expert Swiss tax help now</strong> and save thousands 
              compared to Big 4 rates. <strong>Free consultation + 10% discount for new clients.</strong>
            </p>

            {/* Final CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                className="bg-white text-red-600 hover:bg-gray-100 text-xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-200 font-bold"
                asChild
              >
                <Link to="/contact">
                  <MessageCircle className="mr-3 h-6 w-6" />
                  Get Free Consultation
                </Link>
              </Button>
              <Button 
                size="lg" 
                className="bg-steel-blue hover:bg-blue-800 text-white text-xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-200 font-bold"
                onClick={() => window.location.href = 'tel:+41799107787'}
              >
                <Mail className="mr-3 h-6 w-6" />
                Email: info@taxed.ch
              </Button>
            </div>

            {/* Final Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">FREE</div>
                <div className="text-sm text-red-200">Consultation</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">10%</div>
                <div className="text-sm text-red-200">Discount</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">24h</div>
                <div className="text-sm text-red-200">Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">500+</div>
                <div className="text-sm text-red-200">Happy Clients</div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-red-200 mb-4">
                <strong>Don't wait!</strong> Tax deadlines don't wait for Big 4 bureaucracy.
              </p>
              <p className="text-sm text-red-300">
                *Free consultation includes 30-minute expert review of your tax situation. 10% discount applies to first-time clients.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shopping Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsCartOpen(false)}
            />
            
            {/* Cart Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Cart Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <ShoppingCart className="mr-2 h-6 w-6" />
                  Shopping Cart ({cart.length})
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                    <Button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.subtitle}</p>
                          <p className="text-lg font-bold text-steel-blue">{item.price}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-steel-blue">CHF {getTotalPrice()}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-steel-blue hover:bg-steel-blue/90"
                      size="lg"
                      onClick={() => {
                        setIsCartOpen(false);
                        window.location.href = '/contact';
                      }}
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default StorePage;