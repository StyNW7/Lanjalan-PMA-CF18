import type { ItineraryDay } from "./types"

export const claraPersona = {
  name: "Clara",
  profile: "Young Leisure Traveler",
  origin: "Jakarta",
  destination: "Bali",
  tripLength: "4D3N",
  travelers: 2,
  dateRange: "18–21 September 2026",
  flight: "Jakarta → Bali · Garuda Indonesia GA 402",
  preferences: {
    budget: "IDR 4–6M",
    style: "Balanced",
    interests: ["Culinary", "Beach", "Culture"],
    pace: "Moderate",
  },
}

export const budgetOptions = [
  { id: "under-2m", label: "Under IDR 2M" },
  { id: "2m-4m", label: "IDR 2–4M" },
  { id: "4m-6m", label: "IDR 4–6M" },
  { id: "flexible", label: "Flexible" },
]

export const travelStyleOptions = [
  { id: "relaxed", label: "Relaxed" },
  { id: "balanced", label: "Balanced" },
  { id: "packed", label: "Packed" },
]

export const interestOptions = [
  "Culinary",
  "Culture",
  "Nature",
  "Beach",
  "Adventure",
  "Shopping",
  "Hidden Gems",
]

export const paceOptions = [
  { id: "slow", label: "Slow" },
  { id: "moderate", label: "Moderate" },
  { id: "fast", label: "Fast" },
]

export const generatingStages = [
  "Reading your confirmed trip",
  "Matching stays",
  "Finding relevant activities",
  "Optimizing your daily plan",
  "Building your itinerary",
]

export const defaultBaliItinerary: ItineraryDay[] = [
  {
    day: 1,
    label: "Day 1 · Arrival",
    items: [
      { id: "d1-1", time: "17:30", title: "Arrival at Ngurah Rai Airport", location: "Ngurah Rai International", duration: "30 min", cost: 0, category: "Arrival" },
      { id: "d1-2", time: "19:00", title: "Hotel Check-in", location: "Seminyak Haven", duration: "30 min", cost: 0, travelTime: "35 min from airport", category: "Hotel" },
      { id: "d1-3", time: "20:00", title: "Dinner in Seminyak", location: "Seminyak Beach Road", duration: "1.5 hours", cost: 250000, travelTime: "10 min walk", category: "Meal" },
    ],
  },
  {
    day: 2,
    label: "Day 2 · Culture & Coast",
    items: [
      { id: "d2-1", time: "08:00", title: "Breakfast at Hotel", location: "Seminyak Haven", duration: "1 hour", cost: 0, category: "Meal" },
      { id: "d2-2", time: "10:00", title: "Uluwatu Temple Visit", location: "Uluwatu, South Bali", duration: "3 hours", cost: 150000, travelTime: "45 min drive", category: "Culture" },
      { id: "d2-3", time: "13:00", title: "Lunch near Uluwatu", location: "Uluwatu, South Bali", duration: "1 hour", cost: 180000, category: "Meal" },
      { id: "d2-4", time: "16:00", title: "Sunset Beach Experience", location: "Seminyak Beach", duration: "2 hours", cost: 120000, travelTime: "40 min drive", category: "Relaxation" },
      { id: "d2-5", time: "19:00", title: "Dinner in Seminyak", location: "Seminyak Beach Road", duration: "1.5 hours", cost: 260000, category: "Meal" },
    ],
  },
  {
    day: 3,
    label: "Day 3 · Ubud",
    items: [
      { id: "d3-1", time: "08:00", title: "Breakfast at Hotel", location: "Seminyak Haven", duration: "1 hour", cost: 0, category: "Meal" },
      { id: "d3-2", time: "09:30", title: "Balinese Cooking Class", location: "Ubud, Bali", duration: "4 hours", cost: 320000, travelTime: "1 hour drive", category: "Food" },
      { id: "d3-3", time: "14:00", title: "Ubud Cultural Walk", location: "Ubud, Bali", duration: "2.5 hours", cost: 180000, category: "Culture" },
      { id: "d3-4", time: "19:00", title: "Dinner in Ubud", location: "Ubud Center", duration: "1.5 hours", cost: 240000, category: "Meal" },
    ],
  },
  {
    day: 4,
    label: "Day 4 · Departure",
    items: [
      { id: "d4-1", time: "08:00", title: "Breakfast at Hotel", location: "Seminyak Haven", duration: "1 hour", cost: 0, category: "Meal" },
      { id: "d4-2", time: "10:00", title: "Free Time / Last-minute Shopping", location: "Seminyak", duration: "2 hours", cost: 200000, category: "Relaxation" },
      { id: "d4-3", time: "13:00", title: "Hotel Check-out", location: "Seminyak Haven", duration: "30 min", cost: 0, category: "Hotel" },
      { id: "d4-4", time: "15:30", title: "Departure from Ngurah Rai Airport", location: "Ngurah Rai International", duration: "-", cost: 0, travelTime: "35 min to airport", category: "Arrival" },
    ],
  },
]

export const fallbackItinerary: ItineraryDay[] = [
  {
    day: 1,
    label: "Day 1 · Starter Plan",
    items: [
      { id: "fb1-1", time: "18:00", title: "Arrival & Hotel Check-in", location: "Bali", duration: "1 hour", cost: 0, category: "Arrival" },
      { id: "fb1-2", time: "20:00", title: "Dinner near your hotel", location: "Bali", duration: "1.5 hours", cost: 200000, category: "Meal" },
    ],
  },
  {
    day: 2,
    label: "Day 2 · Starter Plan",
    items: [
      { id: "fb2-1", time: "09:00", title: "Popular Cultural Landmark", location: "Bali", duration: "3 hours", cost: 150000, category: "Culture" },
      { id: "fb2-2", time: "15:00", title: "Local Beach Time", location: "Bali", duration: "2 hours", cost: 0, category: "Relaxation" },
    ],
  },
]

export function tripBudgetBreakdown(totalBudget: number) {
  const flight = 2900000
  const hotel = 1860000
  const activitiesEstimate = 640000
  const transportation = 250000
  const estimated = flight + hotel + activitiesEstimate + transportation
  const remaining = Math.max(totalBudget - estimated, 0)
  return {
    totalBudget,
    flight,
    hotel,
    activities: activitiesEstimate,
    transportation,
    estimated,
    remaining,
  }
}
