import { createHmac, timingSafeEqual } from "crypto";

function normaliseBase(raw: string): string {
  const v = raw.trim().replace(/\/+$/, "");
  // The PHP plugin appends `/api/payments/sessions` to the base. If the user
  // pasted a base that already ends with `/api`, drop it so we don't end up
  // with `/api/api/payments/sessions`.
  return v.replace(/\/api$/, "");
}

export type RedlapEnv = {
  apiBase: string;
  apiKey: string | undefined;
  websiteId: number;
  websiteOrigin: string;
  expiresIn: number;
  webhookSecret: string | undefined;
};

/**
 * Read Redlap config from the environment. Fails loudly when REDLAP_API_BASE
 * is unset so a misconfigured deploy never silently routes live cards to a
 * stale production URL. Set REDLAP_API_BASE explicitly per environment
 * (sandbox in dev/staging, prod gateway in prod).
 */
export function getRedlapEnv(): RedlapEnv {
  const rawBase = process.env.REDLAP_API_BASE;
  if (!rawBase) {
    throw new Error(
      "REDLAP_API_BASE is not set. Configure it in your hosting env (Amplify console + amplify.yml) before any /api/checkout/* route can reach the gateway.",
    );
  }
  return {
    apiBase: normaliseBase(rawBase),
    apiKey: process.env.REDLAP_API_KEY || undefined,
    websiteId: Number(process.env.REDLAP_WEBSITE_ID || "1") || 1,
    websiteOrigin:
      process.env.REDLAP_WEBSITE_ORIGIN ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://thunderclap.com",
    expiresIn: Number(process.env.REDLAP_EXPIRES_IN || "3600") || 3600,
    webhookSecret: process.env.REDLAP_WEBHOOK_SECRET || undefined,
  };
}

export type SummaryItem =
  | {
      type: "regular" | "discount" | "colored";
      title: string;
      description?: string;
      value: number;
      color?: string;
    }
  | { type: "seperator" };

export type CreateSessionInput = {
  returnUrl: string;
  price: number;
  description: string;
  expiresIn?: number;
  metadata?: Record<string, unknown>;
  summaryItems?: SummaryItem[];
};

export type RedlapSession = {
  id: string;
  frontendPaymentUrl?: string;
  status?: string;
  price?: number;
  originalPrice?: number;
  couponCode?: string;
  discountAmount?: number;
  [k: string]: unknown;
};

function authHeaders(env: RedlapEnv): Record<string, string> {
  const h: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (env.apiKey) h.Authorization = `Bearer ${env.apiKey}`;
  return h;
}

export async function createSession(
  input: CreateSessionInput,
  env: RedlapEnv = getRedlapEnv(),
): Promise<RedlapSession> {
  const payload = {
    websiteId: env.websiteId,
    websiteOrigin: env.websiteOrigin,
    returnUrl: input.returnUrl,
    price: input.price,
    description: input.description,
    expiresIn: input.expiresIn ?? env.expiresIn,
    metadata: {
      ...(input.metadata ?? {}),
      ...(input.summaryItems ? { summaryItems: input.summaryItems } : {}),
    },
  };

  const res = await fetch(`${env.apiBase}/api/payments/sessions`, {
    method: "POST",
    headers: authHeaders(env),
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const raw = await res.text();
  if (!res.ok) {
    throw new Error(`Redlap createSession failed: HTTP ${res.status} — ${raw.slice(0, 400)}`);
  }
  try {
    return JSON.parse(raw) as RedlapSession;
  } catch {
    throw new Error(`Redlap createSession returned non-JSON: ${raw.slice(0, 200)}`);
  }
}

export async function getSession(
  sessionId: string,
  env: RedlapEnv = getRedlapEnv(),
): Promise<RedlapSession> {
  const res = await fetch(
    `${env.apiBase}/api/payments/sessions/${encodeURIComponent(sessionId)}`,
    { method: "GET", headers: authHeaders(env), cache: "no-store" },
  );
  const raw = await res.text();
  if (!res.ok) {
    throw new Error(`Redlap getSession failed: HTTP ${res.status} — ${raw.slice(0, 400)}`);
  }
  try {
    return JSON.parse(raw) as RedlapSession;
  } catch {
    throw new Error(`Redlap getSession returned non-JSON: ${raw.slice(0, 200)}`);
  }
}

/**
 * Verify a Redlap webhook payload using the HMAC-SHA256 signature scheme
 * documented in the PHP plugin: `X-Webhook-Signature` header is the hex
 * digest of `hmac_sha256(rawBody, secret)`.
 */
export function verifyWebhookSignature(
  rawBody: string,
  signatureHeader: string | null | undefined,
  secret: string | undefined,
): boolean {
  if (!signatureHeader || !secret) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signatureHeader, "utf8");
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/**
 * Map Redlap's loose `status` field into our four-state model used by the
 * polling UI. The Redlap API returns values like "pending", "paid",
 * "completed", "failed", "expired", "cancelled" — we normalise here so the
 * client doesn't need to know every variant.
 */
export type NormalisedStatus = "pending" | "paid" | "failed" | "expired";

export function normaliseStatus(raw: unknown): NormalisedStatus {
  const v = String(raw ?? "").toLowerCase();
  if (v === "paid" || v === "completed" || v === "success" || v === "succeeded") return "paid";
  if (v === "expired") return "expired";
  if (v === "failed" || v === "cancelled" || v === "canceled" || v === "error") return "failed";
  return "pending";
}
