import { createClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/types"

type Problem = Database["public"]["Tables"]["problems"]["Row"]
type ProblemInsert = Database["public"]["Tables"]["problems"]["Insert"]
type UserProblemProgress = Database["public"]["Tables"]["user_problem_progress"]["Row"]
type UserProblemProgressInsert = Database["public"]["Tables"]["user_problem_progress"]["Insert"]

export class ProblemService {
  private static supabase = createClient()

  static async getAllProblems(): Promise<Problem[]> {
    const { data, error } = await this.supabase.from("problems").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching problems:", error)
      return []
    }

    return data || []
  }

  static async getProblemById(problemId: string): Promise<Problem | null> {
    const { data, error } = await this.supabase.from("problems").select("*").eq("id", problemId).single()

    if (error) {
      console.error("Error fetching problem:", error)
      return null
    }

    return data
  }

  static async getUserProblemProgress(userId: string, problemId: string): Promise<UserProblemProgress | null> {
    const { data, error } = await this.supabase
      .from("user_problem_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("problem_id", problemId)
      .single()

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "not found"
      console.error("Error fetching user progress:", error)
      return null
    }

    return data
  }

  static async updateUserProblemProgress(
    userId: string,
    problemId: string,
    updates: Partial<UserProblemProgressInsert>,
  ): Promise<UserProblemProgress | null> {
    const { data, error } = await this.supabase
      .from("user_problem_progress")
      .upsert({
        user_id: userId,
        problem_id: problemId,
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Error updating user progress:", error)
      return null
    }

    return data
  }

  static async markProblemSolved(userId: string, problemId: string, xpReward: number): Promise<void> {
    // Update problem progress
    await this.updateUserProblemProgress(userId, problemId, {
      status: "solved",
      solved_at: new Date().toISOString(),
    })

    // Increment user XP
    const { error } = await this.supabase.rpc("increment_user_xp", {
      user_id: userId,
      xp_amount: xpReward,
    })

    if (error) {
      console.error("Error incrementing XP:", error)
    }

    // Update user streak
    await this.supabase.rpc("update_user_streak", {
      user_id: userId,
    })
  }

  static async insertProblemsFromExisting(existingProblems: any[]): Promise<void> {
    const problemsToInsert: ProblemInsert[] = existingProblems.map((problem) => ({
      id: problem.id,
      title: problem.title,
      description: problem.description,
      solution: problem.solution,
      difficulty: problem.difficulty,
      category: problem.category,
      tags: problem.tags,
      competition: problem.competition,
      class_level: problem.class,
      xp_reward: this.calculateXPReward(problem.difficulty),
    }))

    const { error } = await this.supabase.from("problems").upsert(problemsToInsert, { onConflict: "id" })

    if (error) {
      console.error("Error inserting problems:", error)
    }
  }

  private static calculateXPReward(difficulty: number): number {
    const baseXP = 10
    return baseXP * (difficulty || 1)
  }
}
