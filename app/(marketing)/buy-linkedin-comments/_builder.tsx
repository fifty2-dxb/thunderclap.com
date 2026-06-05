"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Lock,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Star,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import { formatQty } from "@/lib/utils";
import { useCart } from "@/components/cart-context";
import { LI_FAQS } from "./_faqs";

const SERVICE_TABS = [
  { id: "connections", label: "Connections", Icon: UserPlus,      href: "/buy-linkedin-connections" },
  { id: "followers",   label: "Followers",   Icon: Users,         href: "/buy-linkedin-followers" },
  { id: "likes",       label: "Likes",       Icon: Heart,         href: "/buy-linkedin-likes" },
  { id: "comments",    label: "Comments",    Icon: MessageSquare, href: "/buy-linkedin-comments" },
] as const;

const PACKAGES = [
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
] as const;

const SIDE_BENEFITS = [
  { title: "Real profiles", desc: "comments from real, active LinkedIn accounts" },
  { title: "Starts in 10 min", desc: "spaced naturally across the workday" },
  { title: "Money-back", desc: "refund if we miss the count or speed" },
  { title: "24/7 support", desc: "real humans, 7-min average reply time" },
];

export function LinkedInCommentsHero() {
  const [tab] = useState<(typeof SERVICE_TABS)[number]["id"]>("comments");
  const [selected, setSelected] = useState(0); // default to the first (smallest) tier
  const [premium, setPremium] = useState(false);

  const pkg = PACKAGES[selected];
  const total = (pkg.price * (premium ? 1.35 : 1)).toFixed(2);
  const youSave = ((pkg.regular - pkg.price) * (premium ? 1.35 : 1)).toFixed(2);
  const { addItem } = useCart();
  const onAddToCart = () =>
    addItem({
      platform: "linkedin",
      service: "comments",
      qty: pkg.qty,
      price: pkg.price,
      regular: pkg.regular,
      premium,
    });

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
          <a href="/buy-linkedin-followers" style={{ color: "var(--uv-fg-3)" }}>
            LinkedIn
          </a>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "var(--uv-fg-1)", fontWeight: 600 }}>Comments</span>
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
          Buy LinkedIn Comments <span style={{ color: "var(--uv-fg-3)", fontWeight: 500 }}>—</span>{" "}
          <span className="grad-text">that turn your post into a real conversation</span>
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
          Buy LinkedIn Comments from real, active profiles. Money-back guarantee, no password
          needed, posted naturally across the workday for a safe, organic look.
        </p>

        <div className="live-pill">
          <span className="live-dot" />
          <span>
            <strong>247 live users</strong> on this page right now
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
                    Senior-profile accounts · custom on-topic copy · lifetime refill
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
                <Link
                  key={t.id}
                  href={t.href}
                  role="tab"
                  aria-selected={tab === t.id}
                  className={`svc-tab ${tab === t.id ? "active" : ""}`}
                >
                  {t.label}
                </Link>
              ))}
            </div>

            <div className="pkg-card">
              <div className="pkg-head">
                <div className="pkg-h-title">Choose your package</div>
                <span className="pkg-save">Save up to 20%</span>
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
                    <span className="pkg-price-orig">${(p.regular * (premium ? 1.35 : 1)).toFixed(2)}</span>
                    <span className="pkg-price">${(p.price * (premium ? 1.35 : 1)).toFixed(2)}</span>
                  </button>
                ))}
              </div>

              <div className="pkg-cta-row">
                <div>
                  <div className="pkg-total-label">Total</div>
                  <div className="pkg-total">${total}</div>
                  {Number(youSave) > 0 && (
                    <div className="pkg-save-line">You save ${youSave}</div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onAddToCart}
                  className="btn btn-primary btn-lg pkg-cta"
                >
                  Add to cart <ArrowRight size={16} />
                </button>
              </div>

              <div className="pkg-trust">
                <span>
                  <ShieldCheck size={14} color="var(--uv-success-text)" /> Money-back
                </span>
                <span>
                  <Zap size={14} color="var(--uv-pink)" /> 10-min delivery
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
              <span className="side-li-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M20.45 20.45h-3.55v-5.56c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" fill="#fff"/>
                </svg>
              </span>
              <div>
                <div className="side-sum-title">
                  {formatQty(pkg.qty)} {tab[0].toUpperCase() + tab.slice(1)}
                </div>
                <div className="side-sum-sub">
                  LinkedIn · {premium ? "Premium" : "Standard"}
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
            <button
              type="button"
              onClick={onAddToCart}
              className="btn btn-primary btn-lg side-cta"
            >
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
                <strong>4.9</strong> · 12,743 reviews
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function LinkedInCommentsFaq() {
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
            About LinkedIn comments.
          </h2>
          <p style={{ color: "var(--uv-fg-3)", fontSize: 14, margin: 0 }}>
            Everything most people ask before placing their first order.
          </p>
        </div>
        <div className="faq-chips">
          {Array.from({ length: Math.ceil(LI_FAQS.length / 2) }).map((_, row) => {
            const lIdx = row * 2;
            const rIdx = row * 2 + 1;
            const l = LI_FAQS[lIdx];
            const r = LI_FAQS[rIdx];
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
