
import { DevelopmentArea } from '@/types';

export interface SupabaseActivity {
  id: string;
  title: string;
  description: string | null;
  development_area_id?: string | null;
  developmentAreaName?: string;
  coin_reward: number;
  completed: boolean;
  completed_date?: string | null;
  due_date?: string | null;
  created_by?: string | null;
  assigned_to?: string | null;
  created_at?: string;
  updated_at?: string;
  estimated_time?: string | null;
}

export interface SupabaseProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  nickname?: string | null;
  avatar_url?: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface SupabaseChild {
  id: string;
  parent_id: string;
  name: string;
  surname: string;
  nickname?: string | null;
  avatar?: string | null;
  good_coins: number;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseDevelopmentArea {
  id: string;
  name: DevelopmentArea;
  description: string | null;
  created_at?: string;
}

export interface SupabaseChildProgress {
  id: string;
  child_id: string;
  development_area_id: string;
  progress: number;
  created_at: string;
  updated_at: string;
  development_areas?: {
    created_at: string;
    description: string;
    id: string;
    name: string;
  };
}

export interface SupabaseReward {
  id: string;
  name: string;
  description: string | null;
  image_url?: string | null;
  original_price?: number | null;
  discounted_price?: number | null;
  good_coins: number;
  created_at?: string;
  created_by?: string | null;
  updated_at?: string;
}

export interface SupabaseTransaction {
  id: string;
  child_id: string;
  activity_id?: string | null;
  reward_id?: string | null;
  amount: number;
  transaction_type: 'earn' | 'spend';
  type?: 'earned' | 'spent' | 'penalty' | 'given';
  created_at: string;
  description?: string | null;
  created_by?: string | null;
}

export interface SupabaseRedemption {
  id: string;
  child_id: string;
  reward_id?: string | null;
  good_coins: number;
  created_at: string;
}

// Define types for the services
export interface Activity {
  id: string;
  title: string;
  description: string;
  developmentArea: DevelopmentArea;
  goodCoins: number;
  coinReward?: number;
  status: 'pending' | 'completed';
  completed?: boolean;
  childId: string;
  assignedTo?: string;
  dueDate?: string;
  completedDate?: string;
  estimatedTime?: string;
}

export interface ChildData {
  id: string;
  name: string;
  surname: string;
  nickname?: string;
  avatar?: string;
  goodCoins: number;
  parentId: string;
  developmentAreas?: Array<{
    name: string;
    progress: number;
  }>;
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
  date?: string;
}
