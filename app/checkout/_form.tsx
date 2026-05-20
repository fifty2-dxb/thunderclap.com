"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Heart,
  MessageSquare,
  Play,
  Repeat2,
  ShieldCheck,
  ShoppingBag,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { useCart, type CartItem, type Platform, type Service } from "@/components/cart-context";
import { formatQty } from "@/lib/utils";
import {
  PLATFORM_LABEL,
  SERVICE_LABEL,
  inputConfigFor,
} from "./_config";

function PlatformChipIcon({ platform }: { platform: Platform }) {
  if (platform === "instagram") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="#fff" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
      </svg>
    );
  }
  if (platform === "tiktok") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M16.5 3.5c.4 1.6 1.5 3 3.4 3.3v2.4c-1.3 0-2.5-.3-3.6-1v6.4a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .8.1v2.5a3.2 3.2 0 1 0 2.4 3.1V3.5h2.7z"
          fill="#fff"
        />
      </svg>
    );
  }
  if (platform === "facebook") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M13.5 22v-8.4h2.8l.4-3.3h-3.2V8.2c0-.95.27-1.6 1.65-1.6h1.76V3.7c-.85-.1-1.7-.15-2.55-.15-2.52 0-4.25 1.55-4.25 4.4v2.45H7.27v3.3h2.86V22h3.37z"
          fill="#fff"
        />
      </svg>
    );
  }
  if (platform === "twitter") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zM17.083 19.77h1.833L7.084 4.126H5.117L17.083 19.77z"
          fill="#fff"
        />
      </svg>
    );
  }
  return (
    <svg width="18" height="12" viewBox="0 0 24 17" fill="none">
      <path
        d="M23.5 2.6c-.3-1-1-1.8-2-2C19.6 0 12 0 12 0S4.4 0 2.5.6c-1 .3-1.8 1-2 2C0 4.6 0 8.5 0 8.5s0 3.9.5 5.9c.3 1 1 1.8 2 2C4.4 17 12 17 12 17s7.6 0 9.5-.6c1-.3 1.8-1 2-2 .5-2 .5-5.9.5-5.9s0-3.9-.5-5.9z"
        fill="#fff"
      />
      <path d="M9.5 12V5l6.5 3.5L9.5 12z" fill="#ff0000" />
    </svg>
  );
}

const SERVICE_ICON: Record<Service, typeof UserPlus> = {
  followers: UserPlus,
  subscribers: UserPlus,
  likes: Heart,
  views: Play,
  comments: MessageSquare,
  retweets: Repeat2,
};

function lineSubtotal(item: CartItem): number {
  return Math.round(item.price * (item.premium ? 1.35 : 1) * 100) / 100;
}

