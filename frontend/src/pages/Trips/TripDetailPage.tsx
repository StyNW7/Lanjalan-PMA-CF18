import { useParams, Link } from "react-router-dom"
import toast from "react-hot-toast"
import {
  Plane,
  Hotel as HotelIcon,
  Ticket,
  Compass,
  FileText,
  Heart,
  ArrowRight,
  CheckCircle2,
  Circle,
  Download,
} from "lucide-react"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BudgetChart } from "@/components/travel/BudgetChart"
import { getTripById } from "@/data/trips"
import { tripBudgetBreakdown } from "@/data/compass"
import { useAppState } from "@/context/app-state"

export default function TripDetailPage() {
  const { id } = useParams()
  const { trip, wishlist } = useAppState()
  const mockTrip = getTripById(id || "")

  const isLiveBali = id === "bali-sep-2026"
  const budget = tripBudgetBreakdown(5000000)

  if (!mockTrip) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">Trip not found.</p>
        <Button asChild className="mt-4"><Link to="/trips">Back to My Trips</Link></Button>
      </div>
    )
  }

  const hotelStatus = isLiveBali ? (trip.hotel.booked ? "Booked" : "Pending") : mockTrip.hotelStatus
  const activitiesPlanned = isLiveBali ? trip.activities.bookedIds.length : mockTrip.activitiesPlanned
  const progress = isLiveBali
    ? Math.min(Math.round(40 + (trip.hotel.booked ? 30 : 0) + Math.min(activitiesPlanned, 4) * 7.5), 100)
    : mockTrip.progress

  return (
    <div className="container py-8">
      <Breadcrumb items={[{ label: "My Trips", href: "/trips" }, { label: mockTrip.destination }]} />

      <div className="mt-4 overflow-hidden rounded-3xl">
        <div className="relative h-56 w-full">
          <img src={mockTrip.destinationImage} alt={mockTrip.destination} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-6">
            <div>
              <Badge variant="accent" className="mb-2">{mockTrip.status}</Badge>
              <h1 className="text-3xl font-extrabold text-white">{mockTrip.destination}</h1>
              <p className="text-sm text-white/85">{mockTrip.dateRange} · {mockTrip.duration}</p>
            </div>
            {isLiveBali && (
              <Button asChild size="lg" className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/compass/trip/bali-sep-2026">
                  Continue Planning with Compass <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <div className="mb-2 flex items-center justify-between text-sm font-semibold">
              <span className="text-muted-foreground">Trip Progress</span>
              <span className="text-foreground">{progress}%</span>
            </div>
            <Progress value={progress} />
          </Card>

          <Card className="p-6">
            <h2 className="font-bold text-foreground">Booking Status</h2>
            <div className="mt-4 space-y-3">
              <StatusRow icon={Plane} label="Flight" value={mockTrip.flightStatus} done={mockTrip.flightStatus === "Confirmed"} />
              <StatusRow icon={HotelIcon} label="Hotel" value={hotelStatus} done={hotelStatus === "Booked"} />
              <StatusRow
                icon={Ticket}
                label="Activities"
                value={`${activitiesPlanned} of ${mockTrip.activitiesTotal || 4} planned`}
                done={activitiesPlanned >= (mockTrip.activitiesTotal || 4)}
              />
            </div>
          </Card>

          {isLiveBali && (
            <Card className="border-primary/20 bg-primary-light/40 p-6">
              <h2 className="flex items-center gap-2 font-bold text-foreground"><Compass className="h-4 w-4 text-primary" /> Compass Itinerary</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {trip.compass.generated ? "Your day-by-day plan is ready to review and edit." : "You haven't generated a Compass plan yet."}
              </p>
              <Button asChild className="mt-4 gap-1.5">
                <Link to={trip.compass.generated ? "/compass/trip/bali-sep-2026" : "/compass/preferences"}>
                  {trip.compass.generated ? "Open Itinerary" : "Plan with Compass"} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </Card>
          )}

          <Card className="p-6">
            <h2 className="flex items-center gap-2 font-bold text-foreground"><FileText className="h-4 w-4 text-primary" /> Documents</h2>
            <div className="mt-4 space-y-2">
              {["Flight E-Ticket", "Hotel Booking Confirmation"].map((doc) => (
                <div key={doc} className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm">
                  <span className="text-foreground">{doc}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5"
                    onClick={() => toast.success(`${doc} downloaded.`)}
                  >
                    <Download className="h-3.5 w-3.5" /> Download
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="font-bold text-foreground">Trip Budget</h2>
            <BudgetChart flight={budget.flight} hotel={budget.hotel} activities={budget.activities} transportation={budget.transportation} remaining={budget.remaining} />
          </Card>

          <Card className="p-5">
            <h2 className="flex items-center gap-2 font-bold text-foreground"><Heart className="h-4 w-4 text-accent" /> Saved Items</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {wishlist.hotels.length + wishlist.activities.length} items saved for this trip.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-3 w-full">
              <Link to="/saved">View Saved</Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatusRow({ icon: Icon, label, value, done }: { icon: typeof Plane; label: string; value: string; done: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
      <span className="flex items-center gap-2 text-sm text-foreground"><Icon className="h-4 w-4 text-primary" /> {label}</span>
      <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
        {value} {done ? <CheckCircle2 className="h-4 w-4 text-success" /> : <Circle className="h-3.5 w-3.5 text-muted-foreground" />}
      </span>
    </div>
  )
}
