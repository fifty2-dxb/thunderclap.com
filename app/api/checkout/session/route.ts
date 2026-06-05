import { NextResponse } from "next/server";
import { createSession, getRedlapEnv } from "@/lib/redlap";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LegacyBody = {
  platform?: string;
  service?: string;
  qty?: number | string;
  price?: number | string;
  premium?: boolean | number | string;
  target?: string;
  email?: string;
};

type MultiItemBody = {
  items?: Array<{
    platform?: string;
    service?: string;
    qty?: number | string;
    price?: number | string;
    premium?: boolean | number | string;
    target?: string;
  }>;
  email?: string;
};

type AnyBody = LegacyBody & MultiItemBody;

type NormalisedItem = {
  platform: string;
  service: string;
  qty: number;
  price: number;
  premium: boolean;
  target: string;
  smmServiceId?: number;
};

const VALID_PLATFORMS = new Set([
  "instagram",
  "tiktok",
  "youtube",
  "facebook",
  "twitter",
]);
const VALID_SERVICES = new Set([
  "followers",
  "likes",
  "views",
  "subscribers",
  "comments",
  "retweets",
]);

const PLATFORM_LABEL: Record<string, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  facebook: "Facebook",
  twitter: "Twitter / X",
};
const SERVICE_LABEL: Record<string, string> = {
  followers: "Followers",
  likes: "Likes",
  views: "Views",
  subscribers: "Subscribers",
  comments: "Comments",
  retweets: "Retweets",
};

// Redlap fulfillment maps each {platform}-{service} pair to a numeric
// smmServiceId on its internal SMM panel. Add new ids here as they get
// provisioned — anything missing is omitted from the Redlap metadata so
// the gateway can fall back to its default routing.
const SMM_SERVICE_IDS: Record<string, number> = {
  "tiktok-followers": 5818,
  "tiktok-likes": 1126,
  "tiktok-views": 9121,
  "instagram-followers": 8072,
  "instagram-likes": 2916,
  "instagram-views": 7762,
  "facebook-followers": 4139,
  "facebook-likes": 4704,
  "facebook-views": 4715,
  "youtube-subscribers": 8125,
  "youtube-likes": 9538,
  "youtube-views": 1573,
  "twitter-followers": 2594,
  "twitter-likes": 970,
  "twitter-retweets": 3308,
  "linkedin-connections": 5471,
  "linkedin-followers": 5467,
  "linkedin-likes": 5472,
  "linkedin-comments": 5475,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function makeOrderId(): string {
  const alpha = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 8; i++) {
    out += alpha[Math.floor(Math.random() * alpha.length)];
  }
  return `TC-${out}`;
}

type ValidationResult =
  | { ok: true; item: NormalisedItem }
  | { ok: false; error: string };

function validateItem(
  raw: {
    platform?: string;
    service?: string;
    qty?: number | string;
    price?: number | string;
    premium?: boolean | number | string;
    target?: string;
  },
  idx: number,
): ValidationResult {
  const tag = `Item ${idx + 1}`;
  const platform = String(raw.platform ?? "").toLowerCase();
  const service = String(raw.service ?? "").toLowerCase();
  if (!VALID_PLATFORMS.has(platform)) {
    return { ok: false, error: `${tag}: unknown platform.` };
  }
  if (!VALID_SERVICES.has(service)) {
    return { ok: false, error: `${tag}: unknown service.` };
  }
  const qty = Math.max(0, Math.floor(Number(raw.qty) || 0));
  const price = Math.max(0, Number(raw.price) || 0);
  if (qty <= 0) {
    return { ok: false, error: `${tag}: quantity is required.` };
  }
  if (price <= 0) {
    return { ok: false, error: `${tag}: price is required.` };
  }
  const premium =
    raw.premium === true || raw.premium === 1 || raw.premium === "1";
  const target = String(raw.target ?? "").trim();
  if (!target) {
    return { ok: false, error: `${tag}: target URL is required.` };
  }
  const smmServiceId = SMM_SERVICE_IDS[`${platform}-${service}`];
  return {
    ok: true,
    item: {
      platform,
      service,
      qty,
      price,
      premium,
      target,
      ...(smmServiceId !== undefined ? { smmServiceId } : {}),
    },
  };
}

function lineFinal(item: NormalisedItem): number {
  return Math.round(item.price * (item.premium ? 1.35 : 1) * 100) / 100;
}

function describeItem(item: NormalisedItem): string {
  return `${item.qty.toLocaleString("en-US")} ${PLATFORM_LABEL[item.platform]} ${SERVICE_LABEL[item.service]}${item.premium ? " · Premium" : ""}`;
}

