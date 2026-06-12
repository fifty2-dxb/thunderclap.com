"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
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

const HOME_PACKAGES = [
  { qty: 250, base: 2.99 },
  { qty: 500, base: 4.99 },
  { qty: 1000, base: 8.99 },
  { qty: 2500, base: 19.99, popular: true },
  { qty: 5000, base: 34.99 },
  { qty: 10000, base: 69.99 },
  { qty: 25000, base: 149.99 },
  { qty: 50000, base: 269.99 },
];

const SERVICE_MULT: Record<string, number> = {
  Followers: 1,
  Subscribers: 1.4,
  Likes: 0.55,
  Views: 0.32,
  Retweets: 0.7,
  Comments: 1.6,
};

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

  const aiMode = platId === "ai";
  const plat = HOME_PLATFORMS.find((p) => p.id === platId) ?? HOME_PLATFORMS[0];
  const mult = SERVICE_MULT[service] ?? 1;
  const priced = HOME_PACKAGES.map((p) => ({ ...p, price: p.base * mult }));
  const unit0 = priced[0].price / priced[0].qty;
  const offFor = (p: { qty: number; price: number }) => Math.round(p.qty * unit0 - p.price);
  const pkg = priced[selected];
  const total = pkg.price.toFixed(2);
  const lastIdx = priced.length - 1;
  const plan = HOME_AI_PLANS[aiPlan];
  const planPrice = billing === "a" ? plan.a : plan.m;

  useEffect(() => {
    if (!aiMode && !plat.services.includes(service)) setService(plat.services[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platId]);

  const ctaHref = aiMode ? "/" : `/buy-${platId}-${service.toLowerCase()}/`;

  return (
    <div className="buybox-frame">
      <div className="pkg-card">
        <div className="pkg-head">
          <div className="pkg-h-title">Build your order</div>
          <span className="pkg-save">Save up to 50%</span>
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
            {priced.map((p, i) => {
              const off = offFor(p);
              const isBulk = i === lastIdx && !p.popular;
              return (
                <button
                  key={p.qty}
                  type="button"
                  className={`pkg-tier ${selected === i ? "selected" : ""} ${p.popular ? "best" : ""} ${isBulk ? "bulk" : ""}`}
                  onClick={() => setSelected(i)}
                >
                  {p.popular && (
                    <span className="pkg-tier-tag best">
                      <TrendingUp size={9} /> BEST SELLING
                    </span>
                  )}
                  {isBulk && (
                    <span className="pkg-tier-tag bulk">
                      <Flame size={9} /> BULK PRICE
                    </span>
                  )}
                  <span className="pkg-qty">{homeQty(p.qty)}</span>
                  <span className="pkg-price">${p.price.toFixed(2)}</span>
                  {off >= 1 && <span className="pkg-off">Save ${off}</span>}
                </button>
              );
            })}
          </div>
        )}

        {!aiMode && (
          <label className="pkg-url-wrap">
            <Link2 size={16} color="var(--uv-fg-3)" />
            <div style={{ flex: 1 }}>
              <div className="pkg-url-label">USERNAME OR POST LINK</div>
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
              {aiMode ? `${plan.name} plan · ${billing === "a" ? "annual" : "monthly"}` : `${homeQty(pkg.qty)} ${plat.label} ${service}`}
            </div>
            <div className="pkg-total">{aiMode ? `$${planPrice}/mo` : `$${total}`}</div>
            {aiMode
              ? billing === "a" && <div className="pkg-save-line">You save ${(plan.m - plan.a) * 12}/yr</div>
              : offFor(pkg) >= 1 && <div className="pkg-save-line">You save ${offFor(pkg)}</div>}
          </div>
          <Link className="btn btn-primary btn-lg pkg-cta" href={ctaHref}>
            {aiMode ? "Start free trial" : "Get Started"} <ArrowRight size={16} />
          </Link>
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
                <ShieldCheck size={14} color="var(--uv-success-text)" /> Money-back
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
          <Link className="pkg-ai-strip" href="/">
            <Sparkles size={14} color="var(--uv-pink)" />
            <span className="pkg-ai-text">
              <strong>New — Thunderclap AI.</strong> Organic growth on autopilot.
            </span>
            <span className="pkg-ai-cta">
              Try free <ArrowRight size={12} />
            </span>
          </Link>
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
              delivered with a little thunder. Money-back guaranteed, no password ever.
            </p>

            <div className="soft-chips">
              <span className="soft-chip">
                <span className="dot" style={{ background: "var(--uv-success-text)" }} /> Money-back guarantee
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
