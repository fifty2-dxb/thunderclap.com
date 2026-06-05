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
import { LinkedInFollowersHero, LinkedInFollowersFaq } from "./_builder";
import { LI_FAQS } from "./_faqs";

const URL_PATH = "/buy-linkedin-followers/";
const CANONICAL = `${SITE_URL}${URL_PATH}`;

export const metadata: Metadata = {
  title: "Buy LinkedIn Followers — Real, Fast, Safe · Thunderclap",
  description:
    "Buy real LinkedIn followers from active professional profiles. Delivery starts in 5 minutes. 30-day refill guarantee. No password required. Trusted by 200,000+ founders, consultants, and B2B brands.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Buy LinkedIn Followers — Real, Fast, Safe · Thunderclap",
    description:
      "Real LinkedIn followers from active professional profiles. Delivery starts in 5 minutes, drip-fed for a safe, organic growth curve. 30-day refill guarantee.",
    url: CANONICAL,
    siteName: "Thunderclap",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1600&q=80",
        width: 1600,
        height: 900,
        alt: "Buy LinkedIn followers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy LinkedIn Followers — Real, Fast, Safe · Thunderclap",
    description:
      "Real LinkedIn followers, delivered in minutes. 30-day refill guarantee. No password required.",
  },
};

const BENEFITS = [
  {
    Icon: BadgeCheck,
    title: "Credibility for B2B buyers",
    body: "When a procurement lead, recruiter, or investor lands on your LinkedIn profile, your follower count is the first signal they read. A serious number tells them you're worth a meeting before they scroll past your headline — and it changes the reply rate on every cold outreach you send.",
  },
  {
    Icon: TrendingUp,
    title: "More reach on every post",
    body: "LinkedIn's feed algorithm decides whether to push your post beyond your network based on engagement velocity in the first hour. A larger follower base is the multiplier on that initial reach — bigger base, more impressions, more compounding distribution to the second-degree network.",
  },
  {
    Icon: UserPlus,
    title: "Inbound leads on autopilot",
    body: "Senior buyers DM founders with serious follower counts because the count is a proxy for trust. Adding zeros to your follower number is the single cheapest way to convert your profile from a static résumé into a top-of-funnel that brings inbound demo requests every week.",
  },
];

const PERSONAS = [
  {
    eyebrow: "FOR B2B FOUNDERS & CONSULTANTS",
    title: "Turn your profile into a top-of-funnel.",
    body: "B2B buyers vet you on LinkedIn before they ever take a call. Buying your first 2,500-10,000 followers makes your founder narrative look established the moment a procurement team or VP opens your profile — and changes the reply rate on every cold outbound you send.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "FOR JOB SEEKERS & EXECUTIVES",
    title: "Get found by recruiters faster.",
    body: "LinkedIn Recruiter ranks profiles partly by follower count and Social Selling Index. A higher number puts you in front of more in-house recruiters and head-hunters per week, and gives every recommendation on your profile more authority when the hiring manager audits you.",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "FOR AGENCIES & PERSONAL BRANDS",
    title: "Make every campaign and newsletter land harder.",
    body: "Sponsored posts, LinkedIn Newsletters, and event invites all compound off your follower base. A credible count is the cheapest CRO improvement on your LinkedIn ad spend — and it pays back across every campaign and content drop you run after.",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
  },
];

const COMPARE_ROWS = [
  { label: "Real, active professional profiles", us: true, them: false },
  { label: "Delivery starts in 5 minutes", us: true, them: false },
  { label: "Drip-fed for natural growth curve", us: true, them: false },
  { label: "No password required", us: true, them: true },
  { label: "30-day refill guarantee", us: true, them: false },
  { label: "Lifetime refill (Premium tier)", us: true, them: false },
  { label: "Aged & senior-title account mix (Premium)", us: true, them: false },
  { label: "Compliant with LinkedIn User Agreement", us: true, them: false },
  { label: "24/7 live support", us: true, them: false },
  { label: "Money-back within 7 days", us: true, them: false },
  { label: "Transparent pricing — no upsells", us: true, them: false },
];

const REVIEWS = [
  {
    stars: 5,
    text: "Used Thunderclap before relaunching our consulting brand on LinkedIn. Went from 1,200 to 14K followers across a quarter and inbound demo requests doubled within six weeks. The drip pattern was so natural I genuinely couldn't have spotted the order myself.",
    name: "Mariana Pereira",
    role: "Founder, North Bridge Advisory",
    av: "https://i.pravatar.cc/100?img=32",
  },
  {
    stars: 5,
    text: "I'm a Director-level IC looking for the next role. After Thunderclap pushed me past 8K followers, my InMail volume from recruiters more than tripled. The Premium tier was worth every cent for the senior-title mix — recruiters absolutely scan who's following you.",
    name: "Adesh Pillai",
    role: "Director of Engineering",
    av: "https://i.pravatar.cc/100?img=15",
  },
  {
    stars: 5,
    text: "Tried two other LinkedIn growth services first — both dropped half the count inside a week and one nearly got my profile restricted. Thunderclap is the only one where the followers stuck, and the refill held the line through LinkedIn's spring cleanup wave.",
    name: "Eve Hartmann",
    role: "Head of growth, B2B SaaS",
    av: "https://i.pravatar.cc/100?img=49",
  },
];

const RELATED = [
  { label: "Buy LinkedIn Connections", desc: "From $8", Icon: UserPlus, href: "/buy-linkedin-connections" },
  { label: "Buy LinkedIn Likes", desc: "From $4.50", Icon: Heart, href: "/buy-linkedin-likes" },
  { label: "Buy LinkedIn Comments", desc: "From $4", Icon: MessageSquare, href: "/buy-linkedin-comments" },
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "LinkedIn Followers",
  description:
    "Real LinkedIn followers from active professional profiles. Delivery starts in 5 minutes. 30-day refill guarantee. No password required.",
  brand: { "@type": "Brand", name: "Thunderclap" },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "7",
    highPrice: "319",
    offerCount: 6,
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
    { "@type": "ListItem", position: 2, name: "LinkedIn", item: `${SITE_URL}/buy-linkedin-followers` },
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

      <LinkedInFollowersHero />

      <section style={{ padding: "96px 0 32px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
              WHY BUY LINKEDIN FOLLOWERS
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
              On LinkedIn, your follower count is the <span className="grad-text">trust signal</span> every buyer checks first.
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

      <LinkedInFollowersFaq />

      <section style={{ padding: "32px 0 80px" }}>
        <div className="container">
          <div className="coral-band">
            <div className="coral-band-bg" />
            <h2>Ready to grow on LinkedIn?</h2>
            <p>
              Pick a package, paste your profile URL, and watch your follower count climb within
              the hour.
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
