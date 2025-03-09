
import { Transaction } from './types';

// Mock transactions data
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    childId: '1', // Emma's ID
    amount: 15,
    type: 'earned',
    description: 'Completed "Practice Math Problems"',
    createdAt: '2023-07-10'
  },
  {
    id: '2',
    childId: '2', // Noah's ID
    amount: 10,
    type: 'earned',
    description: 'Completed "Help with Dinner"',
    createdAt: '2023-07-11'
  },
  {
    id: '3',
    childId: '1', // Emma's ID
    amount: 30,
    type: 'spent',
    description: 'Redeemed "Digital Game Voucher"',
    createdAt: '2023-07-08'
  },
  {
    id: '4',
    childId: '2', // Noah's ID
    amount: 5,
    type: 'penalty',
    description: 'Missed homework deadline',
    createdAt: '2023-07-07'
  },
  {
    id: '5',
    childId: '1', // Emma's ID
    amount: 20,
    type: 'given',
    description: 'Birthday bonus',
    createdAt: '2023-07-05'
  }
];

// Function to get transactions for a specific child
export const getTransactionsForChild = async (childId: string): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transactions = mockTransactions.filter(transaction => transaction.childId === childId);
      resolve(transactions);
    }, 500);
  });
};

// Function to get recent transactions across all children
export const getRecentTransactions = async (limit = 5): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Sort by date descending and take the first 'limit' transactions
      const sorted = [...mockTransactions].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      resolve(sorted.slice(0, limit));
    }, 500);
  });
};
