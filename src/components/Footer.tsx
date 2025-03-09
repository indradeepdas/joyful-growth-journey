
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FFA500] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Link to="/" className="inline-block mb-4">
            <h3 className="text-2xl font-bold">The Good Child Project</h3>
          </Link>
          <p className="text-white/80 mb-6 max-w-md">
            Transforming parenting with gamified positive reinforcement. Encourage your child's development through fun, engaging activities and rewarding experiences.
          </p>
          <div className="flex gap-4">
            <a 
              href="#" 
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="mailto:contact@thegoodchildproject.com" 
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/public/dashboard" className="text-white/80 hover:text-white transition-colors">Parent Dashboard</Link></li>
            <li><Link to="/public/activities" className="text-white/80 hover:text-white transition-colors">Activity Center</Link></li>
            <li><Link to="/public/rewards" className="text-white/80 hover:text-white transition-colors">Rewards Hub</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-4">Information</h4>
          <ul className="space-y-3">
            <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/privacy" className="text-white/80 hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-white/80 hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link to="/faq" className="text-white/80 hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/20 text-center text-white/60">
        <p>© {new Date().getFullYear()} The Good Child Project. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
