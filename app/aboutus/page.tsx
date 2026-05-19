import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Clock,
  Eye,
  Headphones,
  Heart,
  Lock,
  RefreshCcw,
  RotateCcw,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { SITE_URL } from "@/lib/seo";

const URL_PATH = "/aboutus/";
const CANONICAL = `${SITE_URL}${URL_PATH}`;

export const metadata: Metadata = {
  title: "About Thunderclap — Helping Millions Grow Social Media Profiles",
  description:
    "For over a decade, Thunderclap has been the trusted growth partner for 4M+ creators, brands and influencers. Real engagement, no bots, no passwords.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "About Thunderclap — Helping Millions Grow Social Media Profiles",
    description:
      "Trusted by 4M+ creators, brands and influencers for real social media growth. Authentic engagement, transparent guarantees, 24/7 support.",
    url: CANONICAL,
    siteName: "Thunderclap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Thunderclap — Helping Millions Grow Social Media Profiles",
    description:
      "A decade of authentic social media growth for 4M+ creators, brands and influencers.",
  },
};

const STATS: { value: string; label: string; Icon: typeof Users }[] = [
  { value: "4M+", label: "Happy users", Icon: Users },
  { value: "4×", label: "Content reach", Icon: TrendingUp },
  { value: "10×", label: "Engagement", Icon: Heart },
  { value: "24/7", label: "Customer support", Icon: Clock },
  { value: "100+", label: "Support agents", Icon: Headphones },
  { value: "7-day", label: "Refund policy", Icon: RotateCcw },
  { value: "100%", label: "Privacy assurance", Icon: Lock },
  { value: "4.7", label: "Trustpilot rating", Icon: Star },
];

const WHY_CARDS: { Icon: typeof Zap; title: string; body: string }[] = [
  {
    Icon: Zap,
    title: "Lightning-quick results",
    body: "Rapid, tangible growth, ensuring quick and efficient results.",
  },
  {
    Icon: Wallet,
    title: "Unbeatable rates",
    body: "Cost-effective genuine growth that elevates influence.",
  },
  {
    Icon: TrendingUp,
    title: "Expanded reach",
    body: "Broaden your audience across every platform you ship on.",
  },
  {
    Icon: ShieldCheck,
    title: "100% risk-free",
    body: "Security and authenticity guaranteed at every step.",
  },
  {
    Icon: Shield,
    title: "Safety first",
    body: "Your account integrity comes before everything.",
  },
];

const NUMBER_ONE_ITEMS: string[] = [
  "100% real services",
  "Trusted by millions",
  "No bots or fake engagement",
  "No password required",
  "Safe and secure (SSL-encrypted)",
  "24/7 customer support",
  "No drop-off",
  "Transparent 7-day refund policy",
  "Consistent, sustained growth",
];

const GUARANTEES: { Icon: typeof Lock; title: string; body: string }[] = [
  {
    Icon: Lock,
    title: "Privacy guarantee",
    body: "Stringent protocols protect your information and account details.",
  },
  {
    Icon: RefreshCcw,
    title: "Refill guarantee",
    body: "Free top-up if any engagement drops within the guarantee window.",
  },
  {
    Icon: Wallet,
    title: "Refund guarantee",
    body: "Unsatisfied? A clear refund policy puts your contentment first.",
  },
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Thunderclap",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
  description:
    "Thunderclap is a trusted social media growth partner for creators, brands and influencers — real engagement, no bots, no passwords.",
  foundingDate: "2014",
  sameAs: [
    "https://www.trustpilot.com/review/thunderclap.com",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: ["English"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "About us", item: CANONICAL },
  ],
};

