
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

interface PrivateRouteProps {
  children?: React.ReactNode;
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, profile } = useSupabaseAuth();
  const location = useLocation();
  
  // Show loading state while authentication is being determined
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
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
  
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
