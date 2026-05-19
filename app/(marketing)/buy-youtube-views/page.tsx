import type { Metadata } from "next";
import {
  ArrowUpRight,
  Check,
  Eye,
  Heart,
  Play,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import { YouTubeViewsHero, YouTubeViewsFaq } from "./_builder";
import { YT_FAQS } from "./_faqs";

const URL_PATH = "/buy-youtube-views/";
const CANONICAL = `${SITE_URL}${URL_PATH}`;

export const metadata: Metadata = {
  title: "Buy YouTube Views — Real, Watch-Time Counted · Thunderclap",
  description:
    "Buy real YouTube views from active users. 30s+ watch sessions count toward your 4,000-watch-hour YPP threshold. Delivery starts in 15 minutes. No password required.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Buy YouTube Views — Real, Watch-Time Counted · Thunderclap",
    description:
      "Real YouTube views, drip-fed for a natural Suggested-engine curve. Counts toward monetization watch hours. Trusted by 200,000+ creators.",
    url: CANONICAL,
    siteName: "Thunderclap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy YouTube Views — Real, Watch-Time Counted · Thunderclap",
    description:
      "Real YouTube views from active accounts. Counts toward 4,000-watch-hour YPP threshold. No password required.",
  },
};

const BENEFITS = [
  {
    Icon: Eye,
    title: "Real 30s+ watch sessions",
    body: "Every view comes from a real YouTube user opening your video and watching at least 30 seconds — not a botnet, not a view-bombing script. That's why they stick, count toward your watch-time, and lift you in the Suggested ranking.",
  },
  {
    Icon: Zap,
    title: "Surfaces you in Suggested",
    body: "Delivery starts in 15 minutes and drips over 4-48 hours. YouTube reads early view velocity as a strong quality signal and starts recommending your video into Browse and the right-rail Suggested column on other creators' videos.",
  },
  {
    Icon: TrendingUp,
    title: "Counts toward YPP watch hours",
    body: "These are real watch sessions — they count toward the 4,000 watch hours you need for the YouTube Partner Program. Pair with Buy YouTube Subscribers to clear both monetization bars at once.",
  },
];

const PERSONAS = [
  {
    eyebrow: "FOR YOUTUBE CREATORS",
    title: "Get over the YPP watch-hour bar.",
    body: "Subs are one half of monetization; 4,000 watch hours in a rolling 12-month window is the other. Top up your highest-retention uploads — Thunderclap's drip-fed real views move that counter without flagging the channel.",
    img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "FOR BUSINESSES",
    title: "Make every product video look like it's already a hit.",
    body: "When a prospect opens your YouTube ad or landing-page video, view count is the first credibility cue. A video with 250K views converts at 3× the rate of the same video with 1,200. Anchor the launch.",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "FOR AGENCIES & MANAGERS",
    title: "Hit campaign view-count KPIs, on time.",
    body: "Client briefs come with YouTube view-count KPIs. Use Thunderclap to top up under-performing uploads before reporting day — real watch sessions, no risk to the AdSense relationship.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
];

const COMPARE_ROWS = [
  { label: "Real 30s+ watch sessions", us: true, them: false },
  { label: "Delivery starts in 15 minutes", us: true, them: false },
  { label: "Counts toward 4,000-hour YPP threshold", us: true, them: false },
  { label: "No password required", us: true, them: true },
  { label: "30-day refill guarantee", us: true, them: false },
  { label: "24/7 live support", us: true, them: false },
  { label: "Money-back within 7 days", us: true, them: false },
  { label: "Transparent pricing — no upsells", us: true, them: false },
];

const REVIEWS = [
  {
    stars: 5,
    text: "Bought 50K views on a tutorial I knew had high retention — within 48 hours YouTube started recommending it in Suggested, and the organic uplift was bigger than the order itself. Best $50 I've spent on the channel.",
    name: "Daniel Park",
    role: "Education creator",
    av: "https://i.pravatar.cc/100?img=22",
  },
  {
    stars: 5,
    text: "Cleared my last 800 YPP watch hours overnight with one Thunderclap order. Applied for monetization the next morning, approved within a week. Worth every cent.",
    name: "Sophie Müller",
    role: "Travel vlogger",
    av: "https://i.pravatar.cc/100?img=41",
  },
  {
    stars: 5,
    text: "We test every YouTube ad creative organically first now — we warm up the upload with Thunderclap views, watch the retention curve, then pour ad spend behind the ones that perform. CAC down 35%.",
    name: "Ahmed Khan",
    role: "Performance marketer",
    av: "https://i.pravatar.cc/100?img=15",
  },
];

const RELATED = [
  { label: "Buy YouTube Subscribers", desc: "From $2.05", Icon: Users, href: "/buy-youtube-subscribers" },
  { label: "Buy TikTok Views", desc: "From $0.79", Icon: Play, href: "/buy-tiktok-views" },
  { label: "Buy Instagram Views", desc: "From $0.99", Icon: Heart, href: "/buy-instagram-views" },
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "YouTube Views",
  description:
    "Real YouTube views from active users. 30-second-plus watch sessions count toward your 4,000-watch-hour YPP threshold. Delivery starts in 15 minutes.",
  brand: { "@type": "Brand", name: "Thunderclap" },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "4.39",
    highPrice: "4799.99",
    offerCount: 12,
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
  mainEntity: YT_FAQS.map((f) => ({
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
    { "@type": "ListItem", position: 2, name: "YouTube", item: `${SITE_URL}/buy-youtube-subscribers` },
    { "@type": "ListItem", position: 3, name: "Views", item: CANONICAL },
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

      <YouTubeViewsHero />

      <section style={{ padding: "96px 0 32px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
              WHY BUY YOUTUBE VIEWS
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
              Views are the loudest <span className="grad-text">signal a video can send</span>.
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
              Built for every kind of YouTube video.
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
              Grow more on YouTube.
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

      <YouTubeViewsFaq />

      <section style={{ padding: "32px 0 80px" }}>
        <div className="container">
          <div className="coral-band">
            <div className="coral-band-bg" />
            <h2>Ready to push your video?</h2>
            <p>
              Pick a package, paste your video URL, and watch the view count and watch-hour
              counter climb on a safe, audit-proof curve.
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
