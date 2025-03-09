
import React from 'react';
import { Brain, MessageSquare, User, Lightbulb, Heart, Zap, Users } from 'lucide-react';
import { DevelopmentArea } from '@/types';

// Development areas with icons and colors
export const developmentAreas = [
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

// Schema for activity creation form
export const activityFormSchema = {
  title: { min: 3, message: "Title must be at least 3 characters" },
  description: { min: 10, message: "Description must be at least 10 characters" },
  developmentArea: { min: 1, message: "Please select a development area" },
  estimatedTime: { min: 1, message: "Please provide an estimated time" },
  goodCoins: { min: 1, max: 100, minMessage: "Reward must be at least 1 GoodCoin", maxMessage: "Reward cannot exceed 100 GoodCoins" },
};

// Schema for assigning an activity
export const assignActivitySchema = {
  childId: { min: 1, message: "Please select a child" },
  dates: { min: 1, message: "Please select at least one date" },
};
