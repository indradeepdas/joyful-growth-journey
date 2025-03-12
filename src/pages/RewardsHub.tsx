
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, AlertCircle, CheckCircle, MapPin, Clock, Tag, Star } from 'lucide-react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Reward } from '@/types';
import { adaptSupabaseReward } from '@/utils/typeAdapters';
import { SupabaseReward } from '@/services/types';
import AffiliatedPartners from '@/components/rewards/AffiliatedPartners';
import RedemptionDialog from '@/components/rewards/RedemptionDialog';

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
      // This is where you would implement the redirection to a third-party website
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
    return (
      <div className="min-h-screen bg-[#fdfcf9] flex flex-col font-sassoon">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-xl text-[#4a6fa1]">Loading Rewards...</div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-[#fdfcf9] flex flex-col font-sassoon">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <AlertCircle className="h-12 w-12 text-[#e76b74] mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-[#4a6fa1]">Error Loading Rewards</h2>
            <p className="text-[#707b9b] mb-4">
              {error instanceof Error ? error.message : 'An unexpected error occurred'}
            </p>
            <Button onClick={() => window.location.reload()} className="bg-[#94c5cc] hover:bg-[#7db0b7]">
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfcf9] flex flex-col font-sassoon">
      <Navbar />
      
      {/* New: Affiliated Partners Hero Section */}
      <AffiliatedPartners />
      
      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#4a6fa1] mb-4">Rewards Hub</h1>
            <p className="text-xl text-[#707b9b] max-w-2xl mx-auto">
              Redeem your GoodCoins for exciting rewards that encourage and celebrate positive behavior!
            </p>
          </div>
          
          {/* Category Tabs - New */}
          <div className="mb-8">
            <Tabs value={categoryTab} onValueChange={setCategoryTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto bg-[#e8eef8]">
                <TabsTrigger value="city" className="text-[#4a6fa1] flex items-center gap-2 data-[state=active]:bg-[#bdd0e8]">
                  <MapPin className="h-4 w-4" />
                  <span className="hidden sm:inline">In Your City</span>
                </TabsTrigger>
                <TabsTrigger value="daily" className="text-[#4a6fa1] flex items-center gap-2 data-[state=active]:bg-[#bdd0e8]">
                  <Clock className="h-4 w-4" />
                  <span className="hidden sm:inline">Daily Stuff</span>
                </TabsTrigger>
                <TabsTrigger value="brand" className="text-[#4a6fa1] flex items-center gap-2 data-[state=active]:bg-[#bdd0e8]">
                  <Tag className="h-4 w-4" />
                  <span className="hidden sm:inline">Brand Exclusives</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="text-[#4a6fa1] flex items-center gap-2 data-[state=active]:bg-[#bdd0e8]">
                  <Star className="h-4 w-4" />
                  <span className="hidden sm:inline">Experiences</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Search and affordability filter bar */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-auto flex-1 md:max-w-md">
              <Input
                type="text"
                placeholder="Search rewards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#bdd0e8] text-[#4a6fa1]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#707b9b] h-4 w-4" />
            </div>
            
            <Tabs value={visibilityTab} onValueChange={setVisibilityTab} className="w-full md:w-auto">
              <TabsList className="bg-[#e8eef8]">
                <TabsTrigger value="all" className="text-[#4a6fa1] data-[state=active]:bg-[#bdd0e8]">All Rewards</TabsTrigger>
                {profile?.role === 'child' && (
                  <TabsTrigger value="affordable" className="text-[#4a6fa1] data-[state=active]:bg-[#bdd0e8]">I Can Afford</TabsTrigger>
                )}
              </TabsList>
            </Tabs>
          </div>
          
          {/* Rewards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center py-12 text-[#707b9b]">Loading rewards...</div>
            ) : filteredRewards.length > 0 ? (
              filteredRewards.map((reward) => (
                <Card key={reward.id} className="overflow-hidden hover:shadow-md transition-shadow bg-white border-[#bdd0e8]">
                  <div className="h-48 overflow-hidden bg-[#e8eef8]">
                    <img
                      src={reward.imageUrl || "https://placehold.co/400x300/e8eef8/4a6fa1?text=Reward"}
                      alt={reward.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-[#4a6fa1]">{reward.name}</CardTitle>
                    <CardDescription className="text-[#707b9b]">{reward.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <GoodCoinIcon className="h-5 w-5" />
                      <span className="font-bold text-lg text-[#f6b961]">{reward.goodCoins} GoodCoins</span>
                    </div>
                    {reward.originalPrice && (
                      <p className="text-sm text-[#707b9b]">
                        <span className="line-through">${reward.originalPrice.toFixed(2)}</span>
                        {reward.discountedPrice && (
                          <span className="ml-1 font-medium text-[#6eb87a]">
                            ${reward.discountedPrice.toFixed(2)}
                          </span>
                        )}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleRedeemClick(reward)} 
                      className="w-full bg-[#94c5cc] hover:bg-[#7db0b7] text-white"
                      disabled={profile?.role !== 'child' || redeemMutation?.isPending}
                    >
                      {redeemMutation?.isPending && redeemMutation.variables === reward.id 
                        ? "Redeeming..." 
                        : "Redeem Now"}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="mb-4">
                  <Search className="h-12 w-12 mx-auto text-[#707b9b] opacity-60" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-[#4a6fa1]">No rewards found</h3>
                <p className="text-[#707b9b]">
                  Try adjusting your search or check back later for new rewards.
                </p>
              </div>
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
