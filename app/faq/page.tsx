import type { Metadata } from "next"
import FAQClientPage from "./FAQClientPage"

export const metadata: Metadata = {
  title: "Въпроси | maths.bg",
  description: "Често задавани въпроси за maths.bg",
}

export default function FAQPage() {
  return <FAQClientPage />
}
