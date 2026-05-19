import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Users } from "lucide-react";
import { SITE_URL } from "@/lib/seo";

const URL_PATH = "/team/";
const CANONICAL = `${SITE_URL}${URL_PATH}`;

const DESCRIPTION =
  "Meet the founder and the team behind Thunderclap — the people building authentic social media growth for creators worldwide.";

export const metadata: Metadata = {
  title: "Our team · Thunderclap",
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Our team · Thunderclap",
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Thunderclap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our team · Thunderclap",
    description: DESCRIPTION,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Team", item: CANONICAL },
  ],
};

type Member = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  gradient: string;
};

const FOUNDER: Member = {
  name: "Lucas Zhao",
  role: "Founder & CEO",
  bio: "Lucas founded Thunderclap after completing his MBA in marketing at the University of Pennsylvania. With 20+ years in brand marketing, he now leads the SMM industry through Thunderclap — building the platform he wished existed when he started.",
  initials: "LZ",
  gradient: "linear-gradient(135deg, #ef4655 0%, #f59e0b 100%)",
};

const TEAM: Member[] = [
  {
    name: "Selina Katoozian",
    role: "Digital & Social Media Lead",
    bio: "Leads cross-platform campaign strategy and growth experiments across every channel we ship on.",
    initials: "SK",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
  },
  {
    name: "Jayden Gomez",
    role: "TikTok & YouTube Expert",
    bio: "Owns delivery quality for our highest-volume TikTok and YouTube services. FYP whisperer.",
    initials: "JG",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #ef4655 100%)",
  },
  {
    name: "Elizabeth Ray",
    role: "Instagram & Facebook Expert",
    bio: "Heads Meta-side service quality — Reels, posts, story views and follower drip rates.",
    initials: "ER",
    gradient: "linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)",
  },
  {
    name: "Nahal Scott",
    role: "Twitter / X & Threads Expert",
    bio: "Calibrates retweet velocity and Threads engagement curves so growth lands organic.",
    initials: "NS",
    gradient: "linear-gradient(135deg, #111827 0%, #475569 100%)",
  },
  {
    name: "Maria Williams",
    role: "Influencer Marketing Lead",
    bio: "Liaises with the creator partnerships that power our higher-tier Influencer services.",
    initials: "MW",
    gradient: "linear-gradient(135deg, #14b8a6 0%, #6366f1 100%)",
  },
];

const EDITORIAL: Member[] = [
  {
    name: "Daniel R.",
    role: "Senior Author",
    bio: "More than just a tech expert — Daniel is a visionary, mentor and beacon in the ever-expanding digital universe.",
    initials: "DR",
    gradient: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
  },
  {
    name: "Samuel B. Gillham",
    role: "Author",
    bio: "Tech expertise paired with sharp narratives about growth in the digital age.",
    initials: "SG",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4655 100%)",
  },
  {
    name: "Rebecca Adley",
    role: "Author",
    bio: "Began her career in digital marketing agencies exploring SEO and online visibility, now writes deep dives for our growth blog.",
    initials: "RA",
    gradient: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
  },
];

function TeamCard({ m }: { m: Member }) {
  return (
    <div className="team-card">
      <div className="team-avatar" style={{ background: m.gradient }} aria-hidden>
        {m.initials}
      </div>
      <div className="team-role">{m.role}</div>
      <div className="team-name">{m.name}</div>
      <p className="team-bio">{m.bio}</p>
    </div>
  );
}

export default function Page() {
  return (
    <main>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero on warm cream */}
      <section
        style={{
          background: "var(--uv-bg-lavender)",
          padding: "96px 0 80px",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
            <Sparkles size={14} /> THE PEOPLE BEHIND THUNDERCLAP
          </span>
          <h1
            style={{
              fontFamily: "var(--uv-font-display)",
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              margin: "16px auto 18px",
              maxWidth: 880,
              textWrap: "balance",
            }}
          >
            Meet the <span className="grad-text">team</span> behind Thunderclap
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--uv-fg-2)",
              maxWidth: 680,
              margin: "0 auto",
              textWrap: "pretty",
            }}
          >
            We&apos;re a global crew working around the clock to ship authentic social media growth
            for creators, brands and influencers — 4 million strong and counting.
          </p>
        </div>
      </section>

      {/* The Founder */}
      <section style={{ padding: "96px 0 32px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
              LEADERSHIP
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
              The Founder
            </h2>
          </div>

          <div className="team-founder">
            <div
              className="team-avatar team-avatar-lg"
              style={{ background: FOUNDER.gradient }}
              aria-hidden
            >
              {FOUNDER.initials}
            </div>
            <div className="team-founder-body">
              <div className="team-role">{FOUNDER.role}</div>
              <div className="team-name team-name-lg">{FOUNDER.name}</div>
              <p className="team-bio team-bio-lg">{FOUNDER.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Thunderclap team */}
      <section style={{ padding: "64px 0", background: "var(--uv-bg-lavender)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
              <Users size={14} /> WORLDWIDE CREW
            </span>
            <h2
              style={{
                fontFamily: "var(--uv-font-display)",
                fontSize: 40,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                margin: "10px auto 12px",
                maxWidth: 720,
                textWrap: "balance",
              }}
            >
              The Thunderclap team
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.6,
                color: "var(--uv-fg-2)",
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              A 24/7 crew of platform experts shipping orders around the world.
            </p>
          </div>

          <div className="team-grid">
            {TEAM.map((m) => (
              <TeamCard key={m.name} m={m} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section style={{ padding: "96px 0 64px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
              WRITERS
            </span>
            <h2
              style={{
                fontFamily: "var(--uv-font-display)",
                fontSize: 40,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                margin: "10px auto 12px",
                maxWidth: 720,
                textWrap: "balance",
              }}
            >
              Editorial
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.6,
                color: "var(--uv-fg-2)",
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              Our writers translate platform changes into plain English for our blog.
            </p>
          </div>

          <div className="team-grid">
            {EDITORIAL.map((m) => (
              <TeamCard key={m.name} m={m} />
            ))}
          </div>
        </div>
      </section>

      {/* Coral CTA band */}
      <section style={{ padding: "32px 0 80px" }}>
        <div className="container">
          <div className="coral-band">
            <div className="coral-band-bg" />
            <h2>Want to work with us?</h2>
            <p>
              We&apos;re hiring across growth ops, fulfillment, and editorial. Email
              careers@thunderclap.com.
            </p>
            <div
              style={{
                display: "inline-flex",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <a
                href="mailto:careers@thunderclap.com"
                className="btn btn-md coral-btn-light"
              >
                See open roles
              </a>
              <Link
                href="/buy-instagram-followers"
                className="btn btn-md coral-btn-ghost"
              >
                Try our services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
