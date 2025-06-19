"use client"

import { useEffect, useRef, useState } from "react"
import type { Integration } from "../../data/integrations"
import IntegrationCard from "./IntegrationCard"
import EmptyState from "./EmptyState"

type IntegrationGridProps = {
  integrations: Integration[]
  onIntegrationClick: (integration: Integration) => void
  onTagClick: (tag: string) => void
  isArchived?: boolean
  isBookmarked?: boolean
  isCollection?: boolean
  collectionName?: string
  onUnarchive?: (integrationId: string) => void
  contentType: "problems" | "theorems"
}

export default function IntegrationGrid({
  integrations,
  onIntegrationClick,
  onTagClick,
  isArchived = false,
  isBookmarked = false,
  isCollection = false,
  collectionName,
  onUnarchive,
  contentType,
}: IntegrationGridProps) {
  const [columns, setColumns] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)

  // Adjust columns based on container width
  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return

      const width = containerRef.current.offsetWidth
      if (width < 640) {
        setColumns(1)
      } else if (width < 1024) {
        setColumns(2)
      } else {
        setColumns(3)
      }
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [])

  if (integrations.length === 0) {
    if (isArchived) {
      return <EmptyState type="archived" />
    } else if (isBookmarked) {
      return <EmptyState type="bookmarked" />
    } else if (isCollection) {
      return <EmptyState type="collection" collectionName={collectionName} />
    } else {
      return <EmptyState type="search" />
    }
  }

  // Create column arrays for masonry layout
  const columnArrays: Integration[][] = Array.from({ length: columns }, () => [])

  // Distribute integrations across columns
  integrations.forEach((integration, index) => {
    const columnIndex = index % columns
    columnArrays[columnIndex].push(integration)
  })

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex gap-4">
        {columnArrays.map((columnItems, columnIndex) => (
          <div key={columnIndex} className="flex-1 space-y-4">
            {columnItems.map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onClick={() => onIntegrationClick(integration)}
                isArchived={isArchived}
                onUnarchive={onUnarchive ? () => onUnarchive(integration.id) : undefined}
                onTagClick={onTagClick}
                contentType={contentType}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
