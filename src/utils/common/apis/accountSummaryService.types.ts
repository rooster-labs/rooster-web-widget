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
      account_info: {
        Row: {
          account_id: string
          account_name: string
          account_type: string
          is_investment: boolean
          service_name: string
          user_id: string
        }
        Insert: {
          account_id?: string
          account_name?: string
          account_type?: string
          is_investment?: boolean
          service_name?: string
          user_id?: string
        }
        Update: {
          account_id?: string
          account_name?: string
          account_type?: string
          is_investment?: boolean
          service_name?: string
          user_id?: string
        }
        Relationships: []
      }
      account_values: {
        Row: {
          account_id: string
          balance: number
          cash: number | null
          created_at: string
          market_value: number | null
          net_deposit: number | null
          pending_balance: number | null
        }
        Insert: {
          account_id: string
          balance?: number
          cash?: number | null
          created_at: string
          market_value?: number | null
          net_deposit?: number | null
          pending_balance?: number | null
        }
        Update: {
          account_id?: string
          balance?: number
          cash?: number | null
          created_at?: string
          market_value?: number | null
          net_deposit?: number | null
          pending_balance?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "account_values_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "account_data_view"
            referencedColumns: ["account_id"]
          },
          {
            foreignKeyName: "account_values_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "account_info"
            referencedColumns: ["account_id"]
          },
        ]
      }
      user_table: {
        Row: {
          user_id: string
          user_name: string
        }
        Insert: {
          user_id?: string
          user_name: string
        }
        Update: {
          user_id?: string
          user_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      account_data_view: {
        Row: {
          account_id: string | null
          account_name: string | null
          account_type: string | null
          balance: number | null
          cash: number | null
          created_at: string | null
          is_investment: boolean | null
          market_value: number | null
          net_deposit: number | null
          pending_balance: number | null
          service_name: string | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      account_summary_data: {
        Args: {
          p_user_id: string
        }
        Returns: {
          account_id: string | null
          account_name: string | null
          account_type: string | null
          balance: number | null
          cash: number | null
          created_at: string | null
          is_investment: boolean | null
          market_value: number | null
          net_deposit: number | null
          pending_balance: number | null
          service_name: string | null
          user_id: string | null
        }[]
      }
      add_account: {
        Args: {
          p_user_id: string
          p_account_name: string
          p_service_name: string
          p_account_type: string
          p_is_investment: boolean
          p_balance: number
          p_pending_balance: number
          p_cash: number
          p_market_value: number
          p_net_deposit: number
        }
        Returns: {
          account_id: string | null
          account_name: string | null
          account_type: string | null
          balance: number | null
          cash: number | null
          created_at: string | null
          is_investment: boolean | null
          market_value: number | null
          net_deposit: number | null
          pending_balance: number | null
          service_name: string | null
          user_id: string | null
        }[]
      }
      latest_account_value: {
        Args: {
          p_user_id: string
          p_account_id: string
        }
        Returns: {
          account_id: string
          balance: number
          cash: number | null
          created_at: string
          market_value: number | null
          net_deposit: number | null
          pending_balance: number | null
        }[]
      }
      user_table_has: {
        Args: {
          p_user_name: string
        }
        Returns: boolean
      }
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
