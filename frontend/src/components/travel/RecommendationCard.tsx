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
    <Card className="overflow-hidden border-accent/20 bg-accent-light/40">
      <div className="flex flex-col gap-4 p-4 sm:flex-row">
        <img src={image} alt={title} loading="lazy" className="h-28 w-full shrink-0 rounded-xl object-cover sm:w-32" />
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="accent" className="gap-1">
              <Sparkles className="h-3 w-3" /> {matchLabel}
            </Badge>
          </div>
          <h4 className="mt-1.5 font-bold text-foreground">{title}</h4>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
          <ul className="mt-2 space-y-0.5">
            {reasons.slice(0, 3).map((r) => (
              <li key={r} className="text-xs text-foreground/80">• {r}</li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="font-bold text-foreground">{formatIDR(price)}</p>
              <p className="text-xs text-muted-foreground">{priceLabel}</p>
            </div>
            <Button size="sm" onClick={onAction}>{ctaLabel}</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