export function CheckoutFlow({ initialEmail }: { initialEmail?: string }) {
  const { items, hydrated, subtotal, updateTarget, openDrawer } = useCart();
  const [email, setEmail] = useState(initialEmail ?? "");
  const [promo, setPromo] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Skeleton state while the cart hydrates from localStorage.
  if (!hydrated) {
    return (
      <div className="co-grid">
        <section className="co-card">
          <div
            aria-hidden
            style={{
              height: 28,
              width: 200,
              background: "var(--uv-bg-lavender)",
              borderRadius: 8,
              marginBottom: 16,
            }}
          />
          <div
            aria-hidden
            style={{
              height: 56,
              background: "var(--uv-bg-lavender)",
              borderRadius: 12,
              marginBottom: 12,
            }}
          />
          <div
            aria-hidden
            style={{
              height: 56,
              background: "var(--uv-bg-lavender)",
              borderRadius: 12,
            }}
          />
        </section>
        <aside>
          <div
            aria-hidden
            className="co-summary"
            style={{ minHeight: 180, background: "var(--uv-bg-lavender)" }}
          />
        </aside>
      </div>
    );
  }

  // Empty-cart state.
  if (items.length === 0) {
    return (
      <section
        className="co-card"
        style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}
      >
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "var(--uv-pink-soft)",
            color: "var(--uv-pink)",
            margin: "0 auto 16px",
          }}
        >
          <ShoppingBag size={28} />
        </span>
        <h2 style={{ marginBottom: 8 }}>Your cart is empty</h2>
        <p style={{ color: "var(--uv-fg-2)", marginBottom: 20 }}>
          Add a service before checking out.
        </p>
        <Link href="/" className="btn btn-primary btn-lg">
          Browse services
        </Link>
      </section>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    for (const it of items) {
      if (!it.target || !it.target.trim()) {
        const platform = PLATFORM_LABEL[it.platform];
        const service = SERVICE_LABEL[it.service].toLowerCase();
        setError(`Add a link for the ${platform} ${service} order before continuing.`);
        return;
      }
    }
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        items: items.map((it) => ({
          platform: it.platform,
          service: it.service,
          qty: it.qty,
          price: it.price,
          premium: it.premium,
          target: (it.target ?? "").trim(),
        })),
        email: email.trim(),
      };
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => null)) as
        | { redirectUrl?: string; error?: string }
        | null;

      if (!res.ok || !json?.redirectUrl) {
        setSubmitting(false);
        setError(
          json?.error ||
            "We couldn't start the payment session. Please try again in a moment.",
        );
        return;
      }
      window.location.href = json.redirectUrl;
    } catch (err) {
      setSubmitting(false);
      setError(
        err instanceof Error
          ? err.message
          : "Network error while contacting the gateway.",
      );
    }
  };

  const total = subtotal;

  return (
    <div className="co-grid">
      <section className="co-card">
        <h1>Get started</h1>
        <div className="live-pill">
          <span className="live-dot" />
          <span>
            <strong>498 live users</strong> on checkout
          </span>
        </div>

        <form onSubmit={onSubmit}>
          <div className="co-services">
            {items.map((item, idx) => {
              const cfg = inputConfigFor(item.platform, item.service);
              const Icon = SERVICE_ICON[item.service];
              return (
                <div className="co-service-card" key={item.id}>
                  <div className="co-service-head">
                    <span
                      className={`co-input-icon platform-${item.platform}`}
                      aria-hidden
                    >
                      <PlatformChipIcon platform={item.platform} />
                    </span>
                    <div className="co-service-meta">
                      <div className="co-service-title">
                        {PLATFORM_LABEL[item.platform]} {SERVICE_LABEL[item.service]}
                      </div>
                      <div className="co-service-sub">
                        <Icon size={12} aria-hidden /> {formatQty(item.qty)}
                        {item.premium && <span className="co-service-premium">Premium</span>}
                      </div>
                    </div>
                    {items.length > 1 && (
                      <span className="co-service-step" aria-hidden>
                        {idx + 1}/{items.length}
                      </span>
                    )}
                  </div>
                  <label className="co-service-label" htmlFor={`tg-${item.id}`}>
                    {cfg.label}
                  </label>
                  <input
                    id={`tg-${item.id}`}
                    className="co-input co-service-input"
                    type="text"
                    inputMode="url"
                    autoComplete="off"
                    spellCheck={false}
                    value={item.target ?? ""}
                    onChange={(e) => updateTarget(item.id, e.target.value)}
                    placeholder={cfg.placeholder}
                    aria-label={`${PLATFORM_LABEL[item.platform]} ${SERVICE_LABEL[item.service]}: ${cfg.label}`}
                    required
                  />
                </div>
              );
            })}
          </div>

          <div className="co-input-wrap" style={{ marginTop: 6 }}>
            <span
              className="co-input-icon"
              aria-hidden
              style={{
                background: "var(--uv-pink-soft)",
                color: "var(--uv-pink)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 7l9 6 9-6M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7M3 7l2-2h14l2 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="co-input-label">Email address</span>
            <input
              className="co-input"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              required
            />
          </div>

          <label className="co-promo-row">
            <button
              type="button"
              role="checkbox"
              aria-checked={promo}
              onClick={() => setPromo(!promo)}
              className={`co-check${promo ? " on" : ""}`}
              aria-label="Send me special promotions and discounts"
            >
              {promo && <Check size={13} strokeWidth={3} />}
            </button>
            <span onClick={() => setPromo(!promo)}>
              Send me special promotions and discounts
            </span>
          </label>

          {error && (
            <div className="co-pay-err" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="co-cta" disabled={submitting}>
            {submitting
              ? "Opening gateway…"
              : `Continue to payment · $${total.toFixed(2)}`}
            {!submitting && <ArrowRight size={16} />}
          </button>

          <div className="co-safe-note">
            <ShieldCheck size={14} />
            <span>No password required. Your account stays secure.</span>
          </div>
        </form>

        <div className="co-trust-row">
          <span className="co-trust-stars" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i}>★</span>
            ))}
          </span>
          <span>
            <strong style={{ color: "var(--uv-fg-1)" }}>4.7</strong> · 12,743
            reviews on Trustpilot
          </span>
        </div>
      </section>

      <aside>
        <div className="co-summary">
          <div className="co-sum-head">
            <ShoppingBag size={16} aria-hidden />
            <span>
              {items.length === 1 ? "Your order" : `Your order · ${items.length} items`}
            </span>
          </div>

          {items.map((item) => {
            const Icon = SERVICE_ICON[item.service];
            const value = lineSubtotal(item);
            return (
              <div className="co-sum-line" key={item.id}>
                <span className="co-sum-qty">
                  <Icon size={16} />
                  {formatQty(item.qty)} {PLATFORM_LABEL[item.platform]}{" "}
                  {SERVICE_LABEL[item.service]}
                  {item.premium && <span className="co-sum-premium">Premium</span>}
                </span>
                <span style={{ color: "var(--uv-fg-1)", fontWeight: 600 }}>
                  ${value.toFixed(2)}
                </span>
              </div>
            );
          })}

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

        <button
          type="button"
          onClick={openDrawer}
          className="co-bundle"
          aria-label="Review or add more items in your cart"
        >
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
            <div className="co-bundle-title">Need to change your order?</div>
            <div className="co-bundle-sub">Review or add more items in your cart</div>
          </div>
          <span className="co-bundle-plus" aria-hidden>
            <ArrowRight size={18} />
          </span>
        </button>

        <blockquote className="co-quote">
          &ldquo;When you want to accomplish your social media goals, Thunderclap is
          the place to turn.&rdquo;
          <cite>
            DENVER 7<span className="co-quote-stars">★★★★★</span>
          </cite>
        </blockquote>
      </aside>
    </div>
  );
}
