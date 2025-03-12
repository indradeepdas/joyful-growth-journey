
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface RedemptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  rewardName: string;
  goodCoins: number;
}

const RedemptionDialog: React.FC<RedemptionDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  rewardName,
  goodCoins
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#fdfcf9]"> {/* Dreamy skies background */}
        <DialogHeader>
          <DialogTitle className="text-[#4a6fa1] flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-[#94c5cc]" />
            Confirm Redemption
          </DialogTitle>
          <DialogDescription>
            You are about to redeem <span className="font-bold">{rewardName}</span> for <span className="font-bold">{goodCoins} GoodCoins</span>.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-[#707b9b]">
            Are you sure you want to redeem this reward? This action cannot be undone.
          </p>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-[#94c5cc] text-[#4a6fa1]"
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            className="bg-[#94c5cc] hover:bg-[#7db0b7] text-white"
          >
            Confirm Redemption
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RedemptionDialog;
