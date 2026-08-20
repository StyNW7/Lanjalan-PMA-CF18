import { Link } from "react-router-dom"
import { Map, Sparkles, ArrowRight, Clock } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DestinationCard } from "@/components/travel/DestinationCard"
import { destinations } from "@/data/destinations"
import { guides } from "@/data/testimonials"
import { useAppState } from "@/context/app-state"
import { FadeInGrid, FadeInItem } from "@/components/ui/fade-in"

export default function ExplorePage() {
  const { onboarding } = useAppState()
  const trending = destinations.slice(0, 4)
  const weekend = destinations.filter((d) => d.startingPrice < 1000000)
  const recommended = onboarding.travelerType
    ? destinations.filter((d) => d.tag)
    : destinations.slice(2, 6)

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary-light via-background to-background py-14">
        <div className="container text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3.5 py-1.5 text-xs font-bold text-primary-dark shadow-soft">
            <Map className="h-3.5 w-3.5" /> Explore
          </span>
          <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Discover more of what Lanjalan can do.</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Trending destinations, weekend escapes, and ready-made trip guides to spark your next journey.
          </p>
        </div>
      </section>

      <section className="container py-14">
        <SectionHeading title="Trending Destinations" description="Where travelers are booking most this season." />
        <FadeInGrid className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((d) => <FadeInItem key={d.id}><DestinationCard destination={d} /></FadeInItem>)}
        </FadeInGrid>
      </section>

      <section className="bg-muted/40 py-14">
        <div className="container">
          <SectionHeading title="Weekend Escapes" description="Short trips that fit into a Friday-to-Sunday getaway." />
          <FadeInGrid className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {weekend.map((d) => <FadeInItem key={d.id}><DestinationCard destination={d} /></FadeInItem>)}
          </FadeInGrid>
        </div>
      </section>

      <section className="container py-14">
        <SectionHeading
          eyebrow={onboarding.travelerType ? `For ${onboarding.travelerType} travelers` : undefined}
          title="Recommended for You"
          description="Based on trending picks and traveler favorites."
        />
        <FadeInGrid className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recommended.map((d) => <FadeInItem key={d.id}><DestinationCard destination={d} /></FadeInItem>)}
        </FadeInGrid>
      </section>

      <section className="bg-muted/40 py-14">
        <div className="container">
          <SectionHeading title="Travel Guides" description="Ready-made itineraries you can build on with Compass." />
          <FadeInGrid className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((guide) => (
              <FadeInItem key={guide.id}>
                <Card className="overflow-hidden transition-shadow hover:shadow-card">
                  <img src={guide.image} alt={guide.title} className="h-40 w-full object-cover" />
                  <div className="p-5">
                    <p className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {guide.duration}</p>
                    <h3 className="mt-1 font-bold text-foreground">{guide.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{guide.description}</p>
                    <Button asChild size="sm" className="mt-4 w-full gap-1.5">
                      <Link to="/compass">Build This Trip <ArrowRight className="h-3.5 w-3.5" /></Link>
                    </Button>
                  </div>
                </Card>
              </FadeInItem>
            ))}
          </FadeInGrid>
        </div>
      </section>

      <section className="container py-14">
        <Card className="flex flex-col items-center gap-4 border-none bg-primary-dark p-10 text-center text-on-dark">
          <Sparkles className="h-8 w-8" />
          <h2 className="text-2xl font-extrabold">Popular Experiences This Month</h2>
          <p className="max-w-lg text-on-dark/85">
            From sunrise treks to island-hopping tours, see what's trending across every destination.
          </p>
          <Button asChild size="lg" variant="secondary" className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/activities">Browse Activities <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </Card>
      </section>
    </div>
  )
}
