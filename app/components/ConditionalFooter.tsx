"use client"

import { usePathname } from "next/navigation"
import Footer from "./Footer"

export default function ConditionalFooter() {
  const pathname = usePathname()

  // Don't render the footer on the home page
  if (pathname === "/") {
    return null
  }

  return <Footer />
}
