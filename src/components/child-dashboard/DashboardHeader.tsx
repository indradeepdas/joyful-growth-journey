
import React from 'react';
import { ChildData } from '@/services/types';
import GoodCoinIcon from '@/components/GoodCoinIcon';

interface DashboardHeaderProps {
  child: ChildData;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ child }) => {
  return (
    <div className="glass-card p-6 rounded-xl mb-6 text-center">
      <h1 className="text-4xl font-bold text-gradient mb-2">My Dashboard!</h1>
      <p className="text-xl text-goodchild-text-secondary mb-4">Welcome back, {child.nickname || child.name}!</p>
      
      {/* GoodCoin Balance */}
      <div className="good-coin-display animate-float mb-4 inline-block">
        <div className="bg-goodchild-card p-4 rounded-full flex items-center gap-2 shadow-glow">
          <GoodCoinIcon className="w-8 h-8" />
          <span className="text-2xl font-bold">{child.goodCoins} GoodCoins</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
