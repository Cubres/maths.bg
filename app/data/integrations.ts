import {
  BarChart,
  FileText,
  Cpu,
  Database,
  Map,
  Scissors,
  Calculator,
  Triangle,
  Hash,
  Network,
  Ruler,
  Square,
  Divide,
  GitBranch,
  Variable,
  BookOpen,
  Box,
  Palette,
  Repeat,
  Sigma,
  Dice1Icon as Dice,
} from "lucide-react"
import type React from "react"
import { customProblems } from "./problems"

export type Integration = {
  id: string
  name: string
  description: string
  category: string
  icon: React.ComponentType
  color: string
  solution: string
  class: string
  competition: string
  tags: string[]
  // New fields for theorems
  difficulty?: number
  usefulness?: number
  proof?: string
}

export type CustomProblem = {
  title: string
  contest: string
  preview: string
  tags: string[]
  solution: string
  clas: number | string
}

// Math-specific categories
export const categories = [
  "All",
  "алгебра",
  "геометрия",
  "теория на числата",
  "комбинаторика",
  "аритметична прогресия",
  "изразяване на ъгли",
  "квадрати",
  "делимост",
  "графи",
  "тригонометрия",
  "редици",
  "множества",
  "полиноми",
  "параметри",
  "неравенства",
  "системи уравнения",
  "оцветявания",
  "игри & статегии",
  "модулни сравнения",
  "факториели",
  "вероятности",
]

export const classes = ["9", "10", "11", "12"]
export const competitions = [
  "Есенен математически турнир",
  "Пролетен математически турнир",
  "Национална олимпиада по математика",
  "Международна олимпиада по математика",
  "Зимно математическо състезание",
]

// Function to automatically convert custom problems to integrations
function convertCustomProblemsToIntegrations(problems: CustomProblem[]): Integration[] {
  // Create a mapping of categories to icons
  const iconComponents: Record<string, React.ComponentType> = {
    алгебра: Calculator,
    геометрия: Triangle,
    "теория на числата": Hash,
    комбинаторика: Network,
    "аритметична прогресия": BarChart,
    "изразяване на ъгли": Ruler,
    квадрати: Square,
    делимост: Divide,
    графи: GitBranch,
    тригонометрия: Map,
    редици: Database,
    множества: Box,
    полиноми: Variable,
    параметри: FileText,
    неравенства: Scissors,
    "системи уравнения": Cpu,
    оцветявания: Palette,
    "игри & статегии": Dice,
    "модулни сравнения": Repeat,
    факториели: Sigma,
    вероятности: Dice,
    default: BookOpen,
  }

  // Color mapping for categories
  const colorMapping: Record<string, string> = {
    алгебра: "#2F7AE5", // Blue
    геометрия: "#96BF48", // Green
    "теория на числата": "#E37400", // Orange
    комбинаторика: "#FF4A00", // Red
    "аритметична прогресия": "#FFE01B", // Yellow
    "изразяване на ъгли": "#9C27B0", // Purple
    квадрати: "#00BCD4", // Teal
    делимост: "#795548", // Brown
    графи: "#607D8B", // Gray
    тригонометрия: "#3F51B5", // Indigo
    редици: "#4CAF50", // Green
    множества: "#FF9800", // Orange
    полиноми: "#F22F46", // Pink
    параметри: "#00A1E0", // Light Blue
    неравенства: "#F06A6A", // Light Red
    "системи уравнения": "#FFCC22", // Light Yellow
    оцветявания: "#6772E5", // Light Purple
    "игри & статегии": "#D32D27", // Dark Red
    "модулни сравнения": "#0061FF", // Dark Blue
    факториели: "#2D8CFF", // Medium Blue
    вероятности: "#FF4A00", // Red
  }

  return problems.map((problem, index) => {
    // Get the primary category (first tag)
    const primaryCategory = problem.tags[0] || "default"

    // Get the appropriate icon and color
    const IconComponent = iconComponents[primaryCategory] || iconComponents["default"]
    const color = colorMapping[primaryCategory] || "#2F7AE5" // Default to blue if no mapping

    // Create tags array including competition and class
    const allTags = [
      ...problem.tags,
      problem.contest, // Add contest/competition as a tag
      `Class ${problem.clas}`, // Add class as a tag
    ]

    return {
      id: `p${index + 1}`,
      name: problem.preview, // preview becomes name
      description: convertHtmlToMarkdown(problem.title), // Convert HTML to Markdown in title
      category: primaryCategory, // First tag as category
      icon: IconComponent,
      color: color,
      solution: convertHtmlToMarkdown(problem.solution), // Convert HTML to Markdown in solution
      class: problem.clas.toString(), // Convert to string if it's a number
      competition: problem.contest, // contest becomes competition
      tags: allTags, // tags plus competition and class
    }
  })
}

// Enhanced utility function to convert HTML formatting to Markdown
function convertHtmlToMarkdown(text: string): string {
  if (!text) return ""

  // Replace all variations of <br> tags with newlines
  let result = text.replace(/<br\s*\/?>/gi, "\n")

  // Replace <i>...</i> tags with italic markdown formatting
  result = result.replace(/<i>(.*?)<\/i>/gi, "*$1*")

  // Replace <b>...</b> tags with bold markdown formatting
  result = result.replace(/<b>(.*?)<\/b>/gi, "**$1**")

  // Replace <u>...</u> tags with underline markdown formatting
  result = result.replace(/<u>(.*?)<\/u>/gi, "__$1__")

  // Replace <h1> to <h6> tags
  result = result.replace(/<h1>(.*?)<\/h1>/gi, "# $1\n")
  result = result.replace(/<h2>(.*?)<\/h2>/gi, "## $1\n")
  result = result.replace(/<h3>(.*?)<\/h3>/gi, "### $1\n")
  result = result.replace(/<h4>(.*?)<\/h4>/gi, "#### $1\n")
  result = result.replace(/<h5>(.*?)<\/h5>/gi, "##### $1\n")
  result = result.replace(/<h6>(.*?)<\/h6>/gi, "###### $1\n")

  // Replace <a> tags
  result = result.replace(/<a\s+href="(.*?)".*?>(.*?)<\/a>/gi, "[$2]($1)")

  // Replace <ul> and <li> tags
  result = result.replace(/<ul>(.*?)<\/ul>/gis, (match, content) => {
    return content.replace(/<li>(.*?)<\/li>/gi, "- $1\n")
  })

  // Replace <ol> and <li> tags
  result = result.replace(/<ol>(.*?)<\/ol>/gis, (match, content) => {
    let index = 1
    return content.replace(/<li>(.*?)<\/li>/gi, (match, item) => {
      return `${index++}. ${item}\n`
    })
  })

  return result
}

// Generate the integrations from custom problems
export const integrations = convertCustomProblemsToIntegrations(customProblems)

// Stub function that returns an empty array to maintain compatibility
export function generateVaryingIntegrations(_count: number): Integration[] {
  return [] // Return empty array since we don't want any generated integrations
}
