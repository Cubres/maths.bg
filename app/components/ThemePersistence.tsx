"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function ThemePersistence() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Handle initial mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Restore theme from localStorage on initial load and page navigation
  useEffect(() => {
    if (mounted) {
      const storedTheme = localStorage.getItem("maths-bg-theme")
      if (storedTheme) {
        setTheme(storedTheme)
      }
    }
  }, [mounted, pathname, setTheme])

  // Store theme in localStorage when it changes
  useEffect(() => {
    if (mounted && theme) {
      localStorage.setItem("maths-bg-theme", theme)
    }
  }, [mounted, theme])

  return null
}
