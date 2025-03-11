
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Dummy user data - in a real app, this would come from a database
const DUMMY_USERS = [
  { email: 'parent@example.com', password: 'password', role: 'parent' },
  { email: 'child@example.com', password: 'password', role: 'child' },
  { email: 'teacher@example.com', password: 'password', role: 'teacher' },
  { email: 'admin@example.com', password: 'password', role: 'admin' },
];

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get the intended destination from location state, if available
  const from = location.state?.from?.pathname || '/';
  
  // Check if user is already logged in (from localStorage in this dummy implementation)
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setUserRole(authData.role);
    }
  }, []);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && userRole) {
      console.log('Login page - Redirecting authenticated user to appropriate dashboard');
      
      // Redirect based on user role
      if (userRole === 'parent') {
        navigate('/parent-dashboard', { replace: true });
      } else if (userRole === 'child') {
        navigate('/child-dashboard', { replace: true });
      } else if (userRole === 'teacher') {
        navigate('/teacher-dashboard', { replace: true });
      } else if (userRole === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      } else {
        // Default fallback
        navigate(from, { replace: true });
      }
    }
  }, [isAuthenticated, userRole, navigate, from]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      console.log('Attempting login with email:', email);
      
      // Simulate backend authentication with dummy data
      const user = DUMMY_USERS.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Store authentication data in localStorage (only for demo purposes)
        const authData = {
          email: user.email,
          role: user.role,
          isAuthenticated: true
        };
        localStorage.setItem('auth', JSON.stringify(authData));
        
        setIsAuthenticated(true);
        setUserRole(user.role);
        
        // Toast success
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        
        // Redirect is handled by the useEffect
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error: any) {
      console.error('Login error:', error.message);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // If already authenticated, show a loading state while redirect happens
  if (isAuthenticated && userRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-goodchild-background">
        <div className="animate-pulse text-lg">Redirecting to dashboard...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-goodchild-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-goodchild-blue hover:bg-goodchild-blue/90 text-white"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm">
            Don't have an account? <a href="/signup" className="text-goodchild-blue hover:underline">Sign up</a>
          </div>
          <div className="text-center text-sm">
            <a href="/forgot-password" className="text-goodchild-blue hover:underline">Forgot password?</a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
