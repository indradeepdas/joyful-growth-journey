
// Rewards service functions and data

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

// Mock data for rewards
export const mockRewards: Reward[] = [
  {
    id: '1',
    name: 'LEGO Building Set',
    description: 'A fun LEGO set to encourage creativity and building skills.',
    imageUrl: 'https://placehold.co/600x400/FFD166/073B4C?text=LEGO+Set',
    originalPrice: 24.99,
    discountedPrice: 19.99,
    discount: 20,
    coinCost: 50,
    category: 'Toys',
    available: true
  },
  {
    id: '2',
    name: 'Art Supplies Kit',
    description: 'Complete art supplies kit with paints, pencils, and markers.',
    imageUrl: 'https://placehold.co/600x400/06D6A0/073B4C?text=Art+Kit',
    originalPrice: 19.99,
    discountedPrice: 15.99,
    discount: 20,
    coinCost: 40,
    category: 'Art',
    available: true
  },
  {
    id: '3',
    name: 'Children\'s Book Bundle',
    description: 'Set of 3 age-appropriate books to encourage reading.',
    imageUrl: 'https://placehold.co/600x400/118AB2/FFFFFF?text=Books',
    originalPrice: 29.99,
    discountedPrice: 23.99,
    discount: 20,
    coinCost: 60,
    category: 'Books',
    available: true
  },
  {
    id: '4',
    name: 'Roblox Gift Card',
    description: 'Digital gift card for Roblox - perfect for gamers!',
    imageUrl: 'https://placehold.co/600x400/8A63D2/FFFFFF?text=Roblox',
    originalPrice: 10.00,
    discountedPrice: 8.00,
    discount: 20,
    coinCost: 30,
    category: 'Digital',
    available: true
  },
  {
    id: '5',
    name: 'Science Experiment Kit',
    description: 'Fun and educational science experiments for kids.',
    imageUrl: 'https://placehold.co/600x400/EF476F/FFFFFF?text=Science+Kit',
    originalPrice: 34.99,
    discountedPrice: 27.99,
    discount: 20,
    coinCost: 75,
    category: 'Educational',
    available: true
  }
];

// Function to get all rewards
export const getRewards = async (): Promise<Reward[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRewards);
    }, 800);
  });
};

// Function to get a specific reward by ID
export const getRewardById = async (id: string): Promise<Reward | undefined> => {
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
