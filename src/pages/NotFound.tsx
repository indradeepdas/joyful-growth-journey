
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-goodchild-background flex flex-col items-center justify-center p-4 font-nunito">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Page Not Found
        </h2>
        <p className="text-2xl text-gray-700 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => navigate('/')}
            className="bg-goodchild-blue text-white hover:bg-goodchild-blue/90 text-xl py-6"
          >
            Go to Home
          </Button>
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-goodchild-blue text-goodchild-blue hover:bg-goodchild-blue/10 text-xl py-6"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
