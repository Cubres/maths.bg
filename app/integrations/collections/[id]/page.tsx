"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CollectionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params

  // This component just redirects to the main integrations page
  // with a special URL parameter that will be detected
  useEffect(() => {
    // We'll use this URL format to pass the collection ID
    router.replace(`/integrations?collection=${id}`)
  }, [id, router])

  return null
}
