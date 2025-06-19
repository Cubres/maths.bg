"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const url = `${pathname}${searchParams ? `?${searchParams}` : ""}`

    if (isNavigating) {
      // If we're already navigating, reset the timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Set a new timeout to clear the navigating state
      timeoutRef.current = setTimeout(() => {
        setIsNavigating(false)
      }, 600) // Much shorter timeout
    } else {
      setIsNavigating(true)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [pathname, searchParams, isNavigating])

  return null
}
