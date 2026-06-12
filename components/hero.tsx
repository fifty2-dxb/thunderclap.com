"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Bot,
  Facebook,
  Flame,
  Linkedin,
  Link2,
  Lock,
  Music2,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  XCircle,
  Zap,
} from "lucide-react";
import { Bolt, Spark } from "@/components/bolt-art";
import { useAiWaitlist } from "@/components/ai-waitlist";
import { useCart, type Platform, type Service } from "@/components/cart-context";

const IgGlyph = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="#fff" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
  </svg>
);
const XGlyph = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
    <path d="M18.3 3H22l-7.2 8.2L23 21h-6.8l-5.3-6.5L4.8 21H1l7.7-8.8L1 3h7l4.8 6 5.5-6z" />
  </svg>
);

type HomePlatform = {
  id: "instagram" | "tiktok" | "youtube" | "twitter" | "facebook" | "linkedin";
  label: string;
  bg: string;
  glyph?: ReactNode;
  icon?: ReactNode;
  services: string[];
};

const HOME_PLATFORMS: HomePlatform[] = [
  { id: "instagram", label: "Instagram", bg: "linear-gradient(135deg,#feda77 0%,#f58529 35%,#dd2a7b 65%,#8134af 100%)", glyph: <IgGlyph />, services: ["Followers", "Likes", "Views"] },
  { id: "tiktok", label: "TikTok", bg: "#000", icon: <Music2 size={13} color="#fff" />, services: ["Followers", "Likes", "Views"] },
  { id: "youtube", label: "YouTube", bg: "#FF0000", icon: <Play size={13} color="#fff" />, services: ["Subscribers", "Views", "Likes"] },
  { id: "twitter", label: "X", bg: "#000", glyph: <XGlyph />, services: ["Followers", "Likes", "Retweets"] },
  { id: "facebook", label: "Facebook", bg: "#1877F2", icon: <Facebook size={13} color="#fff" />, services: ["Followers", "Likes", "Views"] },
  { id: "linkedin", label: "LinkedIn", bg: "#0A66C2", icon: <Linkedin size={13} color="#fff" />, services: ["Followers", "Likes", "Comments"] },
];

type HomeTier = {
  qty: number;
  price: number;
  regular: number;
  popular?: boolean;
  bestDeal?: boolean;
  bulkPrice?: boolean;
};

