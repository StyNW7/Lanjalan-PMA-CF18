import { useState } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { Copy, Check, CalendarClock, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Promotion } from "@/data/types"

export function PromoCard({ promo }: { promo: Promotion }) {
  const [copied, setCopied] = useState(false)

  function handleCopy(e: React.MouseEvent) {
    // The whole card is a link — keep the copy button from navigating.
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard?.writeText(promo.code).catch(() => {})
    setCopied(true)
    toast.success(`Promo code ${promo.code} copied.`)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <Link
      to={`/deals/${promo.id}`}
      className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`View deal: ${promo.title}`}
    >
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-card">
        <div className="relative h-36 w-full shrink-0 overflow-hidden">
          <img
            src={promo.image}
            alt={promo.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge variant="accent" className="absolute left-3 top-3">{promo.discount}</Badge>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <Badge variant="secondary" className="mb-2 w-fit">{promo.category}</Badge>
          <h3 className="font-bold text-foreground transition-colors group-hover:text-primary">{promo.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{promo.description}</p>
          <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarClock className="h-3.5 w-3.5 shrink-0" /> Valid until {promo.expiration}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2">
            <span className="font-mono text-sm font-bold tracking-wide text-foreground">{promo.code}</span>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={`Copy promo code ${promo.code}`}
              className="inline-flex h-7 shrink-0 items-center gap-1 rounded-md px-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
            View deal
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Card>
    </Link>
  )
}
