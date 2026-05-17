import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  MessageSquare,
  Play,
  Plus,
  Repeat2,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { formatQty } from "@/lib/utils";
import { CheckoutForm } from "./_form";

export const metadata: Metadata = {
  title: "Secure checkout · Thunderclap",
  description: "Complete your Thunderclap order — fast, safe, no password required.",
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

const SERVICE_ICON: Record<Service, typeof UserPlus> = {
  followers: UserPlus,
  subscribers: UserPlus,
  likes: Heart,
  views: Play,
  comments: MessageSquare,
  retweets: Repeat2,
};

type InputConfig = { label: string; placeholder: string };
const INPUT_CONFIG: Record<string, InputConfig> = {
  "instagram-followers": {
    label: "Instagram username or profile link",
    placeholder: "https://instagram.com/yourusername",
  },
  "instagram-likes": {
    label: "Instagram post URL",
    placeholder: "https://instagram.com/p/abc123/",
  },
  "instagram-views": {
    label: "Instagram Reel or video URL",
    placeholder: "https://instagram.com/reel/abc123/",
  },
  "tiktok-followers": {
    label: "TikTok username or profile link",
    placeholder: "https://tiktok.com/@yourusername",
  },
  "tiktok-likes": {
    label: "TikTok video URL",
    placeholder: "https://tiktok.com/@yourusername/video/1234567890",
  },
  "tiktok-views": {
    label: "TikTok video URL",
    placeholder: "https://tiktok.com/@yourusername/video/1234567890",
  },
  "youtube-subscribers": {
    label: "YouTube channel URL",
    placeholder: "https://youtube.com/@yourchannel",
  },
  "youtube-views": {
    label: "YouTube video URL",
    placeholder: "https://youtube.com/watch?v=A3uyBx675Sx",
  },
  "facebook-followers": {
    label: "Facebook page URL",
    placeholder: "https://facebook.com/yourpage",
  },
  "facebook-likes": {
    label: "Facebook post URL",
    placeholder: "https://facebook.com/yourpage/posts/123456789",
  },
  "facebook-views": {
    label: "Facebook video or Reel URL",
    placeholder: "https://facebook.com/yourpage/videos/123456789",
  },
  "twitter-followers": {
    label: "Twitter / X profile URL",
    placeholder: "https://x.com/yourhandle",
  },
  "twitter-likes": {
    label: "Twitter / X post URL",
    placeholder: "https://x.com/yourhandle/status/123456789",
  },
  "twitter-retweets": {
    label: "Twitter / X post URL",
    placeholder: "https://x.com/yourhandle/status/123456789",
  },
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

function pickStr(
  v: string | string[] | undefined,
  fallback: string,
): string {
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
  if (platform === "facebook") {
    return (
      <span className="side-fb-icon" aria-hidden>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M13.5 22v-8.4h2.8l.4-3.3h-3.2V8.2c0-.95.27-1.6 1.65-1.6h1.76V3.7c-.85-.1-1.7-.15-2.55-.15-2.52 0-4.25 1.55-4.25 4.4v2.45H7.27v3.3h2.86V22h3.37z"
            fill="#fff"
          />
        </svg>
      </span>
    );
  }
  if (platform === "twitter") {
    return (
      <span className="side-tw-icon" aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zM17.083 19.77h1.833L7.084 4.126H5.117L17.083 19.77z"
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

  const cfg = INPUT_CONFIG[`${platform}-${service}`] ?? INPUT_CONFIG["instagram-followers"];
  const backHref = `/buy-${platform}-${service}`;
  const Icon = SERVICE_ICON[service];

  return (
    <main className="co-shell">
      <div className="co-top">
        <div className="container" style={{ position: "relative" }}>
          <div className="co-top-inner">
            <Link href={backHref} aria-label="Back to package selection" className="co-back">
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
          <span className="co-step active">
            <span className="co-step-num">1</span>
            Details
          </span>
          <ChevronRight size={14} className="co-step-sep" />
          <span className="co-step">
            <span className="co-step-num">2</span>
            Payment
          </span>
        </div>

        <div className="co-grid">
          <section className="co-card">
            <h1>Get started</h1>
            <div className="live-pill">
              <span className="live-dot" />
              <span>
                <strong>498 live users</strong> on checkout
              </span>
            </div>

            <CheckoutForm
              platform={platform}
              service={service}
              qty={qty}
              basePrice={basePrice}
              premium={premium}
              label={cfg.label}
              placeholder={cfg.placeholder}
              initialTarget={target}
              initialEmail={email}
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

            <button type="button" className="co-bundle" aria-label="Add more & save up to 25%">
              <span className="co-bundle-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM20 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM18.5 5.5l-13 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div>
                <div className="co-bundle-title">Unlock bundle savings</div>
                <div className="co-bundle-sub">Add more & save up to 25%</div>
              </div>
              <span className="co-bundle-plus" aria-hidden>
                <Plus size={18} />
              </span>
            </button>

            <blockquote className="co-quote">
              &ldquo;When you want to accomplish your social media goals, Thunderclap is the place
              to turn.&rdquo;
              <cite>
                DENVER 7<span className="co-quote-stars">★★★★★</span>
              </cite>
            </blockquote>
          </aside>
        </div>
      </div>
    </main>
  );
}
