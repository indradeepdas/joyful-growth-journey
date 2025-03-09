
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { signIn } = useSupabaseAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }
    
    try {
      setIsLoading(true);
      await signIn(email, password);
      toast({
        title: "Success!",
        description: "You have successfully logged in.",
      });
      // Redirect will happen automatically via the SupabaseAuthContext effect
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An error occurred during login. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-goodchild-background py-12 px-4 sm:px-6 lg:px-8 font-sassoon">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-goodchild-text-primary">Welcome back!</h1>
          <p className="mt-2 text-sm text-goodchild-text-secondary">
            Sign in to continue to your GoodChild dashboard
          </p>
        </div>
        
        {errorMessage && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-goodchild-text-primary mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-goodchild-text-primary focus:outline-none focus:ring-2 focus:ring-goodchild-blue focus:border-goodchild-blue sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-goodchild-text-primary">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-goodchild-blue hover:text-goodchild-blue-dark">
                  Forgot your password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-goodchild-text-primary focus:outline-none focus:ring-2 focus:ring-goodchild-blue focus:border-goodchild-blue sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-goodchild-blue hover:bg-goodchild-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-goodchild-blue disabled:opacity-70"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="text-sm">
              <span className="text-goodchild-text-secondary">Don't have an account? </span>
              <Link to="/signup" className="font-medium text-goodchild-blue hover:text-goodchild-blue-dark">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
