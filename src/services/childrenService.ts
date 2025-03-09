
import { ChildData } from './types';

// Mock data for children
export const mockChildren: ChildData[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    nickname: 'Em',
    avatar: 'https://placehold.co/200x200/FFD166/073B4C?text=Emma',
    goodCoins: 120,
    developmentAreas: [
      { name: 'Health & Mind', progress: 70 },
      { name: 'Effective Communication', progress: 85 },
      { name: 'Personal Enrichment', progress: 60 },
      { name: 'Creativity', progress: 90 },
      { name: 'Deeper Family Bonds', progress: 75 },
      { name: 'Emotional Intelligence', progress: 65 },
      { name: 'Social Skills', progress: 80 }
    ]
  },
  {
    id: '2',
    name: 'Noah Smith',
    nickname: 'No',
    avatar: 'https://placehold.co/200x200/06D6A0/073B4C?text=Noah',
    goodCoins: 85,
    developmentAreas: [
      { name: 'Health & Mind', progress: 60 },
      { name: 'Effective Communication', progress: 70 },
      { name: 'Personal Enrichment', progress: 80 },
      { name: 'Creativity', progress: 65 },
      { name: 'Deeper Family Bonds', progress: 85 },
      { name: 'Emotional Intelligence', progress: 75 },
      { name: 'Social Skills', progress: 90 }
    ]
  }
];

// Function to get all child data
export const getChildData = async (): Promise<ChildData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockChildren);
    }, 800);
  });
};

// Function to get a specific child's data by ID
export const getChildById = async (id: string): Promise<ChildData | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const child = mockChildren.find(child => child.id === id);
      resolve(child);
    }, 300);
  });
};
