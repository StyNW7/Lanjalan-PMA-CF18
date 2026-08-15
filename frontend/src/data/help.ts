export interface FaqItem {
  id: string
  category: "Flights" | "Hotels" | "Activities" | "Compass" | "Payments" | "Refunds" | "Account"
  question: string
  answer: string
}

export const helpCategories = ["Flights", "Hotels", "Activities", "Compass", "Payments", "Refunds", "Account"] as const

export const faqs: FaqItem[] = [
  {
    id: "f1",
    category: "Compass",
    question: "What is Lanjalan Compass?",
    answer:
      "Compass is a trip planning tool that uses your confirmed flight details and optional preferences to build a personalized day-by-day itinerary, complete with hotel and activity suggestions.",
  },
  {
    id: "f2",
    category: "Compass",
    question: "Can I edit a Compass itinerary?",
    answer:
      "Yes. Every item in your itinerary can be swapped, removed, reordered, or locked in place. Your changes always take priority over Compass suggestions.",
  },
  {
    id: "f3",
    category: "Compass",
    question: "Do I have to use Compass?",
    answer:
      "No. Compass is entirely optional. You can continue planning manually through Hotels and Activities at any time, or skip it and come back later.",
  },
  {
    id: "f4",
    category: "Compass",
    question: "Can I continue planning later?",
    answer:
      "Yes. Your itinerary is saved automatically to My Trips, so you can pick up exactly where you left off.",
  },
  {
    id: "f5",
    category: "Compass",
    question: "Does Compass automatically book for me?",
    answer:
      "No. Compass never books anything without your explicit confirmation. It only suggests options that fit your context and preferences.",
  },
  {
    id: "f6",
    category: "Flights",
    question: "How do I change or cancel a flight booking?",
    answer:
      "Go to Transactions, select the booking, and choose View Details. Change and cancellation options depend on the fare rules of your ticket.",
  },
  {
    id: "f7",
    category: "Flights",
    question: "When does online check-in open?",
    answer: "Online check-in typically opens 24 hours before your scheduled departure time.",
  },
  {
    id: "f8",
    category: "Hotels",
    question: "What does Trip Match percentage mean?",
    answer:
      "Trip Match reflects how well a hotel fits your Compass preferences, based on budget, location relative to your planned activities, and traveler ratings.",
  },
  {
    id: "f9",
    category: "Hotels",
    question: "Is free cancellation available on all hotels?",
    answer: "Free cancellation availability varies by property and is shown clearly on each hotel listing.",
  },
  {
    id: "f10",
    category: "Activities",
    question: "Can I book activities without a flight or hotel?",
    answer: "Yes, activities can be booked independently at any time from the Activities page.",
  },
  {
    id: "f11",
    category: "Payments",
    question: "What payment methods are accepted?",
    answer: "Lanjalan accepts major credit and debit cards, bank transfer, and popular e-wallets.",
  },
  {
    id: "f12",
    category: "Refunds",
    question: "How long does a refund take to process?",
    answer: "Most refunds are processed within 7–14 business days, depending on your payment method.",
  },
  {
    id: "f13",
    category: "Account",
    question: "How do I update my traveler preferences?",
    answer: "Go to Profile > Traveler Preferences to update your interests, budget range, and travel style at any time.",
  },
]
