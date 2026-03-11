export const pilotClientConfig = {
  businessName: "Green Horizon Landscaping",
  logoPlaceholder: "🌿 GH Logo Placeholder",
  serviceArea: ["Austin", "Round Rock", "Cedar Park", "Pflugerville"],
  pricingTiers: [
    {
      id: "essential",
      label: "Essential Refresh",
      ratePerSqFt: 6,
      description: "Budget-friendly synthetic turf for smaller yards."
    },
    {
      id: "premium",
      label: "Premium Family Turf",
      ratePerSqFt: 8,
      description: "Soft-touch turf built for kids, pets, and heavy use."
    },
    {
      id: "signature",
      label: "Signature Landscape Finish",
      ratePerSqFt: 11,
      description: "Top-tier turf with drainage and enhanced underlayment."
    }
  ],
  disclaimerCopy:
    "Estimate ranges are for planning only and may change after onsite measurement, access review, and base preparation requirements."
};

export type PricingTier = (typeof pilotClientConfig.pricingTiers)[number];
