"use client"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TooltipSwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  tooltipText: string
  label?: string
  className?: string
}

export function TooltipSwitch({ checked, onCheckedChange, tooltipText, label, className }: TooltipSwitchProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center space-x-2 ${className}`}>
            {label && <span className="text-sm">{label}</span>}
            <Switch checked={checked} onCheckedChange={onCheckedChange} aria-label={label || tooltipText} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
