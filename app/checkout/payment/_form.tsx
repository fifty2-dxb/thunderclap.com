"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Lock, ShieldCheck, Wallet } from "lucide-react";

type Platform = "instagram" | "tiktok" | "youtube";
type Service = "followers" | "likes" | "views" | "subscribers" | "comments";
type Method = "card" | "apple" | "google" | "crypto";

function formatCardNumber(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 19);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}
function formatCvc(raw: string) {
  return raw.replace(/\D/g, "").slice(0, 4);
}

function brandFromNumber(num: string): "VISA" | "MC" | "AMEX" | null {
  const d = num.replace(/\s/g, "");
  if (/^4/.test(d)) return "VISA";
  if (/^(5[1-5]|2[2-7])/.test(d)) return "MC";
  if (/^3[47]/.test(d)) return "AMEX";
  return null;
}

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
  const router = useRouter();
  const [method, setMethod] = useState<Method>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [zip, setZip] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const brand = brandFromNumber(cardNumber);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const params = new URLSearchParams({
      platform,
      service,
      qty: String(qty),
      price: String(basePrice),
      premium: premium ? "1" : "0",
      total: total.toFixed(2),
    });
    if (target) params.set("target", target);
    if (email) params.set("email", email);
    setTimeout(() => {
      router.push(`/checkout/success?${params.toString()}`);
    }, 1400);
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="co-methods" role="tablist" aria-label="Payment method">
        <button
          type="button"
          role="tab"
          aria-selected={method === "card"}
          className={`co-method ${method === "card" ? "active" : ""}`}
          onClick={() => setMethod("card")}
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

      {method === "card" ? (
        <div className="co-pay-fields">
          <div className="co-pay-wrap">
            <span className="co-pay-label">Card number</span>
            <input
              className="co-pay-input"
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              aria-label="Card number"
              required
            />
            <span className="co-pay-input-icons" aria-hidden>
              {brand === "VISA" && (
                <span className="co-pay-brand" style={{ background: "#1a1f71" }}>
                  VISA
                </span>
              )}
              {brand === "MC" && (
                <span className="co-pay-brand" style={{ background: "#eb001b" }}>
                  MC
                </span>
              )}
              {brand === "AMEX" && (
                <span className="co-pay-brand" style={{ background: "#2e77bb" }}>
                  AMEX
                </span>
              )}
              {!brand && <CreditCard size={18} color="var(--uv-fg-4)" />}
            </span>
          </div>

          <div className="co-pay-row">
            <div className="co-pay-wrap">
              <span className="co-pay-label">Expiry</span>
              <input
                className="co-pay-input"
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                placeholder="MM/YY"
                aria-label="Card expiry date"
                required
              />
            </div>
            <div className="co-pay-wrap">
              <span className="co-pay-label">CVC</span>
              <input
                className="co-pay-input"
                type="text"
                inputMode="numeric"
                autoComplete="cc-csc"
                value={cvc}
                onChange={(e) => setCvc(formatCvc(e.target.value))}
                placeholder="123"
                aria-label="Card security code"
                required
              />
              <span className="co-pay-input-icons" aria-hidden>
                <Lock size={15} color="var(--uv-fg-4)" />
              </span>
            </div>
          </div>

          <div className="co-pay-row">
            <div className="co-pay-wrap">
              <span className="co-pay-label">Name on card</span>
              <input
                className="co-pay-input"
                type="text"
                autoComplete="cc-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                aria-label="Name on card"
                style={{ fontFamily: "var(--uv-font-body)", letterSpacing: 0 }}
                required
              />
            </div>
            <div className="co-pay-wrap">
              <span className="co-pay-label">ZIP / Postal</span>
              <input
                className="co-pay-input"
                type="text"
                autoComplete="postal-code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="10001"
                aria-label="Billing ZIP or postal code"
                required
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="co-wallet-pad" role="status">
          <strong>
            {method === "apple"
              ? "Apple Pay"
              : method === "google"
              ? "Google Pay"
              : "Pay with crypto"}
          </strong>
          {method === "crypto"
            ? "Continue to generate a one-time deposit address. Supports BTC, ETH, USDC, and USDT."
            : "Continue to confirm the payment in your wallet."}
        </div>
      )}

      <button type="submit" className="co-cta" disabled={submitting}>
        {submitting ? "Processing…" : `Pay $${total.toFixed(2)}`}
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
