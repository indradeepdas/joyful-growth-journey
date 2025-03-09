
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import Footer from '@/components/Footer';
import { 
  Brain, 
  MessageSquare, 
  User, 
  Lightbulb, 
  Heart, 
  Zap, 
  Users, 
  Calendar, 
  Package, 
  Edit3,
  Star
} from 'lucide-react';

const Index = () => {
  const featuresRef = useRef<HTMLElement>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const developmentAreas = [
    {
      name: "Health & Mind",
      icon: <Brain className="text-blue-500" size={32} />,
      description: "Activities that promote physical health, mental well-being, and cognitive development.",
      examples: ["Daily exercise routines", "Mindfulness sessions", "Brain teasers and puzzles"]
    },
    {
      name: "Effective Communication",
      icon: <MessageSquare className="text-green-500" size={32} />,
      description: "Activities to improve verbal, written, and non-verbal communication skills.",
      examples: ["Family discussion topics", "Letter writing", "Active listening exercises"]
    },
    {
      name: "Personal Enrichment",
      icon: <User className="text-purple-500" size={32} />,
      description: "Activities focused on personal growth, learning, and developing new skills.",
      examples: ["Reading challenges", "Skill development tasks", "Educational games"]
    },
    {
      name: "Creativity",
      icon: <Lightbulb className="text-yellow-500" size={32} />,
      description: "Activities that foster creative thinking, artistic expression, and innovation.",
      examples: ["Art projects", "Creative writing prompts", "DIY crafts"]
    },
    {
      name: "Deeper Family Bonds",
      icon: <Heart className="text-red-500" size={32} />,
      description: "Activities designed to strengthen family relationships and create meaningful memories.",
      examples: ["Family game nights", "Shared cooking experiences", "Collaborative projects"]
    },
    {
      name: "Emotional Intelligence",
      icon: <Zap className="text-orange-500" size={32} />,
      description: "Activities to help understand, express, and manage emotions effectively.",
      examples: ["Emotion journaling", "Empathy exercises", "Conflict resolution practice"]
    },
    {
      name: "Social Skills",
      icon: <Users className="text-indigo-500" size={32} />,
      description: "Activities to develop interaction, cooperation, and positive peer relationships.",
      examples: ["Group activities", "Turn-taking games", "Community service projects"]
    }
  ];
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Parent of two",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      quote: "The Good Child Project has transformed our family dynamics! My children are motivated to help around the house and complete their homework because they're earning rewards they're excited about."
    },
    {
      name: "Michael Thompson",
      role: "Father of three",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
      quote: "As a busy dad, I was looking for a way to encourage positive behavior without constant reminders. This platform has made parenting much more enjoyable - less nagging, more celebrating achievements!"
    },
    {
      name: "Lisa Rodriguez",
      role: "Single mom",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      quote: "The development areas have helped me identify where my daughter needs more support. I've seen tremendous growth in her emotional intelligence since we started using the platform."
    },
    {
      name: "David Chen",
      role: "Father of twins",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      quote: "The activity suggestions are so creative! It's given me fresh ideas for engaging with my kids beyond screen time. We've created some amazing memories through these activities."
    },
    {
      name: "Emily Williams",
      role: "Parent of a teenager",
      image: "https://randomuser.me/api/portraits/women/17.jpg",
      quote: "I was skeptical about whether this would work for my teenager, but she loves earning GoodCoins for bigger rewards. It's teaching her valuable lessons about setting goals and delayed gratification."
    }
  ];

  return (
    <div className="min-h-screen bg-goodchild-background flex flex-col font-sassoon">
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
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={scrollToFeatures}
              >
                Learn More
              </Button>
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
                <p className="font-medium text-lg text-goodchild-text-primary">Building better families through positive reinforcement</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" ref={featuresRef} className="w-full py-16 px-4 bg-goodchild-background-alt">
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
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
            {developmentAreas.map((area, index) => (
              <div 
                key={index} 
                className={`development-area-tile ${selectedArea === area.name ? 'active' : ''}`}
                onClick={() => setSelectedArea(selectedArea === area.name ? null : area.name)}
              >
                <div className={`development-area-icon bg-${area.name === 'Health & Mind' ? 'blue' : area.name === 'Effective Communication' ? 'green' : area.name === 'Personal Enrichment' ? 'purple' : area.name === 'Creativity' ? 'yellow' : area.name === 'Deeper Family Bonds' ? 'red' : area.name === 'Emotional Intelligence' ? 'orange' : 'indigo'}-100`}>
                  {area.icon}
                </div>
                <h3 className="font-medium text-goodchild-text-primary text-center">{area.name}</h3>
              </div>
            ))}
          </div>
          
          {selectedArea && (
            <div className="glass-card p-6 rounded-xl mb-8 animate-fade-in">
              {developmentAreas.filter(area => area.name === selectedArea).map((area, index) => (
                <div key={index}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center">
                      {area.icon}
                    </div>
                    <h3 className="text-xl font-bold text-goodchild-text-primary">{area.name}</h3>
                  </div>
                  <p className="text-goodchild-text-primary mb-4">{area.description}</p>
                  <div>
                    <h4 className="font-medium text-goodchild-text-primary mb-2">Example Activities:</h4>
                    <ul className="list-disc list-inside space-y-1 text-goodchild-text-secondary">
                      {area.examples.map((example, i) => (
                        <li key={i}>{example}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6 rounded-xl hover:shadow-md transition-all">
              <div className="text-center mb-4">
                <Package className="h-12 w-12 mx-auto text-goodchild-blue" />
              </div>
              <h3 className="text-lg font-semibold text-center mb-2 text-goodchild-text-primary">Pre-designed Activity Packages</h3>
              <p className="text-goodchild-text-secondary text-center">
                Browse and select from our curated collection of age-appropriate activities designed by child development experts.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl hover:shadow-md transition-all">
              <div className="text-center mb-4">
                <Edit3 className="h-12 w-12 mx-auto text-goodchild-green" />
              </div>
              <h3 className="text-lg font-semibold text-center mb-2 text-goodchild-text-primary">Custom Activity Creation</h3>
              <p className="text-goodchild-text-secondary text-center">
                Create your own activities tailored specifically to your child's interests, needs, and developmental goals.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl hover:shadow-md transition-all">
              <div className="text-center mb-4">
                <Calendar className="h-12 w-12 mx-auto text-goodchild-purple" />
              </div>
              <h3 className="text-lg font-semibold text-center mb-2 text-goodchild-text-primary">Calendar Scheduling</h3>
              <p className="text-goodchild-text-secondary text-center">
                Plan and schedule activities in advance, creating a balanced routine that's engaging and developmentally beneficial.
              </p>
            </div>
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
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <img 
                  src="https://m.media-amazon.com/images/I/81aJ-R4E6gL._AC_UF1000,1000_QL80_.jpg" 
                  alt="LEGO Building Set" 
                  className="w-full h-full object-cover" 
                />
              </div>
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
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <img 
                  src="https://m.media-amazon.com/images/I/71WvL7H4jiL._AC_UF1000,1000_QL80_.jpg" 
                  alt="Art Supplies Kit" 
                  className="w-full h-full object-cover" 
                />
              </div>
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
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <img 
                  src="https://images.prismic.io/bookriot/89e252d9-5823-43fb-9b28-ae6ab8dbe9da_childrens+book+bundle.jpg?auto=compress,format" 
                  alt="Children's Book Bundle" 
                  className="w-full h-full object-cover" 
                />
              </div>
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
      
      {/* Testimonials Section */}
      <section className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-goodchild-text-primary mb-4">
              What Parents Are Saying
            </h2>
            <p className="text-goodchild-text-secondary max-w-2xl mx-auto">
              Hear from families who have transformed their parenting experience with The Good Child Project.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <div>
                    <h3 className="font-semibold text-goodchild-text-primary">{testimonial.name}</h3>
                    <p className="text-sm text-goodchild-text-secondary">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-3 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-goodchild-yellow fill-current" />
                  ))}
                </div>
                <p className="text-goodchild-text-primary italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
