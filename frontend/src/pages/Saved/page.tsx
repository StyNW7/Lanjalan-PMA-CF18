import { Heart } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"
import { SectionHeading } from "@/components/ui/section-heading"
import { HotelCard } from "@/components/travel/HotelCard"
import { ActivityCard } from "@/components/travel/ActivityCard"
import { DestinationCard } from "@/components/travel/DestinationCard"
import { FadeInGrid, FadeInItem } from "@/components/ui/fade-in"
import { hotels } from "@/data/hotels"
import { activities } from "@/data/activities"
import { destinations } from "@/data/destinations"
import { useAppState } from "@/context/app-state"

export default function SavedPage() {
  const { wishlist, toggleWishlistItem } = useAppState()

  const savedHotels = hotels.filter((h) => wishlist.hotels.includes(h.id))
  const savedActivities = activities.filter((a) => wishlist.activities.includes(a.id))
  const savedDestinations = destinations.filter((d) => wishlist.destinations.includes(d.id))

  const isEmpty = savedHotels.length === 0 && savedActivities.length === 0 && savedDestinations.length === 0

  return (
    <div className="container py-10">
      <h1 className="flex items-center gap-2 text-2xl font-extrabold text-foreground">
        <Heart className="h-5 w-5 text-accent" /> Saved
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">Hotels, activities, and destinations you've bookmarked for later.</p>

      {isEmpty ? (
        <EmptyState
          icon={Heart}
          title="Nothing saved yet"
          description="Tap the heart icon on any hotel or activity to save it here."
          className="mt-10"
        />
      ) : (
        <div className="mt-8 space-y-12">
          {savedHotels.length > 0 && (
            <div>
              <SectionHeading title="Saved Stays" />
              <FadeInGrid className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {savedHotels.map((h, i) => (
                  <FadeInItem key={h.id} index={i}>
                    <HotelCard hotel={h} saved onToggleSave={() => toggleWishlistItem("hotels", h.id)} />
                  </FadeInItem>
                ))}
              </FadeInGrid>
            </div>
          )}
          {savedActivities.length > 0 && (
            <div>
              <SectionHeading title="Saved Activities" />
              <FadeInGrid className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {savedActivities.map((a, i) => (
                  <FadeInItem key={a.id} index={i}>
                    <ActivityCard activity={a} saved onToggleSave={() => toggleWishlistItem("activities", a.id)} />
                  </FadeInItem>
                ))}
              </FadeInGrid>
            </div>
          )}
          {savedDestinations.length > 0 && (
            <div>
              <SectionHeading title="Saved Destinations" />
              <FadeInGrid className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {savedDestinations.map((d, i) => (
                  <FadeInItem key={d.id} index={i}>
                    <DestinationCard destination={d} />
                  </FadeInItem>
                ))}
              </FadeInGrid>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
