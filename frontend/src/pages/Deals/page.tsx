import { useState } from "react"
import { Link } from "react-router-dom"
import { Percent, ArrowRight } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PromoCard } from "@/components/travel/PromoCard"
import { getPromotionsByCategory } from "@/data/promotions"

const tabs = ["All", "Flights", "Hotels", "Activities", "Bundles"] as const

export default function DealsPage() {
  const [active, setActive] = useState<(typeof tabs)[number]>("All")
  const promos = getPromotionsByCategory(active)

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-accent-light via-background to-background py-14">
        <div className="container text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3.5 py-1.5 text-xs font-bold text-accent shadow-soft">
            <Percent className="h-3.5 w-3.5" /> Deals
          </span>
          <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Offers across every part of your trip.</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Flights, hotels, activities, and bundles — all in one place.
          </p>
        </div>
      </section>

      <section className="container py-10">
        <div className="flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                active === tab ? "border-primary bg-primary-light text-primary-dark" : "border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {promos.map((promo) => <PromoCard key={promo.id} promo={promo} />)}
        </div>
      </section>

      <section className="bg-primary-dark py-14 text-primary-foreground">
        <div className="container">
          <SectionHeading
            title="Beyond the Flight"
            description="Already booked your flight? Discover stays and activities that fit your journey."
            className="[&_h2]:text-primary-foreground [&_p]:text-primary-foreground/80"
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/compass">Plan with Compass <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-background/40 bg-transparent text-primary-foreground hover:bg-background/10">
              <Link to="/hotels">Browse Hotels</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container py-14">
        <Card className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-3">
          <div>
            <p className="text-3xl font-extrabold text-primary">20%</p>
            <p className="mt-1 text-sm text-muted-foreground">Average savings on bundled bookings</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-primary">8</p>
            <p className="mt-1 text-sm text-muted-foreground">Active promotions across the platform</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-primary">24/7</p>
            <p className="mt-1 text-sm text-muted-foreground">Support if anything changes</p>
          </div>
        </Card>
      </section>
    </div>
  )
}
