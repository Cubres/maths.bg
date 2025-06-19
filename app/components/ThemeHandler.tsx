"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function ThemeHandler() {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Function to directly apply theme to document
  const applyTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Initialize on mount
  useEffect(() => {
    setMounted(true)

    // Get theme from localStorage
    try {
      const isDark = localStorage.getItem("maths-bg-theme") === "dark"
      applyTheme(isDark)
    } catch (e) {
      console.error("Error reading theme from localStorage:", e)
    }

    // Listen for storage events (in case theme is changed in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "maths-bg-theme") {
        applyTheme(e.newValue === "dark")
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  // Re-apply theme on every page navigation
  useEffect(() => {
    if (mounted) {
      try {
        const isDark = localStorage.getItem("maths-bg-theme") === "dark"
        applyTheme(isDark)
      } catch (e) {
        console.error("Error applying theme after navigation:", e)
      }
    }
  }, [mounted, pathname])

  return null
}
