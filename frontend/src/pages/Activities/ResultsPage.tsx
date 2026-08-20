import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Ticket, SlidersHorizontal } from "lucide-react"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ActivityCard } from "@/components/travel/ActivityCard"
import { EmptyState } from "@/components/ui/empty-state"
import { FadeInGrid, FadeInItem } from "@/components/ui/fade-in"
import { activities } from "@/data/activities"
import { useAppState } from "@/context/app-state"
import type { ActivityCategory } from "@/data/types"

const categories: ActivityCategory[] = ["Adventure", "Food", "Culture", "Nature", "Family", "Nightlife", "Relaxation"]

export default function ActivityResultsPage() {
  const [params] = useSearchParams()
  const { wishlist, toggleWishlistItem } = useAppState()
  const initialCategory = params.get("category") as ActivityCategory | null

  const [selected, setSelected] = useState<ActivityCategory[]>(initialCategory ? [initialCategory] : [])
  const [maxPrice, setMaxPrice] = useState(2000000)

  const filtered = useMemo(() => {
    return activities.filter((a) => {
      if (selected.length > 0 && !selected.includes(a.category)) return false
      if (a.price > maxPrice) return false
      return true
    })
  }, [selected, maxPrice])

  function toggle(category: ActivityCategory) {
    setSelected((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]))
  }

  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: "Activities", href: "/activities" }, { label: "All Experiences" }]} />
      <h1 className="mt-4 flex items-center gap-2 text-2xl font-extrabold text-foreground">
        <Ticket className="h-5 w-5 text-primary" /> Activities & Experiences
      </h1>
      <p className="text-sm text-muted-foreground">{filtered.length} experiences found</p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
        <Card className="h-fit p-5 lg:col-span-1">
          <p className="mb-4 flex items-center gap-1.5 font-bold text-foreground">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </p>
          <div>
            <Label className="text-sm">Category</Label>
            <div className="mt-2 space-y-2">
              {categories.map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm text-foreground">
                  <Checkbox checked={selected.includes(c)} onCheckedChange={() => toggle(c)} /> {c}
                </label>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <Label className="text-sm">Max Price</Label>
            <input type="range" min={90000} max={2000000} step={10000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mt-2 w-full accent-primary" />
            <p className="mt-1 text-xs text-muted-foreground">Up to IDR {maxPrice.toLocaleString("id-ID")}</p>
          </div>
        </Card>

        <FadeInGrid className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
          {filtered.length === 0 ? (
            <div className="sm:col-span-2 lg:col-span-3">
              <EmptyState icon={Ticket} title="No activities match your filters" description="Try selecting a different category or budget." />
            </div>
          ) : (
            filtered.map((activity) => (
              <FadeInItem key={activity.id}>
                <ActivityCard
                  activity={activity}
                  saved={wishlist.activities.includes(activity.id)}
                  onToggleSave={() => toggleWishlistItem("activities", activity.id)}
                />
              </FadeInItem>
            ))
          )}
        </FadeInGrid>
      </div>
    </div>
  )
}
