export type LeadPayload = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  estimate: {
    tierId: string;
    tierLabel: string;
    squareFeet: number;
    estimateMin: number;
    estimateMax: number;
  };
};

export async function sendToGoHighLevel(payload: LeadPayload) {
  if (process.env.NODE_ENV !== "production") {
    console.log("[GoHighLevel:DEV] Outgoing payload", JSON.stringify(payload, null, 2));
  }

  return {
    ok: true,
    provider: "gohighlevel",
    mocked: !process.env.GHL_API_KEY
  };
}
