"use client"

import { useState, useMemo, useEffect, useRef, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { categories, integrations, generateVaryingIntegrations } from "../data/integrations"
import { convertExtendedTheoremsToIntegrations } from "../utils/theoremExtensions"
import { type Collection, generateUniqueCollectionId } from "../data/collections"
import CategoryFilter from "./components/CategoryFilter"
import SearchBar from "./components/SearchBar"
import IntegrationGrid from "./components/IntegrationGrid"
import IntegrationDetailModal from "./components/IntegrationDetailModal"
import ThemeToggle from "./components/ThemeToggle"
import RandomProblemButton from "../components/RandomProblemButton"
import LoadingScreen from "../components/LoadingScreen"
import AnnouncementBanner from "../components/AnnouncementBanner"
import CollectionDialog from "./components/CollectionDialog"
import type { Integration } from "../data/integrations"
import { X } from "lucide-react"
import { useTheme } from "next-themes"
import SiteHeader from "@/app/components/SiteHeader"
import { toast } from "@/components/ui/use-toast"

const INITIAL_ROWS = 7
const ROWS_PER_LOAD = 7
const ARCHIVED_STORAGE_KEY = "archived-integrations"
const BOOKMARKED_STORAGE_KEY = "bookmarked-integrations"
const COLLECTIONS_STORAGE_KEY = "user-collections"
const ANNOUNCEMENT_CLOSED_KEY = "announcement-closed"
const CONTENT_TYPE_KEY = "content-type"

// Add Bookmarked to categories
const allCategories = [...categories.filter((c) => c !== "Archived"), "Bookmarked", "Archived"]

// Fisher-Yates shuffle algorithm for random ordering
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Generate integrations with varying description lengths
const varyingIntegrations = generateVaryingIntegrations(100)

// Convert theorems to integration format
const theoremIntegrations = convertExtendedTheoremsToIntegrations()

// Dummy competitions data
const competitions = [
  "Есенен математически турнир",
  "Пролетен математически турнир",
  "Национална олимпиада по математика",
  "Международна олимпиада по математика",
  "Зимно математическо състезание",
]

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
  "Зимно математическо състезание": "Зимно математическо състезание",
}

