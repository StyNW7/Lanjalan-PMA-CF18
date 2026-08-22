import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Ticket, Search } from "lucide-react"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ActivityCard } from "@/components/travel/ActivityCard"
import { EmptyState } from "@/components/ui/empty-state"
import { FadeInGrid, FadeInItem } from "@/components/ui/fade-in"
import { FilterPanel, FilterSection, FilterPills, ActiveFilters, type ActiveFilter } from "@/components/travel/FilterPanel"
import { activities } from "@/data/activities"
import { useAppState } from "@/context/app-state"
import type { ActivityCategory } from "@/data/types"

const categories: ActivityCategory[] = ["Adventure", "Food", "Culture", "Nature", "Family", "Nightlife", "Relaxation"]
const cities = ["All", ...Array.from(new Set(activities.map((a) => a.city)))]

const PRICE_MAX = Math.ceil(Math.max(...activities.map((a) => a.price)) / 10000) * 10000
const PRICE_MIN = Math.floor(Math.min(...activities.map((a) => a.price)) / 10000) * 10000

type SortKey = "recommended" | "price-low" | "price-high" | "rating"

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
]

export default function ActivityResultsPage() {
  const [params, setParams] = useSearchParams()
  const { wishlist, toggleWishlistItem } = useAppState()

  const categoryParam = params.get("category") as ActivityCategory | null
  const cityParam = params.get("city") || "All"

  const [selected, setSelected] = useState<ActivityCategory[]>(
    categoryParam && categories.includes(categoryParam) ? [categoryParam] : []
  )
  const [city, setCity] = useState(cities.includes(cityParam) ? cityParam : "All")
  const [query, setQuery] = useState(params.get("q") || "")
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX)
  const [minRating, setMinRating] = useState(0)
  const [sort, setSort] = useState<SortKey>("recommended")

  function syncUrl(next: { city?: string; query?: string; categories?: ActivityCategory[] }) {
    const nextCity = next.city ?? city
    const nextQuery = next.query ?? query
    const nextCategories = next.categories ?? selected
    const search = new URLSearchParams()
    if (nextCity !== "All") search.set("city", nextCity)
    if (nextQuery.trim()) search.set("q", nextQuery.trim())
    if (nextCategories.length === 1) search.set("category", nextCategories[0])
    setParams(search, { replace: true })
  }

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    const list = activities.filter((a) => {
      if (selected.length > 0 && !selected.includes(a.category)) return false
      if (city !== "All" && a.city !== city) return false
      if (a.price > maxPrice) return false
      if (a.rating < minRating) return false
      if (term && ![a.title, a.location, a.city, a.category].some((f) => f.toLowerCase().includes(term))) return false
      return true
    })

    switch (sort) {
      case "price-low":
        return [...list].sort((a, b) => a.price - b.price)
      case "price-high":
        return [...list].sort((a, b) => b.price - a.price)
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating)
      default:
        return [...list].sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    }
  }, [selected, city, query, maxPrice, minRating, sort])

  function toggleCategory(category: ActivityCategory) {
    const next = selected.includes(category) ? selected.filter((c) => c !== category) : [...selected, category]
    setSelected(next)
    syncUrl({ categories: next })
  }

  function handleCityChange(nextCity: string) {
    setCity(nextCity)
    syncUrl({ city: nextCity })
  }

  function handleQueryChange(nextQuery: string) {
    setQuery(nextQuery)
    syncUrl({ query: nextQuery })
  }

  function resetFilters() {
    setSelected([])
    setMaxPrice(PRICE_MAX)
    setMinRating(0)
    setCity("All")
    syncUrl({ categories: [], city: "All" })
  }

  const activeFilters: ActiveFilter[] = [
    ...(city !== "All" ? [{ label: city, onRemove: () => handleCityChange("All") }] : []),
    ...selected.map((c) => ({ label: c, onRemove: () => toggleCategory(c) })),
    ...(maxPrice < PRICE_MAX
      ? [{ label: `Under IDR ${maxPrice.toLocaleString("id-ID")}`, onRemove: () => setMaxPrice(PRICE_MAX) }]
      : []),
    ...(minRating > 0 ? [{ label: `${minRating}+ rating`, onRemove: () => setMinRating(0) }] : []),
  ]

  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: "Activities", href: "/activities" }, { label: "All Experiences" }]} />

      <div className="mt-4">
        <h1 className="flex items-center gap-2 text-2xl font-extrabold text-foreground">
          <Ticket className="h-5 w-5 text-primary" /> Activities &amp; Experiences
        </h1>
        <p className="text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "experience" : "experiences"} found
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search experiences, places, or categories..."
            aria-label="Search activities"
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 sm:w-56">
          <Label htmlFor="activity-sort" className="shrink-0 text-sm text-muted-foreground">Sort</Label>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger id="activity-sort"><SelectValue /></SelectTrigger>
            <SelectContent>
              {sortOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ActiveFilters items={activeFilters} onClearAll={resetFilters} className="mt-4" />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
        <FilterPanel activeCount={activeFilters.length} onReset={resetFilters} className="lg:col-span-1">
          <FilterSection label="Destination">
            <FilterPills
              options={cities.map((c) => ({ value: c, label: c === "All" ? "All cities" : c }))}
              value={city}
              onChange={handleCityChange}
            />
          </FilterSection>

          <FilterSection label="Category">
            <div className="space-y-2">
              {categories.map((c) => (
                <label key={c} className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                  <Checkbox checked={selected.includes(c)} onCheckedChange={() => toggleCategory(c)} /> {c}
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection label="Max Price">
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={10000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="Maximum price per person"
              className="w-full accent-primary"
            />
            <p className="mt-1 text-xs text-muted-foreground">Up to IDR {maxPrice.toLocaleString("id-ID")}</p>
          </FilterSection>

          <FilterSection label="Minimum Rating">
            <FilterPills
              options={[
                { value: 0, label: "Any" },
                { value: 4, label: "4.0+" },
                { value: 4.5, label: "4.5+" },
              ]}
              value={minRating}
              onChange={setMinRating}
            />
          </FilterSection>
        </FilterPanel>

        <div className="lg:col-span-3">
          {filtered.length === 0 ? (
            <EmptyState
              icon={Ticket}
              title="No activities match your filters"
              description="Try a different category, city, or budget to see more experiences."
              actionLabel="Reset Filters"
              onAction={resetFilters}
            />
          ) : (
            <FadeInGrid className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((activity, i) => (
                <FadeInItem key={activity.id} index={i}>
                  <ActivityCard
                    activity={activity}
                    saved={wishlist.activities.includes(activity.id)}
                    onToggleSave={() => toggleWishlistItem("activities", activity.id)}
                  />
                </FadeInItem>
              ))}
            </FadeInGrid>
          )}
        </div>
      </div>
    </div>
  )
}
