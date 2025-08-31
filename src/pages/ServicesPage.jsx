import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, CheckCircle, Globe, Wallet, Shield, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ServicesPage = () => {
  const keyFeatures = [
    {
      icon: Globe,
      title: 'International Income Handling',
      description: 'We correctly report foreign salaries, investments, and other assets.'
    },
    {
      icon: Wallet,
      title: 'Quellensteuer Adjustments',
      description: 'We help you claim refunds for tax at source (*Quellensteuer*) if applicable.'
    },
    {
      icon: Shield,
      title: 'Digital & Secure Process',
      description: 'Submit your documents through a secure, fully digital platform.'
    }
  ];

  const serviceIncludes = [
    'Filing for employed individuals (B, L, C permit holders)',
    'Reporting of Swiss and foreign bank accounts',
    'Declaration of securities, RSUs, and cryptocurrencies',
    'Optimization of all standard deductions',
    'Support for married couples filing jointly',
    'Communication with cantonal tax authorities'
  ];

  return (
    <>
      <Helmet>
        <title>Our Service | Swiss Tax Returns for Expatriates | Taxed GmbH</title>
        <meta name="description" content="Taxed GmbH specializes in one service: filing Swiss tax returns for expatriates. We offer flat-rate pricing, digital submission, and expert handling of international income." />
        <meta property="og:title" content="Our Service | Swiss Tax Returns for Expatriates | Taxed GmbH" />
        <meta property="og:description" content="Taxed GmbH specializes in one service: filing Swiss tax returns for expatriates. We offer flat-rate pricing, digital submission, and expert handling of international income." />
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
              <FileText className="h-8 w-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-dark-gray mb-6">
              Our Specialized Service
            </h1>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              We focus exclusively on one thing: preparing and filing individual Swiss tax returns for expatriates living and working in Switzerland.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-dark-gray mb-4">
                Who We Serve
              </h2>
              <p className="text-lg text-dark-gray/80 mb-6">
                Our service is designed specifically for foreign nationals who are required to file a Swiss tax return. We understand the unique complexities that come with international employment, assets, and cross-border financial situations.
              </p>
              <p className="text-lg text-dark-gray/80">
                Please note: We do not currently serve Swiss-only residents or businesses. Our expertise is entirely focused on the needs of the expat community.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
               <img  
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
                alt="A diverse group of professionals collaborating in a modern office"
               src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-4">
              Key Features of Our Service
            </h2>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              We provide a simple, reliable, and fully transparent tax filing experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full card-hover border-steel-blue/20 shadow-lg text-center bg-white">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-warm-red-tint flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-steel-blue" />
                    </div>
                    <CardTitle className="text-xl text-dark-gray">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-dark-gray/80">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-steel-blue/10">
            <h2 className="text-3xl font-bold text-dark-gray mb-6 text-center">
              What's Included
            </h2>
            <ul className="space-y-4">
              {serviceIncludes.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="h-6 w-6 text-brand-red flex-shrink-0" />
                  <span className="text-dark-gray text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 text-center bg-warm-red-tint p-4 rounded-lg">
              <p className="text-dark-gray font-semibold">
                All our services are offered at a transparent, <Link to="/pricing" className="text-steel-blue underline hover:text-brand-red">flat-rate price</Link>. No surprises, no hidden fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 rounded-full bg-steel-blue text-white flex items-center justify-center mx-auto mb-6">
              <Calculator className="h-8 w-8" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-6">
              Free Swiss Tax Calculators
            </h2>
            <p className="text-xl text-dark-gray/80 max-w-3xl mx-auto">
              Get instant estimates for your Swiss tax obligations with our comprehensive calculators. 
              Perfect for planning and understanding your tax situation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: 'Income Tax', description: 'Calculate federal, cantonal & communal taxes', icon: '💰' },
              { title: 'Wealth Tax', description: 'Estimate wealth tax by canton', icon: '📈' },
              { title: 'Pillar 3a', description: 'Optimize your pension contributions', icon: '🏦' },
              { title: 'Real Estate', description: 'Property tax & deductions calculator', icon: '🏠' }
            ].map((calculator, index) => (
              <motion.div
                key={calculator.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-light-gray-bg-1 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-3">{calculator.icon}</div>
                <h3 className="font-semibold text-dark-gray mb-2">{calculator.title}</h3>
                <p className="text-sm text-dark-gray/70 mb-4">{calculator.description}</p>
                <Button asChild size="sm" className="bg-steel-blue hover:bg-steel-blue/90">
                  <Link to="/calculators">Try Calculator</Link>
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-steel-blue hover:bg-steel-blue/90">
              <Link to="/calculators">
                Access All Calculators
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Resource Center Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center mx-auto mb-6">
              <Download className="h-8 w-8" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-6">
              Free Tax Resources & Guides
            </h2>
            <p className="text-xl text-dark-gray/80 max-w-3xl mx-auto">
              Download expert tax guides, checklists, and templates to help you navigate Swiss taxation. 
              All resources are free and updated for 2025.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'Tax Guides', description: 'Comprehensive guides for individuals & businesses', icon: '📚' },
              { title: 'Checklists', description: 'Step-by-step checklists for tax compliance', icon: '✅' },
              { title: 'Templates', description: 'Excel templates for tracking & calculations', icon: '📊' }
            ].map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow border border-green-100"
              >
                <div className="text-3xl mb-3">{resource.icon}</div>
                <h3 className="font-semibold text-dark-gray mb-2">{resource.title}</h3>
                <p className="text-sm text-dark-gray/70 mb-4">{resource.description}</p>
                <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                  <Link to="/resources">Browse Resources</Link>
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link to="/resources">
                Access Resource Center
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* News & Updates Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 rounded-full bg-orange-600 text-white flex items-center justify-center mx-auto mb-6">
              <Newspaper className="h-8 w-8" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray mb-6">
              Latest Swiss Tax News & Updates
            </h2>
            <p className="text-xl text-dark-gray/80 max-w-3xl mx-auto">
              Stay informed with real-time Swiss tax law changes, regulatory updates, and expert analysis. 
              Our news section is updated daily with the latest developments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'Tax Law Changes', description: 'Latest federal and cantonal tax reforms', icon: '📋' },
              { title: 'Business Updates', description: 'Corporate tax and VAT developments', icon: '🏢' },
              { title: 'Expatriate News', description: 'Tax treaty and expat-specific updates', icon: '🌍' }
            ].map((newsItem, index) => (
              <motion.div
                key={newsItem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow border border-orange-100"
              >
                <div className="text-3xl mb-3">{newsItem.icon}</div>
                <h3 className="font-semibold text-dark-gray mb-2">{newsItem.title}</h3>
                <p className="text-sm text-dark-gray/70 mb-4">{newsItem.description}</p>
                <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700">
                  <Link to="/news">Read News</Link>
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Link to="/news">
                Browse All News
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 swiss-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready for a Simple Tax Season?
            </h2>
            <p className="text-xl mb-8 text-white/80">
              Let us handle the complexity of your Swiss tax return so you can focus on what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-brand-red text-white hover:bg-brand-red/90 text-lg px-8 py-4"
                asChild
              >
                <Link to="/store">
                  Go to Store
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-steel-blue text-lg px-8 py-4"
                asChild
              >
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;