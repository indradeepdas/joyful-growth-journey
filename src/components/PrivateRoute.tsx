
import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

interface PrivateRouteProps {
  children?: React.ReactNode;
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, profile } = useSupabaseAuth();
  
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
  if (allowedRoles && allowedRoles.length > 0 && profile) {
    if (!allowedRoles.includes(profile.role)) {
      console.log(`User role ${profile.role} not in allowed roles: ${allowedRoles.join(', ')}`);
      
      // Redirect based on role
      if (profile.role === 'parent') {
        return <Navigate to="/parent-dashboard" replace />;
      } else if (profile.role === 'child') {
        return <Navigate to="/child-dashboard" replace />;
      } else if (profile.role === 'teacher') {
        return <Navigate to="/teacher-dashboard" replace />;
      } else if (profile.role === 'admin') {
        return <Navigate to="/admin-dashboard" replace />;
      }
      
      // Default fallback
      return <Navigate to="/" replace />;
    }
  }
  
  return <>{children || <Outlet />}</>;
};

export default PrivateRoute;
