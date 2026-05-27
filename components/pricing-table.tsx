import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

// Mirrors the real Instagram Followers tiers in
// app/(marketing)/buy-instagram-followers/_builder.tsx — keep in sync.
const HREF = "/buy-instagram-followers";
const TIERS = [
  {
    qty: "500",
    price: 7.99,
    perks: ["Real, active accounts", "Starts in 30 min", "Delivered in 24 h", "30-day refill guarantee"],
  },
  {
    qty: "5,000",
    price: 39.99,
    featured: true,
    perks: [
      "Real, active accounts",
      "Starts in 30 min",
      "Delivered in 48 h",
      "30-day refill guarantee",
      "Priority support",
    ],
  },
  {
    qty: "10,000",
    price: 59.99,
    perks: [
      "Real, active accounts",
      "Drip delivery",
      "Delivered in 5 days",
      "30-day refill guarantee",
      "Account manager",
    ],
  },
];

export function PricingTable() {
  return (
    <section
      id="pricing"
      style={{ padding: "64px 0 64px", background: "var(--uv-bg-lavender)" }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 36,
          }}
        >
          <div>
            <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
              PRICING PREVIEW
            </span>
            <h2
              style={{
                fontFamily: "var(--uv-font-display)",
                fontSize: 36,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                margin: "8px 0 4px",
                maxWidth: 600,
                textWrap: "balance",
              }}
            >
              Instagram Followers — pick a tier and grow today.
            </h2>
            <p style={{ color: "var(--uv-fg-3)", fontSize: 15, margin: 0 }}>
              Same pricing pattern across every platform. No hidden fees.
            </p>
          </div>
          <Link
            className="btn btn-outline btn-md"
            style={{ borderRadius: 999 }}
            href={HREF}
          >
            See all packages <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="pricing-grid">
          {TIERS.map((t) => (
            <div key={t.qty} className={`tier ${t.featured ? "tier-featured" : ""}`}>
              {t.featured && <div className="tier-ribbon">MOST POPULAR</div>}
              <div className="tier-qty">
                {t.qty} <span>followers</span>
              </div>
              <div className="tier-price">
                <span className="tier-currency">$</span>
                <span className="tier-num">{t.price}</span>
              </div>
              <ul className="tier-perks">
                {t.perks.map((p) => (
                  <li key={p}>
                    <Check size={16} color="var(--uv-success-text)" /> {p}
                  </li>
                ))}
              </ul>
              <Link
                href={HREF}
                className={t.featured ? "btn btn-primary btn-md" : "btn btn-outline btn-md"}
                style={{ width: "100%", borderRadius: 10, marginTop: "auto" }}
              >
                Choose this package
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
