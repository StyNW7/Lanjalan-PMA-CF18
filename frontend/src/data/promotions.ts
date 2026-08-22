import type { Promotion } from "./types"

export const promotions: Promotion[] = [
  {
    id: "weekend-flight-deals",
    title: "Weekend Flight Deals",
    description: "Save on domestic routes booked for Friday to Sunday departures.",
    category: "Flights",
    code: "WEEKENDGO",
    discount: "Up to 20% off",
    discountPercent: 20,
    expiration: "31 Aug 2026",
    terms: "Valid for domestic flights only. Cannot be combined with other offers.",
    image: "https://picsum.photos/seed/lanjalan-promo-weekend/800/500",
  },
  {
    id: "stay-longer-save-more",
    title: "Stay Longer, Save More",
    description: "Book 3 nights or more and get an automatic discount at checkout.",
    category: "Hotels",
    code: "STAY3PLUS",
    discount: "15% off",
    discountPercent: 15,
    expiration: "15 Sep 2026",
    terms: "Minimum 3-night stay required. Valid at participating properties.",
    image: "https://picsum.photos/seed/lanjalan-promo-staylonger/800/500",
  },
  {
    id: "activities-next-escape",
    title: "Activities for Your Next Escape",
    description: "Discounted tours and experiences across Bali, Yogyakarta, and Lombok.",
    category: "Activities",
    code: "EXPLOREMORE",
    discount: "10% off",
    discountPercent: 10,
    expiration: "30 Sep 2026",
    terms: "Applies to select activities. Discount shown at checkout.",
    image: "https://picsum.photos/seed/lanjalan-promo-activities/800/500",
  },
  {
    id: "fly-more-explore-more",
    title: "Fly More, Explore More",
    description: "Bundle a flight and hotel together and unlock an extra discount.",
    category: "Bundles",
    code: "BUNDLEUP",
    discount: "Up to 25% off",
    discountPercent: 25,
    expiration: "20 Sep 2026",
    terms: "Applies when booking flight and hotel in the same trip window.",
    image: "https://picsum.photos/seed/lanjalan-promo-bundle/800/500",
  },
  {
    id: "stay-longer-in-bali",
    title: "Stay Longer in Bali",
    description: "Extended stay pricing on Seminyak, Ubud, and Canggu properties.",
    category: "Hotels",
    code: "BALIWEEK",
    discount: "18% off",
    discountPercent: 18,
    expiration: "10 Oct 2026",
    terms: "Valid for stays of 5 nights or more in Bali.",
    image: "https://picsum.photos/seed/lanjalan-promo-bali/800/500",
  },
  {
    id: "complete-your-trip",
    title: "Complete Your Trip",
    description: "Already booked a flight? Add a stay or activity and save instantly.",
    category: "Bundles",
    code: "COMPLETEIT",
    discount: "12% off",
    discountPercent: 12,
    expiration: "5 Oct 2026",
    terms: "Available to travelers with a confirmed Lanjalan flight booking.",
    image: "https://picsum.photos/seed/lanjalan-promo-complete/800/500",
  },
  {
    id: "early-bird-flights",
    title: "Early Bird International Fares",
    description: "Book international routes 60 days ahead for the lowest fares.",
    category: "Flights",
    code: "EARLYBIRD60",
    discount: "Up to 30% off",
    discountPercent: 30,
    expiration: "31 Dec 2026",
    terms: "Valid on international routes booked 60+ days before departure.",
    image: "https://picsum.photos/seed/lanjalan-promo-earlybird/800/500",
  },
  {
    id: "family-activity-pack",
    title: "Family Activity Pack",
    description: "Bundle three family-friendly activities and save as a group.",
    category: "Activities",
    code: "FAMILYPACK",
    discount: "IDR 150K off",
    discountAmount: 150000,
    expiration: "30 Nov 2026",
    terms: "Minimum three activities booked in the same order.",
    image: "https://picsum.photos/seed/lanjalan-promo-family/800/500",
  },
]

export function getPromotionsByCategory(category: string) {
  if (category === "All") return promotions
  return promotions.filter((p) => p.category === category)
}

export function getPromotionById(id: string) {
  return promotions.find((p) => p.id === id)
}

/** Where a traveler should go to actually redeem a promo. */
export const promoDestinationByCategory: Record<Promotion["category"], { href: string; label: string }> = {
  Flights: { href: "/flights", label: "Search Flights" },
  Hotels: { href: "/hotels/results", label: "Browse Hotels" },
  Activities: { href: "/activities/results", label: "Browse Activities" },
  Bundles: { href: "/compass", label: "Plan with Compass" },
}

/** Steps shown on the deal detail page — generic, but tailored per category. */
export function getRedemptionSteps(promo: Promotion) {
  return [
    `Copy the promo code ${promo.code}.`,
    `${promoDestinationByCategory[promo.category].label.toLowerCase()} and pick what you want to book.`,
    "Enter the code in the Promo Code field at checkout.",
    `Your ${promo.discount.toLowerCase()} is applied to the total before you pay.`,
  ]
}

export interface PromoApplication {
  promo: Promotion
  discount: number
}

/**
 * Validates a promo code against a subtotal for a given product.
 * Returns the matching promo plus the IDR discount, or an error message.
 */
export function applyPromoCode(
  code: string,
  subtotal: number,
  product: Promotion["category"]
): { ok: true; result: PromoApplication } | { ok: false; error: string } {
  const promo = promotions.find((p) => p.code.toLowerCase() === code.trim().toLowerCase())
  if (!promo) return { ok: false, error: "That promo code isn't valid." }
  if (promo.category !== product && promo.category !== "Bundles") {
    return { ok: false, error: `${promo.code} only applies to ${promo.category.toLowerCase()} bookings.` }
  }

  const discount = promo.discountAmount
    ? Math.min(promo.discountAmount, subtotal)
    : Math.round((subtotal * (promo.discountPercent || 0)) / 100)

  if (discount <= 0) return { ok: false, error: "That promo code isn't valid for this booking." }
  return { ok: true, result: { promo, discount } }
}
