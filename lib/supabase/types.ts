export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          display_name: string | null
          avatar_url: string | null
          bio: string | null
          total_xp: number
          level: number
          streak_days: number
          last_activity_date: string | null
          is_premium: boolean
          premium_expires_at: string | null
          subscription_type: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          total_xp?: number
          level?: number
          streak_days?: number
          last_activity_date?: string | null
          is_premium?: boolean
          premium_expires_at?: string | null
          subscription_type?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          total_xp?: number
          level?: number
          streak_days?: number
          last_activity_date?: string | null
          is_premium?: boolean
          premium_expires_at?: string | null
          subscription_type?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      problems: {
        Row: {
          id: string
          title: string
          description: string | null
          solution: string | null
          difficulty: number | null
          category: string | null
          tags: string[] | null
          competition: string | null
          class_level: string | null
          xp_reward: number
          created_at: string
        }
      }
      user_problem_progress: {
        Row: {
          id: string
          user_id: string
          problem_id: string
          status: string
          attempts: number
          time_spent: number
          solution_submitted: string | null
          solved_at: string | null
          created_at: string
          updated_at: string
        }
      }
      collections: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          is_public: boolean
          problem_ids: string[]
          is_collaborative: boolean
          collaborator_ids: string[]
          template_id: string | null
          is_template: boolean
          template_category: string | null
          download_count: number
          likes_count: number
          created_at: string
          updated_at: string
        }
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          category: string | null
          requirement_type: string | null
          requirement_value: number | null
          requirement_data: Json | null
          xp_reward: number
          is_premium_only: boolean
          created_at: string
        }
      }
    }
  }
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type Problem = Database["public"]["Tables"]["problems"]["Row"]
export type UserProblemProgress = Database["public"]["Tables"]["user_problem_progress"]["Row"]
export type Collection = Database["public"]["Tables"]["collections"]["Row"]
export type Achievement = Database["public"]["Tables"]["achievements"]["Row"]
