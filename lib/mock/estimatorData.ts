import { pilotClientConfig } from "@/lib/config/pilotClient";

export const mockLead = {
  fullName: "Taylor Morgan",
  email: "taylor@example.com",
  phone: "512-555-0100",
  address: "123 Demo St, Austin, TX",
  city: "Austin",
  notes: "Need durable turf for 2 dogs and weekend hosting."
};

export const mockMeasurement = {
  squareFeet: 640,
  shape: "rectangle",
  aiAutoDetectStatus: "Coming soon"
};

export const mockTier = pilotClientConfig.pricingTiers[1];
