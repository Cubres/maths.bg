import Link from "next/link"
import MathsLogo from "@/app/components/MathsLogo"
import { getThemeColors } from "@/app/utils/themeColors"

interface HeaderProps {
  contentType: "problems" | "theorems"
}

export default function Header({ contentType }: HeaderProps) {
  const themeColors = getThemeColors(contentType)

  return (
    <header className="flex items-center gap-2 py-4">
      <Link href="/" className="flex items-center gap-2">
        <MathsLogo size={32} contentType={contentType} />
        <span
          className="text-xl font-semibold"
          style={{ color: themeColors.brandColor }} // Always blue for brand consistency
        >
          maths.bg
        </span>
      </Link>
    </header>
  )
}
