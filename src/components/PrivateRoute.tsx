
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

interface PrivateRouteProps {
  children?: React.ReactNode;
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, profile } = useSupabaseAuth();
  const location = useLocation();
  
  useEffect(() => {
    if (isAuthenticated && profile) {
      console.log('PrivateRoute - Profile:', profile, 'Path:', location.pathname);
    }
  }, [isAuthenticated, profile, location]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    console.log('PrivateRoute - Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  // If specific roles are required, check the user's role
  if (allowedRoles && allowedRoles.length > 0 && profile && !allowedRoles.includes(profile.role)) {
    console.log(`PrivateRoute - User role ${profile.role} not allowed, redirecting`);
    // Redirect parents to parent dashboard, children to child dashboard
    const redirectTo = profile.role === 'parent' ? '/parent-dashboard' : '/child-dashboard';
    return <Navigate to={redirectTo} replace />;
  }
  
  return <>{children || <Outlet />}</>;
};

export default PrivateRoute;
