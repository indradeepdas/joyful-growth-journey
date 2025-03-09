
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useToast } from '@/hooks/use-toast';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { adaptSupabaseReward } from '@/utils/typeAdapters';
import { Search, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

const RewardsHub = () => {
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  const { user, childAccounts } = useSupabaseAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Fetch rewards from Supabase
  const { data: rewards, isLoading, error } = useQuery({
    queryKey: ['rewards'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data.map(reward => adaptSupabaseReward(reward));
    }
  });

  // Get user coins (use the first child for now)
  const userCoins = childAccounts && childAccounts.length > 0 
    ? childAccounts[0].good_coins 
    : 120; // Fallback value

  const handleRedeem = async (rewardId: string, coinCost: number) => {
    if (!user) {
      toast('Please log in', {
        description: 'You need to be logged in to redeem rewards',
        action: {
          label: 'Login',
          onClick: () => navigate('/login')
        }
      });
      return;
    }

    if (childAccounts.length === 0) {
      toast('No child account', {
        description: 'You need to create a child account first',
        action: {
          label: 'Create',
          onClick: () => navigate('/parent-dashboard')
        }
      });
      return;
    }

    const childId = childAccounts[0].id;

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

    try {
      // Insert redemption record
      const { data, error } = await supabase
        .from('redemptions')
        .insert([
          {
            child_id: childId,
            reward_id: rewardId,
            good_coins: coinCost
          }
        ]);

      if (error) {
        throw error;
      }

      // Deduct the coins through a transaction
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert([
          {
            child_id: childId,
            amount: -coinCost,
            type: 'spent',
            description: 'Redeemed reward',
            created_by: user.id
          }
        ]);

      if (transactionError) {
        throw transactionError;
      }

      toast('Reward Redeemed!', {
        description: 'Your reward has been redeemed successfully!'
      });
    } catch (error) {
      console.error('Error redeeming reward:', error);
      toast('Redemption failed', {
        description: 'There was an error redeeming your reward. Please try again.'
      });
    }
  };

  // Filter rewards based on search and category
  const filteredRewards = rewards?.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          reward.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Add category filtering if implemented
    return matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sassoon">
        <div className="animate-pulse-gentle text-xl font-medium">Loading rewards...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-sassoon">
        <div className="text-xl font-medium text-goodchild-red mb-4">
          Oops! Something went wrong
        </div>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-goodchild-background pb-16 font-sassoon">
      <Navbar />
      
      {/* Header Section */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-goodchild-text-primary mb-4 animate-slide-down">
          Your Rewards Hub!
        </h1>
        <p className="text-xl text-goodchild-text-secondary max-w-2xl mx-auto animate-slide-up">
          Earn GoodCoins and get awesome rewards!
        </p>
      </div>

      {/* Fixed GoodCoin Balance */}
      <div className="fixed top-20 right-4 z-30 glass-card py-2 px-4 shadow-glow-yellow animate-fade-in">
        <div className="good-coin text-lg">
          <GoodCoinIcon className="w-6 h-6 animate-coin-spin" />
          <span>{userCoins}</span>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-goodchild-text-secondary" size={18} />
            <input
              type="text"
              placeholder="Search rewards..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-full w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-goodchild-blue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filter options would go here */}
        </div>
      </div>

      {/* Rewards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredRewards && filteredRewards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map((reward) => (
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
                  {(reward.originalPrice > reward.discountedPrice) && (
                    <div className="absolute top-2 right-2 bg-goodchild-red text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse-gentle">
                      Discount!
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-goodchild-text-primary mb-2">{reward.name}</h3>
                  <p className="text-goodchild-text-secondary mb-3 line-clamp-2">{reward.description}</p>
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
                      {reward.goodCoins}
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleRedeem(reward.id, reward.goodCoins)}
                    className="w-full bg-goodchild-blue text-white hover:bg-goodchild-blue/90"
                    disabled={userCoins < reward.goodCoins}
                  >
                    {userCoins < reward.goodCoins ? 'Not Enough Coins' : 'Get it Now!'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-goodchild-text-primary mb-2">No rewards found</h3>
            <p className="text-goodchild-text-secondary">
              {searchTerm ? `No results for "${searchTerm}"` : 'Check back later for new rewards!'}
            </p>
          </div>
        )}
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
      
      <Footer />
    </div>
  );
};

export default RewardsHub;
