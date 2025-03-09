
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GoodCoinIcon from '@/components/GoodCoinIcon';

const Index = () => {
  return (
    <div className="min-h-screen bg-goodchild-background flex flex-col">
      {/* Header */}
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
      
      {/* Hero Section */}
      <section className="w-full py-16 md:py-28 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-goodchild-text-primary mb-6">
              Transform Parenting with <span className="text-gradient">Gamified Positive Reinforcement</span>
            </h1>
            <p className="text-xl text-goodchild-text-secondary mb-8 max-w-xl">
              Encourage your child's development through fun, engaging activities and rewarding experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started Free
                </Button>
              </Link>
              <Link to="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="glass-card p-6 rounded-xl w-full max-w-md">
              <img 
                src="https://placehold.co/600x400/FFD166/073B4C?text=Happy+Family" 
                alt="Happy family using The Good Child Project" 
                className="w-full h-auto rounded-lg mb-4" 
              />
              <div className="text-center">
                <p className="font-medium text-lg">Building better families through positive reinforcement</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="w-full py-16 px-4 bg-goodchild-background-alt">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-goodchild-text-primary mb-4">
              Key Features
            </h2>
            <p className="text-goodchild-text-secondary max-w-2xl mx-auto">
              Our platform is designed to make parenting more effective and enjoyable for both you and your children.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Gamified Task System',
                description: 'Assign activities, reward progress with GoodCoins, and build positive habits.',
                icon: '🎮',
              },
              {
                title: 'Developmental Areas',
                description: 'Focus on 7 critical areas: Health & Mind, Communication, Creativity, and more.',
                icon: '🧠',
              },
              {
                title: 'Progress Tracking',
                description: 'Monitor your child\'s progress and identify areas for growth.',
                icon: '📈',
              },
              {
                title: 'Customizable Activities',
                description: 'Create personalized activities tailored to your child\'s interests.',
                icon: '✏️',
              },
            ].map((feature, index) => (
              <div key={index} className="glass-card p-6 rounded-xl hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-goodchild-text-primary">{feature.title}</h3>
                <p className="text-goodchild-text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Activity Center Showcase */}
      <section className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-goodchild-text-primary mb-4">
              Explore Engaging Activities and Foster Growth
            </h2>
            <p className="text-goodchild-text-secondary max-w-2xl mx-auto">
              Parents can assign activities to their children, designed to promote development across 7 critical areas:
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
            {[
              "Health & Mind",
              "Effective Communication",
              "Personal Enrichment",
              "Creativity",
              "Deeper Family Bonds",
              "Emotional Intelligence",
              "Social Skills"
            ].map((area, index) => (
              <div 
                key={index} 
                className="glass-card p-4 rounded-xl text-center hover:shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <h3 className="font-medium text-goodchild-text-primary">{area}</h3>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/activities">
              <Button size="lg">
                View Activity Center
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Rewards Hub Showcase */}
      <section className="w-full py-16 px-4 bg-goodchild-background-alt">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-goodchild-text-primary mb-4">
              Unlock Exciting Rewards
            </h2>
            <p className="text-goodchild-text-secondary max-w-2xl mx-auto">
              Children can redeem their earned GoodCoins for meaningful rewards that encourage further positive behavior.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
            <div className="glass-card p-6 rounded-xl max-w-xs w-full text-center">
              <img 
                src="https://placehold.co/300x200/FFD166/073B4C?text=LEGO+Set" 
                alt="LEGO Building Set" 
                className="w-full h-auto rounded-lg mb-4" 
              />
              <h3 className="text-xl font-medium mb-1">LEGO Building Set</h3>
              <div className="flex items-center justify-center gap-2 mb-2">
                <GoodCoinIcon className="w-5 h-5" />
                <span className="font-bold">50 GoodCoins</span>
              </div>
              <p className="text-goodchild-text-secondary text-sm">
                <span className="line-through">$24.99</span> → <span className="font-bold">$19.99</span>
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl max-w-xs w-full text-center">
              <img 
                src="https://placehold.co/300x200/06D6A0/073B4C?text=Art+Kit" 
                alt="Art Supplies Kit" 
                className="w-full h-auto rounded-lg mb-4" 
              />
              <h3 className="text-xl font-medium mb-1">Art Supplies Kit</h3>
              <div className="flex items-center justify-center gap-2 mb-2">
                <GoodCoinIcon className="w-5 h-5" />
                <span className="font-bold">40 GoodCoins</span>
              </div>
              <p className="text-goodchild-text-secondary text-sm">
                <span className="line-through">$19.99</span> → <span className="font-bold">$15.99</span>
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl max-w-xs w-full text-center">
              <img 
                src="https://placehold.co/300x200/118AB2/FFFFFF?text=Books" 
                alt="Children's Book Bundle" 
                className="w-full h-auto rounded-lg mb-4" 
              />
              <h3 className="text-xl font-medium mb-1">Children's Book Bundle</h3>
              <div className="flex items-center justify-center gap-2 mb-2">
                <GoodCoinIcon className="w-5 h-5" />
                <span className="font-bold">60 GoodCoins</span>
              </div>
              <p className="text-goodchild-text-secondary text-sm">
                <span className="line-through">$29.99</span> → <span className="font-bold">$23.99</span>
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/rewards">
              <Button size="lg">
                Visit Rewards Hub
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full py-12 px-4 bg-goodchild-background-dark text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">The Good Child Project</h3>
              <p className="text-gray-300">
                Transforming parenting with gamified positive reinforcement.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/parent-dashboard" className="text-gray-300 hover:text-white transition-colors">Parent Dashboard</Link></li>
                <li><Link to="/child-dashboard" className="text-gray-300 hover:text-white transition-colors">Child Dashboard</Link></li>
                <li><Link to="/activities" className="text-gray-300 hover:text-white transition-colors">Activity Center</Link></li>
                <li><Link to="/rewards" className="text-gray-300 hover:text-white transition-colors">Rewards Hub</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-300 mb-2">Subscribe to our newsletter for parenting tips and updates.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-700 rounded-l-md px-4 py-2 w-full outline-none"
                />
                <Button className="rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} The Good Child Project. All rights reserved.
            </p>
            
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
