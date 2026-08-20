import { useParams, useNavigate, Link } from "react-router-dom"
import {
  MapPin,
  Building2,
  Ticket,
  CalendarDays,
  Plane,
  ArrowRight,
  Compass,
  Sparkles,
  Heart,
} from "lucide-react"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/ui/section-heading"
import { EmptyState } from "@/components/ui/empty-state"
import { HotelCard } from "@/components/travel/HotelCard"
import { ActivityCard } from "@/components/travel/ActivityCard"
import { DestinationCard } from "@/components/travel/DestinationCard"
import { FadeIn, FadeInGrid, FadeInItem } from "@/components/ui/fade-in"
import { formatIDR } from "@/lib/format"
import { destinations, getDestinationById } from "@/data/destinations"
import { getHotelsByCity } from "@/data/hotels"
import { getActivitiesByCity } from "@/data/activities"
import { useAppState } from "@/context/app-state"
import { cn } from "@/lib/utils"

export default function DestinationDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const destination = getDestinationById(id || "")
  const { wishlist, toggleWishlistItem } = useAppState()

  if (!destination) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">Destination not found.</p>
        <Button asChild className="mt-4"><Link to="/explore">Back to Explore</Link></Button>
      </div>
    )
  }

  const hotels = getHotelsByCity(destination.name)
  const activities = getActivitiesByCity(destination.name)
  const saved = wishlist.destinations.includes(destination.id)
  const related = destinations.filter((d) => d.id !== destination.id).slice(0, 3)

  const flightSearchHref = destination.airportCode
    ? `/flights/results?origin=CGK&destination=${destination.airportCode}`
    : "/flights"

  return (
    <div className="flex flex-col">
      <div className="container pt-6">
        <Breadcrumb items={[{ label: "Explore", href: "/explore" }, { label: destination.name }]} />
      </div>

      {/* Hero gallery */}
      <div className="container mt-4 grid grid-cols-1 gap-2 sm:grid-cols-4 sm:gap-3">
        <div className="relative h-72 w-full overflow-hidden rounded-2xl sm:col-span-2 sm:row-span-2">
          <img src={destination.image} alt={destination.name} className="h-full w-full object-cover" />
          {destination.tag && <Badge variant="accent" className="absolute left-4 top-4">{destination.tag}</Badge>}
          <button
            onClick={() => toggleWishlistItem("destinations", destination.id)}
            aria-label={saved ? "Remove from saved" : "Save destination"}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground transition-colors hover:bg-background"
          >
            <Heart className={cn("h-4 w-4", saved && "fill-accent text-accent")} />
          </button>
        </div>
        {(destination.gallery && destination.gallery.length > 0 ? destination.gallery : [destination.image, destination.image])
          .slice(0, 2)
          .map((img, i) => (
            <img key={i} src={img} alt={destination.name} className="hidden h-[8.6rem] w-full rounded-2xl object-cover sm:block" />
          ))}
      </div>

      <div className="container mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {destination.country}
          </p>
          <h1 className="mt-1 text-3xl font-extrabold text-foreground">{destination.name}</h1>
          <p className="mt-3 text-muted-foreground">{destination.longDescription || destination.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-border bg-card px-3 py-3 text-center">
              <p className="text-xs text-muted-foreground">From</p>
              <p className="mt-0.5 text-sm font-bold text-foreground">{formatIDR(destination.startingPrice)}</p>
            </div>
            <div className="rounded-xl border border-border bg-card px-3 py-3 text-center">
              <Building2 className="mx-auto h-3.5 w-3.5 text-primary" />
              <p className="mt-0.5 text-sm font-bold text-foreground">{destination.hotelCount} hotels</p>
            </div>
            <div className="rounded-xl border border-border bg-card px-3 py-3 text-center">
              <Ticket className="mx-auto h-3.5 w-3.5 text-primary" />
              <p className="mt-0.5 text-sm font-bold text-foreground">{destination.activityCount} activities</p>
            </div>
            <div className="rounded-xl border border-border bg-card px-3 py-3 text-center">
              <Plane className="mx-auto h-3.5 w-3.5 text-primary" />
              <p className="mt-0.5 text-sm font-bold text-foreground">{destination.averageFlightDuration || "Varies"}</p>
            </div>
          </div>

          {destination.bestTimeToVisit && (
            <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-primary" /> Best time to visit: <span className="font-medium text-foreground">{destination.bestTimeToVisit}</span>
            </p>
          )}

          {destination.highlights && destination.highlights.length > 0 && (
            <div className="mt-8">
              <h2 className="font-bold text-foreground">Highlights</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {destination.highlights.map((h) => (
                  <Badge key={h} variant="secondary">{h}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking actions */}
        <Card className="h-fit p-6 lg:sticky lg:top-24">
          <p className="font-bold text-foreground">Plan Your Trip to {destination.name}</p>
          <div className="mt-4 space-y-2.5">
            <Button asChild size="lg" className="w-full gap-1.5">
              <Link to={flightSearchHref}><Plane className="h-4 w-4" /> Search Flights</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full gap-1.5">
              <Link to="/hotels/results"><Building2 className="h-4 w-4" /> Browse Hotels</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full gap-1.5">
              <Link to="/activities/results"><Ticket className="h-4 w-4" /> Browse Activities</Link>
            </Button>
          </div>
          <div className="my-5 h-px bg-border" />
          <div className="rounded-xl bg-primary-light p-4">
            <p className="flex items-center gap-1.5 text-sm font-bold text-primary-dark">
              <Compass className="h-4 w-4" /> Not sure where to start?
            </p>
            <p className="mt-1.5 text-xs text-primary-dark/80">
              Book a flight and let Compass build a personalized day-by-day plan for {destination.name}.
            </p>
            <Button asChild size="sm" className="mt-3 w-full gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/compass">Build This Trip <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
          </div>
        </Card>
      </div>

      {/* Hotels in this destination */}
      <section className="container py-14">
        <SectionHeading title={`Hotels in ${destination.name}`} description="Popular stays picked for this destination." />
        {hotels.length === 0 ? (
          <EmptyState
            icon={Building2}
            title="No featured hotels yet"
            description={`We're still adding hotel listings for ${destination.name}. Browse all hotels in the meantime.`}
            actionLabel="Browse All Hotels"
            onAction={() => navigate("/hotels/results")}
            className="mt-6"
          />
        ) : (
          <FadeInGrid className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.slice(0, 3).map((hotel) => (
              <FadeInItem key={hotel.id}>
                <HotelCard
                  hotel={hotel}
                  saved={wishlist.hotels.includes(hotel.id)}
                  onToggleSave={() => toggleWishlistItem("hotels", hotel.id)}
                />
              </FadeInItem>
            ))}
          </FadeInGrid>
        )}
      </section>

      {/* Activities in this destination */}
      <section className="bg-muted/40 py-14">
        <div className="container">
          <SectionHeading title={`Things to Do in ${destination.name}`} description="Popular experiences booked by recent travelers." />
          {activities.length === 0 ? (
            <EmptyState
              icon={Ticket}
              title="No featured activities yet"
              description={`We're still adding activities for ${destination.name}. Browse all activities in the meantime.`}
              actionLabel="Browse All Activities"
              onAction={() => navigate("/activities/results")}
              className="mt-6"
            />
          ) : (
            <FadeInGrid className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {activities.slice(0, 3).map((activity) => (
                <FadeInItem key={activity.id}>
                  <ActivityCard
                    activity={activity}
                    saved={wishlist.activities.includes(activity.id)}
                    onToggleSave={() => toggleWishlistItem("activities", activity.id)}
                  />
                </FadeInItem>
              ))}
            </FadeInGrid>
          )}
        </div>
      </section>

      {/* Related destinations */}
      <section className="container py-14">
        <SectionHeading eyebrow="Keep Exploring" title="You Might Also Like" />
        <FadeInGrid className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((d) => <FadeInItem key={d.id}><DestinationCard destination={d} /></FadeInItem>)}
        </FadeInGrid>
      </section>

      <section className="container pb-14">
        <FadeIn>
          <Card className="flex flex-col items-center gap-3 border-none bg-primary-dark p-10 text-center text-on-dark">
            <Sparkles className="h-7 w-7" />
            <h2 className="text-xl font-extrabold sm:text-2xl">Ready to book {destination.name}?</h2>
            <p className="max-w-md text-on-dark/85">
              Start with a flight, and Compass will help plan everything that comes after.
            </p>
            <Button asChild size="lg" className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to={flightSearchHref}>Search Flights <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </Card>
        </FadeIn>
      </section>
    </div>
  )
}
