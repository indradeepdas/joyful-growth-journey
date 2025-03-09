
import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { User } from '@/types';
import { SupabaseProfile, SupabaseChild } from '@/services/types';
import { SupabaseAuthContextType, CreateChildAccountParams } from './types';
import { 
  fetchProfile, 
  fetchChildAccounts, 
  signIn as authSignIn, 
  signUp as authSignUp, 
  signOut as authSignOut,
  resetPassword as authResetPassword, 
  updatePassword as authUpdatePassword,
  createChildAccount as authCreateChildAccount
} from './authFunctions';

export const SupabaseAuthContext = createContext<SupabaseAuthContextType>({
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
        const profileData = await fetchProfile(session.user.id);
        if (profileData) {
          setProfile(profileData);
          // Update the user with correct role
          setUser(prev => prev ? {
            ...prev,
            role: profileData.role as 'parent' | 'child',
            createdAt: profileData.created_at,
          } : null);
        }
        const childData = await fetchChildAccounts(session.user.id);
        setChildAccounts(childData);
      }
      setIsLoading(false);
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
        const profileData = await fetchProfile(session.user.id);
        if (profileData) {
          setProfile(profileData);
          // Update the user with correct role
          setUser(prev => prev ? {
            ...prev,
            role: profileData.role as 'parent' | 'child',
            createdAt: profileData.created_at,
          } : null);
        }
        const childData = await fetchChildAccounts(session.user.id);
        setChildAccounts(childData);
      } else {
        setUser(null);
        setProfile(null);
        setChildAccounts([]);
      }
      setIsLoading(false);
    });
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await authSignIn(email, password);
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
      await authSignUp(email, password, firstName, lastName);
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
      await authSignOut();
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
      await authResetPassword(email);
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
      await authUpdatePassword(newPassword);
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createChildAccount = async (data: CreateChildAccountParams) => {
    try {
      await authCreateChildAccount(data, user?.id);
      // Refresh the child accounts list
      const childData = await fetchChildAccounts(user?.id);
      setChildAccounts(childData);
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
