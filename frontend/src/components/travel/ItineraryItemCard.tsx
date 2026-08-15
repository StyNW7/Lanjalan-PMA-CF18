import { Lock, Unlock, RefreshCw, Trash2, GripVertical, MapPin, Clock3 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { formatIDR } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { ItineraryItem } from "@/data/types"

export function ItineraryItemCard({
  item,
  onLockToggle,
  onRemove,
  onSwap,
}: {
  item: ItineraryItem
  onLockToggle?: () => void
  onRemove?: () => void
  onSwap?: () => void
}) {
  return (
    <Card className={cn("flex gap-4 p-4 transition-shadow hover:shadow-card", item.locked && "border-primary/40 bg-primary-light/30")}>
      <div className="flex w-16 shrink-0 flex-col items-center pt-1">
        <span className="text-sm font-bold text-foreground">{item.time}</span>
        <GripVertical className="mt-2 h-4 w-4 text-muted-foreground/50" />
      </div>
      <div className="min-w-0 flex-1 border-l border-border pl-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-foreground">{item.title}</h4>
              <Badge variant="muted">{item.category}</Badge>
            </div>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {item.location}</span>
              <span className="flex items-center gap-1"><Clock3 className="h-3 w-3" /> {item.duration}</span>
              {item.travelTime && <span>Travel: {item.travelTime}</span>}
            </p>
          </div>
          <p className="shrink-0 text-sm font-bold text-foreground">{formatIDR(item.cost)}</p>
        </div>

        <TooltipProvider>
          <div className="mt-3 flex items-center gap-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onSwap} aria-label="Swap this item">
                  <RefreshCw className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Swap</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onLockToggle} aria-label={item.locked ? "Unlock this item" : "Lock this item"}>
                  {item.locked ? <Lock className="h-3.5 w-3.5 text-primary" /> : <Unlock className="h-3.5 w-3.5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{item.locked ? "Locked in place" : "Lock in place"}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive" onClick={onRemove} aria-label="Remove this item">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </Card>
  )
}
