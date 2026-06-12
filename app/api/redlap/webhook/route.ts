import { NextResponse } from "next/server";
import {
  getRedlapEnv,
  getSession,
  normaliseStatus,
  verifyWebhookSignature,
  type RedlapEnv,
} from "@/lib/redlap";
import { readWebhook, recordWebhook } from "@/lib/redlap-status-cache";
import { trackEvent, WE_EVENTS } from "@/lib/webengage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type MetaItem = {
  platform?: string;
  service?: string;
  qty?: number;
  price?: number;
  premium?: boolean;
};

/**
 * Fire the WebEngage "Checkout Completed" conversion server-side. This is the
 * authoritative trigger (the webhook always fires on payment, unlike the
 * /checkout/success page which only fires if the buyer actually returns). The
 * order details aren't in the webhook body, so we read them back from the
 * Redlap session metadata we set at create time. Never throws — analytics must
 * never break the webhook ack.
 */
async function trackCheckoutCompleted(sessionId: string, env: RedlapEnv): Promise<void> {
  try {
    const session = await getSession(sessionId, env);
    const md = (session.metadata ?? {}) as Record<string, unknown>;
    const email = typeof md.email === "string" ? md.email.trim() : "";
    const orderId = typeof md.tcOrderId === "string" ? md.tcOrderId : sessionId;
    const currency = typeof md.currency === "string" ? md.currency : "USD";
    const items: MetaItem[] = Array.isArray(md.items) ? (md.items as MetaItem[]) : [];

    // WebEngage rejects an event with neither userId nor anonymousId, so the
    // email (which we set the userId to) is mandatory here. If it's missing the
    // event would silently never land — log loudly instead of firing a no-op.
    if (!email) {
      console.error(
        `[redlap] Checkout Completed NOT fired — no email in session metadata (session ${sessionId}). WebEngage needs a userId.`,
      );
      return;
    }

    // Prefer the actual charged price; fall back to summing the line items.
    const total =
      typeof session.price === "number"
        ? session.price
        : Math.round(
            items.reduce((s, it) => s + (it.price ?? 0) * (it.premium ? 1.35 : 1), 0) * 100,
          ) / 100;

    await trackEvent({
      userId: email,
      eventName: WE_EVENTS.CHECKOUT_COMPLETED,
      eventData: {
        orderId,
        amount: total,
        currency,
        itemCount: items.length,
        products: items.map((i) => `${i.platform}-${i.service}`).join(","),
      },
    });
  } catch (err) {
    console.error("[redlap] Checkout Completed tracking failed:", err);
  }
}

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
    // Only fire the conversion the first time this session turns paid — guards
    // against duplicate WebEngage events if Redlap re-delivers the webhook to
    // the same warm instance. (Best-effort: the cache is per-process.)
    const alreadyPaid = readWebhook(sessionId) === "paid";
    recordWebhook(sessionId, mapped);
    if (mapped === "paid" && !alreadyPaid) {
      await trackCheckoutCompleted(sessionId, env);
    }
  } else {
    // Unknown event — log and ack so Redlap doesn't retry forever.
    console.warn(`[redlap] ignoring unknown webhook event: ${event} (session ${sessionId})`);
  }

  // Useful breadcrumb for diagnostics; no order fulfillment is wired here
  // because fulfillment happens inside the Redlap environment.
  console.log(`[redlap] webhook ${event} session=${sessionId} normalised=${normaliseStatus(mapped ?? "pending")}`);

  return new NextResponse("OK", { status: 200 });
}
