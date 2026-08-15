import { Link } from "react-router-dom"
import { Hotel as HotelIcon, ShieldCheck, Star, Wallet } from "lucide-react"
import { SearchWidget } from "@/components/travel/SearchWidget"
import { SectionHeading } from "@/components/ui/section-heading"
import { HotelCard } from "@/components/travel/HotelCard"
import { Button } from "@/components/ui/button"
import { hotels } from "@/data/hotels"
import { useAppState } from "@/context/app-state"

const highlights = [
  { icon: Wallet, title: "Best Price Guarantee", description: "Find it cheaper elsewhere and we'll match it." },
  { icon: ShieldCheck, title: "Free Cancellation", description: "Flexible options on most properties." },
  { icon: Star, title: "Verified Reviews", description: "Real ratings from travelers who stayed there." },
]

export default function HotelSearchPage() {
  const { wishlist, toggleWishlistItem } = useAppState()
  const featured = hotels.slice(0, 3)

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary-light via-background to-background py-14">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3.5 py-1.5 text-xs font-bold text-primary-dark shadow-soft">
              <HotelIcon className="h-3.5 w-3.5" /> Hotels
            </span>
            <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Stay closer to what matters.</h1>
            <p className="mt-3 text-muted-foreground">From beachfront resorts to quiet mountain retreats.</p>
          </div>
          <div className="mx-auto mt-8 max-w-5xl">
            <SearchWidget />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/40 py-12">
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

      <section className="container py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading title="Popular Stays in Bali" description="Hand-picked hotels with strong recent ratings." />
          <Button asChild variant="outline"><Link to="/hotels/results">View All</Link></Button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              saved={wishlist.hotels.includes(hotel.id)}
              onToggleSave={() => toggleWishlistItem("hotels", hotel.id)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
