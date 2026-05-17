import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import { formatQty } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Order received · Thunderclap",
  description: "Your Thunderclap order is confirmed and queued for delivery.",
  robots: { index: false, follow: false },
};

type Platform = "instagram" | "tiktok" | "youtube" | "facebook" | "twitter";
type Service =
  | "followers"
  | "likes"
  | "views"
  | "subscribers"
  | "comments"
  | "retweets";

const PLATFORM_LABEL: Record<Platform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  facebook: "Facebook",
  twitter: "Twitter",
};
const SERVICE_LABEL: Record<Service, string> = {
  followers: "Followers",
  likes: "Likes",
  views: "Views",
  subscribers: "Subscribers",
  comments: "Comments",
  retweets: "Retweets",
};

const isPlatform = (v: string): v is Platform =>
  v === "instagram" ||
  v === "tiktok" ||
  v === "youtube" ||
  v === "facebook" ||
  v === "twitter";
const isService = (v: string): v is Service =>
  v === "followers" ||
  v === "likes" ||
  v === "views" ||
  v === "subscribers" ||
  v === "comments" ||
  v === "retweets";

function pickStr(v: string | string[] | undefined, fallback: string): string {
  if (Array.isArray(v)) return v[0] ?? fallback;
  return v ?? fallback;
}

function orderIdFor(seed: string): string {
  // Deterministic 6-char alphanumeric so the same query renders the same id on
  // re-render. Not cryptographic — just a friendly display value.
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const alpha = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) {
    out += alpha[h % alpha.length];
    h = Math.floor(h / alpha.length) + ((h & 0xff) << 3);
  }
  return `TC-${out}`;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;

  const platformRaw = pickStr(sp.platform, "instagram");
  const serviceRaw = pickStr(sp.service, "followers");
  const platform: Platform = isPlatform(platformRaw) ? platformRaw : "instagram";
  const service: Service = isService(serviceRaw) ? serviceRaw : "followers";
  const qty = Math.max(1, Number(pickStr(sp.qty, "1000")) || 1000);
  const basePrice = Math.max(0, Number(pickStr(sp.price, "7.99")) || 7.99);
  const premium = pickStr(sp.premium, "0") === "1";
  const target = pickStr(sp.target, "");
  const email = pickStr(sp.email, "");
  const totalParam = pickStr(sp.total, "");
  const total = Number(totalParam) || +(basePrice * (premium ? 1.35 : 1)).toFixed(2);

  // Prefer the order id we generated server-side in /api/checkout/session
  // (carried through the gateway round-trip); fall back to a deterministic
  // hash so the legacy /checkout/success flow still works without Redlap.
  const orderIdParam = pickStr(sp.order_id, "");
  const seed = `${platform}|${service}|${qty}|${basePrice}|${premium}|${target}|${email}`;
  const orderId = orderIdParam || orderIdFor(seed);
  const sessionId = pickStr(sp.payment_id, "");
  const gatewayOrder = pickStr(sp.order_number, "");

  return (
    <main className="co-shell">
      <div className="co-top">
        <div className="container" style={{ position: "relative" }}>
          <div className="co-top-inner">
            <span aria-hidden style={{ width: 36, height: 36 }} />
            <Link href="/" className="co-logo" aria-label="Thunderclap home">
              <Image
                src="/logo.webp"
                alt="Thunderclap"
                width={120}
                height={24}
                style={{ height: 22, width: "auto", maxWidth: "none" }}
                priority
              />
            </Link>
            <div className="co-secure">
              <ShieldCheck size={16} />
              <span>Payment complete</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <section className="co-success">
          <span className="co-success-ring" aria-hidden>
            <Check size={36} strokeWidth={3} />
          </span>
          <h1>Payment received</h1>
          <p>
            Thanks for your order. We&rsquo;ve emailed a receipt to{" "}
            <strong>{email || "your inbox"}</strong> and your delivery is already in the queue.
          </p>

          <dl className="co-success-meta">
            <div>
              <dt>Order ID</dt>
              <dd style={{ fontFamily: "var(--uv-font-mono)" }}>{orderId}</dd>
            </div>
            <div>
              <dt>Total charged</dt>
              <dd>${total.toFixed(2)} USD</dd>
            </div>
            <div>
              <dt>Package</dt>
              <dd>
                {formatQty(qty)} {PLATFORM_LABEL[platform]} {SERVICE_LABEL[service]}
                {premium ? " · Premium" : ""}
              </dd>
            </div>
            <div>
              <dt>Delivering to</dt>
              <dd
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={target || undefined}
              >
                {target || "—"}
              </dd>
            </div>
            {gatewayOrder && (
              <div>
                <dt>Gateway ref</dt>
                <dd style={{ fontFamily: "var(--uv-font-mono)", fontSize: 12 }}>
                  {gatewayOrder}
                </dd>
              </div>
            )}
            {sessionId && (
              <div>
                <dt>Session</dt>
                <dd
                  style={{
                    fontFamily: "var(--uv-font-mono)",
                    fontSize: 12,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={sessionId}
                >
                  {sessionId}
                </dd>
              </div>
            )}
          </dl>

          <div className="co-success-next">
            <h3>What happens next</h3>
            <ol>
              <li>Delivery starts within 15 minutes — drip-fed for a safe, audit-proof curve.</li>
              <li>You&rsquo;ll get a confirmation email when the order is complete.</li>
              <li>30-day refill guarantee kicks in automatically if anyone drops off.</li>
            </ol>
          </div>

          <div className="co-success-actions">
            <Link href="/" className="btn btn-outline btn-md">
              Back to home
            </Link>
            <Link href={`/buy-${platform}-${service}`} className="btn btn-primary btn-md">
              Order again
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
