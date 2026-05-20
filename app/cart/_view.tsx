"use client";

import { useMemo, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  MessageSquare,
  Play,
  Repeat2,
  ShoppingCart,
  UserPlus,
  X,
} from "lucide-react";
import { formatQty } from "@/lib/utils";
import {
  lineItemTotal,
  useCart,
  type CartItem,
  type Platform,
  type Service,
} from "@/components/cart-context";

/* ---------- Platform brand SVGs (duplicated from service-table.tsx for isolation) ---------- */

const InstagramBrand = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="#fff" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
  </svg>
);
const TikTokBrand = (
  <svg width="14" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M16.5 3.5c.4 1.6 1.5 3 3.4 3.3v2.4c-1.3 0-2.5-.3-3.6-1v6.4a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .8.1v2.5a3.2 3.2 0 1 0 2.4 3.1V3.5h2.7z"
      fill="#fff"
    />
  </svg>
);
const YouTubeBrand = (
  <svg width="18" height="13" viewBox="0 0 24 17" fill="none">
    <path
      d="M23.5 2.6c-.3-1-1-1.8-2-2C19.6 0 12 0 12 0S4.4 0 2.5.6c-1 .3-1.8 1-2 2C0 4.6 0 8.5 0 8.5s0 3.9.5 5.9c.3 1 1 1.8 2 2C4.4 17 12 17 12 17s7.6 0 9.5-.6c1-.3 1.8-1 2-2 .5-2 .5-5.9.5-5.9s0-3.9-.5-5.9z"
      fill="#fff"
    />
    <path d="M9.5 12V5l6.5 3.5L9.5 12z" fill="#ff0000" />
  </svg>
);
const FacebookBrand = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M13.5 22v-8.4h2.8l.4-3.3h-3.2V8.2c0-.95.27-1.6 1.65-1.6h1.76V3.7c-.85-.1-1.7-.15-2.55-.15-2.52 0-4.25 1.55-4.25 4.4v2.45H7.27v3.3h2.86V22h3.37z"
      fill="#fff"
    />
  </svg>
);
const TwitterBrand = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zM17.083 19.77h1.833L7.084 4.126H5.117L17.083 19.77z"
      fill="#fff"
    />
  </svg>
);

const IG_BG = "linear-gradient(135deg,#feda77 0%,#f58529 35%,#dd2a7b 65%,#8134af 100%)";

const PLATFORM_BRAND: Record<Platform, ReactNode> = {
  instagram: InstagramBrand,
  tiktok: TikTokBrand,
  youtube: YouTubeBrand,
  facebook: FacebookBrand,
  twitter: TwitterBrand,
};

const PLATFORM_BG: Record<Platform, string> = {
  instagram: IG_BG,
  tiktok: "#000",
  youtube: "#FF0000",
  facebook: "#1877F2",
  twitter: "#000",
};

const PLATFORM_LABEL: Record<Platform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  facebook: "Facebook",
  twitter: "Twitter / X",
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

/* ---------- Browse / empty state link grid ---------- */

const BROWSE_LINKS: { platform: Platform; href: string; from: string }[] = [
  { platform: "instagram", href: "/buy-instagram-followers", from: "$3.49" },
  { platform: "tiktok", href: "/buy-tiktok-followers", from: "$4.79" },
  { platform: "youtube", href: "/buy-youtube-subscribers", from: "$12.49" },
  { platform: "facebook", href: "/buy-facebook-followers", from: "$6.50" },
  { platform: "twitter", href: "/buy-twitter-followers", from: "$3.99" },
];

/* ---------- Upsell candidates (used when cart > 0) ---------- */

type UpsellCandidate = {
  platform: Platform;
  service: Service;
  qty: number;
  price: number;
  regular: number;
  href: string;
};

const UPSELL_POOL: UpsellCandidate[] = [
  { platform: "instagram", service: "followers", qty: 1000, price: 6.49, regular: 8.11, href: "/buy-instagram-followers" },
  { platform: "instagram", service: "likes",     qty: 500,  price: 4.79, regular: 5.99, href: "/buy-instagram-likes" },
  { platform: "instagram", service: "views",     qty: 1000, price: 3.49, regular: 4.36, href: "/buy-instagram-views" },
  { platform: "tiktok",    service: "followers", qty: 1000, price: 8.99, regular: 11.24, href: "/buy-tiktok-followers" },
  { platform: "tiktok",    service: "likes",     qty: 500,  price: 2.39, regular: 2.99, href: "/buy-tiktok-likes" },
  { platform: "tiktok",    service: "views",     qty: 1000, price: 2.39, regular: 2.99, href: "/buy-tiktok-views" },
  { platform: "youtube",   service: "subscribers", qty: 100, price: 12.49, regular: 15.61, href: "/buy-youtube-subscribers" },
  { platform: "youtube",   service: "views",     qty: 1000, price: 4.39, regular: 5.49, href: "/buy-youtube-views" },
  { platform: "facebook",  service: "followers", qty: 500,  price: 6.50, regular: 8.13, href: "/buy-facebook-followers" },
  { platform: "facebook",  service: "likes",     qty: 500,  price: 3.50, regular: 4.38, href: "/buy-facebook-likes" },
  { platform: "facebook",  service: "views",     qty: 1000, price: 2.99, regular: 3.74, href: "/buy-facebook-views" },
  { platform: "twitter",   service: "followers", qty: 500,  price: 3.99, regular: 4.99, href: "/buy-twitter-followers" },
  { platform: "twitter",   service: "likes",     qty: 500,  price: 2.49, regular: 3.11, href: "/buy-twitter-likes" },
  { platform: "twitter",   service: "retweets",  qty: 500,  price: 2.99, regular: 3.74, href: "/buy-twitter-retweets" },
];

