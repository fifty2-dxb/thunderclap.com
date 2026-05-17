"use client";

import { useState } from "react";
import {
  ArrowRight,
  Heart,
  Link2,
  Lock,
  MessageSquare,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { formatQty } from "@/lib/utils";
import { IG_FAQS } from "./_faqs";

const SERVICE_TABS = [
  { id: "views", label: "Views", Icon: Play },
  { id: "followers", label: "Followers", Icon: Users },
  { id: "likes", label: "Likes", Icon: Heart },
  { id: "comments", label: "Comments", Icon: MessageSquare },
] as const;

const PACKAGES = [
  { qty: 500, price: 0.99, save: 0 },
  { qty: 1000, price: 1.49, save: 0 },
  { qty: 2500, price: 2.99, save: 0 },
  { qty: 5000, price: 4.99, save: 0 },
  { qty: 10000, price: 8.99, save: 25, popular: true },
  { qty: 25000, price: 19.99, save: 28 },
  { qty: 50000, price: 34.99, save: 35 },
  { qty: 100000, price: 59.99, save: 38 },
  { qty: 250000, price: 129.99, save: 42 },
  { qty: 500000, price: 239.99, save: 45 },
  { qty: 1000000, price: 399.99, save: 48 },
  { qty: 2500000, price: 899.99, save: 50 },
  { qty: 5000000, price: 1599.99, save: 50 },
  { qty: 10000000, price: 2799.99, save: 50 },
] as const;

const SIDE_BENEFITS = [
  { title: "Real watch time", desc: "views from real Instagram users, not bots" },
  { title: "Starts in 5 min", desc: "drip-fed over 1-4 hours for an organic curve" },
  { title: "Money-back", desc: "refund if we miss the count or speed" },
  { title: "24/7 support", desc: "real humans, 7-min average reply time" },
];

export function ViewsHero() {
  const [tab, setTab] = useState<(typeof SERVICE_TABS)[number]["id"]>("views");
  const [selected, setSelected] = useState(4); // 10K
  const [premium, setPremium] = useState(false);
  const [url, setUrl] = useState("");

  const pkg = PACKAGES[selected];
  const total = (pkg.price * (premium ? 1.35 : 1)).toFixed(2);
  const youSave = pkg.save > 0 ? ((pkg.price * pkg.save) / 100).toFixed(2) : "0";

  return (
    <section style={{ background: "var(--uv-bg-lavender)", paddingTop: 40, paddingBottom: 96 }}>
      <div className="container">
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            color: "var(--uv-fg-3)",
            marginBottom: 24,
          }}
        >
          <a href="/" style={{ color: "var(--uv-fg-3)" }}>
            Home
          </a>
          <span style={{ opacity: 0.4 }}>›</span>
          <a href="/instagram/followers" style={{ color: "var(--uv-fg-3)" }}>
            Instagram
          </a>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--uv-fg-1)", fontWeight: 600 }}>Views</span>
        </nav>

        <h1
          style={{
            fontFamily: "var(--uv-font-display)",
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-0.035em",
            lineHeight: 1.02,
            margin: "0 0 18px",
            textWrap: "balance",
          }}
        >
          Views <span style={{ color: "var(--uv-fg-3)", fontWeight: 500 }}>—</span>{" "}
          <span className="grad-text">that push your Reel further</span>
        </h1>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.55,
            color: "var(--uv-fg-2)",
            margin: "0 0 22px",
            maxWidth: 620,
            textWrap: "pretty",
          }}
        >
          Buy Instagram Views for Reels, feed video, and IGTV. Real watch sessions, drip-fed for a
          natural curve, no password needed.
        </p>

        <div className="live-pill">
          <span className="live-dot" />
          <span>
            <strong>612 live users</strong> on this page right now
          </span>
        </div>

        <div className="svc-layout">
          <div className="svc-builder">
            <div className={`prem-row ${premium ? "on" : ""}`}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span className="prem-icon">
                  <Sparkles size={18} />
                </span>
                <div>
                  <div className="prem-title">
                    Premium quality
                    <span className="prem-tag">+35%</span>
                  </div>
                  <div className="prem-sub">
                    Longer watch time · faster delivery · lifetime refill
                  </div>
                </div>
              </div>
              <button
                type="button"
                className={`prem-switch ${premium ? "on" : ""}`}
                onClick={() => setPremium(!premium)}
                aria-pressed={premium}
                aria-label="Toggle premium quality"
              >
                <span className="prem-knob" />
              </button>
            </div>

            <div className="svc-tabs" role="tablist" aria-label="Service type">
              {SERVICE_TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.id}
                  className={`svc-tab ${tab === t.id ? "active" : ""}`}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="pkg-card">
              <div className="pkg-head">
                <div className="pkg-h-title">Choose your package</div>
                <span className="pkg-save">Save up to 50%</span>
              </div>
              <div className="pkg-grid">
                {PACKAGES.map((p, i) => (
                  <button
                    key={p.qty}
                    type="button"
                    className={`pkg-tier ${selected === i ? "selected" : ""}`}
                    onClick={() => setSelected(i)}
                    aria-pressed={selected === i}
                  >
                    {"popular" in p && p.popular && (
                      <span className="pkg-tier-tag">
                        <Star size={9} fill="currentColor" /> POPULAR
                      </span>
                    )}
                    <span className="pkg-qty">{formatQty(p.qty)}</span>
                    <span className="pkg-qty-sub">{tab.toUpperCase()}</span>
                    <span className="pkg-price">${(p.price * (premium ? 1.35 : 1)).toFixed(2)}</span>
                  </button>
                ))}
              </div>

              <label className="pkg-url-wrap">
                <Link2 size={16} color="var(--uv-fg-3)" />
                <div style={{ flex: 1 }}>
                  <div className="pkg-url-label">REEL OR VIDEO LINK</div>
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

              <div className="pkg-cta-row">
                <div>
                  <div className="pkg-total-label">Total</div>
                  <div className="pkg-total">${total}</div>
                  {Number(youSave) > 0 && (
                    <div className="pkg-save-line">You save ${youSave}</div>
                  )}
                </div>
                <button type="button" className="btn btn-primary btn-lg pkg-cta">
                  Add to cart <ArrowRight size={16} />
                </button>
              </div>

              <div className="pkg-trust">
                <span>
                  <ShieldCheck size={14} color="var(--uv-success-text)" /> Money-back
                </span>
                <span>
                  <Zap size={14} color="var(--uv-pink)" /> 5-min delivery
                </span>
                <span>
                  <Lock size={14} color="var(--uv-fg-2)" /> No password
                </span>
              </div>
            </div>
          </div>

          <aside className="svc-side">
            <div className="side-label">YOUR ORDER</div>
            <div className="side-summary">
              <span className="side-ig-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="#fff" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
                </svg>
              </span>
              <div>
                <div className="side-sum-title">
                  {formatQty(pkg.qty)} {tab[0].toUpperCase() + tab.slice(1)}
                </div>
                <div className="side-sum-sub">
                  Instagram · {premium ? "Premium" : "Standard"}
                </div>
              </div>
              <div className="side-sum-price">${total}</div>
            </div>
            <ul className="side-benefits">
              {SIDE_BENEFITS.map((b) => (
                <li key={b.title}>
                  <span className="side-check">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M1.5 5l2.2 2.2L8.5 2.4"
                        stroke="#fff"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>
                    <strong>{b.title}</strong> · {b.desc}
                  </span>
                </li>
              ))}
            </ul>
            <button type="button" className="btn btn-primary btn-lg side-cta">
              Add to cart · ${total}
            </button>
            <div className="side-trust">
              <span style={{ display: "inline-flex", gap: 1 }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: 13,
                      height: 13,
                      background: "#00b67a",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 9,
                      lineHeight: 1,
                      borderRadius: 1,
                    }}
                  >
                    ★
                  </span>
                ))}
              </span>
              <span>
                <strong>4.7</strong> · 12,743 reviews
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function ViewsFaq() {
  const [active, setActive] = useState<number>(0);

  return (
    <section style={{ padding: "32px 0 80px" }}>
      <div className="container-narrow">
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
            FAQ
          </span>
          <h2
            style={{
              fontFamily: "var(--uv-font-display)",
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              margin: "10px 0 8px",
            }}
          >
            About Instagram views.
          </h2>
          <p style={{ color: "var(--uv-fg-3)", fontSize: 14, margin: 0 }}>
            Everything most people ask before placing their first order.
          </p>
        </div>
        <div className="faq-chips">
          {Array.from({ length: Math.ceil(IG_FAQS.length / 2) }).map((_, row) => {
            const lIdx = row * 2;
            const rIdx = row * 2 + 1;
            const l = IG_FAQS[lIdx];
            const r = IG_FAQS[rIdx];
            const open = active === lIdx ? l : active === rIdx ? r : null;
            return (
              <Row
                key={row}
                l={l}
                r={r}
                lIdx={lIdx}
                rIdx={rIdx}
                active={active}
                setActive={setActive}
                open={open}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Row({
  l,
  r,
  lIdx,
  rIdx,
  active,
  setActive,
  open,
}: {
  l: { q: string; a: string };
  r: { q: string; a: string } | undefined;
  lIdx: number;
  rIdx: number;
  active: number;
  setActive: (n: number) => void;
  open: { q: string; a: string } | null;
}) {
  return (
    <>
      <button
        type="button"
        className={`faq-chip ${active === lIdx ? "active" : ""}`}
        onClick={() => setActive(active === lIdx ? -1 : lIdx)}
        aria-expanded={active === lIdx}
      >
        <span>{l.q}</span>
        <span
          style={{
            opacity: 0.6,
            fontSize: 18,
            marginLeft: 12,
            transform: active === lIdx ? "rotate(90deg)" : "none",
            transition: "transform 200ms",
          }}
        >
          ›
        </span>
      </button>
      {r && (
        <button
          type="button"
          className={`faq-chip ${active === rIdx ? "active" : ""}`}
          onClick={() => setActive(active === rIdx ? -1 : rIdx)}
          aria-expanded={active === rIdx}
        >
          <span>{r.q}</span>
          <span
            style={{
              opacity: 0.6,
              fontSize: 18,
              marginLeft: 12,
              transform: active === rIdx ? "rotate(90deg)" : "none",
              transition: "transform 200ms",
            }}
          >
            ›
          </span>
        </button>
      )}
      {open && <div className="faq-chip-panel">{open.a}</div>}
    </>
  );
}
