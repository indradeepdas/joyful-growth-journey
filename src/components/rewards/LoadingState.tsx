
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = "Loading Rewards..." }) => {
  return (
    <div className="min-h-screen bg-[#fdfcf9] flex flex-col font-sassoon">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse text-xl text-[#4a6fa1]">{message}</div>
      </div>
      <Footer />
    </div>
  );
};

export default LoadingState;
