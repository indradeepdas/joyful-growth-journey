
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import { Reward } from '@/types';
import { motion } from 'framer-motion';

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
  // Fallback image for broken URLs
  const fallbackImageUrl = "https://placehold.co/400x300/e8eef8/4a6fa1?text=Reward";
  
  // Random background color from a vibrant palette
  const bgColors = [
    "bg-[#E5DEFF]", "bg-[#FEF7CD]", "bg-[#FEC6A1]", "bg-[#F2FCE2]", 
    "bg-[#FFDEE2]", "bg-[#FDE1D3]", "bg-[#D3E4FD]"
  ];
  
  const randomBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
  
  // Random gradient for card background
  const gradients = [
    "bg-gradient-to-r from-[#E5DEFF] to-[#FEF7CD]",
    "bg-gradient-to-r from-[#FEC6A1] to-[#FFDEE2]",
    "bg-gradient-to-r from-[#F2FCE2] to-[#D3E4FD]",
    "bg-gradient-to-r from-[#FDE1D3] to-[#E5DEFF]",
    "bg-gradient-to-r from-[#FFDEE2] to-[#FEF7CD]"
  ];
  
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ 
        rotate: [0, 2, 0, -2, 0],
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 2 + Math.random() * 2,
        ease: "easeInOut" 
      }}
      className="h-full"
    >
      <Card className={`h-full overflow-hidden shadow-lg border-2 border-[#bdd0e8] ${randomGradient}`}>
        <div className="h-48 overflow-hidden">
          <img
            src={reward.imageUrl || fallbackImageUrl}
            alt={reward.name}
            className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
            onError={(e) => {
              // Replace broken images with fallback
              (e.target as HTMLImageElement).src = fallbackImageUrl;
            }}
          />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-[#4a6fa1]">{reward.name}</CardTitle>
          <CardDescription className="text-[#707b9b] font-medium">{reward.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center gap-2 mb-1">
            <GoodCoinIcon className="h-6 w-6 text-yellow-500" />
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
            className="w-full bg-[#94c5cc] hover:bg-[#7db0b7] text-white font-bold shadow-md hover:shadow-lg transition-all"
            disabled={isDisabled || (isPending && currentRewardId === reward.id)}
          >
            {isPending && currentRewardId === reward.id 
              ? "Redeeming..." 
              : "Redeem Now"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RewardCard;
