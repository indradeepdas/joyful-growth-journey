
// Re-export everything from the individual service files for backward compatibility

export type { ChildData, Activity, Transaction } from './types';
export { 
  mockChildren, 
  getChildData, 
  getChildById 
} from './childrenService';

export { 
  mockActivities, 
  getActivitiesForChild,
  getUpcomingActivities 
} from './activitiesService';

export { 
  mockTransactions, 
  getTransactionsForChild, 
  getRecentTransactions 
} from './transactionsService';

export type { Reward } from './rewardsService';
export { 
  mockRewards, 
  getRewards, 
  getRewardById, 
  redeemReward 
} from './rewardsService';
