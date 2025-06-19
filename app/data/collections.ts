// Collection type definition
export type Collection = {
  id: string
  name: string
  description: string
  integrationIds: string[]
  createdAt: number
}

// Generate a random 7-character ID for collections
export function generateCollectionId(): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < 7; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

// Check if a collection ID is unique
export function isUniqueCollectionId(id: string, collections: Collection[]): boolean {
  return !collections.some((collection) => collection.id === id)
}

// Generate a unique collection ID
export function generateUniqueCollectionId(collections: Collection[]): string {
  let id = generateCollectionId()
  while (!isUniqueCollectionId(id, collections)) {
    id = generateCollectionId()
  }
  return id
}
