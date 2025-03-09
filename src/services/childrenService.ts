
import { ChildData } from './types';

// Mock data for children
export const mockChildren: ChildData[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    surname: 'Johnson',
    nickname: 'Em',
    avatar: 'https://placehold.co/200x200/FFD166/073B4C?text=Emma',
    goodCoins: 120,
    parentId: 'parent-1'
  },
  {
    id: '2',
    name: 'Noah',
    surname: 'Smith',
    nickname: 'No',
    avatar: 'https://placehold.co/200x200/06D6A0/073B4C?text=Noah',
    goodCoins: 85,
    parentId: 'parent-1'
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
