
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GoodCoinIcon from '@/components/GoodCoinIcon';

const RewardsHubShowcase = () => {
  return (
    <section className="w-full py-16 px-4 bg-goodchild-background-alt">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-goodchild-text-primary mb-4">
            Unlock Exciting Rewards
          </h2>
          <p className="text-goodchild-text-secondary max-w-2xl mx-auto">
            Children can redeem their earned GoodCoins for meaningful rewards that encourage further positive behavior.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
          <div className="glass-card p-6 rounded-xl max-w-xs w-full text-center">
            <div className="h-48 mb-4 overflow-hidden rounded-lg">
              <img 
                src="https://m.media-amazon.com/images/I/81aJ-R4E6gL._AC_UF1000,1000_QL80_.jpg" 
                alt="LEGO Building Set" 
                className="w-full h-full object-cover" 
              />
            </div>
            <h3 className="text-xl font-medium mb-1">LEGO Building Set</h3>
            <div className="flex items-center justify-center gap-2 mb-2">
              <GoodCoinIcon className="w-5 h-5" />
              <span className="font-bold">50 GoodCoins</span>
            </div>
            <p className="text-goodchild-text-secondary text-sm">
              <span className="line-through">$24.99</span> → <span className="font-bold">$19.99</span>
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl max-w-xs w-full text-center">
            <div className="h-48 mb-4 overflow-hidden rounded-lg">
              <img 
                src="https://m.media-amazon.com/images/I/71WvL7H4jiL._AC_UF1000,1000_QL80_.jpg" 
                alt="Art Supplies Kit" 
                className="w-full h-full object-cover" 
              />
            </div>
            <h3 className="text-xl font-medium mb-1">Art Supplies Kit</h3>
            <div className="flex items-center justify-center gap-2 mb-2">
              <GoodCoinIcon className="w-5 h-5" />
              <span className="font-bold">40 GoodCoins</span>
            </div>
            <p className="text-goodchild-text-secondary text-sm">
              <span className="line-through">$19.99</span> → <span className="font-bold">$15.99</span>
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl max-w-xs w-full text-center">
            <div className="h-48 mb-4 overflow-hidden rounded-lg">
              <img 
                src="https://images.prismic.io/bookriot/89e252d9-5823-43fb-9b28-ae6ab8dbe9da_childrens+book+bundle.jpg?auto=compress,format" 
                alt="Children's Book Bundle" 
                className="w-full h-full object-cover" 
              />
            </div>
            <h3 className="text-xl font-medium mb-1">Children's Book Bundle</h3>
            <div className="flex items-center justify-center gap-2 mb-2">
              <GoodCoinIcon className="w-5 h-5" />
              <span className="font-bold">60 GoodCoins</span>
            </div>
            <p className="text-goodchild-text-secondary text-sm">
              <span className="line-through">$29.99</span> → <span className="font-bold">$23.99</span>
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/rewards">
            <Button size="lg">
              Visit Rewards Hub
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RewardsHubShowcase;
