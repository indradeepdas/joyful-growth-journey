
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-goodchild-background flex flex-col items-center justify-center p-4">
      <div className="glass-card p-8 rounded-xl text-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-goodchild-text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-goodchild-text-primary mb-6">
          Page Not Found
        </h2>
        <p className="text-goodchild-text-secondary mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => navigate('/')}
            className="bg-goodchild-blue text-white hover:bg-goodchild-blue/90"
          >
            Go to Home
          </Button>
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-goodchild-blue text-goodchild-blue hover:bg-goodchild-blue/10"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
