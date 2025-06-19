import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://hjjpvogmrnwenczvaaio.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqanB2b2dtcm53ZW5jenZhYWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNzkzNTgsImV4cCI6MjA2Mzg1NTM1OH0.pYjL31hMpwm649B-gyxhMK5JvrpMq39W4x9fDuzIu3Q"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface Profile {
  id: string
  username?: string
  display_name?: string
  avatar_url?: string
  bio?: string
  total_xp: number
  level: number
  streak_days: number
  last_activity_date?: string
  is_premium: boolean
  premium_expires_at?: string
  subscription_type?: string
  created_at: string
  updated_at: string
}

export interface UserProblemProgress {
  id: string
  user_id: string
  problem_id: string
  status: "not_started" | "in_progress" | "solved" | "archived"
  attempts: number
  time_spent: number
  solution_submitted?: string
  solved_at?: string
  created_at: string
  updated_at: string
}
