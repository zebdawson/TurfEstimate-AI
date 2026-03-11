import { pricingConfig } from "@/lib/config/pricing";
import { Estimate, ProductTier } from "@/lib/domain/types";

export function calculateEstimate(squareFeet: number, productTier: ProductTier, addOns: string[]): Estimate {
  const tier = pricingConfig.tiers[productTier];
  const addOnTotals = addOns.reduce(
    (acc, key) => {
      const addOn = pricingConfig.addOns[key];
      if (!addOn) {
        return acc;
      }
      return { low: acc.low + addOn.lowFlat, high: acc.high + addOn.highFlat };
    },
    { low: 0, high: 0 }
  );

  const baseLow = squareFeet * tier.lowRate + addOnTotals.low;
  const baseHigh = squareFeet * tier.highRate + addOnTotals.high;

  return {
    low: Math.max(baseLow, pricingConfig.minimumJobAmount),
    high: Math.max(baseHigh, pricingConfig.minimumJobAmount),
    assumptions: pricingConfig.assumptions,
    selectedOptions: { productTier, addOns }
  };
}
