
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SupabaseAuthProvider } from './contexts/SupabaseAuthContext';
import PrivateRoute from './components/PrivateRoute';

import Index from './pages/Index';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ParentDashboard from './pages/ParentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ChildDashboard from './pages/ChildDashboard';
import ActivityCenter from './pages/ActivityCenter';
import RewardsHub from './pages/RewardsHub';
import PublicDashboard from './pages/PublicDashboard';
import PublicActivityCenter from './pages/PublicActivityCenter';
import PublicRewardsHub from './pages/PublicRewardsHub';
import NotFound from './pages/NotFound';
import AddChild from './pages/AddChild';

function App() {
  return (
    <Router>
      <SupabaseAuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Public Preview Routes */}
          <Route path="/public/dashboard" element={<PublicDashboard />} />
          <Route path="/public/activities" element={<PublicActivityCenter />} />
          <Route path="/public/rewards" element={<PublicRewardsHub />} />
          
          {/* Private Routes */}
          <Route path="/parent-dashboard" element={
            <PrivateRoute allowedRoles={['parent', 'admin']}>
              <ParentDashboard />
            </PrivateRoute>
          } />
          
          <Route path="/child-dashboard" element={
            <PrivateRoute allowedRoles={['child']}>
              <ChildDashboard />
            </PrivateRoute>
          } />
          
          <Route path="/teacher-dashboard" element={
            <PrivateRoute allowedRoles={['teacher', 'admin']}>
              <TeacherDashboard />
            </PrivateRoute>
          } />
          
          <Route path="/admin-dashboard" element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          } />
          
          <Route path="/activity-center" element={
            <PrivateRoute allowedRoles={['parent', 'admin']}>
              <ActivityCenter />
            </PrivateRoute>
          } />
          
          <Route path="/rewards-hub" element={
            <PrivateRoute allowedRoles={['parent', 'admin', 'child']}>
              <RewardsHub />
            </PrivateRoute>
          } />
          
          {/* Add Child Route */}
          <Route path="/add-child" element={
            <PrivateRoute allowedRoles={['parent', 'admin']}>
              <AddChild />
            </PrivateRoute>
          } />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SupabaseAuthProvider>
    </Router>
  );
}

export default App;
