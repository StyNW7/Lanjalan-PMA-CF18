import { useMemo } from "react"
import { Briefcase, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { TripCard } from "@/components/travel/TripCard"
import { FadeInGrid, FadeInItem } from "@/components/ui/fade-in"
import { trips as mockTrips } from "@/data/trips"
import { useAppState } from "@/context/app-state"
import { Link, useNavigate } from "react-router-dom"

export default function MyTripsPage() {
  const { trip } = useAppState()
  const navigate = useNavigate()

  const trips = useMemo(() => {
    return mockTrips.map((t) => {
      if (t.id !== "bali-sep-2026") return t
      const activitiesPlanned = trip.activities.bookedIds.length
      let progress = 40
      if (trip.hotel.booked) progress += 30
      progress += Math.min(activitiesPlanned, 4) * 7.5
      return {
        ...t,
        hotelStatus: trip.hotel.booked ? ("Booked" as const) : ("Pending" as const),
        activitiesPlanned,
        progress: Math.min(Math.round(progress), 100),
        status: progress >= 100 ? ("Completed" as const) : ("Planning" as const),
      }
    })
  }, [trip])

  return (
    <div className="container py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold text-foreground">
            <Briefcase className="h-5 w-5 text-primary" /> My Trips
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Every trip you plan stays connected, even if you leave and come back later.</p>
        </div>
        <Button asChild className="gap-1.5">
          <Link to="/flights"><Plus className="h-4 w-4" /> Plan a New Trip</Link>
        </Button>
      </div>

      {trips.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No trips yet"
          description="Book a flight to start planning your first trip with Lanjalan."
          actionLabel="Search Flights"
          onAction={() => navigate("/flights")}
          className="mt-10"
        />
      ) : (
        <FadeInGrid className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((t, i) => <FadeInItem key={t.id} index={i}><TripCard trip={t} /></FadeInItem>)}
        </FadeInGrid>
      )}
    </div>
  )
}
