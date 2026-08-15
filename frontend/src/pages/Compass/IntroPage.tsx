import { Link } from "react-router-dom"
import { Compass, ArrowRight, Sliders, Edit3, Link2, Save, Plane, Sparkles, MapPinned, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/ui/section-heading"

const inputs = [
  { label: "Confirmed destination", icon: MapPinned },
  { label: "Travel dates", icon: Sparkles },
  { label: "Trip duration", icon: Sparkles },
  { label: "Number of travelers", icon: Sparkles },
]

const combinedWith = ["Budget", "Travel style", "Interests", "Preferred pace"]

const benefits = [
  { title: "Personalized", description: "Built around your confirmed trip, not a generic template.", icon: Sparkles },
  { title: "Editable", description: "Swap, reorder, or remove any part of the plan.", icon: Edit3 },
  { title: "Connected", description: "Book a hotel or activity and it updates your plan automatically.", icon: Link2 },
  { title: "Persistent", description: "Leave and come back — your plan is saved in My Trips.", icon: Save },
]

export default function CompassIntroPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-primary-dark py-16 text-primary-foreground sm:py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="container relative text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-background/10">
            <Compass className="h-8 w-8" />
          </div>
          <h1 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
            Your Flight Knows Where You're Going.
            <br /> Compass Helps Plan What Comes Next.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-primary-foreground/85">
            A structured trip planning experience built around the trip you already booked — not another chatbot.
          </p>
          <Button asChild size="lg" className="mt-8 gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/compass/preferences">Build My Trip <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <section className="container py-16">
        <SectionHeading eyebrow="How It Works" title="Compass Combines What We Know With What You Want" align="center" className="mx-auto" />
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="p-7">
            <div className="flex items-center gap-2 text-primary">
              <Plane className="h-5 w-5" /> <span className="font-bold">From your confirmed booking</span>
            </div>
            <ul className="mt-4 space-y-3">
              {inputs.map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> {item.label}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-7">
            <div className="flex items-center gap-2 text-accent">
              <Sliders className="h-5 w-5" /> <span className="font-bold">Combined with your preferences</span>
            </div>
            <ul className="mt-4 space-y-3">
              {combinedWith.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent" /> {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="bg-muted/40 py-16">
        <div className="container">
          <SectionHeading title="Why Travelers Use Compass" align="center" className="mx-auto" />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <Card key={b.title} className="p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-bold text-foreground">{b.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{b.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 text-center">
        <h2 className="text-2xl font-bold text-foreground">Ready to see your trip come together?</h2>
        <p className="mt-2 text-muted-foreground">Compass never books anything without your confirmation.</p>
        <Button asChild size="lg" className="mt-6 gap-1.5">
          <Link to="/compass/preferences">Build My Trip <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </section>
    </div>
  )
}
