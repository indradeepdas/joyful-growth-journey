
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GoodCoinIcon from '@/components/GoodCoinIcon';
import { Reward } from '@/types';
import confetti from 'canvas-confetti';

interface RedemptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reward: Reward;
  onConfirm: () => void;
}

const RedemptionDialog: React.FC<RedemptionDialogProps> = ({
  open,
  onOpenChange,
  reward,
  onConfirm
}) => {
  const handleConfirm = () => {
    // Trigger confetti when confirming redemption
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-[#A7C2FF] to-[#FFC2E9] border-[#FF85E2]">
        <DialogHeader>
          <DialogTitle className="text-xl text-center text-gray-800 font-['Nunito',_sans-serif]">Redeem Reward</DialogTitle>
          <DialogDescription className="text-center text-gray-700 font-['Nunito',_sans-serif]">
            Are you sure you want to redeem this reward?
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center p-4 border rounded-lg bg-white/80 backdrop-blur-sm mb-4">
          <h3 className="font-bold text-lg text-gray-800 mb-2 font-['Nunito',_sans-serif]">{reward.name}</h3>
          <div className="flex items-center text-amber-600 font-bold">
            <GoodCoinIcon className="h-5 w-5 mr-1" />
            <span>{reward.goodCoins} GoodCoins</span>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 border-gray-800 text-gray-800 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleConfirm}
            className="flex-1 bg-[#FF85E2] hover:bg-[#FF59D6] text-white"
          >
            Confirm Redemption
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RedemptionDialog;
