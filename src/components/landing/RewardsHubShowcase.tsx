
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import GoodCoinIcon from '@/components/GoodCoinIcon';

const RewardsHubShowcase: React.FC = () => {
  const rewards = [
    {
      name: "Music Festival Tickets",
      coins: 500,
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    },
    {
      name: "Art Supplies Kit",
      coins: 250,
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1741&q=80"
    },
    {
      name: "Children's Book Bundle",
      coins: 200,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1798&q=80"
    },
    {
      name: "Movie Theater Passes",
      coins: 300,
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    }
  ];

  const fallbackImageUrl = "https://placehold.co/400x300/FFC2E9/FFFFFF?text=Reward";

  return (
    <section className="py-16 bg-gradient-to-b from-[#B8A9FA] to-[#91EBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="md:flex md:items-center md:justify-between mb-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-white mb-4 font-['Nunito',_sans-serif]">
              Rewards That Matter
            </h2>
            <p className="text-xl text-white/90 mb-6 font-['Nunito',_sans-serif]">
              Kids can exchange their earned GoodCoins for meaningful rewards that you approve - from screen time to special outings and more.
            </p>
            <Button className="bg-[#FF85E2] hover:bg-[#FF59D6] text-white font-['Nunito',_sans-serif]">
              Explore Rewards <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            {rewards.map((reward, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-[#FF85E2]">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={reward.image} 
                    alt={reward.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackImageUrl;
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white font-['Nunito',_sans-serif]">{reward.name}</h3>
                  <div className="flex items-center mt-2">
                    <GoodCoinIcon className="w-5 h-5 mr-1 text-yellow-300" />
                    <span className="text-yellow-300 font-medium">{reward.coins}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RewardsHubShowcase;
