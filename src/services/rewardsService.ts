
import { mockRewards } from './mockData';

// Define the Reward type
export interface Reward {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  coinCost: number;
  category: string;
  available: boolean;
}

// Function to get all rewards
export const getRewards = async (): Promise<Reward[]> => {
  // In a real app, this would fetch from an API
  // For now, we'll use mock data
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(mockRewards);
    }, 800);
  });
};

// Function to get a specific reward by ID
export const getRewardById = async (id: string): Promise<Reward | undefined> => {
  // In a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      const reward = mockRewards.find((r) => r.id === id);
      resolve(reward);
    }, 300);
  });
};

// Function to redeem a reward (would connect to backend in real implementation)
export const redeemReward = async (rewardId: string, userId: string): Promise<{ success: boolean; message: string }> => {
  // This would be a POST request to the backend in a real app
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock successful redemption
      resolve({
        success: true,
        message: "Reward redeemed successfully!",
      });
    }, 800);
  });
};
