
// Common types used across service files

export interface ChildData {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
  goodCoins: number;
  developmentAreas: {
    name: string;
    progress: number;
  }[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  developmentArea: string;
  coinReward: number;
  assignedTo: string;
  dueDate: string;
  completed: boolean;
}

export interface Transaction {
  id: string;
  childId: string;
  amount: number;
  type: 'earned' | 'spent' | 'penalty' | 'given';
  description: string;
  date: string;
}
