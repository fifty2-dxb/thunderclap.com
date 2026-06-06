import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  CreditCard,
  RotateCcw,
  Sparkles,
  Headphones,
} from "lucide-react";
import { SITE_URL } from "@/lib/seo";

const URL_PATH = "/refund/";
const CANONICAL = `${SITE_URL}${URL_PATH}`;

export const metadata: Metadata = {
  title: "Refund policy",
  description:
    "30-day money-back guarantee. Clear eligibility, clear timelines, no surprises.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Refund policy · Thunderclap",
    description:
      "30-day money-back guarantee. Clear eligibility, clear timelines, no surprises.",
    url: CANONICAL,
    siteName: "Thunderclap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund policy · Thunderclap",
    description:
      "30-day money-back guarantee. Clear eligibility, clear timelines, no surprises.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Refund policy", item: CANONICAL },
  ],
};

const HEADLINES: { Icon: typeof Clock; title: string; body: string }[] = [
  {
    Icon: Clock,
    title: "30 days",
    body: "Window to request a refund from the date of purchase.",
  },
  {
    Icon: CreditCard,
    title: "3–10 business days",
    body: "Processing time to your original payment method once approved.",
  },
  {
    Icon: RotateCcw,
    title: "Refill or refund",
    body: "Your choice if engagement drops inside the guarantee window.",
  },
];

export default function Page() {
  return (
    <main>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* HERO ------------------------------------------------------------- */}
      <section style={{ background: "var(--uv-bg-lavender)", padding: "96px 0 80px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
            REFUND POLICY
          </span>
          <h1
            style={{
              fontFamily: "var(--uv-font-display)",
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              margin: "14px auto 18px",
              maxWidth: 980,
              textWrap: "balance",
            }}
          >
            Refund <span className="grad-text">policy</span>
          </h1>
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.6,
              color: "var(--uv-fg-2)",
              maxWidth: 720,
              margin: "0 auto",
              textWrap: "pretty",
            }}
          >
            30-day money-back guarantee on every order. No fine print.
          </p>
        </div>
      </section>

      {/* HEADLINE STRIP --------------------------------------------------- */}
      <section style={{ padding: "64px 0 24px", background: "var(--uv-bg)" }}>
        <div className="container">
          <div className="why-grid-3 refund-headline-grid">
            {HEADLINES.map((h) => (
              <div key={h.title} className="why-card-clean">
                <div className="why-icon">
                  <h.Icon size={20} />
                </div>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 980px) {
            .refund-headline-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* POLICY PROSE ----------------------------------------------------- */}
      <section style={{ padding: "24px 0 64px" }}>
        <div className="container container-narrow">
          <div className="blog-prose" style={{ paddingTop: 24 }}>
            <h2 className="blog-h2">Our commitment</h2>
            <p className="blog-p">
              If something goes wrong with an order — wrong target, missed quantity, drop-off
              inside the guarantee window, or unsatisfactory delivery — we make it right. You can
              request a refund within 30 days of purchase. Once your customer success manager
              confirms eligibility, the refund lands back on your original payment method in 3 to
              10 business days.
            </p>

            <h2 className="blog-h2">What&apos;s covered</h2>
            <ul className="blog-list">
              <li>Orders that fail to deliver the agreed quantity within the timeline on the service page</li>
              <li>Engagement that drops off within 30 days of purchase (we&apos;ll refill or refund — your call)</li>
              <li>Targeting errors that we caused on our side</li>
              <li>Charges where you never received a working session via our gateway</li>
            </ul>

            <h2 className="blog-h2">What&apos;s not covered</h2>
            <ul className="blog-list">
              <li>Refund requests submitted after the 30-day window</li>
              <li>Orders placed against accounts that have since been deleted, deactivated or set to private (we can&apos;t recover what doesn&apos;t exist)</li>
              <li>Requests where the customer has not provided required delivery information (URL or username)</li>
              <li>Reduction in delivered engagement caused by changes the user made (e.g. switched to private, deleted the post the order was placed against)</li>
            </ul>

            <h2 className="blog-h2">How to request a refund</h2>
            <ol className="blog-list">
              <li>
                Email <strong>support@thunderclap.com</strong> with your order number, the email
                used at checkout, and a short note about what went wrong.
              </li>
              <li>Your customer success manager replies within 12 hours to verify eligibility.</li>
              <li>
                If eligible, we offer <strong>store credit</strong> first (instant) or a refund to
                your original payment method (3–10 business days).
              </li>
              <li>
                If you take the refund, we send confirmation once the gateway has processed it.
              </li>
            </ol>

            <h2 className="blog-h2">Store credit option</h2>
            <p className="blog-p">
              Store credit is the first resolution we offer because it&apos;s instant — it lands
              in your Thunderclap balance the moment your customer success manager approves the
              request, with no waiting on banks. It&apos;s also worth <strong>10% more</strong>{" "}
              than the equivalent cash refund as a thank-you for keeping the relationship, and it
              can be applied to any future order across any platform we support.
            </p>

            <h2 className="blog-h2">Customer conduct</h2>
            <p className="blog-p">
              Our team treats every customer with respect, and we ask the same in return. Refund
              requests accompanied by abuse, threats, or harassment of our team members will be
              denied.
            </p>

            <h2 className="blog-h2">Questions?</h2>
            <p className="blog-p">
              Email <strong>support@thunderclap.com</strong> or use the{" "}
              <Link href="/contact">/contact</Link> form. We answer 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* CORAL CTA -------------------------------------------------------- */}
      <section style={{ padding: "32px 0 80px" }}>
        <div className="container">
          <div className="coral-band">
            <div className="coral-band-bg" />
            <h2>Still have questions?</h2>
            <p>Talk to a customer success manager or browse what we ship.</p>
            <div
              style={{
                display: "inline-flex",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Link href="/contact" className="btn btn-primary btn-lg">
                <Headphones size={16} style={{ marginRight: 8 }} />
                Contact support
              </Link>
              <Link href="/buy-instagram-followers" className="btn btn-outline btn-lg">
                <Sparkles size={16} style={{ marginRight: 8 }} />
                Browse services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
