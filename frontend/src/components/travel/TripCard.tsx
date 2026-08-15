import { Link } from "react-router-dom"
import { CalendarDays, Users, Plane, Hotel as HotelIcon, Ticket } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { Trip } from "@/data/types"

const statusVariant = {
  Draft: "muted",
  Planning: "secondary",
  Completed: "success",
} as const

export function TripCard({ trip }: { trip: Trip }) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-card">
      <div className="relative h-40 w-full overflow-hidden">
        <img src={trip.destinationImage} alt={trip.destination} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <Badge variant={statusVariant[trip.status]} className="absolute left-3 top-3">
          {trip.status}
        </Badge>
        <h3 className="absolute bottom-3 left-4 text-xl font-extrabold text-background">{trip.destination}</h3>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {trip.dateRange}</span>
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {trip.travelers}</span>
        </div>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs font-medium">
            <span className="text-muted-foreground">Trip Progress</span>
            <span className="text-foreground">{trip.progress}%</span>
          </div>
          <Progress value={trip.progress} />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-lg bg-muted/60 py-2">
            <Plane className="mx-auto mb-1 h-3.5 w-3.5 text-primary" />
            <p className="font-medium text-foreground">{trip.flightStatus}</p>
          </div>
          <div className="rounded-lg bg-muted/60 py-2">
            <HotelIcon className="mx-auto mb-1 h-3.5 w-3.5 text-primary" />
            <p className="font-medium text-foreground">{trip.hotelStatus}</p>
          </div>
          <div className="rounded-lg bg-muted/60 py-2">
            <Ticket className="mx-auto mb-1 h-3.5 w-3.5 text-primary" />
            <p className="font-medium text-foreground">{trip.activitiesPlanned}/{trip.activitiesTotal || "-"}</p>
          </div>
        </div>

        <Button asChild className="mt-4 w-full">
          <Link to={`/trips/${trip.id}`}>{trip.status === "Completed" ? "View Trip" : "Continue Planning"}</Link>
        </Button>
      </div>
    </Card>
  )
}
