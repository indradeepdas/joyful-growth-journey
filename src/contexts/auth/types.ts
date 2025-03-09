
import { User } from '@/types';
import { SupabaseProfile, SupabaseChild } from '@/services/types';

// Add the new types for creating a child account
export type CreateChildAccountParams = {
  name: string;
  surname: string;
  nickname?: string;
  email: string;
  avatar?: string | null;
  userId: string;
};

// Update the context type to include the new function
export type SupabaseAuthContextType = {
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
