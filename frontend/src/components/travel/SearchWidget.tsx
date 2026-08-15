import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Plane, Hotel as HotelIcon, Ticket, ArrowLeftRight, MapPin, CalendarDays, Users, Compass } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { airports } from "@/data/flights"

export function SearchWidget() {
  const navigate = useNavigate()
  const [origin, setOrigin] = useState("CGK")
  const [destination, setDestination] = useState("DPS")

  function handleFlightSearch(e: React.FormEvent) {
    e.preventDefault()
    navigate(`/flights/results?origin=${origin}&destination=${destination}`)
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-4 shadow-lift sm:p-6">
      <Tabs defaultValue="flights">
        <TabsList>
          <TabsTrigger value="flights" className="gap-1.5"><Plane className="h-4 w-4" /> Flights</TabsTrigger>
          <TabsTrigger value="hotels" className="gap-1.5"><HotelIcon className="h-4 w-4" /> Hotels</TabsTrigger>
          <TabsTrigger value="activities" className="gap-1.5"><Ticket className="h-4 w-4" /> Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="flights">
          <form onSubmit={handleFlightSearch} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-1">
              <Label htmlFor="from">From</Label>
              <Select value={origin} onValueChange={setOrigin}>
                <SelectTrigger id="from" className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {airports.map((a) => (
                    <SelectItem key={a.code} value={a.code}>{a.city} ({a.code})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end justify-center lg:col-span-1">
              <button
                type="button"
                aria-label="Swap origin and destination"
                onClick={() => { setOrigin(destination); setDestination(origin) }}
                className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-primary-light hover:text-primary"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </button>
            </div>
            <div className="lg:col-span-1">
              <Label htmlFor="to">To</Label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger id="to" className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {airports.map((a) => (
                    <SelectItem key={a.code} value={a.code}>{a.city} ({a.code})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-1">
              <Label htmlFor="depart">Departure</Label>
              <Input id="depart" type="date" defaultValue="2026-09-18" className="mt-1.5" />
            </div>
            <div className="lg:col-span-1">
              <Label htmlFor="return">Return</Label>
              <Input id="return" type="date" defaultValue="2026-09-21" className="mt-1.5" />
            </div>
            <div className="lg:col-span-1">
              <Label htmlFor="travelers">Travelers</Label>
              <Select defaultValue="2">
                <SelectTrigger id="travelers" className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <SelectItem key={n} value={String(n)}>{n} Traveler{n > 1 ? "s" : ""}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1 sm:col-span-2 lg:col-span-6">
              <Button type="submit" size="lg" className="gap-1.5">
                <Plane className="h-4 w-4" /> Search Flights
              </Button>
              <Button asChild type="button" size="lg" variant="outline" className="gap-1.5">
                <a href="/compass"><Compass className="h-4 w-4" /> Plan with Compass</a>
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="hotels">
          <form
            onSubmit={(e) => { e.preventDefault(); navigate("/hotels/results") }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div className="lg:col-span-1">
              <Label htmlFor="hotel-dest">Destination</Label>
              <div className="relative mt-1.5">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="hotel-dest" defaultValue="Bali, Indonesia" className="pl-9" />
              </div>
            </div>
            <div className="lg:col-span-1">
              <Label htmlFor="checkin">Check-in</Label>
              <div className="relative mt-1.5">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="checkin" type="date" defaultValue="2026-09-18" className="pl-9" />
              </div>
            </div>
            <div className="lg:col-span-1">
              <Label htmlFor="checkout">Check-out</Label>
              <div className="relative mt-1.5">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="checkout" type="date" defaultValue="2026-09-21" className="pl-9" />
              </div>
            </div>
            <div className="lg:col-span-1">
              <Label htmlFor="guests">Guests</Label>
              <div className="relative mt-1.5">
                <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="guests" defaultValue="2 Guests, 1 Room" className="pl-9" />
              </div>
            </div>
            <div className="sm:col-span-2 lg:col-span-4">
              <Button type="submit" size="lg" className="gap-1.5">
                <HotelIcon className="h-4 w-4" /> Search Hotels
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="activities">
          <form
            onSubmit={(e) => { e.preventDefault(); navigate("/activities/results") }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <div className="lg:col-span-2">
              <Label htmlFor="act-dest">Destination or Experience</Label>
              <div className="relative mt-1.5">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="act-dest" placeholder="Search Bali, Uluwatu Temple, cooking class..." className="pl-9" />
              </div>
            </div>
            <div className="lg:col-span-1">
              <Label htmlFor="act-date">Date</Label>
              <Input id="act-date" type="date" defaultValue="2026-09-19" className="mt-1.5" />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <Button type="submit" size="lg" className="gap-1.5">
                <Ticket className="h-4 w-4" /> Search Activities
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
