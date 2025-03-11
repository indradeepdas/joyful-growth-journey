
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children?: React.ReactNode;
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const location = useLocation();
  
  // Special case for child dashboard - always accessible
  if (location.pathname === '/child-dashboard') {
    return children ? <>{children}</> : <Outlet />;
  }
  
  // Get authentication data from localStorage
  const authData = localStorage.getItem('auth');
  const auth = authData ? JSON.parse(authData) : null;
  const isAuthenticated = !!auth?.isAuthenticated;
  const userRole = auth?.role;
  
  // Show loading state while authentication is being determined
  if (false) { // Changed to false since we don't need loading state with localStorage
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
  if (allowedRoles && allowedRoles.length > 0 && userRole) {
    if (!allowedRoles.includes(userRole)) {
      console.log(`User role ${userRole} not in allowed roles: ${allowedRoles.join(', ')}`);
      
      // Redirect based on role
      if (userRole === 'parent') {
        return <Navigate to="/parent-dashboard" replace />;
      } else if (userRole === 'child') {
        return <Navigate to="/child-dashboard" replace />;
      } else if (userRole === 'teacher') {
        return <Navigate to="/teacher-dashboard" replace />;
      } else if (userRole === 'admin') {
        return <Navigate to="/admin-dashboard" replace />;
      }
      
      // Default fallback
      return <Navigate to="/" replace />;
    }
  }
  
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
