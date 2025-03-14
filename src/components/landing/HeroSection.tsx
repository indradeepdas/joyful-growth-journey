
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  scrollToFeatures: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToFeatures }) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#91EBFF] to-[#B8A9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 font-['Nunito',_sans-serif]">
          <span className="text-gray-800">It </span>
          <span className="text-gray-800">Pays </span>
          <span className="text-gray-800">to </span>
          <span className="text-gray-800">Be </span>
          <span className="text-gray-800">Good</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-800 mb-8 max-w-3xl mx-auto font-['Nunito',_sans-serif]">
          GoodChild helps parents motivate positive behavior through exciting activities and meaningful rewards.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button 
            size="lg" 
            className="bg-[#FF85E2] hover:bg-[#FF59D6] text-gray-800 font-['Nunito',_sans-serif]"
            onClick={() => window.location.href = '/auth/sign-up'}
          >
            Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-gray-700 text-gray-800 hover:bg-gray-100 font-['Nunito',_sans-serif]"
            onClick={scrollToFeatures}
          >
            Learn More
          </Button>
        </div>
        
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1491013516836-7db643ee125a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
            alt="Happy Family Using GoodChild App"
            className="rounded-xl shadow-xl max-w-4xl w-full mx-auto"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/1200x800/FFC2E9/333333?text=GoodChild+App+Dashboard";
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
