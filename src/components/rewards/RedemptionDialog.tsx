
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface RedemptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reward: {
    name: string;
    goodCoins: number;
    externalUrl?: string;
  };
  onConfirm: () => void;
}

const RedemptionDialog: React.FC<RedemptionDialogProps> = ({
  open,
  onOpenChange,
  reward,
  onConfirm
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white border-[#aed6f1]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#4a6fa1]">Confirm Redemption</AlertDialogTitle>
          <AlertDialogDescription className="text-[#85c1e9]">
            Are you sure you want to redeem <strong>{reward.name}</strong> for <strong>{reward.goodCoins} GoodCoins</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-[#aed6f1] text-[#4a6fa1]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-[#aed6f1] text-[#4a6fa1] hover:bg-[#85c1e9]"
          >
            Yes, Redeem Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RedemptionDialog;
