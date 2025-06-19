"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getThemePreference, toggleTheme } from "../lib/themeManager"

export default function DirectThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Initialize on mount
  useEffect(() => {
    setMounted(true)
    const theme = getThemePreference()
    setIsDark(theme === "dark")

    // Listen for theme change events
    const handleThemeChange = (e: CustomEvent) => {
      setIsDark(e.detail.theme === "dark")
    }

    window.addEventListener("themechange", handleThemeChange as EventListener)
    return () => window.removeEventListener("themechange", handleThemeChange as EventListener)
  }, [])

  // Function to toggle theme
  const handleToggle = () => {
    const newTheme = toggleTheme()
    setIsDark(newTheme === "dark")
  }

  if (!mounted) {
    return <div className="w-10 h-10"></div>
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={handleToggle}
            aria-label="Превключи тема"
            className="border-gray-200 dark:border-gray-700 rounded-full w-10 h-10 flex items-center justify-center"
          >
            <span className="emoji text-lg">{isDark ? "🏙️" : "🌃"}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Превключи между светла и тъмна тема</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
