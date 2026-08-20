import { useMemo, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { SlidersHorizontal, PlaneTakeoff } from "lucide-react"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { FlightCard } from "@/components/travel/FlightCard"
import { EmptyState } from "@/components/ui/empty-state"
import { FadeInGrid, FadeInItem } from "@/components/ui/fade-in"
import { flights as allFlights, searchFlights } from "@/data/flights"

type SortKey = "recommended" | "cheapest" | "fastest" | "earliest"

export default function FlightResultsPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const origin = params.get("origin") || "CGK"
  const destination = params.get("destination") || "DPS"

  const [sort, setSort] = useState<SortKey>("recommended")
  const [maxPrice, setMaxPrice] = useState(3000000)
  const [airlines, setAirlines] = useState<string[]>([])
  const [nonstopOnly, setNonstopOnly] = useState(false)

  const results = useMemo(() => searchFlights(origin, destination), [origin, destination])
  const availableAirlines = useMemo(() => Array.from(new Set(results.map((f) => f.airline))), [results])

  const filtered = useMemo(() => {
    let list = results.filter((f) => f.price <= maxPrice)
    if (airlines.length > 0) list = list.filter((f) => airlines.includes(f.airline))
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
  }, [results, maxPrice, airlines, nonstopOnly, sort])

  function toggleAirline(airline: string) {
    setAirlines((prev) => (prev.includes(airline) ? prev.filter((a) => a !== airline) : [...prev, airline]))
  }

  function handleSelect(flightId: string) {
    const flight = allFlights.find((f) => f.id === flightId)
    if (flight) navigate("/flights/checkout", { state: { flight } })
  }

  const originCity = results[0]?.origin.city || origin
  const destCity = results[0]?.destination.city || destination

  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: "Flights", href: "/flights" }, { label: `${originCity} to ${destCity}` }]} />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">
            {originCity} <PlaneTakeoff className="inline h-5 w-5 -translate-y-0.5 text-primary" /> {destCity}
          </h1>
          <p className="text-sm text-muted-foreground">{filtered.length} flights found</p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="sort" className="text-sm text-muted-foreground">Sort by</Label>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger id="sort" className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="cheapest">Cheapest</SelectItem>
              <SelectItem value="fastest">Fastest</SelectItem>
              <SelectItem value="earliest">Earliest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
        <Card className="h-fit p-5 lg:col-span-1">
          <p className="mb-4 flex items-center gap-1.5 font-bold text-foreground">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </p>

          <div>
            <Label className="text-sm">Max Price</Label>
            <input
              type="range"
              min={500000}
              max={3000000}
              step={50000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
            <p className="mt-1 text-xs text-muted-foreground">Up to IDR {maxPrice.toLocaleString("id-ID")}</p>
          </div>

          <div className="mt-6">
            <Label className="text-sm">Airline</Label>
            <div className="mt-2 space-y-2">
              {availableAirlines.map((airline) => (
                <label key={airline} className="flex items-center gap-2 text-sm text-foreground">
                  <Checkbox checked={airlines.includes(airline)} onCheckedChange={() => toggleAirline(airline)} />
                  {airline}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <Label className="text-sm">Stops</Label>
            <label className="mt-2 flex items-center gap-2 text-sm text-foreground">
              <Checkbox checked={nonstopOnly} onCheckedChange={(v) => setNonstopOnly(Boolean(v))} />
              Nonstop only
            </label>
          </div>
        </Card>

        <FadeInGrid className="space-y-4 lg:col-span-3">
          {filtered.length === 0 ? (
            <EmptyState icon={PlaneTakeoff} title="No flights match your filters" description="Try adjusting your filters to see more results." />
          ) : (
            filtered.map((flight) => (
              <FadeInItem key={flight.id}>
                <FlightCard flight={flight} onSelect={() => handleSelect(flight.id)} />
              </FadeInItem>
            ))
          )}
        </FadeInGrid>
      </div>

      {airlines.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {airlines.map((a) => (
            <Badge key={a} variant="secondary">{a}</Badge>
          ))}
        </div>
      )}
    </div>
  )
}
