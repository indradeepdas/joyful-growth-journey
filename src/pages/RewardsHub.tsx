import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, AlertCircle, CheckCircle } from 'lucide-react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Reward } from '@/types';
import { adaptSupabaseReward } from '@/utils/typeAdapters';
import { SupabaseReward } from '@/services/types';

const RewardsHub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState('all');
  const { toast } = useToast();
  const { profile, isLoading: authLoading } = useSupabaseAuth();
  const queryClient = useQueryClient();
  
  // Function to fetch rewards from Supabase
  const fetchRewards = async (): Promise<Reward[]> => {
    const { data, error } = await supabase
      .from('rewards')
      .select('*');
      
    if (error) throw error;
    
    return (data as SupabaseReward[]).map(adaptSupabaseReward);
  };
  
  // Query to fetch rewards
  const { data: rewards = [], isLoading, error } = useQuery({
    queryKey: ['rewards'],
    queryFn: fetchRewards,
  });
  
  // Function to redeem a reward
  const redeemRewardFn = async (rewardId: string) => {
    if (!profile?.id) {
      throw new Error("You must be logged in to redeem rewards");
    }
    
    // First get the reward to check its cost
    const { data: rewardData, error: rewardError } = await supabase
      .from('rewards')
      .select('*')
      .eq('id', rewardId)
      .single();
      
    if (rewardError) throw rewardError;
    
    const reward = adaptSupabaseReward(rewardData as SupabaseReward);
    
    // Check if user has child profile
    const { data: childData, error: childError } = await supabase
      .from('children')
      .select('*')
      .eq('id', profile.id)
      .single();
      
    if (childError && childError.code !== 'PGRST116') {
      throw childError;
    }
    
    if (!childData) {
      throw new Error("Only children can redeem rewards");
    }
    
    // Check if child has enough coins
    if (childData.good_coins < reward.goodCoins) {
      throw new Error(`Not enough GoodCoins. You need ${reward.goodCoins} but only have ${childData.good_coins}.`);
    }
    
    // Begin transaction
    // 1. Add redemption record
    const { error: redemptionError } = await supabase
      .from('redemptions')
      .insert({
        child_id: profile.id,
        reward_id: rewardId,
        good_coins: reward.goodCoins
      });
      
    if (redemptionError) throw redemptionError;
    
    // 2. Update child's coins
    const { error: updateError } = await supabase
      .from('children')
      .update({ good_coins: childData.good_coins - reward.goodCoins })
      .eq('id', profile.id);
      
    if (updateError) throw updateError;
    
    // 3. Add transaction record
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        child_id: profile.id,
        amount: -reward.goodCoins,
        type: 'spent',
        description: `Redeemed ${reward.name}`,
        created_by: profile.id
      });
      
    if (transactionError) throw transactionError;
    
    return reward;
  };
  
  // Mutation to redeem a reward
  const redeemMutation = useMutation({
    mutationFn: redeemRewardFn,
    onSuccess: (data) => {
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed ${data.name} for ${data.goodCoins} GoodCoins.`,
        variant: "default",
      });
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['rewards'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Filter rewards based on search query and tab
  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          reward.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (tab === 'all') return matchesSearch;
    if (tab === 'affordable' && profile?.role === 'child') {
      // Assuming profile.goodCoins is available if role is 'child'
      const childProfile = profile as any; // Type assertion for simplicity
      return matchesSearch && reward.goodCoins <= (childProfile.goodCoins || 0);
    }
    return matchesSearch;
  });
  
  const handleRedeem = (rewardId: string) => {
    if (!profile) {
      toast({
        title: "Error",
        description: "You must be logged in to redeem rewards",
        variant: "destructive",
      });
      return;
    }
    
    redeemMutation.mutate(rewardId);
  };
  
  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-goodchild-background flex flex-col font-sassoon">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading Rewards...</div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-goodchild-background flex flex-col font-sassoon">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Error Loading Rewards</h2>
            <p className="text-goodchild-text-secondary mb-4">
              {error instanceof Error ? error.message : 'An unexpected error occurred'}
            </p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-goodchild-background flex flex-col font-sassoon">
      <Navbar />
      
      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-goodchild-text-primary mb-4">Rewards Hub</h1>
            <p className="text-xl text-goodchild-text-secondary max-w-2xl mx-auto">
              Redeem your GoodCoins for exciting rewards that encourage and celebrate positive behavior!
            </p>
          </div>
          
          {/* Search and tabs bar */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-auto flex-1 md:max-w-md">
              <Input
                type="text"
                placeholder="Search rewards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-goodchild-text-secondary h-4 w-4" />
            </div>
            
            <Tabs value={tab} onValueChange={setTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All Rewards</TabsTrigger>
                {profile?.role === 'child' && (
                  <TabsTrigger value="affordable">I Can Afford</TabsTrigger>
                )}
              </TabsList>
            </Tabs>
          </div>
          
          {/* Rewards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredRewards.length > 0 ? (
              filteredRewards.map((reward) => (
                <Card key={reward.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img
                      src={reward.imageUrl || "https://placehold.co/400x300/FFD166/073B4C?text=Reward"}
                      alt={reward.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{reward.name}</CardTitle>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <GoodCoinIcon className="h-5 w-5" />
                      <span className="font-bold text-lg">{reward.goodCoins} GoodCoins</span>
                    </div>
                    {reward.originalPrice && (
                      <p className="text-sm text-goodchild-text-secondary">
                        <span className="line-through">${reward.originalPrice.toFixed(2)}</span>
                        {reward.discountedPrice && (
                          <span className="ml-1 font-medium text-goodchild-green">
                            ${reward.discountedPrice.toFixed(2)}
                          </span>
                        )}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleRedeem(reward.id)} 
                      className="w-full"
                      disabled={profile?.role !== 'child' || redeemMutation.isPending}
                    >
                      {redeemMutation.isPending && redeemMutation.variables === reward.id 
                        ? "Redeeming..." 
                        : "Redeem Reward"}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="mb-4">
                  <Search className="h-12 w-12 mx-auto text-goodchild-text-secondary opacity-60" />
                </div>
                <h3 className="text-xl font-medium mb-2">No rewards found</h3>
                <p className="text-goodchild-text-secondary">
                  Try adjusting your search or check back later for new rewards.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RewardsHub;
