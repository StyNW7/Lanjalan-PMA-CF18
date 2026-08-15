import { Plane, Luggage, ArrowRight, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatIDR } from "@/lib/format"
import type { Flight } from "@/data/types"

export function FlightCard({ flight, onSelect }: { flight: Flight; onSelect?: () => void }) {
  return (
    <Card className="p-5 transition-shadow hover:shadow-card">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light">
            <Plane className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-foreground">{flight.airline}</p>
              <span className="text-xs text-muted-foreground">{flight.flightNumber}</span>
              {flight.recommended && <Badge variant="accent-soft">Recommended</Badge>}
            </div>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{flight.departTime}</p>
                <p className="text-xs text-muted-foreground">{flight.origin.code}</p>
              </div>
              <div className="flex flex-1 flex-col items-center px-2">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {flight.duration}
                </span>
                <div className="my-1 h-px w-full bg-border" />
                <span className="text-xs text-muted-foreground">
                  {flight.stops === 0 ? "Direct" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}${flight.stopCities ? ` · ${flight.stopCities.join(", ")}` : ""}`}
                </span>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{flight.arriveTime}</p>
                <p className="text-xs text-muted-foreground">{flight.destination.code}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Luggage className="h-3.5 w-3.5" />
              {flight.baggage}
              {flight.refundable && <Badge variant="success" className="ml-1">Refundable</Badge>}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2 border-t border-border pt-4 md:border-t-0 md:border-l md:pl-5 md:pt-0">
          <p className="text-xl font-extrabold text-foreground">{formatIDR(flight.price)}</p>
          <p className="text-xs text-muted-foreground">{flight.cabin} · per passenger</p>
          <Button onClick={onSelect} className="gap-1.5">
            Select Flight <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
