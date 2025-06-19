"use client"

import { useEffect } from "react"

export default function ClickTracker() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Declare the global properties
      if (!("lastClickX" in window)) {
        window.lastClickX = 0
      }
      if (!("lastClickY" in window)) {
        window.lastClickY = 0
      }

      const trackClick = (e: MouseEvent) => {
        window.lastClickX = e.clientX
        window.lastClickY = e.clientY
      }

      const trackTouch = (e: TouchEvent) => {
        if (e.touches && e.touches[0]) {
          window.lastClickX = e.touches[0].clientX
          window.lastClickY = e.touches[0].clientY
        }
      }

      window.addEventListener("mousedown", trackClick)
      window.addEventListener("touchstart", trackTouch)

      return () => {
        window.removeEventListener("mousedown", trackClick)
        window.removeEventListener("touchstart", trackTouch)
      }
    }
  }, [])

  return null
}
