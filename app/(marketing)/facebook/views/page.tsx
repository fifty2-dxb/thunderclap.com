import type { Metadata } from "next";
import {
  ArrowUpRight,
  Check,
  Eye,
  Heart,
  Play,
  TrendingUp,
  Zap,
} from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import { FacebookViewsHero, FacebookViewsFaq } from "./_builder";
import { FB_FAQS } from "./_faqs";

const URL_PATH = "/facebook/views";
const CANONICAL = `${SITE_URL}${URL_PATH}`;

export const metadata: Metadata = {
  title: "Buy Facebook Views — Real, Fast, Safe · Thunderclap",
  description:
    "Buy real Facebook views for any public video — feed, Reels, or Watch. Delivery starts in 5 minutes. 30-day refill guarantee. No password required. Trusted by 200,000+ creators and businesses.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Buy Facebook Views — Real, Fast, Safe · Thunderclap",
    description:
      "Real Facebook video views from active users. Delivery starts in 5 minutes, drip-fed for a safe organic retention curve. 30-day refill guarantee.",
    url: CANONICAL,
    siteName: "Thunderclap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Facebook Views — Real, Fast, Safe · Thunderclap",
    description:
      "Real Facebook views for feed videos and Reels, delivered in minutes. 30-day refill guarantee. No password required.",
  },
};

const BENEFITS = [
  {
    Icon: Eye,
    title: "Real watch sessions",
    body: "Every view comes from a real Facebook user opening your video — not a botnet. That's why the watch-time minutes count, the retention curve looks human, and the post earns trust from Meta's ranking algorithm.",
  },
  {
    Icon: Zap,
    title: "Reels & Watch-ready velocity",
    body: "Delivery starts in 5 minutes and drips over 1-6 hours. Facebook reads early watch velocity and hold-time as the strongest quality signals there are, and pushes the video onto Reels feeds, Watch suggestions, and friends-of-fans surfaces.",
  },
  {
    Icon: TrendingUp,
    title: "Cheaper paid reach, warmer ads",
    body: "Videos with strong organic-looking view counts get lower CPMs when you boost them. Pre-warm the post with real views and your paid spend compounds against an asset Meta already considers high quality.",
  },
];

const PERSONAS = [
  {
    eyebrow: "FOR PAGE OWNERS & CREATORS",
    title: "Break out of the Page-reach freeze.",
    body: "Organic Facebook Page reach has been throttled for years — but video, especially Reels, still gets pushed when the early retention curve holds. Front-loading real watch sessions is the lever that flips a flat post into a distributed one.",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "FOR BUSINESSES",
    title: "Make every video on your Page look like a hit.",
    body: "When prospects land on your Page or click a Facebook ad, view count is the first credibility cue. A product video with 80K views converts at multiples of the same video with 900. Anchor the launch before you spend a cent on ads.",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "FOR AGENCIES & MEDIA BUYERS",
    title: "Pre-warm creatives before paid traffic hits.",
    body: "Running paid traffic at a cold video burns budget. Use Thunderclap to seed real views and watch-time first — Meta's auction rewards content that already looks engaging, and your CPM and relevance score both move in your favor on day one.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
];

const COMPARE_ROWS = [
  { label: "Real watch sessions (not bot pings)", us: true, them: false },
  { label: "Delivery starts in 5 minutes", us: true, them: false },
  { label: "Works on Reels and feed video equally", us: true, them: false },
  { label: "Safe for ad accounts and Business Manager", us: true, them: false },
  { label: "No password required", us: true, them: true },
  { label: "30-day refill guarantee", us: true, them: false },
  { label: "24/7 live support", us: true, them: false },
  { label: "Transparent pricing — no upsells", us: true, them: false },
];

const REVIEWS = [
  {
    stars: 5,
    text: "Pushed our new product Reel from 1.4K to 90K views overnight with Thunderclap, then turned on a $200/day boost. CPM was the lowest we've ever seen on a Facebook campaign.",
    name: "Jordan Reyes",
    role: "DTC growth lead",
    av: "https://i.pravatar.cc/100?img=33",
  },
  {
    stars: 5,
    text: "Our Page had been flatlining for months. One Thunderclap order on a feed video and suddenly Meta was distributing it to friends-of-fans I'd never reached. The retention curve did the heavy lifting.",
    name: "Camille Dubois",
    role: "Founder, Lumière Skincare",
    av: "https://i.pravatar.cc/100?img=49",
  },
  {
    stars: 5,
    text: "I run Facebook ads for ecom clients and pre-warm every hero creative with Thunderclap views before flipping the campaign on. Relevance score and CPM both move — it's table-stakes for us now.",
    name: "Ahmed Khan",
    role: "Performance marketer",
    av: "https://i.pravatar.cc/100?img=15",
  },
];

const RELATED = [
  { label: "Buy Twitter Likes", desc: "From $0.59", Icon: Heart, href: "/twitter/likes" },
  { label: "Buy Instagram Views", desc: "From $0.99", Icon: Play, href: "/instagram/views" },
  { label: "Buy TikTok Views", desc: "From $0.79", Icon: Play, href: "/tiktok/views" },
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Facebook Views",
  description:
    "Real Facebook views for any public video — feed, Reels, or Watch. Delivery starts in 5 minutes. 30-day refill guarantee. No password required.",
  brand: { "@type": "Brand", name: "Thunderclap" },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0.79",
    highPrice: "4499.99",
    offerCount: 14,
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
  mainEntity: FB_FAQS.map((f) => ({
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
    { "@type": "ListItem", position: 2, name: "Facebook", item: `${SITE_URL}/facebook/views` },
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

      <FacebookViewsHero />

      <section style={{ padding: "96px 0 32px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
              WHY BUY FACEBOOK VIEWS
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
              Watch-time is the loudest <span className="grad-text">signal</span> a Facebook video can send.
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
              Built for every kind of Facebook video.
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
              Grow more across social.
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

      <FacebookViewsFaq />

      <section style={{ padding: "32px 0 80px" }}>
        <div className="container">
          <div className="coral-band">
            <div className="coral-band-bg" />
            <h2>Ready to push your Facebook video?</h2>
            <p>
              Pick a package, paste your video URL, and watch your view count climb within the hour.
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