export async function POST(req: Request) {
  let body: AnyBody;
  try {
    body = (await req.json()) as AnyBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Detect shape: multi-item cart vs legacy single-item.
  const rawItems = Array.isArray(body.items)
    ? body.items
    : [
        {
          platform: body.platform,
          service: body.service,
          qty: body.qty,
          price: body.price,
          premium: body.premium,
          target: body.target,
        },
      ];

  if (rawItems.length === 0) {
    return NextResponse.json(
      { error: "Cart is empty." },
      { status: 400 },
    );
  }

  const items: NormalisedItem[] = [];
  for (let i = 0; i < rawItems.length; i++) {
    const result = validateItem(rawItems[i], i);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    items.push(result.item);
  }

  const email = String(body.email ?? "").trim();
  if (!email) {
    return NextResponse.json({ error: "Missing email." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  let env;
  try {
    env = getRedlapEnv();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Payment gateway is not configured.";
    console.error("[redlap]", message);
    return NextResponse.json(
      { error: "Payment gateway is not configured." },
      { status: 503 },
    );
  }

  const total = Math.round(items.reduce((sum, it) => sum + lineFinal(it), 0) * 100) / 100;
  const orderId = makeOrderId();

  // Build the return URL we hand to Redlap. Redlap will append its own
  // ?payment_status, ?payment_id and ?order_number params — ours stay too.
  // With the cart-driven flow we only carry the order_id + email through;
  // line items live in Redlap session metadata.
  const returnUrlBase = new URL("/checkout/return", env.websiteOrigin);
  returnUrlBase.searchParams.set("order_id", orderId);
  returnUrlBase.searchParams.set("email", email);

  // The first item still goes onto the URL for back-compat with the
  // /checkout/failed retry page and other downstream consumers.
  const first = items[0];
  returnUrlBase.searchParams.set("platform", first.platform);
  returnUrlBase.searchParams.set("service", first.service);
  returnUrlBase.searchParams.set("qty", String(first.qty));
  returnUrlBase.searchParams.set("price", String(first.price));
  returnUrlBase.searchParams.set("premium", first.premium ? "1" : "0");
  returnUrlBase.searchParams.set("target", first.target);

  // Generic gateway description on purpose — we don't surface the specific
  // platform/service (e.g. "YouTube Subscribers") to the payment gateway here.
  // The itemised breakdown is sent only via summaryItems below (which renders
  // on the Redlap payment page) and in metadata (needed for fulfilment).
  const description = "Product Purchase";

  // Build metadata payload.
  // - items[]: full per-line array, every entry annotated with its
  //   smmServiceId when mapped (so Redlap fulfillment can iterate).
  // - smmDataItems[]: just the mapped lines, in the {smmServiceId, amount, url}
  //   shape Redlap fulfillment expects per line.
  // - smmData (legacy, single-item only): top-level flat block kept so the
  //   existing single-line Redlap fulfillment path keeps working when there's
  //   exactly one item AND it has a mapped smmServiceId.
  const metadataItems = items.map((it) => ({
    platform: it.platform,
    service: it.service,
    qty: it.qty,
    price: it.price,
    premium: it.premium,
    target: it.target,
    ...(it.smmServiceId !== undefined ? { smmServiceId: it.smmServiceId } : {}),
  }));

  const smmDataItems = items
    .filter((it) => it.smmServiceId !== undefined)
    .map((it) => ({
      smmServiceId: it.smmServiceId as number,
      amount: it.qty,
      url: it.target,
    }));

  const isSingleMapped =
    items.length === 1 && items[0].smmServiceId !== undefined;

  try {
    const session = await createSession(
      {
        returnUrl: returnUrlBase.toString(),
        price: total,
        description,
        offerOptions: {
          platform: first.platform,
          quantity: first.qty,
          type: first.service,
          price: total,
        },
        metadata: {
          tcOrderId: orderId,
          email,
          currency: "USD",
          items: metadataItems,
          ...(smmDataItems.length > 0 ? { smmDataItems } : {}),
          ...(isSingleMapped
            ? {
                // Back-compat: the existing Redlap fulfillment path keys off
                // the flat single-item `smmData` block. Keep it for carts of
                // exactly one mapped line.
                smmData: {
                  smmServiceId: items[0].smmServiceId as number,
                  amount: items[0].qty,
                  url: items[0].target,
                },
                profile: items[0].target,
                premium: items[0].premium,
              }
            : {}),
        },
        summaryItems: items.map((it) => ({
          type: "regular" as const,
          title: describeItem(it),
          value: lineFinal(it),
        })),
      },
      env,
    );

    if (!session.id || !session.frontendPaymentUrl) {
      return NextResponse.json(
        { error: "Gateway returned an incomplete session." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      sessionId: session.id,
      redirectUrl: session.frontendPaymentUrl,
      orderId,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown gateway error.";
    console.error("[redlap] createSession failed:", message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
