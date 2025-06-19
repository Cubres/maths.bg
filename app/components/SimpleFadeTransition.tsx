"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { type ReactNode, useEffect, useState } from "react"

export default function SimpleFadeTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    setDisplayChildren(children)
  }, [children])

  return (
    <div className="bg-background min-h-screen w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2, // Very quick fade
            ease: "easeInOut",
          }}
          className="bg-background min-h-screen w-full"
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
