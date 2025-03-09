
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GoodCoinIcon from '@/components/GoodCoinIcon';

const Index = () => {
  return (
    <div className="min-h-screen bg-goodchild-background flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center glass-card p-8 sm:p-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-goodchild-text-primary mb-6">
          Welcome to<br />
          <span className="text-gradient">The Good Child Project</span>
        </h1>
        
        <p className="text-lg text-goodchild-text-secondary mb-8">
          Transforming parenting with gamified positive reinforcement. 
          Encourage your child's development through fun, engaging activities and rewarding experiences.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link to="/rewards">
            <Button className="btn-primary w-full sm:w-auto">
              Explore Rewards
            </Button>
          </Link>
          
          <Link to="/activities">
            <Button variant="outline" className="btn-outline w-full sm:w-auto">
              See Activities
            </Button>
          </Link>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="good-coin text-xl animate-float">
            <GoodCoinIcon className="w-8 h-8" />
            <span className="ml-2">Start earning GoodCoins today!</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-goodchild-text-secondary text-sm">
        <p>This is a temporary landing page. A full landing page is coming soon!</p>
      </div>
    </div>
  );
};

export default Index;
