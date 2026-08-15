import { useState } from "react"
import { Copy, Check, CalendarClock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Promotion } from "@/data/types"

export function PromoCard({ promo }: { promo: Promotion }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard?.writeText(promo.code).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-card">
      <div className="relative h-36 w-full overflow-hidden">
        <img src={promo.image} alt={promo.title} loading="lazy" className="h-full w-full object-cover" />
        <Badge variant="accent" className="absolute left-3 top-3">{promo.discount}</Badge>
      </div>
      <div className="p-5">
        <Badge variant="secondary" className="mb-2">{promo.category}</Badge>
        <h3 className="font-bold text-foreground">{promo.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{promo.description}</p>
        <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <CalendarClock className="h-3.5 w-3.5" /> Valid until {promo.expiration}
        </p>
        <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2">
          <span className="font-mono text-sm font-bold tracking-wide text-foreground">{promo.code}</span>
          <Button size="sm" variant="ghost" onClick={handleCopy} className="h-7 gap-1 px-2 text-xs">
            {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{promo.terms}</p>
      </div>
    </Card>
  )
}
