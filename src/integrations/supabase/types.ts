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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      about_us: {
        Row: {
          created_at: string | null
          description_ar: string | null
          description_en: string | null
          id: string
          mission_ar: string | null
          mission_en: string | null
          updated_at: string | null
          vision_ar: string | null
          vision_en: string | null
        }
        Insert: {
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          id?: string
          mission_ar?: string | null
          mission_en?: string | null
          updated_at?: string | null
          vision_ar?: string | null
          vision_en?: string | null
        }
        Update: {
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          id?: string
          mission_ar?: string | null
          mission_en?: string | null
          updated_at?: string | null
          vision_ar?: string | null
          vision_en?: string | null
        }
        Relationships: []
      }
      blog: {
        Row: {
          author: string | null
          category_id: string | null
          content_ar: string | null
          content_en: string | null
          created_at: string | null
          id: string
          image_url: string | null
          published_at: string | null
          title_ar: string
          title_en: string
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          category_id?: string | null
          content_ar?: string | null
          content_en?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          title_ar: string
          title_en: string
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          category_id?: string | null
          content_ar?: string | null
          content_en?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          title_ar?: string
          title_en?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_categories: {
        Row: {
          created_at: string | null
          id: string
          name_ar: string
          name_en: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name_ar: string
          name_en: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name_ar?: string
          name_en?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          message: string | null
          phone: string | null
          project_type: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          message?: string | null
          phone?: string | null
          project_type?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          message?: string | null
          phone?: string | null
          project_type?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer_ar: string
          answer_en: string
          created_at: string | null
          display_order: number | null
          id: string
          question_ar: string
          question_en: string
          updated_at: string | null
        }
        Insert: {
          answer_ar: string
          answer_en: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          question_ar: string
          question_en: string
          updated_at?: string | null
        }
        Update: {
          answer_ar?: string
          answer_en?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          question_ar?: string
          question_en?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      homepage: {
        Row: {
          created_at: string | null
          hero_image_url: string | null
          id: string
          pillar1_desc: string | null
          pillar1_title: string | null
          pillar2_desc: string | null
          pillar2_title: string | null
          pillar3_desc: string | null
          pillar3_title: string | null
          subtitle_ar: string | null
          subtitle_en: string | null
          title_ar: string
          title_en: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          hero_image_url?: string | null
          id?: string
          pillar1_desc?: string | null
          pillar1_title?: string | null
          pillar2_desc?: string | null
          pillar2_title?: string | null
          pillar3_desc?: string | null
          pillar3_title?: string | null
          subtitle_ar?: string | null
          subtitle_en?: string | null
          title_ar: string
          title_en: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          hero_image_url?: string | null
          id?: string
          pillar1_desc?: string | null
          pillar1_title?: string | null
          pillar2_desc?: string | null
          pillar2_title?: string | null
          pillar3_desc?: string | null
          pillar3_title?: string | null
          subtitle_ar?: string | null
          subtitle_en?: string | null
          title_ar?: string
          title_en?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      industries: {
        Row: {
          created_at: string | null
          description_ar: string | null
          description_en: string | null
          icon_url: string | null
          id: string
          name_ar: string
          name_en: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          icon_url?: string | null
          id?: string
          name_ar: string
          name_en: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          icon_url?: string | null
          id?: string
          name_ar?: string
          name_en?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      partners: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          logo_url: string | null
          name: string
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          logo_url?: string | null
          name: string
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      pricing: {
        Row: {
          created_at: string | null
          description_ar: string | null
          description_en: string | null
          features_ar: Json | null
          features_en: Json | null
          id: string
          name_ar: string
          name_en: string
          price: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          features_ar?: Json | null
          features_en?: Json | null
          id?: string
          name_ar: string
          name_en: string
          price?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          features_ar?: Json | null
          features_en?: Json | null
          id?: string
          name_ar?: string
          name_en?: string
          price?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description_ar: string | null
          description_en: string | null
          icon_url: string | null
          id: string
          name_ar: string
          name_en: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          icon_url?: string | null
          id?: string
          name_ar: string
          name_en: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          icon_url?: string | null
          id?: string
          name_ar?: string
          name_en?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          company_address_ar: string | null
          company_address_en: string | null
          company_description_ar: string | null
          company_description_en: string | null
          company_email: string | null
          company_name_ar: string | null
          company_name_en: string | null
          company_phone: string | null
          created_at: string | null
          default_language: string | null
          favicon_url: string | null
          id: string
          logo_url: string | null
          seo_description_ar: string | null
          seo_description_en: string | null
          seo_keywords_ar: string | null
          seo_keywords_en: string | null
          seo_title_ar: string | null
          seo_title_en: string | null
          social_facebook: string | null
          social_instagram: string | null
          social_linkedin: string | null
          social_twitter: string | null
          social_youtube: string | null
          updated_at: string | null
          whatsapp_number: string | null
        }
        Insert: {
          company_address_ar?: string | null
          company_address_en?: string | null
          company_description_ar?: string | null
          company_description_en?: string | null
          company_email?: string | null
          company_name_ar?: string | null
          company_name_en?: string | null
          company_phone?: string | null
          created_at?: string | null
          default_language?: string | null
          favicon_url?: string | null
          id?: string
          logo_url?: string | null
          seo_description_ar?: string | null
          seo_description_en?: string | null
          seo_keywords_ar?: string | null
          seo_keywords_en?: string | null
          seo_title_ar?: string | null
          seo_title_en?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          social_twitter?: string | null
          social_youtube?: string | null
          updated_at?: string | null
          whatsapp_number?: string | null
        }
        Update: {
          company_address_ar?: string | null
          company_address_en?: string | null
          company_description_ar?: string | null
          company_description_en?: string | null
          company_email?: string | null
          company_name_ar?: string | null
          company_name_en?: string | null
          company_phone?: string | null
          created_at?: string | null
          default_language?: string | null
          favicon_url?: string | null
          id?: string
          logo_url?: string | null
          seo_description_ar?: string | null
          seo_description_en?: string | null
          seo_keywords_ar?: string | null
          seo_keywords_en?: string | null
          seo_title_ar?: string | null
          seo_title_en?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          social_twitter?: string | null
          social_youtube?: string | null
          updated_at?: string | null
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          company_ar: string | null
          company_en: string | null
          content_ar: string
          content_en: string
          created_at: string | null
          id: string
          name_ar: string
          name_en: string
          rating: number | null
          role_ar: string | null
          role_en: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_ar?: string | null
          company_en?: string | null
          content_ar: string
          content_en: string
          created_at?: string | null
          id?: string
          name_ar: string
          name_en: string
          rating?: number | null
          role_ar?: string | null
          role_en?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_ar?: string | null
          company_en?: string | null
          content_ar?: string
          content_en?: string
          created_at?: string | null
          id?: string
          name_ar?: string
          name_en?: string
          rating?: number | null
          role_ar?: string | null
          role_en?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          password: string
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          password: string
          role: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          password?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
