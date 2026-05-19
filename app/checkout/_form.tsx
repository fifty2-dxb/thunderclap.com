"use client";

import { useState } from "react";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

type Platform = "instagram" | "tiktok" | "youtube" | "facebook" | "twitter";
type Service =
  | "followers"
  | "likes"
  | "views"
  | "subscribers"
  | "comments"
  | "retweets";

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

export function CheckoutForm({
  platform,
  service,
  qty,
  basePrice,
  premium,
  label,
  placeholder,
  initialTarget,
  initialEmail,
}: {
  platform: Platform;
  service: Service;
  qty: number;
  basePrice: number;
  premium: boolean;
  label: string;
  placeholder: string;
  initialTarget?: string;
  initialEmail?: string;
}) {
  const [target, setTarget] = useState(initialTarget ?? "");
  const [email, setEmail] = useState(initialEmail ?? "");
  const [promo, setPromo] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          service,
          qty,
          price: basePrice,
          premium,
          target,
          email,
        }),
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

  return (
    <form onSubmit={onSubmit}>
      <div className="co-input-wrap">
        <span className={`co-input-icon platform-${platform}`} aria-hidden>
          <PlatformChipIcon platform={platform} />
        </span>
        <span className="co-input-label">{label}</span>
        <input
          className="co-input"
          type="text"
          inputMode="url"
          autoComplete="off"
          spellCheck={false}
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder={placeholder}
          aria-label={label}
          required
        />
      </div>
      <a href="#" className="co-help" onClick={(e) => e.preventDefault()}>
        Need help? See sample URLs
      </a>

      <div className="co-input-wrap" style={{ marginTop: 6 }}>
        <span className="co-input-icon" aria-hidden style={{ background: "var(--uv-pink-soft)", color: "var(--uv-pink)" }}>
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
        <span onClick={() => setPromo(!promo)}>Send me special promotions and discounts</span>
      </label>

      {error && (
        <div className="co-pay-err" role="alert">
          {error}
        </div>
      )}

      <button type="submit" className="co-cta" disabled={submitting}>
        {submitting ? "Opening gateway…" : "Continue to payment"}
        {!submitting && <ArrowRight size={16} />}
      </button>

      <div className="co-safe-note">
        <ShieldCheck size={14} />
        <span>No password required. Your account stays secure.</span>
      </div>
    </form>
  );
}
