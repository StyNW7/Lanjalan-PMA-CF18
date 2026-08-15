import { Plane, Hotel as HotelIcon, Ticket, CheckCircle2, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

export function TripStatus({
  flightBooked,
  hotelBooked,
  activitiesPlanned,
  activitiesTotal,
}: {
  flightBooked: boolean
  hotelBooked: boolean
  activitiesPlanned: number
  activitiesTotal: number
}) {
  const rows = [
    { icon: Plane, label: "Flight", value: flightBooked ? "Confirmed" : "Not Booked", done: flightBooked },
    { icon: HotelIcon, label: "Hotel", value: hotelBooked ? "Booked" : "Pending", done: hotelBooked },
    {
      icon: Ticket,
      label: "Activities",
      value: `${activitiesPlanned} of ${activitiesTotal || 4} Planned`,
      done: activitiesTotal > 0 && activitiesPlanned >= activitiesTotal,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
          <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", row.done ? "bg-success/10" : "bg-muted")}>
            <row.icon className={cn("h-4 w-4", row.done ? "text-success" : "text-muted-foreground")} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">{row.label}</p>
            <p className="flex items-center gap-1 text-sm font-semibold text-foreground">
              {row.value}
              {row.done ? <CheckCircle2 className="h-3.5 w-3.5 text-success" /> : <Circle className="h-3 w-3 text-muted-foreground" />}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