// Mirrors the PACKAGES arrays in each app/(marketing)/buy-<platform>-<service>/_builder.tsx.
// Keep these in sync with the buy pages (see the pricing sources-of-truth note in CLAUDE.md).
const HOME_PRICING: Record<string, HomeTier[]> = {
  "instagram-followers": [
    { qty: 100, price: 3.49, regular: 4.36 },
    { qty: 250, price: 5.99, regular: 7.49 },
    { qty: 500, price: 7.99, regular: 9.99 },
    { qty: 1000, price: 14.99, regular: 18.74 },
    { qty: 2000, price: 25.99, regular: 32.49 },
    { qty: 5000, price: 39.99, regular: 49.99, popular: true },
    { qty: 10000, price: 59.99, regular: 74.99 },
    { qty: 20000, price: 99.99, regular: 124.99 },
    { qty: 50000, price: 219.99, regular: 274.99 },
    { qty: 100000, price: 379.99, regular: 474.99 },
    { qty: 200000, price: 649.99, regular: 812.49, bulkPrice: true },
  ],
  "instagram-likes": [
    { qty: 50, price: 1.99, regular: 2.49 },
    { qty: 100, price: 3.49, regular: 4.36 },
    { qty: 250, price: 5.99, regular: 7.49 },
    { qty: 500, price: 7.99, regular: 9.99 },
    { qty: 1000, price: 14.99, regular: 18.74 },
    { qty: 2500, price: 26.99, regular: 33.74, popular: true },
    { qty: 5000, price: 49.99, regular: 62.49 },
    { qty: 10000, price: 99.99, regular: 124.99 },
    { qty: 20000, price: 189.99, regular: 237.49, bulkPrice: true },
  ],
  "instagram-views": [
    { qty: 500, price: 2.49, regular: 3.11 },
    { qty: 2500, price: 7.99, regular: 9.99 },
    { qty: 5000, price: 16.99, regular: 21.24, popular: true },
    { qty: 10000, price: 26.99, regular: 33.74 },
    { qty: 25000, price: 54.99, regular: 68.74 },
    { qty: 50000, price: 79.99, regular: 99.99, bestDeal: true },
  ],
  "tiktok-followers": [
    { qty: 100, price: 5.99, regular: 7.49 },
    { qty: 200, price: 8.99, regular: 11.24 },
    { qty: 500, price: 18.99, regular: 23.74, popular: true },
    { qty: 1000, price: 29.99, regular: 37.49 },
    { qty: 2000, price: 39.99, regular: 49.99 },
    { qty: 5000, price: 69.99, regular: 87.49, bestDeal: true },
  ],
  "tiktok-likes": [
    { qty: 100, price: 2.99, regular: 3.74 },
    { qty: 200, price: 4.49, regular: 5.61 },
    { qty: 500, price: 8.99, regular: 11.24, popular: true },
    { qty: 1000, price: 13.99, regular: 17.49 },
    { qty: 2000, price: 22.99, regular: 28.74 },
    { qty: 5000, price: 44.99, regular: 56.24, bestDeal: true },
  ],
  "tiktok-views": [
    { qty: 1000, price: 1.99, regular: 2.49 },
    { qty: 2000, price: 2.99, regular: 3.74 },
    { qty: 5000, price: 5.49, regular: 6.86 },
    { qty: 10000, price: 9.99, regular: 12.49, popular: true },
    { qty: 50000, price: 34.99, regular: 43.74, bestDeal: true },
  ],
  "youtube-subscribers": [
    { qty: 100, price: 6.99, regular: 8.74 },
    { qty: 250, price: 13.99, regular: 17.49 },
    { qty: 500, price: 24.99, regular: 31.24, popular: true },
    { qty: 1000, price: 44.99, regular: 56.24 },
    { qty: 2500, price: 99.99, regular: 124.99 },
    { qty: 5000, price: 174.99, regular: 218.74 },
    { qty: 7500, price: 239.99, regular: 299.99 },
    { qty: 10000, price: 299.99, regular: 374.99, bulkPrice: true },
  ],
  "youtube-views": [
    { qty: 100, price: 2.49, regular: 3.11 },
    { qty: 250, price: 3.99, regular: 4.99 },
    { qty: 500, price: 6.49, regular: 8.11 },
    { qty: 1000, price: 7.99, regular: 9.99 },
    { qty: 2500, price: 14.99, regular: 18.74 },
    { qty: 5000, price: 24.99, regular: 31.24, popular: true },
    { qty: 7500, price: 34.99, regular: 43.74 },
    { qty: 10000, price: 42.99, regular: 53.74 },
    { qty: 25000, price: 74.99, regular: 93.74 },
    { qty: 50000, price: 124.99, regular: 156.24 },
    { qty: 100000, price: 199.99, regular: 249.99, bestDeal: true },
    { qty: 250000, price: 399.99, regular: 499.99 },
    { qty: 500000, price: 699.99, regular: 874.99, bulkPrice: true },
  ],
  "youtube-likes": [
    { qty: 100, price: 2.99, regular: 3.74 },
    { qty: 250, price: 4.99, regular: 6.24 },
    { qty: 500, price: 7.49, regular: 9.36, popular: true },
    { qty: 1000, price: 9.99, regular: 12.49 },
    { qty: 2500, price: 18.99, regular: 23.74 },
    { qty: 5000, price: 32.99, regular: 41.24 },
    { qty: 7500, price: 44.99, regular: 56.24 },
    { qty: 10000, price: 54.99, regular: 68.74, bulkPrice: true },
  ],
  "twitter-followers": [
    { qty: 50, price: 3.99, regular: 4.99 },
    { qty: 100, price: 6.49, regular: 8.11 },
    { qty: 250, price: 8.99, regular: 11.24 },
    { qty: 500, price: 15.99, regular: 19.99 },
    { qty: 1000, price: 29.99, regular: 37.49, popular: true },
    { qty: 2500, price: 73.99, regular: 92.49 },
    { qty: 5000, price: 144.99, regular: 181.24 },
    { qty: 10000, price: 269.99, regular: 337.49 },
  ],
  "twitter-likes": [
    { qty: 25, price: 2.49, regular: 3.11 },
    { qty: 50, price: 3.99, regular: 4.99 },
    { qty: 100, price: 5.49, regular: 6.86 },
    { qty: 250, price: 11.49, regular: 14.36 },
    { qty: 500, price: 19.49, regular: 24.36, popular: true },
    { qty: 1000, price: 35.49, regular: 44.36 },
    { qty: 2500, price: 69.49, regular: 86.86 },
    { qty: 5000, price: 129.49, regular: 161.86 },
  ],
  "twitter-retweets": [
    { qty: 25, price: 2.99, regular: 3.74 },
    { qty: 50, price: 4.99, regular: 6.24 },
    { qty: 100, price: 7.99, regular: 9.99 },
    { qty: 250, price: 12.99, regular: 16.24 },
    { qty: 500, price: 24.99, regular: 31.24, popular: true },
    { qty: 1000, price: 44.99, regular: 56.24 },
    { qty: 2500, price: 97.99, regular: 122.49 },
    { qty: 5000, price: 179.99, regular: 224.99 },
  ],
  "facebook-followers": [
    { qty: 100, price: 3.49, regular: 4.36 },
    { qty: 250, price: 4.49, regular: 5.61 },
    { qty: 500, price: 6.89, regular: 8.61 },
    { qty: 1000, price: 12.49, regular: 15.61 },
    { qty: 2500, price: 28.99, regular: 36.24, popular: true },
    { qty: 5000, price: 38.99, regular: 48.74 },
    { qty: 10000, price: 59.99, regular: 74.99 },
    { qty: 20000, price: 99.99, regular: 124.99 },
    { qty: 100000, price: 499.99, regular: 624.99 },
  ],
  "facebook-likes": [
    { qty: 100, price: 3.5, regular: 4.38 },
    { qty: 250, price: 7.5, regular: 9.38 },
    { qty: 500, price: 11.5, regular: 14.38 },
    { qty: 1000, price: 17.5, regular: 21.88 },
    { qty: 2500, price: 39.5, regular: 49.38, popular: true },
    { qty: 5000, price: 69.5, regular: 86.88 },
    { qty: 10000, price: 125.5, regular: 156.88 },
    { qty: 20000, price: 199.5, regular: 249.38 },
    { qty: 40000, price: 385.5, regular: 481.88 },
  ],
  "facebook-views": [
    { qty: 500, price: 2.99, regular: 3.74 },
    { qty: 2500, price: 6.99, regular: 8.74 },
    { qty: 5000, price: 14.99, regular: 18.74 },
    { qty: 10000, price: 24.99, regular: 31.24, popular: true },
    { qty: 25000, price: 49.99, regular: 62.49 },
    { qty: 50000, price: 74.99, regular: 93.74 },
  ],
  "linkedin-followers": [
    { qty: 100, price: 7, regular: 8.75 },
    { qty: 250, price: 16, regular: 20 },
    { qty: 500, price: 32, regular: 40, popular: true },
    { qty: 1000, price: 64, regular: 80 },
    { qty: 2500, price: 159, regular: 198.75 },
    { qty: 5000, price: 319, regular: 398.75 },
  ],
  "linkedin-likes": [
    { qty: 50, price: 4.5, regular: 5.63 },
    { qty: 75, price: 6.5, regular: 8.13 },
    { qty: 100, price: 9, regular: 11.25 },
    { qty: 150, price: 14, regular: 17.5 },
    { qty: 250, price: 23, regular: 28.75, popular: true },
    { qty: 500, price: 45, regular: 56.25 },
    { qty: 750, price: 67, regular: 83.75 },
    { qty: 1000, price: 89, regular: 111.25 },
  ],
  "linkedin-comments": [
    { qty: 10, price: 4, regular: 5 },
    { qty: 15, price: 6, regular: 7.5 },
    { qty: 25, price: 9, regular: 11.25 },
    { qty: 50, price: 17, regular: 21.25 },
    { qty: 100, price: 25, regular: 31.25 },
    { qty: 150, price: 35, regular: 43.75, popular: true },
    { qty: 200, price: 45, regular: 56.25 },
    { qty: 250, price: 50, regular: 62.5 },
    { qty: 300, price: 60, regular: 75 },
    { qty: 400, price: 80, regular: 100 },
    { qty: 500, price: 90, regular: 112.5 },
    { qty: 1000, price: 160, regular: 200 },
  ],
};

