
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  role?: 'parent' | 'child';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
  const { isAuthenticated, isLoading, profile } = useSupabaseAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If a specific role is required, check the user's role
  if (role && profile && profile.role !== role) {
    // Redirect parents to parent dashboard, children to child dashboard
    const redirectTo = profile.role === 'parent' ? '/parent-dashboard' : '/child-dashboard';
    return <Navigate to={redirectTo} replace />;
  }
  
  return <>{children}</>;
};

export default PrivateRoute;
