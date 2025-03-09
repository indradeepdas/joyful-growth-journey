
import { DevelopmentArea } from '@/types';

export interface SupabaseActivity {
  id: string;
  title: string;
  description: string;
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
  first_name: string;
  last_name: string;
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
}

export interface SupabaseDevelopmentArea {
  id: string;
  name: DevelopmentArea;
  description: string;
  created_at?: string;
}

export interface SupabaseReward {
  id: string;
  name: string;
  description: string;
  image_url?: string | null;
  original_price?: number | null;
  discounted_price?: number | null;
  good_coins: number;
  created_at?: string;
  created_by?: string | null;
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

export interface SupabaseChildProgress {
  id: string;
  child_id: string;
  development_area_id: string;
  progress: number;
  created_at: string;
  updated_at: string;
}

export interface SupabaseRedemption {
  id: string;
  child_id: string;
  reward_id?: string | null;
  good_coins: number;
  created_at: string;
}
