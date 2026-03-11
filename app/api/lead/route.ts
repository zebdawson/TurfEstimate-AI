import { NextResponse } from "next/server";
import { sendToAssistable } from "@/lib/integrations/assistable";
import { sendToGoHighLevel, type LeadPayload } from "@/lib/integrations/gohighlevel";

export async function POST(req: Request) {
  const payload = (await req.json()) as LeadPayload;

  const [gohighlevelResult, assistableResult] = await Promise.all([
    sendToGoHighLevel(payload),
    sendToAssistable(payload)
  ]);

  return NextResponse.json({
    ok: true,
    gohighlevel: gohighlevelResult,
    assistable: assistableResult
  });
}
