import { useMemo, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { PlaneTakeoff } from "lucide-react"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { FlightCard } from "@/components/travel/FlightCard"
import { EmptyState } from "@/components/ui/empty-state"
import { FadeInGrid, FadeInItem } from "@/components/ui/fade-in"
import { FilterPanel, FilterSection, ActiveFilters, type ActiveFilter } from "@/components/travel/FilterPanel"
import { flights as allFlights, searchFlights } from "@/data/flights"
import type { CabinClass } from "@/data/types"

type SortKey = "recommended" | "cheapest" | "fastest" | "earliest"

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "cheapest", label: "Cheapest" },
  { value: "fastest", label: "Fastest" },
  { value: "earliest", label: "Earliest" },
]

const PRICE_MAX = 3000000
const PRICE_MIN = 500000

export default function FlightResultsPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const origin = params.get("origin") || "CGK"
  const destination = params.get("destination") || "DPS"

  const [sort, setSort] = useState<SortKey>("recommended")
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX)
  const [airlines, setAirlines] = useState<string[]>([])
  const [cabins, setCabins] = useState<CabinClass[]>([])
  const [nonstopOnly, setNonstopOnly] = useState(false)

  const results = useMemo(() => searchFlights(origin, destination), [origin, destination])
  const availableAirlines = useMemo(() => Array.from(new Set(results.map((f) => f.airline))), [results])
  const availableCabins = useMemo(() => Array.from(new Set(results.map((f) => f.cabin))), [results])

  const filtered = useMemo(() => {
    let list = results.filter((f) => f.price <= maxPrice)
    if (airlines.length > 0) list = list.filter((f) => airlines.includes(f.airline))
    if (cabins.length > 0) list = list.filter((f) => cabins.includes(f.cabin))
    if (nonstopOnly) list = list.filter((f) => f.stops === 0)

    switch (sort) {
      case "cheapest":
        return [...list].sort((a, b) => a.price - b.price)
      case "fastest":
        return [...list].sort((a, b) => a.duration.localeCompare(b.duration))
      case "earliest":
        return [...list].sort((a, b) => a.departTime.localeCompare(b.departTime))
      default:
        return [...list].sort((a, b) => Number(b.recommended) - Number(a.recommended))
    }
  }, [results, maxPrice, airlines, cabins, nonstopOnly, sort])

  function toggleAirline(airline: string) {
    setAirlines((prev) => (prev.includes(airline) ? prev.filter((a) => a !== airline) : [...prev, airline]))
  }

  function toggleCabin(cabin: CabinClass) {
    setCabins((prev) => (prev.includes(cabin) ? prev.filter((c) => c !== cabin) : [...prev, cabin]))
  }

  function resetFilters() {
    setMaxPrice(PRICE_MAX)
    setAirlines([])
    setCabins([])
    setNonstopOnly(false)
  }

  function handleSelect(flightId: string) {
    const flight = allFlights.find((f) => f.id === flightId)
    if (flight) navigate("/flights/checkout", { state: { flight } })
  }

  const activeFilters: ActiveFilter[] = [
    ...(maxPrice < PRICE_MAX
      ? [{ label: `Under IDR ${maxPrice.toLocaleString("id-ID")}`, onRemove: () => setMaxPrice(PRICE_MAX) }]
      : []),
    ...airlines.map((a) => ({ label: a, onRemove: () => toggleAirline(a) })),
    ...cabins.map((c) => ({ label: c, onRemove: () => toggleCabin(c) })),
    ...(nonstopOnly ? [{ label: "Nonstop only", onRemove: () => setNonstopOnly(false) }] : []),
  ]

  const originCity = results[0]?.origin.city || origin
  const destCity = results[0]?.destination.city || destination

  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: "Flights", href: "/flights" }, { label: `${originCity} to ${destCity}` }]} />

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold text-foreground">
            {originCity} <PlaneTakeoff className="inline h-5 w-5 -translate-y-0.5 text-primary" /> {destCity}
          </h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "flight" : "flights"} found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="sort" className="shrink-0 text-sm text-muted-foreground">Sort by</Label>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger id="sort" className="w-44"><SelectValue /></SelectTrigger>
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
          <FilterSection label="Max Price">
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={50000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="Maximum flight price"
              className="w-full accent-primary"
            />
            <p className="mt-1 text-xs text-muted-foreground">Up to IDR {maxPrice.toLocaleString("id-ID")}</p>
          </FilterSection>

          <FilterSection label="Airline">
            <div className="space-y-2">
              {availableAirlines.map((airline) => (
                <label key={airline} className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                  <Checkbox checked={airlines.includes(airline)} onCheckedChange={() => toggleAirline(airline)} />
                  {airline}
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection label="Cabin">
            <div className="space-y-2">
              {availableCabins.map((cabin) => (
                <label key={cabin} className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                  <Checkbox checked={cabins.includes(cabin)} onCheckedChange={() => toggleCabin(cabin)} />
                  {cabin}
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection label="Stops">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
              <Checkbox checked={nonstopOnly} onCheckedChange={(v) => setNonstopOnly(Boolean(v))} />
              Nonstop only
            </label>
          </FilterSection>
        </FilterPanel>

        <div className="lg:col-span-3">
          {filtered.length === 0 ? (
            <EmptyState
              icon={PlaneTakeoff}
              title="No flights match your filters"
              description="Try raising your budget or clearing an airline filter to see more options."
              actionLabel="Reset Filters"
              onAction={resetFilters}
            />
          ) : (
            <FadeInGrid className="space-y-4">
              {filtered.map((flight, i) => (
                <FadeInItem key={flight.id} index={i}>
                  <FlightCard flight={flight} onSelect={() => handleSelect(flight.id)} />
                </FadeInItem>
              ))}
            </FadeInGrid>
          )}
        </div>
      </div>
    </div>
  )
}
