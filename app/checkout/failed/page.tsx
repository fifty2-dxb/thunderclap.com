import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment not completed · Thunderclap",
  robots: { index: false, follow: false },
};

const REASON_COPY: Record<string, { title: string; body: string }> = {
  failed: {
    title: "Payment was declined",
    body: "The gateway declined the transaction. This is usually a card issuer rule — try a different card or payment method.",
  },
  cancelled: {
    title: "Payment cancelled",
    body: "You cancelled the payment before it completed. You can try again any time — your order details are still saved.",
  },
  canceled: {
    title: "Payment cancelled",
    body: "You cancelled the payment before it completed. You can try again any time — your order details are still saved.",
  },
  expired: {
    title: "Checkout session expired",
    body: "The checkout window timed out before payment could be confirmed. Start a fresh session to continue.",
  },
  timeout: {
    title: "Couldn't confirm payment in time",
    body: "We didn't get a confirmation from the gateway within the polling window. If your card was charged, the webhook will reconcile within a few minutes — check your email.",
  },
  missing_session: {
    title: "Missing payment session",
    body: "We didn't receive a session reference from the gateway. Start a new checkout to try again.",
  },
  error: {
    title: "Payment error",
    body: "Something went wrong during the payment. No charge was placed — please try again or pick a different method.",
  },
};

function pickStr(v: string | string[] | undefined, fallback: string): string {
  if (Array.isArray(v)) return v[0] ?? fallback;
  return v ?? fallback;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;

  const platform = pickStr(sp.platform, "instagram");
  const service = pickStr(sp.service, "followers");
  const qty = pickStr(sp.qty, "");
  const price = pickStr(sp.price, "");
  const premium = pickStr(sp.premium, "0");
  const target = pickStr(sp.target, "");
  const email = pickStr(sp.email, "");
  const orderId = pickStr(sp.order_id, "");
  const sessionId = pickStr(sp.payment_id, "");
  const reason = pickStr(sp.reason, "failed").toLowerCase();
  const copy = REASON_COPY[reason] ?? REASON_COPY.failed;

  // Hand the user back to Step 2 with their context intact so they can
  // re-submit without re-typing.
  const retryParams = new URLSearchParams({
    platform,
    service,
    qty,
    price,
    premium,
    target,
    email,
  });

  return (
    <main className="co-shell">
      <div className="co-top">
        <div className="container" style={{ position: "relative" }}>
          <div className="co-top-inner">
            <span aria-hidden style={{ width: 36, height: 36 }} />
            <Link href="/" className="co-logo" aria-label="Thunderclap home">
              <Image
                src="/logo.webp"
                alt="Thunderclap"
                width={120}
                height={24}
                style={{ height: 22, width: "auto", maxWidth: "none" }}
                priority
              />
            </Link>
            <div className="co-secure">
              <ShieldCheck size={16} />
              <span>No charge applied</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <section className="co-success co-failed">
          <span className="co-failed-ring" aria-hidden>
            <AlertTriangle size={32} strokeWidth={2.4} />
          </span>
          <h1>{copy.title}</h1>
          <p>{copy.body}</p>

          {(orderId || sessionId) && (
            <dl className="co-success-meta">
              {orderId && (
                <div>
                  <dt>Order ID</dt>
                  <dd style={{ fontFamily: "var(--uv-font-mono)" }}>{orderId}</dd>
                </div>
              )}
              {sessionId && (
                <div>
                  <dt>Session</dt>
                  <dd
                    style={{
                      fontFamily: "var(--uv-font-mono)",
                      fontSize: 12,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={sessionId}
                  >
                    {sessionId}
                  </dd>
                </div>
              )}
            </dl>
          )}

          <div className="co-success-actions">
            <Link href={`/buy-${platform}-${service}`} className="btn btn-outline btn-md">
              Back to package
            </Link>
            <Link
              href={`/checkout?${retryParams.toString()}`}
              className="btn btn-primary btn-md"
            >
              Try payment again
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
