import { PricingConfig } from "@/lib/domain/types";

export const pricingConfig: PricingConfig = {
  currency: "USD",
  minimumJobAmount: 3500,
  tiers: {
    value: { label: "Value Turf", lowRate: 9, highRate: 12 },
    premium: { label: "Premium Turf", lowRate: 12, highRate: 16 },
    pet: { label: "Pet + Drainage Turf", lowRate: 14, highRate: 20 }
  },
  addOns: {
    edging: { label: "Premium edging", lowFlat: 400, highFlat: 900 },
    haulAway: { label: "Debris haul-away", lowFlat: 300, highFlat: 700 },
    irrigationCap: { label: "Irrigation cap and prep", lowFlat: 250, highFlat: 650 }
  },
  assumptions: [
    "Includes labor, base prep, and turf installation.",
    "Pricing excludes major grading, drainage reconstruction, and permit fees.",
    "Final quote follows a site verification and product confirmation call."
  ]
};
