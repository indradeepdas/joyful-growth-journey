
import { useContext } from 'react';
import { SupabaseAuthContext } from './SupabaseAuthProvider';

export const useSupabaseAuth = () => useContext(SupabaseAuthContext);
