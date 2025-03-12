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

const sampleRewards = [
  {
    id: '1',
    name: '30 Minutes Extra Screen Time',
    description: 'Earn 30 minutes of additional screen time to be used at your discretion.',
    imageUrl: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=600&h=400&fit=crop',
    goodCoins: 50,
    originalPrice: null,
    discountedPrice: null,
    category: 'inYourCity',
    externalUrl: 'https://example.com/reward/1'
  },
  {
    id: '2',
    name: 'Choose Dinner For The Family',
    description: 'Get to pick what the family has for dinner one night this week.',
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop',
    goodCoins: 75,
    originalPrice: null,
    discountedPrice: null,
    category: 'dailyStuff',
    externalUrl: 'https://example.com/reward/2'
  },
  {
    id: '3',
    name: 'Movie Night Selection',
    description: 'Choose the movie for the next family movie night.',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop',
    goodCoins: 60,
    originalPrice: null,
    discountedPrice: null,
    category: 'brandExclusives',
    externalUrl: 'https://example.com/reward/3'
  },
  {
    id: '4',
    name: 'Stay Up 30 Minutes Later',
    description: 'Push your bedtime back by 30 minutes for one night.',
    imageUrl: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=600&h=400&fit=crop',
    goodCoins: 40,
    originalPrice: null,
    discountedPrice: null,
    category: 'experiences',
    externalUrl: 'https://example.com/reward/4'
  },
  {
    id: '5',
    name: 'Special Treat',
    description: 'Receive a special dessert or treat of your choice.',
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=400&fit=crop',
    goodCoins: 35,
    originalPrice: 5.99,
    discountedPrice: 4.99,
    category: 'inYourCity',
    externalUrl: 'https://example.com/reward/5'
  },
  {
    id: '6',
    name: 'Day Trip Choice',
    description: 'Choose the destination for the next family day trip or outing.',
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop',
    goodCoins: 100,
    originalPrice: null,
    discountedPrice: null,
    category: 'dailyStuff',
    externalUrl: 'https://example.com/reward/6'
  },
  {
    id: '7',
    name: '$10 Gift Card',
    description: 'Redeem for a $10 gift card to your favorite store or online service.',
    imageUrl: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=600&h=400&fit=crop',
    goodCoins: 150,
    originalPrice: 10.00,
    discountedPrice: 10.00,
    category: 'brandExclusives',
    externalUrl: 'https://example.com/reward/7'
  },
  {
    id: '8',
    name: 'No Chores Day',
    description: 'Get a day off from your regular chores and responsibilities.',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
    goodCoins: 80,
    originalPrice: null,
    discountedPrice: null,
    category: 'experiences',
    externalUrl: 'https://example.com/reward/8'
  }
];

const categoryMap = {
  city: ['1', '5'],
  daily: ['2', '6'],
  brand: ['3', '7'],
  experience: ['4', '8'],
};

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
  
  const filteredRewards = sampleRewards.filter(reward => {
    const matchesSearch = 
      reward.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      reward.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryMap[selectedCategory as keyof typeof categoryMap]?.includes(reward.id);
    
    return matchesSearch && matchesCategory;
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
