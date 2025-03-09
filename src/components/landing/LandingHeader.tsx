
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingHeader = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center">
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
        <Link to="/parent-dashboard" className="text-goodchild-text-primary hover:text-goodchild-primary transition-colors">
          Parent Dashboard
        </Link>
        <Link to="/child-dashboard" className="text-goodchild-text-primary hover:text-goodchild-primary transition-colors">
          Child Dashboard
        </Link>
        <Link to="/activities" className="text-goodchild-text-primary hover:text-goodchild-primary transition-colors">
          Activity Center
        </Link>
        <Link to="/rewards" className="text-goodchild-text-primary hover:text-goodchild-primary transition-colors">
          Rewards Hub
        </Link>
      </nav>
      
      <div className="flex items-center gap-2">
        <Link to="/login">
          <Button variant="outline" className="hidden sm:inline-flex">Log In</Button>
        </Link>
        <Link to="/signup">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </header>
  );
};

export default LandingHeader;
