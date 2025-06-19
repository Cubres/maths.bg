"use client"

import { useState } from "react"
import { MathJax } from "better-react-mathjax"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function MathEditor() {
  const [input, setInput] = useState("$$f(x) = \\int_{-\\infty}^{\\infty}\\hat f(\\xi)\\,e^{2 \\pi i \\xi x}\\,d\\xi$$")
  const [preview, setPreview] = useState(input)

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Math Formula Editor</h3>
        <Button size="sm" onClick={() => setPreview(input)} className="rounded-full">
          Preview
        </Button>
      </div>

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        placeholder="Enter LaTeX formula here..."
        className="font-mono text-sm"
      />

      <div className="border-t pt-4">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg min-h-[100px] flex items-center justify-center">
          <MathJax>{preview}</MathJax>
        </div>
      </div>

      <div className="text-xs text-gray-500">Tip: Use $...$ for inline math and $$...$$ for display math</div>
    </div>
  )
}
