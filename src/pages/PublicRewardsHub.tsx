
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import { Gift, Star, Award } from 'lucide-react';

// Sample rewards
const sampleRewards = [
  {
    id: '1',
    name: '30 Minutes Extra Screen Time',
    description: 'Earn 30 minutes of additional screen time to be used at your discretion.',
    imageUrl: 'https://placehold.co/400x300/FFD166/073B4C?text=Screen+Time',
    originalPrice: null,
    discountedPrice: null,
    goodCoins: 50
  },
  {
    id: '2',
    name: 'Choose Dinner For The Family',
    description: 'Get to pick what the family has for dinner one night this week.',
    imageUrl: 'https://placehold.co/400x300/06D6A0/073B4C?text=Dinner+Choice',
    originalPrice: null,
    discountedPrice: null,
    goodCoins: 75
  },
  {
    id: '3',
    name: 'Movie Night Selection',
    description: 'Choose the movie for the next family movie night.',
    imageUrl: 'https://placehold.co/400x300/118AB2/FFFFFF?text=Movie+Night',
    originalPrice: null,
    discountedPrice: null,
    goodCoins: 60
  },
  {
    id: '4',
    name: 'Stay Up 30 Minutes Later',
    description: 'Push your bedtime back by 30 minutes for one night.',
    imageUrl: 'https://placehold.co/400x300/EF476F/FFFFFF?text=Late+Night',
    originalPrice: null,
    discountedPrice: null,
    goodCoins: 40
  },
  {
    id: '5',
    name: 'Special Treat',
    description: 'Receive a special dessert or treat of your choice.',
    imageUrl: 'https://placehold.co/400x300/FFD166/073B4C?text=Special+Treat',
    originalPrice: 5.99,
    discountedPrice: 4.99,
    goodCoins: 35
  },
  {
    id: '6',
    name: 'Day Trip Choice',
    description: 'Choose the destination for the next family day trip or outing.',
    imageUrl: 'https://placehold.co/400x300/06D6A0/073B4C?text=Day+Trip',
    originalPrice: null,
    discountedPrice: null,
    goodCoins: 100
  },
  {
    id: '7',
    name: '$10 Gift Card',
    description: 'Redeem for a $10 gift card to your favorite store or online service.',
    imageUrl: 'https://placehold.co/400x300/118AB2/FFFFFF?text=Gift+Card',
    originalPrice: 10.00,
    discountedPrice: 10.00,
    goodCoins: 150
  },
  {
    id: '8',
    name: 'No Chores Day',
    description: 'Get a day off from your regular chores and responsibilities.',
    imageUrl: 'https://placehold.co/400x300/EF476F/FFFFFF?text=No+Chores',
    originalPrice: null,
    discountedPrice: null,
    goodCoins: 80
  }
];

const PublicRewardsHub: React.FC = () => {
  const navigate = useNavigate();

  const rewardCategories = [
    {
      id: 'featured',
      name: 'Featured Rewards',
      icon: <Star className="text-yellow-500" />,
      description: 'Our most popular rewards that children love to redeem.',
      rewards: sampleRewards.slice(0, 4)
    },
    {
      id: 'experience',
      name: 'Experience Rewards',
      icon: <Award className="text-purple-500" />,
      description: 'Special experiences and privileges to enjoy.',
      rewards: sampleRewards.slice(4, 8)
    }
  ];

  return (
    <div className="min-h-screen bg-goodchild-background flex flex-col font-sassoon">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Page header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-goodchild-text-primary mb-4">
              Rewards Hub Demo
            </h1>
            <p className="text-xl text-goodchild-text-secondary max-w-3xl mx-auto">
              Browse sample rewards that children can earn by completing activities and earning GoodCoins.
            </p>
            <div className="mt-6">
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-goodchild-green hover:bg-goodchild-green/90"
              >
                Sign Up to Create Account
              </Button>
              <span className="mx-2 text-goodchild-text-secondary">or</span>
              <Button 
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-goodchild-blue text-goodchild-blue hover:bg-goodchild-blue/10"
              >
                Sign In
              </Button>
            </div>
          </div>
          
          {/* Rewards categories */}
          {rewardCategories.map((category) => (
            <div key={category.id} className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                {category.icon}
                <h2 className="text-2xl font-bold text-goodchild-text-primary">{category.name}</h2>
              </div>
              <p className="text-goodchild-text-secondary mb-6">{category.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.rewards.map((reward) => (
                  <Card key={reward.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={reward.imageUrl} 
                        alt={reward.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-goodchild-blue text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <GoodCoinIcon className="h-4 w-4" />
                        <span>{reward.goodCoins}</span>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{reward.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-goodchild-text-secondary text-sm">
                        {reward.description}
                      </p>
                      
                      {/* Price display if applicable */}
                      {reward.originalPrice && (
                        <div className="mt-4 flex items-center gap-2">
                          {reward.discountedPrice !== reward.originalPrice ? (
                            <>
                              <span className="text-gray-400 line-through">${reward.originalPrice.toFixed(2)}</span>
                              <span className="text-goodchild-green font-bold">${reward.discountedPrice?.toFixed(2)}</span>
                            </>
                          ) : (
                            <span className="text-goodchild-text-primary">${reward.originalPrice.toFixed(2)}</span>
                          )}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('/login')}
                        className="w-full justify-center text-goodchild-blue hover:bg-goodchild-blue/10"
                      >
                        <Gift className="mr-2 h-4 w-4" />
                        Sign In to Redeem
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicRewardsHub;
