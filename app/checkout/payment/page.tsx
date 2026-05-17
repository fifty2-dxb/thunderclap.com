import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Heart,
  MessageSquare,
  Play,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { formatQty } from "@/lib/utils";
import { PaymentForm } from "./_form";

export const metadata: Metadata = {
  title: "Payment · Thunderclap",
  description: "Pay securely for your Thunderclap order — encrypted at checkout.",
  robots: { index: false, follow: false },
};

type Platform = "instagram" | "tiktok" | "youtube";
type Service = "followers" | "likes" | "views" | "subscribers" | "comments";

const PLATFORM_LABEL: Record<Platform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
};
const SERVICE_LABEL: Record<Service, string> = {
  followers: "Followers",
  likes: "Likes",
  views: "Views",
  subscribers: "Subscribers",
  comments: "Comments",
};
const SERVICE_ICON: Record<Service, typeof UserPlus> = {
  followers: UserPlus,
  subscribers: UserPlus,
  likes: Heart,
  views: Play,
  comments: MessageSquare,
};

const isPlatform = (v: string): v is Platform =>
  v === "instagram" || v === "tiktok" || v === "youtube";
const isService = (v: string): v is Service =>
  v === "followers" ||
  v === "likes" ||
  v === "views" ||
  v === "subscribers" ||
  v === "comments";

function pickStr(v: string | string[] | undefined, fallback: string): string {
  if (Array.isArray(v)) return v[0] ?? fallback;
  return v ?? fallback;
}

function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === "instagram") {
    return (
      <span className="side-ig-icon" aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="#fff" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
        </svg>
      </span>
    );
  }
  if (platform === "tiktok") {
    return (
      <span className="side-tt-icon" aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M16.5 3.5c.4 1.6 1.5 3 3.4 3.3v2.4c-1.3 0-2.5-.3-3.6-1v6.4a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .8.1v2.5a3.2 3.2 0 1 0 2.4 3.1V3.5h2.7z"
            fill="#fff"
          />
        </svg>
      </span>
    );
  }
  return (
    <span className="side-yt-icon" aria-hidden>
      <svg width="20" height="14" viewBox="0 0 24 17" fill="none">
        <path
          d="M23.5 2.6c-.3-1-1-1.8-2-2C19.6 0 12 0 12 0S4.4 0 2.5.6c-1 .3-1.8 1-2 2C0 4.6 0 8.5 0 8.5s0 3.9.5 5.9c.3 1 1 1.8 2 2C4.4 17 12 17 12 17s7.6 0 9.5-.6c1-.3 1.8-1 2-2 .5-2 .5-5.9.5-5.9s0-3.9-.5-5.9z"
          fill="#fff"
        />
        <path d="M9.5 12V5l6.5 3.5L9.5 12z" fill="#ff0000" />
      </svg>
    </span>
  );
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

  const subtotal = +(basePrice * (premium ? 1.35 : 1)).toFixed(2);
  const total = subtotal;

  const backHref = `/checkout?${new URLSearchParams({
    platform,
    service,
    qty: String(qty),
    price: String(basePrice),
    premium: premium ? "1" : "0",
  }).toString()}`;

  const Icon = SERVICE_ICON[service];

  return (
    <main className="co-shell">
      <div className="co-top">
        <div className="container" style={{ position: "relative" }}>
          <div className="co-top-inner">
            <Link href={backHref} aria-label="Back to details" className="co-back">
              <ArrowLeft size={18} />
            </Link>
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
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="co-stepper" aria-label="Checkout steps">
          <span className="co-step completed">
            <span className="co-step-num">
              <Check size={12} strokeWidth={3} />
            </span>
            Details
          </span>
          <ChevronRight size={14} className="co-step-sep" />
          <span className="co-step active">
            <span className="co-step-num">2</span>
            Payment
          </span>
        </div>

        <div className="co-grid">
          <section className="co-card">
            <h1>Payment</h1>
            <div className="live-pill">
              <span className="live-dot" />
              <span>
                <strong>Encrypted</strong> · 256-bit SSL at checkout
              </span>
            </div>

            <PaymentForm
              platform={platform}
              service={service}
              qty={qty}
              basePrice={basePrice}
              premium={premium}
              total={total}
              target={target}
              email={email}
            />

            <div className="co-trust-row">
              <span className="co-trust-stars" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i}>★</span>
                ))}
              </span>
              <span>
                <strong style={{ color: "var(--uv-fg-1)" }}>4.7</strong> · 12,743 reviews on
                Trustpilot
              </span>
            </div>
          </section>

          <aside>
            <div className="co-summary">
              <div className="co-sum-head">
                <PlatformIcon platform={platform} />
                <span>{PLATFORM_LABEL[platform]}</span>
              </div>
              <div className="co-sum-line">
                <span className="co-sum-qty">
                  <Icon size={16} />
                  {formatQty(qty)} {SERVICE_LABEL[service]}
                  {premium && <span className="co-sum-premium">Premium</span>}
                </span>
                <span style={{ color: "var(--uv-fg-1)", fontWeight: 600 }}>
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {target && (
                <div className="co-sum-line">
                  <span>Delivering to</span>
                  <span
                    style={{
                      color: "var(--uv-fg-1)",
                      fontWeight: 500,
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      direction: "rtl",
                      textAlign: "right",
                    }}
                    title={target}
                  >
                    {target}
                  </span>
                </div>
              )}
              <div className="co-sum-line">
                <span>Subtotal</span>
                <span style={{ color: "var(--uv-fg-1)", fontWeight: 600 }}>
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="co-sum-total">
                <span>Total</span>
                <span>
                  <span className="co-sum-currency">USD</span>${total.toFixed(2)}
                </span>
              </div>
            </div>

            <blockquote className="co-quote">
              &ldquo;The payment took about ten seconds. Order delivered to the inbox before I
              closed the tab.&rdquo;
              <cite>
                MARCUS C.<span className="co-quote-stars">★★★★★</span>
              </cite>
            </blockquote>
          </aside>
        </div>
      </div>
    </main>
  );
}
