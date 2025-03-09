
// Rewards service functions and data

import { supabase } from '@/integrations/supabase/client';

export interface Reward {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  originalPrice: number | null;
  discountedPrice: number | null;
  discount: number;
  coinCost: number;
  category: string;
  available: boolean;
}

// Mock data for rewards (used as fallback or for public pages)
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

// Function to get all rewards from Supabase
export const getRewards = async (): Promise<Reward[]> => {
  try {
    console.log('Fetching rewards from Supabase');
    const { data, error } = await supabase
      .from('rewards')
      .select('*');
      
    if (error) {
      console.error('Error fetching rewards:', error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      console.log('No rewards found in database, returning mock data');
      return mockRewards;
    }
    
    // Convert Supabase reward data to our Reward interface
    const rewards: Reward[] = data.map(reward => ({
      id: reward.id,
      name: reward.name,
      description: reward.description || '',
      imageUrl: reward.image_url || `https://placehold.co/600x400/random?text=${encodeURIComponent(reward.name)}`,
      originalPrice: reward.original_price,
      discountedPrice: reward.discounted_price,
      discount: reward.original_price && reward.discounted_price 
        ? Math.round(((reward.original_price - reward.discounted_price) / reward.original_price) * 100) 
        : 0,
      coinCost: reward.good_coins,
      category: 'General', // Default category if not available in data
      available: true
    }));
    
    console.log('Fetched rewards:', rewards);
    return rewards;
  } catch (error) {
    console.error('Error in getRewards:', error);
    return mockRewards; // Fallback to mock data
  }
};

// Function to get a specific reward by ID
export const getRewardById = async (id: string): Promise<Reward | undefined> => {
  try {
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error fetching reward:', error);
      // Try to find in mock data as fallback
      return mockRewards.find((r) => r.id === id);
    }
    
    if (!data) {
      return mockRewards.find((r) => r.id === id);
    }
    
    return {
      id: data.id,
      name: data.name,
      description: data.description || '',
      imageUrl: data.image_url || `https://placehold.co/600x400/random?text=${encodeURIComponent(data.name)}`,
      originalPrice: data.original_price,
      discountedPrice: data.discounted_price,
      discount: data.original_price && data.discounted_price 
        ? Math.round(((data.original_price - data.discounted_price) / data.original_price) * 100) 
        : 0,
      coinCost: data.good_coins,
      category: 'General',
      available: true
    };
  } catch (error) {
    console.error('Error in getRewardById:', error);
    return mockRewards.find((r) => r.id === id);
  }
};

// Function to redeem a reward (would connect to backend in real implementation)
export const redeemReward = async (rewardId: string, userId: string): Promise<{ success: boolean; message: string }> => {
  try {
    // First get the reward to check its cost
    const { data: rewardData, error: rewardError } = await supabase
      .from('rewards')
      .select('*')
      .eq('id', rewardId)
      .single();
      
    if (rewardError) throw rewardError;
    
    // Check if user has child profile
    const { data: childData, error: childError } = await supabase
      .from('children')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (childError && childError.code !== 'PGRST116') {
      throw childError;
    }
    
    if (!childData) {
      throw new Error("Only children can redeem rewards");
    }
    
    // Check if child has enough coins
    if (childData.good_coins < rewardData.good_coins) {
      throw new Error(`Not enough GoodCoins. You need ${rewardData.good_coins} but only have ${childData.good_coins}.`);
    }
    
    // Begin transaction
    // 1. Add redemption record
    const { error: redemptionError } = await supabase
      .from('redemptions')
      .insert({
        child_id: userId,
        reward_id: rewardId,
        good_coins: rewardData.good_coins
      });
      
    if (redemptionError) throw redemptionError;
    
    // 2. Update child's coins
    const { error: updateError } = await supabase
      .from('children')
      .update({ good_coins: childData.good_coins - rewardData.good_coins })
      .eq('id', userId);
      
    if (updateError) throw updateError;
    
    // 3. Add transaction record
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        child_id: userId,
        amount: -rewardData.good_coins,
        type: 'spent',
        description: `Redeemed ${rewardData.name}`,
        created_by: userId
      });
      
    if (transactionError) throw transactionError;
    
    return {
      success: true,
      message: "Reward redeemed successfully!",
    };
  } catch (error) {
    console.error('Error redeeming reward:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to redeem reward",
    };
  }
};
