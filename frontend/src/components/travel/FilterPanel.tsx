import { useState, type ReactNode } from "react"
import { SlidersHorizontal, RotateCcw, ChevronDown, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

/**
 * Filter sidebar shared by every results page.
 *
 * On large screens it is a sticky card. Below `lg` it collapses behind a
 * toggle so the filters never push the results off the first screen.
 */
export function FilterPanel({
  activeCount,
  onReset,
  children,
  className,
}: {
  activeCount: number
  onReset: () => void
  children: ReactNode
  className?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 lg:hidden"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          Filters
          {activeCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-primary-foreground">
              {activeCount}
            </span>
          )}
        </span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")} />
      </button>

      <Card className={cn("mt-3 h-fit p-5 lg:mt-0 lg:sticky lg:top-24 lg:block", !open && "hidden")}>
        <div className="mb-4 flex items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 font-bold text-foreground">
            <SlidersHorizontal className="h-4 w-4 text-primary" /> Filters
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            disabled={activeCount === 0}
            className="h-8 shrink-0 gap-1 px-2 text-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>
        <div className="space-y-6">{children}</div>
      </Card>
    </div>
  )
}

export function FilterSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Label className="text-sm">{label}</Label>
      <div className="mt-2.5">{children}</div>
    </div>
  )
}

/** A single-choice pill row — the reliable way to get back to "Any". */
export function FilterPills<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={String(option.value)}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
            value === option.value
              ? "border-primary bg-primary-light text-primary-dark"
              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export interface ActiveFilter {
  label: string
  onRemove: () => void
}

/** Chips summarising what is currently narrowing the results, each removable. */
export function ActiveFilters({
  items,
  onClearAll,
  className,
}: {
  items: ActiveFilter[]
  onClearAll: () => void
  className?: string
}) {
  if (items.length === 0) return null

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="text-xs font-semibold text-muted-foreground">Active filters</span>
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={item.onRemove}
          className="inline-flex items-center gap-1 rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary-dark transition-colors hover:bg-primary/20"
        >
          {item.label}
          <X className="h-3 w-3" />
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-xs font-semibold text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
      >
        Clear all
      </button>
    </div>
  )
}
