
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
  Clock
} from 'lucide-react';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import { DevelopmentArea } from '@/types';

// Sample activities for demonstration
const sampleActivities = [
  {
    id: '1',
    title: 'Morning Yoga Routine',
    description: 'Start the day with a 15-minute yoga routine to improve flexibility and focus.',
    area: 'Health & Mind' as DevelopmentArea,
    goodCoins: 15,
    estimatedTime: '15 minutes',
    icon: <Brain className="text-blue-500" />,
    color: 'blue',
  },
  {
    id: '2',
    title: 'Storytelling Challenge',
    description: 'Create and tell a short story using at least 5 new vocabulary words.',
    area: 'Effective Communication' as DevelopmentArea,
    goodCoins: 20,
    estimatedTime: '30 minutes',
    icon: <MessageSquare className="text-green-500" />,
    color: 'green',
  },
  {
    id: '3',
    title: 'Learn a New Skill',
    description: 'Spend time learning a new skill like coding, cooking, or playing an instrument.',
    area: 'Personal Enrichment' as DevelopmentArea,
    goodCoins: 25,
    estimatedTime: '45 minutes',
    icon: <User className="text-purple-500" />,
    color: 'purple',
  },
  {
    id: '4',
    title: 'Art Project',
    description: 'Create an art project using recycled materials from around the house.',
    area: 'Creativity' as DevelopmentArea,
    goodCoins: 18,
    estimatedTime: '40 minutes',
    icon: <Lightbulb className="text-yellow-500" />,
    color: 'yellow',
  },
  {
    id: '5',
    title: 'Family Game Night',
    description: 'Organize and lead a family game night with board games or card games.',
    area: 'Deeper Family Bonds' as DevelopmentArea,
    goodCoins: 22,
    estimatedTime: '1 hour',
    icon: <Heart className="text-red-500" />,
    color: 'red',
  },
  {
    id: '6',
    title: 'Feelings Journal',
    description: 'Write in a journal about your feelings and emotions from the day.',
    area: 'Emotional Intelligence' as DevelopmentArea,
    goodCoins: 12,
    estimatedTime: '20 minutes',
    icon: <Zap className="text-orange-500" />,
    color: 'orange',
  },
  {
    id: '7',
    title: 'Group Project Collaboration',
    description: 'Work effectively with peers on a group project, practicing teamwork skills.',
    area: 'Social Skills' as DevelopmentArea,
    goodCoins: 20,
    estimatedTime: '1 hour',
    icon: <Users className="text-indigo-500" />,
    color: 'indigo',
  },
  {
    id: '8',
    title: 'Healthy Snack Preparation',
    description: 'Research and prepare a healthy snack for yourself and family members.',
    area: 'Health & Mind' as DevelopmentArea,
    goodCoins: 15,
    estimatedTime: '30 minutes',
    icon: <Brain className="text-blue-500" />,
    color: 'blue',
  },
];

const PublicActivityCenter: React.FC = () => {
  const navigate = useNavigate();

  // Group activities by area
  const activitiesByArea = sampleActivities.reduce((acc, activity) => {
    const area = activity.area;
    if (!acc[area]) {
      acc[area] = [];
    }
    acc[area].push(activity);
    return acc;
  }, {} as Record<string, typeof sampleActivities>);

  const areas = Object.keys(activitiesByArea);

  return (
    <div className="min-h-screen bg-goodchild-background flex flex-col font-sassoon">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-goodchild-text-primary mb-4">
              Activity Center: Sample Activities
            </h1>
            <p className="text-xl text-goodchild-text-secondary max-w-3xl mx-auto">
              Browse our selection of activities designed to promote development across 7 key areas. 
              <span className="block mt-2 text-goodchild-blue">
                Sign in to assign activities and track progress!
              </span>
            </p>
          </div>
          
          {/* Lock overlay for visitor view */}
          <div className="relative bg-white rounded-xl shadow-soft p-6 mb-8">
            <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] flex items-center justify-center rounded-xl z-10">
              <div className="bg-white/80 p-6 rounded-xl text-center max-w-md">
                <Lock className="mx-auto h-12 w-12 text-goodchild-blue mb-3" />
                <h2 className="text-xl font-bold mb-2">Sign In to Assign Activities</h2>
                <p className="text-goodchild-text-secondary mb-4">
                  Create an account or sign in to assign activities to your children and track their progress.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => navigate('/login')}>
                    Sign In
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/signup')}>
                    Create Account
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Activity areas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8 opacity-80">
              {[
                { name: 'Health & Mind', icon: <Brain className="text-blue-500" />, color: 'bg-blue-100' },
                { name: 'Effective Communication', icon: <MessageSquare className="text-green-500" />, color: 'bg-green-100' },
                { name: 'Personal Enrichment', icon: <User className="text-purple-500" />, color: 'bg-purple-100' },
                { name: 'Creativity', icon: <Lightbulb className="text-yellow-500" />, color: 'bg-yellow-100' },
                { name: 'Deeper Family Bonds', icon: <Heart className="text-red-500" />, color: 'bg-red-100' },
                { name: 'Emotional Intelligence', icon: <Zap className="text-orange-500" />, color: 'bg-orange-100' },
                { name: 'Social Skills', icon: <Users className="text-indigo-500" />, color: 'bg-indigo-100' },
              ].map((area) => (
                <div key={area.name} className="development-area-tile">
                  <div className={`development-area-icon ${area.color} relative w-16 h-16 rounded-2xl shadow-sm`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {area.icon}
                    </div>
                  </div>
                  <h3 className="font-medium text-center mt-2 text-sm">{area.name}</h3>
                </div>
              ))}
            </div>
            
            {/* Sample activities layout */}
            <div className="space-y-8 opacity-80">
              {areas.map(area => (
                <div key={area} className="mb-8">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    {sampleActivities.find(a => a.area === area)?.icon}
                    <span>{area}</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activitiesByArea[area].map(activity => (
                      <Card 
                        key={activity.id} 
                        className="overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className={`h-3 bg-${activity.color}-500`} />
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-xl">{activity.title}</CardTitle>
                            <div className={`w-8 h-8 rounded-full bg-${activity.color}-100 flex items-center justify-center`}>
                              {activity.icon}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-goodchild-text-secondary mb-4">
                            {activity.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-${activity.color}-100 text-${activity.color}-700`}>
                              {activity.icon}
                              <span>{activity.area}</span>
                            </div>
                            
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                              <GoodCoinIcon className="h-3 w-3" />
                              <span>{activity.goodCoins}</span>
                            </div>
                            
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                              <Clock size={12} />
                              <span>{activity.estimatedTime}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button 
                            variant="ghost" 
                            className="w-full justify-center text-goodchild-blue hover:bg-goodchild-blue/10"
                            onClick={() => navigate('/login')}
                          >
                            Sign In to Assign
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicActivityCenter;
