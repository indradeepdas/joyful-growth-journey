
import { SupabaseActivity, SupabaseTransaction, SupabaseReward, SupabaseChild } from "@/services/types";
import { Activity, Transaction, Reward, Child } from "@/types";

/**
 * Converts Supabase Activity format to our app Activity format
 */
export function adaptSupabaseActivity(activity: SupabaseActivity): Activity {
  return {
    id: activity.id,
    title: activity.title,
    description: activity.description || "",
    developmentArea: activity.development_area_id ? "Personal Enrichment" : "", // This would need to be fetched from development_areas table
    goodCoins: activity.coin_reward,
    status: activity.completed ? "completed" : "pending",
    childId: activity.assigned_to || "",
    dueDate: activity.due_date,
    completedDate: activity.completed_date
  };
}

/**
 * Converts Supabase Transaction format to our app Transaction format
 */
export function adaptSupabaseTransaction(transaction: SupabaseTransaction): Transaction {
  return {
    id: transaction.id,
    childId: transaction.child_id,
    amount: transaction.amount,
    type: transaction.type,
    description: transaction.description || "",
    createdAt: transaction.created_at
  };
}

/**
 * Converts Supabase Reward format to our app Reward format
 */
export function adaptSupabaseReward(reward: SupabaseReward): Reward {
  return {
    id: reward.id,
    name: reward.name,
    description: reward.description || "",
    imageUrl: reward.image_url || "https://placehold.co/600x400/EFF1F3/073B4C?text=Reward",
    originalPrice: reward.original_price || 0,
    discountedPrice: reward.discounted_price || 0,
    goodCoins: reward.good_coins
  };
}

/**
 * Converts Supabase Child format to our app Child format
 */
export function adaptSupabaseChild(child: SupabaseChild): Child {
  return {
    id: child.id,
    name: child.name,
    surname: child.surname,
    nickname: child.nickname || child.name,
    avatarUrl: child.avatar || undefined,
    goodCoins: child.good_coins,
    parentId: child.parent_id,
    role: 'child',
    email: '',
    createdAt: child.created_at
  };
}
