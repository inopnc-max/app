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
      access_requests: {
        Row: {
          company: string | null
          contact: string | null
          created_at: string
          id: string
          job_title: string | null
          name: string
          profile_id: string
          rejection_reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["access_request_status"]
          updated_at: string
        }
        Insert: {
          company?: string | null
          contact?: string | null
          created_at?: string
          id?: string
          job_title?: string | null
          name: string
          profile_id: string
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["access_request_status"]
          updated_at?: string
        }
        Update: {
          company?: string | null
          contact?: string | null
          created_at?: string
          id?: string
          job_title?: string | null
          name?: string
          profile_id?: string
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["access_request_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "access_requests_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "access_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_events: {
        Row: {
          actor_id: string | null
          created_at: string
          event_type: string
          id: string
          metadata: Json
        }
        Insert: {
          actor_id?: string | null
          created_at?: string
          event_type: string
          id?: string
          metadata?: Json
        }
        Update: {
          actor_id?: string | null
          created_at?: string
          event_type?: string
          id?: string
          metadata?: Json
        }
        Relationships: [
          {
            foreignKeyName: "audit_events_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          accepted_at: string | null
          accepted_by: string | null
          created_at: string
          created_by: string | null
          expires_at: string
          id: string
          revoked_at: string | null
          target_hint: string | null
          target_persona: Database["public"]["Enums"]["persona"]
          token_hash: string
        }
        Insert: {
          accepted_at?: string | null
          accepted_by?: string | null
          created_at?: string
          created_by?: string | null
          expires_at: string
          id?: string
          revoked_at?: string | null
          target_hint?: string | null
          target_persona: Database["public"]["Enums"]["persona"]
          token_hash: string
        }
        Update: {
          accepted_at?: string | null
          accepted_by?: string | null
          created_at?: string
          created_by?: string | null
          expires_at?: string
          id?: string
          revoked_at?: string | null
          target_hint?: string | null
          target_persona?: Database["public"]["Enums"]["persona"]
          token_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitations_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invitations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_memberships: {
        Row: {
          created_at: string
          id: string
          job_title: string | null
          membership_type: string
          organization_id: string
          profile_id: string
          status: Database["public"]["Enums"]["resource_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_title?: string | null
          membership_type: string
          organization_id: string
          profile_id: string
          status?: Database["public"]["Enums"]["resource_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          job_title?: string | null
          membership_type?: string
          organization_id?: string
          profile_id?: string
          status?: Database["public"]["Enums"]["resource_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_memberships_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_memberships_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_site_grants: {
        Row: {
          access_level: Database["public"]["Enums"]["site_access_level"]
          created_at: string
          granted_at: string
          granted_by: string | null
          id: string
          organization_id: string
          site_id: string
          status: Database["public"]["Enums"]["resource_status"]
          updated_at: string
        }
        Insert: {
          access_level?: Database["public"]["Enums"]["site_access_level"]
          created_at?: string
          granted_at?: string
          granted_by?: string | null
          id?: string
          organization_id: string
          site_id: string
          status?: Database["public"]["Enums"]["resource_status"]
          updated_at?: string
        }
        Update: {
          access_level?: Database["public"]["Enums"]["site_access_level"]
          created_at?: string
          granted_at?: string
          granted_by?: string | null
          id?: string
          organization_id?: string
          site_id?: string
          status?: Database["public"]["Enums"]["resource_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_site_grants_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_site_grants_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_site_grants_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          business_number: string | null
          created_at: string
          id: string
          name: string
          normalized_name: string
          status: Database["public"]["Enums"]["resource_status"]
          type: string
          updated_at: string
        }
        Insert: {
          business_number?: string | null
          created_at?: string
          id?: string
          name: string
          normalized_name: string
          status?: Database["public"]["Enums"]["resource_status"]
          type: string
          updated_at?: string
        }
        Update: {
          business_number?: string | null
          created_at?: string
          id?: string
          name?: string
          normalized_name?: string
          status?: Database["public"]["Enums"]["resource_status"]
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_status: Database["public"]["Enums"]["account_status"]
          avatar_url: string | null
          created_at: string
          display_name: string
          id: string
          persona: Database["public"]["Enums"]["persona"] | null
          updated_at: string
        }
        Insert: {
          account_status?: Database["public"]["Enums"]["account_status"]
          avatar_url?: string | null
          created_at?: string
          display_name: string
          id: string
          persona?: Database["public"]["Enums"]["persona"] | null
          updated_at?: string
        }
        Update: {
          account_status?: Database["public"]["Enums"]["account_status"]
          avatar_url?: string | null
          created_at?: string
          display_name?: string
          id?: string
          persona?: Database["public"]["Enums"]["persona"] | null
          updated_at?: string
        }
        Relationships: []
      }
      site_memberships: {
        Row: {
          access_level: Database["public"]["Enums"]["site_access_level"]
          created_at: string
          id: string
          profile_id: string
          site_id: string
          status: Database["public"]["Enums"]["resource_status"]
          updated_at: string
        }
        Insert: {
          access_level?: Database["public"]["Enums"]["site_access_level"]
          created_at?: string
          id?: string
          profile_id: string
          site_id: string
          status?: Database["public"]["Enums"]["resource_status"]
          updated_at?: string
        }
        Update: {
          access_level?: Database["public"]["Enums"]["site_access_level"]
          created_at?: string
          id?: string
          profile_id?: string
          site_id?: string
          status?: Database["public"]["Enums"]["resource_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "site_memberships_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_memberships_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      sites: {
        Row: {
          code: string
          created_at: string
          id: string
          name: string
          status: Database["public"]["Enums"]["resource_status"]
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          name: string
          status?: Database["public"]["Enums"]["resource_status"]
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["resource_status"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      access_request_status: "pending" | "approved" | "rejected"
      account_status: "pending" | "active" | "suspended" | "deactivated"
      persona:
        | "admin"
        | "site_manager"
        | "worker"
        | "production_manager"
        | "partner"
      resource_status: "active" | "inactive"
      site_access_level: "view" | "collaborate"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      access_request_status: ["pending", "approved", "rejected"],
      account_status: ["pending", "active", "suspended", "deactivated"],
      persona: [
        "admin",
        "site_manager",
        "worker",
        "production_manager",
        "partner",
      ],
      resource_status: ["active", "inactive"],
      site_access_level: ["view", "collaborate"],
    },
  },
} as const

