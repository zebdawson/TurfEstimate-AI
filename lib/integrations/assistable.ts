import type { LeadPayload } from "@/lib/integrations/gohighlevel";

export async function sendToAssistable(payload: LeadPayload) {
  if (process.env.NODE_ENV !== "production") {
    console.log("[Assistable:DEV] Outgoing payload", JSON.stringify(payload, null, 2));
  }

  return {
    ok: true,
    provider: "assistable",
    mocked: !process.env.ASSISTABLE_API_KEY
  };
}
