
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types';
import { SupabaseProfile, SupabaseChild } from '@/services/types';
import { CreateChildAccountParams } from './types';

export const fetchProfile = async (userId: string): Promise<SupabaseProfile | null> => {
  try {
    const { data: profileData, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return {
      id: profileData.id,
      first_name: profileData.first_name,
      last_name: profileData.last_name,
      nickname: profileData.nickname,
      avatar_url: profileData.avatar_url,
      role: profileData.role,
      created_at: profileData.created_at,
      updated_at: profileData.updated_at,
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

export const fetchChildAccounts = async (parentId: string | undefined): Promise<SupabaseChild[]> => {
  try {
    if (!parentId) return [];
    
    const { data: childData, error } = await supabase
      .from('children')
      .select('*')
      .eq('parent_id', parentId);

    if (error) throw error;

    return childData || [];
  } catch (error) {
    console.error("Error fetching child accounts:", error);
    return [];
  }
};

export const signIn = async (email: string, password: string): Promise<void> => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
};

export const signUp = async (email: string, password: string, firstName: string, lastName: string): Promise<string | null> => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        role: 'parent',
      }
    }
  });
  
  if (error) throw error;

  if (data.user) {
    // Create a profile for the user
    await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        first_name: firstName,
        last_name: lastName,
        role: 'parent',
      });
      
    return data.user.id;
  }
  
  return null;
};

export const signOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const resetPassword = async (email: string): Promise<void> => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
};

export const updatePassword = async (newPassword: string): Promise<void> => {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
};

export const createChildAccount = async (data: CreateChildAccountParams, parentId: string | undefined): Promise<void> => {
  try {
    console.log('Creating child account in database:', data);
    
    // First, insert the profile record
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.userId,
        first_name: data.name,
        last_name: data.surname,
        nickname: data.nickname || null,
        avatar_url: data.avatar || null,
        role: 'child'
      });
      
    if (profileError) throw profileError;
    
    // Then, insert the child record in the children table
    const { error } = await supabase
      .from('children')
      .insert({
        id: data.userId,
        parent_id: parentId,
        name: data.name,
        surname: data.surname,
        nickname: data.nickname || null,
        avatar: data.avatar || null,
        good_coins: 0
      });
      
    if (error) throw error;
    
  } catch (error) {
    console.error("Error creating child account:", error);
    throw error;
  }
};
