
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

// Activities for Health & Mind
export const healthMindActivities = [
  {
    id: 'hm-1',
    title: 'Morning Yoga Routine',
    description: 'Start the day with a 15-minute yoga routine to improve flexibility and focus.',
    developmentArea: 'Health & Mind',
    goodCoins: 15,
    estimatedTime: '15 minutes'
  },
  {
    id: 'hm-2',
    title: 'Mindful Breathing Exercise',
    description: 'Practice mindful breathing for 10 minutes to reduce stress and improve concentration.',
    developmentArea: 'Health & Mind',
    goodCoins: 10,
    estimatedTime: '10 minutes'
  },
  {
    id: 'hm-3',
    title: 'Memory Challenge Game',
    description: 'Play a memory card matching game to improve cognitive function and short-term memory.',
    developmentArea: 'Health & Mind',
    goodCoins: 20,
    estimatedTime: '20 minutes'
  },
  {
    id: 'hm-4',
    title: 'Healthy Meal Preparation',
    description: 'Help prepare a healthy meal for the family, learning about nutrition and cooking skills.',
    developmentArea: 'Health & Mind',
    goodCoins: 25,
    estimatedTime: '45 minutes'
  },
  {
    id: 'hm-5',
    title: 'Math Puzzle Solving',
    description: 'Complete a set of age-appropriate math puzzles to strengthen logical thinking skills.',
    developmentArea: 'Health & Mind',
    goodCoins: 20,
    estimatedTime: '30 minutes'
  },
  {
    id: 'hm-6',
    title: 'Nature Walk Observation',
    description: 'Take a walk in nature and document 10 different plants or animals you observe.',
    developmentArea: 'Health & Mind',
    goodCoins: 25,
    estimatedTime: '45 minutes'
  },
  {
    id: 'hm-7',
    title: 'Brain Teaser Challenge',
    description: 'Solve a set of brain teasers or riddles appropriate for your age level.',
    developmentArea: 'Health & Mind',
    goodCoins: 20,
    estimatedTime: '30 minutes'
  }
];

// Activities for Effective Communication
export const communicationActivities = [
  {
    id: 'com-1',
    title: 'Storytelling Challenge',
    description: 'Create and tell a short story using at least 5 new vocabulary words.',
    developmentArea: 'Effective Communication',
    goodCoins: 20,
    estimatedTime: '30 minutes'
  },
  {
    id: 'com-2',
    title: 'Active Listening Practice',
    description: 'Practice active listening by repeating back what family members say during dinner conversation.',
    developmentArea: 'Effective Communication',
    goodCoins: 15,
    estimatedTime: '20 minutes'
  },
  {
    id: 'com-3',
    title: 'Book Report Presentation',
    description: 'Read a book and prepare a short presentation about it for the family.',
    developmentArea: 'Effective Communication',
    goodCoins: 30,
    estimatedTime: '1 hour plus reading time'
  },
  {
    id: 'com-4',
    title: 'Impromptu Speaking',
    description: 'Practice impromptu speaking by talking for one minute about a randomly selected topic.',
    developmentArea: 'Effective Communication',
    goodCoins: 20,
    estimatedTime: '15 minutes'
  },
  {
    id: 'com-5',
    title: 'Write a Thank You Note',
    description: 'Write a thoughtful thank you note to someone who has done something nice for you.',
    developmentArea: 'Effective Communication',
    goodCoins: 15,
    estimatedTime: '20 minutes'
  },
  {
    id: 'com-6',
    title: 'Debate Practice',
    description: 'Have a friendly debate with a family member about an age-appropriate topic.',
    developmentArea: 'Effective Communication',
    goodCoins: 25,
    estimatedTime: '30 minutes'
  },
  {
    id: 'com-7',
    title: 'Daily Journal Writing',
    description: 'Write in a journal about your day, focusing on clear expression of thoughts and feelings.',
    developmentArea: 'Effective Communication',
    goodCoins: 15,
    estimatedTime: '15 minutes'
  }
];

