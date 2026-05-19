import type { Metadata } from "next";
import {
  ArrowUpRight,
  Check,
  Heart,
  Repeat2,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import { TwitterLikesHero, TwitterLikesFaq } from "./_builder";
import { TW_FAQS } from "./_faqs";

const URL_PATH = "/buy-twitter-likes";
const CANONICAL = `${SITE_URL}${URL_PATH}`;

export const metadata: Metadata = {
  title: "Buy Twitter / X Likes — Real, Fast, Safe · Thunderclap",
  description:
    "Buy real Twitter / X likes from active accounts. Delivery starts in 5 minutes. 30-day refill guarantee. No password required. Trusted by 200,000+ creators and brands.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Buy Twitter / X Likes — Real, Fast, Safe · Thunderclap",
    description:
      "Real Twitter / X likes from active accounts. Delivery starts in 5 minutes, drip-fed for a safe organic look. 30-day refill guarantee.",
    url: CANONICAL,
    siteName: "Thunderclap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Twitter / X Likes — Real, Fast, Safe · Thunderclap",
    description:
      "Real Twitter / X likes, delivered in minutes. 30-day refill guarantee. No password required.",
  },
};

const BENEFITS = [
  {
    Icon: Heart,
    title: "Real, lasting likes",
    body: "Likes from active Twitter / X accounts that don't drop. The engagement looks indistinguishable from organic For You feed traffic — to the algorithm and to anyone reading your replies.",
  },
  {
    Icon: Zap,
    title: "Algorithmic velocity",
    body: "X's recommendation algorithm reads early like velocity to decide who sees your tweet next. We deliver fast so your first-hour signal is strong enough to escape the test pool.",
  },
  {
    Icon: TrendingUp,
    title: "More For You impressions",
    body: "Tweets with healthy like-counts get pushed from a small impressions pool into wider For You distribution and quote-tweet chains — that's where viral threads are actually born.",
  },
];

const PERSONAS = [
  {
    eyebrow: "FOR CREATORS & WRITERS",
    title: "Turn one good tweet into a viral thread.",
    body: "Most tweets die at under 500 impressions. A strong like-count in the first hour tells X your post deserves wider distribution and pushes it into the next For You tier — where quote-tweets and follows actually compound.",
    img: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "FOR FOUNDERS & BRANDS",
    title: "Make your launch tweets land with social proof.",
    body: "Launch posts need credibility from the first reply. A healthy like-count on your product announcement becomes the trust signal that turns lurkers into clicks and clicks into paying customers — without paying X for ads.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "FOR AGENCIES",
    title: "Hit client engagement KPIs every cycle.",
    body: "Reporting weeks shouldn't be a gamble. Top up underperforming tweets to keep engagement-rate KPIs above the benchmark your clients signed off on — across every X account you manage, on every platform you're contracted on.",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
  },
];

const COMPARE_ROWS = [
  { label: "Real, active accounts", us: true, them: false },
  { label: "Delivery starts in 5 minutes", us: true, them: false },
  { label: "No password required", us: true, them: true },
  { label: "30-day refill guarantee", us: true, them: false },
  { label: "24/7 live support", us: true, them: false },
  { label: "Money-back within 7 days", us: true, them: false },
  { label: "Transparent pricing — no upsells", us: true, them: false },
];

const REVIEWS = [
  {
    stars: 5,
    text: "Bought 5K likes on a product-launch tweet and watched the quote-tweets start rolling in. The For You algorithm picked it up within an hour.",
    name: "Sofia Alvarez",
    role: "Founder, Northbeam Co.",
    av: "https://i.pravatar.cc/100?img=47",
  },
  {
    stars: 5,
    text: "Used Thunderclap to seed a thread before sharing it in our newsletter. Likes stuck, replies followed, and we picked up 800 new followers in three days.",
    name: "Marcus Chen",
    role: "Indie writer",
    av: "https://i.pravatar.cc/100?img=12",
  },
  {
    stars: 5,
    text: "Tried three other X like providers before Thunderclap. This is the only one where the likes stayed and the For You impressions actually moved.",
    name: "Priya Sharma",
    role: "Growth marketer",
    av: "https://i.pravatar.cc/100?img=44",
  },
];

