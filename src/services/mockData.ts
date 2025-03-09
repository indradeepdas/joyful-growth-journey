
// Re-export everything from the individual service files for backward compatibility

export { ChildData, Activity, Transaction } from './types';
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

export { 
  Reward, 
  mockRewards, 
  getRewards, 
  getRewardById, 
  redeemReward 
} from './rewardsService';