// Activities for Personal Enrichment
export const enrichmentActivities = [
  {
    id: 'enr-1',
    title: 'Learn a New Skill',
    description: 'Spend time learning a new skill like coding, cooking, or playing an instrument.',
    developmentArea: 'Personal Enrichment',
    goodCoins: 25,
    estimatedTime: '45 minutes'
  },
  {
    id: 'enr-2',
    title: 'Educational Video Series',
    description: 'Watch an educational video series about a topic that interests you and write down three things you learned.',
    developmentArea: 'Personal Enrichment',
    goodCoins: 20,
    estimatedTime: '30 minutes'
  },
  {
    id: 'enr-3',
    title: 'Research Project',
    description: 'Complete a mini research project about a topic that interests you and present your findings.',
    developmentArea: 'Personal Enrichment',
    goodCoins: 30,
    estimatedTime: '1 hour'
  },
  {
    id: 'enr-4',
    title: 'Foreign Language Practice',
    description: 'Practice a foreign language using an app or learning resource for 20 minutes.',
    developmentArea: 'Personal Enrichment',
    goodCoins: 20,
    estimatedTime: '20 minutes'
  },
  {
    id: 'enr-5',
    title: 'Read Non-Fiction',
    description: 'Read a non-fiction book or article about a new subject and share what you learned.',
    developmentArea: 'Personal Enrichment',
    goodCoins: 20,
    estimatedTime: '30 minutes'
  },
  {
    id: 'enr-6',
    title: 'Goal Setting Session',
    description: 'Set personal goals for the week/month and create a plan to achieve them.',
    developmentArea: 'Personal Enrichment',
    goodCoins: 20,
    estimatedTime: '30 minutes'
  },
  {
    id: 'enr-7',
    title: 'Virtual Museum Tour',
    description: 'Take a virtual tour of a famous museum and document your favorite exhibits.',
    developmentArea: 'Personal Enrichment',
    goodCoins: 25,
    estimatedTime: '45 minutes'
  }
];

// Activities for Creativity
export const creativityActivities = [
  {
    id: 'cre-1',
    title: 'Art Project',
    description: 'Create an art project using recycled materials from around the house.',
    developmentArea: 'Creativity',
    goodCoins: 18,
    estimatedTime: '40 minutes'
  },
  {
    id: 'cre-2',
    title: 'Creative Writing',
    description: 'Write a short creative story or poem about an interesting topic.',
    developmentArea: 'Creativity',
    goodCoins: 20,
    estimatedTime: '30 minutes'
  },
  {
    id: 'cre-3',
    title: 'DIY Craft Project',
    description: 'Follow instructions to complete a DIY craft project appropriate for your age.',
    developmentArea: 'Creativity',
    goodCoins: 25,
    estimatedTime: '45 minutes'
  },
  {
    id: 'cre-4',
    title: 'Music Creation',
    description: 'Create a simple song or rhythm using household items as instruments.',
    developmentArea: 'Creativity',
    goodCoins: 20,
    estimatedTime: '30 minutes'
  },
  {
    id: 'cre-5',
    title: 'Invention Challenge',
    description: 'Design an invention that solves a simple problem and draw or build a prototype.',
    developmentArea: 'Creativity',
    goodCoins: 30,
    estimatedTime: '1 hour'
  },
  {
    id: 'cre-6',
    title: 'Photography Project',
    description: 'Take photographs based on a specific theme and create a digital or physical collage.',
    developmentArea: 'Creativity',
    goodCoins: 25,
    estimatedTime: '45 minutes'
  },
  {
    id: 'cre-7',
    title: 'Dramatic Performance',
    description: 'Create and perform a short skit or dramatic reading for the family.',
    developmentArea: 'Creativity',
    goodCoins: 25,
    estimatedTime: '45 minutes'
  }
];

// Activities for Deeper Family Bonds
export const familyActivities = [
  {
    id: 'fam-1',
    title: 'Family Game Night',
    description: 'Organize and lead a family game night with board games or card games.',
    developmentArea: 'Deeper Family Bonds',
    goodCoins: 22,
    estimatedTime: '1 hour'
  },
  {
    id: 'fam-2',
    title: 'Family History Interview',
    description: 'Interview a family member about family history and create a short report or family tree.',
    developmentArea: 'Deeper Family Bonds',
    goodCoins: 25,
    estimatedTime: '45 minutes'
  },
  {
    id: 'fam-3',
    title: 'Family Cooking Session',
    description: 'Prepare a meal together with the family, learning a family recipe.',
    developmentArea: 'Deeper Family Bonds',
    goodCoins: 30,
    estimatedTime: '1 hour'
  },
  {
    id: 'fam-4',
    title: 'Family Photo Album',
    description: 'Create a digital or physical family photo album with captions.',
    developmentArea: 'Deeper Family Bonds',
    goodCoins: 25,
    estimatedTime: '45 minutes'
  },
  {
    id: 'fam-5',
    title: 'Family Movie Discussion',
    description: 'Watch a family movie and lead a discussion about its themes and lessons.',
    developmentArea: 'Deeper Family Bonds',
    goodCoins: 20,
    estimatedTime: '2 hours'
  },
  {
    id: 'fam-6',
    title: 'Family Appreciation Notes',
    description: 'Write appreciation notes for each family member expressing what you value about them.',
    developmentArea: 'Deeper Family Bonds',
    goodCoins: 20,
    estimatedTime: '30 minutes'
  },
  {
    id: 'fam-7',
    title: 'Family Outdoor Activity',
    description: 'Plan and participate in an outdoor activity that the whole family can enjoy together.',
    developmentArea: 'Deeper Family Bonds',
    goodCoins: 25,
    estimatedTime: '1 hour'
  }
];

