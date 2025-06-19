import type React from "react"
import "./globals.css"
import { MathJaxProvider } from "./components/MathJaxProvider"
import EmojiScript from "./components/EmojiScript"
import ConditionalFooter from "./components/ConditionalFooter"
import SimpleFadeTransition from "./components/SimpleFadeTransition"
import ThemeInitializer from "./components/ThemeInitializer"
import ThemeMonitor from "./components/ThemeMonitor"
import ThemeAwareTransition from "./components/ThemeAwareTransition"
import MathsBgStyler from "./components/MathsBgStyler"
import { AuthProvider } from "./components/auth/AuthProvider"
import PasswordGate from "./components/PasswordGate"

export const metadata = {
  title: "maths.bg",
  description: "Mathematics problem collection",
  icons: {
    icon: "/logo_contrast.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeInitializer />
      </head>
      <body style={{ fontFamily: "'Computer Modern', serif" }} className="flex flex-col min-h-screen">
        <PasswordGate>
          <AuthProvider>
            <ThemeMonitor />
            <ThemeAwareTransition />
            <MathsBgStyler />
            <MathJaxProvider>
              <SimpleFadeTransition>
                <div className="flex-grow">{children}</div>
                <ConditionalFooter />
              </SimpleFadeTransition>
            </MathJaxProvider>
            <EmojiScript />
          </AuthProvider>
        </PasswordGate>
      </body>
    </html>
  )
}
