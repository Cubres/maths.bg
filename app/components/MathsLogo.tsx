import Image from "next/image"

interface MathsLogoProps {
  inverted?: boolean
  size?: number
  contentType?: "problems" | "theorems"
  noBackground?: boolean
}

export default function MathsLogo({
  inverted = false,
  size = 24,
  contentType = "problems",
  noBackground = false,
}: MathsLogoProps) {
  // Determine background color based on content type
  const bgColor = contentType === "theorems" ? "bg-green-500" : "bg-[#2F7AE5]"

  // For the theorems mode, we'll apply a CSS filter to shift the hue of the blue logo to green
  // But only if noBackground is false (we want the header logo to stay blue)
  const filterStyle = contentType === "theorems" && !noBackground ? { filter: "hue-rotate(85deg)" } : {}

  if (noBackground) {
    // No background version (for header)
    return (
      <Image
        src="/logo_contrast.png"
        alt="Maths Logo"
        width={size}
        height={size}
        className={`${inverted ? "invert" : ""}`}
      />
    )
  }

  // With background version (for other places)
  return (
    <div
      className={`relative rounded-full flex items-center justify-center ${inverted ? "bg-green-500" : bgColor}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo_contrast.png"
        alt="Maths Logo"
        width={size * 0.7}
        height={size * 0.7}
        className={`${inverted ? "invert" : ""}`}
        style={filterStyle}
      />
    </div>
  )
}
