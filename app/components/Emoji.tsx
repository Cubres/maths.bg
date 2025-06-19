interface EmojiProps {
  symbol: string
  label?: string
  className?: string
}

export default function Emoji({ symbol, label, className = "" }: EmojiProps) {
  return (
    <span className={`emoji ${className}`} role="img" aria-label={label || ""} aria-hidden={!label}>
      {symbol}
    </span>
  )
}
