"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useTheme } from "next-themes"

interface AnnouncementBannerProps {
  message: string
  emoji?: string
  onClose: () => void
}

export default function AnnouncementBanner({ message, emoji = "📣", onClose }: AnnouncementBannerProps) {
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(true)
  const [position, setPosition] = useState(0)

  useEffect(() => {
    // Simple animation effect
    const interval = setInterval(() => {
      setPosition((prev) => (prev === 0 ? -3 : 0))
    }, 400)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  const handleClose = () => {
    setIsVisible(false)
    onClose()
  }

  return (
    <div
      className="announcement-banner flex items-center justify-between px-4 py-1.5 mb-4 rounded-full transition-all duration-500 ease-in-out max-w-lg"
      style={{
        backgroundColor: theme === "dark" ? "rgba(47, 122, 229, 0.2)" : "rgba(47, 122, 229, 0.1)",
        border: `1px solid ${theme === "dark" ? "rgba(47, 122, 229, 0.5)" : "rgba(47, 122, 229, 0.3)"}`,
        transform: `translateY(${position}px)`,
      }}
    >
      <div className="flex items-center">
        <span className="emoji mr-2">{emoji}</span>
        <span className="text-sm font-medium">НОВО: Добавени задачи от Международната олимпиада по математика</span>
      </div>
      <button
        onClick={handleClose}
        className="ml-2 p-1 rounded-full hover:bg-[#2F7AE5]/20"
        aria-label="Close announcement"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}
