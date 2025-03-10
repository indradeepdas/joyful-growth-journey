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

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }

    if (!profileData) {
      console.warn("No profile found for user:", userId);
      return null;
    }

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

    if (error) {
      console.error("Error fetching child accounts:", error);
      return [];
    }

    return childData || [];
  } catch (error) {
    console.error("Error fetching child accounts:", error);
    return [];
  }
};

export const signIn = async (email: string, password: string): Promise<void> => {
  console.log('authFunctions: Signing in with email', email);
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  
  if (error) {
    console.error('authFunctions: Sign in error', error);
    throw error;
  }
  
  if (!data || !data.user) {
    console.error('authFunctions: No user returned after sign in');
    throw new Error('Failed to authenticate user');
  }
  
  console.log('authFunctions: Sign in successful', data.user.id);
};

export const signUp = async (email: string, password: string, firstName: string, lastName: string): Promise<void> => {
  try {
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
      await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          first_name: firstName,
          last_name: lastName,
          role: 'parent',
        });
    }
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
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
    if (!parentId) {
      throw new Error("Parent ID is required to create a child account");
    }
    
    console.log('Creating child account in database:', { ...data, parentId });
    
    // First, check if the profile already exists
    const { data: existingProfile, error: profileCheckError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', data.userId)
      .single();
      
    if (profileCheckError && profileCheckError.code !== 'PGRST116') {
      console.error("Error checking existing profile:", profileCheckError);
      throw profileCheckError;
    }
    
    // Only insert profile if it doesn't exist
    if (!existingProfile) {
      console.log('Creating new profile record');
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
        
      if (profileError) {
        console.error("Error creating profile:", profileError);
        throw profileError;
      }
    } else {
      console.log('Profile already exists, skipping profile creation');
    }
    
    // Then, insert the child record in the children table
    console.log('Creating children record with data:', {
      id: data.userId,
      parent_id: parentId,
      name: data.name,
      surname: data.surname,
      nickname: data.nickname,
      avatar: data.avatar
    });
    
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
      
    if (error) {
      console.error("Error creating child record:", error);
      throw error;
    }
    
    console.log('Child account created successfully');
    
  } catch (error) {
    console.error("Error creating child account:", error);
    throw error;
  }
};
