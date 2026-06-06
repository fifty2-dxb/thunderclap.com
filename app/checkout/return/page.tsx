import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { ReturnPoll } from "./_poll";

export const metadata: Metadata = {
  title: "Confirming payment",
  robots: { index: false, follow: false },
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

  // Carry-along params we set when we built the returnUrl in /api/checkout/session.
  const platform = pickStr(sp.platform, "instagram");
  const service = pickStr(sp.service, "followers");
  const qty = pickStr(sp.qty, "0");
  const price = pickStr(sp.price, "0");
  const premium = pickStr(sp.premium, "0");
  const target = pickStr(sp.target, "");
  const email = pickStr(sp.email, "");
  const orderId = pickStr(sp.order_id, "");

  // Redlap appends these on the redirect back.
  const sessionId = pickStr(sp.payment_id, "");
  const declared = pickStr(sp.payment_status, "").toLowerCase();
  const orderNumber = pickStr(sp.order_number, "");

  const baseTerminal = new URLSearchParams({
    platform,
    service,
    qty,
    price,
    premium,
    target,
    email,
    order_id: orderId,
    payment_id: sessionId,
    order_number: orderNumber,
  });

  // If Redlap tells us up-front the payment was cancelled/failed/expired,
  // skip polling entirely — the user is not going to magically pay from
  // the return page. We still let `success` go through polling so the
  // webhook (or session GET) is the authoritative source.
  if (declared === "failed" || declared === "cancelled" || declared === "canceled" || declared === "error") {
    redirect(`/checkout/failed?${baseTerminal.toString()}&reason=${encodeURIComponent(declared)}`);
  }
  if (declared === "expired") {
    redirect(`/checkout/failed?${baseTerminal.toString()}&reason=expired`);
  }
  if (!sessionId) {
    redirect(`/checkout/failed?${baseTerminal.toString()}&reason=missing_session`);
  }

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
              <span>Verifying payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <ReturnPoll
          sessionId={sessionId}
          carryParams={baseTerminal.toString()}
        />
      </div>
    </main>
  );
}