// Activities for Emotional Intelligence
export const emotionalActivities = [
  {
    id: 'emo-1',
    title: 'Feelings Journal',
    description: 'Write in a journal about your feelings and emotions from the day.',
    developmentArea: 'Emotional Intelligence',
    goodCoins: 12,
    estimatedTime: '20 minutes'
  },
  {
    id: 'emo-2',
    title: 'Emotion Charades',
    description: 'Play emotion charades with family members to practice recognizing and expressing emotions.',
    developmentArea: 'Emotional Intelligence',
    goodCoins: 15,
    estimatedTime: '20 minutes'
  },
  {
    id: 'emo-3',
    title: 'Empathy Exercise',
    description: 'Read a story and write about how different characters might be feeling and why.',
    developmentArea: 'Emotional Intelligence',
    goodCoins: 20,
    estimatedTime: '30 minutes'
  },
  {
    id: 'emo-4',
    title: 'Calm Down Techniques',
    description: 'Learn and practice three different techniques for calming down when upset.',
    developmentArea: 'Emotional Intelligence',
    goodCoins: 15,
    estimatedTime: '20 minutes'
  },
  {
    id: 'emo-5',
    title: 'Positive Self-Talk Practice',
    description: 'Create a list of positive self-talk statements and practice them daily.',
    developmentArea: 'Emotional Intelligence',
    goodCoins: 15,
    estimatedTime: '15 minutes'
  },
  {
    id: 'emo-6',
    title: 'Gratitude List',
    description: 'Create a daily gratitude list of three things you are thankful for.',
    developmentArea: 'Emotional Intelligence',
    goodCoins: 10,
    estimatedTime: '10 minutes'
  },
  {
    id: 'emo-7',
    title: 'Conflict Resolution Role Play',
    description: 'Role-play different conflict scenarios and practice resolving them peacefully.',
    developmentArea: 'Emotional Intelligence',
    goodCoins: 25,
    estimatedTime: '30 minutes'
  }
];

// Activities for Social Skills
export const socialActivities = [
  {
    id: 'soc-1',
    title: 'Group Project Collaboration',
    description: 'Work effectively with peers on a group project, practicing teamwork skills.',
    developmentArea: 'Social Skills',
    goodCoins: 20,
    estimatedTime: '1 hour'
  },
  {
    id: 'soc-2',
    title: 'Conversation Starters Practice',
    description: 'Practice starting and maintaining conversations using provided conversation starters.',
    developmentArea: 'Social Skills',
    goodCoins: 15,
    estimatedTime: '20 minutes'
  },
  {
    id: 'soc-3',
    title: 'Thank You Note Writing',
    description: 'Write thank you notes to people who have helped or been kind to you.',
    developmentArea: 'Social Skills',
    goodCoins: 15,
    estimatedTime: '20 minutes'
  },
  {
    id: 'soc-4',
    title: 'Community Service Project',
    description: 'Participate in a small community service project appropriate for your age.',
    developmentArea: 'Social Skills',
    goodCoins: 30,
    estimatedTime: '1 hour'
  },
  {
    id: 'soc-5',
    title: 'Friendship Skills Worksheet',
    description: 'Complete a worksheet about friendship skills and discuss with a parent.',
    developmentArea: 'Social Skills',
    goodCoins: 15,
    estimatedTime: '20 minutes'
  },
  {
    id: 'soc-6',
    title: 'Social Scenario Role Play',
    description: 'Role-play different social scenarios to practice appropriate responses.',
    developmentArea: 'Social Skills',
    goodCoins: 20,
    estimatedTime: '30 minutes'
  },
  {
    id: 'soc-7',
    title: 'Inclusive Play Planning',
    description: 'Plan a group activity that ensures everyone can participate and feel included.',
    developmentArea: 'Social Skills',
    goodCoins: 20,
    estimatedTime: '30 minutes'
  }
];

// Combine all activities
export const allActivities = [
  ...healthMindActivities,
  ...communicationActivities,
  ...enrichmentActivities,
  ...creativityActivities,
  ...familyActivities,
  ...emotionalActivities,
  ...socialActivities
];
