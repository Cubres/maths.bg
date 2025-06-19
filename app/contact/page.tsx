import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Контакт | maths.bg",
  description: "Свържете се с екипа на maths.bg",
}

export default function ContactPage() {
  return <ContactPageClient />
}
