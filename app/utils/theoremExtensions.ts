import type React from "react"
import { convertTheoremsToIntegrations } from "../data/theorems"
import type { Integration } from "../data/integrations"
import { Calculator, Triangle, Hash, Network, Map, Scissors, Variable, BookOpen } from "lucide-react"

// Extend theorems with difficulty and usefulness ratings
export function convertExtendedTheoremsToIntegrations(): Integration[] {
  const theoremIntegrations = convertTheoremsToIntegrations()

  // Add icon mapping based on category
  return theoremIntegrations.map((integration) => {
    // Create a mapping of categories to icons
    const iconComponents: Record<string, React.ComponentType> = {
      алгебра: Calculator,
      геометрия: Triangle,
      "теория на числата": Hash,
      комбинаторика: Network,
      тригонометрия: Map,
      неравенства: Scissors,
      полиноми: Variable,
      default: BookOpen,
    }

    // Get the appropriate icon
    const IconComponent = iconComponents[integration.category] || iconComponents.default

    // Make sure tags is always an array
    const tags = Array.isArray(integration.tags) ? integration.tags : []

    // Return the enhanced integration
    return {
      ...integration,
      icon: IconComponent,
      tags: tags,
    }
  })
}
