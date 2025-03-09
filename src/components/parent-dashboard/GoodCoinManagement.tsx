
import React from 'react';
import { ArrowRight, BarChart3 } from 'lucide-react';
import { Transaction } from '@/types';
import { SupabaseChild } from '@/services/types';
import TransactionList from './TransactionList';
import PenaltyForm from './PenaltyForm';

interface GoodCoinManagementProps {
  transactions: Transaction[];
  childAccounts: SupabaseChild[];
  getTransactionColor: (type: string) => string;
  getTransactionPrefix: (type: string) => string;
  handleAddPenalty: (childId: string) => void;
}

const GoodCoinManagement: React.FC<GoodCoinManagementProps> = ({ 
  transactions, 
  childAccounts,
  getTransactionColor,
  getTransactionPrefix,
  handleAddPenalty
}) => {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-goodchild-text-primary flex items-center gap-2">
          <BarChart3 size={24} />
          <span>GoodCoin Management</span>
        </h2>
        <button className="text-goodchild-blue hover:underline inline-flex items-center gap-1 text-sm">
          <span>View All Transactions</span>
          <ArrowRight size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransactionList 
          transactions={transactions} 
          childAccounts={childAccounts} 
          getTransactionColor={getTransactionColor}
          getTransactionPrefix={getTransactionPrefix}
        />
        
        <PenaltyForm 
          childAccounts={childAccounts}
          handleApplyPenalty={handleAddPenalty}
        />
      </div>
    </section>
  );
};

export default GoodCoinManagement;
