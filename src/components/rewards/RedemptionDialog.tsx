
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-center text-[#4a6fa1]">Redeem Reward</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to redeem this reward?
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center p-4 border rounded-lg bg-[#f8f9fa] mb-4">
          <h3 className="font-bold text-lg text-[#4a6fa1] mb-2">{reward.name}</h3>
          <div className="flex items-center text-[#f6b961] font-bold">
            <GoodCoinIcon className="h-5 w-5 mr-1" />
            <span>{reward.goodCoins} GoodCoins</span>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleConfirm}
            className="flex-1 bg-[#94c5cc] hover:bg-[#7db0b7] text-white"
          >
            Confirm Redemption
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RedemptionDialog;
