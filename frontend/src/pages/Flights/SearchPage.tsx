import { Plane, Compass, ShieldCheck, Wallet, Clock } from "lucide-react"
import { SearchWidget } from "@/components/travel/SearchWidget"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"

const popularRoutes = [
  { from: "Jakarta", to: "Bali", price: "780,000", query: "origin=CGK&destination=DPS" },
  { from: "Jakarta", to: "Yogyakarta", price: "540,000", query: "origin=CGK&destination=JOG" },
  { from: "Jakarta", to: "Lombok", price: "990,000", query: "origin=CGK&destination=LOP" },
  { from: "Jakarta", to: "Singapore", price: "2,450,000", query: "origin=CGK&destination=SIN" },
]

const highlights = [
  { icon: Wallet, title: "Transparent Pricing", description: "See the full fare before you book, no surprise fees." },
  { icon: ShieldCheck, title: "Flexible Options", description: "Refundable fares available on most major airlines." },
  { icon: Clock, title: "Real-time Schedules", description: "Departure times you can count on, updated live." },
]

export default function FlightSearchPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary-light via-background to-background py-14">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3.5 py-1.5 text-xs font-bold text-primary-dark shadow-soft">
              <Plane className="h-3.5 w-3.5" /> Flights
            </span>
            <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Find the right flight for your trip.</h1>
            <p className="mt-3 text-muted-foreground">Search domestic and international routes with transparent pricing.</p>
          </div>
          <div className="mx-auto mt-8 max-w-5xl">
            <SearchWidget />
          </div>
        </div>
      </section>

      <section className="container py-14">
        <SectionHeading title="Popular Routes" description="Jump straight into the most searched routes right now." />
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularRoutes.map((route) => (
            <Link key={route.to} to={`/flights/results?${route.query}`}>
              <Card className="p-5 transition-shadow hover:shadow-card">
                <p className="text-xs text-muted-foreground">{route.from} to</p>
                <p className="mt-1 text-lg font-bold text-foreground">{route.to}</p>
                <p className="mt-3 text-sm text-muted-foreground">from <span className="font-bold text-primary">IDR {route.price}</span></p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/40 py-14">
        <div className="container grid grid-cols-1 gap-6 sm:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-14 text-center">
        <Compass className="mx-auto h-8 w-8 text-primary" />
        <h2 className="mt-3 text-xl font-bold text-foreground">Already know where you're headed?</h2>
        <p className="mt-1 text-muted-foreground">Book your flight, and Compass will help you plan the rest of the trip.</p>
      </section>
    </div>
  )
}
