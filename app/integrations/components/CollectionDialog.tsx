"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, Plus } from "lucide-react"
import type { Collection } from "../../data/collections"

type CollectionDialogProps = {
  isOpen: boolean
  onClose: () => void
  collections: Collection[]
  onAddToCollection: (collectionId: string) => void
  onCreateCollection: (name: string, description: string) => void
  integrationId: string | null
}

export default function CollectionDialog({
  isOpen,
  onClose,
  collections,
  onAddToCollection,
  onCreateCollection,
  integrationId,
}: CollectionDialogProps) {
  const [activeTab, setActiveTab] = useState<string>(collections.length > 0 ? "existing" : "new")
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    collections.length > 0 ? collections[0].id : null,
  )
  const [newCollectionName, setNewCollectionName] = useState("")
  const [newCollectionDescription, setNewCollectionDescription] = useState("")
  const [nameError, setNameError] = useState("")
  const [descriptionError, setDescriptionError] = useState("")

  // Reset selected collection when collections change
  useEffect(() => {
    if (collections.length > 0 && !selectedCollection) {
      setSelectedCollection(collections[0].id)
    }
  }, [collections, selectedCollection])

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(collections.length > 0 ? "existing" : "new")
      setSelectedCollection(collections.length > 0 ? collections[0].id : null)
      setNewCollectionName("")
      setNewCollectionDescription("")
      setNameError("")
      setDescriptionError("")
    }
  }, [isOpen, collections])

  const handleSubmit = () => {
    if (activeTab === "new") {
      // Validate new collection
      if (!newCollectionName.trim()) {
        setNameError("Името на колекцията не може да е празно!")
        return
      }

      if (newCollectionName.length > 27) {
        setNameError("Името на колекцията трябва да се състои от най-много 27 символа!")
        return
      }

      if (newCollectionDescription.length > 177) {
        setDescriptionError("Описанието може да се състои от най-много 177 символа!")
        return
      }

      onCreateCollection(newCollectionName.trim(), newCollectionDescription.trim())
    } else if (selectedCollection) {
      onAddToCollection(selectedCollection)
    }

    handleClose()
  }

  const handleClose = () => {
    // Reset state
    setNewCollectionName("")
    setNewCollectionDescription("")
    setNameError("")
    setDescriptionError("")
    onClose()
  }

  // Check if the integration is already in the selected collection
  const isInSelectedCollection = (collectionId: string): boolean => {
    if (!integrationId) return false
    const collection = collections.find((c) => c.id === collectionId)
    return collection ? collection.integrationIds.includes(integrationId) : false
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md border-0 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Добави към колекция</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger
              value="existing"
              disabled={collections.length === 0}
              className={collections.length === 0 ? "opacity-50 cursor-not-allowed" : ""}
            >
              Съществуващи
            </TabsTrigger>
            <TabsTrigger value="new">Нова колекция</TabsTrigger>
          </TabsList>

          <TabsContent value="existing" className="space-y-4">
            {collections.length === 0 ? (
              <div className="text-center py-4 text-gray-500">Нямате създадени колекции</div>
            ) : (
              <ScrollArea className="h-60 pr-4">
                <div className="space-y-2">
                  {collections.map((collection) => {
                    const isInCollection = isInSelectedCollection(collection.id)

                    return (
                      <div
                        key={collection.id}
                        className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                          selectedCollection === collection.id
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => setSelectedCollection(collection.id)}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{collection.name}</h3>
                          {isInCollection && (
                            <span className="text-green-500 flex items-center text-sm">
                              <Check size={16} className="mr-1" /> Добавено
                            </span>
                          )}
                        </div>
                        {collection.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                            {collection.description}
                          </p>
                        )}
                        <div className="text-xs text-gray-400 mt-2">
                          {collection.integrationIds.length}{" "}
                          {collection.integrationIds.length === 1 ? "задача" : "задачи"}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="new" className="space-y-4">
            <div>
              <Label htmlFor="collection-name" className="text-sm font-medium">
                Име на колекцията <span className="text-gray-500">(макс. 27 символа)</span>
              </Label>
              <div className="flex items-center mt-1.5 gap-2">
                <Input
                  id="collection-name"
                  value={newCollectionName}
                  onChange={(e) => {
                    setNewCollectionName(e.target.value)
                    if (e.target.value.trim()) {
                      setNameError("")
                    }
                  }}
                  maxLength={27}
                  placeholder="Моята колекция..."
                  className={`rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 ${
                    nameError ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                />
                <div className="text-sm text-gray-500 min-w-[40px] text-right">{newCollectionName.length}/27</div>
              </div>
              {nameError && <p className="text-sm text-red-500 mt-1">{nameError}</p>}
            </div>

            <div>
              <Label htmlFor="collection-description" className="text-sm font-medium">
                Описание <span className="text-gray-500">(макс. 177 символа)</span>
              </Label>
              <div className="mt-1.5">
                <Textarea
                  id="collection-description"
                  value={newCollectionDescription}
                  onChange={(e) => {
                    setNewCollectionDescription(e.target.value)
                    if (e.target.value.length <= 177) {
                      setDescriptionError("")
                    }
                  }}
                  maxLength={177}
                  placeholder="Опишете вашата колекция..."
                  className={`resize-none rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 ${
                    descriptionError ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  rows={3}
                />
                <div className="text-sm text-gray-500 text-right mt-1">{newCollectionDescription.length}/177</div>
              </div>
              {descriptionError && <p className="text-sm text-red-500 mt-1">{descriptionError}</p>}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose} className="rounded-lg border-gray-300 dark:border-gray-600">
            Отказ
          </Button>
          <Button
            onClick={handleSubmit}
            className="rounded-lg"
            disabled={
              (activeTab === "existing" && !selectedCollection) ||
              (activeTab === "existing" && selectedCollection && isInSelectedCollection(selectedCollection))
            }
          >
            {activeTab === "new" ? (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Създай и добави
              </>
            ) : isInSelectedCollection(selectedCollection || "") ? (
              "Вече добавено"
            ) : (
              "Добави към колекция"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
