"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LoadingScreenProps {
  totalProblems: number
  onComplete: () => void
}

// Math problem-solving tips
const mathTips = [
  "Винаги започвайте с разбиране на проблема, преди да опитате да го решите.",
  "Разбийте сложните проблеми на по-малки, по-управляеми части.",
  "Търсете модели и закономерности в данните или условията.",
  "Опитайте да визуализирате проблема чрез диаграми или скици.",
  "Когато сте блокирали, опитайте да погледнете проблема от различен ъгъл.",
  "Използвайте метода на противоречието: допуснете, че отговорът е противоположен и търсете противоречие.",
  "Проверете решението си с различни стойности или гранични случаи.",
  "Не се страхувайте да използвате интуицията си, но винаги я проверявайте с логика.",
  "Запишете всички дадени условия и това, което трябва да намерите.",
  "Когато работите с геометрични задачи, обмислете допълнителни конструкции.",
  "При алгебрични задачи, опитайте да опростите изразите преди да продължите.",
  "Използвайте предишни решени проблеми като вдъхновение за текущите.",
  "Когато е възможно, използвайте симетрия за опростяване на проблема.",
  "Не забравяйте да проверите размерностите при задачи с физически величини.",
  "Понякога е полезно да работите отзад напред - от това, което трябва да докажете, към даденото.",
  "Търсете инварианти - стойности, които остават непроменени при трансформации.",
  "При задачи с вероятности, изяснете всички възможни изходи и благоприятни случаи.",
  "Използвайте принципа на Дирихле при задачи, свързани с разпределение на обекти.",
  "Обърнете внимание на крайните случаи - те често дават ключ към решението.",
  "Не се отказвайте лесно - понякога най-добрите идеи идват след продължително мислене.",
]

