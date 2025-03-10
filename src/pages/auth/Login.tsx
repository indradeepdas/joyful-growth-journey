
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, isAuthenticated, profile } = useSupabaseAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    console.log('Login page - Auth state changed:', { isAuthenticated, profileRole: profile?.role });
    
    if (isAuthenticated && profile) {
      // Redirect based on user role
      console.log('Redirecting based on role:', profile.role);
      if (profile.role === 'parent') {
        navigate('/parent-dashboard');
      } else if (profile.role === 'child') {
        navigate('/child-dashboard');
      } else if (profile.role === 'teacher') {
        navigate('/teacher-dashboard');
      } else if (profile.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        // Default fallback
        navigate('/');
      }
    }
  }, [isAuthenticated, profile, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      console.log('Attempting login with email:', email);
      await signIn(email, password);
      // Redirection will be handled by the useEffect
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
