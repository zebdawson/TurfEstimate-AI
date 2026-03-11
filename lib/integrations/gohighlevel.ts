import { Lead } from "@/lib/domain/types";

export interface CRMAdapter {
  pushLead(lead: Lead): Promise<{ status: "sent" | "mocked"; reference: string }>;
}

class GoHighLevelAdapter implements CRMAdapter {
  async pushLead(lead: Lead) {
    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!apiKey || !locationId) {
      return { status: "mocked" as const, reference: `mock-ghl-${lead.id}` };
    }

    // TODO: Wire live GoHighLevel endpoint + auth strategy for contact/opportunity/custom fields.
    return { status: "sent" as const, reference: `ghl-${lead.id}` };
  }
}

export const crmAdapter: CRMAdapter = new GoHighLevelAdapter();
