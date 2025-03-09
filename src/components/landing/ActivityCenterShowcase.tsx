
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
  Edit3 
} from 'lucide-react';
import DevelopmentAreaCard from './DevelopmentAreaCard';
import { DevelopmentAreaItem } from './types';

const ActivityCenterShowcase = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  
  const developmentAreas: DevelopmentAreaItem[] = [
    {
      name: "Health & Mind",
      icon: <Brain className="text-blue-500" size={32} />,
      smallIcon: <Brain className="text-white" size={16} />,
      description: "Activities that promote physical health, mental well-being, and cognitive development.",
      examples: ["Daily exercise routines", "Mindfulness sessions", "Brain teasers and puzzles"],
      color: "blue",
      bgColor: "bg-blue-100"
    },
    {
      name: "Effective Communication",
      icon: <MessageSquare className="text-green-500" size={32} />,
      smallIcon: <MessageSquare className="text-white" size={16} />,
      description: "Activities to improve verbal, written, and non-verbal communication skills.",
      examples: ["Family discussion topics", "Letter writing", "Active listening exercises"],
      color: "green",
      bgColor: "bg-green-100"
    },
    {
      name: "Personal Enrichment",
      icon: <User className="text-purple-500" size={32} />,
      smallIcon: <User className="text-white" size={16} />,
      description: "Activities focused on personal growth, learning, and developing new skills.",
      examples: ["Reading challenges", "Skill development tasks", "Educational games"],
      color: "purple",
      bgColor: "bg-purple-100"
    },
    {
      name: "Creativity",
      icon: <Lightbulb className="text-yellow-500" size={32} />,
      smallIcon: <Lightbulb className="text-white" size={16} />,
      description: "Activities that foster creative thinking, artistic expression, and innovation.",
      examples: ["Art projects", "Creative writing prompts", "DIY crafts"],
      color: "yellow",
      bgColor: "bg-yellow-100"
    },
    {
      name: "Deeper Family Bonds",
      icon: <Heart className="text-red-500" size={32} />,
      smallIcon: <Heart className="text-white" size={16} />,
      description: "Activities designed to strengthen family relationships and create meaningful memories.",
      examples: ["Family game nights", "Shared cooking experiences", "Collaborative projects"],
      color: "red", 
      bgColor: "bg-red-100"
    },
    {
      name: "Emotional Intelligence",
      icon: <Zap className="text-orange-500" size={32} />,
      smallIcon: <Zap className="text-white" size={16} />,
      description: "Activities to help understand, express, and manage emotions effectively.",
      examples: ["Emotion journaling", "Empathy exercises", "Conflict resolution practice"],
      color: "orange",
      bgColor: "bg-orange-100"
    },
    {
      name: "Social Skills",
      icon: <Users className="text-indigo-500" size={32} />,
      smallIcon: <Users className="text-white" size={16} />,
      description: "Activities to develop interaction, cooperation, and positive peer relationships.",
      examples: ["Group activities", "Turn-taking games", "Community service projects"],
      color: "indigo",
      bgColor: "bg-indigo-100"
    }
  ];

  const handleSelectArea = (name: string) => {
    setSelectedArea(selectedArea === name ? null : name);
  };

  return (
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
            <DevelopmentAreaCard 
              key={index}
              area={area}
              isSelected={selectedArea === area.name}
              onSelect={handleSelectArea}
            />
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
  );
};

export default ActivityCenterShowcase;
