
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
  const fallbackImageUrl = "https://placehold.co/400x200/e8eef8/4a6fa1?text=Reward";
  
  // Random background color from a vibrant palette - magical unicorn theme
  const bgColors = [
    "bg-[#FF85E2]", "bg-[#B8A9FA]", "bg-[#91EBFF]", "bg-[#FFC2E9]", 
    "bg-[#A7C2FF]", "bg-[#85D3FF]", "bg-[#FFD4A9]"
  ];
  
  const randomBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
  
  // Random gradient for card background - magical unicorn theme
  const gradients = [
    "bg-gradient-to-r from-[#FF85E2] to-[#A7C2FF]",
    "bg-gradient-to-r from-[#B8A9FA] to-[#FFD4A9]",
    "bg-gradient-to-r from-[#91EBFF] to-[#FFC2E9]",
    "bg-gradient-to-r from-[#FFC2E9] to-[#85D3FF]",
    "bg-gradient-to-r from-[#A7C2FF] to-[#FF85E2]"
  ];
  
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
  
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        rotate: [0, 2, 0, -2, 0],
        transition: { 
          duration: 0.3,
          ease: "easeInOut" 
        }
      }}
      className="h-full"
    >
      <Card className={`h-full overflow-hidden shadow-lg border-2 border-[#FFC2E9] ${randomGradient}`}>
        <div className="h-36 overflow-hidden">
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
        <CardHeader className="pb-2 pt-3">
          <CardTitle className="text-lg font-bold text-white">{reward.name}</CardTitle>
          <CardDescription className="text-white/80 font-medium text-xs">{reward.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center gap-2 mb-1">
            <GoodCoinIcon className="h-5 w-5 text-yellow-500" />
            <span className="font-bold text-lg text-white">{reward.goodCoins} GoodCoins</span>
          </div>
          {reward.originalPrice && (
            <p className="text-sm text-white/80">
              <span className="line-through">${reward.originalPrice.toFixed(2)}</span>
              {reward.discountedPrice && (
                <span className="ml-1 font-medium text-white">
                  ${reward.discountedPrice.toFixed(2)}
                </span>
              )}
            </p>
          )}
        </CardContent>
        <CardFooter className="pt-1 pb-3">
          <Button 
            onClick={() => onRedeemClick(reward)} 
            className="w-full bg-[#FF85E2] hover:bg-[#FF59D6] text-white font-bold shadow-md hover:shadow-lg transition-all"
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
