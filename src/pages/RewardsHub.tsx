
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Reward } from '@/types';
import { adaptSupabaseReward } from '@/utils/typeAdapters';
import { SupabaseReward } from '@/services/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AffiliatedPartners from '@/components/rewards/AffiliatedPartners';
import RedemptionDialog from '@/components/rewards/RedemptionDialog';
import RewardCard from '@/components/rewards/RewardCard';
import SearchBar from '@/components/rewards/SearchBar';
import CategoryTabs from '@/components/rewards/CategoryTabs';
import EmptySearch from '@/components/rewards/EmptySearch';
import LoadingState from '@/components/rewards/LoadingState';
import ErrorState from '@/components/rewards/ErrorState';

const RewardsHub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryTab, setCategoryTab] = useState('city');
  const [visibilityTab, setVisibilityTab] = useState('all');
  const { toast } = useToast();
  const { profile, isLoading: authLoading } = useSupabaseAuth();
  const queryClient = useQueryClient();
  
  // State for redemption dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  
  // Function to fetch rewards from Supabase
  const fetchRewards = async (): Promise<Reward[]> => {
    console.log('Fetching rewards from Supabase');
    const { data, error } = await supabase
      .from('rewards')
      .select('*');
      
    if (error) {
      console.error('Error fetching rewards:', error);
      throw error;
    }
    
    console.log('Rewards fetched:', data);
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
      
      // Redirect to external website if URL exists
      if (data.externalUrl) {
        window.open(data.externalUrl, '_blank');
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Sample data for categories
  // In a real application, these would come from the database
  // BACKEND NOTE: Need to add 'category' field to rewards table in database with values like: 'city', 'daily', 'brand', 'experience'
  const cityRewards = rewards.filter(r => r.id.includes('1') || r.id.includes('5'));
  const dailyRewards = rewards.filter(r => r.id.includes('2') || r.id.includes('6'));
  const brandRewards = rewards.filter(r => r.id.includes('3') || r.id.includes('7'));
  const experienceRewards = rewards.filter(r => r.id.includes('4') || r.id.includes('8'));
  
  // Filter rewards based on search query and tab
  const getFilteredRewards = () => {
    let categoryFiltered;
    
    // First filter by category
    switch (categoryTab) {
      case 'city':
        categoryFiltered = cityRewards;
        break;
      case 'daily':
        categoryFiltered = dailyRewards;
        break;
      case 'brand':
        categoryFiltered = brandRewards;
        break;
      case 'experience':
        categoryFiltered = experienceRewards;
        break;
      default:
        categoryFiltered = rewards;
    }
    
    // Then filter by search and affordability
    return categoryFiltered.filter(reward => {
      const matchesSearch = reward.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          reward.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (visibilityTab === 'all') return matchesSearch;
      if (visibilityTab === 'affordable' && profile?.role === 'child') {
        // Assuming profile.goodCoins is available if role is 'child'
        const childProfile = profile as any; // Type assertion for simplicity
        return matchesSearch && reward.goodCoins <= (childProfile.goodCoins || 0);
      }
      return matchesSearch;
    });
  };
  
  const filteredRewards = getFilteredRewards();
  
  const handleRedeemClick = (reward: Reward) => {
    if (!profile) {
      toast({
        title: "Error",
        description: "You must be logged in to redeem rewards",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedReward(reward);
    setDialogOpen(true);
  };
  
  const handleConfirmRedeem = () => {
    if (selectedReward) {
      redeemMutation.mutate(selectedReward.id);
      setDialogOpen(false);
    }
  };
  
  if (isLoading || authLoading) {
    return <LoadingState />;
  }
  
  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen bg-[#fdfcf9] flex flex-col font-sassoon">
      <Navbar />
      
      {/* Affiliated Partners Hero Section */}
      <AffiliatedPartners />
      
      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#4a6fa1] mb-4">Rewards Hub</h1>
            <p className="text-xl text-[#707b9b] max-w-2xl mx-auto">
              Redeem your GoodCoins for exciting rewards that encourage and celebrate positive behavior!
            </p>
          </div>
          
          {/* Category Tabs */}
          <CategoryTabs 
            categoryTab={categoryTab} 
            onCategoryChange={setCategoryTab} 
          />
          
          {/* Search and affordability filter bar */}
          <SearchBar
            searchQuery={searchQuery}
            visibilityTab={visibilityTab}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            onVisibilityChange={setVisibilityTab}
            isChild={profile?.role === 'child'}
          />
          
          {/* Rewards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center py-12 text-[#707b9b]">Loading rewards...</div>
            ) : filteredRewards.length > 0 ? (
              filteredRewards.map((reward) => (
                <RewardCard 
                  key={reward.id}
                  reward={reward}
                  isPending={redeemMutation.isPending}
                  isDisabled={profile?.role !== 'child'}
                  currentRewardId={redeemMutation.variables}
                  onRedeemClick={handleRedeemClick}
                />
              ))
            ) : (
              <EmptySearch />
            )}
          </div>
        </div>
      </main>
      
      {/* Redemption Confirmation Dialog */}
      {selectedReward && (
        <RedemptionDialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onConfirm={handleConfirmRedeem}
          rewardName={selectedReward.name}
          goodCoins={selectedReward.goodCoins}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default RewardsHub;
