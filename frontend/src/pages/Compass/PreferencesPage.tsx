import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MapPinned, CalendarDays, Clock3, Users, ArrowRight, ShieldCheck, RotateCcw } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { budgetOptions, travelStyleOptions, interestOptions, paceOptions, claraPersona } from "@/data/compass"
import { useAppState } from "@/context/app-state"
import { cn } from "@/lib/utils"

export default function CompassPreferencesPage() {
  const navigate = useNavigate()
  const { trip, setCompassPreferences, skipCompassPreferences } = useAppState()

  const destination = trip.destination || claraPersona.destination
  const dateRange = trip.dateRange || claraPersona.dateRange
  const duration = trip.duration || "4 Days / 3 Nights"
  const travelers = trip.travelers || claraPersona.travelers

  const [budget, setBudget] = useState<string | null>(null)
  const [style, setStyle] = useState<string | null>(null)
  const [interests, setInterests] = useState<string[]>([])
  const [pace, setPace] = useState<string | null>(null)
  const [consent, setConsent] = useState(true)

  function toggleInterest(id: string) {
    setInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  // Single-choice groups toggle off when re-selected, so "no preference" stays reachable.
  function pickOne(current: string | null, value: string, set: (v: string | null) => void) {
    set(current === value ? null : value)
  }

  function clearAll() {
    setBudget(null)
    setStyle(null)
    setInterests([])
    setPace(null)
  }

  const selectionCount =
    (budget ? 1 : 0) + (style ? 1 : 0) + (pace ? 1 : 0) + interests.length

  function handleGenerate() {
    setCompassPreferences({ budget, style, interests, pace })
    navigate("/compass/generating")
  }

  function handleSkip() {
    skipCompassPreferences()
    navigate("/compass/generating")
  }

  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-2xl font-extrabold text-foreground">Tell us about this trip</h1>
      <p className="mt-1 text-muted-foreground">Everything here is optional. Compass works with as little or as much as you share.</p>

      <Card className="mt-6 p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">Confirmed Trip</p>
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex items-center gap-2 text-sm"><MapPinned className="h-4 w-4 text-primary" /> {destination}</div>
          <div className="flex items-center gap-2 text-sm"><CalendarDays className="h-4 w-4 text-primary" /> {dateRange}</div>
          <div className="flex items-center gap-2 text-sm"><Clock3 className="h-4 w-4 text-primary" /> {duration}</div>
          <div className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-primary" /> {travelers} Travelers</div>
        </div>
      </Card>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {selectionCount === 0
            ? "Nothing selected yet — Compass will use your booking details only."
            : `${selectionCount} preference${selectionCount === 1 ? "" : "s"} selected. Tap a selected option again to remove it.`}
        </p>
        {selectionCount > 0 && (
          <Button variant="ghost" size="sm" className="gap-1.5" onClick={clearAll}>
            <RotateCcw className="h-3.5 w-3.5" /> Clear all
          </Button>
        )}
      </div>

      <div className="mt-6 space-y-8">
        <div>
          <h2 className="font-bold text-foreground">Budget</h2>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {budgetOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                aria-pressed={budget === opt.id}
                onClick={() => pickOne(budget, opt.id, setBudget)}
                className={cn(
                  "rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors",
                  budget === opt.id ? "border-primary bg-primary-light text-primary-dark" : "border-border text-foreground hover:border-primary/40"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-foreground">Travel Style</h2>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {travelStyleOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                aria-pressed={style === opt.id}
                onClick={() => pickOne(style, opt.id, setStyle)}
                className={cn(
                  "rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors",
                  style === opt.id ? "border-primary bg-primary-light text-primary-dark" : "border-border text-foreground hover:border-primary/40"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-foreground">Interests</h2>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {interestOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                aria-pressed={interests.includes(opt)}
                onClick={() => toggleInterest(opt)}
                className={cn(
                  "rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors",
                  interests.includes(opt) ? "border-accent bg-accent-light text-accent" : "border-border text-foreground hover:border-accent/40"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-foreground">Preferred Pace</h2>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {paceOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                aria-pressed={pace === opt.id}
                onClick={() => pickOne(pace, opt.id, setPace)}
                className={cn(
                  "rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors",
                  pace === opt.id ? "border-primary bg-primary-light text-primary-dark" : "border-border text-foreground hover:border-primary/40"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <label className="mt-8 flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
        <Checkbox checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} className="mt-0.5" />
        <span className="flex items-start gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          I agree to let Compass use my trip details and preferences to personalize recommendations. I can change this anytime in Privacy settings.
        </span>
      </label>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button variant="ghost" onClick={handleSkip}>Skip Preferences</Button>
        <Button size="lg" className="gap-1.5" onClick={handleGenerate} disabled={!consent}>
          Generate My Trip <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
