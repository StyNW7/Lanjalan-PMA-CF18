import { Link } from "react-router-dom"
import { Ticket, Mountain, UtensilsCrossed, Landmark, Trees, Users2, Moon, Waves } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { ActivityCard } from "@/components/travel/ActivityCard"
import { Button } from "@/components/ui/button"
import { activities } from "@/data/activities"
import { useAppState } from "@/context/app-state"
import type { ActivityCategory } from "@/data/types"

const categories: { label: ActivityCategory; icon: typeof Mountain }[] = [
  { label: "Adventure", icon: Mountain },
  { label: "Food", icon: UtensilsCrossed },
  { label: "Culture", icon: Landmark },
  { label: "Nature", icon: Trees },
  { label: "Family", icon: Users2 },
  { label: "Nightlife", icon: Moon },
  { label: "Relaxation", icon: Waves },
]

export default function ActivitySearchPage() {
  const { wishlist, toggleWishlistItem } = useAppState()
  const featured = activities.slice(0, 6)

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary-light via-background to-background py-14">
        <div className="container text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3.5 py-1.5 text-xs font-bold text-primary-dark shadow-soft">
            <Ticket className="h-3.5 w-3.5" /> Activities
          </span>
          <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Discover experiences that fit your trip.</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">From cultural landmarks to island-hopping adventures.</p>
        </div>

        <div className="container mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              to={`/activities/results?category=${cat.label}`}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary-light"
            >
              <cat.icon className="h-4 w-4 text-primary" /> {cat.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="container py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading title="Popular Experiences" description="Highly rated activities booked by recent travelers." />
          <Button asChild variant="outline"><Link to="/activities/results">View All</Link></Button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              saved={wishlist.activities.includes(activity.id)}
              onToggleSave={() => toggleWishlistItem("activities", activity.id)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
