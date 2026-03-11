import { AppointmentHandoff, Lead } from "@/lib/domain/types";

export interface VoiceAIAdapter {
  triggerHandoff(payload: AppointmentHandoff): Promise<{ status: "sent" | "mocked"; id: string }>;
}

export function buildHandoffPayload(lead: Lead): AppointmentHandoff {
  return {
    leadId: lead.id,
    projectType: "artificial_turf",
    estimatedSqFt: lead.measurement.squareFeet,
    estimateLow: lead.estimate.low,
    estimateHigh: lead.estimate.high,
    address: lead.property.formattedAddress,
    contactName: `${lead.firstName} ${lead.lastName}`,
    phone: lead.phone
  };
}

class AssistableAdapter implements VoiceAIAdapter {
  async triggerHandoff(payload: AppointmentHandoff) {
    const apiKey = process.env.ASSISTABLE_API_KEY;

    if (!apiKey) {
      return { status: "mocked" as const, id: `mock-assistable-${payload.leadId}` };
    }

    // TODO: Wire Assistable API endpoint and credentials once available.
    return { status: "sent" as const, id: `assistable-${payload.leadId}` };
  }
}

export const voiceAIAdapter: VoiceAIAdapter = new AssistableAdapter();
