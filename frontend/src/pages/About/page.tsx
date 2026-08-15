import { motion } from "framer-motion"
import { Compass, Sparkles, Link2, UserCheck, Search, CreditCard, MapPinned, PartyPopper } from "lucide-react"
import { Card } from "@/components/ui/card"
import { SectionHeading } from "@/components/ui/section-heading"

const values = [
  { title: "Simple", description: "Every step should feel obvious, not overwhelming.", icon: Sparkles },
  { title: "Relevant", description: "Recommendations that reflect the trip you're actually taking.", icon: UserCheck },
  { title: "Connected", description: "Planning, booking, and returning should feel like one journey.", icon: Link2 },
  { title: "Traveler First", description: "Every decision stays in the traveler's hands.", icon: Compass },
]

const airExplainers = [
  {
    letter: "A",
    title: "Attracting the Traveler",
    description: "We help you discover more of what Lanjalan can do, before and after you book a flight.",
  },
  {
    letter: "I",
    title: "Individualizing Every Journey",
    description: "Lanjalan Compass turns your confirmed travel context into a plan that actually fits you.",
  },
  {
    letter: "R",
    title: "Reconnecting the Journey",
    description: "Your planning, bookings, and trips stay connected so you can pick up exactly where you left off.",
  },
]

const journey = [
  { label: "Discover", icon: Search },
  { label: "Book", icon: CreditCard },
  { label: "Plan", icon: MapPinned },
  { label: "Experience", icon: PartyPopper },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-primary-light/60 py-16 sm:py-24">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
          >
            Making Every Journey Easier to Complete.
          </motion.h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Lanjalan started as a way to book flights. It has grown into a companion for the whole trip that comes
            after.
          </p>
        </div>
      </section>

      <section className="container py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Our Story" title="From Flight Booking to the Complete Journey" />
          <p className="mt-4 text-muted-foreground">
            Most travelers start their trip the same way: booking a flight. But the real work often begins right
            after — figuring out where to stay, what to do, and how it all fits together. Lanjalan was built to
            close that gap, combining a complete OTA experience with intelligent, post-flight trip planning.
          </p>
          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-primary">Our Mission</p>
            <p className="mt-2 text-lg font-medium text-foreground">
              "Help travelers move from booking transportation to confidently completing their entire journey."
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-16 sm:py-20">
        <div className="container">
          <SectionHeading title="What We Value" align="center" className="mx-auto" />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-bold text-foreground">{value.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 sm:py-20">
        <SectionHeading eyebrow="Our Strategy" title="The AIR Strategy" description="How Lanjalan expands from a flight booking platform into a complete journey partner." />
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {airExplainers.map((pillar) => (
            <Card key={pillar.letter} className="p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-light text-2xl font-extrabold text-accent">
                {pillar.letter}
              </span>
              <h3 className="mt-5 text-lg font-bold text-foreground">{pillar.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{pillar.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-primary-dark py-16 text-on-dark sm:py-20">
        <div className="container">
          <SectionHeading title="The Journey We Design For" align="center" className="mx-auto text-on-dark [&>h2]:text-on-dark" />
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-2">
            {journey.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-2 rounded-2xl bg-on-dark/10 px-6 py-5">
                  <step.icon className="h-6 w-6" />
                  <span className="text-sm font-bold">{step.label}</span>
                </div>
                {i < journey.length - 1 && <span className="hidden text-on-dark/40 sm:block">—</span>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
