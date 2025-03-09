
import React from 'react';
import { MinusCircle } from 'lucide-react';
import { SupabaseChild } from '@/services/types';
import { useToast } from '@/hooks/use-toast';

interface PenaltyFormProps {
  childAccounts: SupabaseChild[];
  handleApplyPenalty: (childId: string) => void;
}

const PenaltyForm: React.FC<PenaltyFormProps> = ({ 
  childAccounts,
  handleApplyPenalty
}) => {
  const { toast } = useToast();
  
  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h3 className="font-semibold text-goodchild-text-primary mb-4 flex items-center gap-2">
        <MinusCircle size={20} />
        <span>Apply Penalties</span>
      </h3>
      
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="childSelect" className="block text-sm font-medium text-goodchild-text-secondary mb-1">
            Select Child
          </label>
          <select
            id="childSelect"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-goodchild-blue focus:border-transparent transition-all"
          >
            <option value="">Select a child</option>
            {childAccounts.map((child) => (
              <option key={child.id} value={child.id}>
                {child.name} {child.surname}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="penaltyAmount" className="block text-sm font-medium text-goodchild-text-secondary mb-1">
            GoodCoins to Deduct
          </label>
          <input
            id="penaltyAmount"
            type="number"
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-goodchild-blue focus:border-transparent transition-all"
            placeholder="Enter amount"
          />
        </div>
        
        <div>
          <label htmlFor="penaltyReason" className="block text-sm font-medium text-goodchild-text-secondary mb-1">
            Reason (Optional)
          </label>
          <textarea
            id="penaltyReason"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-goodchild-blue focus:border-transparent transition-all"
            placeholder="Explain the reason for the penalty"
            rows={3}
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-goodchild-red text-white px-4 py-2 rounded-lg hover:bg-goodchild-red/90 transition-colors"
            onClick={() => {
              const childSelect = document.getElementById('childSelect') as HTMLSelectElement;
              if (childSelect && childSelect.value) {
                handleApplyPenalty(childSelect.value);
              } else {
                toast({
                  title: "Error",
                  description: "Please select a child",
                  variant: "destructive",
                });
              }
            }}
          >
            Apply Penalty
          </button>
        </div>
      </form>
    </div>
  );
};

export default PenaltyForm;
