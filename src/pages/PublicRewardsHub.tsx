
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import { Lock, Tag } from 'lucide-react';
import AffiliatedPartners from '@/components/rewards/AffiliatedPartners';
import EmptySearch from '@/components/rewards/EmptySearch';
import SearchBar from '@/components/rewards/SearchBar';
import CategoryTabs from '@/components/rewards/CategoryTabs';
import RedemptionDialog from '@/components/rewards/RedemptionDialog';

// Sample category distribution for rewards
const categoryMap = {
  inYourCity: ['1', '5'],
  dailyStuff: ['2', '6'],
  brandExclusives: ['3', '7'],
  experiences: ['4', '8'],
};

// Sample rewards with real images for preview
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

const PublicRewardsHub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [visibilityTab, setVisibilityTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('inYourCity');
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Handle redemption confirmation
  const handleRedemptionConfirm = () => {
    if (selectedReward?.externalUrl) {
      window.open(selectedReward.externalUrl, '_blank');
    }
    setDialogOpen(false);
  };

  // Handle redeem button click
  const handleRedeemClick = (reward: any) => {
    setSelectedReward(reward);
    setDialogOpen(true);
  };
  
  // Filter and sort rewards
  const filteredRewards = sampleRewards.filter(reward => {
    // Filter by search query
    const matchesSearch = 
      reward.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      reward.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = categoryMap[selectedCategory as keyof typeof categoryMap]?.includes(reward.id);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#e8f0fe] flex flex-col font-sassoon">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Page header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-[#4a6fa1] mb-4">
              Rewards Hub Preview
            </h1>
            <p className="text-xl text-[#85c1e9] max-w-3xl mx-auto">
              Browse sample rewards your children can earn by completing activities. Create an account to manage and customize rewards.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-[#f8c291] hover:bg-[#f5b880]">Create Your Account</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="border-[#aed6f1] text-[#4a6fa1]">Log In</Button>
              </Link>
            </div>
          </div>
          
          {/* Affiliated Partners */}
          <AffiliatedPartners />
          
          {/* Category Tabs */}
          <CategoryTabs selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
          
          {/* Search & sort bar */}
          <SearchBar 
            searchQuery={searchQuery}
            visibilityTab={visibilityTab}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            onVisibilityChange={setVisibilityTab}
            isChild={false}
          />
          
          {/* Rewards grid with improved alignment */}
          {filteredRewards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {filteredRewards.map((reward) => (
                <Card 
                  key={reward.id} 
                  className="overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full border-[#aed6f1]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={reward.imageUrl}
                      alt={reward.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-[#f8c291] text-[#4a6fa1] px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <GoodCoinIcon className="h-4 w-4" />
                      <span>{reward.goodCoins}</span>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl line-clamp-1 text-[#4a6fa1]">{reward.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-[#85c1e9] line-clamp-3 mb-4">
                      {reward.description}
                    </p>
                    
                    {(reward.originalPrice || reward.discountedPrice) && (
                      <div className="flex items-center gap-2 mt-3">
                        <Tag size={16} className="text-[#85c1e9]" />
                        {reward.originalPrice !== reward.discountedPrice && reward.originalPrice && (
                          <span className="text-[#85c1e9] line-through">${reward.originalPrice.toFixed(2)}</span>
                        )}
                        {reward.discountedPrice && (
                          <span className="font-medium text-[#4a6fa1]">${reward.discountedPrice.toFixed(2)}</span>
                        )}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0 mt-auto">
                    <Button 
                      className="w-full bg-[#f8c291] hover:bg-[#f5b880] text-[#4a6fa1]"
                      onClick={() => handleRedeemClick(reward)}
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Log in to Redeem
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <EmptySearch />
          )}
          
          {/* Preview Features Disclaimer */}
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
      
      {/* Redemption Confirmation Dialog */}
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
