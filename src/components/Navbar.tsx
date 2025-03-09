
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { cn } from '@/lib/utils';
import { Menu, X, LogOut, Home, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated, profile } = useSupabaseAuth();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  const handleLogout = async () => {
    await logout();
    closeMenu();
  };
  
  const isParent = profile?.role === 'parent';
  const isChild = profile?.role === 'child';
  
  const navItems = [
    { name: 'Home', path: '/' },
    ...(isParent ? [{ name: 'Parent Dashboard', path: '/parent-dashboard' }] : []),
    ...(isChild ? [{ name: 'Child Dashboard', path: '/child-dashboard' }] : []),
    { name: 'Activity Center', path: '/activities' },
    { name: 'Rewards Hub', path: '/rewards' },
  ];

  return (
    <header className="w-full py-4 px-6 bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <span className="text-2xl font-bold text-goodchild-blue">The Good Child</span>
          <span className="text-xl font-bold text-goodchild-text-secondary">Project</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "font-medium transition-colors duration-200 hover:text-goodchild-blue",
                isActive(item.path) 
                  ? "text-goodchild-blue underline decoration-goodchild-blue decoration-2 underline-offset-8" 
                  : "text-goodchild-text-secondary"
              )}
            >
              {item.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4 ml-4">
              <div className="flex items-center gap-2 text-goodchild-text-secondary">
                <User size={18} />
                <span className="font-medium">{profile?.first_name || 'User'}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-goodchild-red/10 text-goodchild-red px-4 py-2 rounded-full hover:bg-goodchild-red/20 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="btn-primary ml-4"
            >
              Login / Sign Up
            </Link>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-goodchild-text-primary hover:text-goodchild-blue"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-20 px-6 animate-fade-in">
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-xl font-medium py-2 border-b border-gray-100",
                  isActive(item.path) 
                    ? "text-goodchild-blue" 
                    : "text-goodchild-text-secondary"
                )}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center gap-2 text-goodchild-text-secondary py-2">
                  <User size={20} />
                  <span className="font-medium">{profile?.first_name || 'User'}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-goodchild-red/10 text-goodchild-red px-4 py-3 rounded-full hover:bg-goodchild-red/20 transition-colors"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="btn-primary mt-6 text-center"
                onClick={closeMenu}
              >
                Login / Sign Up
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
