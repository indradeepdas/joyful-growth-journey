
import React, { useRef } from 'react';
import Footer from '@/components/Footer';
import LandingHeader from '@/components/landing/LandingHeader';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import ActivityCenterShowcase from '@/components/landing/ActivityCenterShowcase';
import RewardsHubShowcase from '@/components/landing/RewardsHubShowcase';
import TestimonialsSection from '@/components/landing/TestimonialsSection';

const Index = () => {
  const featuresRef = useRef<HTMLElement>(null);
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-goodchild-background flex flex-col font-sassoon">
      {/* Header */}
      <LandingHeader />
      
      {/* Hero Section */}
      <HeroSection scrollToFeatures={scrollToFeatures} />
      
      {/* Features Section */}
      <FeaturesSection ref={featuresRef} />
      
      {/* Activity Center Showcase */}
      <ActivityCenterShowcase />
      
      {/* Rewards Hub Showcase */}
      <RewardsHubShowcase />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
