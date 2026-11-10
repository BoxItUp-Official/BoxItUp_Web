export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      bags: {
        Row: {
          allergens: string[]
          box_id: string | null
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          merchant_id: string
          original_price: number
          pickup_date: string
          pickup_end: string
          pickup_start: string
          quantity_remaining: number
          quantity_total: number
          sale_price: number
          tags: string[]
          title: string
        }
        Insert: {
          allergens?: string[]
          box_id?: string | null
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          merchant_id: string
          original_price: number
          pickup_date: string
          pickup_end: string
          pickup_start: string
          quantity_remaining: number
          quantity_total: number
          sale_price: number
          tags?: string[]
          title: string
        }
        Update: {
          allergens?: string[]
          box_id?: string | null
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          merchant_id?: string
          original_price?: number
          pickup_date?: string
          pickup_end?: string
          pickup_start?: string
          quantity_remaining?: number
          quantity_total?: number
          sale_price?: number
          tags?: string[]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "bags_box_id_fkey"
            columns: ["box_id"]
            isOneToOne: false
            referencedRelation: "boxes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bags_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bags_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
        ]
      }
      boxes: {
        Row: {
          allergens: string[]
          auto_publish_time: string | null
          available_days: string[]
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          merchant_id: string
          name: string
          original_value: number
          photo_url: string | null
          pickup_end: string
          pickup_start: string
          price: number
          quantity: number
          tags: string[]
        }
        Insert: {
          allergens?: string[]
          auto_publish_time?: string | null
          available_days?: string[]
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          merchant_id: string
          name: string
          original_value: number
          photo_url?: string | null
          pickup_end?: string
          pickup_start?: string
          price: number
          quantity?: number
          tags?: string[]
        }
        Update: {
          allergens?: string[]
          auto_publish_time?: string | null
          available_days?: string[]
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          merchant_id?: string
          name?: string
          original_value?: number
          photo_url?: string | null
          pickup_end?: string
          pickup_start?: string
          price?: number
          quantity?: number
          tags?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "boxes_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boxes_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
        ]
      }
      business_leads: {
        Row: {
          category: string | null
          city: string | null
          contact_name: string
          created_at: string
          email: string
          id: string
          notes: string | null
          phone: string | null
          store_name: string
        }
        Insert: {
          category?: string | null
          city?: string | null
          contact_name: string
          created_at?: string
          email: string
          id?: string
          notes?: string | null
          phone?: string | null
          store_name: string
        }
        Update: {
          category?: string | null
          city?: string | null
          contact_name?: string
          created_at?: string
          email?: string
          id?: string
          notes?: string | null
          phone?: string | null
          store_name?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          inquiry_type: string
          message: string
          name: string
          organization: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          inquiry_type: string
          message: string
          name: string
          organization?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          inquiry_type?: string
          message?: string
          name?: string
          organization?: string | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          merchant_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          merchant_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          merchant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      merchants: {
        Row: {
          address: string | null
          avatar_icon: string | null
          business_hours: Json | null
          business_reg_no: string | null
          category: string | null
          city: string | null
          commission_rate: number
          contact_name: string | null
          created_at: string
          currency: string
          description: string | null
          district: string | null
          id: string
          instagram: string | null
          line_id: string | null
          location: unknown
          onboarding_complete: boolean
          phone: string | null
          photo_url: string | null
          preferences: Json
          rating: number
          rating_count: number
          region: string
          store_name: string | null
          updated_at: string
          verified: boolean
          website: string | null
        }
        Insert: {
          address?: string | null
          avatar_icon?: string | null
          business_hours?: Json | null
          business_reg_no?: string | null
          category?: string | null
          city?: string | null
          commission_rate?: number
          contact_name?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          district?: string | null
          id: string
          instagram?: string | null
          line_id?: string | null
          location?: unknown
          onboarding_complete?: boolean
          phone?: string | null
          photo_url?: string | null
          preferences?: Json
          rating?: number
          rating_count?: number
          region?: string
          store_name?: string | null
          updated_at?: string
          verified?: boolean
          website?: string | null
        }
        Update: {
          address?: string | null
          avatar_icon?: string | null
          business_hours?: Json | null
          business_reg_no?: string | null
          category?: string | null
          city?: string | null
          commission_rate?: number
          contact_name?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          district?: string | null
          id?: string
          instagram?: string | null
          line_id?: string | null
          location?: unknown
          onboarding_complete?: boolean
          phone?: string | null
          photo_url?: string | null
          preferences?: Json
          rating?: number
          rating_count?: number
          region?: string
          store_name?: string | null
          updated_at?: string
          verified?: boolean
          website?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          data: Json
          id: string
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          data?: Json
          id?: string
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          data?: Json
          id?: string
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number
          bag_id: string
          bag_title: string
          cancelled_at: string | null
          commission: number
          created_at: string
          customer_name: string | null
          customer_phone: string | null
          expires_at: string | null
          id: string
          merchant_id: string
          paid_at: string | null
          payment_method: string
          payment_ref: string | null
          picked_up_at: string | null
          pickup_code: string
          status: string
          user_id: string | null
        }
        Insert: {
          amount: number
          bag_id: string
          bag_title: string
          cancelled_at?: string | null
          commission?: number
          created_at?: string
          customer_name?: string | null
          customer_phone?: string | null
          expires_at?: string | null
          id?: string
          merchant_id: string
          paid_at?: string | null
          payment_method: string
          payment_ref?: string | null
          picked_up_at?: string | null
          pickup_code: string
          status: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          bag_id?: string
          bag_title?: string
          cancelled_at?: string | null
          commission?: number
          created_at?: string
          customer_name?: string | null
          customer_phone?: string | null
          expires_at?: string | null
          id?: string
          merchant_id?: string
          paid_at?: string | null
          payment_method?: string
          payment_ref?: string | null
          picked_up_at?: string | null
          pickup_code?: string
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_bag_id_fkey"
            columns: ["bag_id"]
            isOneToOne: false
            referencedRelation: "bags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          merchant_id: string
          order_id: string
          rating: number
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          merchant_id: string
          order_id: string
          rating: number
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          merchant_id?: string
          order_id?: string
          rating?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_provider: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          no_show_count: number
          phone: string | null
        }
        Insert: {
          auth_provider?: string | null
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          no_show_count?: number
          phone?: string | null
        }
        Update: {
          auth_provider?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          no_show_count?: number
          phone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      merchant_profiles: {
        Row: {
          address: string | null
          avatar_icon: string | null
          business_hours: Json | null
          category: string | null
          city: string | null
          description: string | null
          district: string | null
          id: string | null
          instagram: string | null
          lat: number | null
          lng: number | null
          phone: string | null
          photo_url: string | null
          rating: number | null
          rating_count: number | null
          store_name: string | null
          verified: boolean | null
          website: string | null
        }
        Insert: {
          address?: string | null
          avatar_icon?: string | null
          business_hours?: Json | null
          category?: string | null
          city?: string | null
          description?: string | null
          district?: string | null
          id?: string | null
          instagram?: string | null
          lat?: never
          lng?: never
          phone?: string | null
          photo_url?: string | null
          rating?: number | null
          rating_count?: number | null
          store_name?: string | null
          verified?: boolean | null
          website?: string | null
        }
        Update: {
          address?: string | null
          avatar_icon?: string | null
          business_hours?: Json | null
          category?: string | null
          city?: string | null
          description?: string | null
          district?: string | null
          id?: string | null
          instagram?: string | null
          lat?: never
          lng?: never
          phone?: string | null
          photo_url?: string | null
          rating?: number | null
          rating_count?: number | null
          store_name?: string | null
          verified?: boolean | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      _publish_bag: {
        Args: { p_box_id: string; p_date: string; p_quantity: number }
        Returns: {
          allergens: string[]
          box_id: string | null
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          merchant_id: string
          original_price: number
          pickup_date: string
          pickup_end: string
          pickup_start: string
          quantity_remaining: number
          quantity_total: number
          sale_price: number
          tags: string[]
          title: string
        }
        SetofOptions: {
          from: "*"
          to: "bags"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      cancel_order: {
        Args: { p_order_id: string }
        Returns: {
          amount: number
          bag_id: string
          bag_title: string
          cancelled_at: string | null
          commission: number
          created_at: string
          customer_name: string | null
          customer_phone: string | null
          expires_at: string | null
          id: string
          merchant_id: string
          paid_at: string | null
          payment_method: string
          payment_ref: string | null
          picked_up_at: string | null
          pickup_code: string
          status: string
          user_id: string | null
        }
        SetofOptions: {
          from: "*"
          to: "orders"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      create_order: {
        Args: { p_bag_id: string; p_payment_method: string }
        Returns: {
          amount: number
          bag_id: string
          bag_title: string
          cancelled_at: string | null
          commission: number
          created_at: string
          customer_name: string | null
          customer_phone: string | null
          expires_at: string | null
          id: string
          merchant_id: string
          paid_at: string | null
          payment_method: string
          payment_ref: string | null
          picked_up_at: string | null
          pickup_code: string
          status: string
          user_id: string | null
        }
        SetofOptions: {
          from: "*"
          to: "orders"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      delete_my_account: { Args: never; Returns: undefined }
      ensure_user: {
        Args: never
        Returns: {
          auth_provider: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          no_show_count: number
          phone: string | null
        }
        SetofOptions: {
          from: "*"
          to: "users"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      expire_orders: { Args: never; Returns: number }
      generate_pickup_code: { Args: never; Returns: string }
      get_nearby_bags: {
        Args: {
          filter_category?: string
          radius_km?: number
          user_lat: number
          user_lng: number
        }
        Returns: {
          address: string
          bag_id: string
          category: string
          distance_km: number
          district: string
          image_url: string
          lat: number
          lng: number
          merchant_id: string
          merchant_logo: string
          merchant_name: string
          merchant_verified: boolean
          original_price: number
          pickup_end: string
          pickup_start: string
          quantity_remaining: number
          quantity_total: number
          rating: number
          rating_count: number
          sale_price: number
          title: string
        }[]
      }
      publish_bag: {
        Args: { p_box_id: string; p_quantity?: number }
        Returns: {
          allergens: string[]
          box_id: string | null
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          merchant_id: string
          original_price: number
          pickup_date: string
          pickup_end: string
          pickup_start: string
          quantity_remaining: number
          quantity_total: number
          sale_price: number
          tags: string[]
          title: string
        }
        SetofOptions: {
          from: "*"
          to: "bags"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      publish_due_bags: { Args: never; Returns: number }
      set_bag_active: {
        Args: { p_active: boolean; p_bag_id: string }
        Returns: {
          allergens: string[]
          box_id: string | null
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          merchant_id: string
          original_price: number
          pickup_date: string
          pickup_end: string
          pickup_start: string
          quantity_remaining: number
          quantity_total: number
          sale_price: number
          tags: string[]
          title: string
        }
        SetofOptions: {
          from: "*"
          to: "bags"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      update_bag_quantity: {
        Args: { p_bag_id: string; p_quantity_total: number }
        Returns: {
          allergens: string[]
          box_id: string | null
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          merchant_id: string
          original_price: number
          pickup_date: string
          pickup_end: string
          pickup_start: string
          quantity_remaining: number
          quantity_total: number
          sale_price: number
          tags: string[]
          title: string
        }
        SetofOptions: {
          from: "*"
          to: "bags"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      verify_pickup: {
        Args: { p_code: string }
        Returns: {
          amount: number
          bag_id: string
          bag_title: string
          cancelled_at: string | null
          commission: number
          created_at: string
          customer_name: string | null
          customer_phone: string | null
          expires_at: string | null
          id: string
          merchant_id: string
          paid_at: string | null
          payment_method: string
          payment_ref: string | null
          picked_up_at: string | null
          pickup_code: string
          status: string
          user_id: string | null
        }
        SetofOptions: {
          from: "*"
          to: "orders"
          isOneToOne: true
          isSetofReturn: false
        }
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
