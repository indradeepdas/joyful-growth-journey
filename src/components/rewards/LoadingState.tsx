
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = "Loading Rewards..." }) => {
  return (
    <div className="min-h-screen bg-[#e8f0fe] flex flex-col font-sassoon">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-700">{message}</div>
      </div>
      <Footer />
    </div>
  );
};

export default LoadingState;
