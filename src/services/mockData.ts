
import { Reward, Activity, Transaction, Redemption, DevelopmentArea, Penalty } from '@/types';

// Sample rewards
export const REWARDS: Reward[] = [
  {
    id: '1',
    name: 'Art Supply Set',
    description: 'A complete set of premium art supplies including colored pencils, markers, and paint',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop',
    originalPrice: 35.99,
    discountedPrice: 29.99,
    goodCoins: 100
  },
  {
    id: '2',
    name: 'Science Kit',
    description: 'Exciting experiments and discoveries with this comprehensive science kit',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop',
    originalPrice: 45.99,
    discountedPrice: 39.99,
    goodCoins: 150
  },
  {
    id: '3',
    name: 'Building Blocks Set',
    description: 'Creative building blocks to stimulate imagination and fine motor skills',
    imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=2070&auto=format&fit=crop',
    originalPrice: 29.99,
    discountedPrice: 24.99,
    goodCoins: 80
  },
  {
    id: '4',
    name: 'Children\'s Book Collection',
    description: 'A set of 5 award-winning children\'s books for various reading levels',
    imageUrl: 'https://images.unsplash.com/photo-1529473814998-077b4fec6770?q=80&w=2070&auto=format&fit=crop',
    originalPrice: 49.99,
    discountedPrice: 39.99,
    goodCoins: 120
  },
  {
    id: '5',
    name: 'Digital Game Credit',
    description: 'Credit for educational games on approved learning platforms',
    imageUrl: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?q=80&w=2072&auto=format&fit=crop',
    originalPrice: 20.00,
    discountedPrice: 15.00,
    goodCoins: 70
  }
];

// Sample activities by development area
const createActivities = (childId: string): Activity[] => {
  const activities: Activity[] = [];
  const developmentAreas: DevelopmentArea[] = [
    'Health & Mind',
    'Effective Communication',
    'Personal Enrichment',
    'Creativity',
    'Deeper Family Bonds',
    'Emotional Intelligence',
    'Social Skills'
  ];
  
  // Create 2 activities for each development area
  developmentAreas.forEach(area => {
    // Pending activity
    activities.push({
      id: `${area}-pending-${childId}`,
      title: `${area} Activity 1`,
      description: `Complete this ${area.toLowerCase()} activity to earn GoodCoins!`,
      developmentArea: area,
      goodCoins: Math.floor(Math.random() * 30) + 20, // Random between 20-50
      status: 'pending',
      childId,
      dueDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Random due date in next 7 days
    });
    
    // Completed activity
    activities.push({
      id: `${area}-completed-${childId}`,
      title: `${area} Activity 2`,
      description: `You've completed this ${area.toLowerCase()} activity!`,
      developmentArea: area,
      goodCoins: Math.floor(Math.random() * 30) + 20, // Random between 20-50
      status: 'completed',
      childId,
      completedDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Random completion date in past 7 days
    });
  });
  
  return activities;
};

// Sample transactions
const createTransactions = (childId: string): Transaction[] => {
  return [
    {
      id: '1',
      childId,
      amount: 50,
      type: 'earned',
      description: 'Completed Health & Mind activity',
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      childId,
      amount: 25,
      type: 'earned',
      description: 'Completed Social Skills activity',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      childId,
      amount: 100,
      type: 'given',
      description: 'Bonus for good behavior',
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '4',
      childId,
      amount: 70,
      type: 'spent',
      description: 'Redeemed Digital Game Credit',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '5',
      childId,
      amount: 20,
      type: 'penalty',
      description: 'Missed homework deadline',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
};

// Sample redemptions
const createRedemptions = (childId: string): Redemption[] => {
  return [
    {
      id: '1',
      childId,
      rewardId: '5', // Digital Game Credit
      goodCoins: 70,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      reward: REWARDS.find(r => r.id === '5')!
    }
  ];
};

// Sample penalties
const createPenalties = (childId: string): Penalty[] => {
  return [
    {
      id: '1',
      childId,
      amount: 20,
      reason: 'Missed homework deadline',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
};

// Function to get all data for a specific child
export const getChildData = (childId: string) => {
  return {
    activities: createActivities(childId),
    transactions: createTransactions(childId),
    redemptions: createRedemptions(childId),
    penalties: createPenalties(childId)
  };
};
