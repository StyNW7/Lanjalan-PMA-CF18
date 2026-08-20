import { useMemo, useState } from "react"
import { Hotel as HotelIcon, SlidersHorizontal, Sparkles } from "lucide-react"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { HotelCard } from "@/components/travel/HotelCard"
import { EmptyState } from "@/components/ui/empty-state"
import { FadeInGrid, FadeInItem } from "@/components/ui/fade-in"
import { hotels } from "@/data/hotels"
import { useAppState } from "@/context/app-state"

const propertyTypes = ["Hotel", "Villa", "Resort", "Guesthouse", "Apartment"] as const
const neighborhoods = ["Seminyak", "Ubud", "Kuta", "Sanur", "Canggu", "Nusa Dua"]

export default function HotelResultsPage() {
  const { wishlist, toggleWishlistItem, trip } = useAppState()
  const [maxPrice, setMaxPrice] = useState(1600000)
  const [minRating, setMinRating] = useState(0)
  const [types, setTypes] = useState<string[]>([])
  const [hoods, setHoods] = useState<string[]>([])
  const [freeCancel, setFreeCancel] = useState(false)

  const hasCompassContext = trip.compass.generated

  const filtered = useMemo(() => {
    return hotels.filter((h) => {
      if (h.city !== "Bali") return false
      if (h.pricePerNight > maxPrice) return false
      if (h.rating < minRating) return false
      if (types.length > 0 && !types.includes(h.propertyType)) return false
      if (hoods.length > 0 && !hoods.includes(h.neighborhood)) return false
      if (freeCancel && !h.freeCancellation) return false
      return true
    })
  }, [maxPrice, minRating, types, hoods, freeCancel])

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: "Hotels", href: "/hotels" }, { label: "Bali" }]} />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold text-foreground">
            <HotelIcon className="h-5 w-5 text-primary" /> Hotels in Bali
          </h1>
          <p className="text-sm text-muted-foreground">{filtered.length} properties found</p>
        </div>
        {hasCompassContext && (
          <Badge variant="accent" className="gap-1"><Sparkles className="h-3 w-3" /> Showing Trip Match for your Bali plan</Badge>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
        <Card className="h-fit p-5 lg:col-span-1">
          <p className="mb-4 flex items-center gap-1.5 font-bold text-foreground">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </p>

          <div>
            <Label className="text-sm">Max Price / Night</Label>
            <input type="range" min={300000} max={1600000} step={50000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mt-2 w-full accent-primary" />
            <p className="mt-1 text-xs text-muted-foreground">Up to IDR {maxPrice.toLocaleString("id-ID")}</p>
          </div>

          <div className="mt-6">
            <Label className="text-sm">Minimum Rating</Label>
            <div className="mt-2 flex gap-2">
              {[0, 4, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${minRating === r ? "border-primary bg-primary-light text-primary-dark" : "border-border text-muted-foreground"}`}
                >
                  {r === 0 ? "Any" : `${r}+`}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <Label className="text-sm">Neighborhood</Label>
            <div className="mt-2 space-y-2">
              {neighborhoods.map((n) => (
                <label key={n} className="flex items-center gap-2 text-sm text-foreground">
                  <Checkbox checked={hoods.includes(n)} onCheckedChange={() => toggle(hoods, setHoods, n)} /> {n}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <Label className="text-sm">Property Type</Label>
            <div className="mt-2 space-y-2">
              {propertyTypes.map((t) => (
                <label key={t} className="flex items-center gap-2 text-sm text-foreground">
                  <Checkbox checked={types.includes(t)} onCheckedChange={() => toggle(types, setTypes, t)} /> {t}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <Checkbox checked={freeCancel} onCheckedChange={(v) => setFreeCancel(Boolean(v))} /> Free cancellation only
            </label>
          </div>
        </Card>

        <FadeInGrid className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
          {filtered.length === 0 ? (
            <div className="sm:col-span-2 lg:col-span-3">
              <EmptyState icon={HotelIcon} title="No hotels match your filters" description="Try adjusting your filters to see more results." />
            </div>
          ) : (
            filtered.map((hotel) => (
              <FadeInItem key={hotel.id}>
                <HotelCard
                  hotel={hotel}
                  showMatch={hasCompassContext}
                  saved={wishlist.hotels.includes(hotel.id)}
                  onToggleSave={() => toggleWishlistItem("hotels", hotel.id)}
                />
              </FadeInItem>
            ))
          )}
        </FadeInGrid>
      </div>
    </div>
  )
}