function pickUpsells(items: CartItem[]): UpsellCandidate[] {
  const owned = new Set(items.map((it) => `${it.platform}-${it.service}`));
  const cartPlatforms = new Set(items.map((it) => it.platform));
  const sameLatform = UPSELL_POOL.filter(
    (c) => cartPlatforms.has(c.platform) && !owned.has(`${c.platform}-${c.service}`),
  );
  const otherPlatform = UPSELL_POOL.filter(
    (c) => !cartPlatforms.has(c.platform) && !owned.has(`${c.platform}-${c.service}`),
  );
  return [...sameLatform, ...otherPlatform].slice(0, 3);
}

/* ---------- Visuals ---------- */

function PlatformChip({ platform, size = 44 }: { platform: Platform; size?: number }) {
  return (
    <span
      className="cart-line-icon"
      style={{ background: PLATFORM_BG[platform], width: size, height: size }}
      aria-hidden
    >
      {PLATFORM_BRAND[platform]}
    </span>
  );
}

/* ---------- View ---------- */

export function CartView() {
  const { items, hydrated, count, subtotal, removeItem, clear } = useCart();

  const grouped = useMemo(() => {
    const map = new Map<Platform, CartItem[]>();
    for (const it of items) {
      const arr = map.get(it.platform) ?? [];
      arr.push(it);
      map.set(it.platform, arr);
    }
    return Array.from(map.entries());
  }, [items]);

  const upsells = useMemo(() => pickUpsells(items), [items]);

  return (
    <main className="cart-shell">
      <div className="cart-top">
        <div className="container-narrow">
          <div className="cart-top-row">
            <h1>
              Your cart{count > 0 && <span className="cart-count"> ({count})</span>}
            </h1>
            <Link href="/" className="cart-close" aria-label="Back to home">
              <X size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div className="container-narrow cart-body">
        {!hydrated ? (
          <div className="cart-skeleton">
            <div className="cart-skeleton-line" />
            <div className="cart-skeleton-line" />
            <div className="cart-skeleton-line" />
          </div>
        ) : count === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon" aria-hidden>
              <ShoppingCart size={56} />
            </div>
            <h2>Your cart is empty</h2>
            <p>Add a service to get started.</p>
            <div className="cart-empty-grid">
              {BROWSE_LINKS.map((b) => (
                <Link key={b.href} href={b.href} className="cart-empty-link">
                  <span
                    className="cart-line-icon"
                    style={{ background: PLATFORM_BG[b.platform], width: 36, height: 36 }}
                    aria-hidden
                  >
                    {PLATFORM_BRAND[b.platform]}
                  </span>
                  <span className="cart-empty-link-text">
                    <strong>{PLATFORM_LABEL[b.platform]}</strong>
                    <span className="cart-empty-link-from">From {b.from}</span>
                  </span>
                  <ArrowRight size={16} aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <>
            {grouped.map(([platform, lines]) => (
              <section key={platform} className="cart-section">
                <div className="cart-section-head">
                  {PLATFORM_LABEL[platform].toUpperCase()} ·{" "}
                  {lines.length} {lines.length === 1 ? "item" : "items"}
                </div>
                {lines.map((it) => {
                  const Icon = SERVICE_ICON[it.service];
                  const total = lineItemTotal(it);
                  return (
                    <div key={it.id} className="cart-line">
                      <PlatformChip platform={it.platform} />
                      <div className="cart-line-body">
                        <div className="cart-line-title">
                          <Icon size={14} aria-hidden />
                          <span>{SERVICE_LABEL[it.service]}</span>
                          <span className="cart-line-qty">{formatQty(it.qty)}</span>
                          {it.premium && <span className="cart-line-premium">Premium</span>}
                        </div>
                        {it.target && (
                          <div className="cart-line-target" title={it.target}>
                            {it.target}
                          </div>
                        )}
                      </div>
                      <div className="cart-line-price">${total.toFixed(2)}</div>
                      <button
                        type="button"
                        onClick={() => removeItem(it.id)}
                        className="cart-line-remove"
                        aria-label={`Remove ${SERVICE_LABEL[it.service]} from cart`}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  );
                })}
              </section>
            ))}

            {upsells.length > 0 && (
              <section className="cart-upsell">
                <div className="cart-section-head">YOU MIGHT LIKE</div>
                <div className="cart-upsell-grid">
                  {upsells.map((u) => (
                    <Link key={`${u.platform}-${u.service}`} href={u.href} className="cart-upsell-card">
                      <PlatformChip platform={u.platform} size={36} />
                      <div className="cart-upsell-body">
                        <div className="cart-upsell-title">
                          {formatQty(u.qty)} {SERVICE_LABEL[u.service]}
                        </div>
                        <div className="cart-upsell-meta">
                          <span className="cart-upsell-price">${u.price.toFixed(2)}</span>
                          <span className="cart-upsell-regular">${u.regular.toFixed(2)}</span>
                        </div>
                      </div>
                      <ArrowRight size={16} aria-hidden />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="cart-checkout-bar">
              <Link href="/checkout" className="btn btn-primary btn-lg cart-checkout-cta">
                Checkout · ${subtotal.toFixed(2)}
                <ArrowRight size={18} />
              </Link>
              <button
                type="button"
                className="cart-clear"
                onClick={() => {
                  if (window.confirm("Clear your cart? This cannot be undone.")) {
                    clear();
                  }
                }}
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
