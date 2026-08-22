import { useState } from "react"
import toast from "react-hot-toast"
import { Tag, X, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { applyPromoCode, type PromoApplication } from "@/data/promotions"
import type { Promotion } from "@/data/types"

/**
 * Promo code entry used by every checkout surface, so a code copied on the
 * Deals page actually does something when the traveler pays.
 */
export function PromoCodeInput({
  subtotal,
  product,
  applied,
  onApply,
  onRemove,
}: {
  subtotal: number
  product: Promotion["category"]
  applied: PromoApplication | null
  onApply: (application: PromoApplication) => void
  onRemove: () => void
}) {
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)

  function handleApply() {
    const outcome = applyPromoCode(code, subtotal, product)
    if (!outcome.ok) {
      setError(outcome.error)
      return
    }
    setError(null)
    setCode("")
    onApply(outcome.result)
    toast.success(`${outcome.result.promo.code} applied.`)
  }

  if (applied) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-success/30 bg-success/5 px-3 py-2.5">
        <span className="flex min-w-0 items-center gap-2 text-sm font-semibold text-success">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span className="truncate">{applied.promo.code} applied</span>
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="h-7 shrink-0 gap-1 px-2 text-xs"
        >
          <X className="h-3.5 w-3.5" /> Remove
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={code}
            onChange={(e) => {
              setCode(e.target.value)
              setError(null)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleApply()
              }
            }}
            placeholder="Promo code"
            aria-label="Promo code"
            aria-invalid={Boolean(error)}
            className="pl-9 uppercase"
          />
        </div>
        <Button type="button" variant="outline" onClick={handleApply} disabled={!code.trim()} className="shrink-0">
          Apply
        </Button>
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-destructive">{error}</p>}
    </div>
  )
}
