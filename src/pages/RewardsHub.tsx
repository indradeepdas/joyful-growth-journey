
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { REWARDS } from '@/services/mockData';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Wallet, ShieldAlert } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RewardsHub: React.FC = () => {
  const { user, isAuthenticated, getChildData } = useAuth();
  const [goodCoins, setGoodCoins] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated && user?.role === 'child') {
      const childData = getChildData();
      if (childData) {
        setGoodCoins(childData.goodCoins);
      }
    } else {
      // For demo/guests, show a default balance
      setGoodCoins(250);
    }
  }, [isAuthenticated, user, getChildData]);

  const handleRedeem = (reward: typeof REWARDS[0]) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to redeem rewards.",
        variant: "destructive",
      });
      return;
    }

    if (user?.role !== 'child') {
      toast({
        title: "Child Account Required",
        description: "Only children can redeem rewards.",
        variant: "destructive",
      });
      return;
    }

    if (goodCoins !== null && goodCoins < reward.goodCoins) {
      toast({
        title: "Not Enough GoodCoins",
        description: `You need ${reward.goodCoins - goodCoins} more GoodCoins to redeem this reward.`,
        variant: "destructive",
      });
      return;
    }

    // Simulate successful redemption
    toast({
      title: "Reward Redeemed!",
      description: `You've successfully redeemed ${reward.name}. Your parent will be notified.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-goodchild-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-goodchild-blue/10 to-white py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-goodchild-text-primary animate-slide-down">
              Your Rewards Hub!
            </h1>
            <p className="text-xl text-goodchild-text-secondary max-w-2xl mx-auto mb-8 animate-slide-up">
              Earn GoodCoins and get awesome rewards!
            </p>
            <div className="relative w-32 h-32 mx-auto mb-8 animate-float">
              <img 
                src="https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=2069&auto=format&fit=crop" 
                alt="Treasure chest" 
                className="w-full h-full object-cover rounded-xl shadow-glow"
              />
            </div>
          </div>
        </section>
        
        {/* GoodCoin Balance (Fixed Position) */}
        <div className="fixed bottom-6 right-6 z-10">
          <div className="bg-white shadow-medium rounded-full py-3 px-5 flex items-center gap-3 animate-pulse-gentle">
            <GoodCoinIcon size="lg" animated />
            <div className="flex flex-col">
              <span className="text-xs text-goodchild-text-secondary">Your Balance</span>
              <span className="text-lg font-bold text-goodchild-text-primary">
                {goodCoins !== null ? goodCoins : '...'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Rewards Grid */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center text-goodchild-text-primary">
              Available Rewards
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {REWARDS.map((reward) => (
                <div 
                  key={reward.id}
                  className="bg-white rounded-2xl shadow-soft overflow-hidden transition-transform duration-300 hover:shadow-medium hover:-translate-y-1"
                >
                  <div className="relative w-full h-48">
                    <img 
                      src={reward.imageUrl} 
                      alt={reward.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-goodchild-yellow/90 text-goodchild-text-primary font-bold px-3 py-1 rounded-full text-sm">
                      Discount!
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-goodchild-text-primary mb-2">
                      {reward.name}
                    </h3>
                    <p className="text-goodchild-text-secondary text-sm mb-4 line-clamp-2">
                      {reward.description}
                    </p>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="flex flex-col">
                          <span className="text-sm text-goodchild-text-secondary line-through">
                            ${reward.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-xl font-bold text-goodchild-blue">
                            ${reward.discountedPrice.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center mt-2">
                          <GoodCoinIcon className="mr-1" />
                          <span className="font-bold">{reward.goodCoins}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleRedeem(reward)}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        Redeem
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-goodchild-blue/10 py-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-goodchild-text-primary">
              Start earning GoodCoins today!
            </h2>
            <p className="text-goodchild-text-secondary mb-8">
              Complete activities, learn new skills, and earn rewards with GoodCoins.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="#" className="btn-primary inline-flex items-center gap-2">
                <Wallet size={18} />
                <span>View Activities</span>
              </a>
              <a href="#" className="btn-outline inline-flex items-center gap-2">
                <ShieldAlert size={18} />
                <span>How it Works</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default RewardsHub;
