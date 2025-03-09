
import React from 'react';
import { Button } from '@/components/ui/button';

const RewardsSection: React.FC = () => {
  return (
    <div className="glass-card p-6 rounded-xl mb-6">
      <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">
        My Rewards
      </h2>
      <div className="text-center p-4">
        <p className="text-goodchild-text-secondary mb-4">
          Visit the Rewards Hub to discover exciting rewards you can redeem with your GoodCoins!
        </p>
        <Button 
          className="bg-goodchild-secondary hover:bg-goodchild-secondary/80"
          onClick={() => window.location.href = '/rewards'}
        >
          Go to Rewards Hub
        </Button>
      </div>
    </div>
  );
};

export default RewardsSection;
