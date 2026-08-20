import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { Compass, RefreshCw, Plus, Wallet, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { TripStatus } from "@/components/travel/TripStatus"
import { ItineraryItemCard } from "@/components/travel/ItineraryItemCard"
import { BudgetChart } from "@/components/travel/BudgetChart"
import { RecommendationCard } from "@/components/travel/RecommendationCard"
import { FadeInGrid, FadeInItem } from "@/components/ui/fade-in"
import { useAppState } from "@/context/app-state"
import { defaultBaliItinerary, tripBudgetBreakdown, claraPersona } from "@/data/compass"
import { getHotelById } from "@/data/hotels"
import { getActivityById } from "@/data/activities"
import { cn } from "@/lib/utils"

export default function CompassTripWorkspacePage() {
  const navigate = useNavigate()
  const { trip, updateItinerary } = useAppState()
  const [activeDay, setActiveDay] = useState(1)

  const itinerary = trip.compass.itinerary || defaultBaliItinerary
  const destination = trip.destination || claraPersona.destination
  const travelers = trip.travelers || claraPersona.travelers

  const flightBooked = trip.flight.booked || true
  const hotelBooked = trip.hotel.booked
  const activitiesPlanned = trip.activities.bookedIds.length
  const activitiesTotal = 4

  const completion = useMemo(() => {
    let score = 40
    if (hotelBooked) score += 30
    score += Math.min(activitiesPlanned, activitiesTotal) * 7.5
    return Math.min(Math.round(score), 100)
  }, [hotelBooked, activitiesPlanned])

  const currentDay = itinerary.find((d) => d.day === activeDay) || itinerary[0]
  const budget = tripBudgetBreakdown(5000000)

  const recommendedHotel = getHotelById("seminyak-haven")
  const recommendedActivity = getActivityById("sunset-beach-experience")

  function updateDayItems(dayNumber: number, mutate: (items: typeof currentDay.items) => typeof currentDay.items) {
    const next = itinerary.map((d) => (d.day === dayNumber ? { ...d, items: mutate(d.items) } : d))
    updateItinerary(next)
  }

  function handleToggleLock(itemId: string) {
    updateDayItems(activeDay, (items) => items.map((it) => (it.id === itemId ? { ...it, locked: !it.locked } : it)))
  }

  function handleRemove(itemId: string) {
    updateDayItems(activeDay, (items) => items.filter((it) => it.id !== itemId))
    toast.success("Removed from your itinerary.")
  }

  function handleSwap(itemId: string) {
    toast.success("Try Another Option — swapped with a similar pick.")
    updateDayItems(activeDay, (items) =>
      items.map((it) => (it.id === itemId ? { ...it, title: `${it.title} (Alternative)` } : it))
    )
  }

  function handleRegenerateDay() {
    updateDayItems(activeDay, (items) => items.map((it) => (it.locked ? it : { ...it })))
    toast.success(`Day ${activeDay} refreshed with your locked items kept in place.`)
  }

  return (
    <div className="bg-muted/30">
      <div className="border-b border-border bg-background">
        <div className="container flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary">
              <Compass className="h-3.5 w-3.5" /> Compass Itinerary
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-foreground sm:text-3xl">
              {destination}, {itinerary.length} Days
            </h1>
            <p className="text-sm text-muted-foreground">{travelers} travelers · Editable at any time</p>
          </div>
          <div className="w-full sm:w-64">
            <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Your Trip is Ready</span>
              <span className="text-foreground">{completion}%</span>
            </div>
            <Progress value={completion} />
          </div>
        </div>
        <div className="container pb-6">
          <TripStatus
            flightBooked={flightBooked}
            hotelBooked={hotelBooked}
            activitiesPlanned={activitiesPlanned}
            activitiesTotal={activitiesTotal}
          />
        </div>
      </div>

      <div className="container grid grid-cols-1 gap-6 py-8 lg:grid-cols-[180px_1fr_340px]">
        {/* Day navigation */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar lg:flex-col lg:overflow-visible">
          {itinerary.map((day) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              className={cn(
                "shrink-0 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors lg:w-full",
                activeDay === day.day ? "border-primary bg-primary-light text-primary-dark" : "border-border bg-card text-foreground hover:border-primary/40"
              )}
            >
              <p className="text-xs text-muted-foreground">Day {day.day}</p>
              <p className="mt-0.5 whitespace-nowrap lg:whitespace-normal">{day.label.replace(/^Day \d+ · /, "")}</p>
            </button>
          ))}
        </div>

        {/* Itinerary timeline */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">{currentDay.label}</h2>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={handleRegenerateDay}>
              <RefreshCw className="h-3.5 w-3.5" /> Regenerate Day
            </Button>
          </div>
          <FadeInGrid key={activeDay} className="space-y-4">
            {currentDay.items.map((item) => (
              <FadeInItem key={item.id}>
                <ItineraryItemCard
                  item={item}
                  onLockToggle={() => handleToggleLock(item.id)}
                  onRemove={() => handleRemove(item.id)}
                  onSwap={() => handleSwap(item.id)}
                />
              </FadeInItem>
            ))}
          </FadeInGrid>
          <Button
            variant="ghost"
            className="mt-4 w-full gap-1.5 border border-dashed border-border"
            onClick={() => toast.success("More activities added for this day.")}
          >
            <Plus className="h-4 w-4" /> Add Activity
          </Button>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          <Card className="p-5">
            <p className="flex items-center gap-1.5 font-bold text-foreground"><Wallet className="h-4 w-4 text-primary" /> Trip Budget</p>
            <BudgetChart
              flight={budget.flight}
              hotel={budget.hotel}
              activities={budget.activities}
              transportation={budget.transportation}
              remaining={budget.remaining}
            />
          </Card>

          <div>
            <p className="mb-3 flex items-center gap-1.5 text-sm font-bold text-foreground"><Sparkles className="h-4 w-4 text-accent" /> Recommended For This Trip</p>
            <FadeInGrid className="space-y-3">
              {recommendedHotel && !hotelBooked && (
                <FadeInItem>
                  <RecommendationCard
                    image={recommendedHotel.image}
                    title={recommendedHotel.name}
                    subtitle={`${recommendedHotel.neighborhood}, ${recommendedHotel.city}`}
                    matchLabel={`${recommendedHotel.tripMatch}% Trip Match`}
                    reasons={recommendedHotel.matchReasons || []}
                    price={recommendedHotel.pricePerNight}
                    onAction={() => navigate(`/hotels/${recommendedHotel.id}`)}
                  />
                </FadeInItem>
              )}
              {hotelBooked && (
                <FadeInItem>
                  <Card className="border-success/30 bg-success/5 p-4 text-sm font-medium text-success">
                    {trip.hotel.hotelName} is booked for this trip.
                  </Card>
                </FadeInItem>
              )}
              {recommendedActivity && (
                <FadeInItem>
                  <RecommendationCard
                    image={recommendedActivity.image}
                    title={recommendedActivity.title}
                    subtitle={recommendedActivity.location}
                    matchLabel="Recommended for Day 2"
                    reasons={[recommendedActivity.compassReason || "Fits your interests"]}
                    price={recommendedActivity.price}
                    priceLabel="per person"
                    ctaLabel="View Activity"
                    onAction={() => navigate(`/activities/${recommendedActivity.id}`)}
                  />
                </FadeInItem>
              )}
            </FadeInGrid>
          </div>

          <Badge variant="muted" className="w-full justify-center py-2 text-center text-xs">
            Your changes always override Compass suggestions
          </Badge>
        </div>
      </div>
    </div>
  )
}
