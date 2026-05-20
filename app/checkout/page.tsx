import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { CheckoutFlow } from "./_form";

export const metadata: Metadata = {
  title: "Secure checkout · Thunderclap",
  description: "Complete your Thunderclap order — fast, safe, no password required.",
  robots: { index: false, follow: false },
};

function pickStr(
  v: string | string[] | undefined,
  fallback: string,
): string {
  if (Array.isArray(v)) return v[0] ?? fallback;
  return v ?? fallback;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;

  // Cart-driven flow: target/qty/price/etc all live in the cart now.
  // We still accept a legacy `email` query param so users bounced back
  // from /checkout/failed don't have to retype it.
  const initialEmail = pickStr(sp.email, "");

  return (
    <main className="co-shell">
      <div className="co-top">
        <div className="container" style={{ position: "relative" }}>
          <div className="co-top-inner">
            <Link href="/cart" aria-label="Back to cart" className="co-back">
              <ArrowLeft size={18} />
            </Link>
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
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <CheckoutFlow initialEmail={initialEmail} />
      </div>
    </main>
  );
}
