"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { type ReactNode, useEffect, useState } from "react"
import BlobTransition from "./BlobTransition"

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)
  const [showBlob, setShowBlob] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    if (pathname) {
      setIsNavigating(true)
      setShowBlob(true)

      // Wait for blob to expand before changing content
      const timer = setTimeout(() => {
        setDisplayChildren(children)

        // Wait a bit more before fading in the new content
        setTimeout(() => {
          setIsNavigating(false)

          // Keep the blob visible a bit longer before removing it
          setTimeout(() => {
            setShowBlob(false)
          }, 100) // Very short delay before removing blob
        }, 200) // Short delay before fading in new content
      }, 200) // Short delay before changing content

      return () => clearTimeout(timer)
    }
  }, [pathname, children])

  return (
    <>
      <BlobTransition isActive={showBlob} />

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: isNavigating ? 0 : 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3, // Quick fade
            ease: "easeInOut",
          }}
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
