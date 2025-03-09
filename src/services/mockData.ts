
import { Reward } from './rewardsService';

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
  },
  // Add more mock rewards as needed
];

// Define the ChildData type
export interface ChildData {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
  goodCoins: number;
  developmentAreas: {
    name: string;
    progress: number;
  }[];
}

// Mock data for children
export const mockChildren: ChildData[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    nickname: 'Em',
    avatar: 'https://placehold.co/200x200/FFD166/073B4C?text=Emma',
    goodCoins: 120,
    developmentAreas: [
      { name: 'Health & Mind', progress: 70 },
      { name: 'Effective Communication', progress: 85 },
      { name: 'Personal Enrichment', progress: 60 },
      { name: 'Creativity', progress: 90 },
      { name: 'Deeper Family Bonds', progress: 75 },
      { name: 'Emotional Intelligence', progress: 65 },
      { name: 'Social Skills', progress: 80 }
    ]
  },
  {
    id: '2',
    name: 'Noah Smith',
    nickname: 'No',
    avatar: 'https://placehold.co/200x200/06D6A0/073B4C?text=Noah',
    goodCoins: 85,
    developmentAreas: [
      { name: 'Health & Mind', progress: 60 },
      { name: 'Effective Communication', progress: 70 },
      { name: 'Personal Enrichment', progress: 80 },
      { name: 'Creativity', progress: 65 },
      { name: 'Deeper Family Bonds', progress: 85 },
      { name: 'Emotional Intelligence', progress: 75 },
      { name: 'Social Skills', progress: 90 }
    ]
  }
];

// Mock data for activities
export interface Activity {
  id: string;
  title: string;
  description: string;
  developmentArea: string;
  coinReward: number;
  assignedTo: string;
  dueDate: string;
  completed: boolean;
}

// Mock activities data
export const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Read a Book',
    description: 'Read a chapter book and write a short summary',
    developmentArea: 'Personal Enrichment',
    coinReward: 15,
    assignedTo: '1', // Emma's ID
    dueDate: '2023-07-15',
    completed: false
  },
  {
    id: '2',
    title: 'Help with Dinner',
    description: 'Help prepare dinner with a parent',
    developmentArea: 'Deeper Family Bonds',
    coinReward: 10,
    assignedTo: '2', // Noah's ID
    dueDate: '2023-07-12',
    completed: true
  },
  {
    id: '3',
    title: 'Clean Your Room',
    description: 'Organize toys and make your bed',
    developmentArea: 'Personal Enrichment',
    coinReward: 8,
    assignedTo: '1', // Emma's ID
    dueDate: '2023-07-14',
    completed: false
  },
  {
    id: '4',
    title: 'Draw a Family Picture',
    description: 'Create a colorful drawing of your family',
    developmentArea: 'Creativity',
    coinReward: 12,
    assignedTo: '2', // Noah's ID
    dueDate: '2023-07-16',
    completed: false
  },
  {
    id: '5',
    title: 'Practice Math Problems',
    description: 'Complete the assigned math worksheet',
    developmentArea: 'Health & Mind',
    coinReward: 15,
    assignedTo: '1', // Emma's ID
    dueDate: '2023-07-13',
    completed: true
  }
];

// Mock transactions data
export interface Transaction {
  id: string;
  childId: string;
  amount: number;
  type: 'earned' | 'spent' | 'penalty' | 'given';
  description: string;
  date: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    childId: '1', // Emma's ID
    amount: 15,
    type: 'earned',
    description: 'Completed "Practice Math Problems"',
    date: '2023-07-10'
  },
  {
    id: '2',
    childId: '2', // Noah's ID
    amount: 10,
    type: 'earned',
    description: 'Completed "Help with Dinner"',
    date: '2023-07-11'
  },
  {
    id: '3',
    childId: '1', // Emma's ID
    amount: 30,
    type: 'spent',
    description: 'Redeemed "Digital Game Voucher"',
    date: '2023-07-08'
  },
  {
    id: '4',
    childId: '2', // Noah's ID
    amount: 5,
    type: 'penalty',
    description: 'Missed homework deadline',
    date: '2023-07-07'
  },
  {
    id: '5',
    childId: '1', // Emma's ID
    amount: 20,
    type: 'given',
    description: 'Birthday bonus',
    date: '2023-07-05'
  }
];

// Function to get all child data
export const getChildData = async (): Promise<ChildData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockChildren);
    }, 800);
  });
};

// Function to get a specific child's data by ID
export const getChildById = async (id: string): Promise<ChildData | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const child = mockChildren.find(child => child.id === id);
      resolve(child);
    }, 300);
  });
};

// Function to get activities for a specific child
export const getActivitiesForChild = async (childId: string): Promise<Activity[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const activities = mockActivities.filter(activity => activity.assignedTo === childId);
      resolve(activities);
    }, 500);
  });
};

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
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      resolve(sorted.slice(0, limit));
    }, 500);
  });
};

// Function to get upcoming activities
export const getUpcomingActivities = async (limit = 5): Promise<Activity[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter incomplete activities and sort by due date ascending
      const upcoming = mockActivities
        .filter(activity => !activity.completed)
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      resolve(upcoming.slice(0, limit));
    }, 500);
  });
};
