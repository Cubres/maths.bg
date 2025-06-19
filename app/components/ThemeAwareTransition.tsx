"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ThemeAwareTransition() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Function to handle navigation start
    const handleNavigationStart = () => {
      try {
        // Get current theme
        const isDark = document.documentElement.classList.contains("dark")

        if (isDark) {
          // Set explicit background colors to prevent flash
          document.documentElement.style.backgroundColor = "#171717"
          document.body.style.backgroundColor = "#171717"

          // Add a class to prevent transitions during navigation
          document.documentElement.classList.add("prevent-transition")
        }
      } catch (e) {
        console.error("Error in navigation start handler:", e)
      }
    }

    // Function to handle navigation complete
    const handleNavigationComplete = () => {
      try {
        // Remove the transition prevention class after a short delay
        setTimeout(() => {
          document.documentElement.classList.remove("prevent-transition")
        }, 50)
      } catch (e) {
        console.error("Error in navigation complete handler:", e)
      }
    }

    // Add event listeners for navigation
    window.addEventListener("beforeunload", handleNavigationStart)

    // Clean up
    return () => {
      window.removeEventListener("beforeunload", handleNavigationStart)
      handleNavigationComplete()
    }
  }, [pathname])

  return null
}
