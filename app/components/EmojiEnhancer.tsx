"use client"

import { useEffect } from "react"

export default function EmojiEnhancer() {
  useEffect(() => {
    // Function to find and enhance specific emojis
    const enhanceEmojis = () => {
      // Find all text nodes in the document
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null)

      const nodesToProcess = []
      let node
      while ((node = walker.nextNode())) {
        if (node.textContent?.includes("💡")) {
          nodesToProcess.push(node)
        }
      }

      // Process nodes that contain the light bulb emoji
      nodesToProcess.forEach((node) => {
        const parent = node.parentElement
        if (parent && !parent.classList.contains("emoji") && !parent.classList.contains("emoji-lightbulb")) {
          // Split the text by the light bulb emoji
          const parts = node.textContent?.split("💡") || []
          if (parts.length > 1) {
            // Create a document fragment to hold the new nodes
            const fragment = document.createDocumentFragment()

            // Add each part with the emoji in between
            for (let i = 0; i < parts.length; i++) {
              if (parts[i]) {
                fragment.appendChild(document.createTextNode(parts[i]))
              }

              // Add the emoji with proper styling (except after the last part)
              if (i < parts.length - 1) {
                const emojiSpan = document.createElement("span")
                emojiSpan.textContent = "💡"
                emojiSpan.className = "emoji emoji-lightbulb"
                fragment.appendChild(emojiSpan)
              }
            }

            // Replace the original node with the fragment
            parent.replaceChild(fragment, node)
          }
        }
      })
    }

    // Run once on mount and then on any DOM changes
    enhanceEmojis()

    // Set up a mutation observer to watch for DOM changes
    const observer = new MutationObserver((mutations) => {
      enhanceEmojis()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    })

    return () => observer.disconnect()
  }, [])

  return null
}