export default function IntegrationsPage() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState("Всички")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [archivedIds, setArchivedIds] = useState<string[]>([])
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([])
  const [collections, setCollections] = useState<Collection[]>([])
  const [showSolution, setShowSolution] = useState(false)
  const [visibleRows, setVisibleRows] = useState(INITIAL_ROWS)
  const [contentType, setContentType] = useState<"problems" | "theorems">("problems")
  const [shuffledIntegrations] = useState(() => shuffleArray([...integrations, ...varyingIntegrations]))
  const [shuffledTheorems] = useState(() => shuffleArray([...theoremIntegrations]))
  const [showCollectionDialog, setShowCollectionDialog] = useState(false)
  const [integrationToBookmark, setIntegrationToBookmark] = useState<string | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const collectionParam = searchParams?.get("collection")
  const [collectionDescription, setCollectionDescription] = useState<string | null>(null)
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null)
  const { theme } = useTheme()
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [showAnnouncement, setShowAnnouncement] = useState(true)

  // New state variables for theorem filters
  const [difficultyFilter, setDifficultyFilter] = useState(1)
  const [usefulnessFilter, setUsefulnessFilter] = useState(1)
  const [isDifficultyAtLeast, setIsDifficultyAtLeast] = useState(true)
  const [isUsefulnessAtLeast, setIsUsefulnessAtLeast] = useState(true)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // Calculate how many items to show based on visible rows
  // Using 3 items per row now that they're wider
  const itemsPerRow = 3

  // Handle collection from URL parameter on initial load
  useEffect(() => {
    if (collectionParam) {
      // Find the collection by ID
      const collection = collections.find((c) => c.id === collectionParam)
      if (collection) {
        setSelectedCategory(`collection:${collectionParam}`)
        setCollectionDescription(collection.description)
      }
    }
  }, [collectionParam, collections])

  // Get the appropriate data based on content type
  const allIntegrationsData = useMemo(() => {
    if (contentType === "problems") {
      return [...integrations, ...varyingIntegrations]
    } else {
      return [...theoremIntegrations]
    }
  }, [contentType])

  // For collections, we want to show both problems and theorems
  const isCollectionView = selectedCategory.startsWith("collection:")

  const filteredIntegrations = useMemo(() => {
    let filtered = allIntegrationsData

    // For collections, include both problems and theorems
    if (isCollectionView) {
      const collectionId = selectedCategory.replace("collection:", "")
      const collection = collections.find((c) => c.id === collectionId)

      if (collection) {
        // For collections, include both problems and theorems
        const allItems = [...integrations, ...varyingIntegrations, ...theoremIntegrations]
        return allItems.filter(
          (integration) =>
            collection.integrationIds.includes(integration.id) &&
            integration.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }
      return []
    }

    // Apply class filter (only for problems)
    if (contentType === "problems" && selectedClass) {
      filtered = filtered.filter((integration) => integration.class === selectedClass)
    }

    // Apply competition filter (only for problems)
    if (contentType === "problems" && selectedCompetition) {
      filtered = filtered.filter((integration) => integration.competition === selectedCompetition)
    }

    // Handle archived category
    if (selectedCategory === "Archived") {
      return filtered.filter(
        (integration) =>
          archivedIds.includes(integration.id) &&
          integration.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          // Apply theorem filters if in theorem mode and the integration is a theorem
          (!integration.id.startsWith("t") ||
            // Apply difficulty filter
            ((isDifficultyAtLeast
              ? (integration.difficulty || 0) >= difficultyFilter
              : (integration.difficulty || 0) <= difficultyFilter) &&
              // Apply usefulness filter
              (isUsefulnessAtLeast
                ? (integration.usefulness || 0) >= usefulnessFilter
                : (integration.usefulness || 0) <= usefulnessFilter))),
      )
    }

    // Handle bookmarked category
    if (selectedCategory === "Bookmarked") {
      return filtered.filter(
        (integration) =>
          bookmarkedIds.includes(integration.id) &&
          integration.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          // Apply theorem filters if in theorem mode and the integration is a theorem
          (!integration.id.startsWith("t") ||
            // Apply difficulty filter
            ((isDifficultyAtLeast
              ? (integration.difficulty || 0) >= difficultyFilter
              : (integration.difficulty || 0) <= difficultyFilter) &&
              // Apply usefulness filter
              (isUsefulnessAtLeast
                ? (integration.usefulness || 0) >= usefulnessFilter
                : (integration.usefulness || 0) <= usefulnessFilter))),
      )
    }

    // For other categories, filter by category and search query
    return (contentType === "problems" ? shuffledIntegrations : shuffledTheorems).filter((integration) => {
      // Don't show archived items in other categories, including "All"
      if (archivedIds.includes(integration.id)) {
        return false
      }

      // Apply category tag filter
      let categoryMatch = false
      if (selectedCategory === "Всички") {
        categoryMatch = true
      } else {
        categoryMatch = integration.tags && integration.tags.includes(selectedCategory)
      }

      // Apply class filter (only for problems)
      if (contentType === "problems" && selectedClass && integration.class !== selectedClass) {
        return false
      }

      // Apply competition filter (only for problems)
      if (contentType === "problems" && selectedCompetition && integration.competition !== selectedCompetition) {
        return false
      }

      // Apply theorem filters (only for theorems)
      if (contentType === "theorems" && integration.id.startsWith("t")) {
        // Apply difficulty filter
        if (isDifficultyAtLeast) {
          if ((integration.difficulty || 0) < difficultyFilter) {
            return false
          }
        } else {
          if ((integration.difficulty || 0) > difficultyFilter) {
            return false
          }
        }

        // Apply usefulness filter
        if (isUsefulnessAtLeast) {
          if ((integration.usefulness || 0) < usefulnessFilter) {
            return false
          }
        } else {
          if ((integration.usefulness || 0) > usefulnessFilter) {
            return false
          }
        }
      }

      const searchMatch =
        integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchQuery.toLowerCase())
      return categoryMatch && searchMatch
    })
  }, [
    selectedCategory,
    searchQuery,
    archivedIds,
    bookmarkedIds,
    collections,
    shuffledIntegrations,
    shuffledTheorems,
    allIntegrationsData,
    selectedClass,
    selectedCompetition,
    contentType,
    isCollectionView,
    difficultyFilter,
    usefulnessFilter,
    isDifficultyAtLeast,
    isUsefulnessAtLeast,
  ])

  // Add handler functions for the new filters
  const handleDifficultyFilterChange = (value: number) => {
    setDifficultyFilter(value)
    setVisibleRows(INITIAL_ROWS) // Reset visible rows when changing filter
  }

  const handleUsefulnessFilterChange = (value: number) => {
    setUsefulnessFilter(value)
    setVisibleRows(INITIAL_ROWS) // Reset visible rows when changing filter
  }

  const handleDifficultyDirectionToggle = () => {
    setIsDifficultyAtLeast((prev) => !prev)
    setVisibleRows(INITIAL_ROWS) // Reset visible rows when changing filter
  }

  const handleUsefulnessDirectionToggle = () => {
    setIsUsefulnessAtLeast((prev) => !prev)
    setVisibleRows(INITIAL_ROWS) // Reset visible rows when changing filter
  }

  // Reset all filters function
  const handleResetFilters = () => {
    // Reset category filter (unless it's a special category)
    if (
      selectedCategory !== "Bookmarked" &&
      selectedCategory !== "Archived" &&
      !selectedCategory.startsWith("collection:")
    ) {
      setSelectedCategory("Всички")
    }

    // Reset problem-specific filters
    if (contentType === "problems") {
      setSelectedClass(null)
      setSelectedCompetition(null)
    }

    // Reset theorem-specific filters
    if (contentType === "theorems") {
      setDifficultyFilter(1)
      setUsefulnessFilter(1)
      setIsDifficultyAtLeast(true)
      setIsUsefulnessAtLeast(true)
    }

    // Reset visible rows
    setVisibleRows(INITIAL_ROWS)
  }

  // Reset filters when switching content type
  const handleToggleContentType = () => {
    setContentType((prev) => (prev === "problems" ? "theorems" : "problems"))
    // Reset filters that don't apply to theorems
    if (contentType === "problems") {
      setSelectedClass(null)
      setSelectedCompetition(null)
    } else {
      // Reset theorem filters when switching to problems
      setDifficultyFilter(1)
      setUsefulnessFilter(1)
      setIsDifficultyAtLeast(true)
      setIsUsefulnessAtLeast(true)
    }
    // Reset visible rows
    setVisibleRows(INITIAL_ROWS)
    // Save preference
    localStorage.setItem(CONTENT_TYPE_KEY, contentType === "problems" ? "theorems" : "problems")
  }

  const visibleIntegrations = useMemo(() => {
    return filteredIntegrations.slice(0, visibleRows * itemsPerRow)
  }, [filteredIntegrations, visibleRows])

  const hasMore = useMemo(() => {
    return visibleIntegrations.length < filteredIntegrations.length
  }, [visibleIntegrations, filteredIntegrations])

  const handleLoadMore = useCallback(() => {
    setVisibleRows((prevRows) => prevRows + ROWS_PER_LOAD)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          handleLoadMore()
        }
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: "0px", // No margin
        threshold: 0.1, // Trigger when 10% of the target is visible
      },
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [handleLoadMore, hasMore])

  useEffect(() => {
    // Load archived IDs from local storage
    const storedArchivedIds = localStorage.getItem(ARCHIVED_STORAGE_KEY)
    if (storedArchivedIds) {
      try {
        setArchivedIds(JSON.parse(storedArchivedIds))
      } catch (e) {
        console.error("Failed to parse archived IDs from localStorage:", e)
        localStorage.removeItem(ARCHIVED_STORAGE_KEY)
      }
    }

    // Load bookmarked IDs from local storage
    const storedBookmarkedIds = localStorage.getItem(BOOKMARKED_STORAGE_KEY)
    if (storedBookmarkedIds) {
      try {
        setBookmarkedIds(JSON.parse(storedBookmarkedIds))
      } catch (e) {
        console.error("Failed to parse bookmarked IDs from localStorage:", e)
        localStorage.removeItem(BOOKMARKED_STORAGE_KEY)
      }
    }

    // Load collections from local storage
    const storedCollections = localStorage.getItem(COLLECTIONS_STORAGE_KEY)
    if (storedCollections) {
      try {
        setCollections(JSON.parse(storedCollections))
      } catch (e) {
        console.error("Failed to parse collections from localStorage:", e)
        localStorage.removeItem(COLLECTIONS_STORAGE_KEY)
      }
    }

    // Load content type from local storage
    const storedContentType = localStorage.getItem(CONTENT_TYPE_KEY)
    if (storedContentType) {
      setContentType(storedContentType === "theorems" ? "theorems" : "problems")
    }

    // Load announcement state from local storage
    const announcementClosed = localStorage.getItem(ANNOUNCEMENT_CLOSED_KEY)
    if (announcementClosed === "true") {
      setShowAnnouncement(false)
    }

    // Add event listener for opening theorems from links in other theorems
    const handleOpenTheorem = (event: CustomEvent) => {
      const { theoremId } = event.detail
      const theorem = allIntegrationsData.find((t) => t.id === theoremId)
      if (theorem) {
        setSelectedIntegration(theorem)
        setIsDetailModalOpen(true)
      }
    }

    window.addEventListener("openTheorem", handleOpenTheorem as EventListener)

    return () => {
      window.removeEventListener("openTheorem", handleOpenTheorem as EventListener)
    }
  }, [allIntegrationsData])

  useEffect(() => {
    // Update archived IDs in local storage when it changes
    localStorage.setItem(ARCHIVED_STORAGE_KEY, JSON.stringify(archivedIds))
  }, [archivedIds])

  useEffect(() => {
    // Update bookmarked IDs in local storage when it changes
    localStorage.setItem(BOOKMARKED_STORAGE_KEY, JSON.stringify(bookmarkedIds))
  }, [bookmarkedIds])

  useEffect(() => {
    // Update collections in local storage when it changes
    localStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify(collections))
  }, [collections])

  const handleArchiveIntegration = (integrationId: string) => {
    setArchivedIds((prevArchivedIds) => {
      const updatedArchivedIds = prevArchivedIds.includes(integrationId)
        ? prevArchivedIds.filter((id) => id !== integrationId)
        : [...prevArchivedIds, integrationId]

      // Show toast notification
      if (!prevArchivedIds.includes(integrationId)) {
        toast({
          title: "Задачата е архивирана",
          description: "Можете да я намерите в категория 'Архивирани'",
        })
      }

      return updatedArchivedIds
    })
  }

  const handleUnarchiveIntegration = (integrationId: string) => {
    setArchivedIds((prevArchivedIds) => {
      const newArchivedIds = prevArchivedIds.filter((id) => id !== integrationId)

      // Show toast notification
      if (prevArchivedIds.includes(integrationId)) {
        toast({
          title: "Задачата е възстановена",
          description: "Задачата е премахната от архива",
        })
      }

      return newArchivedIds
    })
  }

  const handleBookmarkIntegration = (integrationId: string) => {
    setIntegrationToBookmark(integrationId)
    setShowCollectionDialog(true)
  }

  const handleAddToCollection = (collectionId: string) => {
    if (!integrationToBookmark) return

    // Add to bookmarked list if not already there
    if (!bookmarkedIds.includes(integrationToBookmark)) {
      setBookmarkedIds((prev) => [...prev, integrationToBookmark])
    }

    // Add to the selected collection
    setCollections((prev) => {
      const updatedCollections = prev.map((collection) => {
        if (collection.id === collectionId) {
          // Check if the integration is already in the collection
          if (!collection.integrationIds.includes(integrationToBookmark)) {
            // Find the integration to get its name
            const allIntegrations = [...integrations, ...varyingIntegrations, ...theoremIntegrations]
            const integration = allIntegrations.find((i) => i.id === integrationToBookmark)

            // Show toast notification
            toast({
              title: "Добавено към колекция",
              description: `${integration?.name || "Задачата"} е добавена към колекция "${collection.name}"`,
            })

            return {
              ...collection,
              integrationIds: [...collection.integrationIds, integrationToBookmark],
            }
          }
        }
        return collection
      })

      return updatedCollections
    })

    setIntegrationToBookmark(null)
  }

  const handleCreateCollection = (name: string, description: string) => {
    if (!integrationToBookmark) return

    // Add to bookmarked list if not already there
    if (!bookmarkedIds.includes(integrationToBookmark)) {
      setBookmarkedIds((prev) => [...prev, integrationToBookmark])
    }

    // Find the integration to get its name
    const allIntegrations = [...integrations, ...varyingIntegrations, ...theoremIntegrations]
    const integration = allIntegrations.find((i) => i.id === integrationToBookmark)

    // Create a new collection with the integration
    const newCollection: Collection = {
      id: generateUniqueCollectionId(collections),
      name,
      description,
      integrationIds: [integrationToBookmark],
      createdAt: Date.now(),
    }

    setCollections((prev) => [...prev, newCollection])

    // Show toast notification
    toast({
      title: "Колекцията е създадена",
      description: `${integration?.name || "Задачата"} е добавена към новата колекция "${name}"`,
    })

    setIntegrationToBookmark(null)
  }

  const handleDeleteCollection = (collectionId: string) => {
    // Find collection name before deletion
    const collectionToDelete = collections.find((c) => c.id === collectionId)

    setCollections((prev) => prev.filter((collection) => collection.id !== collectionId))

    // If we're currently viewing this collection, switch to All
    if (selectedCategory === `collection:${collectionId}`) {
      setSelectedCategory("Всички")
      setCollectionDescription(null)
    }

    // Show toast notification
    if (collectionToDelete) {
      toast({
        title: "Колекцията е изтрита",
        description: `Колекция "${collectionToDelete.name}" беше изтрита успешно`,
      })
    }
  }

  const handleTagClick = (tag: string) => {
    // Handle competition tag (only for problems)
    if (contentType === "problems" && competitions.includes(tag)) {
      setSelectedCompetition(tag)
      return
    }

    // Handle class tag (only for problems)
    if (contentType === "problems" && tag.startsWith("Class ")) {
      const classValue = tag.replace("Class ", "")
      setSelectedClass(classValue)
      return
    }

    // Handle category tag - check if it's in the categories list
    if (categories.includes(tag)) {
      setSelectedCategory(tag)
      return
    }
  }

  const handleCloseAnnouncement = () => {
    setShowAnnouncement(false)
    localStorage.setItem(ANNOUNCEMENT_CLOSED_KEY, "true")
  }

  const collectionName = isCollectionView
    ? collections.find((c) => c.id === selectedCategory.replace("collection:", ""))?.name
    : ""

  // Get primary color based on content type
  const primaryColor = contentType === "problems" ? "#2F7AE5" : "#4CAF50"
  const primaryColorLight = contentType === "problems" ? "rgba(47, 122, 229, 0.5)" : "rgba(76, 175, 80, 0.5)"

  return (
    <>
      {showLoadingScreen && (
        <LoadingScreen totalProblems={integrations.length} onComplete={() => setShowLoadingScreen(false)} />
      )}

      <div
        className={`flex h-screen bg-gray-100 dark:bg-[#171717] overflow-hidden ${contentType === "theorems" ? "theorems-mode" : ""}`}
      >
        <CategoryFilter
          categories={allCategories}
          selectedCategory={selectedCategory}
          collections={collections}
          onSelectCategory={(category) => {
            setSelectedCategory(category)
            setVisibleRows(INITIAL_ROWS) // Reset visible rows when changing category
            setCollectionDescription(null)
          }}
          onSelectCollection={(collectionId) => {
            setSelectedCategory(`collection:${collectionId}`)
            setVisibleRows(INITIAL_ROWS)

            // Update URL when selecting a collection
            window.history.pushState(null, "", `/integrations/collections/${collectionId}`)

            // Set collection description
            const collection = collections.find((c) => c.id === collectionId)
            if (collection) {
              setCollectionDescription(collection.description)
            }
          }}
          onDeleteCollection={handleDeleteCollection}
          selectedClass={selectedClass}
          selectedCompetition={selectedCompetition}
          onSelectClass={(classValue) => {
            setSelectedClass(classValue)
            setVisibleRows(INITIAL_ROWS)
          }}
          onSelectCompetition={(competition) => {
            setSelectedCompetition(competition)
            setVisibleRows(INITIAL_ROWS)
          }}
          contentType={contentType}
          onToggleContentType={handleToggleContentType}
          // New props for theorem filters
          difficultyFilter={difficultyFilter}
          usefulnessFilter={usefulnessFilter}
          isDifficultyAtLeast={isDifficultyAtLeast}
          isUsefulnessAtLeast={isUsefulnessAtLeast}
          onDifficultyFilterChange={handleDifficultyFilterChange}
          onUsefulnessFilterChange={handleUsefulnessFilterChange}
          onDifficultyDirectionToggle={handleDifficultyDirectionToggle}
          onUsefulnessDirectionToggle={handleUsefulnessDirectionToggle}
          // Reset filters function
          onResetFilters={handleResetFilters}
        />
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 md:p-6 space-y-4">
            <div className="flex justify-between items-center">
              <SiteHeader contentType={contentType} />
              <div className="flex items-center">
                <RandomProblemButton
                  filteredIntegrations={filteredIntegrations}
                  onSelectIntegration={setSelectedIntegration}
                />
                <ThemeToggle />
              </div>
            </div>

            {showAnnouncement && (
              <AnnouncementBanner
                message="НОВО: Добавени задачи от Международната олимпиада по математика 2000-2024"
                onClose={handleCloseAnnouncement}
              />
            )}

            {collectionDescription && (
              <p className="text-sm text-gray-600 dark:text-[#a0a0a0] mt-1">{collectionDescription}</p>
            )}
            {(selectedClass || selectedCompetition) && contentType === "problems" && (
              <div className="flex gap-2 mt-2">
                {selectedClass && (
                  <div
                    className="flex items-center text-sm rounded-full px-2 py-0.5"
                    style={{
                      backgroundColor: theme === "dark" ? primaryColor : primaryColorLight,
                      color: theme === "dark" ? "white" : "black",
                    }}
                  >
                    {bulgarianClasses[selectedClass]}
                    <button
                      onClick={() => setSelectedClass(null)}
                      className="ml-1.5 hover:bg-opacity-80 rounded-full p-0.5"
                      style={{ backgroundColor: primaryColor }}
                      aria-label="Премахни филтъра за клас"
                    >
                      <X className="h-3 w-3" style={{ color: theme === "dark" ? "white" : "black" }} />
                    </button>
                  </div>
                )}
                {selectedCompetition && (
                  <div
                    className="flex items-center text-sm rounded-full px-2 py-0.5"
                    style={{
                      backgroundColor: theme === "dark" ? primaryColor : primaryColorLight,
                      color: theme === "dark" ? "white" : "black",
                    }}
                  >
                    {bulgarianCompetitions[selectedCompetition]}
                    <button
                      onClick={() => setSelectedCompetition(null)}
                      className="ml-1.5 hover:bg-opacity-80 rounded-full p-0.5"
                      style={{ backgroundColor: primaryColor }}
                      aria-label="Премахни филтъра за състезание"
                    >
                      <X className="h-3 w-3" style={{ color: theme === "dark" ? "white" : "black" }} />
                    </button>
                  </div>
                )}
              </div>
            )}
            <div className="grid grid-cols-1">
              <SearchBar
                onSearch={(query) => {
                  setSearchQuery(query)
                  setVisibleRows(INITIAL_ROWS) // Reset visible rows when searching
                }}
                onTagSelect={(tag) => {
                  setSelectedCategory(tag)
                  setVisibleRows(INITIAL_ROWS)
                }}
                onCompetitionSelect={(competition) => {
                  setSelectedCompetition(competition)
                  setVisibleRows(INITIAL_ROWS)
                }}
                contentType={contentType}
                competitions={competitions}
              />
            </div>
          </div>
          <div className="flex-1 overflow-auto px-4 md:px-6 pb-8" ref={gridRef}>
            <IntegrationGrid
              integrations={visibleIntegrations}
              onIntegrationClick={setSelectedIntegration}
              onTagClick={handleTagClick}
              isArchived={selectedCategory === "Archived"}
              isBookmarked={selectedCategory === "Bookmarked"}
              isCollection={isCollectionView}
              collectionName={collectionName}
              onUnarchive={handleUnarchiveIntegration}
              contentType={contentType}
            />

            {/* Load more trigger element */}
            {hasMore && (
              <div ref={loadMoreRef} className="w-full h-20 flex items-center justify-center mt-4">
                <div className="animate-pulse text-gray-400 dark:text-gray-500">Зареждане още...</div>
              </div>
            )}

            {!hasMore && visibleIntegrations.length > 0 && (
              <div className="w-full text-center py-8 text-gray-500 dark:text-gray-400">
                {selectedCategory === "Archived"
                  ? "Край на архивираните задачи"
                  : selectedCategory === "Bookmarked"
                    ? "Край на запазените задачи"
                    : isCollectionView
                      ? `Край на задачите в "${collectionName}"`
                      : contentType === "problems"
                        ? "Край на задачите"
                        : "Край на теоремите & методите"}
              </div>
            )}
          </div>
        </main>
        <IntegrationDetailModal
          integration={selectedIntegration}
          isOpen={selectedIntegration !== null || isDetailModalOpen}
          onClose={() => {
            setSelectedIntegration(null)
            setShowSolution(false)
            setIsDetailModalOpen(false)
          }}
          onArchive={handleArchiveIntegration}
          isArchived={
            selectedCategory === "Archived" || (selectedIntegration && archivedIds.includes(selectedIntegration.id))
          }
          isBookmarked={selectedIntegration ? bookmarkedIds.includes(selectedIntegration.id) : false}
          onBookmark={handleBookmarkIntegration}
          showSolution={showSolution}
          onToggleSolution={() => setShowSolution((prev) => !prev)}
          contentType={contentType}
        />
        <CollectionDialog
          isOpen={showCollectionDialog}
          onClose={() => {
            setShowCollectionDialog(false)
            setIntegrationToBookmark(null)
          }}
          collections={collections}
          onAddToCollection={handleAddToCollection}
          onCreateCollection={handleCreateCollection}
          integrationId={integrationToBookmark}
        />
      </div>
    </>
  )
}
