/**
 * Utility function to escape special characters in CSS selectors
 */
export const escapeSelector = (selector: string) => {
  return selector.replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, "\\$1")
}

/**
 * Utility function to render math expressions using KaTeX
 */
export const renderMath = (element: HTMLElement | null) => {
  if (!element || !window.renderMath) return

  try {
    // If the element has an ID, make sure it's properly escaped for querySelector
    if (element.id) {
      const safeId = escapeSelector(element.id)
      // Use the escaped ID if we need to query the element again
      const safeElement = document.getElementById(element.id)
      if (safeElement) {
        window.renderMath(safeElement)
      }
    } else {
      window.renderMath(element)
    }
  } catch (error) {
    console.error("Грешка при компилация на математически изрази:", error)
  }
}

/**
 * Utility function to safely get an element by ID, handling special characters
 */
export const getElementByIdSafe = (id: string): HTMLElement | null => {
  try {
    return document.getElementById(id)
  } catch (error) {
    console.error(`Грешка в елемент с ID ${id}:`, error)
    return null
  }
}
