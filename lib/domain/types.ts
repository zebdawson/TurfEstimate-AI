export type ProductTier = "value" | "premium" | "pet";

export interface Property {
  formattedAddress: string;
  lat: number;
  lng: number;
  city?: string;
  state?: string;
  zip?: string;
}

export interface Measurement {
  polygons: google.maps.LatLngLiteral[][];
  squareFeet: number;
  customerConfirmed: boolean;
}

export interface Estimate {
  low: number;
  high: number;
  assumptions: string[];
  selectedOptions: {
    productTier: ProductTier;
    addOns: string[];
  };
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
  property: Property;
  measurement: Measurement;
  estimate: Estimate;
  createdAt: string;
}

export interface PricingConfig {
  currency: "USD";
  minimumJobAmount: number;
  tiers: Record<ProductTier, { label: string; lowRate: number; highRate: number }>;
  addOns: Record<string, { label: string; lowFlat: number; highFlat: number }>;
  assumptions: string[];
}

export interface ClientProfile {
  id: string;
  businessName: string;
  brand: {
    primaryColor: string;
    phone: string;
    heroHeadline: string;
    heroSubhead: string;
  };
  serviceArea: {
    states: string[];
    notes: string;
  };
  legal: {
    disclaimer: string;
  };
}

export interface AppointmentHandoff {
  leadId: string;
  projectType: "artificial_turf";
  estimatedSqFt: number;
  estimateLow: number;
  estimateHigh: number;
  address: string;
  contactName: string;
  phone: string;
}
