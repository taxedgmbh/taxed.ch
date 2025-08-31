import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="relative swiss-gradient hero-pattern overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-shadow">
            Swiss Tax Returns for Expats. Simplified.
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Expert tax filing with transparent flat-rate fees. We make your Swiss tax declaration simple, digital, and stress-free.
          </p>
          <Button asChild
            size="lg" 
            className="bg-brand-red text-white hover:bg-brand-red/90 text-lg px-8 py-4"
          >
            <Link to="/store">
              View Our Packages
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;