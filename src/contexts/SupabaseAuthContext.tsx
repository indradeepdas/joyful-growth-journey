import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { User } from '@/types';
import { SupabaseProfile, SupabaseChild } from '@/services/types';
import { toast } from '@/hooks/use-toast';

// Add the new types for creating a child account
type CreateChildAccountParams = {
  name: string;
  surname: string;
  nickname?: string;
  email: string;
  avatar?: string | null;
  userId: string;
};

// Update the context type to include the new function
type SupabaseAuthContextType = {
  user: User | null;
  profile: SupabaseProfile | null;
  childAccounts: SupabaseChild[];
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  createChildAccount: (data: CreateChildAccountParams) => Promise<void>;
};

const SupabaseAuthContext = createContext<SupabaseAuthContextType>({
  user: null,
  profile: null,
  childAccounts: [],
  isAuthenticated: false,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
  updatePassword: async () => {},
  createChildAccount: async () => {},
});

export const useSupabaseAuth = () => useContext(SupabaseAuthContext);

export const SupabaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<SupabaseProfile | null>(null);
  const [childAccounts, setChildAccounts] = useState<SupabaseChild[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        // Convert Supabase user to our User type
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          role: 'parent', // Default, will be overridden by profile data
          createdAt: new Date().toISOString(), // Default, will be overridden by profile data
        });
        fetchProfile(session.user.id);
        fetchChildAccounts();
      } else {
        setIsLoading(false);
      }
    }

    getSession();

    supabase.auth.onAuthStateChange(async (_event, session: Session | null) => {
      if (session?.user) {
        // Convert Supabase user to our User type
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          role: 'parent', // Default, will be overridden by profile data
          createdAt: new Date().toISOString(), // Default, will be overridden by profile data
        });
        fetchProfile(session.user.id);
        fetchChildAccounts();
      } else {
        setUser(null);
        setProfile(null);
        setChildAccounts([]);
        setIsLoading(false);
      }
    });
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      setProfile({
        id: profileData.id,
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        nickname: profileData.nickname,
        avatar_url: profileData.avatar_url,
        role: profileData.role,
        created_at: profileData.created_at,
        updated_at: profileData.updated_at,
      });

      // Update the user with correct role
      if (user) {
        setUser({
          ...user,
          role: profileData.role as 'parent' | 'child',
          createdAt: profileData.created_at,
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChildAccounts = async () => {
    try {
      const { data: childData, error } = await supabase
        .from('children')
        .select('*')
        .eq('parent_id', user?.id);

      if (error) throw error;

      setChildAccounts(childData || []);
    } catch (error) {
      console.error("Error fetching child accounts:", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setIsLoading(true);
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
      }
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createChildAccount = async (data: CreateChildAccountParams) => {
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
          parent_id: user?.id,
          name: data.name,
          surname: data.surname,
          nickname: data.nickname || null,
          avatar: data.avatar || null,
          good_coins: 0
        });
        
      if (error) throw error;
      
      // Refresh the child accounts list
      fetchChildAccounts();
      
    } catch (error) {
      console.error("Error creating child account:", error);
      throw error;
    }
  };

  return (
    <SupabaseAuthContext.Provider
      value={{
        user,
        profile,
        childAccounts,
        isAuthenticated: !!user && !!profile,
        isLoading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
        createChildAccount
      }}
    >
      {children}
    </SupabaseAuthContext.Provider>
  );
};
