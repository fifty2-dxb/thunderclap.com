import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Mail } from "lucide-react";
import { SITE_URL } from "@/lib/seo";

const URL_PATH = "/blog";
const CANONICAL = `${SITE_URL}${URL_PATH}`;

export const metadata: Metadata = {
  title: "Blog — Growth playbooks for Instagram, TikTok & YouTube · Thunderclap",
  description:
    "Practical, no-fluff growth playbooks for creators and brands building on Instagram, TikTok, YouTube, Facebook and X. Fresh posts coming soon.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Blog — Growth playbooks · Thunderclap",
    description:
      "Practical, no-fluff growth playbooks for creators and brands. Fresh posts coming soon.",
    url: CANONICAL,
    siteName: "Thunderclap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Growth playbooks · Thunderclap",
    description: "Practical growth playbooks for creators and brands.",
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Thunderclap Blog",
  url: CANONICAL,
  description: "Growth playbooks for Instagram, TikTok, YouTube, Facebook and X.",
  blogPost: [],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: CANONICAL },
  ],
};

const COMING_SOON = [
  {
    eyebrow: "Instagram",
    title: "How to engineer a Reel for the Explore page in 2026",
    blurb:
      "The 7 retention checkpoints Meta's algorithm actually scores, and the editing template we use to hit every one of them.",
  },
  {
    eyebrow: "TikTok",
    title: "Why your FYP reach died — and the 3-day recovery playbook",
    blurb:
      "Shadow-bans aren't real. Velocity penalties are. What to do when impressions tank without a strike.",
  },
  {
    eyebrow: "YouTube",
    title: "From 0 to monetised: the 14-video YPP sprint",
    blurb:
      "Hit 1,000 subs + 4,000 watch hours in one quarter without burning out. The exact upload calendar that worked for 87 of our test channels.",
  },
];

export default function Page() {
  return (
    <main>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section style={{ background: "var(--uv-bg-lavender)", padding: "72px 0 56px" }}>
        <div className="container">
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              color: "var(--uv-fg-3)",
              marginBottom: 22,
            }}
          >
            <Link href="/" style={{ color: "var(--uv-fg-3)" }}>
              Home
            </Link>
            <span style={{ opacity: 0.4 }}>›</span>
            <span style={{ color: "var(--uv-fg-1)", fontWeight: 600 }}>Blog</span>
          </nav>

          <span
            className="uv-eyebrow"
            style={{ color: "var(--uv-pink)", letterSpacing: "0.08em" }}
          >
            BLOG · GROWTH PLAYBOOKS
          </span>
          <h1
            style={{
              fontFamily: "var(--uv-font-display)",
              fontSize: 60,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              margin: "12px 0 18px",
              maxWidth: 820,
              textWrap: "balance",
            }}
          >
            Notes on going <span className="grad-text">big on social</span>.
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--uv-fg-2)",
              margin: 0,
              maxWidth: 640,
              textWrap: "pretty",
            }}
          >
            Practical, no-fluff growth playbooks for creators and brands building on Instagram,
            TikTok, YouTube, Facebook and X. We&rsquo;re lining up the first posts now —
            check back soon, or grab the email list to know the moment they drop.
          </p>
        </div>
      </section>

      <section style={{ padding: "72px 0 32px" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 28,
            }}
          >
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "var(--uv-pink-soft)",
                color: "var(--uv-pink)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-hidden
            >
              <BookOpen size={18} />
            </span>
            <div>
              <div
                style={{
                  fontFamily: "var(--uv-font-display)",
                  fontWeight: 800,
                  fontSize: 20,
                  color: "var(--uv-fg-1)",
                  letterSpacing: "-0.01em",
                }}
              >
                First three posts, on the way
              </div>
              <div style={{ fontSize: 13.5, color: "var(--uv-fg-3)", marginTop: 2 }}>
                Drafts in review with the growth team.
              </div>
            </div>
          </div>

          <div className="related-grid">
            {COMING_SOON.map((p) => (
              <article
                key={p.title}
                style={{
                  background: "#fff",
                  border: "1px solid var(--uv-line)",
                  borderRadius: 16,
                  padding: 22,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span
                  className="uv-eyebrow"
                  style={{ color: "var(--uv-pink)", letterSpacing: "0.08em", fontSize: 11 }}
                >
                  {p.eyebrow.toUpperCase()}
                </span>
                <h2
                  style={{
                    fontFamily: "var(--uv-font-display)",
                    fontSize: 19,
                    fontWeight: 800,
                    letterSpacing: "-0.015em",
                    lineHeight: 1.2,
                    margin: 0,
                    color: "var(--uv-fg-1)",
                  }}
                >
                  {p.title}
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "var(--uv-fg-3)",
                    textWrap: "pretty",
                  }}
                >
                  {p.blurb}
                </p>
                <div style={{ marginTop: "auto", paddingTop: 8 }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 12px",
                      borderRadius: 999,
                      background: "var(--uv-bg-tint)",
                      color: "var(--uv-fg-3)",
                      fontSize: 11.5,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Coming soon
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "32px 0 80px" }}>
        <div className="container">
          <div className="coral-band">
            <div className="coral-band-bg" />
            <span
              aria-hidden
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
              }}
            >
              <Mail size={20} />
            </span>
            <h2>Be the first to read the next post.</h2>
            <p>
              While we line up the first stories, you can start growing today — every package
              ships drip-fed from real accounts with a 30-day refill guarantee.
            </p>
            <div
              style={{
                display: "inline-flex",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Link href="/" className="btn btn-md coral-btn-light">
                See all services
                <ArrowRight size={16} style={{ marginLeft: 6 }} />
              </Link>
              <Link href="/buy-instagram-followers" className="btn btn-md coral-btn-ghost">
                Start with Instagram
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
