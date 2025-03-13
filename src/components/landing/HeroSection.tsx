
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  scrollToFeatures: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToFeatures }) => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-sassoon">
          <span className="text-blue-500">It </span>
          <span className="text-purple-500">Pays </span>
          <span className="text-green-500">to </span>
          <span className="text-yellow-500">Be </span>
          <span className="text-red-500">Good</span>
        </h1>
        <p className="text-xl md:text-2xl text-goodchild-text-secondary mb-8 max-w-3xl mx-auto">
          GoodChild helps parents motivate positive behavior through exciting activities and meaningful rewards.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button 
            size="lg" 
            className="bg-goodchild-primary hover:bg-goodchild-primary-dark text-white"
            onClick={() => window.location.href = '/auth/sign-up'}
          >
            Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-goodchild-primary text-goodchild-primary hover:bg-goodchild-primary/10"
            onClick={scrollToFeatures}
          >
            Learn More
          </Button>
        </div>
        
        <div className="relative">
          <img 
            src="/placeholder.svg" 
            alt="GoodChild App Dashboard" 
            className="rounded-xl shadow-xl max-w-4xl w-full mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
