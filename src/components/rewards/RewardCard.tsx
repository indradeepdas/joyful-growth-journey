
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import { Reward } from '@/types';

interface RewardCardProps {
  reward: Reward;
  isPending: boolean;
  isDisabled: boolean;
  currentRewardId?: string;
  onRedeemClick: (reward: Reward) => void;
}

const RewardCard: React.FC<RewardCardProps> = ({
  reward,
  isPending,
  isDisabled,
  currentRewardId,
  onRedeemClick
}) => {
  return (
    <Card key={reward.id} className="overflow-hidden hover:shadow-md transition-shadow bg-white border-[#bdd0e8]">
      <div className="h-48 overflow-hidden bg-[#e8eef8]">
        <img
          src={reward.imageUrl || "https://placehold.co/400x300/e8eef8/4a6fa1?text=Reward"}
          alt={reward.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-[#4a6fa1]">{reward.name}</CardTitle>
        <CardDescription className="text-[#707b9b]">{reward.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-2 mb-1">
          <GoodCoinIcon className="h-5 w-5" />
          <span className="font-bold text-lg text-[#f6b961]">{reward.goodCoins} GoodCoins</span>
        </div>
        {reward.originalPrice && (
          <p className="text-sm text-[#707b9b]">
            <span className="line-through">${reward.originalPrice.toFixed(2)}</span>
            {reward.discountedPrice && (
              <span className="ml-1 font-medium text-[#6eb87a]">
                ${reward.discountedPrice.toFixed(2)}
              </span>
            )}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onRedeemClick(reward)} 
          className="w-full bg-[#94c5cc] hover:bg-[#7db0b7] text-white"
          disabled={isDisabled || (isPending && currentRewardId === reward.id)}
        >
          {isPending && currentRewardId === reward.id 
            ? "Redeeming..." 
            : "Redeem Now"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RewardCard;
