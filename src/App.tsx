import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SupabaseAuthProvider } from "./contexts/SupabaseAuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RewardsHub from "./pages/RewardsHub";
import ParentDashboard from "./pages/ParentDashboard";
import ChildDashboard from "./pages/ChildDashboard";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ActivityCenter from "./pages/ActivityCenter";
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./pages/auth/ResetPassword";
import PublicDashboard from './pages/PublicDashboard';
import PublicActivityCenter from './pages/PublicActivityCenter';
import PublicRewardsHub from './pages/PublicRewardsHub';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <SupabaseAuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              {/* Public versions of dashboard pages */}
              <Route path="/public/dashboard" element={<PublicDashboard />} />
              <Route path="/public/activities" element={<PublicActivityCenter />} />
              <Route path="/public/rewards" element={<PublicRewardsHub />} />
              
              {/* Protected routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/parent-dashboard" element={<ParentDashboard />} />
                <Route path="/child-dashboard" element={<ChildDashboard />} />
                <Route path="/activities" element={<ActivityCenter />} />
                <Route path="/rewards" element={<RewardsHub />} />
              </Route>
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SupabaseAuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
