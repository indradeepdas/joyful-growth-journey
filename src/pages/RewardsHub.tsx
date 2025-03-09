
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useToast } from '@/hooks/use-toast';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import { useQuery } from '@tanstack/react-query';
import { getRewards } from '@/services/rewardsService';

const RewardsHub = () => {
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  const [userCoins, setUserCoins] = useState<number>(120); // Placeholder value

  const { data: rewards, isLoading, error } = useQuery({
    queryKey: ['rewards'],
    queryFn: getRewards
  });

  const handleRedeem = (rewardId: string, coinCost: number) => {
    if (userCoins < coinCost) {
      toast('Not enough GoodCoins', {
        description: 'You need more GoodCoins to redeem this reward',
        action: {
          label: 'Earn more',
          onClick: () => navigate('/activities')
        }
      });
      return;
    }

    // In a real app, we would call an API to redeem the reward
    toast('Reward Redeemed!', {
      description: 'Your reward has been redeemed successfully!'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-gentle text-xl font-medium">Loading rewards...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-xl font-medium text-goodchild-red mb-4">
          Oops! Something went wrong
        </div>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-goodchild-background pb-16">
      {/* Header Section */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-goodchild-text-primary mb-4 animate-slide-down">
          Your Rewards Hub!
        </h1>
        <p className="text-xl text-goodchild-text-secondary max-w-2xl mx-auto animate-slide-up">
          Earn GoodCoins and get awesome rewards!
        </p>
        <div className="mt-8 max-w-xl mx-auto">
          <img 
            src="/treasure-chest.svg" 
            alt="Treasure chest with GoodCoins" 
            className="w-full h-auto animate-float"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/600x400/FFD166/073B4C?text=Treasure+Chest";
            }}
          />
        </div>
      </div>

      {/* Fixed GoodCoin Balance */}
      <div className="fixed top-20 right-4 z-30 glass-card py-2 px-4 shadow-glow-yellow animate-fade-in">
        <div className="good-coin text-lg">
          <GoodCoinIcon className="w-6 h-6 animate-coin-spin" />
          <span>{userCoins}</span>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards?.map((reward) => (
            <Card key={reward.id} className="bg-white/80 backdrop-blur-sm overflow-hidden rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="relative w-full h-48">
                <img 
                  src={reward.imageUrl} 
                  alt={reward.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/600x400/EFF1F3/073B4C?text=Reward";
                  }}
                />
                {reward.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-goodchild-red text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse-gentle">
                    Discount!
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-goodchild-text-primary mb-2">{reward.name}</h3>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    {reward.originalPrice !== reward.discountedPrice && (
                      <span className="text-goodchild-text-secondary line-through mr-2">
                        ${reward.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-goodchild-text-primary font-bold">
                      ${reward.discountedPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="good-coin">
                    <GoodCoinIcon className="w-5 h-5" />
                    {reward.coinCost}
                  </div>
                </div>
                <Button 
                  onClick={() => handleRedeem(reward.id, reward.coinCost)}
                  className="w-full bg-goodchild-blue text-white hover:bg-goodchild-blue/90"
                >
                  Get it Now!
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">
          Start earning GoodCoins today!
        </h2>
        <Button 
          onClick={() => navigate('/activities')}
          className="bg-goodchild-green text-white hover:bg-goodchild-green/90"
        >
          Explore Activities
        </Button>
      </div>
    </div>
  );
};

export default RewardsHub;
