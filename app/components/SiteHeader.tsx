"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Navigation from "./Navigation"
import RandomProblemButton from "./RandomProblemButton"
import AuthModal from "./AuthModal"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import DirectThemeToggle from "./DirectThemeToggle"
import { useAuth } from "../../hooks/useAuth"
import { AuthService } from "../../lib/supabase/auth"

export default function SiteHeader({
  contentType,
  filteredIntegrations = [],
  onSelectIntegration = () => {},
}: {
  contentType?: "problems" | "theorems"
  filteredIntegrations?: any[]
  onSelectIntegration?: (integration: any) => void
}) {
  const pathname = usePathname()
  const isMainPage = pathname === "/" || pathname === "/integrations"
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user } = useAuth()

  // Standardized button style
  const buttonStyle = "border-gray-200 dark:border-gray-700 rounded-full w-10 h-10 flex items-center justify-center"

  const handleSignOut = async () => {
    await AuthService.signOut()
  }

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => {
                // Set flag for internal navigation to home
                sessionStorage.setItem("internal-navigation", "true")
              }}
            >
              <Image src="/logo_contrast.png" alt="maths.bg Logo" width={36} height={36} className="mr-2" />
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">maths.bg</span>
            </Link>
          </div>

          <Navigation />

          <div className="flex items-center ml-auto space-x-2 pr-4">
            {/* Authentication Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {user ? (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleSignOut}
                      aria-label="Изход"
                      className={`${buttonStyle}`}
                    >
                      <span className="emoji text-lg">👋</span>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsAuthModalOpen(true)}
                      aria-label="Вход"
                      className={`${buttonStyle}`}
                    >
                      <span className="emoji text-lg">🔐</span>
                    </Button>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{user ? `Изход (${user.email})` : "Вход в профила"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Random Problem Button - only show on main pages */}
            {isMainPage && (
              <RandomProblemButton
                filteredIntegrations={filteredIntegrations}
                onSelectIntegration={onSelectIntegration}
              />
            )}

            {/* Theme Toggle - show on all pages */}
            <DirectThemeToggle />
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  )
}
