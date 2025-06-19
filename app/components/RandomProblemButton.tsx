"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import type { Integration } from "@/app/data/integrations"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type RandomProblemButtonProps = {
  filteredIntegrations: Integration[]
  onSelectIntegration: (integration: Integration) => void
}

export default function RandomProblemButton({ filteredIntegrations, onSelectIntegration }: RandomProblemButtonProps) {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10"></div>
  }

  const handleRandomProblem = () => {
    if (filteredIntegrations.length === 0) return

    // Select a random integration from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredIntegrations.length)
    const randomIntegration = filteredIntegrations[randomIndex]

    onSelectIntegration(randomIntegration)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRandomProblem}
            aria-label="Случайна задача"
            className={`border-gray-200 dark:border-gray-700 rounded-full w-10 h-10 flex items-center justify-center ${
              filteredIntegrations.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            } ${theme === "dark" ? "bg-[#404040]" : ""}`}
          >
            <span className="emoji text-lg">🪄</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Избери случайна задача от текущата категория</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
