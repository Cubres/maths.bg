"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, X } from "lucide-react"
import { classes, competitions } from "../../data/integrations"
import type { Collection } from "../../data/collections"
import { useTheme } from "next-themes"
import MathsLogo from "@/app/components/MathsLogo"
import { Slider } from "@/components/ui/slider"
import { CustomSwitch } from "@/app/components/ui/custom-switch"

// Bulgarian classes mapping
const bulgarianClasses: { [key: string]: string } = {
  "9": "9-ти клас",
  "10": "10-ти клас",
  "11": "11-ти клас",
  "12": "12-ти клас",
}

// Bulgarian competitions mapping
const bulgarianCompetitions: { [key: string]: string } = {
  "Есенен математически турнир": "Есенен математически турнир",
  "Пролетен математически турнир": "Пролетен математически турнир",
  "Национална олимпиада по математика": "Национална олимпиада по математика",
  "Международна олимпиада по математика": "Международна олимпиада по математика",
  "Зимно математическо състезание": "Зимно математическо състезание",
}

type CategoryFilterProps = {
  categories: string[]
  selectedCategory: string
  collections: Collection[]
  onSelectCategory: (category: string) => void
  onSelectCollection: (collectionId: string) => void
  onDeleteCollection: (collectionId: string) => void
  selectedClass: string | null
  selectedCompetition: string | null
  onSelectClass: (classValue: string | null) => void
  onSelectCompetition: (competition: string | null) => void
  contentType: "problems" | "theorems"
  onToggleContentType: () => void
  // New props for theorem filters
  difficultyFilter: number
  usefulnessFilter: number
  isDifficultyAtLeast: boolean
  isUsefulnessAtLeast: boolean
  onDifficultyFilterChange: (value: number) => void
  onUsefulnessFilterChange: (value: number) => void
  onDifficultyDirectionToggle: () => void
  onUsefulnessDirectionToggle: () => void
  // New props for resetting filters
  onResetFilters: () => void
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  collections,
  onSelectCategory,
  onSelectCollection,
  onDeleteCollection,
  selectedClass,
  selectedCompetition,
  onSelectClass,
  onSelectCompetition,
  contentType,
  onToggleContentType,
  difficultyFilter,
  usefulnessFilter,
  isDifficultyAtLeast,
  isUsefulnessAtLeast,
  onDifficultyFilterChange,
  onUsefulnessFilterChange,
  onDifficultyDirectionToggle,
  onUsefulnessDirectionToggle,
  onResetFilters,
}: CategoryFilterProps) {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-64 bg-white dark:bg-[#262626] h-screen"></div>
  }

  const isCollectionView = selectedCategory.startsWith("collection:")
  const primaryColor = contentType === "problems" ? "#2F7AE5" : "#4CAF50"

  // Check if any theorem filters are active
  const areTheoremFiltersActive =
    difficultyFilter > 1 ||
    usefulnessFilter > 1 ||
    !isDifficultyAtLeast ||
    !isUsefulnessAtLeast ||
    (selectedCategory !== "Всички" &&
      selectedCategory !== "Bookmarked" &&
      selectedCategory !== "Archived" &&
      !selectedCategory.startsWith("collection:"))

  // Check if any problem filters are active
  const areProblemFiltersActive =
    selectedClass !== null ||
    selectedCompetition !== null ||
    (selectedCategory !== "Всички" &&
      selectedCategory !== "Bookmarked" &&
      selectedCategory !== "Archived" &&
      !selectedCategory.startsWith("collection:"))

  // Function to render stars for the filter display with proper outline and dynamic updates
  const renderStars = (count: number, isForDifficulty: boolean) => {
    const handleStarClick = (starValue: number) => {
      if (isForDifficulty) {
        onDifficultyFilterChange(starValue)
      } else {
        onUsefulnessFilterChange(starValue)
      }
    }

    return (
      <div className="flex justify-between w-full h-8 items-center px-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleStarClick(star)}
            className="star-button flex items-center justify-center"
            aria-label={`Set ${isForDifficulty ? "difficulty" : "usefulness"} to ${star}`}
          >
            <span
              className="text-xs emoji star-emoji"
              style={{
                opacity: star <= count ? 1 : 0.3,
                cursor: "pointer",
              }}
            >
              ⭐
            </span>
          </button>
        ))}
      </div>
    )
  }

  // Special theorem type tags
  const theoremTypeTags = ["теорема", "метод"]

  return (
    <div className="sidebar w-64 bg-white dark:bg-[#262626] h-screen overflow-y-auto border-r border-gray-200 dark:border-[#404040] flex-shrink-0">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Категории</h2>

        {/* Content Type Toggle Button - iPhone Style */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm font-medium dark:text-white">
            {contentType === "problems" ? "Задачи" : "Теореми & методи"}
          </span>

          <button
            onClick={onToggleContentType}
            className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              backgroundColor: primaryColor,
              boxShadow: `0 0 0 2px rgba(${contentType === "problems" ? "47, 122, 229" : "76, 175, 80"}, 0.2)`,
            }}
            aria-pressed={contentType === "theorems"}
            aria-labelledby="toggle-label"
          >
            <span className="sr-only">Toggle content type</span>
            <span
              aria-hidden="true"
              className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              style={{
                transform: contentType === "problems" ? "translateX(0rem)" : "translateX(1.25rem)",
              }}
            >
              <div className="flex h-full w-full items-center justify-center">
                <MathsLogo inverted={contentType === "theorems"} size={16} />
              </div>
            </span>
          </button>
        </div>

        {/* Theorem Filters - Only show in theorems mode */}
        {contentType === "theorems" && (
          <div className="mb-6 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold dark:text-white">Трудност</h3>
                <div className="flex items-center space-x-1">
                  <span className="text-xs dark:text-white font-bold">
                    {isDifficultyAtLeast ? "Поне" : "Най-много"}
                  </span>
                  <CustomSwitch
                    checked={isDifficultyAtLeast}
                    onCheckedChange={onDifficultyDirectionToggle}
                    size="sm"
                    className="data-[state=checked]:bg-[#4CAF50]"
                  />
                </div>
              </div>
              <div className="px-1">
                <Slider
                  value={[difficultyFilter]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={(value) => onDifficultyFilterChange(value[0])}
                  className="mb-2"
                  thumbClassName="bg-[#4CAF50]"
                  trackClassName="bg-[#4CAF50]"
                />
                {renderStars(difficultyFilter, true)}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold dark:text-white">Полезност</h3>
                <div className="flex items-center space-x-1">
                  <span className="text-xs dark:text-white font-bold">
                    {isUsefulnessAtLeast ? "Поне" : "Най-много"}
                  </span>
                  <CustomSwitch
                    checked={isUsefulnessAtLeast}
                    onCheckedChange={onUsefulnessDirectionToggle}
                    size="sm"
                    className="data-[state=checked]:bg-[#4CAF50]"
                  />
                </div>
              </div>
              <div className="px-1">
                <Slider
                  value={[usefulnessFilter]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={(value) => onUsefulnessFilterChange(value[0])}
                  className="mb-2"
                  thumbClassName="bg-[#4CAF50]"
                  trackClassName="bg-[#4CAF50]"
                />
                {renderStars(usefulnessFilter, false)}
              </div>
            </div>

            {/* Reset Filters Button for Theorem Mode */}
            {areTheoremFiltersActive && (
              <button
                onClick={onResetFilters}
                className="flex items-center justify-center w-full py-1.5 rounded-lg text-sm transition-colors hover:bg-gray-100 dark:hover:bg-[#333333] mb-2"
                style={{ color: "#4CAF50" }}
              >
                <X className="h-3.5 w-3.5 mr-1" />
                <span className="font-medium">Премахни филтри</span>
              </button>
            )}
          </div>
        )}

        {/* Class Filter - Only show in problems mode */}
        {contentType === "problems" && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2 dark:text-white flex items-center h-7">
              <span>Клас</span>
              <span className="ml-1 emoji" style={{ display: "inline-block" }}>
                🏫
              </span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {classes.map((classValue) => (
                <button
                  key={classValue}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    selectedClass === classValue
                      ? "text-white font-medium"
                      : "hover:bg-gray-100 dark:hover:bg-[#333333] dark:text-[#d0d0d0] border border-gray-200 dark:border-[#404040]"
                  }`}
                  style={{
                    backgroundColor: selectedClass === classValue ? primaryColor : "transparent",
                  }}
                  onClick={() => onSelectClass(selectedClass === classValue ? null : classValue)}
                >
                  {bulgarianClasses[classValue]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Competition Filter - Only show in problems mode */}
        {contentType === "problems" && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2 dark:text-white flex items-center h-7">
              <span>Състезания</span>
              <span className="ml-1 emoji" style={{ display: "inline-block" }}>
                🏆
              </span>
            </h3>
            <div className="space-y-1">
              {competitions.map((competition, index) => (
                <button
                  key={competition}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    selectedCompetition === competition
                      ? "text-white font-medium"
                      : "hover:bg-gray-100 dark:hover:bg-[#333333] dark:text-[#d0d0d0] hover:border-gray-300 dark:hover:border-gray-500 border border-transparent"
                  }`}
                  style={{
                    backgroundColor: selectedCompetition === competition ? primaryColor : "transparent",
                  }}
                  onClick={() => onSelectCompetition(selectedCompetition === competition ? null : competition)}
                >
                  {bulgarianCompetitions[competition]}
                </button>
              ))}
            </div>

            {/* Reset Filters Button for Problem Mode */}
            {areProblemFiltersActive && (
              <button
                onClick={onResetFilters}
                className="flex items-center justify-center w-full py-1.5 rounded-lg text-sm transition-colors hover:bg-gray-100 dark:hover:bg-[#333333] mt-2"
                style={{ color: "#2F7AE5" }}
              >
                <X className="h-3.5 w-3.5 mr-1" />
                <span className="font-medium">Премахни филтри</span>
              </button>
            )}
          </div>
        )}

        {/* Theorem Type Tags - Only show in theorems mode */}
        {contentType === "theorems" && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2 dark:text-white">Тип</h3>
            <div className="grid grid-cols-2 gap-2">
              {theoremTypeTags.map((tag) => (
                <button
                  key={tag}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    selectedCategory === tag
                      ? "text-white font-medium"
                      : "hover:bg-gray-100 dark:hover:bg-[#333333] dark:text-[#d0d0d0] border border-gray-200 dark:border-[#404040]"
                  }`}
                  style={{
                    backgroundColor: selectedCategory === tag ? primaryColor : "transparent",
                  }}
                  onClick={() => onSelectCategory(selectedCategory === tag ? "Всички" : tag)}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Categories/Tags */}
        <div>
          <h3 className="text-sm font-semibold mb-2 dark:text-white flex items-center h-7">
            <span>{contentType === "problems" ? "Тагове" : "Тагове"}</span>
            <span className="ml-1 emoji" style={{ display: "inline-block" }}>
              🔖
            </span>
          </h3>
          <div className="space-y-1">
            {categories
              .filter((category) => category !== "Archived" && category !== "Bookmarked")
              .map((category) => (
                <button
                  key={category}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    selectedCategory === category
                      ? "text-white font-medium"
                      : "hover:bg-gray-100 dark:hover:bg-[#333333] dark:text-[#d0d0d0] hover:border-gray-300 dark:hover:border-gray-500 border border-transparent"
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category ? primaryColor : "transparent",
                  }}
                  onClick={() => onSelectCategory(category)}
                >
                  {category}
                </button>
              ))}
          </div>
        </div>

        {/* Special Categories */}
        <div className="mt-4 space-y-1">
          {categories
            .filter((category) => category === "Bookmarked" || category === "Archived")
            .map((category) => (
              <button
                key={category}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  selectedCategory === category
                    ? "text-white font-medium"
                    : "hover:bg-gray-100 dark:hover:bg-[#333333] dark:text-[#d0d0d0] hover:border-gray-300 dark:hover:border-gray-500 border border-transparent"
                }`}
                style={{
                  backgroundColor: selectedCategory === category ? primaryColor : "transparent",
                }}
                onClick={() => onSelectCategory(category)}
              >
                {category === "Bookmarked" ? "Запазени" : "Решени"}
              </button>
            ))}
        </div>

        {/* Collections */}
        {collections.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-2 dark:text-white">Колекции</h3>
            <div className="space-y-1">
              {collections.map((collection) => (
                <div key={collection.id} className="flex items-center group">
                  <button
                    className={`flex-1 text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      selectedCategory === `collection:${collection.id}`
                        ? "text-white font-medium"
                        : "hover:bg-gray-100 dark:hover:bg-[#333333] dark:text-[#d0d0d0] hover:border-gray-300 dark:hover:border-gray-500 border border-transparent"
                    }`}
                    style={{
                      backgroundColor:
                        selectedCategory === `collection:${collection.id}` ? primaryColor : "transparent",
                    }}
                    onClick={() => onSelectCollection(collection.id)}
                  >
                    {collection.name}
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onDeleteCollection(collection.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                    <span className="sr-only">Изтрий колекция</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
