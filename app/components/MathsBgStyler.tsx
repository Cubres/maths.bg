"use client"

import { useEffect } from "react"

export default function MathsBgStyler() {
  useEffect(() => {
    // Function to create the styled maths.bg element
    function createMathsBgElement(): HTMLElement {
      const wrapper = document.createElement("span")
      wrapper.style.display = "inline-flex"
      wrapper.style.alignItems = "center"
      wrapper.style.gap = "4px"
      wrapper.style.verticalAlign = "baseline"
      wrapper.style.transform = "translateY(1px)" // Move slightly down to align with text baseline

      const link = document.createElement("a")
      link.href = "/"
      link.style.color = "#3b82f6" // blue-500
      link.style.textDecoration = "none"
      link.style.display = "inline-flex"
      link.style.alignItems = "center"
      link.style.gap = "4px"
      link.style.fontWeight = "bold"
      link.style.verticalAlign = "baseline"

      // Add hover effect
      link.addEventListener("mouseenter", () => {
        link.style.textDecoration = "underline"
      })
      link.addEventListener("mouseleave", () => {
        link.style.textDecoration = "none"
      })

      const icon = document.createElement("img")
      icon.src = "/logo_contrast.png"
      icon.alt = "maths.bg logo"
      icon.style.width = "16px"
      icon.style.height = "16px"
      icon.style.display = "inline-block"
      icon.style.verticalAlign = "baseline"

      const text = document.createElement("span")
      text.textContent = "maths.bg"
      text.style.verticalAlign = "baseline"

      link.appendChild(icon)
      link.appendChild(text)
      wrapper.appendChild(link)

      return wrapper
    }

    // Function to process text nodes and replace maths.bg
    function processTextNode(textNode: Text) {
      const text = textNode.textContent || ""

      // Updated regex with negative lookbehind and negative lookahead
      // (?<!@) - negative lookbehind: not preceded by @
      // (?!\s+Deluxe) - negative lookahead: not followed by space(s) + "Deluxe"
      const regex = /(?<!@)maths\.bg(?!\s+Deluxe)/gi

      if (regex.test(text)) {
        const parent = textNode.parentNode
        if (!parent) return

        // Skip if already processed or if it's inside a link
        if (parent.closest('a[href="/"]') || parent.hasAttribute("data-mathsbg-processed")) {
          return
        }

        // Reset regex lastIndex for proper splitting
        regex.lastIndex = 0
        const parts = text.split(regex)
        const matches = text.match(regex) || []

        const fragment = document.createDocumentFragment()

        for (let i = 0; i < parts.length; i++) {
          if (parts[i]) {
            fragment.appendChild(document.createTextNode(parts[i]))
          }

          if (i < matches.length) {
            fragment.appendChild(createMathsBgElement())
          }
        }

        parent.replaceChild(fragment, textNode)
        parent.setAttribute("data-mathsbg-processed", "true")
      }
    }

    // Function to process all text nodes in an element
    function processElement(element: Element) {
      // Skip script tags, style tags, and already processed elements
      if (
        element.tagName === "SCRIPT" ||
        element.tagName === "STYLE" ||
        element.hasAttribute("data-mathsbg-processed")
      ) {
        return
      }

      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          // Skip text nodes that are inside links or already processed elements
          const parent = node.parentElement
          if (!parent) return NodeFilter.FILTER_REJECT

          if (parent.closest('a[href="/"]') || parent.closest("[data-mathsbg-processed]")) {
            return NodeFilter.FILTER_REJECT
          }

          return NodeFilter.FILTER_ACCEPT
        },
      })

      const textNodes: Text[] = []
      let node: Node | null

      while ((node = walker.nextNode())) {
        textNodes.push(node as Text)
      }

      // Process text nodes in reverse order to avoid issues with DOM changes
      for (let i = textNodes.length - 1; i >= 0; i--) {
        processTextNode(textNodes[i])
      }
    }

    // Initial processing
    processElement(document.body)

    // Set up MutationObserver to watch for dynamic content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              processElement(node as Element)
            } else if (node.nodeType === Node.TEXT_NODE) {
              processTextNode(node as Text)
            }
          })
        }
      })
    })

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    })

    // Cleanup function
    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}