export default function LoadingScreen({ totalProblems, onComplete }: LoadingScreenProps) {
  const [loadedProblems, setLoadedProblems] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [currentTip, setCurrentTip] = useState(0)
  const [autoRotateTips, setAutoRotateTips] = useState(true)
  const [showLoadingScreen, setShowLoadingScreen] = useState(false)
  const [randomTipsOrder, setRandomTipsOrder] = useState<number[]>([])
  const [delayCompletion, setDelayCompletion] = useState(false)
  const [isReadingTip, setIsReadingTip] = useState(false)
  const completionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const loadingCompleted = useRef(false)

  // Generate random order of tips
  useEffect(() => {
    const indices = Array.from({ length: mathTips.length }, (_, i) => i)
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[indices[i], indices[j]] = [indices[j], indices[i]]
    }
    setRandomTipsOrder(indices)
    setCurrentTip(0)
  }, [])

  useEffect(() => {
    if (showLoadingScreen) {
      // Simulate loading progress
      const interval = setInterval(() => {
        setLoadedProblems((prev) => {
          if (prev >= totalProblems) {
            clearInterval(interval)
            loadingCompleted.current = true

            // Only trigger completion if we're not in a delay period
            if (!delayCompletion) {
              setIsComplete(true)
            }

            return totalProblems
          }
          return prev + 1
        })
      }, 50) // Adjust speed as needed

      return () => clearInterval(interval)
    }
  }, [totalProblems, showLoadingScreen, delayCompletion])

  useEffect(() => {
    // Rotate through tips every 5 seconds if autoRotate is enabled
    let tipInterval: NodeJS.Timeout | null = null

    if (autoRotateTips && showLoadingScreen) {
      tipInterval = setInterval(() => {
        goToNextTip()
      }, 5000)
    }

    // Check if we have cached data
    const cachedData = localStorage.getItem("problems-cache-timestamp")
    if (cachedData && showLoadingScreen) {
      // If we have cached data, skip the loading screen
      setLoadedProblems(totalProblems)
      loadingCompleted.current = true

      // Only trigger completion if we're not in a delay period
      if (!delayCompletion) {
        setIsComplete(true)
      }
    } else if (showLoadingScreen) {
      // If this is the first load, we'll set a cache timestamp
      localStorage.setItem("problems-cache-timestamp", Date.now().toString())
    }

    return () => {
      if (tipInterval) clearInterval(tipInterval)
    }
  }, [totalProblems, autoRotateTips, showLoadingScreen, randomTipsOrder.length, delayCompletion])

  const goToNextTip = useCallback(() => {
    // Don't allow clicking while already reading a tip
    if (isReadingTip) return

    // Set reading state
    setIsReadingTip(true)

    // Clear any existing completion timeout
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current)
    }

    // Set delay flag to prevent immediate completion
    setDelayCompletion(true)

    // Disable auto-rotation when manually navigating
    setAutoRotateTips(false)

    // Go to next tip
    setCurrentTip((prev) => (prev + 1) % randomTipsOrder.length)

    // Set a timeout to allow completion after 3 seconds
    completionTimeoutRef.current = setTimeout(() => {
      setDelayCompletion(false)
      setIsReadingTip(false)

      // If loading has already completed, trigger completion now
      if (loadingCompleted.current) {
        setIsComplete(true)
      }
    }, 3000) // 3 seconds delay
  }, [randomTipsOrder.length, isReadingTip])

  const skipDelayAndComplete = () => {
    // Clear any existing completion timeout
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current)
    }

    // Allow completion and trigger it immediately if loading is done
    setDelayCompletion(false)
    setIsReadingTip(false)
    if (loadingCompleted.current) {
      setIsComplete(true)
    }
  }

  const handleEnterPlatform = () => {
    setShowLoadingScreen(true)
    // Reset loading state
    setLoadedProblems(0)
    setIsComplete(false)
    loadingCompleted.current = false
    setIsReadingTip(false)
  }

  // When loading completes, call the onComplete callback
  useEffect(() => {
    if (isComplete && showLoadingScreen) {
      onComplete()
    }
  }, [isComplete, showLoadingScreen, onComplete])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-[#171717] overflow-hidden">
      <div className="max-w-4xl w-full px-6 flex flex-col items-center">
        {/* Header with Logo */}
        <div className="flex items-center mb-8 transition-all duration-700 transform translate-y-0 opacity-100">
          <Image src="/logo_contrast.png" alt="maths.bg logo" width={64} height={64} priority />
          <Link
            href="/"
            className="text-5xl font-bold ml-3 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-1 rounded-full transition-all duration-300"
            style={{ fontFamily: "'Computer Modern', serif", color: "#2F7AE5" }}
          >
            maths.bg
          </Link>
        </div>

        {/* Main section */}
        <div className="text-center mb-8 transition-all duration-700 delay-100">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            Вашият път към математическото съвършенство
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Най-добрата платформа за решаване на математически проблеми и подготовка за олимпиади в България.
          </p>
        </div>

        {/* Loading State */}
        {showLoadingScreen && (
          <div className="w-full flex flex-col items-center transition-all duration-700 opacity-100">
            {/* Loading Progress */}
            <div className="w-full max-w-lg h-4 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-[#2F7AE5] transition-all duration-300 ease-out"
                style={{ width: `${(loadedProblems / totalProblems) * 100}%` }}
              ></div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Зареждане на задачи: {loadedProblems}/{totalProblems}
              {loadingCompleted.current && delayCompletion && (
                <button
                  onClick={skipDelayAndComplete}
                  className="ml-2 text-[#2F7AE5] font-medium hover:underline cursor-pointer transition-colors"
                >
                  (Към сайта...)
                </button>
              )}
            </p>

            {/* Tips Section with Navigation - Now the entire box is clickable */}
            <div
              className={cn(
                "w-full max-w-lg p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-8 transition-all duration-300",
                isReadingTip
                  ? "cursor-wait bg-gray-200 dark:bg-gray-700"
                  : "cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700",
              )}
              onClick={goToNextTip}
              role="button"
              tabIndex={0}
              aria-label="Следващ съвет"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  goToNextTip()
                }
              }}
            >
              <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
                <span className="emoji filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">💡</span> Съвет:
              </h3>
              <div className="min-h-[100px] flex items-center justify-center">
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {isReadingTip
                    ? "Четене на съвет..."
                    : randomTipsOrder.length > 0
                      ? mathTips[randomTipsOrder[currentTip]]
                      : mathTips[0]}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div></div> {/* Empty div for spacing */}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {currentTip + 1}/{mathTips.length}
                </span>
                <span className="text-gray-500 filter drop-shadow-[0_0_1px_rgba(0,0,0,1)]">⬇️</span>
              </div>
            </div>
          </div>
        )}

        {/* Features and Buttons (shown when not loading) */}
        {!showLoadingScreen && (
          <div className="w-full transition-all duration-1000 ease-in-out opacity-100 transform translate-y-0">
            {/* Features Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
              {[
                {
                  icon: "🧩",
                  title: "Разнообразни задачи",
                  description: "Над 1000 задачи от всички области на математиката",
                },
                {
                  icon: "🎯",
                  title: "Подготовка за олимпиади",
                  description: "Специално подбрани задачи за състезания и олимпиади",
                },
                {
                  icon: "🚀",
                  title: "Персонализирано обучение",
                  description: "Задачи, адаптирани към вашето ниво и интереси",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-5 bg-gray-100 dark:bg-gray-800 rounded-lg transition-all duration-700 transform group cursor-pointer",
                    "hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg",
                    "border border-transparent hover:border-gray-200 dark:hover:border-gray-600",
                  )}
                  style={{ transitionDelay: `${300 + index * 150}ms` }}
                >
                  <div
                    className="text-3xl mb-2 transition-transform group-hover:scale-110 duration-300"
                    style={{
                      filter: "drop-shadow(0 0 1px rgba(0,0,0,1))",
                      display: "inline-block",
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2 dark:text-white group-hover:text-[#2F7AE5] dark:group-hover:text-[#3b82f6] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Buttons Section */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
              <Button
                onClick={handleEnterPlatform}
                className="bg-[#2F7AE5] hover:bg-[#2F7AE5]/90 text-white rounded-full px-8 py-6 text-lg transition-all duration-700 transform"
              >
                Вход в платформата
              </Button>
              <Link href="#" passHref>
                <Button className="bg-[#16A34A] hover:bg-[#16A34A]/90 text-white rounded-full px-8 py-6 text-lg transition-all duration-700 transform">
                  maths.bg Deluxe абонамент
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
