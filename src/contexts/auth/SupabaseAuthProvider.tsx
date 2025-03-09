
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

  const updateUserState = async (session: Session | null) => {
    console.log('SupabaseAuthProvider: Updating user state, session exists:', !!session);
    
    if (session?.user) {
      // Convert Supabase user to our User type
      setUser({
        id: session.user.id,
        email: session.user.email || '',
        role: 'parent', // Default, will be overridden by profile data
        createdAt: new Date().toISOString(), // Default, will be overridden by profile data
      });
      
      // Fetch profile data
      const profileData = await fetchProfile(session.user.id);
      console.log('SupabaseAuthProvider: Profile data fetched:', profileData);
      
      if (profileData) {
        setProfile(profileData);
        // Update the user with correct role
        setUser(prev => prev ? {
          ...prev,
          role: profileData.role as 'parent' | 'child',
          createdAt: profileData.created_at,
        } : null);
      } else {
        console.warn('SupabaseAuthProvider: No profile found for user:', session.user.id);
      }
      
      // Fetch child accounts if the user is a parent
      if (profileData && profileData.role === 'parent') {
        const childData = await fetchChildAccounts(session.user.id);
        console.log('SupabaseAuthProvider: Child accounts fetched:', childData);
        setChildAccounts(childData);
      } else {
        setChildAccounts([]);
      }
    } else {
      console.log('SupabaseAuthProvider: No session, clearing user state');
      setUser(null);
      setProfile(null);
      setChildAccounts([]);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    const getSession = async () => {
      console.log('SupabaseAuthProvider: Getting initial session');
      const { data: { session } } = await supabase.auth.getSession();
      await updateUserState(session);
    }

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('SupabaseAuthProvider: Auth state changed, event:', _event);
      await updateUserState(session);
    });

    return () => {
      console.log('SupabaseAuthProvider: Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('SupabaseAuthProvider: Signing in', email);
      setIsLoading(true);
      await authSignIn(email, password);
    } catch (error) {
      console.error("SupabaseAuthProvider: Error signing in:", error);
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
      console.error("SupabaseAuthProvider: Error signing up:", error);
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
      console.error("SupabaseAuthProvider: Error signing out:", error);
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
      console.error("SupabaseAuthProvider: Error resetting password:", error);
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
      console.error("SupabaseAuthProvider: Error updating password:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createChildAccount = async (data: CreateChildAccountParams) => {
    try {
      console.log('SupabaseAuthProvider: Creating child account', data);
      await authCreateChildAccount(data, user?.id);
      
      // Refresh the child accounts list
      console.log('SupabaseAuthProvider: Refreshing child accounts');
      if (user) {
        const childData = await fetchChildAccounts(user.id);
        setChildAccounts(childData);
      }
    } catch (error) {
      console.error("SupabaseAuthProvider: Error creating child account:", error);
      throw error;
    }
  };

  console.log('SupabaseAuthProvider: Current state:', { 
    isAuthenticated: !!user && !!profile,
    isLoading, 
    userExists: !!user, 
    profileExists: !!profile,
    numChildAccounts: childAccounts.length
  });

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
