import { Link } from "react-router-dom"
import { Building2, Ticket } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatIDR } from "@/lib/format"
import type { Destination } from "@/data/types"

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      to={`/destinations/${destination.id}`}
      className="group relative block h-80 overflow-hidden rounded-2xl shadow-card transition-shadow hover:shadow-lift"
    >
      <img
        src={destination.image}
        alt={destination.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      {destination.tag && (
        <Badge variant="accent" className="absolute left-4 top-4">{destination.tag}</Badge>
      )}
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h3 className="text-xl font-extrabold">{destination.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/85">{destination.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-white/70">From</p>
            <p className="text-base font-bold">{formatIDR(destination.startingPrice)}</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/80">
            <span className="flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" /> {destination.hotelCount}
            </span>
            <span className="flex items-center gap-1">
              <Ticket className="h-3.5 w-3.5" /> {destination.activityCount}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
