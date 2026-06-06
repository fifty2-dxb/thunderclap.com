import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

const URL_PATH = "/faqs/";
const CANONICAL = `${SITE_URL}${URL_PATH}`;

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Everything you need to know about Thunderclap — pricing, delivery, account safety, refunds, payments and support.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Frequently asked questions · Thunderclap",
    description:
      "Everything you need to know about Thunderclap — pricing, delivery, account safety, refunds, payments and support.",
    url: CANONICAL,
    siteName: "Thunderclap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently asked questions · Thunderclap",
    description:
      "Everything you need to know about Thunderclap — pricing, delivery, account safety, refunds, payments and support.",
  },
};

type Faq = { q: string; a: string };
type Category = { name: string; faqs: Faq[] };

const CATEGORIES: Category[] = [
  {
    name: "Getting started",
    faqs: [
      {
        q: "What is Thunderclap?",
        a: "Thunderclap is the fastest-growing social media marketing platform built for brands, businesses, influencers and agencies — specializing in engagement services across Instagram, Facebook, TikTok, YouTube and Twitter / X.",
      },
      {
        q: "How does Thunderclap work?",
        a: "Pick a service, choose your package, paste the link to the profile or post you want grown, complete checkout, and we ship the engagement. No password required, ever.",
      },
      {
        q: "Do you offer a free trial?",
        a: "We don't gate the platform — order any tier and if you're not satisfied, our 7-day refund policy has you covered. Start small with our 50- or 100-unit tiers if you want to test the quality first.",
      },
      {
        q: "Where can I see all your services?",
        a: "From the homepage, click on a platform (Instagram, TikTok, YouTube, Facebook, Twitter / X) and you'll see every service we offer — Buy Followers, Buy Likes, Buy Views, etc.",
      },
      {
        q: "Why should I trust Thunderclap?",
        a: "We deliver genuine followers and engagement from active social media users. Payments run through a secure gateway. Your privacy is guaranteed, and we will never ask for your password.",
      },
      {
        q: "What does Thunderclap actually do?",
        a: "We accelerate social media growth by shipping high-quality engagement — followers, likes, shares and views — designed to boost visibility and credibility across every major platform.",
      },
      {
        q: "Why should I choose you over other providers?",
        a: "Reliability, authenticity and affordability. Real engagement from real accounts at competitive prices, with refill and refund guarantees most providers won't offer.",
      },
    ],
  },
  {
    name: "Delivery & services",
    faqs: [
      {
        q: "How fast is delivery?",
        a: "Most orders begin within 5–30 minutes of payment. Full delivery typically lands within 24 hours, drip-fed at a natural pace.",
      },
      {
        q: "How long until my order is fully delivered?",
        a: "Most packages complete within hours. We allow up to 24 hours to keep delivery looking organic on the platform side.",
      },
      {
        q: "How do I receive Instagram followers or likes?",
        a: "Pick a package, complete checkout, and engagement begins landing on your profile or post within 72 hours depending on tier size.",
      },
      {
        q: "Do followers ever drop? What if they do?",
        a: "We aim for permanent engagement, and our refill guarantee covers any drop-off within the guarantee window — top-ups are free.",
      },
      {
        q: "I didn't receive my order. What now?",
        a: "Contact 24/7 support via our contact page. We'll trace the order and resolve it within hours.",
      },
      {
        q: "It's been a few days and I still haven't received my order. Help?",
        a: "Email support@thunderclap.com with your order number — every order is logged and we'll get it moving immediately.",
      },
    ],
  },
  {
    name: "Packages & quantities",
    faqs: [
      {
        q: "How many followers can I buy?",
        a: "Anywhere from 100 to 1,000,000+ followers, packaged in tiers — pick the one that matches your goal.",
      },
      {
        q: "How many likes can I buy?",
        a: "From 50 to 200,000+ likes. Pricing scales smoothly with quantity.",
      },
      {
        q: "How much do services cost?",
        a: "Pricing starts at $2.39 per package. Each service page shows the full tier ladder with per-tier discounts.",
      },
      {
        q: "Is there a limit on how much I can buy?",
        a: "No limit. Order across multiple platforms or stack multiple packages on the same account — totally fine.",
      },
      {
        q: "Can I place a custom order?",
        a: "Yes — contact our team via the support page and we'll build a custom tier for you.",
      },
    ],
  },
  {
    name: "Account safety & credentials",
    faqs: [
      {
        q: "Do I need to share my password?",
        a: "No. Ever. We only need your username, profile URL or post URL — nothing else.",
      },
      {
        q: "Will my account be restricted or banned?",
        a: "No. Our delivery follows the natural pace each platform's algorithms expect — no restrictions or penalties.",
      },
      {
        q: "Do I need to follow people back?",
        a: "Not at all. Followers we ship don't require reciprocation.",
      },
    ],
  },
  {
    name: "Account management",
    faqs: [
      {
        q: "My followers are dropping. What should I do?",
        a: "Contact support and we'll trigger a free refill under our refill guarantee.",
      },
      {
        q: "Can I remove the followers/likes I purchased?",
        a: "Yes — open a support ticket and we'll guide you through removal.",
      },
    ],
  },
  {
    name: "Refunds",
    faqs: [
      {
        q: "What's your refund policy?",
        a: "We offer a 30-day refund policy on every order. If we miss the spec or the timing, request a refund within 30 days.",
      },
    ],
  },
  {
    name: "Payments",
    faqs: [
      {
        q: "What payment methods do you accept?",
        a: "Visa, Mastercard, Amex, Discover, Apple Pay, Google Pay, PayPal, and Crypto (BTC, ETH, USDC, USDT) — all routed through our secure gateway.",
      },
      {
        q: "My card was declined. What can I do?",
        a: "Try a different card or use Apple Pay / Google Pay / PayPal / Crypto. Our gateway accepts every major method.",
      },
      {
        q: "Do you accept PayPal?",
        a: "Yes — PayPal is fully supported.",
      },
    ],
  },
  {
    name: "Security",
    faqs: [
      {
        q: "Is it safe to buy engagement services?",
        a: "Yes. Every order ships from real, active accounts; payment runs over SSL; your account data stays private.",
      },
    ],
  },
  {
    name: "Customer support",
    faqs: [
      {
        q: "How do I contact support?",
        a: "Visit /contact, fill in your name, email, subject and message, and a real human will reply within hours — 24/7.",
      },
      {
        q: "What's the fastest way to reach a real person?",
        a: "The contact form gets you to a human within hours; email support@thunderclap.com for anything sensitive.",
      },
    ],
  },
  {
    name: "Promotions",
    faqs: [
      {
        q: "Do you ever run deals or discounts?",
        a: "Yes — discounts rotate throughout the year. Check the homepage and individual service pages for the current promo.",
      },
    ],
  },
];

