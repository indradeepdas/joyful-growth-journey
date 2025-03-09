import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import ParentDashboard from './pages/ParentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

// Protected route component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { currentUser, userRole, loading } = useContext(AuthContext);
  
  if (loading) return <div>Loading...</div>;
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'parent') return <Navigate to="/parent" />;
    if (userRole === 'teacher') return <Navigate to="/teacher" />;
    if (userRole === 'admin') return <Navigate to="/admin" />;
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  const { currentUser, userRole } = useContext(AuthContext);
  
  // Helper function to redirect logged-in users to their dashboard
  const redirectToDashboard = () => {
    if (!currentUser) return null;
    
    switch(userRole) {
      case 'parent':
        return <Navigate to="/parent" />;
      case 'teacher':
        return <Navigate to="/teacher" />;
      case 'admin':
        return <Navigate to="/admin" />;
      default:
        return <Navigate to="/parent" />; // Default to parent dashboard
    }
  };
  
  return (
    <Routes>
      <Route path="/login" element={
        currentUser ? redirectToDashboard() : <Login />
      } />
      <Route path="/register" element={
        currentUser ? redirectToDashboard() : <Register />
      } />
      
      <Route path="/parent" element={
        <ProtectedRoute allowedRoles={['parent', 'admin']}>
          <ParentDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/teacher" element={
        <ProtectedRoute allowedRoles={['teacher', 'admin']}>
          <TeacherDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/" element={
        currentUser ? redirectToDashboard() : <Navigate to="/login" />
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