export default function Page() {
  return (
    <main>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* HERO ------------------------------------------------------------- */}
      <section style={{ background: "var(--uv-bg-lavender)", padding: "96px 0 80px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
            ABOUT THUNDERCLAP
          </span>
          <h1
            style={{
              fontFamily: "var(--uv-font-display)",
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              margin: "14px auto 18px",
              maxWidth: 980,
              textWrap: "balance",
            }}
          >
            Helping <span className="grad-text">millions</span> grow social media profiles
          </h1>
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.6,
              color: "var(--uv-fg-2)",
              maxWidth: 720,
              margin: "0 auto",
              textWrap: "pretty",
            }}
          >
            For over a decade, Thunderclap has been the trusted growth partner for 4M+ creators,
            brands and influencers. Real engagement, no bots, no passwords.
          </p>
        </div>
      </section>

      {/* STATS STRIP ------------------------------------------------------ */}
      <section style={{ padding: "64px 0", background: "var(--uv-bg)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
            }}
            className="about-stats-grid"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "var(--uv-bg-lavender)",
                  borderRadius: 16,
                  padding: "22px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "var(--uv-pink-soft)",
                    color: "var(--uv-pink)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <s.Icon size={18} />
                </span>
                <div
                  style={{
                    fontFamily: "var(--uv-font-display)",
                    fontSize: 28,
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    color: "var(--uv-fg-1)",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "var(--uv-fg-3)",
                    lineHeight: 1.4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 980px) {
            .about-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 480px) {
            .about-stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          }
        `}</style>
      </section>

      {/* OUR STORY -------------------------------------------------------- */}
      <section style={{ padding: "64px 0" }}>
        <div className="container container-narrow" style={{ textAlign: "center" }}>
          <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
            OUR STORY
          </span>
          <h2
            style={{
              fontFamily: "var(--uv-font-display)",
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: "10px auto 18px",
              maxWidth: 720,
              textWrap: "balance",
            }}
          >
            Our <span className="grad-text">story</span>
          </h2>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: "var(--uv-fg-2)",
              maxWidth: 720,
              margin: "0 auto",
              textWrap: "pretty",
            }}
          >
            Over a decade ago, we set out to redefine what authentic social media growth could look
            like. From humble beginnings to serving millions, we&apos;ve stayed founded on the same
            principles: real growth, genuine engagement, no shortcuts.
          </p>
        </div>
      </section>

      {/* VISION + MISSION ------------------------------------------------- */}
      <section style={{ padding: "32px 0 80px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}
            className="about-vm-grid"
          >
            <div
              style={{
                background: "var(--uv-bg-lavender)",
                borderRadius: 20,
                padding: "32px 28px",
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
                  marginBottom: 16,
                }}
              >
                <Eye size={20} />
              </span>
              <h3
                style={{
                  fontFamily: "var(--uv-font-display)",
                  fontSize: 24,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  margin: "0 0 10px",
                  color: "var(--uv-fg-1)",
                }}
              >
                Our vision
              </h3>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: "var(--uv-fg-2)",
                  margin: 0,
                  textWrap: "pretty",
                }}
              >
                Be the go-to platform for creators, brands and influencers seeking real social
                media growth — prioritizing genuine engagement and authentic connections.
              </p>
            </div>

            <div
              style={{
                background: "var(--uv-bg-lavender)",
                borderRadius: 20,
                padding: "32px 28px",
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
                  marginBottom: 16,
                }}
              >
                <Target size={20} />
              </span>
              <h3
                style={{
                  fontFamily: "var(--uv-font-display)",
                  fontSize: 24,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  margin: "0 0 10px",
                  color: "var(--uv-fg-1)",
                }}
              >
                Our mission
              </h3>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: "var(--uv-fg-2)",
                  margin: 0,
                  textWrap: "pretty",
                }}
              >
                Empower creators, marketers, brands and influencers with growth services —
                authentic likes, views and followers — so they can maximize presence, engagement,
                revenue and growth on every platform.
              </p>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 980px) {
            .about-vm-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* WHY CHOOSE THUNDERCLAP ------------------------------------------- */}
      <section style={{ padding: "64px 0", background: "var(--uv-bg-lavender)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
              WHY CHOOSE THUNDERCLAP
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
              Five reasons creators stick with <span className="grad-text">Thunderclap</span>.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
            className="about-why-grid"
          >
            {WHY_CARDS.map((w) => (
              <div key={w.title} className="why-card-clean">
                <div className="why-icon">
                  <w.Icon size={20} />
                </div>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1080px) {
            .about-why-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 640px) {
            .about-why-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* WHAT MAKES US #1 ------------------------------------------------- */}
      <section style={{ padding: "96px 0 32px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
              WHAT MAKES US #1
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
              Every box checked — none of the <span className="grad-text">shortcuts</span>.
            </h2>
          </div>

          <div
            style={{
              maxWidth: 720,
              margin: "0 auto",
              background: "#fff",
              border: "1px solid var(--uv-line, #e8eaef)",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
            }}
          >
            {NUMBER_ONE_ITEMS.map((item, i) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "18px 22px",
                  borderTop: i === 0 ? "none" : "1px solid #eef0f4",
                  background: i % 2 ? "#fcfcfd" : "#fff",
                }}
              >
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
                    flexShrink: 0,
                  }}
                >
                  <Check size={14} />
                </span>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: "var(--uv-fg-1)",
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR THREE GUARANTEES --------------------------------------------- */}
      <section style={{ padding: "96px 0 64px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
              OUR THREE GUARANTEES
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
              Three promises we <span className="grad-text">stand by</span>.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
            className="about-guarantee-grid"
          >
            {GUARANTEES.map((g) => (
              <div key={g.title} className="why-card-clean">
                <div className="why-icon">
                  <g.Icon size={20} />
                </div>
                <h3>{g.title}</h3>
                <p>{g.body}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 980px) {
            .about-guarantee-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* CORAL CTA -------------------------------------------------------- */}
      <section style={{ padding: "32px 0 80px" }}>
        <div className="container">
          <div className="coral-band">
            <div className="coral-band-bg" />
            <h2>Ready to grow?</h2>
            <p>Pick a service, place an order, watch the engagement flow in.</p>
            <div
              style={{
                display: "inline-flex",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Link href="/buy-instagram-followers" className="btn btn-primary btn-lg">
                <Sparkles size={16} style={{ marginRight: 8 }} />
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
