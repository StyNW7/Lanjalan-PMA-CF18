import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function StarRating({ rating, reviewCount, className }: { rating: number; reviewCount?: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1 text-sm", className)}>
      <Star className="h-3.5 w-3.5 fill-warning text-warning" />
      <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && <span className="text-muted-foreground">({reviewCount.toLocaleString()})</span>}
    </div>
  )
}
