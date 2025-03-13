
export interface User {
  id: string;
  email: string;
  role: 'parent' | 'child';
  createdAt: string;
}

export interface Parent extends User {
  role: 'parent';
  children: Child[];
}

export interface Child extends User {
  role: 'child';
  name: string;
  surname: string;
  nickname: string;
  avatarUrl?: string;
  goodCoins: number;
  parentId: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  developmentArea: DevelopmentArea;
  goodCoins: number;
  status: 'pending' | 'completed';
  childId: string;
  dueDate?: string;
  completedDate?: string;
  estimatedTime?: string;
  // Add these fields to make it compatible with existing code
  coinReward?: number;
  completed?: boolean;
  assignedTo?: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  originalPrice: number;
  discountedPrice: number;
  goodCoins: number;
  externalUrl?: string; // Added externalUrl property
}

export interface Transaction {
  id: string;
  childId: string;
  activityId?: string;
  rewardId?: string;
  amount: number;
  description: string;
  createdAt: string;
  type: 'earned' | 'spent' | 'penalty' | 'given';
  // Add this for backwards compatibility
  date?: string;
}

export interface Redemption {
  id: string;
  childId: string;
  rewardId: string;
  goodCoins: number;
  createdAt: string;
  reward: Reward;
}

export interface Penalty {
  id: string;
  childId: string;
  amount: number;
  reason?: string;
  createdAt: string;
}

export type DevelopmentArea = 
  | 'Health & Mind'
  | 'Effective Communication'
  | 'Personal Enrichment'
  | 'Creativity'
  | 'Deeper Family Bonds'
  | 'Emotional Intelligence'
  | 'Social Skills';
