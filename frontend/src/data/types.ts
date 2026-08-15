export type CabinClass = "Economy" | "Premium Economy" | "Business" | "First"

export interface Airport {
  code: string
  city: string
  name: string
}

export interface Flight {
  id: string
  airline: string
  airlineCode: string
  flightNumber: string
  origin: Airport
  destination: Airport
  departTime: string
  arriveTime: string
  duration: string
  stops: number
  stopCities?: string[]
  price: number
  cabin: CabinClass
  baggage: string
  refundable: boolean
  recommended?: boolean
}

export interface Hotel {
  id: string
  name: string
  city: string
  neighborhood: string
  rating: number
  reviewCount: number
  pricePerNight: number
  image: string
  images: string[]
  amenities: string[]
  propertyType: "Hotel" | "Villa" | "Resort" | "Guesthouse" | "Apartment"
  freeCancellation: boolean
  description: string
  tripMatch?: number
  matchReasons?: string[]
  distanceFromCenter: string
  latOffset?: number
  lngOffset?: number
}

export type ActivityCategory =
  | "Adventure"
  | "Food"
  | "Culture"
  | "Nature"
  | "Family"
  | "Nightlife"
  | "Relaxation"

export interface Activity {
  id: string
  title: string
  city: string
  category: ActivityCategory
  duration: string
  rating: number
  reviewCount: number
  price: number
  location: string
  image: string
  description: string
  highlights: string[]
  compassReason?: string
}

export interface Destination {
  id: string
  name: string
  country: string
  image: string
  gallery?: string[]
  description: string
  longDescription?: string
  startingPrice: number
  hotelCount: number
  activityCount: number
  tag?: string
  airportCode?: string
  bestTimeToVisit?: string
  averageFlightDuration?: string
  highlights?: string[]
}

export interface Promotion {
  id: string
  title: string
  description: string
  category: "Flights" | "Hotels" | "Activities" | "Bundles"
  code: string
  discount: string
  expiration: string
  terms: string
  image: string
}

export interface Trip {
  id: string
  destination: string
  destinationImage: string
  dateRange: string
  duration: string
  travelers: number
  progress: number
  flightStatus: "Confirmed" | "Not Booked"
  hotelStatus: "Booked" | "Pending" | "Not Booked"
  activitiesPlanned: number
  activitiesTotal: number
  status: "Draft" | "Planning" | "Completed"
}

export interface Transaction {
  id: string
  bookingId: string
  product: "Flight" | "Hotel" | "Activity"
  title: string
  date: string
  amount: number
  status: "Confirmed" | "Completed" | "Cancelled" | "Refund Processing"
}

export interface Notification {
  id: string
  title: string
  description: string
  date: string
  read: boolean
  type: "trip" | "price" | "booking" | "compass" | "promo"
}

export interface ItineraryItem {
  id: string
  time: string
  title: string
  location: string
  duration: string
  cost: number
  travelTime?: string
  locked?: boolean
  category: ActivityCategory | "Transit" | "Meal" | "Arrival" | "Hotel"
}

export interface ItineraryDay {
  day: number
  label: string
  items: ItineraryItem[]
}
