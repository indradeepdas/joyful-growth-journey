
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ErrorStateProps {
  error: Error | unknown;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div className="min-h-screen bg-[#fdfcf9] flex flex-col font-sassoon">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="h-12 w-12 text-[#e76b74] mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-[#4a6fa1]">Error Loading Rewards</h2>
          <p className="text-[#707b9b] mb-4">
            {error instanceof Error ? error.message : 'An unexpected error occurred'}
          </p>
          <Button onClick={() => window.location.reload()} className="bg-[#94c5cc] hover:bg-[#7db0b7]">
            Try Again
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorState;
