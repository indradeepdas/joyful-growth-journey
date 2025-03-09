
import React from 'react';
import { Transaction } from '@/services/types';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import GoodCoinIcon from '@/components/GoodCoinIcon';

interface TransactionSectionProps {
  transactions: Transaction[];
  type: 'penalty' | 'spent';
  title: string;
  emptyMessage: string;
  actionButton?: React.ReactNode;
}

const TransactionSection: React.FC<TransactionSectionProps> = ({ 
  transactions, 
  type, 
  title, 
  emptyMessage, 
  actionButton 
}) => {
  const filteredTransactions = transactions.filter(t => t.type === type);
  const bgColor = type === 'penalty' ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-100';
  const textColor = type === 'penalty' ? 'text-red-500' : 'text-blue-500';

  return (
    <div className="glass-card p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-goodchild-text-primary mb-4">{title}</h2>
      
      <div className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <div className="text-center p-4 text-goodchild-text-secondary">
            <p>{emptyMessage}</p>
            {actionButton}
          </div>
        ) : (
          filteredTransactions.map(transaction => (
            <Card key={transaction.id} className={bgColor}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.createdAt}</p>
                  </div>
                  <div className={`flex items-center ${textColor} font-bold`}>
                    {type === 'penalty' ? (
                      <X className="h-4 w-4 mr-1" />
                    ) : (
                      <GoodCoinIcon className="h-4 w-4 mr-1" />
                    )}
                    {transaction.amount} GoodCoins
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionSection;
