
import React, { useState, useEffect } from 'react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import { Reward } from '@/types';
import { rewardsService } from '@/services/rewardsService';
import { SearchBar } from '@/components/rewards/SearchBar';
import { CategoryTabs } from '@/components/rewards/CategoryTabs';
import { RewardCard } from '@/components/rewards/RewardCard';
import { RedemptionDialog } from '@/components/rewards/RedemptionDialog';
import { LoadingState } from '@/components/rewards/LoadingState';
import { ErrorState } from '@/components/rewards/ErrorState';
import { EmptySearch } from '@/components/rewards/EmptySearch';
import { AffiliatedPartners } from '@/components/rewards/AffiliatedPartners';

const RewardsHub = () => {
  const { profile } = useSupabaseAuth();
  const navigate = useNavigate();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [filteredRewards, setFilteredRewards] = useState<Reward[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    if (!profile) {
      navigate('/login');
      return;
    }
    
    const fetchRewards = async () => {
      setIsLoading(true);
      try {
        let rewardsData: Reward[];
        
        if (profile.role === 'child') {
          rewardsData = await rewardsService.getRewardsForChild(profile.id);
        } else {
          rewardsData = await rewardsService.getAllRewards();
        }
        
        setRewards(rewardsData);
        setFilteredRewards(rewardsData);
      } catch (err) {
        console.error("Failed to fetch rewards:", err);
        setError("Failed to load rewards. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRewards();
  }, [profile, navigate]);
  
  useEffect(() => {
    if (rewards.length === 0) return;
    
    const filtered = rewards.filter(reward => {
      const matchesSearch = 
        searchQuery === '' || 
        reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reward.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesCategory = 
        selectedCategory === 'All' || 
        reward.category === selectedCategory;
        
      return matchesSearch && matchesCategory;
    });
    
    setFilteredRewards(filtered);
  }, [searchQuery, selectedCategory, rewards]);
  
  const handleRedeemClick = (reward: Reward) => {
    setSelectedReward(reward);
    setOpen(true);
  };
  
  const handleConfirmRedemption = async () => {
    if (!selectedReward || !profile) return;
    
    try {
      await rewardsService.redeemReward(profile.id, selectedReward.id);
      
      // Update the local rewards state with updated GoodCoins balance
      setRewards(prevRewards => 
        prevRewards.map(r => r.id === selectedReward.id ? {
          ...r,
          redeemed: true
        } : r)
      );
      
      setOpen(false);
      setSelectedReward(null);
      
      // Show success message
      // toast.success(`Successfully redeemed ${selectedReward.name}!`);
    } catch (err) {
      console.error("Failed to redeem reward:", err);
      // toast.error("Failed to redeem the reward. Please try again.");
    }
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  
  const categories = ['All', ...new Set(rewards.map(reward => reward.category))];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-100 pb-12">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Rewards Hub</h1>
          <p className="text-gray-600">
            Redeem your GoodCoins for exciting rewards. Collect and save up for bigger rewards!
          </p>
        </div>
        
        {/* Balance Display for Child Users */}
        {profile && profile.role === 'child' && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex justify-between items-center">
            <div>
              <p className="text-gray-600">Your GoodCoins Balance</p>
              <p className="text-2xl font-bold text-gray-800">{profile.goodcoins_balance}</p>
            </div>
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-yellow-400">
              <span className="text-xl font-bold">🪙</span>
            </div>
          </div>
        )}
        
        <div className="flex flex-col space-y-6">
          {/* Search Bar */}
          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
          
          {/* Category Tabs */}
          <CategoryTabs 
            activeTab={selectedCategory}
            setActiveTab={setSelectedCategory}
            categories={categories}
          />
        </div>
        
        {/* Rewards Grid */}
        {filteredRewards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {filteredRewards.map(reward => (
              <RewardCard
                key={reward.id}
                reward={reward}
                onRedeemClick={() => handleRedeemClick(reward)}
                isAffordable={profile?.goodcoins_balance >= reward.cost}
                isChild={profile?.role === 'child'}
              />
            ))}
          </div>
        ) : (
          <EmptySearch searchQuery={searchQuery} onClear={() => setSearchQuery('')} />
        )}
        
        {/* Redemption Dialog */}
        {selectedReward && (
          <RedemptionDialog 
            open={open}
            onOpenChange={setOpen}
            reward={selectedReward}
            onConfirm={handleConfirmRedemption}
          />
        )}
        
        {/* Partners Section */}
        <AffiliatedPartners />
      </div>
    </div>
  );
};

export default RewardsHub;
