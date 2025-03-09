
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  scrollToFeatures: () => void;
}

const HeroSection = ({ scrollToFeatures }: HeroSectionProps) => {
  return (
    <section className="w-full py-16 md:py-28 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-goodchild-text-primary mb-6">
            Transform Parenting with <span className="text-gradient">Gamified Positive Reinforcement</span>
          </h1>
          <p className="text-xl text-goodchild-text-secondary mb-8 max-w-xl">
            Encourage your child's development through fun, engaging activities and rewarding experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto"
              onClick={scrollToFeatures}
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="glass-card p-6 rounded-xl w-full max-w-md">
            <img 
              src="https://placehold.co/600x400/FFD166/073B4C?text=Happy+Family" 
              alt="Happy family using The Good Child Project" 
              className="w-full h-auto rounded-lg mb-4" 
            />
            <div className="text-center">
              <p className="font-medium text-lg text-goodchild-text-primary">Building better families through positive reinforcement</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
