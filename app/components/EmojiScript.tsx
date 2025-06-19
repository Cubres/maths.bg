"use client"

import { useEffect } from "react"

export default function EmojiScript() {
  useEffect(() => {
    // This script ensures only actual emoji characters are properly styled
    const styleEmojis = () => {
      // Find all elements with specific emoji characters
      const emojiSelectors = [
        "🏫",
        "🏆",
        "🔖",
        "📣",
        "👆",
        "⭐",
        "📚",
        "🧩",
        "🔍",
        "📝",
        "📊",
        "🎯",
        "🧠",
        "📌",
        "🔢",
        "📏",
        "🔄",
        "📈",
        "🔬",
        "🎓",
      ]

      // Only target specific emoji characters
      const emojiRegex = new RegExp(`[${emojiSelectors.join("")}]`, "u")

      // Find all text nodes in the document
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null)

      const textNodes = []
      let node

      while ((node = walker.nextNode())) {
        if (emojiRegex.test(node.nodeValue)) {
          textNodes.push(node)
        }
      }

      // Process text nodes containing emojis
      textNodes.forEach((textNode) => {
        const parent = textNode.parentNode

        // Skip if parent already has emoji class or is in a script/style tag
        if (parent.classList?.contains("emoji") || parent.tagName === "SCRIPT" || parent.tagName === "STYLE") {
          return
        }

        const text = textNode.nodeValue
        const parts = []
        let lastIndex = 0

        // Find all emoji matches
        const matches = [...text.matchAll(new RegExp(emojiRegex, "gu"))]

        if (matches.length === 0) return

        matches.forEach((match) => {
          const index = match.index

          // Add text before emoji
          if (index > lastIndex) {
            parts.push({
              type: "text",
              content: text.substring(lastIndex, index),
            })
          }

          // Add emoji
          parts.push({
            type: "emoji",
            content: match[0],
          })

          lastIndex = index + match[0].length
        })

        // Add remaining text
        if (lastIndex < text.length) {
          parts.push({
            type: "text",
            content: text.substring(lastIndex),
          })
        }

        // Create document fragment with styled emojis
        const fragment = document.createDocumentFragment()

        parts.forEach((part) => {
          if (part.type === "emoji") {
            const span = document.createElement("span")
            span.className = "emoji"
            span.textContent = part.content
            fragment.appendChild(span)
          } else {
            fragment.appendChild(document.createTextNode(part.content))
          }
        })

        parent.replaceChild(fragment, textNode)
      })
    }

    // Run on load and after any DOM changes
    styleEmojis()

    // Create a MutationObserver to watch for DOM changes
    const observer = new MutationObserver(() => {
      styleEmojis()
    })

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}
