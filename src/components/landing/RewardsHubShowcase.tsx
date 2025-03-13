
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

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="md:flex md:items-center md:justify-between mb-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-goodchild-text-primary mb-4">
              Rewards That Matter
            </h2>
            <p className="text-xl text-goodchild-text-secondary mb-6">
              Kids can exchange their earned GoodCoins for meaningful rewards that you approve - from screen time to special outings and more.
            </p>
            <Button className="bg-goodchild-primary hover:bg-goodchild-primary-dark">
              Explore Rewards <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            {rewards.map((reward, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={reward.image} 
                    alt={reward.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-goodchild-text-primary">{reward.name}</h3>
                  <div className="flex items-center mt-2">
                    <GoodCoinIcon className="w-5 h-5 mr-1" />
                    <span className="text-goodchild-primary-dark font-medium">{reward.coins}</span>
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
