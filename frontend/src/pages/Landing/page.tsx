import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  Plane,
  Hotel as HotelIcon,
  Ticket,
  Compass,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Users,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SectionHeading } from "@/components/ui/section-heading"
import { SearchWidget } from "@/components/travel/SearchWidget"
import { DestinationCard } from "@/components/travel/DestinationCard"
import { PromoCard } from "@/components/travel/PromoCard"
import { destinations } from "@/data/destinations"
import { promotions } from "@/data/promotions"
import { testimonials } from "@/data/testimonials"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const discoveryCards = [
  {
    title: "Flights",
    description: "Find the right flight for your schedule and budget.",
    icon: Plane,
    href: "/flights",
  },
  {
    title: "Hotels",
    description: "Stay closer to the places that matter.",
    icon: HotelIcon,
    href: "/hotels",
  },
  {
    title: "Activities",
    description: "Discover experiences that fit your trip.",
    icon: Ticket,
    href: "/activities",
  },
  {
    title: "Compass",
    description: "Turn your confirmed flight into a personalized travel plan.",
    icon: Compass,
    href: "/compass",
  },
]

const airPillars = [
  {
    letter: "A",
    title: "Attracting the Traveler",
    description: "Discover more of what Lanjalan can do before and after booking.",
  },
  {
    letter: "I",
    title: "Individualizing Every Journey",
    description: "Turn confirmed travel context into recommendations that actually fit you.",
  },
  {
    letter: "R",
    title: "Reconnecting the Journey",
    description: "Keep planning, booking, and returning connected in one continuous trip.",
  },
]

const compassFlow = [
  { label: "Flight Confirmed", icon: Plane },
  { label: "Preferences", icon: Sparkles },
  { label: "Personalized Plan", icon: Compass },
  { label: "Connected Booking", icon: CheckCircle2 },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-light via-background to-background">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative py-16 sm:py-20 lg:py-24">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3.5 py-1.5 text-xs font-bold text-primary-dark shadow-soft">
              <Sparkles className="h-3.5 w-3.5" /> Introducing Lanjalan Compass
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Your Flight Is Just the Beginning.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Book flights, find the right stay, discover experiences, and plan your entire journey with Lanjalan.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mx-auto mt-10 max-w-5xl"
          >
            <SearchWidget />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — QUICK PRODUCT DISCOVERY */}
      <section className="container py-16 sm:py-20">
        <SectionHeading eyebrow="Attracting" title="Everything You Need for the Journey" align="center" className="mx-auto" />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {discoveryCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link
                to={card.href}
                className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Card className="h-full p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <card.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-bold text-foreground">{card.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{card.description}</p>
                  {/* Always visible: hover-only affordances are invisible on touch devices. */}
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — PROMOTION BANNER */}
      <section className="bg-muted/40 py-16 sm:py-20">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title="Travel Further, Spend Smarter" description="Handpicked offers across flights, stays, and experiences." />
            <Button asChild variant="outline" className="gap-1.5">
              <Link to="/deals">View All Deals <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {promotions.slice(0, 3).map((promo) => (
              <PromoCard key={promo.id} promo={promo} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — DESTINATION DISCOVERY */}
      <section className="container py-16 sm:py-20">
        <SectionHeading eyebrow="Explore" title="Where Will You Go Next?" description="Popular destinations booked by travelers like you." />
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.slice(0, 6).map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline" size="lg" className="gap-1.5">
            <Link to="/explore">See All Destinations <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* SECTION 5 — INTRODUCE COMPASS */}
      <section className="relative overflow-hidden bg-primary-dark py-16 text-on-dark sm:py-24">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="container relative">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-on-dark/10 px-3.5 py-1.5 text-xs font-bold">
                <Compass className="h-3.5 w-3.5" /> Flagship Feature
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Meet Lanjalan Compass</h2>
              <p className="mt-4 max-w-lg text-base text-on-dark/85 sm:text-lg">
                Your flight already tells us where and when you're going. Compass helps you figure out what comes
                next.
              </p>
              <Button asChild size="lg" className="mt-7 gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/compass">
                  See How Compass Works <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {compassFlow.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="rounded-2xl bg-on-dark/10 p-5 backdrop-blur-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-on-dark/15">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-xs font-semibold text-on-dark/60">Step {i + 1}</p>
                  <p className="mt-1 font-bold">{step.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — AIR FRAMEWORK */}
      <section className="container py-16 sm:py-20">
        <SectionHeading eyebrow="Our Strategy" title="A Better Journey with AIR" align="center" className="mx-auto" />
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {airPillars.map((pillar, i) => (
            <motion.div
              key={pillar.letter}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Card className="h-full p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-light text-2xl font-extrabold text-accent">
                  {pillar.letter}
                </span>
                <h3 className="mt-5 text-lg font-bold text-foreground">{pillar.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{pillar.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 7 — SOCIAL PROOF */}
      <section className="bg-primary-light/60 py-16 sm:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-background shadow-soft">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <p className="text-xl font-semibold leading-relaxed text-foreground sm:text-2xl">
              "{testimonials[0].quote}"
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <img
                src={`https://picsum.photos/seed/${testimonials[0].avatarSeed}/80/80`}
                alt={testimonials[0].name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="text-sm font-bold text-foreground">{testimonials[0].name}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {testimonials[0].profile}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
