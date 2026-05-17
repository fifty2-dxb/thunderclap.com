"use client";

import { useState } from "react";
import { ArrowRight, CreditCard, ShieldCheck, Wallet } from "lucide-react";

type Platform = "instagram" | "tiktok" | "youtube" | "facebook" | "twitter";
type Service =
  | "followers"
  | "likes"
  | "views"
  | "subscribers"
  | "comments"
  | "retweets";
type Method = "card" | "apple" | "google" | "crypto";

const METHOD_COPY: Record<
  Method,
  { eyebrow: string; title: string; body: string }
> = {
  card: {
    eyebrow: "Card payment",
    title: "Visa, Mastercard, Amex & Discover",
    body: "You'll complete the payment on our secure gateway page — no card details are entered on this site.",
  },
  apple: {
    eyebrow: "Apple Pay",
    title: "Apple Pay through the gateway",
    body: "Confirm with Face ID or Touch ID once the gateway page opens. Available on Apple devices with Apple Pay set up.",
  },
  google: {
    eyebrow: "Google Pay",
    title: "Google Pay through the gateway",
    body: "Confirm with your Google account once the gateway page opens. Available where Google Pay is supported.",
  },
  crypto: {
    eyebrow: "Crypto",
    title: "Pay with crypto",
    body: "The gateway will generate a one-time deposit address. Supports BTC, ETH, USDC and USDT.",
  },
};

export function PaymentForm({
  platform,
  service,
  qty,
  basePrice,
  premium,
  total,
  target,
  email,
}: {
  platform: Platform;
  service: Service;
  qty: number;
  basePrice: number;
  premium: boolean;
  total: number;
  target: string;
  email: string;
}) {
  const [method, setMethod] = useState<Method>("card");
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
          method,
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

  const copy = METHOD_COPY[method];

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="co-methods" role="tablist" aria-label="Payment method">
        <button
          type="button"
          role="tab"
          aria-selected={method === "card"}
          className={`co-method ${method === "card" ? "active" : ""}`}
          onClick={() => setMethod("card")}
          disabled={submitting}
        >
          <CreditCard size={16} />
          Card
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={method === "apple"}
          className={`co-method ${method === "apple" ? "active" : ""}`}
          onClick={() => setMethod("apple")}
          disabled={submitting}
        >
          <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden>
            <path d="M11.4 8.5c0-1.7 1.4-2.5 1.5-2.6-.8-1.2-2.1-1.3-2.5-1.4-1.1-.1-2.1.6-2.6.6-.6 0-1.4-.6-2.3-.6-1.2 0-2.3.7-2.9 1.8-1.2 2.1-.3 5.3.9 7 .6.9 1.3 1.8 2.2 1.8.9 0 1.2-.6 2.3-.6 1.1 0 1.4.6 2.3.6 1 0 1.6-.9 2.2-1.8.7-1 1-2 1-2.1-.1 0-1.9-.8-1.9-2.7zM9.6 3.3c.5-.6.8-1.4.7-2.2-.7 0-1.5.4-2 1-.4.5-.8 1.3-.7 2.1.7.1 1.5-.4 2-.9z" />
          </svg>
          Apple Pay
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={method === "google"}
          className={`co-method ${method === "google" ? "active" : ""}`}
          onClick={() => setMethod("google")}
          disabled={submitting}
        >
          <Wallet size={16} />
          Google Pay
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={method === "crypto"}
          className={`co-method ${method === "crypto" ? "active" : ""}`}
          onClick={() => setMethod("crypto")}
          disabled={submitting}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path
              d="M9 7v10M9 9h4.5a2 2 0 0 1 0 4H9M9 13h5a2 2 0 0 1 0 4H9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Crypto
        </button>
      </div>

      <div className="co-gateway-pad" role="status" aria-live="polite">
        <span className="co-gateway-eyebrow">{copy.eyebrow}</span>
        <strong>{copy.title}</strong>
        <p>{copy.body}</p>
      </div>

      {error && (
        <div className="co-pay-err" role="alert">
          {error}
        </div>
      )}

      <button type="submit" className="co-cta" disabled={submitting}>
        {submitting ? "Opening gateway…" : `Continue to payment · $${total.toFixed(2)}`}
        {!submitting && <ArrowRight size={16} />}
      </button>

      <div className="co-pay-meta">
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <ShieldCheck size={14} />
          256-bit SSL · PCI DSS Level 1
        </span>
        <span>Charged as STROCIL LLC</span>
      </div>
    </form>
  );
}