function popularIndex(tiers: HomeTier[]): number {
  const i = tiers.findIndex((t) => t.popular);
  return i >= 0 ? i : Math.floor(tiers.length / 2);
}

function homeQty(n: number): string {
  if (n >= 1_000_000) return `${n / 1_000_000}M`;
  if (n >= 1_000) return `${n / 1_000}K`;
  return n.toString();
}

const HOME_AI_PLANS = [
  { name: "Starter", m: 29, a: 23, sub: "600 FOLLOWERS/MO" },
  { name: "Growth", m: 59, a: 47, sub: "2,000 FOLLOWERS/MO", popular: true },
  { name: "Pro", m: 119, a: 95, sub: "UNLIMITED SPEED" },
];

function HomeBuyBox() {
  const [platId, setPlatId] = useState<HomePlatform["id"] | "ai">("instagram");
  const [service, setService] = useState("Followers");
  const [selected, setSelected] = useState(3);
  const [url, setUrl] = useState("");
  const [billing, setBilling] = useState<"m" | "a">("m");
  const [aiPlan, setAiPlan] = useState(1);
  const { open: openWaitlist } = useAiWaitlist();
  const { addItem } = useCart();

  const aiMode = platId === "ai";
  const plat = HOME_PLATFORMS.find((p) => p.id === platId) ?? HOME_PLATFORMS[0];
  const activeService = !aiMode && plat.services.includes(service) ? service : plat.services[0];
  const tiers = aiMode ? [] : HOME_PRICING[`${platId}-${activeService.toLowerCase()}`] ?? [];
  const safeIdx = Math.min(selected, Math.max(0, tiers.length - 1));
  const pkg = tiers[safeIdx];
  const total = pkg ? pkg.price.toFixed(2) : "0.00";
  const saveFor = (t: HomeTier) => Math.round(t.regular - t.price);
  const plan = HOME_AI_PLANS[aiPlan];
  const planPrice = billing === "a" ? plan.a : plan.m;

  useEffect(() => {
    if (!aiMode && !plat.services.includes(service)) setService(plat.services[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platId]);

  useEffect(() => {
    setSelected(popularIndex(tiers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platId, service]);

  function handleAddToCart() {
    if (aiMode || !pkg) return;
    addItem({
      platform: platId as Platform,
      service: activeService.toLowerCase() as Service,
      qty: pkg.qty,
      price: pkg.price,
      regular: pkg.regular,
      premium: false,
      target: url.trim() || undefined,
    });
  }

  return (
    <div className="buybox-frame">
      <div className="pkg-card">
        <div className="pkg-head">
          <div className="pkg-h-title">Build your order</div>
          <span className="pkg-save">Save up to 20%</span>
        </div>

        <div className="plat-row">
          {HOME_PLATFORMS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`plat-chip ${platId === p.id ? "active" : ""}`}
              onClick={() => setPlatId(p.id)}
            >
              <span className="plat-glyph" style={{ background: p.bg }}>
                {p.glyph ?? p.icon}
              </span>
              {p.label}
            </button>
          ))}
          <button
            type="button"
            className={`plat-chip ${aiMode ? "active" : ""}`}
            onClick={() => setPlatId("ai")}
          >
            <span className="plat-glyph" style={{ background: "var(--uv-pink)" }}>
              <Sparkles size={13} color="#fff" />
            </span>
            AI Growth
          </button>
        </div>

        <div className="svc-tabs" style={{ marginBottom: 16 }}>
          {aiMode ? (
            <>
              <button type="button" className={`svc-tab ${billing === "m" ? "active" : ""}`} onClick={() => setBilling("m")}>
                Monthly
              </button>
              <button type="button" className={`svc-tab ${billing === "a" ? "active" : ""}`} onClick={() => setBilling("a")}>
                Annual −20%
              </button>
            </>
          ) : (
            plat.services.map((s) => (
              <button key={s} type="button" className={`svc-tab ${service === s ? "active" : ""}`} onClick={() => setService(s)}>
                {s}
              </button>
            ))
          )}
        </div>

        {aiMode ? (
          <div className="pkg-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {HOME_AI_PLANS.map((p, i) => (
              <button
                key={p.name}
                type="button"
                className={`pkg-tier ${aiPlan === i ? "selected" : ""} ${p.popular ? "best" : ""}`}
                onClick={() => setAiPlan(i)}
              >
                {p.popular && (
                  <span className="pkg-tier-tag best">
                    <Star size={9} /> MOST POPULAR
                  </span>
                )}
                <span className="pkg-qty">{p.name}</span>
                <span className="pkg-price">${billing === "a" ? p.a : p.m}/mo</span>
                <span className="pkg-qty-sub">{p.sub}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="pkg-grid">
            {tiers.map((t, i) => {
              const save = saveFor(t);
              return (
                <button
                  key={t.qty}
                  type="button"
                  className={`pkg-tier ${safeIdx === i ? "selected" : ""} ${t.popular ? "best" : ""} ${t.bestDeal || t.bulkPrice ? "bulk" : ""}`}
                  onClick={() => setSelected(i)}
                >
                  {t.popular && (
                    <span className="pkg-tier-tag best">
                      <TrendingUp size={9} /> BEST SELLING
                    </span>
                  )}
                  {t.bestDeal && (
                    <span className="pkg-tier-tag bulk">
                      <Flame size={9} /> BEST DEAL
                    </span>
                  )}
                  {t.bulkPrice && (
                    <span className="pkg-tier-tag bulk">
                      <Flame size={9} /> BULK PRICE
                    </span>
                  )}
                  <span className="pkg-qty">{homeQty(t.qty)}</span>
                  <span className="pkg-price">${t.price.toFixed(2)}</span>
                  {save >= 1 && <span className="pkg-off">Save ${save}</span>}
                </button>
              );
            })}
          </div>
        )}

        {!aiMode && (
          <label className="pkg-url-wrap">
            <Link2 size={16} color="var(--uv-fg-3)" />
            <div style={{ flex: 1 }}>
              <input
                className="pkg-url-input"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="You'll paste this at checkout — no password needed."
              />
            </div>
            <span className="pkg-safe">
              <Lock size={11} /> Safe
            </span>
          </label>
        )}

        <div className="pkg-cta-row">
          <div style={{ minWidth: 0 }}>
            <div className="pkg-total-label" style={{ whiteSpace: "nowrap", marginBottom: 4 }}>
              {aiMode
                ? `${plan.name} plan · ${billing === "a" ? "annual" : "monthly"}`
                : pkg
                  ? `${homeQty(pkg.qty)} ${plat.label} ${activeService}`
                  : ""}
            </div>
            <div className="pkg-total">{aiMode ? `$${planPrice}/mo` : `$${total}`}</div>
            {aiMode
              ? billing === "a" && <div className="pkg-save-line">You save ${(plan.m - plan.a) * 12}/yr</div>
              : pkg && saveFor(pkg) >= 1 && <div className="pkg-save-line">You save ${saveFor(pkg)}</div>}
          </div>
          {aiMode ? (
            <button
              type="button"
              className="btn btn-primary btn-lg pkg-cta"
              onClick={() => openWaitlist("home-buybox")}
            >
              Be the first <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary btn-lg pkg-cta"
              onClick={handleAddToCart}
              disabled={!pkg}
            >
              Add to cart <ArrowRight size={16} />
            </button>
          )}
        </div>

        <div className="pkg-trust">
          {aiMode ? (
            <>
              <span>
                <Bot size={14} color="var(--uv-success-text)" /> 100% real, no bots
              </span>
              <span>
                <Sparkles size={14} color="var(--uv-pink)" /> 3-day free trial
              </span>
              <span>
                <XCircle size={14} color="var(--uv-fg-2)" /> Cancel anytime
              </span>
            </>
          ) : (
            <>
              <span>
                <ShieldCheck size={14} color="var(--uv-success-text)" /> 30-day refill
              </span>
              <span>
                <Zap size={14} color="var(--uv-pink)" /> Starts in 30 min
              </span>
              <span>
                <Lock size={14} color="var(--uv-fg-2)" /> No password
              </span>
            </>
          )}
        </div>

        {!aiMode && (
          <button type="button" className="pkg-ai-strip" onClick={() => openWaitlist("home-ai-strip")}>
            <Sparkles size={14} color="var(--uv-pink)" />
            <span className="pkg-ai-text">
              <strong>New — Thunderclap AI.</strong> Organic growth on autopilot.
            </span>
            <span className="pkg-ai-cta">
              Be the first <ArrowRight size={12} />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="soft-hero">
      <Spark size={24} color="var(--tart-lilac)" className="tart tart-wiggle tart-hide-sm" style={{ top: 92, left: "6%" }} />
      <Spark size={16} color="var(--uv-pink-hot)" className="tart tart-float-2 tart-hide-sm" style={{ bottom: 150, left: "10%" }} />

      <div className="container">
        <div className="soft-hero-grid">
          <div>
            <div className="soft-pill">
              <span className="bolt-mini">
                <Bolt size={16} color="#fff" outline="#caa12e" stroke={2.4} />
              </span>
              <span>
                <strong style={{ color: "var(--uv-fg-1)" }}>4.9</strong> · Loved by 200,000+ creators
              </span>
            </div>

            <h1 className="soft-h1">
              Grow any account, <br />
              <span className="grad-text">real engagement</span>,<br />
              <span className="wordwrap">
                in minutes
                <span className="underliner" />
              </span>
              .
            </h1>

            <p className="soft-sub">
              Real followers, likes &amp; views on TikTok, Instagram, YouTube, Twitter and more —
              delivered with a little thunder. 30-day refill guaranteed, no password ever.
            </p>

            <div className="soft-chips">
              <span className="soft-chip">
                <span className="dot" style={{ background: "var(--uv-success-text)" }} /> 30-day refill guarantee
              </span>
              <span className="soft-chip">
                <span className="dot" style={{ background: "var(--uv-violet)" }} /> Secure checkout
              </span>
              <span className="soft-chip">
                <span className="dot" style={{ background: "var(--uv-pink)" }} /> Starts in 30 min
              </span>
            </div>

            <div className="soft-stats">
              <div>
                <div className="soft-stat-n">200K+</div>
                <div className="soft-stat-l">Creators &amp; brands</div>
              </div>
              <div>
                <div className="soft-stat-n">800K</div>
                <div className="soft-stat-l">Orders delivered</div>
              </div>
              <div>
                <div className="soft-stat-n">12</div>
                <div className="soft-stat-l">Platforms</div>
              </div>
              <div>
                <div className="soft-stat-n">4.9★</div>
                <div className="soft-stat-l">992 reviews</div>
              </div>
            </div>
          </div>

          <div className="soft-buybox">
            <HomeBuyBox />
          </div>
        </div>
      </div>
    </section>
  );
}
