import type { Metadata } from "next";
import {
  ArrowUpRight,
  Check,
  Heart,
  Play,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import { YouTubeSubscribersHero, YouTubeSubscribersFaq } from "./_builder";
import { YT_FAQS } from "./_faqs";

const URL_PATH = "/buy-youtube-subscribers";
const CANONICAL = `${SITE_URL}${URL_PATH}`;

export const metadata: Metadata = {
  title: "Buy YouTube Subscribers — Real, Safe, Monetization-Ready · Thunderclap",
  description:
    "Buy real YouTube subscribers from active accounts. 30-day refill guarantee, no password required. Counts toward the 1,000-sub YPP threshold. Trusted by 200,000+ creators.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Buy YouTube Subscribers — Real, Safe, Monetization-Ready · Thunderclap",
    description:
      "Real YouTube subscribers from active accounts. Delivery starts in 15 minutes, drip-fed for an audit-proof curve. 30-day refill guarantee.",
    url: CANONICAL,
    siteName: "Thunderclap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy YouTube Subscribers — Real, Safe, Monetization-Ready · Thunderclap",
    description:
      "Real YouTube subscribers, drip-fed safely. Counts toward the 1,000-sub YPP threshold. No password required.",
  },
};

const BENEFITS = [
  {
    Icon: Users,
    title: "Real subscriber accounts",
    body: "Every subscriber comes from a real YouTube user with watch history, profile activity, and a verified email — not a botnet. That's why the count holds: YouTube's spam filters strip out fake accounts, but real ones stay subscribed.",
  },
  {
    Icon: Zap,
    title: "Unlocks monetization",
    body: "Subs count toward the 1,000-subscriber YouTube Partner Program threshold. Combine with Buy YouTube Views to clear the 4,000 watch-hour bar — that's how creators flip the monetization switch on a brand-new channel.",
  },
  {
    Icon: TrendingUp,
    title: "Bigger reach, more views",
    body: "YouTube weighs subscriber count when ranking your channel in Browse, Suggested, and channel-search. A bigger sub count makes every new upload land in front of more strangers — who then sub and stay.",
  },
];

const PERSONAS = [
  {
    eyebrow: "FOR YOUTUBE CREATORS",
    title: "Get past 1,000 subs and turn on monetization.",
    body: "The hardest stretch on YouTube is the climb from 0 to 1,000 subs — the bar where AdSense, Super Chat, and channel memberships unlock. Front-load the count, then let the algorithm pick up where you left off.",
    img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "FOR BUSINESSES",
    title: "Make your YouTube channel look like an industry leader.",
    body: "When a prospect lands on your YouTube channel, sub count is the first credibility cue. A channel with 50K subs gets booked for podcast cross-promos and inbound partnership requests that a 1,200-sub channel never sees.",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "FOR AGENCIES & MANAGERS",
    title: "Hit subscriber-growth KPIs reliably, on time.",
    body: "Client briefs come with quarterly YouTube subscriber KPIs. Use Thunderclap to top up channels before reporting day — drip-fed safely, real accounts, no risk to the AdSense relationship.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
];

const COMPARE_ROWS = [
  { label: "Real, active subscriber accounts", us: true, them: false },
  { label: "Delivery starts in 15 minutes", us: true, them: false },
  { label: "Counts toward 1,000-sub YPP threshold", us: true, them: false },
  { label: "No password required", us: true, them: true },
  { label: "30-day refill guarantee", us: true, them: false },
  { label: "24/7 live support", us: true, them: false },
  { label: "Money-back within 7 days", us: true, them: false },
  { label: "Transparent pricing — no upsells", us: true, them: false },
];

const REVIEWS = [
  {
    stars: 5,
    text: "Crossed 1K subs in three days with Thunderclap, applied for YPP the same week, and got approved on the first round. The watch hours from organic uploads were already there — I just needed the sub bar.",
    name: "Marcus Chen",
    role: "Tech reviewer",
    av: "https://i.pravatar.cc/100?img=12",
  },
  {
    stars: 5,
    text: "We use Thunderclap on every new YouTube channel we launch for clients. The combo of subs + views gets the channel out of the cold-start zone in about 10 days, and inbound brand interest follows from there.",
    name: "Priya Sharma",
    role: "Agency partner",
    av: "https://i.pravatar.cc/100?img=47",
  },
  {
    stars: 5,
    text: "I'd been stuck at 800 subs for four months despite weekly uploads. One 500-sub order pushed me over the 1K monetization line and the Suggested engine started showing my older videos again. Insane unlock.",
    name: "Liam O'Connor",
    role: "Fitness creator",
    av: "https://i.pravatar.cc/100?img=58",
  },
];

const RELATED = [
  { label: "Buy YouTube Views", desc: "From $1.99", Icon: Play, href: "/buy-youtube-views" },
  { label: "Buy TikTok Followers", desc: "From $0.49", Icon: Users, href: "/buy-tiktok-followers" },
  { label: "Buy Instagram Followers", desc: "From $0.99", Icon: Heart, href: "/buy-instagram-followers" },
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "YouTube Subscribers",
  description:
    "Real YouTube subscribers from active accounts. Counts toward the 1,000-sub YPP threshold. 30-day refill guarantee. No password required.",
  brand: { "@type": "Brand", name: "Thunderclap" },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "12.49",
    highPrice: "4499.99",
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
    { "@type": "ListItem", position: 3, name: "Subscribers", item: CANONICAL },
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

      <YouTubeSubscribersHero />

      <section style={{ padding: "96px 0 32px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
              WHY BUY YOUTUBE SUBSCRIBERS
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
              Subscriber count is the bar YouTube uses to <span className="grad-text">judge your channel</span>.
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
              Built for every kind of YouTube channel.
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

      <YouTubeSubscribersFaq />

      <section style={{ padding: "32px 0 80px" }}>
        <div className="container">
          <div className="coral-band">
            <div className="coral-band-bg" />
            <h2>Ready to scale your channel?</h2>
            <p>
              Pick a package, paste your channel URL, and watch the subscriber count climb on a
              safe, audit-proof curve.
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
