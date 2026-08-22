import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { MapPin, Clock, Heart, CheckCircle2 } from "lucide-react"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/travel/StarRating"
import { PromoCodeInput } from "@/components/travel/PromoCodeInput"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { formatIDR } from "@/lib/format"
import { getActivityById } from "@/data/activities"
import { useAppState } from "@/context/app-state"
import type { PromoApplication } from "@/data/promotions"
import { cn } from "@/lib/utils"

export default function ActivityDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const activity = getActivityById(id || "")
  const { wishlist, toggleWishlistItem, toggleActivityBooked, trip } = useAppState()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [guests] = useState(2)
  const [promo, setPromo] = useState<PromoApplication | null>(null)

  if (!activity) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">Activity not found.</p>
        <Button asChild className="mt-4"><Link to="/activities">Back to Activities</Link></Button>
      </div>
    )
  }

  const saved = wishlist.activities.includes(activity.id)
  const total = activity.price * guests
  const discount = promo ? Math.min(promo.discount, total) : 0
  const grandTotal = total - discount
  const hasCompassContext = trip.compass.generated

  function handleBook() {
    toggleActivityBooked(activity!.id)
    setConfirmOpen(true)
  }

  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: "Activities", href: "/activities" }, { label: activity.category, href: `/activities/results?category=${activity.category}` }, { label: activity.title }]} />

      <img src={activity.image} alt={activity.title} className="mt-4 h-72 w-full rounded-2xl object-cover sm:h-96" />

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Badge variant="outline">{activity.category}</Badge>
              <h1 className="mt-2 text-2xl font-extrabold text-foreground">{activity.title}</h1>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {activity.location}</p>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><Clock className="h-3.5 w-3.5" /> {activity.duration}</p>
            </div>
            <div className="flex items-center gap-3">
              <StarRating rating={activity.rating} reviewCount={activity.reviewCount} />
              <button
                onClick={() => toggleWishlistItem("activities", activity.id)}
                aria-label={saved ? "Remove from saved" : "Save activity"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
              >
                <Heart className={cn("h-4 w-4", saved && "fill-accent text-accent")} />
              </button>
            </div>
          </div>

          <p className="mt-5 text-muted-foreground">{activity.description}</p>

          {hasCompassContext && activity.compassReason && (
            <Card className="mt-6 border-accent/20 bg-accent-light/40 p-5">
              <p className="flex items-center gap-1.5 font-bold text-accent">Recommended for Day 2</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-foreground">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" /> {activity.compassReason}
              </p>
            </Card>
          )}

          <div className="mt-8">
            <h2 className="font-bold text-foreground">Highlights</h2>
            <ul className="mt-3 space-y-2">
              {activity.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" /> {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Card className="h-fit p-6 lg:sticky lg:top-24">
          <p className="text-2xl font-extrabold text-foreground">{formatIDR(activity.price)}</p>
          <p className="text-xs text-muted-foreground">per person</p>
          <div className="my-4 h-px bg-border" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{formatIDR(activity.price)} x {guests} guests</span>
            <span className="text-foreground">{formatIDR(total)}</span>
          </div>
          {promo && (
            <div className="mt-2 flex justify-between text-sm font-semibold text-success">
              <span>Promo ({promo.promo.code})</span>
              <span>-{formatIDR(discount)}</span>
            </div>
          )}
          <div className="my-4">
            <PromoCodeInput
              subtotal={total}
              product="Activities"
              applied={promo}
              onApply={setPromo}
              onRemove={() => setPromo(null)}
            />
          </div>
          <div className="my-4 h-px bg-border" />
          <div className="flex justify-between text-base font-extrabold text-foreground">
            <span>Total</span>
            <span>{formatIDR(grandTotal)}</span>
          </div>
          <Button size="lg" className="mt-6 w-full" onClick={handleBook}>Book This Activity</Button>
        </Card>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
            <DialogTitle className="text-center">Activity Booking Confirmed</DialogTitle>
            <DialogDescription className="text-center">{activity.title} for {guests} guests is confirmed.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => navigate(hasCompassContext ? "/compass/trip/bali-sep-2026" : "/trips")} className="w-full sm:w-auto">
              {hasCompassContext ? "Return to Compass" : "Go to My Trips"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
