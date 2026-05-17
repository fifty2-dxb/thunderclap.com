"use client";

import { useState } from "react";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

type Platform = "instagram" | "tiktok" | "youtube";

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
  label,
  placeholder,
}: {
  platform: Platform;
  label: string;
  placeholder: string;
}) {
  const [target, setTarget] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 1200);
  };

  return (
    <form onSubmit={onSubmit} noValidate>
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

      <button type="submit" className="co-cta" disabled={submitting}>
        {submitting ? "Loading…" : "Continue to payment"}
        {!submitting && <ArrowRight size={16} />}
      </button>

      <div className="co-safe-note">
        <ShieldCheck size={14} />
        <span>No password required. Your account stays secure.</span>
      </div>
    </form>
  );
}
