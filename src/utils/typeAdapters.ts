
import { SupabaseActivity, SupabaseTransaction, SupabaseReward, SupabaseChild } from "@/services/types";
import { Activity, Transaction, Reward, Child, DevelopmentArea } from "@/types";

/**
 * Converts Supabase Activity format to our app Activity format
 */
export function adaptSupabaseActivity(activity: SupabaseActivity): Activity {
  // Map development area to a valid DevelopmentArea type value
  let developmentArea: DevelopmentArea = "Personal Enrichment";
  
  // If we have development_area_id, we could map it to the corresponding area
  // For now, default to "Personal Enrichment" if we have an ID, otherwise empty string
  if (!activity.development_area_id) {
    developmentArea = "Personal Enrichment";
  }
  
  return {
    id: activity.id,
    title: activity.title,
    description: activity.description || "",
    developmentArea: developmentArea,
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
  // Ensure the transaction type is one of the allowed values
  let validType: "earned" | "spent" | "penalty" | "given" = "earned";
  
  if (transaction.type === "earned" || 
      transaction.type === "spent" || 
      transaction.type === "penalty" || 
      transaction.type === "given") {
    validType = transaction.type;
  } else if (transaction.amount < 0) {
    // If negative amount and type is not recognized, default to "penalty"
    validType = "penalty";
  } else {
    // If positive amount and type is not recognized, default to "earned"
    validType = "earned";
  }
  
  return {
    id: transaction.id,
    childId: transaction.child_id,
    amount: transaction.amount,
    type: validType,
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
