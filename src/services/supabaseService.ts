
import { supabase } from '@/integrations/supabase/client';
import {
  SupabaseChild,
  SupabaseProfile,
  SupabaseDevelopmentArea,
  SupabaseChildProgress,
  SupabaseActivity,
  SupabaseTransaction,
  SupabaseReward,
  SupabaseRedemption
} from './types';

// Profile related functions
export const getProfile = async (userId: string): Promise<SupabaseProfile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  
  return data as SupabaseProfile;
};

export const updateProfile = async (
  userId: string, 
  updates: Partial<Omit<SupabaseProfile, 'id' | 'created_at' | 'updated_at'>>
): Promise<SupabaseProfile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating profile:', error);
    return null;
  }
  
  return data as SupabaseProfile;
};

// Children related functions
export const getChildren = async (parentId: string): Promise<SupabaseChild[]> => {
  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('parent_id', parentId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching children:', error);
    return [];
  }
  
  return data as SupabaseChild[];
};

export const getChild = async (childId: string): Promise<SupabaseChild | null> => {
  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('id', childId)
    .single();
  
  if (error) {
    console.error('Error fetching child:', error);
    return null;
  }
  
  return data as SupabaseChild;
};

export const createChild = async (
  parentId: string,
  childData: Omit<SupabaseChild, 'id' | 'parent_id' | 'good_coins' | 'created_at' | 'updated_at'>
): Promise<SupabaseChild | null> => {
  const { data, error } = await supabase
    .from('children')
    .insert([{ ...childData, parent_id: parentId }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating child:', error);
    return null;
  }
  
  return data as SupabaseChild;
};

export const updateChild = async (
  childId: string,
  updates: Partial<Omit<SupabaseChild, 'id' | 'parent_id' | 'created_at' | 'updated_at'>>
): Promise<SupabaseChild | null> => {
  const { data, error } = await supabase
    .from('children')
    .update(updates)
    .eq('id', childId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating child:', error);
    return null;
  }
  
  return data as SupabaseChild;
};

export const deleteChild = async (childId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('children')
    .delete()
    .eq('id', childId);
  
  if (error) {
    console.error('Error deleting child:', error);
    return false;
  }
  
  return true;
};

// Development areas
export const getDevelopmentAreas = async (): Promise<SupabaseDevelopmentArea[]> => {
  const { data, error } = await supabase
    .from('development_areas')
    .select('*')
    .order('name', { ascending: true });
  
  if (error) {
    console.error('Error fetching development areas:', error);
    return [];
  }
  
  return data as SupabaseDevelopmentArea[];
};

// Child progress
export const getChildProgress = async (childId: string): Promise<SupabaseChildProgress[]> => {
  const { data, error } = await supabase
    .from('child_development_progress')
    .select('*, development_areas(*)')
    .eq('child_id', childId);
  
  if (error) {
    console.error('Error fetching child progress:', error);
    return [];
  }
  
  return data as SupabaseChildProgress[];
};

// Activities
export const getActivities = async (userId: string): Promise<SupabaseActivity[]> => {
  const { data, error } = await supabase
    .from('activities')
    .select('*, development_areas(*)')
    .eq('created_by', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
  
  return data as SupabaseActivity[];
};

export const getChildActivities = async (childId: string): Promise<SupabaseActivity[]> => {
  const { data, error } = await supabase
    .from('activities')
    .select('*, development_areas(*)')
    .eq('assigned_to', childId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching child activities:', error);
    return [];
  }
  
  return data as SupabaseActivity[];
};

export const createActivity = async (
  userId: string,
  activityData: Omit<SupabaseActivity, 'id' | 'created_by' | 'created_at' | 'updated_at' | 'completed_date'>
): Promise<SupabaseActivity | null> => {
  const { data, error } = await supabase
    .from('activities')
    .insert([{ ...activityData, created_by: userId }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating activity:', error);
    return null;
  }
  
  return data as SupabaseActivity;
};

export const updateActivity = async (
  activityId: string,
  updates: Partial<Omit<SupabaseActivity, 'id' | 'created_by' | 'created_at' | 'updated_at'>>
): Promise<SupabaseActivity | null> => {
  const { data, error } = await supabase
    .from('activities')
    .update(updates)
    .eq('id', activityId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating activity:', error);
    return null;
  }
  
  return data as SupabaseActivity;
};

export const deleteActivity = async (activityId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('activities')
    .delete()
    .eq('id', activityId);
  
  if (error) {
    console.error('Error deleting activity:', error);
    return false;
  }
  
  return true;
};

// Transactions
export const getTransactions = async (childId: string): Promise<SupabaseTransaction[]> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('child_id', childId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
  
  return data as SupabaseTransaction[];
};

export const createTransaction = async (
  userId: string,
  transactionData: Omit<SupabaseTransaction, 'id' | 'created_by' | 'created_at'>
): Promise<SupabaseTransaction | null> => {
  const { data, error } = await supabase
    .from('transactions')
    .insert([{ ...transactionData, created_by: userId }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating transaction:', error);
    return null;
  }
  
  return data as SupabaseTransaction;
};

// Rewards
export const getRewards = async (): Promise<SupabaseReward[]> => {
  const { data, error } = await supabase
    .from('rewards')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching rewards:', error);
    return [];
  }
  
  return data as SupabaseReward[];
};

export const createReward = async (
  userId: string,
  rewardData: Omit<SupabaseReward, 'id' | 'created_by' | 'created_at' | 'updated_at'>
): Promise<SupabaseReward | null> => {
  const { data, error } = await supabase
    .from('rewards')
    .insert([{ ...rewardData, created_by: userId }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating reward:', error);
    return null;
  }
  
  return data as SupabaseReward;
};

export const updateReward = async (
  rewardId: string,
  updates: Partial<Omit<SupabaseReward, 'id' | 'created_by' | 'created_at' | 'updated_at'>>
): Promise<SupabaseReward | null> => {
  const { data, error } = await supabase
    .from('rewards')
    .update(updates)
    .eq('id', rewardId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating reward:', error);
    return null;
  }
  
  return data as SupabaseReward;
};

export const deleteReward = async (rewardId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('rewards')
    .delete()
    .eq('id', rewardId);
  
  if (error) {
    console.error('Error deleting reward:', error);
    return false;
  }
  
  return true;
};

// Redemptions
export const getRedemptions = async (childId: string): Promise<SupabaseRedemption[]> => {
  const { data, error } = await supabase
    .from('redemptions')
    .select('*, rewards(*)')
    .eq('child_id', childId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching redemptions:', error);
    return [];
  }
  
  return data as SupabaseRedemption[];
};

export const createRedemption = async (redemptionData: Omit<SupabaseRedemption, 'id' | 'created_at'>): Promise<SupabaseRedemption | null> => {
  const { data, error } = await supabase
    .from('redemptions')
    .insert([redemptionData])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating redemption:', error);
    return null;
  }
  
  return data as SupabaseRedemption;
};
