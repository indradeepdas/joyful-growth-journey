export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          assigned_to: string | null
          coin_reward: number
          completed: boolean
          completed_date: string | null
          created_at: string
          created_by: string | null
          description: string | null
          development_area_id: string | null
          due_date: string | null
          estimated_time: string | null
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          coin_reward?: number
          completed?: boolean
          completed_date?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          development_area_id?: string | null
          due_date?: string | null
          estimated_time?: string | null
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          coin_reward?: number
          completed?: boolean
          completed_date?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          development_area_id?: string | null
          due_date?: string | null
          estimated_time?: string | null
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_development_area_id_fkey"
            columns: ["development_area_id"]
            isOneToOne: false
            referencedRelation: "development_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      activity_masters: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          development_area_id: string | null
          estimated_time: string | null
          good_coins: number
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          development_area_id?: string | null
          estimated_time?: string | null
          good_coins?: number
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          development_area_id?: string | null
          estimated_time?: string | null
          good_coins?: number
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_masters_development_area_id_fkey"
            columns: ["development_area_id"]
            isOneToOne: false
            referencedRelation: "development_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      child_development_progress: {
        Row: {
          child_id: string
          development_area_id: string
          id: string
          progress: number
          updated_at: string
        }
        Insert: {
          child_id: string
          development_area_id: string
          id?: string
          progress?: number
          updated_at?: string
        }
        Update: {
          child_id?: string
          development_area_id?: string
          id?: string
          progress?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "child_development_progress_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "child_development_progress_development_area_id_fkey"
            columns: ["development_area_id"]
            isOneToOne: false
            referencedRelation: "development_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      children: {
        Row: {
          avatar: string | null
          created_at: string
          good_coins: number
          id: string
          name: string
          nickname: string | null
          parent_id: string
          surname: string
          updated_at: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          good_coins?: number
          id?: string
          name: string
          nickname?: string | null
          parent_id: string
          surname: string
          updated_at?: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          good_coins?: number
          id?: string
          name?: string
          nickname?: string | null
          parent_id?: string
          surname?: string
          updated_at?: string
        }
        Relationships: []
      }
      development_areas: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          nickname: string | null
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          nickname?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          nickname?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      redemptions: {
        Row: {
          child_id: string
          created_at: string
          good_coins: number
          id: string
          reward_id: string | null
        }
        Insert: {
          child_id: string
          created_at?: string
          good_coins: number
          id?: string
          reward_id?: string | null
        }
        Update: {
          child_id?: string
          created_at?: string
          good_coins?: number
          id?: string
          reward_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "redemptions_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "redemptions_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["id"]
          },
        ]
      }
      rewards: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          discounted_price: number | null
          good_coins: number
          id: string
          image_url: string | null
          name: string
          original_price: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          discounted_price?: number | null
          good_coins: number
          id?: string
          image_url?: string | null
          name: string
          original_price?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          discounted_price?: number | null
          good_coins?: number
          id?: string
          image_url?: string | null
          name?: string
          original_price?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          child_id: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          type: string
        }
        Insert: {
          amount: number
          child_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          type: string
        }
        Update: {
          amount?: number
          child_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
