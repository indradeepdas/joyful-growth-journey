
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User, Parent, Child } from '@/types';

// Mock data until Supabase integration
const MOCK_PARENTS: Parent[] = [
  {
    id: '1',
    email: 'parent@example.com',
    role: 'parent',
    createdAt: new Date().toISOString(),
    children: [
      {
        id: '2',
        email: 'child@example.com',
        role: 'child',
        name: 'Alex',
        surname: 'Johnson',
        nickname: 'Al',
        goodCoins: 350,
        parentId: '1',
        createdAt: new Date().toISOString(),
      }
    ]
  }
];

const MOCK_CHILDREN: Child[] = MOCK_PARENTS.flatMap(parent => parent.children);

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  createChildAccount: (childData: Omit<Child, 'id' | 'role' | 'createdAt' | 'goodCoins'>) => Promise<void>;
  getParentData: () => Parent | null;
  getChildData: () => Child | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('goodchild_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('goodchild_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('goodchild_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('goodchild_user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Mock login - replace with Supabase later
      const parentUser = MOCK_PARENTS.find(p => p.email === email);
      const childUser = MOCK_CHILDREN.find(c => c.email === email);
      
      if (parentUser && password === 'password') {
        setUser({ id: parentUser.id, email, role: 'parent', createdAt: parentUser.createdAt });
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        return;
      } else if (childUser && password === 'password') {
        setUser({ id: childUser.id, email, role: 'child', createdAt: childUser.createdAt });
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        return;
      }
      
      throw new Error('Invalid email or password');
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Mock signup - replace with Supabase later
      if (MOCK_PARENTS.some(p => p.email === email) || MOCK_CHILDREN.some(c => c.email === email)) {
        throw new Error('Email already in use');
      }
      
      // Create new parent user
      const newParent: Parent = {
        id: `parent-${Date.now()}`,
        email,
        role: 'parent',
        createdAt: new Date().toISOString(),
        children: []
      };
      
      MOCK_PARENTS.push(newParent);
      setUser({ id: newParent.id, email, role: 'parent', createdAt: newParent.createdAt });
      
      toast({
        title: "Sign up successful",
        description: "Welcome to The Good Child Project!",
      });
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      // Mock password reset - replace with Supabase later
      const userExists = MOCK_PARENTS.some(p => p.email === email) || MOCK_CHILDREN.some(c => c.email === email);
      
      if (!userExists) {
        throw new Error('No account found with this email address');
      }
      
      toast({
        title: "Password reset link sent",
        description: "Please check your email for further instructions.",
      });
    } catch (error) {
      toast({
        title: "Password reset failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createChildAccount = async (childData: Omit<Child, 'id' | 'role' | 'createdAt' | 'goodCoins'>) => {
    try {
      setIsLoading(true);
      
      if (!user || user.role !== 'parent') {
        throw new Error('Only parents can create child accounts');
      }
      
      // Check if email is already in use
      if (MOCK_PARENTS.some(p => p.email === childData.email) || MOCK_CHILDREN.some(c => c.email === childData.email)) {
        throw new Error('Email already in use');
      }
      
      const newChild: Child = {
        id: `child-${Date.now()}`,
        ...childData,
        role: 'child',
        createdAt: new Date().toISOString(),
        goodCoins: 0
      };
      
      // Find parent and add child
      const parentIndex = MOCK_PARENTS.findIndex(p => p.id === user.id);
      if (parentIndex !== -1) {
        MOCK_PARENTS[parentIndex].children.push(newChild);
        MOCK_CHILDREN.push(newChild);
        
        toast({
          title: "Child account created",
          description: "The child account has been successfully created.",
        });
      } else {
        throw new Error('Parent not found');
      }
    } catch (error) {
      toast({
        title: "Child account creation failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getParentData = (): Parent | null => {
    if (!user || user.role !== 'parent') return null;
    return MOCK_PARENTS.find(p => p.id === user.id) || null;
  };

  const getChildData = (): Child | null => {
    if (!user || user.role !== 'child') return null;
    return MOCK_CHILDREN.find(c => c.id === user.id) || null;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      resetPassword,
      createChildAccount,
      getParentData,
      getChildData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
