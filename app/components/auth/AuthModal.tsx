"use client"

import type React from "react"

import { useState } from "react"
import { useAuthContext } from "./AuthProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Mail, Loader2 } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { signInWithEmail } = useAuthContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    try {
      await signInWithEmail(email)
      setSent(true)
    } catch (error) {
      console.error("Error signing in:", error)
      alert("Грешка при изпращане на имейла. Моля опитайте отново.")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setEmail("")
    setSent(false)
    setLoading(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            {sent ? "Проверете имейла си" : "Влезте в профила си"}
          </DialogTitle>
          <DialogDescription>
            {sent
              ? `Изпратихме ви линк за вход на ${email}. Проверете пощата си и кликнете върху линка.`
              : "Въведете имейл адреса си и ще ви изпратим линк за вход."}
          </DialogDescription>
        </DialogHeader>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <Button type="submit" className="w-full" disabled={loading || !email}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Изпращане...
                </>
              ) : (
                "Изпрати линк за вход"
              )}
            </Button>
          </form>
        ) : (
          <div className="text-center py-4">
            <Button onClick={handleClose} variant="outline">
              Затвори
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
