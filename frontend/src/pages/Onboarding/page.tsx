import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Compass,
  Palmtree,
  Mountain,
  UtensilsCrossed,
  Landmark,
  Trees,
  Building2,
  Wallet,
  Clock,
  MapPin,
  Sparkles,
  CalendarClock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useAppState } from "@/context/app-state"

const travelerTypes = [
  { id: "relaxed", label: "Relaxed", icon: Palmtree },
  { id: "adventure", label: "Adventure", icon: Mountain },
  { id: "culinary", label: "Culinary", icon: UtensilsCrossed },
  { id: "culture", label: "Culture", icon: Landmark },
  { id: "nature", label: "Nature", icon: Trees },
  { id: "city", label: "City Explorer", icon: Building2 },
]

const priorities = [
  { id: "budget", label: "Budget", icon: Wallet },
  { id: "convenience", label: "Convenience", icon: Clock },
  { id: "location", label: "Location", icon: MapPin },
  { id: "experiences", label: "Experiences", icon: Sparkles },
  { id: "flexibility", label: "Flexibility", icon: CalendarClock },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { completeOnboarding, skipOnboarding } = useAppState()
  const [step, setStep] = useState(1)
  const [travelerType, setTravelerType] = useState<string | null>(null)
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([])

  function togglePriority(id: string) {
    setSelectedPriorities((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  function handleFinish() {
    completeOnboarding(travelerType, selectedPriorities)
    navigate("/")
  }

  function handleSkip() {
    skipOnboarding()
    navigate("/")
  }

  return (
    <div className="flex min-h-[calc(100svh-4rem)] flex-col bg-gradient-to-b from-primary-light via-background to-background">
      <div className="container flex flex-1 flex-col py-10">
        <div className="mx-auto w-full max-w-xl">
          <div className="mb-8 flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-bold text-primary-dark">
              <Compass className="h-4 w-4" /> Step {step} of 4
            </span>
            {step < 4 && (
              <button onClick={handleSkip} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Skip for now
              </button>
            )}
          </div>
          <Progress value={(step / 4) * 100} className="mb-10" />

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
                  <Compass className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-3xl font-extrabold text-foreground">Welcome to Lanjalan</h1>
                <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
                  Let's set up a few preferences so we can point you toward the right flights, stays, and
                  experiences from the start.
                </p>
                <Button size="lg" className="mt-8 gap-1.5" onClick={() => setStep(2)}>
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
                <h1 className="text-center text-2xl font-extrabold text-foreground">What kind of traveler are you?</h1>
                <p className="mt-2 text-center text-sm text-muted-foreground">This helps us tailor recommendations. Optional.</p>
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {travelerTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setTravelerType(type.id)}
                      className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-5 transition-colors ${
                        travelerType === type.id ? "border-primary bg-primary-light" : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <type.icon className={`h-6 w-6 ${travelerType === type.id ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm font-semibold text-foreground">{type.label}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex justify-between">
                  <Button variant="ghost" className="gap-1.5" onClick={() => setStep(1)}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button className="gap-1.5" onClick={() => setStep(3)}>
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
                <h1 className="text-center text-2xl font-extrabold text-foreground">What matters most when you travel?</h1>
                <p className="mt-2 text-center text-sm text-muted-foreground">Select as many as you like. Optional.</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {priorities.map((p) => {
                    const active = selectedPriorities.includes(p.id)
                    return (
                      <button
                        key={p.id}
                        onClick={() => togglePriority(p.id)}
                        className={`flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-colors ${
                          active ? "border-primary bg-primary-light text-primary-dark" : "border-border bg-card text-foreground hover:border-primary/40"
                        }`}
                      >
                        <p.icon className="h-4 w-4" /> {p.label}
                      </button>
                    )
                  })}
                </div>
                <div className="mt-8 flex justify-between">
                  <Button variant="ghost" className="gap-1.5" onClick={() => setStep(2)}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button className="gap-1.5" onClick={() => setStep(4)}>
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
                <h1 className="text-3xl font-extrabold text-foreground">You're ready to explore.</h1>
                <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
                  We'll use your preferences to highlight the flights, stays, and experiences that fit you best.
                </p>
                <Button size="lg" className="mt-8 gap-1.5" onClick={handleFinish}>
                  Start Exploring <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
