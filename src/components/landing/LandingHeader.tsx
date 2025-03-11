
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingHeader = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <Link to="/" className="flex items-center gap-2">
        <img
          src="/placeholder.svg"
          alt="The Good Child Project Logo"
          className="h-10 w-auto"
        />
        <span className="text-xl font-bold text-goodchild-text-primary">The Good Child Project</span>
      </Link>
      
      <nav className="hidden md:flex items-center gap-6">
        <Link to="/" className="text-goodchild-text-primary hover:text-goodchild-primary transition-colors">
          Home
        </Link>
        <Link to="/public/dashboard" className="text-goodchild-text-primary hover:text-goodchild-primary transition-colors">
          Parent Dashboard
        </Link>
        <Link to="/child-dashboard" className="text-goodchild-text-primary hover:text-goodchild-primary font-bold transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-goodchild-blue after:to-goodchild-green">
          Child Dashboard
        </Link>
        <Link to="/public/activities" className="text-goodchild-text-primary hover:text-goodchild-primary transition-colors">
          Activity Center
        </Link>
        <Link to="/public/rewards" className="text-goodchild-text-primary hover:text-goodchild-primary transition-colors">
          Rewards Hub
        </Link>
      </nav>
      
      <div className="flex items-center gap-2">
        <Link to="/login">
          <Button variant="outline" className="hidden sm:inline-flex">Log In</Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-[#FFA500] hover:bg-[#E69500]">Sign Up</Button>
        </Link>
      </div>
    </header>
  );
};

export default LandingHeader;
