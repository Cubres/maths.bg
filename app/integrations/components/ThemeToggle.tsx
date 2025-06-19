"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(undefined)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Sync with theme changes
  useEffect(() => {
    if (mounted) {
      setCurrentTheme(theme)

      // Also ensure localStorage is updated
      if (theme) {
        localStorage.setItem("maths-bg-theme", theme)
      }
    }
  }, [mounted, theme])

  // Handle theme toggle with explicit state management
  const toggleTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    setCurrentTheme(newTheme)
    localStorage.setItem("maths-bg-theme", newTheme)
  }

  if (!mounted || !currentTheme) {
    return <div className="w-10 h-10"></div>
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Превключи тема"
            className={`border-gray-200 dark:border-gray-700 rounded-full w-10 h-10 flex items-center justify-center ${
              currentTheme === "dark" ? "bg-[#404040]" : ""
            }`}
          >
            <span className="emoji text-lg">{currentTheme === "dark" ? "🏙️" : "🌃"}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Превключи между светла и тъмна тема</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
