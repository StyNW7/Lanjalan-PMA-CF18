import { useMemo, useState } from "react"
import { Search, HelpCircle, Plane, Hotel as HotelIcon, Ticket, Compass, CreditCard, RotateCcw, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/ui/empty-state"
import { faqs, helpCategories } from "@/data/help"

const categoryIcon = {
  Flights: Plane,
  Hotels: HotelIcon,
  Activities: Ticket,
  Compass: Compass,
  Payments: CreditCard,
  Refunds: RotateCcw,
  Account: User,
} as const

export default function HelpPage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      if (category && f.category !== category) return false
      if (query && !f.question.toLowerCase().includes(query.toLowerCase()) && !f.answer.toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
  }, [query, category])

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary-light via-background to-background py-14">
        <div className="container text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3.5 py-1.5 text-xs font-bold text-primary-dark shadow-soft">
            <HelpCircle className="h-3.5 w-3.5" /> Help Center
          </span>
          <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">How can we help?</h1>
          <div className="relative mx-auto mt-6 max-w-lg">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for help..."
              className="h-12 rounded-full pl-11"
            />
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setCategory(null)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${!category ? "border-primary bg-primary-light text-primary-dark" : "border-border text-muted-foreground hover:border-primary/40"}`}
          >
            All Topics
          </button>
          {helpCategories.map((cat) => {
            const Icon = categoryIcon[cat]
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${category === cat ? "border-primary bg-primary-light text-primary-dark" : "border-border text-muted-foreground hover:border-primary/40"}`}
              >
                <Icon className="h-3.5 w-3.5" /> {cat}
              </button>
            )
          })}
        </div>

        <div className="mx-auto mt-8 max-w-2xl space-y-3">
          {filtered.length === 0 ? (
            <EmptyState icon={HelpCircle} title="No results found" description="Try a different search term or browse all topics." />
          ) : (
            filtered.map((f) => (
              <Card key={f.id} className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-foreground">{f.question}</p>
                  <Badge variant="muted">{f.category}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{f.answer}</p>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
