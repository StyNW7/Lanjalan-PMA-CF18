import { useMemo, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { Search as SearchIcon, MapPin, Hotel as HotelIcon, Ticket, Percent } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { SectionHeading } from "@/components/ui/section-heading"
import { DestinationCard } from "@/components/travel/DestinationCard"
import { HotelCard } from "@/components/travel/HotelCard"
import { ActivityCard } from "@/components/travel/ActivityCard"
import { PromoCard } from "@/components/travel/PromoCard"
import { FadeInGrid, FadeInItem } from "@/components/ui/fade-in"
import { destinations } from "@/data/destinations"
import { hotels } from "@/data/hotels"
import { activities } from "@/data/activities"
import { promotions } from "@/data/promotions"
import { useAppState } from "@/context/app-state"

const tabs = ["All", "Destinations", "Hotels", "Activities", "Deals"] as const
type Tab = (typeof tabs)[number]

const suggestions = ["Bali", "Ubud", "Yogyakarta", "cooking class", "sunset", "villa"]

function matches(term: string, fields: (string | undefined)[]) {
  if (!term) return true
  return fields.some((f) => (f || "").toLowerCase().includes(term))
}

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const { wishlist, toggleWishlistItem } = useAppState()
  const [query, setQuery] = useState(params.get("q") || "")
  const [tab, setTab] = useState<Tab>("All")

  function handleQueryChange(next: string) {
    setQuery(next)
    const search = new URLSearchParams()
    if (next.trim()) search.set("q", next.trim())
    setParams(search, { replace: true })
  }

  const term = query.trim().toLowerCase()

  const results = useMemo(
    () => ({
      destinations: destinations.filter((d) => matches(term, [d.name, d.country, d.description, d.tag])),
      hotels: hotels.filter((h) => matches(term, [h.name, h.city, h.neighborhood, h.propertyType])),
      activities: activities.filter((a) => matches(term, [a.title, a.city, a.location, a.category])),
      promotions: promotions.filter((p) => matches(term, [p.title, p.description, p.category, p.code])),
    }),
    [term]
  )

  const counts: Record<Tab, number> = {
    All:
      results.destinations.length + results.hotels.length + results.activities.length + results.promotions.length,
    Destinations: results.destinations.length,
    Hotels: results.hotels.length,
    Activities: results.activities.length,
    Deals: results.promotions.length,
  }

  const show = (section: Tab) => tab === "All" || tab === section
  const nothingFound = counts.All === 0

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary-light via-background to-background py-12">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3.5 py-1.5 text-xs font-bold text-primary-dark shadow-soft">
              <SearchIcon className="h-3.5 w-3.5" /> Search
            </span>
            <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Find anything on Lanjalan.</h1>
            <p className="mt-3 text-muted-foreground">
              Destinations, stays, experiences, and active deals — all in one search.
            </p>
          </div>

          <div className="relative mx-auto mt-7 max-w-2xl">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Try 'Bali', 'villa', or 'cooking class'..."
              aria-label="Search Lanjalan"
              autoFocus
              className="h-12 pl-11 pr-4 text-base"
            />
          </div>

          <div className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleQueryChange(s)}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-10">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                tab === t
                  ? "border-primary bg-primary-light text-primary-dark"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {t}
              <span
                className={`rounded-full px-1.5 text-xs font-bold ${
                  tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {counts[t]}
              </span>
            </button>
          ))}
        </div>

        {nothingFound ? (
          <EmptyState
            icon={SearchIcon}
            title={`No results for "${query}"`}
            description="Try a shorter search, a city name, or browse everything we have."
            actionLabel="Clear Search"
            onAction={() => handleQueryChange("")}
            className="mt-10"
          />
        ) : (
          <div className="mt-10 space-y-14">
            {show("Destinations") && results.destinations.length > 0 && (
              <section>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <SectionHeading
                    title="Destinations"
                    description={`${results.destinations.length} matching ${results.destinations.length === 1 ? "place" : "places"}`}
                  />
                  <Button asChild variant="outline" size="sm"><Link to="/explore">Explore All</Link></Button>
                </div>
                <FadeInGrid className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {results.destinations.map((d, i) => (
                    <FadeInItem key={d.id} index={i}><DestinationCard destination={d} /></FadeInItem>
                  ))}
                </FadeInGrid>
              </section>
            )}

            {show("Hotels") && results.hotels.length > 0 && (
              <section>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <SectionHeading
                    title="Hotels"
                    description={`${results.hotels.length} matching ${results.hotels.length === 1 ? "stay" : "stays"}`}
                  />
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/hotels/results${term ? `?q=${encodeURIComponent(query.trim())}` : ""}`}>
                      All Hotels
                    </Link>
                  </Button>
                </div>
                <FadeInGrid className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {results.hotels.slice(0, 6).map((h, i) => (
                    <FadeInItem key={h.id} index={i}>
                      <HotelCard
                        hotel={h}
                        saved={wishlist.hotels.includes(h.id)}
                        onToggleSave={() => toggleWishlistItem("hotels", h.id)}
                      />
                    </FadeInItem>
                  ))}
                </FadeInGrid>
              </section>
            )}

            {show("Activities") && results.activities.length > 0 && (
              <section>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <SectionHeading
                    title="Activities"
                    description={`${results.activities.length} matching ${results.activities.length === 1 ? "experience" : "experiences"}`}
                  />
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/activities/results${term ? `?q=${encodeURIComponent(query.trim())}` : ""}`}>
                      All Activities
                    </Link>
                  </Button>
                </div>
                <FadeInGrid className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {results.activities.slice(0, 6).map((a, i) => (
                    <FadeInItem key={a.id} index={i}>
                      <ActivityCard
                        activity={a}
                        saved={wishlist.activities.includes(a.id)}
                        onToggleSave={() => toggleWishlistItem("activities", a.id)}
                      />
                    </FadeInItem>
                  ))}
                </FadeInGrid>
              </section>
            )}

            {show("Deals") && results.promotions.length > 0 && (
              <section>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <SectionHeading
                    title="Deals"
                    description={`${results.promotions.length} matching ${results.promotions.length === 1 ? "offer" : "offers"}`}
                  />
                  <Button asChild variant="outline" size="sm"><Link to="/deals">All Deals</Link></Button>
                </div>
                <FadeInGrid className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {results.promotions.slice(0, 3).map((p, i) => (
                    <FadeInItem key={p.id} index={i}><PromoCard promo={p} /></FadeInItem>
                  ))}
                </FadeInGrid>
              </section>
            )}
          </div>
        )}
      </div>

      <section className="container pb-14">
        <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-border bg-muted/40 p-8 text-center">
          <p className="w-full text-sm text-muted-foreground">Not finding it? Jump straight into a category.</p>
          <Button asChild variant="outline" className="gap-1.5"><Link to="/explore"><MapPin className="h-4 w-4" /> Explore</Link></Button>
          <Button asChild variant="outline" className="gap-1.5"><Link to="/hotels"><HotelIcon className="h-4 w-4" /> Hotels</Link></Button>
          <Button asChild variant="outline" className="gap-1.5"><Link to="/activities"><Ticket className="h-4 w-4" /> Activities</Link></Button>
          <Button asChild variant="outline" className="gap-1.5"><Link to="/deals"><Percent className="h-4 w-4" /> Deals</Link></Button>
        </div>
      </section>
    </div>
  )
}
