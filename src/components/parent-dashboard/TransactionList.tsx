
import React from 'react';
import { Award } from 'lucide-react';
import { Transaction } from '@/types';
import { SupabaseChild } from '@/services/types';
import GoodCoinIcon from '@/components/GoodCoinIcon';

interface TransactionListProps {
  transactions: Transaction[];
  childAccounts: SupabaseChild[];
  getTransactionColor: (type: string) => string;
  getTransactionPrefix: (type: string) => string;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  childAccounts,
  getTransactionColor,
  getTransactionPrefix
}) => {
  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h3 className="font-semibold text-goodchild-text-primary mb-4 flex items-center gap-2">
        <Award size={20} />
        <span>Recent Transactions</span>
      </h3>
      
      {transactions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-goodchild-text-secondary mb-2">No transactions yet.</p>
          <p className="text-sm text-goodchild-text-secondary">
            Transactions will appear here when your children earn or spend GoodCoins.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => {
            const childName = childAccounts.find(c => c.id === transaction.childId)?.name || 'Unknown Child';
            return (
              <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div>
                  <div className="font-medium text-goodchild-text-primary">
                    {childName} - {transaction.description}
                  </div>
                  <div className="text-sm text-goodchild-text-secondary">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className={`font-bold ${getTransactionColor(transaction.type)}`}>
                  {getTransactionPrefix(transaction.type)}{transaction.amount}
                  <GoodCoinIcon className="ml-1 w-4 h-4 inline-block" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