const RELATED = [
  { label: "Buy Twitter / X Followers", desc: "From $0.79", Icon: Users, href: "/buy-twitter-followers" },
  { label: "Buy Twitter / X Retweets", desc: "From $1.49", Icon: Repeat2, href: "/buy-twitter-retweets" },
  { label: "Buy Instagram Likes", desc: "From $0.99", Icon: Heart, href: "/buy-instagram-likes" },
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Twitter / X Likes",
  description:
    "Real Twitter / X likes from active accounts. Delivery starts in 5 minutes. 30-day refill guarantee. No password required.",
  brand: { "@type": "Brand", name: "Thunderclap" },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "2.49",
    highPrice: "129.49",
    offerCount: 8,
    availability: "https://schema.org/InStock",
    url: CANONICAL,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    reviewCount: "12743",
    bestRating: "5",
    worstRating: "1",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: TW_FAQS.map((f) => ({
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
    { "@type": "ListItem", position: 2, name: "Twitter / X", item: `${SITE_URL}/buy-twitter-followers` },
    { "@type": "ListItem", position: 3, name: "Likes", item: CANONICAL },
  ],
};

export default function Page() {
  return (
    <main>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
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

      <TwitterLikesHero />

      <section style={{ padding: "96px 0 32px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
              WHY BUY TWITTER / X LIKES
            </span>
            <h2
              style={{
                fontFamily: "var(--uv-font-display)",
                fontSize: 40,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                margin: "10px auto 0",
                maxWidth: 720,
                textWrap: "balance",
              }}
            >
              Likes are the fastest <span className="grad-text">signal</span> the X algorithm trusts.
            </h2>
          </div>
          <div className="why-grid-3">
            {BENEFITS.map((b) => (
              <div key={b.title} className="why-card-clean">
                <div className="why-icon">
                  <b.Icon size={20} />
                </div>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 0", background: "var(--uv-bg-lavender)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
              WHO IT&apos;S FOR
            </span>
            <h2
              style={{
                fontFamily: "var(--uv-font-display)",
                fontSize: 40,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                margin: "10px auto 0",
                maxWidth: 720,
                textWrap: "balance",
              }}
            >
              Built for every stage of your Twitter / X presence.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
            {PERSONAS.map((p, i) => (
              <div
                key={p.title}
                className="persona-row"
                style={{ flexDirection: i % 2 ? "row-reverse" : "row" }}
              >
                <div className="persona-img" style={{ backgroundImage: `url(${p.img})` }} />
                <div className="persona-body">
                  <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
                    {p.eyebrow}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--uv-font-display)",
                      fontSize: 28,
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15,
                      margin: "12px 0 14px",
                      textWrap: "balance",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 16,
                      lineHeight: 1.6,
                      color: "var(--uv-fg-2)",
                      margin: 0,
                      textWrap: "pretty",
                    }}
                  >
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "96px 0 32px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
              WHY THUNDERCLAP
            </span>
            <h2
              style={{
                fontFamily: "var(--uv-font-display)",
                fontSize: 40,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                margin: "10px auto 0",
                maxWidth: 760,
                textWrap: "balance",
              }}
            >
              What you get with us vs. the other guys.
            </h2>
          </div>
          <div className="compare-card">
            <div className="compare-head">
              <span>What you&apos;ll get</span>
              <span className="compare-h-us">Thunderclap</span>
              <span className="compare-h-them">Others</span>
            </div>
            {COMPARE_ROWS.map((r) => (
              <div key={r.label} className="compare-row">
                <span style={{ color: "var(--uv-fg-1)", fontWeight: 500 }}>{r.label}</span>
                <span style={{ textAlign: "center" }}>
                  <CheckMark ok={r.us} />
                </span>
                <span style={{ textAlign: "center" }}>
                  <CheckMark ok={r.them} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "96px 0 32px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
              ★ TRUSTPILOT · 4.7 / 5
            </span>
            <h2
              style={{
                fontFamily: "var(--uv-font-display)",
                fontSize: 40,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                margin: "10px auto 12px",
                textWrap: "balance",
                maxWidth: 720,
              }}
            >
              What creators say after their first order.
            </h2>
          </div>
          <div className="testi-grid">
            {REVIEWS.map((r) => (
              <div key={r.name} className="testi-card">
                <div style={{ display: "inline-flex", gap: 2, marginBottom: 12 }}>
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <span key={i} style={{ color: "var(--uv-pink)", fontSize: 14 }}>
                      ★
                    </span>
                  ))}
                </div>
                <p>{r.text}</p>
                <div className="testi-author">
                  <div className="testi-av" style={{ backgroundImage: `url(${r.av})` }} />
                  <div>
                    <div className="testi-name">{r.name}</div>
                    <div className="testi-role">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "32px 0 64px" }}>
        <div className="container">
          <div style={{ marginBottom: 28 }}>
            <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
              RELATED SERVICES
            </span>
            <h2
              style={{
                fontFamily: "var(--uv-font-display)",
                fontSize: 30,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                margin: "10px 0 0",
              }}
            >
              Grow more on Twitter / X.
            </h2>
          </div>
          <div className="related-grid">
            {RELATED.map((r) => (
              <a key={r.label} href={r.href} className="related-card">
                <span className="related-icon">
                  <r.Icon size={20} />
                </span>
                <div>
                  <div className="related-title">{r.label}</div>
                  <div className="related-desc">{r.desc}</div>
                </div>
                <ArrowUpRight size={18} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <TwitterLikesFaq />

      <section style={{ padding: "32px 0 80px" }}>
        <div className="container">
          <div className="coral-band">
            <div className="coral-band-bg" />
            <h2>Ready to grow on Twitter / X?</h2>
            <p>
              Pick a package, paste your tweet URL, and watch your likes climb within the hour.
            </p>
            <div
              style={{ display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}
            >
              <button type="button" className="btn btn-md coral-btn-light">
                Get Started
              </button>
              <button type="button" className="btn btn-md coral-btn-ghost">
                See all packages
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CheckMark({ ok }: { ok: boolean }) {
  if (ok) {
    return (
      <span
        style={{
          width: 26,
          height: 26,
          borderRadius: 999,
          background: "var(--uv-success-text)",
          color: "#fff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Check size={14} />
      </span>
    );
  }
  return (
    <span
      style={{
        width: 26,
        height: 26,
        borderRadius: 999,
        background: "var(--uv-bg-tint)",
        color: "var(--uv-fg-4)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path
          d="M1.5 1.5l8 8M9.5 1.5l-8 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
