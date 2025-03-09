
import { SupabaseActivity, SupabaseTransaction } from "@/services/types";
import { Activity, Transaction } from "@/types";

/**
 * Converts Supabase Activity format to our app Activity format
 */
export function adaptSupabaseActivity(activity: SupabaseActivity): Activity {
  return {
    id: activity.id,
    title: activity.title,
    description: activity.description || "",
    developmentArea: "Personal Enrichment", // This would need to be fetched from development_areas table
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
