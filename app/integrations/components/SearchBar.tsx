"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { categories } from "@/app/data/integrations"

type SearchBarProps = {
  onSearch: (query: string) => void
  onTagSelect?: (tag: string) => void
  onCompetitionSelect?: (competition: string) => void
  contentType: "problems" | "theorems"
  competitions: string[]
}

export default function SearchBar({
  onSearch,
  onTagSelect,
  onCompetitionSelect,
  contentType,
  competitions,
}: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<{ type: "tag" | "competition"; value: string }[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter suggestions based on query
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    const matchingTags = categories
      .filter(
        (category) =>
          category !== "All" &&
          category !== "Всички" &&
          category !== "Archived" &&
          category !== "Bookmarked" &&
          category.toLowerCase().includes(query.toLowerCase()),
      )
      .map((tag) => ({ type: "tag" as const, value: tag }))

    const matchingCompetitions =
      contentType === "problems"
        ? competitions
            .filter((comp) => comp.toLowerCase().includes(query.toLowerCase()))
            .map((comp) => ({ type: "competition" as const, value: comp }))
        : []

    setSuggestions([...matchingTags, ...matchingCompetitions])
  }, [query, contentType, competitions])

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
    setShowSuggestions(true)
  }

  const handleSuggestionClick = (suggestion: { type: "tag" | "competition"; value: string }) => {
    if (suggestion.type === "tag" && onTagSelect) {
      onTagSelect(suggestion.value)
    } else if (suggestion.type === "competition" && onCompetitionSelect) {
      onCompetitionSelect(suggestion.value)
    }
    setQuery("")
    setShowSuggestions(false)
  }

  return (
    <div className="relative mb-4 pr-4">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Търси задачи, тагове, състезания, теореми..."
        className="w-full h-10 pl-10 pr-4 dark:bg-[#404040] dark:text-[#d0d0d0] dark:border-[#505050] rounded-full border-0 shadow-sm"
        value={query}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
      />
      <span className="emoji absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
        🔎
      </span>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white dark:bg-[#303030] rounded-md shadow-lg max-h-60 overflow-auto"
        >
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#404040] cursor-pointer flex items-center"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <span className="mr-2" style={{ textShadow: "0px 0px 1px black" }}>
                  {suggestion.type === "tag" ? "🔖" : "🏆"}
                </span>
                <span>
                  {suggestion.value}
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {suggestion.type === "tag" ? "Таг" : "Състезание"}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
