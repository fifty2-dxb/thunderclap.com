import type { Metadata } from "next";
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  Heart,
  MessageSquare,
  Play,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import { FollowersHero, FollowersFaq } from "./_builder";
import { IG_FAQS } from "./_faqs";

const URL_PATH = "/buy-instagram-followers/";
const CANONICAL = `${SITE_URL}${URL_PATH}`;

export const metadata: Metadata = {
  title: "Buy Instagram Followers — Real, Fast, Safe · Thunderclap",
  description:
    "Buy real Instagram followers from active accounts. Delivery starts in 5 minutes. 30-day refill guarantee. No password required. Trusted by 200,000+ creators.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Buy Instagram Followers — Real, Fast, Safe · Thunderclap",
    description:
      "Real Instagram followers from active users. Delivery starts in 5 minutes, drip-fed for a safe organic growth curve. 30-day refill guarantee.",
    url: CANONICAL,
    siteName: "Thunderclap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Instagram Followers — Real, Fast, Safe · Thunderclap",
    description:
      "Real Instagram followers, delivered in minutes. 30-day refill guarantee. No password required.",
  },
};

const BENEFITS = [
  {
    Icon: UserPlus,
    title: "Real, lasting followers",
    body: "Every follower comes from a real Instagram account with a profile picture, posts, and a follower base of their own. They don't drop, and they don't look like bots.",
  },
  {
    Icon: TrendingUp,
    title: "Social proof from minute one",
    body: "A profile with 12K followers converts visitors at 4× the rate of one with 200. Anchor your credibility so the next person who lands on your page hits the follow button.",
  },
  {
    Icon: BadgeCheck,
    title: "Unlock collabs, brand deals, badges",
    body: "Reach the follower thresholds that unlock the verified badge, brand inquiries, link stickers, and Instagram subscriptions — without waiting years for organic growth.",
  },
];

const PERSONAS = [
  {
    eyebrow: "FOR NEW PROFILES",
    title: "Get past the empty-profile problem.",
    body: "Real users don't follow profiles with 38 followers — that's the cold-start trap. Buying your first 1K-5K followers gives newcomers a reason to hit follow themselves.",
    img: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "FOR PERSONAL BRANDS",
    title: "Hit the thresholds that unlock features.",
    body: "Link stickers, the verified badge, brand inquiries, and the partner program all kick in at specific follower counts. Reach them on your timeline, not Instagram's.",
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "FOR BUSINESSES",
    title: "Make every ad click see a serious brand.",
    body: "If your paid ad sends 10,000 people to a profile with 400 followers, most of them bounce. A healthy follower count is the cheapest CRO improvement you'll make this quarter.",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
  },
];

const COMPARE_ROWS = [
  { label: "Real, active accounts", us: true, them: false },
  { label: "Delivery starts in 5 minutes", us: true, them: false },
  { label: "Drip-fed for natural growth curve", us: true, them: false },
  { label: "No password required", us: true, them: true },
  { label: "30-day refill guarantee", us: true, them: false },
  { label: "Lifetime refill (Premium tier)", us: true, them: false },
  { label: "24/7 live support", us: true, them: false },
  { label: "Money-back within 7 days", us: true, them: false },
  { label: "Transparent pricing — no upsells", us: true, them: false },
];

const REVIEWS = [
  {
    stars: 5,
    text: "Jumped from 600 to 5.6K followers in three weeks. The real ones started compounding once the count looked credible — and they actually engaged.",
    name: "Sofia Alvarez",
    role: "Lifestyle creator",
    av: "https://i.pravatar.cc/100?img=47",
  },
  {
    stars: 5,
    text: "We grew the brand account to 25K before our funding-round PR push. Investors check socials now — the move paid for itself ten times over.",
    name: "Marcus Chen",
    role: "Founder, Northbeam Co.",
    av: "https://i.pravatar.cc/100?img=12",
  },
  {
    stars: 5,
    text: "Tried three other providers — all of them dropped half the followers in a week. Thunderclap is the only one where the count actually held.",
    name: "Priya Sharma",
    role: "Beauty creator",
    av: "https://i.pravatar.cc/100?img=44",
  },
];

const RELATED = [
  { label: "Buy Instagram Likes", desc: "From $0.99", Icon: Heart, href: "/buy-instagram-likes" },
  { label: "Buy Instagram Views", desc: "From $0.99", Icon: Play, href: "/buy-instagram-views" },
  { label: "Buy Instagram Comments", desc: "From $1.99", Icon: MessageSquare, href: "#" },
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Instagram Followers",
  description:
    "Real Instagram followers from active accounts. Delivery starts in 5 minutes. 30-day refill guarantee. No password required.",
  brand: { "@type": "Brand", name: "Thunderclap" },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "3.49",
    highPrice: "649.99",
    offerCount: 11,
    availability: "https://schema.org/InStock",
    url: CANONICAL,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "12743",
    bestRating: "5",
    worstRating: "1",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: IG_FAQS.map((f) => ({
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
    { "@type": "ListItem", position: 2, name: "Instagram", item: `${SITE_URL}/buy-instagram-followers` },
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

      <FollowersHero />

      <section style={{ padding: "96px 0 32px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
              WHY BUY INSTAGRAM FOLLOWERS
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
              Follower count is the <span className="grad-text">first impression</span> every visitor makes.
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
              Built for every stage of your Instagram journey.
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
              ★ TRUSTPILOT · 4.9 / 5
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
              Grow more on Instagram.
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

      <FollowersFaq />

      <section style={{ padding: "32px 0 80px" }}>
        <div className="container">
          <div className="coral-band">
            <div className="coral-band-bg" />
            <h2>Ready to grow?</h2>
            <p>
              Pick a package, paste your username, and watch your follower count climb within the
              hour.
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
