import { Link } from "react-router-dom"
import { MapPin, Clock, Heart, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StarRating } from "./StarRating"
import { formatIDR } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Activity } from "@/data/types"

export function ActivityCard({
  activity,
  saved = false,
  onToggleSave,
}: {
  activity: Activity
  saved?: boolean
  onToggleSave?: () => void
}) {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-card">
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={activity.image}
          alt={activity.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge variant="outline" className="absolute left-3 top-3 bg-background/90">
          {activity.category}
        </Badge>
        {onToggleSave && (
          <button
            onClick={onToggleSave}
            aria-label={saved ? "Remove from saved" : "Save activity"}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground transition-colors hover:bg-background"
          >
            <Heart className={cn("h-4 w-4", saved && "fill-accent text-accent")} />
          </button>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold leading-tight text-foreground">{activity.title}</h3>
          <StarRating rating={activity.rating} className="shrink-0" />
        </div>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" /> {activity.location}
        </p>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" /> {activity.duration}
        </p>

        {activity.compassReason && (
          <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-accent-light px-3 py-2">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent" />
            <p className="text-xs font-medium text-accent">{activity.compassReason}</p>
          </div>
        )}

        <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="text-lg font-extrabold text-foreground">{formatIDR(activity.price)}</p>
            <p className="text-xs text-muted-foreground">per person</p>
          </div>
          <Button asChild size="sm">
            <Link to={`/activities/${activity.id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}
