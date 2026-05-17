import type { Metadata } from "next";
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  Heart,
  Megaphone,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import { FacebookFollowersHero, FacebookFollowersFaq } from "./_builder";
import { FB_FAQS } from "./_faqs";

const URL_PATH = "/facebook/followers";
const CANONICAL = `${SITE_URL}${URL_PATH}`;

export const metadata: Metadata = {
  title: "Buy Facebook Followers — Real, Fast, Safe · Thunderclap",
  description:
    "Buy real Facebook followers for your Page or profile. Delivery starts in 5 minutes. 30-day refill guarantee. No password required. Trusted by 200,000+ creators and brands.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Buy Facebook Followers — Real, Fast, Safe · Thunderclap",
    description:
      "Real Facebook followers from active profiles. Delivery starts in 5 minutes, drip-fed for a safe organic growth curve. 30-day refill guarantee.",
    url: CANONICAL,
    siteName: "Thunderclap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Facebook Followers — Real, Fast, Safe · Thunderclap",
    description:
      "Real Facebook followers, delivered in minutes. 30-day refill guarantee. No password required.",
  },
};

const BENEFITS = [
  {
    Icon: UserPlus,
    title: "Real, lasting followers",
    body: "Every follower is a real Facebook profile with a name, picture, and activity history of their own. They don't drop off after a week and they never trip Page-integrity reviews.",
  },
  {
    Icon: BadgeCheck,
    title: "Instant business credibility",
    body: "Customers read your follower count before they read a single post. A Page sitting at 12K looks established; a Page sitting at 84 looks abandoned — even if the content is identical.",
  },
  {
    Icon: TrendingUp,
    title: "Algorithm prefers bigger Pages",
    body: "Facebook's distribution model — especially on Reels — weighs Page size and early-engagement velocity heavily. A bigger follower base means each new post starts in front of more eyeballs.",
  },
];

const PERSONAS = [
  {
    eyebrow: "FOR NEW PAGES",
    title: "Escape the empty-Page problem.",
    body: "Visitors don't follow Pages with 19 followers — they assume the Page is dead. Buying your first 1K-5K followers gives the algorithm and real customers a reason to take your Page seriously from day one.",
    img: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "FOR LOCAL BUSINESSES",
    title: "Look like the established option in town.",
    body: "When two restaurants, salons, or studios appear side-by-side in Facebook search, the one with the bigger follower count wins the click almost every time. A credible Page is the cheapest local-SEO move you'll make this quarter.",
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "FOR BRANDS RUNNING ADS",
    title: "Make every dollar of Facebook ad spend convert harder.",
    body: "If your Meta ad sends 10,000 people to a Page with 200 followers, most of them bounce. A credible follower count is the single cheapest CRO improvement you can make to your Facebook and Instagram ad funnel.",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
  },
];

const COMPARE_ROWS = [
  { label: "Real, active profiles", us: true, them: false },
  { label: "Delivery starts in 5 minutes", us: true, them: false },
  { label: "Drip-fed for natural growth curve", us: true, them: false },
  { label: "No password required", us: true, them: true },
  { label: "Works on Pages and profiles", us: true, them: false },
  { label: "30-day refill guarantee", us: true, them: false },
  { label: "Lifetime refill (Premium tier)", us: true, them: false },
  { label: "Safe for ad-account standing", us: true, them: false },
  { label: "24/7 live support", us: true, them: false },
  { label: "Money-back within 7 days", us: true, them: false },
  { label: "Transparent pricing — no upsells", us: true, them: false },
];

const REVIEWS = [
  {
    stars: 5,
    text: "Our local cafe Page went from 240 to 8K followers over two weeks and our weekend bookings doubled. Customers literally tell us they trusted us because the Page looked established.",
    name: "Sofia Alvarez",
    role: "Cafe owner",
    av: "https://i.pravatar.cc/100?img=47",
  },
  {
    stars: 5,
    text: "We grew our brand Page to 50K before relaunching our Meta ad campaign. Cost per result dropped 41% — the social proof was doing half the work the creative used to do.",
    name: "Marcus Chen",
    role: "Founder, Northbeam Co.",
    av: "https://i.pravatar.cc/100?img=12",
  },
  {
    stars: 5,
    text: "Tried two other Facebook providers — both dropped most of the followers within a week and one even got my Page flagged. Thunderclap is the only one where the count actually held.",
    name: "Priya Sharma",
    role: "Creator & coach",
    av: "https://i.pravatar.cc/100?img=44",
  },
];

const RELATED = [
  { label: "Buy Twitter Followers", desc: "From $0.59", Icon: Megaphone, href: "/twitter/followers" },
  { label: "Buy Instagram Followers", desc: "From $0.49", Icon: Users, href: "/instagram/followers" },
  { label: "Buy TikTok Followers", desc: "From $0.49", Icon: Heart, href: "/tiktok/followers" },
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Facebook Followers",
  description:
    "Real Facebook followers for Pages and profiles. Delivery starts in 5 minutes. 30-day refill guarantee. No password required.",
  brand: { "@type": "Brand", name: "Thunderclap" },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0.59",
    highPrice: "5999.99",
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
    { "@type": "ListItem", position: 2, name: "Facebook", item: `${SITE_URL}/facebook/followers` },
    { "@type": "ListItem", position: 3, name: "Followers", item: CANONICAL },
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

      <FacebookFollowersHero />

      <section style={{ padding: "96px 0 32px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
              WHY BUY FACEBOOK FOLLOWERS
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
              Follower count is the <span className="grad-text">first thing</span> every visitor checks.
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
              Built for every kind of Facebook Page.
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
              What Page owners say after their first order.
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
              Grow your audience everywhere.
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

      <FacebookFollowersFaq />

      <section style={{ padding: "32px 0 80px" }}>
        <div className="container">
          <div className="coral-band">
            <div className="coral-band-bg" />
            <h2>Ready to grow on Facebook?</h2>
            <p>
              Pick a package, paste your Page or profile URL, and watch your follower count climb
              within the hour.
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
