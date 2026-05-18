import { NextResponse } from "next/server";
import { createSession, getRedlapEnv } from "@/lib/redlap";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  platform?: string;
  service?: string;
  qty?: number | string;
  price?: number | string;
  premium?: boolean | number | string;
  target?: string;
  email?: string;
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
};

function makeOrderId(): string {
  const alpha = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 8; i++) {
    out += alpha[Math.floor(Math.random() * alpha.length)];
  }
  return `TC-${out}`;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const platform = String(body.platform ?? "").toLowerCase();
  const service = String(body.service ?? "").toLowerCase();
  if (!VALID_PLATFORMS.has(platform)) {
    return NextResponse.json({ error: "Unknown platform." }, { status: 400 });
  }
  if (!VALID_SERVICES.has(service)) {
    return NextResponse.json({ error: "Unknown service." }, { status: 400 });
  }

  const qty = Math.max(1, Math.floor(Number(body.qty) || 0));
  const basePrice = Math.max(0, Number(body.price) || 0);
  if (qty <= 0 || basePrice <= 0) {
    return NextResponse.json({ error: "Quantity and price are required." }, { status: 400 });
  }
  const premium = body.premium === true || body.premium === 1 || body.premium === "1";
  const target = String(body.target ?? "").trim();
  const email = String(body.email ?? "").trim();
  if (!target) {
    return NextResponse.json({ error: "Missing target URL." }, { status: 400 });
  }
  if (!email) {
    return NextResponse.json({ error: "Missing email." }, { status: 400 });
  }

  let env;
  try {
    env = getRedlapEnv();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Payment gateway is not configured.";
    console.error("[redlap]", message);
    return NextResponse.json({ error: "Payment gateway is not configured." }, { status: 503 });
  }

  const finalPrice = Math.round(basePrice * (premium ? 1.35 : 1) * 100) / 100;
  const orderId = makeOrderId();

  // Build the return URL we hand to Redlap. Redlap will append its own
  // ?payment_status, ?payment_id and ?order_number params — ours stay too.
  const returnUrlBase = new URL("/checkout/return", env.websiteOrigin);
  returnUrlBase.searchParams.set("platform", platform);
  returnUrlBase.searchParams.set("service", service);
  returnUrlBase.searchParams.set("qty", String(qty));
  returnUrlBase.searchParams.set("price", String(basePrice));
  returnUrlBase.searchParams.set("premium", premium ? "1" : "0");
  returnUrlBase.searchParams.set("target", target);
  returnUrlBase.searchParams.set("email", email);
  returnUrlBase.searchParams.set("order_id", orderId);

  try {
    const session = await createSession(
      {
        returnUrl: returnUrlBase.toString(),
        price: finalPrice,
        description: "Product Purchase",
        offerOptions: {
          platform,
          quantity: qty,
          type: service,
          price: finalPrice,
        },
        metadata: {
          tcOrderId: orderId,
          email,
          profile: target,
          currency: "USD",
          premium,
          ...(SMM_SERVICE_IDS[`${platform}-${service}`] !== undefined
            ? { smmServiceId: SMM_SERVICE_IDS[`${platform}-${service}`] }
            : {}),
        },
        summaryItems: [
          {
            type: "regular",
            title: `${qty.toLocaleString("en-US")} ${PLATFORM_LABEL[platform]} ${SERVICE_LABEL[service]}${premium ? " · Premium" : ""}`,
            value: finalPrice,
          },
        ],
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