const ALL_FAQS: Faq[] = CATEGORIES.flatMap((c) => c.faqs);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ALL_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "FAQs", item: CANONICAL },
  ],
};

function categoryId(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function Page() {
  return (
    <main>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section style={{ background: "var(--uv-bg-lavender)", padding: "72px 0 64px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
            HELP CENTER
          </span>
          <h1
            style={{
              fontFamily: "var(--uv-font-display)",
              fontSize: 56,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              margin: "12px auto 16px",
              maxWidth: 880,
              textWrap: "balance",
            }}
          >
            Frequently <span className="grad-text">asked questions</span>
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--uv-fg-2)",
              margin: "0 auto",
              maxWidth: 720,
              textWrap: "pretty",
            }}
          >
            Everything you need to know — pricing, delivery, account safety, refunds and support.
            Can&apos;t find an answer? Email{" "}
            <a
              href="mailto:support@thunderclap.com"
              style={{ color: "var(--uv-pink)", fontWeight: 700, textDecoration: "underline" }}
            >
              support@thunderclap.com
            </a>
            .
          </p>
        </div>
      </section>

      <section style={{ padding: "64px 0 32px" }}>
        <div className="container">
          <nav
            aria-label="FAQ categories"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              justifyContent: "center",
              marginBottom: 48,
            }}
          >
            {CATEGORIES.map((c) => (
              <a
                key={c.name}
                href={`#${categoryId(c.name)}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "var(--uv-faq-bg)",
                  color: "var(--uv-fg-1)",
                  fontSize: 13,
                  fontWeight: 700,
                  padding: "8px 14px",
                  borderRadius: 999,
                  textDecoration: "none",
                  border: 0,
                }}
              >
                {c.name}
              </a>
            ))}
          </nav>

          <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
            {CATEGORIES.map((c) => (
              <section key={c.name} id={categoryId(c.name)} style={{ scrollMarginTop: 96 }}>
                <h2
                  style={{
                    fontFamily: "var(--uv-font-display)",
                    fontSize: 28,
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    margin: "0 0 20px",
                    textWrap: "balance",
                  }}
                >
                  {c.name}
                </h2>
                <div className="faq-chips">
                  {c.faqs.map((f) => (
                    <details
                      key={f.q}
                      className="faq-chip"
                      style={{
                        display: "block",
                        padding: 0,
                        cursor: "default",
                      }}
                    >
                      <summary
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "18px 22px",
                          cursor: "pointer",
                          listStyle: "none",
                          fontSize: "inherit",
                          fontWeight: "inherit",
                          color: "inherit",
                          lineHeight: 1.4,
                        }}
                      >
                        <span>{f.q}</span>
                        <span style={{ opacity: 0.6, fontSize: 18, marginLeft: 12 }}>›</span>
                      </summary>
                      <div
                        style={{
                          padding: "0 22px 18px",
                          fontSize: 14.5,
                          fontWeight: 400,
                          color: "var(--uv-fg-2)",
                          lineHeight: 1.65,
                        }}
                      >
                        {f.a}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 0 80px" }}>
        <div className="container">
          <div className="coral-band">
            <div className="coral-band-bg" />
            <h2>Still need help?</h2>
            <p>
              Our team replies within hours, 24/7. Or jump straight in and start growing — pick a
              package and your order ships within minutes.
            </p>
            <div
              style={{
                display: "inline-flex",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Link href="/contact" className="btn btn-md coral-btn-light">
                Contact support
              </Link>
              <Link href="/buy-instagram-followers" className="btn btn-md coral-btn-ghost">
                See packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
