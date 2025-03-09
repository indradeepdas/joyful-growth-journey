
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import { Search, Lock, Tag } from 'lucide-react';

// Sample rewards with real images for preview
const sampleRewards = [
  {
    id: '1',
    name: '30 Minutes Extra Screen Time',
    description: 'Earn 30 minutes of additional screen time to be used at your discretion.',
    imageUrl: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=600&h=400&fit=crop',
    goodCoins: 50,
    originalPrice: null,
    discountedPrice: null
  },
  {
    id: '2',
    name: 'Choose Dinner For The Family',
    description: 'Get to pick what the family has for dinner one night this week.',
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop',
    goodCoins: 75,
    originalPrice: null,
    discountedPrice: null
  },
  {
    id: '3',
    name: 'Movie Night Selection',
    description: 'Choose the movie for the next family movie night.',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop',
    goodCoins: 60,
    originalPrice: null,
    discountedPrice: null
  },
  {
    id: '4',
    name: 'Stay Up 30 Minutes Later',
    description: 'Push your bedtime back by 30 minutes for one night.',
    imageUrl: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=600&h=400&fit=crop',
    goodCoins: 40,
    originalPrice: null,
    discountedPrice: null
  },
  {
    id: '5',
    name: 'Special Treat',
    description: 'Receive a special dessert or treat of your choice.',
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=400&fit=crop',
    goodCoins: 35,
    originalPrice: 5.99,
    discountedPrice: 4.99
  },
  {
    id: '6',
    name: 'Day Trip Choice',
    description: 'Choose the destination for the next family day trip or outing.',
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop',
    goodCoins: 100,
    originalPrice: null,
    discountedPrice: null
  },
  {
    id: '7',
    name: '$10 Gift Card',
    description: 'Redeem for a $10 gift card to your favorite store or online service.',
    imageUrl: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=600&h=400&fit=crop',
    goodCoins: 150,
    originalPrice: 10.00,
    discountedPrice: 10.00
  },
  {
    id: '8',
    name: 'No Chores Day',
    description: 'Get a day off from your regular chores and responsibilities.',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
    goodCoins: 80,
    originalPrice: null,
    discountedPrice: null
  }
];

const PublicRewardsHub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
  // Filter and sort rewards
  const filteredRewards = sampleRewards.filter(reward => {
    // Filter by search query
    const matchesSearch = 
      reward.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      reward.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  }).sort((a, b) => {
    // Sort based on selected sort option
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'priceAsc':
        return a.goodCoins - b.goodCoins;
      case 'priceDesc':
        return b.goodCoins - a.goodCoins;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-goodchild-background flex flex-col font-sassoon">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Page header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-goodchild-text-primary mb-4">
              Rewards Hub Preview
            </h1>
            <p className="text-xl text-goodchild-text-secondary max-w-3xl mx-auto">
              Browse sample rewards your children can earn by completing activities. Create an account to manage and customize rewards.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-[#FFA500] hover:bg-[#E69500]">Create Your Account</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">Log In</Button>
              </Link>
            </div>
          </div>
          
          {/* Search & sort bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search rewards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-goodchild-text-secondary h-4 w-4" />
            </div>
            
            <div className="flex gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                  <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Rewards grid with improved alignment */}
          {filteredRewards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {filteredRewards.map((reward) => (
                <Card 
                  key={reward.id} 
                  className="overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={reward.imageUrl}
                      alt={reward.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <GoodCoinIcon className="h-4 w-4" />
                      <span>{reward.goodCoins}</span>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl line-clamp-1">{reward.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-goodchild-text-secondary line-clamp-3 mb-4">
                      {reward.description}
                    </p>
                    
                    {(reward.originalPrice || reward.discountedPrice) && (
                      <div className="flex items-center gap-2 mt-3">
                        <Tag size={16} className="text-gray-500" />
                        {reward.originalPrice !== reward.discountedPrice && reward.originalPrice && (
                          <span className="text-gray-500 line-through">${reward.originalPrice.toFixed(2)}</span>
                        )}
                        {reward.discountedPrice && (
                          <span className="font-medium">${reward.discountedPrice.toFixed(2)}</span>
                        )}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0 mt-auto">
                    <Button 
                      className="w-full bg-[#FFA500] hover:bg-[#E69500]"
                      onClick={() => window.location.href = '/login'}
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Log in to Redeem
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4">
                <Search className="h-12 w-12 mx-auto text-goodchild-text-secondary opacity-60" />
              </div>
              <h3 className="text-xl font-medium mb-2">No rewards found</h3>
              <p className="text-goodchild-text-secondary mb-4">
                Try adjusting your search criteria.
              </p>
            </div>
          )}
          
          {/* Preview Features Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center mb-8">
            <h2 className="text-xl font-semibold mb-2">This is a Preview</h2>
            <p className="mb-4">
              Create an account to let your children earn GoodCoins and redeem them for real rewards.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button className="bg-[#FFA500] hover:bg-[#E69500]">Create Account</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline">Log In</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicRewardsHub;
