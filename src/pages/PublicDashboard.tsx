
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  MessageSquare, 
  User, 
  Lightbulb, 
  Heart, 
  Zap, 
  Users, 
  Lock,
  ArrowRight
} from 'lucide-react';

const PublicDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-goodchild-background font-sassoon">
      <Navbar />
      
      <main className="flex-grow px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-soft p-8 mb-8">
            <div className="text-center mb-8">
              <Lock className="mx-auto h-16 w-16 text-goodchild-blue mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold text-goodchild-text-primary mb-4">
                Welcome to GoodChild Dashboard
              </h1>
              <p className="text-xl text-goodchild-text-secondary max-w-3xl mx-auto">
                Sign in to access your personal dashboard and manage your children's activities, rewards, and progress.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <Button
                  onClick={() => navigate('/login')}
                  className="bg-goodchild-blue text-white px-6 py-3"
                >
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/signup')}
                  className="border-goodchild-blue text-goodchild-blue px-6 py-3"
                >
                  Create Account
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-goodchild-blue/5 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-goodchild-blue" />
                  <span>Track Progress</span>
                </h2>
                <p className="text-goodchild-text-secondary mb-4">
                  Monitor your children's development across 7 key areas with visual progress indicators.
                </p>
                <img 
                  src="https://placehold.co/600x400/EEF6FF/1E5BB6?text=Progress+Tracking" 
                  alt="Progress Tracking" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              
              <div className="bg-goodchild-green/5 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-goodchild-green" />
                  <span>Assign Activities</span>
                </h2>
                <p className="text-goodchild-text-secondary mb-4">
                  Create and assign personalized activities to help your children grow and develop their skills.
                </p>
                <img 
                  src="https://placehold.co/600x400/F0FDF4/16A34A?text=Activity+Management" 
                  alt="Activity Management" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              
              <div className="bg-goodchild-yellow/5 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-goodchild-red" />
                  <span>Reward Success</span>
                </h2>
                <p className="text-goodchild-text-secondary mb-4">
                  Motivate your children with GoodCoins that can be redeemed for exciting rewards and privileges.
                </p>
                <img 
                  src="https://placehold.co/600x400/FFFBEB/EAB308?text=Reward+System" 
                  alt="Reward System" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-center mb-6">Development Areas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Brain className="text-blue-500 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Health & Mind</h3>
                    <p className="text-sm text-goodchild-text-secondary">Physical and mental wellbeing activities</p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <MessageSquare className="text-green-500 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Effective Communication</h3>
                    <p className="text-sm text-goodchild-text-secondary">Verbal and written communication skills</p>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <User className="text-purple-500 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Personal Enrichment</h3>
                    <p className="text-sm text-goodchild-text-secondary">Personal growth and new skills</p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg flex items-start gap-3">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Lightbulb className="text-yellow-500 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Creativity</h3>
                    <p className="text-sm text-goodchild-text-secondary">Artistic expression and innovation</p>
                  </div>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg flex items-start gap-3">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <Heart className="text-red-500 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Deeper Family Bonds</h3>
                    <p className="text-sm text-goodchild-text-secondary">Family relationships and memories</p>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Zap className="text-orange-500 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Emotional Intelligence</h3>
                    <p className="text-sm text-goodchild-text-secondary">Understanding and managing emotions</p>
                  </div>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg flex items-start gap-3">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <Users className="text-indigo-500 h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Social Skills</h3>
                    <p className="text-sm text-goodchild-text-secondary">Interaction and positive peer relationships</p>
                  </div>
                </div>
                
                <div className="bg-goodchild-background p-4 rounded-lg flex items-center justify-center">
                  <Button variant="ghost" className="text-goodchild-blue hover:text-goodchild-blue/80" onClick={() => navigate('/login')}>
                    <span>Sign In to Access</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicDashboard;
