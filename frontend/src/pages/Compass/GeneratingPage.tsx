import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Compass, CheckCircle2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { generatingStages, defaultBaliItinerary } from "@/data/compass"
import { useAppState } from "@/context/app-state"

export default function CompassGeneratingPage() {
  const navigate = useNavigate()
  const { setItinerary } = useAppState()
  const [stageIndex, setStageIndex] = useState(0)

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setStageIndex((i) => Math.min(i + 1, generatingStages.length - 1))
    }, 550)

    const finishTimeout = setTimeout(() => {
      setItinerary(defaultBaliItinerary)
      navigate("/compass/trip/bali-sep-2026")
    }, 3000)

    return () => {
      clearInterval(stageInterval)
      clearTimeout(finishTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container flex min-h-[calc(100svh-4rem)] max-w-2xl flex-col items-center justify-center py-10 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light"
      >
        <Compass className="h-8 w-8 text-primary" />
      </motion.div>
      <h1 className="mt-6 text-2xl font-extrabold text-foreground">Building your trip</h1>
      <p className="mt-2 text-muted-foreground">Compass is creating a plan around your confirmed flight.</p>

      <div className="mt-8 w-full space-y-3">
        {generatingStages.map((stage, i) => (
          <div
            key={stage}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
              i <= stageIndex ? "border-primary/30 bg-primary-light/50" : "border-border bg-card"
            }`}
          >
            {i < stageIndex ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
            ) : i === stageIndex ? (
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="h-4 w-4 shrink-0 rounded-full bg-primary"
              />
            ) : (
              <div className="h-4 w-4 shrink-0 rounded-full border-2 border-border" />
            )}
            <span className={`text-sm font-medium ${i <= stageIndex ? "text-foreground" : "text-muted-foreground"}`}>{stage}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 w-full space-y-3">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-5/6" />
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  )
}
