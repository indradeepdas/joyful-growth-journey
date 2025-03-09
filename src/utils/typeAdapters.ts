import { 
  SupabaseProfile, 
  SupabaseChild, 
  SupabaseActivity, 
  SupabaseTransaction,
  SupabaseReward,
  SupabaseDevelopmentArea,
} from '../services/types';
import type { 
  User, 
  Child, 
  Parent, 
  Activity, 
  Transaction, 
  Reward,
  DevelopmentArea
} from '../types';

export const adaptSupabaseUser = (profile: SupabaseProfile): User => {
  return {
    id: profile.id,
    email: '',  // Email not in the profile, would need to be fetched separately
    role: profile.role as 'parent' | 'child',
    createdAt: profile.created_at,
  };
};

export const adaptSupabaseParent = (profile: SupabaseProfile): Parent => {
  return {
    id: profile.id,
    email: '',  // Email not in the profile, would need to be fetched separately
    role: 'parent',
    createdAt: profile.created_at,
    children: [],  // Children would need to be fetched separately
  };
};

export const adaptSupabaseChild = (child: SupabaseChild): Child => {
  return {
    id: child.id,
    email: '',  // Email not in the child record, would need to be fetched separately
    role: 'child',
    createdAt: child.created_at,
    name: child.name,
    surname: child.surname,
    nickname: child.nickname || '',
    avatarUrl: child.avatar || undefined,
    goodCoins: child.good_coins,
    parentId: child.parent_id,
  };
};

export const adaptSupabaseActivity = (activity: SupabaseActivity): Activity => {
  // Map the development area from the ID or name to our standard DevelopmentArea type
  let developmentArea: DevelopmentArea = 'Personal Enrichment'; // Default fallback
  
  // If we have a direct name provided (from a join query)
  if ('developmentAreaName' in activity && activity.developmentAreaName) {
    developmentArea = activity.developmentAreaName as DevelopmentArea;
  } 
  // Otherwise try to map from known development area IDs
  else if (activity.development_area_id) {
    // This is a simplified mapping - in a real app, you'd fetch the actual names from the DB
    const areaMap: Record<string, DevelopmentArea> = {
      '1': 'Health & Mind',
      '2': 'Effective Communication',
      '3': 'Personal Enrichment',
      '4': 'Creativity',
      '5': 'Deeper Family Bonds',
      '6': 'Emotional Intelligence',
      '7': 'Social Skills',
    };
    developmentArea = areaMap[activity.development_area_id] || developmentArea;
  }
  
  return {
    id: activity.id,
    title: activity.title,
    description: activity.description || '',
    developmentArea: developmentArea,
    goodCoins: activity.coin_reward,
    status: activity.completed ? 'completed' : 'pending',
    childId: activity.assigned_to || '',
    dueDate: activity.due_date || undefined,
    completedDate: activity.completed_date || undefined,
    estimatedTime: activity.estimated_time || undefined
  };
};

export const adaptSupabaseTransaction = (transaction: SupabaseTransaction): Transaction => {
  // Ensure the transaction type is one of the allowed values
  let type: 'earned' | 'spent' | 'penalty' | 'given' = 'earned'; // Default
  
  if (['earned', 'spent', 'penalty', 'given'].includes(transaction.type)) {
    type = transaction.type as 'earned' | 'spent' | 'penalty' | 'given';
  }
  
  return {
    id: transaction.id,
    childId: transaction.child_id,
    amount: transaction.amount,
    type: type,
    description: transaction.description || '',
    createdAt: transaction.created_at,
  };
};

export const adaptSupabaseReward = (reward: SupabaseReward): Reward => {
  return {
    id: reward.id,
    name: reward.name,
    description: reward.description || '',
    imageUrl: reward.image_url || '',
    originalPrice: reward.original_price || 0,
    discountedPrice: reward.discounted_price || 0,
    goodCoins: reward.good_coins,
  };
};
