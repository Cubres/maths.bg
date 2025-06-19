// Theme management utilities

// Constants
export const THEME_STORAGE_KEY = "maths-bg-theme"
export const THEME_COOKIE_NAME = "maths-bg-theme"

// Get theme from all available sources
export function getThemePreference(): "dark" | "light" {
  if (typeof window === "undefined") return "light"

  try {
    // Check localStorage first
    const localTheme = localStorage.getItem(THEME_STORAGE_KEY)
    if (localTheme === "dark" || localTheme === "light") {
      return localTheme
    }

    // Check cookies next
    const cookies = document.cookie.split(";")
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=")
      if (name === THEME_COOKIE_NAME) {
        if (value === "dark" || value === "light") {
          return value as "dark" | "light"
        }
      }
    }

    // Check if dark mode is already applied to HTML
    if (document.documentElement.classList.contains("dark")) {
      return "dark"
    }

    // Default to light
    return "light"
  } catch (e) {
    console.error("Error getting theme preference:", e)
    return "light"
  }
}

// Set theme with multiple persistence mechanisms
export function setThemePreference(theme: "dark" | "light"): void {
  if (typeof window === "undefined") return

  try {
    // Set in localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme)

    // Set in cookie (30 day expiry)
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 30)
    document.cookie = `${THEME_COOKIE_NAME}=${theme};expires=${expiryDate.toUTCString()};path=/;SameSite=Strict`

    // Apply to document
    applyTheme(theme)

    // Broadcast theme change event
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }))
  } catch (e) {
    console.error("Error setting theme preference:", e)
  }
}

// Apply theme to document
export function applyTheme(theme: "dark" | "light"): void {
  if (typeof window === "undefined") return

  try {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    // Also set data attribute for CSS targeting
    document.documentElement.setAttribute("data-theme", theme)
  } catch (e) {
    console.error("Error applying theme:", e)
  }
}

// Toggle theme
export function toggleTheme(): "dark" | "light" {
  const currentTheme = getThemePreference()
  const newTheme = currentTheme === "dark" ? "light" : "dark"
  setThemePreference(newTheme)
  return newTheme
}

// Initialize theme (call this as early as possible)
export function initializeTheme(): void {
  if (typeof window === "undefined") return

  try {
    const theme = getThemePreference()
    applyTheme(theme)
  } catch (e) {
    console.error("Error initializing theme:", e)
  }
}
