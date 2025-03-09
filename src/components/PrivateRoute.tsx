
import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

interface PrivateRouteProps {
  children?: React.ReactNode;
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, profile } = useSupabaseAuth();
  const navigate = useNavigate();
  
  // Debug logs to track authentication state
  useEffect(() => {
    console.log('PrivateRoute - Auth State:', { isAuthenticated, isLoading, profile });
  }, [isAuthenticated, isLoading, profile]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  // If specific roles are required, check the user's role
  if (allowedRoles && allowedRoles.length > 0 && profile && !allowedRoles.includes(profile.role)) {
    console.log(`User role ${profile.role} not in allowed roles: ${allowedRoles.join(', ')}`);
    // Redirect parents to parent dashboard, children to child dashboard
    const redirectTo = profile.role === 'parent' ? '/parent-dashboard' : '/child-dashboard';
    return <Navigate to={redirectTo} replace />;
  }
  
  return <>{children || <Outlet />}</>;
};

export default PrivateRoute;
