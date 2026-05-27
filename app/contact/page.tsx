import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeftRight,
  Clock,
  CreditCard,
  HelpCircle,
  Mail,
  Package,
  ShieldCheck,
  Star,
  TrendingDown,
} from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import ContactForm from "./_form";

const URL_PATH = "/contact/";
const CANONICAL = `${SITE_URL}${URL_PATH}`;
const SUPPORT_EMAIL = "support@thunderclap.com";

export const metadata: Metadata = {
  title: "Contact us · Thunderclap",
  description:
    "Get in touch with Thunderclap support — 24/7 help with orders, payments, refills, refunds and security questions.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Contact us · Thunderclap",
    description:
      "Get in touch with Thunderclap support — 24/7 help with orders, payments, refills, refunds and security questions.",
    url: CANONICAL,
    siteName: "Thunderclap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact us · Thunderclap",
    description:
      "24/7 help with orders, payments, refills, refunds and security questions.",
  },
};

const SUPPORT_CATEGORIES: {
  Icon: typeof HelpCircle;
  title: string;
  body: string;
}[] = [
  {
    Icon: HelpCircle,
    title: "Customer support",
    body: "General questions, account help and onboarding — we've got you 24/7.",
  },
  {
    Icon: CreditCard,
    title: "Payment issues",
    body: "Payment deducted but order missing? Our team will resolve it fast.",
  },
  {
    Icon: ArrowLeftRight,
    title: "Refunds & cancellation",
    body: "30-day refund policy on every order — clear, simple, fair.",
  },
  {
    Icon: TrendingDown,
    title: "Service drops",
    body: "Noticed a drop in delivered engagement? Trigger a free refill in one message.",
  },
  {
    Icon: ShieldCheck,
    title: "Security concerns",
    body: "Report security or trust concerns — our risk and trust team responds same-day.",
  },
  {
    Icon: Package,
    title: "Order & delivery",
    body: "Need an update on an in-flight order? We'll trace it and ping you back.",
  },
];

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Thunderclap",
  url: CANONICAL,
  description:
    "Get in touch with Thunderclap support — 24/7 help with orders, payments, refills, refunds and security questions.",
  mainEntity: {
    "@type": "Organization",
    name: "Thunderclap",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.webp`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SUPPORT_EMAIL,
      availableLanguage: ["English"],
      areaServed: "Worldwide",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Contact", item: CANONICAL },
  ],
};

export default function Page() {
  return (
    <main>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* HERO ------------------------------------------------------------- */}
      <section
        style={{ background: "var(--uv-bg-lavender)", padding: "96px 0 80px" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <span
            className="uv-eyebrow"
            style={{ color: "var(--uv-pink)" }}
          >
            CONTACT THUNDERCLAP
          </span>
          <h1
            style={{
              fontFamily: "var(--uv-font-display)",
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              margin: "14px auto 18px",
              maxWidth: 900,
              textWrap: "balance",
            }}
          >
            We&apos;re here to <span className="grad-text">help</span>
          </h1>
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.6,
              color: "var(--uv-fg-2)",
              maxWidth: 680,
              margin: "0 auto",
              textWrap: "pretty",
            }}
          >
            Got questions? Need assistance? Our responsive support team is
            available around the clock.
          </p>
        </div>
      </section>

      {/* SUPPORT CATEGORIES ---------------------------------------------- */}
      <section style={{ padding: "64px 0 24px", background: "var(--uv-bg)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span
              className="uv-eyebrow"
              style={{ color: "var(--uv-pink)" }}
            >
              HOW CAN WE HELP?
            </span>
            <h2
              style={{
                fontFamily: "var(--uv-font-display)",
                fontSize: 36,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                margin: "10px auto 0",
                maxWidth: 640,
                textWrap: "balance",
              }}
            >
              Pick the topic that fits — we&apos;ll route you to the right team
            </h2>
          </div>

          <div className="support-grid">
            {SUPPORT_CATEGORIES.map((c) => (
              <div key={c.title} className="support-card">
                <span className="support-card-icon" aria-hidden>
                  <c.Icon size={20} />
                </span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + DETAILS -------------------------------------------------- */}
      <section style={{ padding: "48px 0 88px" }}>
        <div className="container">
          <div className="contact-grid">
            {/* LEFT: form */}
            <div>
              <span
                className="uv-eyebrow"
                style={{ color: "var(--uv-pink)" }}
              >
                SEND US A MESSAGE
              </span>
              <h2
                style={{
                  fontFamily: "var(--uv-font-display)",
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  margin: "8px 0 6px",
                  textWrap: "balance",
                }}
              >
                Tell us what&apos;s going on
              </h2>
              <p
                style={{
                  fontSize: 15.5,
                  lineHeight: 1.6,
                  color: "var(--uv-fg-2)",
                  margin: "0 0 22px",
                }}
              >
                Fill in the form below and a real human will reply within 12
                hours — usually faster.
              </p>

              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--uv-line)",
                  borderRadius: 22,
                  padding: "28px 26px",
                }}
              >
                <ContactForm />
              </div>
            </div>

            {/* RIGHT: contact details */}
            <div>
              <span
                className="uv-eyebrow"
                style={{ color: "var(--uv-pink)" }}
              >
                OTHER WAYS TO REACH US
              </span>
              <h2
                style={{
                  fontFamily: "var(--uv-font-display)",
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  margin: "8px 0 22px",
                  textWrap: "balance",
                }}
              >
                Talk to a real person
              </h2>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <li
                  style={{
                    display: "grid",
                    gridTemplateColumns: "44px 1fr",
                    gap: 16,
                    alignItems: "start",
                    background: "var(--uv-bg-lavender)",
                    borderRadius: 16,
                    padding: "18px 18px",
                  }}
                >
                  <span
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "var(--uv-pink-soft)",
                      color: "var(--uv-pink)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Mail size={18} />
                  </span>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: "var(--uv-fg-1)",
                        marginBottom: 2,
                      }}
                    >
                      Email support
                    </div>
                    <a
                      href={`mailto:${SUPPORT_EMAIL}`}
                      style={{
                        fontSize: 14.5,
                        color: "var(--uv-pink)",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      {SUPPORT_EMAIL}
                    </a>
                  </div>
                </li>

                <li
                  style={{
                    display: "grid",
                    gridTemplateColumns: "44px 1fr",
                    gap: 16,
                    alignItems: "start",
                    background: "var(--uv-bg-lavender)",
                    borderRadius: 16,
                    padding: "18px 18px",
                  }}
                >
                  <span
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "var(--uv-pink-soft)",
                      color: "var(--uv-pink)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Clock size={18} />
                  </span>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: "var(--uv-fg-1)",
                        marginBottom: 2,
                      }}
                    >
                      Response time
                    </div>
                    <div
                      style={{
                        fontSize: 14.5,
                        color: "var(--uv-fg-2)",
                        lineHeight: 1.5,
                      }}
                    >
                      Within 12 hours · 24/7
                    </div>
                  </div>
                </li>
              </ul>

              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--uv-line)",
                  borderRadius: 18,
                  padding: "22px 22px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    marginBottom: 10,
                    color: "#00b67a",
                  }}
                  aria-label="5 star Trustpilot rating"
                >
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={16} fill="#00b67a" stroke="#00b67a" />
                  ))}
                  <span
                    style={{
                      marginLeft: 8,
                      fontSize: 13,
                      color: "var(--uv-fg-3)",
                      fontWeight: 600,
                    }}
                  >
                    Trustpilot · 4.9 / 5
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 14.5,
                    color: "var(--uv-fg-2)",
                    lineHeight: 1.6,
                    margin: 0,
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;Their support is genuinely human and genuinely fast.
                  Had a refill question, got a real answer in under an
                  hour.&rdquo;
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--uv-fg-3)",
                    margin: "10px 0 0",
                    fontWeight: 600,
                  }}
                >
                  — Verified customer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORAL CTA BAND --------------------------------------------------- */}
      <section style={{ padding: "0 0 88px" }}>
        <div className="container">
          <div className="coral-band">
            <div className="coral-band-bg" />
            <h2>Ready to grow while we&apos;ve got your back?</h2>
            <p>
              Real-account growth, drip-fed safely, with a 30-day refill
              guarantee. First results in 15 minutes.
            </p>
            <div
              style={{
                display: "inline-flex",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Link
                href="/buy-instagram-followers"
                className="btn btn-md coral-btn-light"
              >
                Start with Instagram
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
