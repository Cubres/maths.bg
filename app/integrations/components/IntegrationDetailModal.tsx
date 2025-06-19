"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import type { Integration } from "../../data/integrations"
import { getIconsForTags, iconMapping } from "../../data/iconMapping"
import { MathJax } from "better-react-mathjax"
import React from "react"
import { useTheme } from "next-themes"
import { transliterateBulgarianToLatin } from "@/app/utils/transliterate"
import { integrations } from "@/app/data/integrations" // Import integrations

type IntegrationDetailModalProps = {
  integration: Integration | null
  isOpen: boolean
  onClose: () => void
  onArchive: (integrationId: string) => void
  isArchived: boolean
  isBookmarked: boolean
  onBookmark: (integrationId: string) => void
  showSolution: boolean
  onToggleSolution: () => void
  contentType: "problems" | "theorems"
}

export default function IntegrationDetailModal({
  integration,
  isOpen,
  onClose,
  onArchive,
  isArchived,
  isBookmarked,
  onBookmark,
  showSolution,
  onToggleSolution,
  contentType,
}: IntegrationDetailModalProps) {
  const [copied, setCopied] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const solutionRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)

    // Add event listener for opening theorems from links
    const handleOpenTheorem = (event: CustomEvent) => {
      const { theoremId } = event.detail
      const theorem = integrations.find((t) => t.id === theoremId)
      if (theorem) {
        // Find the theorem in the integrations list and open it
        onClose() // Close current theorem if open
        // You would need to implement a way to open the new theorem here
        // This depends on how your application manages the modal state
      }
    }

    window.addEventListener("openTheorem", handleOpenTheorem as EventListener)

    return () => {
      window.removeEventListener("openTheorem", handleOpenTheorem as EventListener)
    }
  }, [])

  if (!integration) return null

  // Get custom icons for this integration's tags
  const customIcons = getIconsForTags(integration.tags)
  const hasCustomIcons = customIcons.length > 0

  // Function to format text with line breaks
  const formatText = (text: string) => {
    return text.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split("\n").length - 1 && <br />}
      </React.Fragment>
    ))
  }

  // Function to parse theorem references and make them clickable
  const parseTheoremLinks = (text: string) => {
    // Match patterns like [[t1]] or [[t12|Pythagorean Theorem]]
    const theoremLinkRegex = /\[\[(t\d+)(?:\|(.*?))?\]\]/g

    // Split the text by theorem references
    const parts = text.split(theoremLinkRegex)

    if (parts.length <= 1) {
      return <>{text}</> // No theorem references found
    }

    const result: React.ReactNode[] = []

    for (let i = 0; i < parts.length; i++) {
      // Add the text part
      if (parts[i]) {
        result.push(<React.Fragment key={`text-${i}`}>{parts[i]}</React.Fragment>)
      }

      // If we have a theorem ID (every 3 parts: text, theoremId, displayName)
      if (i + 1 < parts.length && parts[i + 1]?.startsWith("t")) {
        const theoremId = parts[i + 1]
        const displayName = parts[i + 2] || `Теорема ${theoremId.substring(1)}`

        // Add the clickable link
        result.push(
          <a
            key={`link-${i}`}
            href={`#${theoremId}`}
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              // Find the theorem and open it
              const theorem = integrations.find((t) => t.id === theoremId)
              if (theorem) {
                onClose() // Close current theorem
                setTimeout(() => {
                  // Open the referenced theorem
                  window.dispatchEvent(
                    new CustomEvent("openTheorem", {
                      detail: { theoremId: theoremId },
                    }),
                  )
                }, 100)
              }
            }}
          >
            {displayName}
          </a>,
        )

        // Skip the next two parts as we've already processed them
        i += 2
      }
    }

    return <>{result}</>
  }

  // Function to get background style based on color and theme
  const getBackgroundStyle = (icon: any) => {
    if (!mounted) return {}

    if (theme === "dark") {
      return { backgroundColor: icon.vibrantBackgroundColor }
    }
    return { backgroundColor: icon.backgroundColor }
  }

  const handleCopyLink = () => {
    let formattedTitle

    // For theorems, transliterate Bulgarian to Latin characters before replacing spaces
    if (contentType === "theorems" || integration.id.startsWith("t")) {
      formattedTitle = transliterateBulgarianToLatin(integration.name).replace(/\s+/g, ".")
    } else {
      // For problems, just replace spaces with dots (no transliteration)
      formattedTitle = integration.name.replace(/\s+/g, ".")
    }

    const url = `${window.location.origin}${window.location.pathname}#${formattedTitle}`

    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Function to render star ratings
  const renderStarRating = (rating = 0, label: string) => {
    if (!rating) return null

    return (
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm font-medium">{label}:</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"
              }`}
            />
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
  const primaryColor = tagColor // Use the same color for buttons

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] flex flex-col backdrop-blur-md border-0 rounded-xl pr-12">
        <DialogHeader className="flex flex-row items-center justify-between sticky top-0 bg-background z-10 pb-4">
          <div className="flex items-center gap-4">
            {hasCustomIcons ? (
              <div className="flex items-center gap-2">
                {customIcons.map((icon, index) => {
                  // Find the tag that corresponds to this icon
                  const tagForIcon = integration.tags.find((tag) => iconMapping[tag]?.emoji === icon.emoji) || ""

                  return (
                    <div
                      key={index}
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
                      style={getBackgroundStyle(icon)}
                      title={tagForIcon} // Add tooltip showing the tag name
                    >
                      <span className="emoji">{icon.emoji}</span>
                    </div>
                  )
                })}
              </div>
            ) : null}
            <DialogTitle className="text-2xl">{integration.name}</DialogTitle>
          </div>
          <div className="mr-8">
            <Button
              variant="outline"
              size="sm"
              className="h-8 hover:text-white rounded-full px-4"
              style={{
                "&:hover": { backgroundColor: primaryColor },
              }}
              onClick={handleCopyLink}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Копирано!
                </>
              ) : (
                <>
                  <span className="emoji mr-2">🔗</span>
                  Копирай връзка
                </>
              )}
            </Button>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto custom-scrollbar flex-1 pr-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {integration.tags.map((tag, index) => {
              return (
                <span
                  key={index}
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: tagColor,
                    color: "white",
                    opacity: 0.9,
                  }}
                >
                  {tag}
                </span>
              )
            })}
          </div>

          {/* Display difficulty and usefulness ratings for theorems */}
          {isTheorem && (
            <div className="mb-4 border-b pb-3 dark:border-gray-700">
              {renderStarRating(integration.difficulty, "Трудност")}
              {renderStarRating(integration.usefulness, "Полза")}
            </div>
          )}

          <div ref={contentRef} className="text-gray-700 dark:text-[#d0d0d0]">
            <MathJax>{parseTheoremLinks(integration.description)}</MathJax>
          </div>

          {showSolution && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-[#333333] rounded-xl border-0">
              <h3 className="font-semibold mb-2 dark:text-white">{isTheorem ? "Доказателство:" : "Решение:"}</h3>
              <div ref={solutionRef} className="text-gray-700 dark:text-[#d0d0d0]">
                <MathJax>
                  {parseTheoremLinks(isTheorem ? integration.proof || "Няма доказателство." : integration.solution)}
                </MathJax>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3 sticky bottom-0 bg-background pt-4 border-t dark:border-[#505050]">
          {!isBookmarked ? (
            <Button
              variant="outline"
              onClick={() => onBookmark(integration.id)}
              className="hover:text-white rounded-full px-4"
              style={{
                "&:hover": { backgroundColor: primaryColor },
              }}
            >
              <span className="emoji mr-2">📝</span>
              Запази
            </Button>
          ) : (
            <Button variant="outline" disabled className="rounded-full px-4">
              <span className="emoji mr-2">📝</span>
              Запазено
            </Button>
          )}

          {/* Show archive button only for problems */}
          {!isTheorem && !isArchived ? (
            <Button
              variant="outline"
              onClick={() => onArchive(integration.id)}
              className="hover:text-white rounded-full px-4"
              style={{
                "&:hover": { backgroundColor: primaryColor },
              }}
            >
              <span className="emoji mr-2">📦</span>
              Отбележи като решена
            </Button>
          ) : !isTheorem && isArchived ? (
            <Button variant="outline" disabled className="rounded-full px-4">
              <span className="emoji mr-2">✨</span>
              Успешно отбелязана!
            </Button>
          ) : null}

          {/* Solution/Proof button for both problems and theorems */}
          <Button
            onClick={onToggleSolution}
            className="text-white rounded-full px-4"
            style={{ backgroundColor: primaryColor, "&:hover": { backgroundColor: `${primaryColor}e6` } }}
          >
            {showSolution ? (
              <>
                <span className="emoji mr-2">😳</span>
                {isTheorem ? "Скрий доказателството" : "Скрий решението"}
              </>
            ) : (
              <>
                <span className="emoji mr-2">🫣</span>
                {isTheorem ? "Виж доказателството" : "Виж решението"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
