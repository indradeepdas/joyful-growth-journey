
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';
import GoodCoinIcon from '@/components/GoodCoinIcon';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, profile, isLoading, signOut } = useSupabaseAuth();
  const isMobile = useIsMobile();
  const [showMenu, setShowMenu] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const isAuthenticated = !!user && !!profile;
  
  const getRouteForLink = (authenticatedRoute: string, publicRoute: string) => {
    return isAuthenticated ? authenticatedRoute : publicRoute;
  };

  return (
    <header className="sticky top-0 bg-white shadow-sm z-40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center font-bold text-xl text-goodchild-text-primary">
          GoodChild
          <GoodCoinIcon className="ml-2 w-6 h-6" />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to={getRouteForLink('/parent-dashboard', '/public/dashboard')} 
            className={`nav-link ${location.pathname === '/parent-dashboard' || location.pathname === '/public/dashboard' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/child-dashboard" 
            className={`nav-link ${location.pathname === '/child-dashboard' ? 'active' : ''} font-bold text-goodchild-blue`}
          >
            Child Dashboard
          </Link>
          <Link 
            to={getRouteForLink('/activities', '/public/activities')} 
            className={`nav-link ${location.pathname === '/activities' || location.pathname === '/public/activities' ? 'active' : ''}`}
          >
            Activity Center
          </Link>
          <Link 
            to={getRouteForLink('/rewards', '/public/rewards')} 
            className={`nav-link ${location.pathname === '/rewards' || location.pathname === '/public/rewards' ? 'active' : ''}`}
          >
            Rewards Hub
          </Link>
          
          {isAuthenticated ? (
            <>
              <button onClick={handleSignOut} className="btn-secondary">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Sign In
              </Link>
              <Link to="/signup" className="btn-primary">
                Create Account
              </Link>
            </>
          )}
        </nav>
        
        <button
          onClick={() => setShowMenu(true)}
          className="md:hidden text-goodchild-text-primary focus:outline-none"
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {showMenu && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50">
          <div className="h-full w-64 bg-white p-5 flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="flex items-center font-bold text-xl text-goodchild-text-primary">
                GoodChild
                <GoodCoinIcon className="ml-2 w-6 h-6" />
              </Link>
              <button
                onClick={() => setShowMenu(false)}
                className="text-goodchild-text-primary focus:outline-none"
                aria-label="Close Menu"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col space-y-4 mt-8">
              <Link 
                to={getRouteForLink('/parent-dashboard', '/public/dashboard')} 
                className={`mobile-nav-link ${location.pathname === '/parent-dashboard' || location.pathname === '/public/dashboard' ? 'active' : ''}`}
                onClick={() => setShowMenu(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/child-dashboard" 
                className={`mobile-nav-link ${location.pathname === '/child-dashboard' ? 'active' : ''} font-bold text-goodchild-blue`}
                onClick={() => setShowMenu(false)}
              >
                Child Dashboard
              </Link>
              <Link 
                to={getRouteForLink('/activities', '/public/activities')} 
                className={`mobile-nav-link ${location.pathname === '/activities' || location.pathname === '/public/activities' ? 'active' : ''}`}
                onClick={() => setShowMenu(false)}
              >
                Activity Center
              </Link>
              <Link 
                to={getRouteForLink('/rewards', '/public/rewards')} 
                className={`mobile-nav-link ${location.pathname === '/rewards' || location.pathname === '/public/rewards' ? 'active' : ''}`}
                onClick={() => setShowMenu(false)}
              >
                Rewards Hub
              </Link>
              
              {isAuthenticated ? (
                <button onClick={handleSignOut} className="mobile-nav-link">
                  Sign Out
                </button>
              ) : (
                <>
                  <Link to="/login" className="mobile-nav-link" onClick={() => setShowMenu(false)}>
                    Sign In
                  </Link>
                  <Link to="/signup" className="btn-primary" onClick={() => setShowMenu(false)}>
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
