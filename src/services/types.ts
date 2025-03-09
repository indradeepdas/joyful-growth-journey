
// Common types used across service files

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

export interface Transaction {
  id: string;
  childId: string;
  amount: number;
  type: 'earned' | 'spent' | 'penalty' | 'given';
  description: string;
  date: string;
}

export interface SupabaseProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  nickname: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface SupabaseChild {
  id: string;
  parent_id: string;
  name: string;
  surname: string;
  nickname: string | null;
  avatar: string | null;
  good_coins: number;
  created_at: string;
  updated_at: string;
}

export interface SupabaseDevelopmentArea {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface SupabaseChildProgress {
  id: string;
  child_id: string;
  development_area_id: string;
  progress: number;
  updated_at: string;
}

export interface SupabaseActivity {
  id: string;
  title: string;
  description: string | null;
  development_area_id: string | null;
  coin_reward: number;
  assigned_to: string | null;
  created_by: string | null;
  due_date: string | null;
  completed: boolean;
  completed_date: string | null;
  created_at: string;
  updated_at: string;
  estimated_time: string | null;
  // Optional field for join queries
  developmentAreaName?: string;
}

export interface SupabaseTransaction {
  id: string;
  child_id: string;
  amount: number;
  type: 'earned' | 'spent' | 'penalty' | 'given';
  description: string | null;
  created_by: string | null;
  created_at: string;
}

export interface SupabaseReward {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  original_price: number | null;
  discounted_price: number | null;
  good_coins: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface SupabaseRedemption {
  id: string;
  child_id: string;
  reward_id: string;
  good_coins: number;
  created_at: string;
}
