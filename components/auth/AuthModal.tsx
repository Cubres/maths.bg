"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthContext } from "./AuthProvider"
import { Mail, CheckCircle, AlertCircle } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signInWithEmail } = useAuthContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setError(null)

    try {
      await signInWithEmail(email)
      setEmailSent(true)
    } catch (err: any) {
      setError(err.message || "Възникна грешка")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setEmail("")
    setEmailSent(false)
    setError(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Влизане в maths.bg
          </DialogTitle>
        </DialogHeader>

        {!emailSent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Имейл адрес</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Изпращане..." : "Изпрати магическа връзка"}
            </Button>

            <p className="text-sm text-muted-foreground text-center">Ще ви изпратим връзка за влизане на имейла ви</p>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
            <div>
              <h3 className="font-semibold">Проверете имейла си!</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Изпратихме ви връзка за влизане на <strong>{email}</strong>
              </p>
            </div>
            <Button onClick={handleClose} variant="outline" className="w-full">
              Затвори
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
