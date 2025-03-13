
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import { Lock } from 'lucide-react';
import AffiliatedPartners from '@/components/rewards/AffiliatedPartners';
import EmptySearch from '@/components/rewards/EmptySearch';
import SearchBar from '@/components/rewards/SearchBar';
import CategoryTabs from '@/components/rewards/CategoryTabs';
import RedemptionDialog from '@/components/rewards/RedemptionDialog';
import RewardCard from '@/components/rewards/RewardCard';

// Import extensive reward data
import { cityRewards, dailyStuffRewards, brandExclusiveRewards, experienceRewards } from '@/data/rewardsData';

const PublicRewardsHub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [visibilityTab, setVisibilityTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('city');
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRedemptionConfirm = () => {
    if (selectedReward?.externalUrl) {
      window.open(selectedReward.externalUrl, '_blank');
    }
    setDialogOpen(false);
  };

  const handleRedeemClick = (reward: any) => {
    setSelectedReward(reward);
    setDialogOpen(true);
  };
  
  const getCategoryRewards = () => {
    switch (selectedCategory) {
      case 'city':
        return cityRewards;
      case 'daily':
        return dailyStuffRewards;
      case 'brand':
        return brandExclusiveRewards;
      case 'experience':
        return experienceRewards;
      default:
        return cityRewards;
    }
  };
  
  const filteredRewards = getCategoryRewards().filter(reward => {
    const matchesSearch = 
      reward.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      reward.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#e8f0fe] flex flex-col font-sassoon">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-[#4a6fa1] mb-4">
              Rewards Hub Preview
            </h1>
            <p className="text-xl text-[#85c1e9] max-w-3xl mx-auto">
              Browse sample rewards your children can earn by completing activities. Create an account to manage and customize rewards.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-[#aed6f1] hover:bg-[#85c1e9] text-[#4a6fa1]">Create Your Account</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="border-[#aed6f1] text-[#4a6fa1]">Log In</Button>
              </Link>
            </div>
          </div>
          
          <AffiliatedPartners />
          
          <CategoryTabs selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
          
          <SearchBar 
            searchQuery={searchQuery}
            visibilityTab={visibilityTab}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            onVisibilityChange={setVisibilityTab}
            isChild={false}
          />
          
          {filteredRewards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {filteredRewards.map((reward) => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  isPending={false}
                  isDisabled={true}
                  onRedeemClick={handleRedeemClick}
                />
              ))}
            </div>
          ) : (
            <EmptySearch />
          )}
          
          <div className="bg-[#f8c291] border border-[#f5b880] rounded-lg p-6 text-center mb-8">
            <h2 className="text-xl font-semibold mb-2 text-[#4a6fa1]">This is a Preview</h2>
            <p className="mb-4 text-[#4a6fa1]">
              Create an account to let your children earn GoodCoins and redeem them for real rewards.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button className="bg-[#aed6f1] hover:bg-[#85c1e9] text-[#4a6fa1]">Create Account</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-[#aed6f1] text-[#4a6fa1]">Log In</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      {selectedReward && (
        <RedemptionDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          reward={selectedReward}
          onConfirm={handleRedemptionConfirm}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default PublicRewardsHub;
