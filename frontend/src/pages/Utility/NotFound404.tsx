import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Home, Compass, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center bg-gradient-to-b from-primary-light via-background to-background px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-background shadow-soft"
      >
        <Compass className="h-9 w-9 text-primary" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-6 max-w-md"
      >
        <p className="text-6xl font-extrabold tracking-tight text-primary/20">404</p>
        <h1 className="mt-2 text-2xl font-extrabold text-foreground sm:text-3xl">Looks like this route hasn't been mapped yet.</h1>
        <p className="mt-3 text-muted-foreground">
          The page you're looking for might have moved, or the trip you're chasing hasn't been planned yet.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-8 flex flex-wrap justify-center gap-3"
      >
        <Button asChild size="lg" className="gap-1.5">
          <Link to="/"><Home className="h-4 w-4" /> Back to Home</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="gap-1.5">
          <Link to="/explore"><Search className="h-4 w-4" /> Explore Destinations</Link>
        </Button>
      </motion.div>
    </div>
  )
}
