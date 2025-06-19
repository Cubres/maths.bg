"use client"

import { useRef, useEffect, useState } from "react"
import type { Integration } from "../../data/integrations"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getIconsForTags, iconMapping } from "../../data/iconMapping"
import { MathJax } from "better-react-mathjax"
import React from "react"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type IntegrationCardProps = {
  integration: Integration
  onClick: () => void
  isArchived?: boolean
  onUnarchive?: () => void
  onTagClick: (tag: string) => void
  contentType: "problems" | "theorems"
}

export default function IntegrationCard({
  integration,
  onClick,
  isArchived = false,
  onUnarchive,
  onTagClick,
  contentType,
}: IntegrationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Get custom icons for this integration's tags
  const customIcons = getIconsForTags(integration.tags || [])
  const hasCustomIcons = customIcons.length > 0

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleUnarchive = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onUnarchive) {
      onUnarchive()
    }
  }

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation()
    onTagClick(tag)
  }

  // Function to format text with line breaks
  const formatText = (text: string) => {
    return text.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split("\n").length - 1 && <br />}
      </React.Fragment>
    ))
  }

  // Function to get background style based on color and theme
  const getBackgroundStyle = (icon: any) => {
    if (!mounted) return {}

    if (theme === "dark") {
      return { backgroundColor: icon.vibrantBackgroundColor }
    }
    return { backgroundColor: icon.backgroundColor }
  }

  // Function to render star ratings using emojis with outline
  const renderStars = (rating: number | undefined, label: string) => {
    if (rating === undefined) return null

    return (
      <div className="flex items-center gap-1 mb-1">
        <span className="text-xs text-gray-500 dark:text-gray-400">{label}:</span>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                textShadow: "0px 0px 1px black",
                filter: star <= (rating || 0) ? "none" : "grayscale(1) opacity(0.5)",
                fontSize: "0.75rem",
                lineHeight: "1rem",
              }}
            >
              ⭐️
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (!mounted) {
    return null // Avoid rendering until mounted to prevent hydration mismatch
  }

  const isTheorem = contentType === "theorems" || integration.id.startsWith("t")

  // Define vibrant colors for both modes
  const problemVibrantColor = "#2F7AE5" // Vibrant blue for problems
  const theoremVibrantColor = "#4CAF50" // Vibrant green for theorems

  // Use vibrant colors for both light and dark mode
  const tagColor = isTheorem ? theoremVibrantColor : problemVibrantColor

  return (
    <Card
      className={`transition-all duration-300 group cursor-pointer hover:shadow-xl dark:hover:shadow-white/20 shadow-none border-0 rounded-xl ${
        isArchived ? "bg-gray-50 dark:bg-gray-800" : "dark:bg-[#404040]"
      }`}
    >
      <CardContent className="p-4 flex flex-col relative" onClick={onClick} ref={cardRef}>
        {isArchived && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleUnarchive}
                  aria-label="Върни обратно"
                >
                  <span className="emoji">📤</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Върни обратно в нерешени</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <div className="flex flex-col items-center text-center space-y-2 mb-3">
          {hasCustomIcons ? (
            <div className="flex justify-center items-center gap-2">
              {customIcons.map((icon, index) => {
                // Find the tag that corresponds to this icon
                const tagForIcon = integration.tags?.find((tag) => iconMapping[tag]?.emoji === icon.emoji) || ""

                return (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300"
                          style={getBackgroundStyle(icon)}
                        >
                          <span className="emoji">{icon.emoji}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{tagForIcon}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              })}
            </div>
          ) : null}
          <h3 className="font-semibold text-sm dark:text-white">{integration.name}</h3>
        </div>
        <div className="text-xs text-gray-500 dark:text-[#d0d0d0] mb-3">
          <MathJax>{formatText(integration.description)}</MathJax>
        </div>

        {/* Display difficulty and usefulness for theorems */}
        {isTheorem && (
          <div className="mb-2">
            {renderStars(integration.difficulty, "Трудност")}
            {renderStars(integration.usefulness, "Полезност")}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {(integration.tags || []).map((tag, index) => {
            return (
              <button
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium transition-colors"
                style={{
                  backgroundColor: tagColor,
                  color: "white",
                  opacity: 0.9,
                }}
                onClick={(e) => handleTagClick(e, tag)}
              >
                {tag}
              </button>
            )
          })}
        </div>

        {isArchived && (
          <div className="mt-3 text-xs text-center py-1 bg-gray-100 dark:bg-gray-700 rounded-full dark:text-gray-300">
            Решени
          </div>
        )}
      </CardContent>
    </Card>
  )
}
