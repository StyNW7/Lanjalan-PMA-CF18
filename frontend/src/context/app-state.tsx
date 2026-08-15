import { createContext, useContext, useMemo } from "react"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { defaultBaliItinerary } from "@/data/compass"
import type { ItineraryDay } from "@/data/types"

export interface CompassPreferences {
  budget: string | null
  style: string | null
  interests: string[]
  pace: string | null
}

export interface ActiveTrip {
  destination: string
  dateRange: string
  duration: string
  travelers: number
  flight: { booked: boolean; summary?: string }
  hotel: { booked: boolean; hotelId?: string; hotelName?: string }
  activities: { bookedIds: string[] }
  compass: {
    preferencesSet: boolean
    preferences: CompassPreferences
    itinerary: ItineraryDay[] | null
    generated: boolean
  }
}

const emptyTrip: ActiveTrip = {
  destination: "",
  dateRange: "",
  duration: "",
  travelers: 1,
  flight: { booked: false },
  hotel: { booked: false },
  activities: { bookedIds: [] },
  compass: {
    preferencesSet: false,
    preferences: { budget: null, style: null, interests: [], pace: null },
    itinerary: null,
    generated: false,
  },
}

interface Wishlist {
  hotels: string[]
  activities: string[]
  destinations: string[]
}

interface OnboardingData {
  completed: boolean
  travelerType: string | null
  priorities: string[]
}

interface AppStateShape {
  onboarding: OnboardingData
  completeOnboarding: (travelerType: string | null, priorities: string[]) => void
  skipOnboarding: () => void

  trip: ActiveTrip
  bookFlight: (destination: string, dateRange: string, duration: string, travelers: number, summary: string) => void
  bookHotel: (hotelId: string, hotelName: string) => void
  toggleActivityBooked: (activityId: string) => void
  setCompassPreferences: (prefs: CompassPreferences) => void
  skipCompassPreferences: () => void
  setItinerary: (days: ItineraryDay[]) => void
  updateItinerary: (days: ItineraryDay[]) => void
  resetTrip: () => void

  wishlist: Wishlist
  toggleWishlistItem: (type: keyof Wishlist, id: string) => void

  readNotificationIds: string[]
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: (ids: string[]) => void

  personalizationEnabled: boolean
  setPersonalizationEnabled: (val: boolean) => void
}

const AppStateContext = createContext<AppStateShape | undefined>(undefined)

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [onboarding, setOnboarding] = useLocalStorage<OnboardingData>("lanjalan-onboarding", {
    completed: false,
    travelerType: null,
    priorities: [],
  })

  const [trip, setTrip] = useLocalStorage<ActiveTrip>("lanjalan-active-trip", emptyTrip)

  const [wishlist, setWishlist] = useLocalStorage<Wishlist>("lanjalan-wishlist", {
    hotels: [],
    activities: [],
    destinations: [],
  })

  const [readNotificationIds, setReadNotificationIds] = useLocalStorage<string[]>(
    "lanjalan-read-notifications",
    []
  )

  const [personalizationEnabled, setPersonalizationEnabled] = useLocalStorage<boolean>(
    "lanjalan-personalization",
    true
  )

  const value = useMemo<AppStateShape>(
    () => ({
      onboarding,
      completeOnboarding: (travelerType, priorities) =>
        setOnboarding({ completed: true, travelerType, priorities }),
      skipOnboarding: () => setOnboarding((prev) => ({ ...prev, completed: true })),

      trip,
      bookFlight: (destination, dateRange, duration, travelers, summary) =>
        setTrip((prev) => ({
          ...prev,
          destination,
          dateRange,
          duration,
          travelers,
          flight: { booked: true, summary },
        })),
      bookHotel: (hotelId, hotelName) =>
        setTrip((prev) => ({ ...prev, hotel: { booked: true, hotelId, hotelName } })),
      toggleActivityBooked: (activityId) =>
        setTrip((prev) => {
          const has = prev.activities.bookedIds.includes(activityId)
          return {
            ...prev,
            activities: {
              bookedIds: has
                ? prev.activities.bookedIds.filter((id) => id !== activityId)
                : [...prev.activities.bookedIds, activityId],
            },
          }
        }),
      setCompassPreferences: (prefs) =>
        setTrip((prev) => ({
          ...prev,
          compass: { ...prev.compass, preferencesSet: true, preferences: prefs },
        })),
      skipCompassPreferences: () =>
        setTrip((prev) => ({ ...prev, compass: { ...prev.compass, preferencesSet: true } })),
      setItinerary: (days) =>
        setTrip((prev) => ({
          ...prev,
          compass: { ...prev.compass, itinerary: days, generated: true },
        })),
      updateItinerary: (days) =>
        setTrip((prev) => ({ ...prev, compass: { ...prev.compass, itinerary: days } })),
      resetTrip: () =>
        setTrip({
          ...emptyTrip,
          destination: "Bali",
          dateRange: "18–21 September 2026",
          duration: "4 Days / 3 Nights",
          travelers: 2,
        }),

      wishlist,
      toggleWishlistItem: (type, id) =>
        setWishlist((prev) => {
          const has = prev[type].includes(id)
          return { ...prev, [type]: has ? prev[type].filter((x) => x !== id) : [...prev[type], id] }
        }),

      readNotificationIds,
      markNotificationRead: (id) =>
        setReadNotificationIds((prev) => (prev.includes(id) ? prev : [...prev, id])),
      markAllNotificationsRead: (ids) => setReadNotificationIds(ids),

      personalizationEnabled,
      setPersonalizationEnabled,
    }),
    [onboarding, trip, wishlist, readNotificationIds, personalizationEnabled, setOnboarding, setTrip, setWishlist, setReadNotificationIds, setPersonalizationEnabled]
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider")
  return ctx
}

export { defaultBaliItinerary }
