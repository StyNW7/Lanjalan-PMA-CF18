import { Link } from "react-router-dom"
import { MapPin, ShieldCheck, Sparkles, Heart } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StarRating } from "./StarRating"
import { formatIDR } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Hotel } from "@/data/types"

export function HotelCard({
  hotel,
  showMatch = false,
  saved = false,
  onToggleSave,
}: {
  hotel: Hotel
  showMatch?: boolean
  saved?: boolean
  onToggleSave?: () => void
}) {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-card">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant="outline" className="bg-background/90">{hotel.propertyType}</Badge>
          {showMatch && hotel.tripMatch && (
            <Badge variant="accent" className="gap-1">
              <Sparkles className="h-3 w-3" /> {hotel.tripMatch}% Trip Match
            </Badge>
          )}
        </div>
        {onToggleSave && (
          <button
            onClick={onToggleSave}
            aria-label={saved ? "Remove from saved" : "Save hotel"}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground transition-colors hover:bg-background"
          >
            <Heart className={cn("h-4 w-4", saved && "fill-accent text-accent")} />
          </button>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold leading-tight text-foreground">{hotel.name}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {hotel.neighborhood}, {hotel.city}
            </p>
          </div>
          <StarRating rating={hotel.rating} reviewCount={hotel.reviewCount} className="shrink-0" />
        </div>

        {showMatch && hotel.matchReasons && (
          <div className="mt-3 rounded-xl bg-accent-light p-3">
            <p className="mb-1.5 text-xs font-bold text-accent">Why this fits your trip</p>
            <ul className="space-y-1">
              {hotel.matchReasons.slice(0, 2).map((reason) => (
                <li key={reason} className="text-xs text-foreground/80">• {reason}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {hotel.freeCancellation && (
              <span className="flex items-center gap-1 text-xs font-medium text-success">
                <ShieldCheck className="h-3.5 w-3.5" /> Free cancellation
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="text-lg font-extrabold text-foreground">{formatIDR(hotel.pricePerNight)}</p>
            <p className="text-xs text-muted-foreground">per night</p>
          </div>
          <Button asChild size="sm">
            <Link to={`/hotels/${hotel.id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}
