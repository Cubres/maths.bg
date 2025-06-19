"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Начало", href: "/" },
  { name: "За нас", href: "/about" },
  { name: "Ресурси", href: "/resources" },
  { name: "Блог", href: "/blog" },
  { name: "Въпроси", href: "/faq" },
  { name: "Контакти", href: "/contact" },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Function to get the active item based on the current pathname
  const getActiveItem = (path: string) => {
    if (path === "/") return "Начало"
    if (path.includes("/about")) return "За нас"
    if (path.includes("/resources")) return "Ресурси"
    if (path.includes("/blog")) return "Блог"
    if (path.includes("/faq")) return "Въпроси"
    if (path.includes("/contact")) return "Контакти"
    return "Начало" // Default
  }

  const [activeItem, setActiveItem] = useState(getActiveItem(pathname))

  // Update active item when pathname changes
  useEffect(() => {
    setActiveItem(getActiveItem(pathname))
  }, [pathname])

  return (
    <nav className="mx-auto">
      <ul className="flex items-center h-8 bg-gray-100 dark:bg-gray-800 rounded-full px-2">
        {navItems.map((item, index) => (
          <li key={item.name} className="relative flex items-center">
            {index > 0 && <div className="h-4 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>}
            <Link
              href={item.href}
              onClick={() => {
                if (item.name === "Начало" && pathname !== "/") {
                  // Set flag for internal navigation to home
                  sessionStorage.setItem("internal-navigation", "true")
                }
              }}
              className={cn(
                "px-3 py-1 text-xs rounded-full transition-colors",
                activeItem === item.name
                  ? "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700",
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
