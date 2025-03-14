
import React, { useRef, useEffect } from 'react';
import Footer from '@/components/Footer';
import LandingHeader from '@/components/landing/LandingHeader';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import ActivityCenterShowcase from '@/components/landing/ActivityCenterShowcase';
import RewardsHubShowcase from '@/components/landing/RewardsHubShowcase';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, profile } = useSupabaseAuth();
  const featuresRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (isAuthenticated && profile) {
      navigate(profile.role === 'parent' ? '/parent-dashboard' : '/child-dashboard');
    }
  }, [isAuthenticated, profile, navigate]);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-goodchild-background font-sassoon">
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
      
      {/* Add a section for exploring public pages */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Explore What GoodChild Offers
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Take a tour of our key features before creating an account
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Card className="hover:shadow-md transition-shadow flex flex-col md:max-w-[350px]">
              <CardHeader>
                <CardTitle>Parent Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-700">
                  Preview the parent dashboard where you can track your children's progress and manage their activities.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate('/public/dashboard')} className="w-full bg-[#FFA500] hover:bg-[#E69500] text-gray-800">
                  View Sample Dashboard
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow flex flex-col md:max-w-[350px]">
              <CardHeader>
                <CardTitle>Activity Center</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-700">
                  Browse through sample activities designed to develop your child's skills across 7 key areas.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate('/public/activities')} className="w-full bg-[#FFA500] hover:bg-[#E69500] text-gray-800">
                  Explore Activities
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow flex flex-col md:max-w-[350px]">
              <CardHeader>
                <CardTitle>Rewards Hub</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-700">
                  Check out the rewards your children can earn by completing activities and earning GoodCoins.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate('/public/rewards')} className="w-full bg-[#FFA500] hover:bg-[#E69500] text-gray-800">
                  See Rewards
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
