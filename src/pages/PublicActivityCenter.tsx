
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Calendar, Search, Clock, Brain, MessageSquare, User, Lightbulb, Heart, Zap, Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import { DevelopmentArea } from '@/types';

// Sample development areas
const developmentAreas = [
  {
    id: 'health-mind',
    name: 'Health & Mind' as DevelopmentArea,
    icon: <Brain className="text-blue-500" />,
    description: "Activities that promote physical health, mental well-being, and cognitive development.",
    color: 'blue',
    bgColor: 'bg-blue-100'
  },
  {
    id: 'communication',
    name: 'Effective Communication' as DevelopmentArea,
    icon: <MessageSquare className="text-green-500" />,
    description: "Activities to improve verbal, written, and non-verbal communication skills.",
    color: 'green',
    bgColor: 'bg-green-100'
  },
  {
    id: 'enrichment',
    name: 'Personal Enrichment' as DevelopmentArea,
    icon: <User className="text-purple-500" />,
    description: "Activities focused on personal growth, learning, and developing new skills.",
    color: 'purple',
    bgColor: 'bg-purple-100'
  },
  {
    id: 'creativity',
    name: 'Creativity' as DevelopmentArea,
    icon: <Lightbulb className="text-yellow-500" />,
    description: "Activities that foster creative thinking, artistic expression, and innovation.",
    color: 'yellow',
    bgColor: 'bg-yellow-100'
  },
  {
    id: 'family',
    name: 'Deeper Family Bonds' as DevelopmentArea,
    icon: <Heart className="text-red-500" />,
    description: "Activities designed to strengthen family relationships and create meaningful memories.",
    color: 'red',
    bgColor: 'bg-red-100'
  },
  {
    id: 'emotional',
    name: 'Emotional Intelligence' as DevelopmentArea,
    icon: <Zap className="text-orange-500" />,
    description: "Activities to help understand, express, and manage emotions effectively.",
    color: 'orange',
    bgColor: 'bg-orange-100'
  },
  {
    id: 'social',
    name: 'Social Skills' as DevelopmentArea,
    icon: <Users className="text-indigo-500" />,
    description: "Activities to develop interaction, cooperation, and positive peer relationships.",
    color: 'indigo',
    bgColor: 'bg-indigo-100'
  }
];

// Sample activities
const sampleActivities = [
  {
    id: '1',
    title: 'Morning Yoga Routine',
    description: 'Start the day with a 15-minute yoga routine to improve flexibility and focus.',
    developmentArea: 'Health & Mind' as DevelopmentArea,
    goodCoins: 15,
    estimatedTime: '15 minutes'
  },
  {
    id: '2',
    title: 'Storytelling Challenge',
    description: 'Create and tell a short story using at least 5 new vocabulary words.',
    developmentArea: 'Effective Communication' as DevelopmentArea,
    goodCoins: 20,
    estimatedTime: '30 minutes'
  },
  {
    id: '3',
    title: 'Learn a New Skill',
    description: 'Spend time learning a new skill like coding, cooking, or playing an instrument.',
    developmentArea: 'Personal Enrichment' as DevelopmentArea,
    goodCoins: 25,
    estimatedTime: '45 minutes'
  },
  {
    id: '4',
    title: 'Art Project',
    description: 'Create an art project using recycled materials from around the house.',
    developmentArea: 'Creativity' as DevelopmentArea,
    goodCoins: 18,
    estimatedTime: '40 minutes'
  },
  {
    id: '5',
    title: 'Family Game Night',
    description: 'Organize and lead a family game night with board games or card games.',
    developmentArea: 'Deeper Family Bonds' as DevelopmentArea,
    goodCoins: 22,
    estimatedTime: '1 hour'
  },
  {
    id: '6',
    title: 'Feelings Journal',
    description: 'Write in a journal about your feelings and emotions from the day.',
    developmentArea: 'Emotional Intelligence' as DevelopmentArea,
    goodCoins: 12,
    estimatedTime: '20 minutes'
  },
  {
    id: '7',
    title: 'Group Project Collaboration',
    description: 'Work effectively with peers on a group project, practicing teamwork skills.',
    developmentArea: 'Social Skills' as DevelopmentArea,
    goodCoins: 20,
    estimatedTime: '1 hour'
  }
];

const PublicActivityCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const navigate = useNavigate();

  // Filter and sort activities
  const filteredActivities = sampleActivities.filter(activity => {
    const matchesSearch = 
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesArea = !selectedArea || activity.developmentArea === selectedArea;
    
    return matchesSearch && matchesArea;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'coins':
        return b.goodCoins - a.goodCoins;
      case 'area':
        return a.developmentArea.localeCompare(b.developmentArea);
      default:
        return 0;
    }
  });

  // Function to get development area details
  const getDevelopmentArea = (name: DevelopmentArea) => {
    return developmentAreas.find(area => area.name === name) || developmentAreas[0];
  };

  // Function to handle clearing filters
  const handleClearFilters = () => {
    setSelectedArea(null);
    setSearchQuery('');
    setSortBy('title');
  };

  return (
    <div className="min-h-screen bg-goodchild-background flex flex-col font-sassoon">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Page header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-goodchild-text-primary mb-4">
              Activity Center Demo
            </h1>
            <p className="text-xl text-goodchild-text-secondary max-w-3xl mx-auto">
              Browse sample activities designed to help children grow across 7 key developmental areas.
            </p>
            <div className="mt-6">
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-goodchild-green hover:bg-goodchild-green/90"
              >
                Sign Up to Create Account
              </Button>
              <span className="mx-2 text-goodchild-text-secondary">or</span>
              <Button 
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-goodchild-blue text-goodchild-blue hover:bg-goodchild-blue/10"
              >
                Sign In
              </Button>
            </div>
          </div>
          
          {/* Development areas filter tiles */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-goodchild-text-primary">Development Areas</h2>
              {selectedArea && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleClearFilters}
                  className="text-sm"
                >
                  Clear Filters
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {developmentAreas.map((area) => (
                <div 
                  key={area.id} 
                  className={`cursor-pointer hover:opacity-90 transition-opacity ${selectedArea === area.name ? 'ring-2 ring-offset-2 ring-goodchild-blue' : ''}`}
                  onClick={() => setSelectedArea(selectedArea === area.name ? null : area.name)}
                >
                  <div className={`${area.bgColor} relative w-16 h-16 rounded-2xl shadow-sm mx-auto`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {area.icon}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-${area.color}-500 flex items-center justify-center shadow-md border-2 border-white`}>
                      {area.icon && React.cloneElement(area.icon, { size: 12, className: "text-white" })}
                    </div>
                  </div>
                  <h3 className="font-medium text-center mt-2 text-sm">{area.name}</h3>
                </div>
              ))}
            </div>
          </div>
          
          {/* Search & sort bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-goodchild-text-secondary h-4 w-4" />
            </div>
            
            <div className="flex gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Sort by Title</SelectItem>
                  <SelectItem value="coins">Sort by Reward</SelectItem>
                  <SelectItem value="area">Sort by Area</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Activities grid */}
          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {filteredActivities.map((activity) => {
                const areaData = getDevelopmentArea(activity.developmentArea);
                
                return (
                  <Card 
                    key={activity.id} 
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className={`h-3 ${areaData ? `bg-${areaData.color}-500` : 'bg-gray-500'}`} />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{activity.title}</CardTitle>
                        <div className={`w-8 h-8 rounded-full ${areaData ? areaData.bgColor : 'bg-gray-100'} flex items-center justify-center`}>
                          {areaData && areaData.icon}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-goodchild-text-secondary line-clamp-3 mb-4">
                        {activity.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${areaData ? `bg-${areaData.color}-100 text-${areaData.color}-700` : 'bg-gray-100 text-gray-700'}`}>
                          {areaData && React.cloneElement(areaData.icon, { size: 12 })}
                          <span>{activity.developmentArea}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                          <GoodCoinIcon className="h-3 w-3" />
                          <span>{activity.goodCoins}</span>
                        </div>
                        
                        {activity.estimatedTime && (
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            <Clock size={12} />
                            <span>{activity.estimatedTime}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-center">
                      <Button 
                        variant="outline" 
                        onClick={() => navigate('/login')}
                        className="w-full justify-center text-goodchild-blue hover:bg-goodchild-blue/10"
                      >
                        Sign In to Assign
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4">
                <Search className="h-12 w-12 mx-auto text-goodchild-text-secondary opacity-60" />
              </div>
              <h3 className="text-xl font-medium mb-2">No activities found</h3>
              <p className="text-goodchild-text-secondary mb-4">
                {searchQuery || selectedArea ? 
                  "Try adjusting your search filters." : 
                  "No activities are available right now."}
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicActivityCenter;
