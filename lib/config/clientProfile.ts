import { ClientProfile } from "@/lib/domain/types";

export const clientProfile: ClientProfile = {
  id: "pilot-client",
  businessName: "Evergreen Turf Co.",
  brand: {
    primaryColor: "#0A7E4F",
    phone: "(555) 014-9988",
    heroHeadline: "Free Artificial Turf Estimate in Minutes",
    heroSubhead:
      "Draw your project area on satellite imagery to get an instant rough estimate, then book a verified on-site consultation."
  },
  serviceArea: {
    states: ["CA"],
    notes: "Serving select metro areas. Final availability confirmed by team review."
  },
  legal: {
    disclaimer:
      "This is a preliminary estimate based on customer-confirmed measurements and standard installation assumptions. Final pricing is subject to site verification."
  }
};
