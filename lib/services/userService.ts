import { createClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"]
type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"]

export class UserService {
  private static supabase = createClient()

  static async getUserProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await this.supabase.from("profiles").select("*").eq("id", userId).single()

    if (error) {
      console.error("Error fetching user profile:", error)
      return null
    }

    return data
  }

  static async updateUserProfile(userId: string, updates: ProfileUpdate): Promise<Profile | null> {
    const { data, error } = await this.supabase
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single()

    if (error) {
      console.error("Error updating user profile:", error)
      return null
    }

    return data
  }

  static async createUserProfile(profile: ProfileInsert): Promise<Profile | null> {
    const { data, error } = await this.supabase.from("profiles").insert(profile).select().single()

    if (error) {
      console.error("Error creating user profile:", error)
      return null
    }

    return data
  }

  static async incrementUserXP(userId: string, xpAmount: number): Promise<void> {
    const { error } = await this.supabase.rpc("increment_user_xp", {
      user_id: userId,
      xp_amount: xpAmount,
    })

    if (error) {
      console.error("Error incrementing user XP:", error)
    }
  }

  static async updateUserStreak(userId: string): Promise<void> {
    const { error } = await this.supabase.rpc("update_user_streak", {
      user_id: userId,
    })

    if (error) {
      console.error("Error updating user streak:", error)
    }
  }
}
