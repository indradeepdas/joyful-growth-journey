
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SupabaseProfile, SupabaseChild } from '@/services/types';

interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface CreateChildData {
  name: string;
  surname: string;
  nickname?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: SupabaseProfile | null;
  children: SupabaseChild[];
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  createChildAccount: (childData: CreateChildData) => Promise<void>;
  getProfile: () => Promise<SupabaseProfile | null>;
  getChildren: () => Promise<SupabaseChild[]>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const SupabaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<SupabaseProfile | null>(null);
  const [children, setChildren] = useState<SupabaseChild[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      try {
        setIsLoading(true);
        
        // Get the current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          return;
        }
        
        if (session) {
          setSession(session);
          setUser(session.user);
          
          // Fetch the user's profile
          const profile = await getProfile();
          if (profile) {
            setProfile(profile);
          }
          
          // If user is a parent, fetch their children
          if (profile && profile.role === 'parent') {
            const children = await getChildren();
            setChildren(children);
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
    
    // Listen for authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch the user's profile
          const profile = await getProfile();
          if (profile) {
            setProfile(profile);
          }
          
          // If user is a parent, fetch their children
          if (profile && profile.role === 'parent') {
            const children = await getChildren();
            setChildren(children);
          }
        } else {
          setProfile(null);
          setChildren([]);
        }
        
        setIsLoading(false);
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const getProfile = async (): Promise<SupabaseProfile | null> => {
    try {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return data as SupabaseProfile;
    } catch (error) {
      console.error('Get profile error:', error);
      return null;
    }
  };
  
  const getChildren = async (): Promise<SupabaseChild[]> => {
    try {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('children')
        .select('*')
        .eq('parent_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching children:', error);
        return [];
      }
      
      return data as SupabaseChild[];
    } catch (error) {
      console.error('Get children error:', error);
      return [];
    }
  };
  
  const signUp = async ({ email, password, firstName, lastName }: SignUpData): Promise<void> => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role: 'parent'
          }
        }
      });
      
      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Sign up successful",
        description: "Welcome to The Good Child Project!",
      });
      
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const login = async ({ email, password }: LoginData): Promise<void> => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      setSession(data.session);
      setUser(data.user);
      
      // Fetch user profile
      const profile = await getProfile();
      if (profile) {
        setProfile(profile);
        
        // If user is a parent, fetch their children
        if (profile.role === 'parent') {
          const children = await getChildren();
          setChildren(children);
          
          // Navigate to the parent dashboard
          navigate('/parent-dashboard');
        } else {
          // Navigate to the child dashboard
          navigate('/child-dashboard');
        }
      }
      
      toast({
        title: "Login successful",
        description: "You've been logged in successfully!",
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "Logout failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      setUser(null);
      setSession(null);
      setProfile(null);
      setChildren([]);
      
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
      
      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetPassword = async (email: string): Promise<void> => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        toast({
          title: "Password reset failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Password reset link sent",
        description: "Please check your email for further instructions.",
      });
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const createChildAccount = async (childData: CreateChildData): Promise<void> => {
    try {
      setIsLoading(true);
      
      if (!user) {
        throw new Error('You must be logged in to create a child account');
      }
      
      // Insert the child record
      const { data, error } = await supabase
        .from('children')
        .insert([
          {
            parent_id: user.id,
            name: childData.name,
            surname: childData.surname,
            nickname: childData.nickname || null
          }
        ])
        .select();
      
      if (error) {
        toast({
          title: "Child account creation failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      // Add the new child to the state
      if (data && data.length > 0) {
        setChildren([...children, data[0] as SupabaseChild]);
        
        toast({
          title: "Child account created",
          description: "The child account has been successfully created.",
        });
      }
    } catch (error) {
      console.error('Child account creation error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      children,
      isLoading,
      isAuthenticated: !!user,
      login,
      signUp,
      logout,
      resetPassword,
      createChildAccount,
      getProfile,
      getChildren
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider');
  }
  return context;
};
