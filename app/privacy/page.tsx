import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Sparkles } from "lucide-react";
import { SITE_URL } from "@/lib/seo";

const URL_PATH = "/privacy/";
const CANONICAL = `${SITE_URL}${URL_PATH}`;
const LAST_UPDATED = "2026-05-20";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Thunderclap collects, uses and safeguards your information. We never ask for passwords.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Privacy policy · Thunderclap",
    description:
      "How Thunderclap collects, uses and safeguards your information. We never ask for passwords.",
    url: CANONICAL,
    siteName: "Thunderclap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy policy · Thunderclap",
    description:
      "How Thunderclap collects, uses and safeguards your information. We never ask for passwords.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Privacy policy", item: CANONICAL },
  ],
};

export default function Page() {
  return (
    <main>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* HERO ------------------------------------------------------------- */}
      <section style={{ background: "var(--uv-bg-lavender)", padding: "96px 0 72px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "var(--uv-pink-soft)",
              color: "var(--uv-pink)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 14,
            }}
          >
            <ShieldCheck size={26} />
          </span>
          <h1
            style={{
              fontFamily: "var(--uv-font-display)",
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              margin: "6px auto 18px",
              maxWidth: 880,
              textWrap: "balance",
            }}
          >
            Privacy <span className="grad-text">policy</span>
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
            How we handle your information. The short version: we never ask for your password, and
            we never sell your data.
          </p>
          <p
            style={{
              fontSize: 13,
              color: "var(--uv-fg-3)",
              margin: "18px 0 0",
              letterSpacing: "0.02em",
            }}
          >
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* BODY ------------------------------------------------------------- */}
      <section style={{ padding: "56px 0 72px" }}>
        <div className="container container-narrow">
          <div className="blog-prose">
            <h2 className="blog-h2">Overview</h2>
            <p className="blog-p">
              Thunderclap is a social media growth service provider operating across Instagram,
              TikTok, YouTube, Facebook and Twitter / X. This policy explains what information we
              collect when you use our site or order our services, how we use it, and the
              protections we apply. By using thunderclap.com you agree to the practices described
              below.
            </p>

            <h2 className="blog-h2">Information we collect</h2>
            <ul className="blog-list">
              <li>
                <strong>Personal details</strong> — Name, email and payment information collected
                at checkout to process your order and stay in touch.
              </li>
              <li>
                <strong>Social media targets</strong> — The profile or post URLs (and usernames)
                you submit when ordering, used solely to fulfill the engagement service.
              </li>
              <li>
                <strong>Usage data</strong> — Anonymous device, browser and analytics signals (IP,
                browser type, OS, referrer) collected automatically from site visits to help us
                improve performance and detect fraud.
              </li>
            </ul>

            <h2 className="blog-h2">How we use your information</h2>
            <ul className="blog-list">
              <li>Fulfill the engagement services you order</li>
              <li>Send order confirmations, delivery updates and support replies</li>
              <li>Process payments through our secure gateway partner</li>
              <li>Improve site performance, prevent fraud and abuse</li>
              <li>Notify you of policy updates that affect your orders</li>
            </ul>

            <h2 className="blog-h2">What we never do</h2>
            <ul className="blog-list">
              <li>
                <strong>We never ask for your passwords</strong> — every service ships from
                public-side engagement that doesn&apos;t require account access.
              </li>
              <li>
                <strong>We never sell or rent your personal data</strong> to third parties for
                advertising.
              </li>
              <li>
                <strong>We never store full card details</strong> on our servers — payment data
                lives entirely with our PCI-DSS Level 1 gateway partner.
              </li>
            </ul>

            <h2 className="blog-h2">Security</h2>
            <p className="blog-p">
              We use industry-standard encryption (256-bit SSL) in transit and restrict access to
              your data to authorized team members only. Payment data is processed by a PCI DSS
              Level 1 compliant gateway — your card details never touch our servers.
            </p>

            <h2 className="blog-h2">Sharing your information</h2>
            <p className="blog-p">
              We share data only with the partners who help us run the service: our payment gateway
              (to process charges), our fulfillment partner (to deliver the engagement), and our
              analytics provider (in anonymised, aggregated form). We may also disclose information
              when legally required or to prevent fraud and protect the safety of our users.
            </p>

            <h2 className="blog-h2">Cookies</h2>
            <p className="blog-p">
              We use first-party cookies to remember your session and your cart, and third-party
              analytics cookies to understand site usage. You can disable cookies in your browser,
              but some features (like checkout) require them to work.
            </p>

            <h2 className="blog-h2">Your rights</h2>
            <ul className="blog-list">
              <li>Request a copy of the personal information we hold about you</li>
              <li>Request correction or deletion of your personal information</li>
              <li>
                Withdraw consent for marketing emails at any time (unsubscribe link in every email)
              </li>
              <li>Lodge a complaint with your local data protection authority</li>
            </ul>

            <h2 className="blog-h2">Children&apos;s privacy</h2>
            <p className="blog-p">
              Our service is intended for users aged 16 and over. We do not knowingly collect
              information from anyone under 16. If you believe a minor has provided us information,
              contact support@thunderclap.com and we will delete it.
            </p>

            <h2 className="blog-h2">Changes to this policy</h2>
            <p className="blog-p">
              We may update this policy from time to time. Material changes will be announced on
              this page and, where appropriate, via email. The &lsquo;last updated&rsquo; date at
              the top reflects the most recent revision.
            </p>

            <h2 className="blog-h2">Contact us</h2>
            <p className="blog-p">
              Questions about how we handle your data? Email{" "}
              <strong>support@thunderclap.com</strong> or use our{" "}
              <Link href="/contact">/contact</Link> form.
            </p>
          </div>
        </div>
      </section>

      {/* CORAL CTA -------------------------------------------------------- */}
      <section style={{ padding: "16px 0 80px" }}>
        <div className="container">
          <div className="coral-band">
            <div className="coral-band-bg" />
            <h2>Still have questions?</h2>
            <p>Talk to our team or browse what we offer — no password required, ever.</p>
            <div
              style={{
                display: "inline-flex",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Link href="/contact" className="btn btn-primary btn-lg">
                <Sparkles size={16} style={{ marginRight: 8 }} />
                Contact support
              </Link>
              <Link href="/buy-instagram-followers" className="btn btn-outline btn-lg">
                Browse services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
