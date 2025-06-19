"use client"

import { createClient } from "./client"
import type { AuthError, User } from "@supabase/supabase-js"

export class AuthService {
  private static supabase = createClient()

  static async signInWithEmail(email: string): Promise<{ error: AuthError | null }> {
    const { error } = await this.supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    return { error }
  }

  static async signOut(): Promise<{ error: AuthError | null }> {
    const { error } = await this.supabase.auth.signOut()
    return { error }
  }

  static async getCurrentUser(): Promise<User | null> {
    const {
      data: { user },
    } = await this.supabase.auth.getUser()
    return user
  }

  static onAuthStateChange(callback: (user: User | null) => void) {
    return this.supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user ?? null)
    })
  }
}
