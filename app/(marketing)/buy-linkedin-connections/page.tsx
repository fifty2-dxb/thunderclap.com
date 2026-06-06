import type { Metadata } from "next";
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  Heart,
  MessageSquare,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import { LinkedInConnectionsHero, LinkedInConnectionsFaq } from "./_builder";
import { LI_FAQS } from "./_faqs";

const URL_PATH = "/buy-linkedin-connections/";
const CANONICAL = `${SITE_URL}${URL_PATH}`;

export const metadata: Metadata = {
  title: "Buy LinkedIn Connections — Real, Fast, Safe",
  description:
    "Buy real LinkedIn connections from active, complete profiles. Delivery starts in 30 minutes. 30-day refill guarantee. No password required. Trusted by 200,000+ professionals, founders, and B2B teams.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Buy LinkedIn Connections — Real, Fast, Safe · Thunderclap",
    description:
      "Real LinkedIn connections from active professional profiles. Delivery starts in 30 minutes, drip-fed for a safe, organic growth curve. 30-day refill guarantee.",
    url: CANONICAL,
    siteName: "Thunderclap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy LinkedIn Connections — Real, Fast, Safe · Thunderclap",
    description:
      "Real LinkedIn connections, delivered in minutes. 30-day refill guarantee. No password required.",
  },
};

const BENEFITS = [
  {
    Icon: UserPlus,
    title: "B2B credibility you can audit",
    body: "When a recruiter, buyer, or investor opens your LinkedIn profile, connection count is the first credibility check they make. A serious 1st-degree network signals you're embedded in your industry before they read a single line of your headline.",
  },
  {
    Icon: BadgeCheck,
    title: "Bigger 2nd & 3rd-degree network",
    body: "Every 1st-degree connection unlocks their entire network as 2nd and 3rd-degree reach. 500 new 1st-degree connections typically opens up 50,000+ new 2nd-degree profiles you can warm-intro, message, or appear in front of in search.",
  },
  {
    Icon: TrendingUp,
    title: "Stronger recruiter search ranking",
    body: "LinkedIn Recruiter and standard search both weight network size when ranking results. A larger connection base means your profile surfaces higher when recruiters filter by your skills, title, or location — without you spending a cent on LinkedIn ads.",
  },
];

const PERSONAS = [
  {
    eyebrow: "FOR FOUNDERS & SALES LEADERS",
    title: "Open every B2B door without cold outreach.",
    body: "Cold-DM conversion on LinkedIn doubles when prospects see a serious 1st-degree network behind you — and triples when you share mutual connections. Buying 1,000-2,500 connections turns every prospect's profile audit into a warm signal instead of a friction point.",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "FOR JOB SEEKERS & EXECUTIVES",
    title: "Rank higher in recruiter search and InMails.",
    body: "Recruiters pay LinkedIn $10K+/year for Recruiter access — and they spend it filtering candidates by network depth, because a thin network signals career stagnation. A credible connection count puts your profile at the top of their results for the roles you actually want.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "FOR B2B BRANDS & AGENCIES",
    title: "Turn employee profiles into a distribution engine.",
    body: "B2B content distribution on LinkedIn lives or dies on employee advocacy — and employee posts only reach scale when each profile carries a strong 1st-degree network. Building out connection counts across your team multiplies every piece of content you post by 5-10x organically.",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
  },
];

const COMPARE_ROWS = [
  { label: "Real, active LinkedIn profiles", us: true, them: false },
  { label: "Delivery starts in 30 minutes", us: true, them: false },
  { label: "Drip-fed for natural growth curve", us: true, them: false },
  { label: "No password required", us: true, them: true },
  { label: "30-day refill guarantee", us: true, them: false },
  { label: "Lifetime refill (Premium tier)", us: true, them: false },
  { label: "Aged executive profiles (Premium)", us: true, them: false },
  { label: "Compliant with LinkedIn User Agreement", us: true, them: false },
  { label: "24/7 live support", us: true, them: false },
  { label: "Money-back within 7 days", us: true, them: false },
  { label: "B2B invoices on request", us: true, them: false },
];

const REVIEWS = [
  {
    stars: 5,
    text: "Closed three enterprise deals in Q1 that I'd been chasing for over a year — the difference was prospects opening my profile and seeing 4,200 connections instead of 600. Every reply rate metric in my sales cadence jumped within a week.",
    name: "Marcus Liang",
    role: "VP Sales, NorthLedger",
    av: "https://i.pravatar.cc/100?img=12",
  },
  {
    stars: 5,
    text: "Started a new exec job hunt and went from 800 to 7,500 connections over six weeks. Recruiter InMails went from one a month to four a week. The drip pattern was so natural my current employer never noticed a thing.",
    name: "Priya Anand",
    role: "Director of Product",
    av: "https://i.pravatar.cc/100?img=44",
  },
  {
    stars: 5,
    text: "We ran this across our 12-person sales team — every rep got 1,000 connections over a month. Outbound reply rates lifted across the whole team, and the refill held the line through LinkedIn's spring profile audit.",
    name: "Sven Eriksson",
    role: "Head of GTM, agency",
    av: "https://i.pravatar.cc/100?img=47",
  },
];

const RELATED = [
  { label: "Buy LinkedIn Followers", desc: "From $7", Icon: Users, href: "/buy-linkedin-followers" },
  { label: "Buy LinkedIn Likes", desc: "From $4.50", Icon: Heart, href: "/buy-linkedin-likes" },
  { label: "Buy LinkedIn Comments", desc: "From $4", Icon: MessageSquare, href: "/buy-linkedin-comments" },
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "LinkedIn Connections",
  description:
    "Real LinkedIn connections from active, complete professional profiles. Delivery starts in 30 minutes. 30-day refill guarantee. No password required.",
  brand: { "@type": "Brand", name: "Thunderclap" },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "8",
    highPrice: "175",
    offerCount: 8,
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
  mainEntity: LI_FAQS.map((f) => ({
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
    { "@type": "ListItem", position: 2, name: "LinkedIn", item: `${SITE_URL}/buy-linkedin-connections` },
    { "@type": "ListItem", position: 3, name: "Connections", item: CANONICAL },
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

      <LinkedInConnectionsHero />

      <section style={{ padding: "96px 0 32px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
              WHY BUY LINKEDIN CONNECTIONS
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
              On LinkedIn, your connection count is the <span className="grad-text">trust signal</span> behind every cold reach-out.
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
              Built for every stage of your LinkedIn journey.
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
              What founders and operators say after their first order.
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
              Grow more on LinkedIn.
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

      <LinkedInConnectionsFaq />

      <section style={{ padding: "32px 0 80px" }}>
        <div className="container">
          <div className="coral-band">
            <div className="coral-band-bg" />
            <h2>Ready to grow on LinkedIn?</h2>
            <p>
              Pick a package, paste your LinkedIn profile URL, and watch your connection count climb
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
