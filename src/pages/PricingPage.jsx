import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProductsList from '@/components/ProductsList';

const PricingPage = () => {
  return (
    <>
      <Helmet>
        <title>Transparent Pricing | Taxed GmbH - No Hidden Costs Swiss Tax Filing</title>
        <meta name="description" content="Clear, flat-rate pricing for Swiss tax returns. From CHF 249 for basic returns to CHF 799 for complex situations. Free consultation included in all packages." />
        <meta property="og:title" content="Transparent Pricing | Taxed GmbH - No Hidden Costs Swiss Tax Filing" />
        <meta property="og:description" content="Clear, flat-rate pricing for Swiss tax returns. From CHF 299 for basic returns to CHF 799 for complex situations. Free consultation included in all packages." />
      </Helmet>

      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-dark-gray mb-6">
              Transparent Pricing
            </h1>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto mb-8">
              Clear, flat-rate pricing with no hidden costs. Choose the package that fits your needs 
              and get expert Swiss tax filing with complete transparency.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-light-gray-bg-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <ProductsList />
        </div>
      </section>

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
                className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-md border-l-4 border-brand-red"
              >
                <div className="text-2xl mt-1">✨</div>
                <div>
                  <h3 className="font-semibold text-dark-gray">{feature}</h3>
                </div>
              </motion.div>
            ))}
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
              Not Sure Which Package is Right for You?
            </h2>
            <p className="text-xl mb-8 text-white/80">
              Contact us with your questions, and we'll help you choose the perfect solution 
              for your specific tax situation.
            </p>
            <Button 
              asChild
              size="lg" 
              className="bg-brand-red text-white hover:bg-brand-red/90 text-lg px-8 py-4"
            >
              <Link to="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PricingPage;