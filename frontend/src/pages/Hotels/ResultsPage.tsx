import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Hotel as HotelIcon, Sparkles, Search } from "lucide-react"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { HotelCard } from "@/components/travel/HotelCard"
import { EmptyState } from "@/components/ui/empty-state"
import { FadeInGrid, FadeInItem } from "@/components/ui/fade-in"
import { FilterPanel, FilterSection, FilterPills, ActiveFilters, type ActiveFilter } from "@/components/travel/FilterPanel"
import { hotels } from "@/data/hotels"
import { useAppState } from "@/context/app-state"

const propertyTypes = ["Hotel", "Villa", "Resort", "Guesthouse", "Apartment"] as const
const cities = ["All", ...Array.from(new Set(hotels.map((h) => h.city)))]

const PRICE_MAX = Math.ceil(Math.max(...hotels.map((h) => h.pricePerNight)) / 50000) * 50000
const PRICE_MIN = Math.floor(Math.min(...hotels.map((h) => h.pricePerNight)) / 50000) * 50000

type SortKey = "recommended" | "price-low" | "price-high" | "rating"

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
]

export default function HotelResultsPage() {
  const [params, setParams] = useSearchParams()
  const { wishlist, toggleWishlistItem, trip } = useAppState()

  const cityParam = params.get("destination") || "All"
  const [city, setCity] = useState(cities.includes(cityParam) ? cityParam : "All")
  const [query, setQuery] = useState(params.get("q") || "")
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX)
  const [minRating, setMinRating] = useState(0)
  const [types, setTypes] = useState<string[]>([])
  const [hoods, setHoods] = useState<string[]>([])
  const [freeCancel, setFreeCancel] = useState(false)
  const [sort, setSort] = useState<SortKey>("recommended")

  // Keep the URL in step with the destination + query so results stay shareable.
  function syncUrl(nextCity: string, nextQuery: string) {
    const next = new URLSearchParams()
    if (nextCity !== "All") next.set("destination", nextCity)
    if (nextQuery.trim()) next.set("q", nextQuery.trim())
    setParams(next, { replace: true })
  }

  function handleCityChange(nextCity: string) {
    setCity(nextCity)
    syncUrl(nextCity, query)
  }

  function handleQueryChange(nextQuery: string) {
    setQuery(nextQuery)
    syncUrl(city, nextQuery)
  }

  const hasCompassContext = trip.compass.generated

  // Only offer neighbourhoods that actually exist in the selected city.
  const neighborhoods = useMemo(
    () =>
      Array.from(
        new Set(hotels.filter((h) => city === "All" || h.city === city).map((h) => h.neighborhood))
      ).sort(),
    [city]
  )

  // Drop neighbourhood selections that no longer apply after a city change.
  useEffect(() => {
    setHoods((prev) => (prev.every((h) => neighborhoods.includes(h)) ? prev : prev.filter((h) => neighborhoods.includes(h))))
  }, [neighborhoods])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    const list = hotels.filter((h) => {
      if (city !== "All" && h.city !== city) return false
      if (h.pricePerNight > maxPrice) return false
      if (h.rating < minRating) return false
      if (types.length > 0 && !types.includes(h.propertyType)) return false
      if (hoods.length > 0 && !hoods.includes(h.neighborhood)) return false
      if (freeCancel && !h.freeCancellation) return false
      if (term && ![h.name, h.city, h.neighborhood, h.propertyType].some((f) => f.toLowerCase().includes(term)))
        return false
      return true
    })

    switch (sort) {
      case "price-low":
        return [...list].sort((a, b) => a.pricePerNight - b.pricePerNight)
      case "price-high":
        return [...list].sort((a, b) => b.pricePerNight - a.pricePerNight)
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating)
      default:
        return [...list].sort((a, b) => (b.tripMatch || 0) - (a.tripMatch || 0) || b.rating - a.rating)
    }
  }, [city, query, maxPrice, minRating, types, hoods, freeCancel, sort])

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  function resetFilters() {
    setMaxPrice(PRICE_MAX)
    setMinRating(0)
    setTypes([])
    setHoods([])
    setFreeCancel(false)
  }

  const activeFilters: ActiveFilter[] = [
    ...(maxPrice < PRICE_MAX
      ? [{ label: `Under IDR ${maxPrice.toLocaleString("id-ID")}`, onRemove: () => setMaxPrice(PRICE_MAX) }]
      : []),
    ...(minRating > 0 ? [{ label: `${minRating}+ rating`, onRemove: () => setMinRating(0) }] : []),
    ...hoods.map((h) => ({ label: h, onRemove: () => setHoods((prev) => prev.filter((v) => v !== h)) })),
    ...types.map((t) => ({ label: t, onRemove: () => setTypes((prev) => prev.filter((v) => v !== t)) })),
    ...(freeCancel ? [{ label: "Free cancellation", onRemove: () => setFreeCancel(false) }] : []),
  ]

  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: "Hotels", href: "/hotels" }, { label: city === "All" ? "All Destinations" : city }]} />

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold text-foreground">
            <HotelIcon className="h-5 w-5 text-primary" />
            {city === "All" ? "All Stays" : `Hotels in ${city}`}
          </h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
          </p>
        </div>
        {hasCompassContext && (
          <Badge variant="accent" className="gap-1">
            <Sparkles className="h-3 w-3" /> Showing Trip Match for your plan
          </Badge>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search by hotel name, area, or city..."
            aria-label="Search hotels"
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 sm:w-56">
          <Label htmlFor="hotel-sort" className="shrink-0 text-sm text-muted-foreground">Sort</Label>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger id="hotel-sort"><SelectValue /></SelectTrigger>
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

          <FilterSection label="Max Price / Night">
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={50000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="Maximum price per night"
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

          <FilterSection label="Neighborhood">
            <div className="space-y-2">
              {neighborhoods.map((n) => (
                <label key={n} className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                  <Checkbox checked={hoods.includes(n)} onCheckedChange={() => toggle(hoods, setHoods, n)} /> {n}
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection label="Property Type">
            <div className="space-y-2">
              {propertyTypes.map((t) => (
                <label key={t} className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                  <Checkbox checked={types.includes(t)} onCheckedChange={() => toggle(types, setTypes, t)} /> {t}
                </label>
              ))}
            </div>
          </FilterSection>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <Checkbox checked={freeCancel} onCheckedChange={(v) => setFreeCancel(Boolean(v))} /> Free cancellation only
          </label>
        </FilterPanel>

        <div className="lg:col-span-3">
          {filtered.length === 0 ? (
            <EmptyState
              icon={HotelIcon}
              title="No hotels match your filters"
              description="Try widening your budget or clearing a filter to see more stays."
              actionLabel="Reset Filters"
              onAction={resetFilters}
            />
          ) : (
            <FadeInGrid className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((hotel, i) => (
                <FadeInItem key={hotel.id} index={i}>
                  <HotelCard
                    hotel={hotel}
                    showMatch={hasCompassContext}
                    saved={wishlist.hotels.includes(hotel.id)}
                    onToggleSave={() => toggleWishlistItem("hotels", hotel.id)}
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
