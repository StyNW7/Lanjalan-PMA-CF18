import { ShieldCheck, Compass, Eye, Trash2, BellOff, ToggleLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useAppState } from "@/context/app-state"
import toast from "react-hot-toast"

const dataUsed = [
  "Confirmed booking context (destination, dates, travelers)",
  "Optional travel preferences you provide",
  "Your interactions with itinerary items",
]

const userControls = [
  { icon: ToggleLeft, label: "Opt out of personalization at any time" },
  { icon: Trash2, label: "Delete your saved Compass preferences" },
  { icon: BellOff, label: "Disable personalization-related notifications" },
  { icon: Eye, label: "Review what Compass uses, in plain language" },
]

export default function PrivacyPage() {
  const { personalizationEnabled, setPersonalizationEnabled, skipCompassPreferences, trip } = useAppState()

  function handleDeletePreferences() {
    skipCompassPreferences()
    toast.success("Compass preferences cleared.")
  }

  return (
    <div className="container max-w-3xl py-10">
      <h1 className="flex items-center gap-2 text-2xl font-extrabold text-foreground">
        <ShieldCheck className="h-5 w-5 text-primary" /> Privacy & Personalization
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">A clear look at what Compass uses, and full control over your data.</p>

      <Card className="mt-8 border-primary/20 bg-primary-light/40 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 font-bold text-foreground"><Compass className="h-4 w-4 text-primary" /> Compass Personalization</h2>
            <p className="mt-1 text-sm text-muted-foreground">Allow Compass to use your booking context and preferences to personalize recommendations.</p>
          </div>
          <Switch checked={personalizationEnabled} onCheckedChange={setPersonalizationEnabled} />
        </div>
      </Card>

      <Card className="mt-6 p-6">
        <h2 className="font-bold text-foreground">What Compass Uses</h2>
        <ul className="mt-4 space-y-2.5">
          {dataUsed.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {item}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="mt-6 p-6">
        <h2 className="font-bold text-foreground">You're Always in Control</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {userControls.map((c) => (
            <div key={c.label} className="flex items-start gap-2.5 rounded-xl border border-border p-3.5">
              <c.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="text-sm text-foreground">{c.label}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mt-6 p-6">
        <h2 className="font-bold text-foreground">Your Saved Compass Preferences</h2>
        {trip.compass.preferencesSet && (trip.compass.preferences.budget || trip.compass.preferences.interests.length > 0) ? (
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
            {trip.compass.preferences.budget && <span className="rounded-full bg-muted px-3 py-1">Budget: {trip.compass.preferences.budget}</span>}
            {trip.compass.preferences.style && <span className="rounded-full bg-muted px-3 py-1">Style: {trip.compass.preferences.style}</span>}
            {trip.compass.preferences.interests.map((i) => <span key={i} className="rounded-full bg-muted px-3 py-1">{i}</span>)}
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">No preferences saved yet.</p>
        )}
        <Button variant="destructive" size="sm" className="mt-4 gap-1.5" onClick={handleDeletePreferences}>
          <Trash2 className="h-3.5 w-3.5" /> Delete Compass Preferences
        </Button>
      </Card>
    </div>
  )
}
