import { NextResponse } from "next/server";
import { getRedlapEnv, normaliseStatus, verifyWebhookSignature } from "@/lib/redlap";
import { recordWebhook } from "@/lib/redlap-status-cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type WebhookPayload = {
  event?: string;
  sessionId?: string;
  payment?: {
    id?: string;
    gatewayTransactionId?: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
};

const TERMINAL_FOR_STATUS: Record<string, "paid" | "failed" | "expired"> = {
  "payment.completed": "paid",
  "payment.succeeded": "paid",
  "payment.paid": "paid",
  "payment.failed": "failed",
  "payment.cancelled": "failed",
  "payment.canceled": "failed",
  "payment.error": "failed",
  "payment.expired": "expired",
};

export async function POST(req: Request) {
  let env;
  try {
    env = getRedlapEnv();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Gateway not configured.";
    console.error("[redlap]", message);
    return new NextResponse("Gateway not configured", { status: 500 });
  }
  const rawBody = await req.text();
  const signature = req.headers.get("x-webhook-signature");

  if (!env.webhookSecret) {
    console.error("[redlap] webhook hit but REDLAP_WEBHOOK_SECRET is not set");
    return new NextResponse("Webhook secret not configured", { status: 500 });
  }
  if (!verifyWebhookSignature(rawBody, signature, env.webhookSecret)) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  let data: WebhookPayload;
  try {
    data = JSON.parse(rawBody) as WebhookPayload;
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const event = String(data.event ?? "").toLowerCase();
  const sessionId = String(data.sessionId ?? "");
  if (!sessionId) {
    return new NextResponse("Missing sessionId", { status: 400 });
  }

  const mapped = TERMINAL_FOR_STATUS[event];
  if (mapped) {
    recordWebhook(sessionId, mapped);
  } else {
    // Unknown event — log and ack so Redlap doesn't retry forever.
    console.warn(`[redlap] ignoring unknown webhook event: ${event} (session ${sessionId})`);
  }

  // Useful breadcrumb for diagnostics; no order fulfillment is wired here
  // because fulfillment happens inside the Redlap environment.
  console.log(`[redlap] webhook ${event} session=${sessionId} normalised=${normaliseStatus(mapped ?? "pending")}`);

  return new NextResponse("OK", { status: 200 });
}
