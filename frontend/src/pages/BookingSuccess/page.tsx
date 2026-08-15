import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle2, Plane, CalendarDays, Users, Download } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CompassEntryCard } from "@/components/travel/CompassEntryCard"
import { useAppState } from "@/context/app-state"
import toast from "react-hot-toast"

export default function BookingSuccessPage() {
  const { trip } = useAppState()
  const navigate = useNavigate()
  const [dismissed, setDismissed] = useState(false)

  const destination = trip.destination || "Bali"
  const duration = trip.duration || "4D3N"

  function handlePlanLater() {
    toast.success("No problem — your Compass entry will stay in Notifications.")
    setDismissed(true)
  }

  return (
    <div className="container max-w-3xl py-10">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-9 w-9 text-success" />
        </div>
        <h1 className="mt-5 text-3xl font-extrabold text-foreground">Your Flight Is Confirmed</h1>
        <p className="mt-2 text-muted-foreground">A confirmation has been sent to your email.</p>
      </div>

      <Card className="mt-8 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light">
              <Plane className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-bold text-foreground">{trip.flight.summary || "Jakarta → Bali · Garuda Indonesia GA 402"}</p>
              <p className="text-sm text-muted-foreground">Booking ID: LJ-FL-{Math.floor(10000 + Math.random() * 89999)}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" /> E-Ticket
          </Button>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-5 text-sm sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{trip.dateRange || "18–21 September 2026"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{trip.travelers || 2} Travelers</span>
          </div>
        </div>
      </Card>

      {!dismissed && (
        <div className="mt-8">
          <CompassEntryCard
            destination={destination}
            duration={duration}
            onPlanLater={handlePlanLater}
          />
        </div>
      )}

      {dismissed && (
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      )}
    </div>
  )
}
