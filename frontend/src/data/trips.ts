import type { Trip } from "./types"

export const trips: Trip[] = [
  {
    id: "bali-sep-2026",
    destination: "Bali",
    destinationImage: "https://picsum.photos/seed/lanjalan-bali/900/700",
    dateRange: "18–21 September 2026",
    duration: "4 Days / 3 Nights",
    travelers: 2,
    progress: 65,
    flightStatus: "Confirmed",
    hotelStatus: "Booked",
    activitiesPlanned: 2,
    activitiesTotal: 4,
    status: "Planning",
  },
  {
    id: "jogja-jul-2026",
    destination: "Yogyakarta",
    destinationImage: "https://picsum.photos/seed/lanjalan-jogja/900/700",
    dateRange: "3–6 July 2026",
    duration: "3 Days / 2 Nights",
    travelers: 1,
    progress: 100,
    flightStatus: "Confirmed",
    hotelStatus: "Booked",
    activitiesPlanned: 3,
    activitiesTotal: 3,
    status: "Completed",
  },
  {
    id: "singapore-nov-2026",
    destination: "Singapore",
    destinationImage: "https://picsum.photos/seed/lanjalan-singapore/900/700",
    dateRange: "Dates not set",
    duration: "3 Days / 2 Nights",
    travelers: 2,
    progress: 10,
    flightStatus: "Not Booked",
    hotelStatus: "Not Booked",
    activitiesPlanned: 0,
    activitiesTotal: 0,
    status: "Draft",
  },
]

export function getTripById(id: string) {
  return trips.find((t) => t.id === id)
}
