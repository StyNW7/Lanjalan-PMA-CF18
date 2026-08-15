import { Link } from "react-router-dom"
import { Compass, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CompassEntryCard({
  destination,
  duration,
  onPlanLater,
  onContinueManually,
}: {
  destination: string
  duration: string
  onPlanLater?: () => void
  onContinueManually?: () => void
}) {
  return (
    <Card className="relative overflow-hidden border-none bg-gradient-to-br from-primary-dark via-primary to-primary p-8 text-on-dark shadow-lift">
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-on-dark/15">
            <Compass className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-extrabold sm:text-3xl">
            Your {duration} {destination} Trip Is Ready to Plan
          </h3>
          <p className="mt-2 text-sm text-on-dark/85 sm:text-base">
            We already know your destination and travel dates. Tell us what kind of trip you want and Compass will
            help build the rest.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary" className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/compass/preferences">
                Plan My Trip <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button onClick={onPlanLater} size="lg" variant="outline" className="border-on-dark/40 bg-transparent text-on-dark hover:bg-on-dark/10">
              Plan Later
            </Button>
            <Button onClick={onContinueManually} size="lg" variant="ghost" asChild className="text-on-dark/90 hover:bg-on-dark/10 hover:text-on-dark">
              <Link to="/hotels">Continue Manually</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
