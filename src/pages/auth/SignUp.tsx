
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/hooks/use-toast';

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { signUp } = useSupabaseAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!firstName.trim()) {
      setErrorMessage('Please enter your first name.');
      return false;
    }
    if (!lastName.trim()) {
      setErrorMessage('Please enter your last name.');
      return false;
    }
    if (!email) {
      setErrorMessage('Please enter your email address.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      await signUp(email, password, firstName, lastName);
      toast({
        title: "Account created!",
        description: "Your account has been created successfully. Please verify your email to continue.",
      });
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An error occurred during sign up. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-goodchild-background py-12 px-4 sm:px-6 lg:px-8 font-sassoon">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-goodchild-text-primary">Create an Account</h1>
          <p className="mt-2 text-sm text-goodchild-text-secondary">
            Join GoodChild to help your children develop good habits and skills
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
        
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-goodchild-text-primary mb-1">
                  First Name
                </label>
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-goodchild-text-primary focus:outline-none focus:ring-2 focus:ring-goodchild-blue focus:border-goodchild-blue sm:text-sm"
                  placeholder="First name"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-goodchild-text-primary mb-1">
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-goodchild-text-primary focus:outline-none focus:ring-2 focus:ring-goodchild-blue focus:border-goodchild-blue sm:text-sm"
                  placeholder="Last name"
                />
              </div>
            </div>
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
              <label htmlFor="password" className="block text-sm font-medium text-goodchild-text-primary mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-goodchild-text-primary focus:outline-none focus:ring-2 focus:ring-goodchild-blue focus:border-goodchild-blue sm:text-sm"
                placeholder="Password (min 6 characters)"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-goodchild-text-primary mb-1">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-goodchild-text-primary focus:outline-none focus:ring-2 focus:ring-goodchild-blue focus:border-goodchild-blue sm:text-sm"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-goodchild-blue hover:bg-goodchild-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-goodchild-blue disabled:opacity-70"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="text-sm">
              <span className="text-goodchild-text-secondary">Already have an account? </span>
              <Link to="/login" className="font-medium text-goodchild-blue hover:text-goodchild-blue-dark">
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
