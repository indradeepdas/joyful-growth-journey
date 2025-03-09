
import { Activity } from './types';

// Mock activities data
export const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Read a Book',
    description: 'Read a chapter book and write a short summary',
    developmentArea: 'Personal Enrichment',
    goodCoins: 15,
    coinReward: 15,
    status: 'pending',
    completed: false,
    childId: '1',
    assignedTo: '1', // Emma's ID
    dueDate: '2023-07-15'
  },
  {
    id: '2',
    title: 'Help with Dinner',
    description: 'Help prepare dinner with a parent',
    developmentArea: 'Deeper Family Bonds',
    goodCoins: 10,
    coinReward: 10,
    status: 'completed',
    completed: true,
    childId: '2',
    assignedTo: '2', // Noah's ID
    dueDate: '2023-07-12'
  },
  {
    id: '3',
    title: 'Clean Your Room',
    description: 'Organize toys and make your bed',
    developmentArea: 'Personal Enrichment',
    goodCoins: 8,
    coinReward: 8,
    status: 'pending',
    completed: false,
    childId: '1',
    assignedTo: '1', // Emma's ID
    dueDate: '2023-07-14'
  },
  {
    id: '4',
    title: 'Draw a Family Picture',
    description: 'Create a colorful drawing of your family',
    developmentArea: 'Creativity',
    goodCoins: 12,
    coinReward: 12,
    status: 'pending',
    completed: false,
    childId: '2',
    assignedTo: '2', // Noah's ID
    dueDate: '2023-07-16'
  },
  {
    id: '5',
    title: 'Practice Math Problems',
    description: 'Complete the assigned math worksheet',
    developmentArea: 'Health & Mind',
    goodCoins: 15,
    coinReward: 15,
    status: 'completed',
    completed: true,
    childId: '1',
    assignedTo: '1', // Emma's ID
    dueDate: '2023-07-13'
  }
];

// Function to get activities for a specific child
export const getActivitiesForChild = async (childId: string): Promise<Activity[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const activities = mockActivities.filter(activity => activity.childId === childId || activity.assignedTo === childId);
      resolve(activities);
    }, 500);
  });
};

// Function to get upcoming activities
export const getUpcomingActivities = async (limit = 5): Promise<Activity[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter incomplete activities and sort by due date ascending
      const upcoming = mockActivities
        .filter(activity => !activity.completed && activity.status === 'pending')
        .sort((a, b) => new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime());
      resolve(upcoming.slice(0, limit));
    }, 500);
  });
};
