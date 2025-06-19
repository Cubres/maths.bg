"use client"

import type React from "react"
import { MathJaxContext } from "better-react-mathjax"

export function MathJaxProvider({ children }: { children: React.ReactNode }) {
  const config = {
    loader: { load: ["input/tex", "output/svg"] },
    tex: {
      inlineMath: [["$", "$"]],
      displayMath: [["$$", "$$"]],
      processEscapes: true,
    },
    svg: {
      fontCache: "global",
    },
    startup: {
      typeset: true,
    },
  }

  return <MathJaxContext config={config}>{children}</MathJaxContext>
}
