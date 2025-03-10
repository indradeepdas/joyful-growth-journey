
import { Activity, Child, DevelopmentArea, Reward, Transaction } from '@/types';

// Define mock data for testing UI components

// Sample development areas
export const developmentAreas: DevelopmentArea[] = [
  'Health & Mind',
  'Effective Communication',
  'Personal Enrichment',
  'Creativity',
  'Deeper Family Bonds',
  'Emotional Intelligence',
  'Social Skills'
];

// Sample activities
export const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Read a book for 30 minutes',
    description: 'Find a book you enjoy and read it for at least 30 minutes.',
    developmentArea: 'Personal Enrichment',
    goodCoins: 15,
    status: 'pending',
    childId: '1',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
    estimatedTime: '30 minutes'
  },
  {
    id: '2',
    title: 'Practice an instrument',
    description: 'Spend 20 minutes practicing your favorite instrument.',
    developmentArea: 'Creativity',
    goodCoins: 10,
    status: 'completed',
    childId: '1',
    completedDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    estimatedTime: '20 minutes'
  },
  {
    id: '3',
    title: 'Solve 5 math problems',
    description: 'Complete 5 math problems from your homework.',
    developmentArea: 'Health & Mind',
    goodCoins: 20,
    status: 'pending',
    childId: '1',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    estimatedTime: '15 minutes'
  }
];

// Sample children
export const mockChildrenData: Child[] = [
  {
    id: '1',
    email: 'child1@example.com',
    role: 'child',
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    name: 'Alex',
    surname: 'Johnson',
    nickname: 'AJ',
    goodCoins: 45,
    parentId: 'parent1'
  },
  {
    id: '2',
    email: 'child2@example.com',
    role: 'child',
    createdAt: new Date(Date.now() - 86400000 * 25).toISOString(),
    name: 'Emma',
    surname: 'Smith',
    nickname: 'Em',
    goodCoins: 30,
    parentId: 'parent1'
  }
];

// Sample transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    childId: '1',
    amount: 15,
    type: 'earned',
    description: 'Completed activity: Read a book for 30 minutes',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: '2',
    childId: '1',
    amount: 10,
    type: 'earned',
    description: 'Completed activity: Practice an instrument',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    childId: '1',
    amount: 5,
    type: 'penalty',
    description: 'Did not finish homework on time',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: '4',
    childId: '1',
    amount: 20,
    type: 'spent',
    description: 'Redeemed reward: 30 minutes of screen time',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  }
];

// Sample rewards
export const mockRewards: Reward[] = [
  {
    id: '1',
    name: '30 minutes of screen time',
    description: 'Earn 30 minutes of additional screen time',
    goodCoins: 20,
    imageUrl: '/placeholder.svg',
    originalPrice: 0,
    discountedPrice: 0
  },
  {
    id: '2',
    name: 'Trip to the park',
    description: 'A fun day at the local park',
    goodCoins: 40,
    imageUrl: '/placeholder.svg',
    originalPrice: 0,
    discountedPrice: 0
  },
  {
    id: '3',
    name: 'Special dessert',
    description: 'Choose your favorite dessert for after dinner',
    goodCoins: 15,
    imageUrl: '/placeholder.svg',
    originalPrice: 0,
    discountedPrice: 0
  },
  {
    id: '4',
    name: 'New toy (under $10)',
    description: 'Select a new toy valued at $10 or less',
    goodCoins: 100,
    originalPrice: 10,
    discountedPrice: 0,
    imageUrl: '/placeholder.svg'
  }
];
