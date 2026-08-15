import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { MapPin, ShieldCheck, Sparkles, Heart, CheckCircle2, Wifi, Waves, Coffee, Dumbbell, Car } from "lucide-react"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/travel/StarRating"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { formatIDR } from "@/lib/format"
import { getHotelById } from "@/data/hotels"
import { useAppState } from "@/context/app-state"
import { cn } from "@/lib/utils"

const amenityIcons: Record<string, typeof Wifi> = {
  "Free Wi-Fi": Wifi,
  Pool: Waves,
  "Breakfast Included": Coffee,
  Gym: Dumbbell,
  "Airport Shuttle": Car,
}

export default function HotelDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const hotel = getHotelById(id || "")
  const { wishlist, toggleWishlistItem, bookHotel, trip } = useAppState()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [nights] = useState(3)

  if (!hotel) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">Hotel not found.</p>
        <Button asChild className="mt-4"><Link to="/hotels">Back to Hotels</Link></Button>
      </div>
    )
  }

  const saved = wishlist.hotels.includes(hotel.id)
  const total = hotel.pricePerNight * nights
  const hasCompassContext = trip.compass.generated

  function handleBook() {
    bookHotel(hotel!.id, hotel!.name)
    setConfirmOpen(true)
  }

  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: "Hotels", href: "/hotels" }, { label: hotel.city, href: "/hotels/results" }, { label: hotel.name }]} />

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-4 sm:gap-3">
        <img src={hotel.images[0] || hotel.image} alt={hotel.name} className="h-72 w-full rounded-2xl object-cover sm:col-span-2 sm:row-span-2" />
        {hotel.images.slice(1, 3).map((img) => (
          <img key={img} src={img} alt={hotel.name} className="hidden h-[8.6rem] w-full rounded-2xl object-cover sm:block" />
        ))}
        {!hotel.images[1] && <img src={hotel.image} alt={hotel.name} className="hidden h-[8.6rem] w-full rounded-2xl object-cover sm:block" />}
        {!hotel.images[2] && <img src={hotel.image} alt={hotel.name} className="hidden h-[8.6rem] w-full rounded-2xl object-cover sm:block" />}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{hotel.propertyType}</Badge>
                {hasCompassContext && hotel.tripMatch && (
                  <Badge variant="accent" className="gap-1"><Sparkles className="h-3 w-3" /> {hotel.tripMatch}% Trip Match</Badge>
                )}
              </div>
              <h1 className="mt-2 text-2xl font-extrabold text-foreground">{hotel.name}</h1>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {hotel.neighborhood}, {hotel.city} · {hotel.distanceFromCenter}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <StarRating rating={hotel.rating} reviewCount={hotel.reviewCount} />
              <button
                onClick={() => toggleWishlistItem("hotels", hotel.id)}
                aria-label={saved ? "Remove from saved" : "Save hotel"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
              >
                <Heart className={cn("h-4 w-4", saved && "fill-accent text-accent")} />
              </button>
            </div>
          </div>

          <p className="mt-5 text-muted-foreground">{hotel.description}</p>

          {hasCompassContext && hotel.matchReasons && (
            <Card className="mt-6 border-accent/20 bg-accent-light/40 p-5">
              <p className="flex items-center gap-1.5 font-bold text-accent"><Sparkles className="h-4 w-4" /> Why this fits your trip</p>
              <ul className="mt-3 space-y-1.5">
                {hotel.matchReasons.map((reason) => (
                  <li key={reason} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" /> {reason}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <div className="mt-8">
            <h2 className="font-bold text-foreground">Amenities</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {hotel.amenities.map((amenity) => {
                const Icon = amenityIcons[amenity] || CheckCircle2
                return (
                  <div key={amenity} className="flex items-center gap-2 text-sm text-foreground">
                    <Icon className="h-4 w-4 text-primary" /> {amenity}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <Card className="h-fit p-6 lg:sticky lg:top-24">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-extrabold text-foreground">{formatIDR(hotel.pricePerNight)}</p>
              <p className="text-xs text-muted-foreground">per night</p>
            </div>
            {hotel.freeCancellation && (
              <span className="flex items-center gap-1 text-xs font-semibold text-success">
                <ShieldCheck className="h-3.5 w-3.5" /> Free cancellation
              </span>
            )}
          </div>
          <div className="my-4 h-px bg-border" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">{formatIDR(hotel.pricePerNight)} x {nights} nights</span><span className="text-foreground">{formatIDR(total)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Taxes & fees</span><span className="text-foreground">{formatIDR(Math.round(total * 0.1))}</span></div>
          </div>
          <div className="my-4 h-px bg-border" />
          <div className="flex justify-between text-base font-extrabold text-foreground">
            <span>Total</span>
            <span>{formatIDR(total + Math.round(total * 0.1))}</span>
          </div>
          <Button size="lg" className="mt-6 w-full" onClick={handleBook}>Book This Hotel</Button>
        </Card>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
            <DialogTitle className="text-center">Hotel Booked</DialogTitle>
            <DialogDescription className="text-center">
              {hotel.name} is confirmed for your trip. Its status will now show as Booked.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            {hasCompassContext ? (
              <Button onClick={() => navigate("/compass/trip/bali-sep-2026")} className="w-full sm:w-auto">
                Return to Compass
              </Button>
            ) : (
              <Button onClick={() => navigate("/trips")} className="w-full sm:w-auto">
                Go to My Trips
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
