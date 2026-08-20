import { Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatIDR } from "@/lib/format"

export function RecommendationCard({
  image,
  title,
  subtitle,
  matchLabel,
  reasons,
  price,
  priceLabel = "per night",
  ctaLabel = "View Details",
  onAction,
}: {
  image: string
  title: string
  subtitle: string
  matchLabel: string
  reasons: string[]
  price: number
  priceLabel?: string
  ctaLabel?: string
  onAction?: () => void
}) {
  return (
    <Card className="overflow-hidden border-accent/20 bg-accent-light/40 transition-shadow hover:shadow-card">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex gap-4">
          <img src={image} alt={title} loading="lazy" className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24" />
          <div className="min-w-0 flex-1">
            <Badge variant="accent" className="gap-1">
              <Sparkles className="h-3 w-3" /> {matchLabel}
            </Badge>
            <h4 className="mt-1.5 truncate font-bold text-foreground">{title}</h4>
            <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <ul className="space-y-0.5">
          {reasons.slice(0, 3).map((r) => (
            <li key={r} className="text-xs text-foreground/80">• {r}</li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-bold text-foreground">{formatIDR(price)}</p>
            <p className="text-xs text-muted-foreground">{priceLabel}</p>
          </div>
          <Button size="sm" onClick={onAction} className="shrink-0">{ctaLabel}</Button>
        </div>
      </div>
    </Card>
  )
}
