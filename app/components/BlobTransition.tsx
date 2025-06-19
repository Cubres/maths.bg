"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { getThemeColors } from "@/app/utils/themeColors"

export default function BlobTransition({ isActive }: { isActive: boolean }) {
  const [blobPosition, setBlobPosition] = useState({ x: 0, y: 0 })
  const { primary } = getThemeColors("problems") // Get the blue color from problem mode

  useEffect(() => {
    if (isActive) {
      // Get the last clicked position or use center of screen
      const x = window.lastClickX || window.innerWidth / 2
      const y = window.lastClickY || window.innerHeight / 2
      setBlobPosition({ x, y })
    }
  }, [isActive])

  if (!isActive) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        style={{
          position: "absolute",
          top: blobPosition.y,
          left: blobPosition.x,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: primary,
          opacity: 0.4, // Reduced opacity for subtlety
        }}
        initial={{
          width: 0,
          height: 0,
          borderRadius: "100%",
        }}
        animate={{
          width: Math.max(window.innerWidth, window.innerHeight) * 2,
          height: Math.max(window.innerWidth, window.innerHeight) * 2,
          borderRadius: "0%",
        }}
        transition={{
          duration: 0.4, // Much faster animation
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </motion.div>
  )
}
