"use client"

import { useEffect } from "react"

export default function ThemeScript() {
  useEffect(() => {
    // This script runs on the client after hydration
    const script = document.createElement("script")
    script.innerHTML = `
      (function() {
        try {
          const storedTheme = localStorage.getItem("maths-bg-theme");
          if (storedTheme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        } catch (e) {
          console.error("Error applying theme:", e);
        }
      })();
    `
    script.async = false
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
}
