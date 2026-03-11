import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { buildHandoffPayload, voiceAIAdapter } from "@/lib/integrations/assistable";
import { crmAdapter } from "@/lib/integrations/gohighlevel";
import { Lead } from "@/lib/domain/types";
import { leadRepository } from "@/lib/repositories/leadRepository";
import { estimateSchema, leadSchema } from "@/lib/services/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = leadSchema.and(estimateSchema).safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const lead: Lead = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...parsed.data
  };

  await leadRepository.save(lead);
  const crm = await crmAdapter.pushLead(lead);
  const voice = await voiceAIAdapter.triggerHandoff(buildHandoffPayload(lead));

  return NextResponse.json({ id: lead.id, integrations: { crm, voice } });
}
