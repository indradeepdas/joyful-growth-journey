
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import { Lock } from 'lucide-react';

// Sample rewards for demonstration
const sampleRewards = [
  {
    id: '1',
    name: '30 Minutes Extra Screen Time',
    description: 'Earn 30 minutes of additional screen time to be used at your discretion.',
    goodCoins: 50,
    imageUrl: 'https://placehold.co/400x300/FFD166/073B4C?text=Screen+Time',
    originalPrice: 0,
    discountedPrice: 0,
  },
  {
    id: '2',
    name: 'Choose Dinner For The Family',
    description: 'Get to pick what the family has for dinner one night this week.',
    goodCoins: 75,
    imageUrl: 'https://placehold.co/400x300/06D6A0/073B4C?text=Dinner+Choice',
    originalPrice: 0,
    discountedPrice: 0,
  },
  {
    id: '3',
    name: 'Movie Night Selection',
    description: 'Choose the movie for the next family movie night.',
    goodCoins: 60,
    imageUrl: 'https://placehold.co/400x300/118AB2/FFFFFF?text=Movie+Night',
    originalPrice: 0,
    discountedPrice: 0,
  },
  {
    id: '4',
    name: 'Stay Up 30 Minutes Later',
    description: 'Push your bedtime back by 30 minutes for one night.',
    goodCoins: 40,
    imageUrl: 'https://placehold.co/400x300/EF476F/FFFFFF?text=Late+Night',
    originalPrice: 0,
    discountedPrice: 0,
  },
  {
    id: '5',
    name: 'Special Treat',
    description: 'Receive a special dessert or treat of your choice.',
    goodCoins: 35,
    imageUrl: 'https://placehold.co/400x300/FFD166/073B4C?text=Special+Treat',
    originalPrice: 5.99,
    discountedPrice: 4.99,
  },
  {
    id: '6',
    name: 'Day Trip Choice',
    description: 'Choose the destination for the next family day trip or outing.',
    goodCoins: 100,
    imageUrl: 'https://placehold.co/400x300/06D6A0/073B4C?text=Day+Trip',
    originalPrice: 0,
    discountedPrice: 0,
  },
  {
    id: '7',
    name: '$10 Gift Card',
    description: 'Redeem for a $10 gift card to your favorite store or online service.',
    goodCoins: 150,
    imageUrl: 'https://placehold.co/400x300/118AB2/FFFFFF?text=Gift+Card',
    originalPrice: 10.00,
    discountedPrice: 10.00,
  },
  {
    id: '8',
    name: 'No Chores Day',
    description: 'Get a day off from your regular chores and responsibilities.',
    goodCoins: 80,
    imageUrl: 'https://placehold.co/400x300/EF476F/FFFFFF?text=No+Chores',
    originalPrice: 0,
    discountedPrice: 0,
  },
];

const PublicRewardsHub: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-goodchild-background flex flex-col font-sassoon">
      <Navbar />
      
      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-goodchild-text-primary mb-4">Rewards Hub</h1>
            <p className="text-xl text-goodchild-text-secondary max-w-2xl mx-auto">
              Redeem your GoodCoins for exciting rewards that encourage and celebrate positive behavior!
              <span className="block mt-2 text-goodchild-blue">
                Sign in to earn GoodCoins and redeem rewards!
              </span>
            </p>
          </div>
          
          {/* Lock overlay for visitor view */}
          <div className="relative">
            <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-xl">
              <div className="bg-white/80 p-6 rounded-xl text-center max-w-md">
                <Lock className="mx-auto h-12 w-12 text-goodchild-blue mb-3" />
                <h2 className="text-xl font-bold mb-2">Sign In to Redeem Rewards</h2>
                <p className="text-goodchild-text-secondary mb-4">
                  Create an account or sign in to earn GoodCoins and redeem them for these exciting rewards.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => navigate('/login')}>
                    Sign In
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/signup')}>
                    Create Account
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Rewards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 opacity-80">
              {sampleRewards.map((reward) => (
                <Card key={reward.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img
                      src={reward.imageUrl}
                      alt={reward.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{reward.name}</CardTitle>
                    <p className="text-goodchild-text-secondary">{reward.description}</p>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <GoodCoinIcon className="h-5 w-5" />
                      <span className="font-bold text-lg">{reward.goodCoins} GoodCoins</span>
                    </div>
                    {reward.originalPrice > 0 && (
                      <p className="text-sm text-goodchild-text-secondary">
                        <span className="line-through">${reward.originalPrice.toFixed(2)}</span>
                        {reward.discountedPrice < reward.originalPrice && (
                          <span className="ml-1 font-medium text-goodchild-green">
                            ${reward.discountedPrice.toFixed(2)}
                          </span>
                        )}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => navigate('/login')}
                    >
                      Sign In to Redeem
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicRewardsHub;
