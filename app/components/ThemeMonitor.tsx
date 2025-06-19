"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { getThemePreference, applyTheme } from "../lib/themeManager"

export default function ThemeMonitor() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const navigationCountRef = useRef(0)

  // Apply theme on every navigation
  useEffect(() => {
    navigationCountRef.current += 1
    console.log(`Navigation detected (${navigationCountRef.current}): ${pathname}`)

    // Delay slightly to ensure it runs after any React state updates
    const timer = setTimeout(() => {
      const theme = getThemePreference()
      console.log(`Applying theme after navigation: ${theme}`)
      applyTheme(theme)
    }, 0)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  // Set up interval to periodically check and reapply theme
  useEffect(() => {
    const interval = setInterval(() => {
      const theme = getThemePreference()
      applyTheme(theme)
    }, 1000) // Check every second

    return () => clearInterval(interval)
  }, [])

  // Listen for storage events (in case theme is changed in another tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "maths-bg-theme") {
        console.log(`Theme changed in another tab: ${e.newValue}`)
        applyTheme(e.newValue as "dark" | "light")
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  return null
}
