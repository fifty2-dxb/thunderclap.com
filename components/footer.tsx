import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Music2, Twitter, Youtube } from "lucide-react";

const FOOTER_COLS = [
  {
    title: "Instagram",
    links: [
      { label: "Buy Instagram Followers", href: "/buy-instagram-followers" },
      { label: "Buy Instagram Likes", href: "/buy-instagram-likes" },
      { label: "Buy Instagram Views", href: "/buy-instagram-views" },
      { label: "Buy Instagram Comments", href: "/buy-instagram-comments" },
    ],
  },
  {
    title: "TikTok",
    links: [
      { label: "Buy TikTok Followers", href: "/buy-tiktok-followers" },
      { label: "Buy TikTok Likes", href: "/buy-tiktok-likes" },
      { label: "Buy TikTok Views", href: "/buy-tiktok-views" },
    ],
  },
  {
    title: "YouTube",
    links: [
      { label: "Buy YouTube Subscribers", href: "/buy-youtube-subscribers" },
      { label: "Buy YouTube Likes", href: "/buy-youtube-likes" },
      { label: "Buy YouTube Views", href: "/buy-youtube-views" },
    ],
  },
  {
    title: "Facebook",
    links: [
      { label: "Buy Facebook Followers", href: "/buy-facebook-followers" },
      { label: "Buy Facebook Likes", href: "/buy-facebook-likes" },
      { label: "Buy Facebook Views", href: "/buy-facebook-views" },
    ],
  },
  {
    title: "Twitter / X",
    links: [
      { label: "Buy Twitter Followers", href: "/buy-twitter-followers" },
      { label: "Buy Twitter Likes", href: "/buy-twitter-likes" },
      { label: "Buy Twitter Retweets", href: "/buy-twitter-retweets" },
    ],
  },
  {
    title: "LinkedIn",
    links: [
      { label: "Buy LinkedIn Connections", href: "/buy-linkedin-connections" },
      { label: "Buy LinkedIn Followers", href: "/buy-linkedin-followers" },
      { label: "Buy LinkedIn Likes", href: "/buy-linkedin-likes" },
      { label: "Buy LinkedIn Comments", href: "/buy-linkedin-comments" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/aboutus" },
      { label: "Team", href: "/team" },
      { label: "Blog", href: "/blog" },
      { label: "FAQs", href: "/faqs" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Refund policy", href: "/refund" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", Icon: Instagram },
  { label: "TikTok", Icon: Music2 },
  { label: "Facebook", Icon: Facebook },
  { label: "Twitter / X", Icon: Twitter },
  { label: "YouTube", Icon: Youtube },
];

// Real brand payment marks (inline SVG) rendered in the footer-bottom row.
const PAYMENTS: { label: string; mark: ReactNode }[] = [
  {
    label: "Visa",
    mark: (
      <svg viewBox="0 0 48 16" height={15} role="img" aria-label="Visa">
        <text
          x="24"
          y="13"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="15"
          fontWeight="700"
          fontStyle="italic"
          letterSpacing="0.5"
          fill="#1434CB"
        >
          VISA
        </text>
      </svg>
    ),
  },
  {
    label: "Mastercard",
    mark: (
      <svg viewBox="0 0 36 24" height={18} role="img" aria-label="Mastercard">
        <circle cx="14" cy="12" r="9" fill="#EB001B" />
        <circle cx="22" cy="12" r="9" fill="#F79E1B" />
        <path d="M18 5.1a9 9 0 0 0 0 13.8 9 9 0 0 0 0-13.8Z" fill="#FF5F00" />
      </svg>
    ),
  },
  {
    label: "American Express",
    mark: (
      <svg viewBox="0 0 40 24" height={18} role="img" aria-label="American Express">
        <rect width="40" height="24" rx="3" fill="#1F72CD" />
        <text
          x="20"
          y="15.5"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="9"
          fontWeight="800"
          letterSpacing="0.4"
          fill="#fff"
        >
          AMEX
        </text>
      </svg>
    ),
  },
  {
    label: "Apple Pay",
    mark: (
      <svg viewBox="0 0 58 24" height={17} role="img" aria-label="Apple Pay">
        <path
          fill="#000"
          d="M14.47 4.34c.72-.87 1.2-2.07 1.07-3.27-1.03.04-2.28.69-3.02 1.55-.66.76-1.24 1.99-1.08 3.16 1.15.09 2.32-.58 3.03-1.44M17.05 12.04c-.03-2.6 2.13-3.85 2.22-3.91-1.21-1.77-3.1-2.01-3.77-2.04-1.6-.16-3.13.94-3.94.94-.81 0-1.85-.92-3.05-.9-1.57.03-3.02.91-3.83 2.32-1.63 2.83-.42 7.02 1.17 9.32.78 1.13 1.7 2.39 2.91 2.34 1.17-.05 1.61-.76 3.02-.76 1.41 0 1.81.76 3.05.73 1.26-.02 2.06-1.14 2.83-2.28.89-1.31 1.26-2.58 1.28-2.65-.03-.01-2.45-.94-2.47-3.72"
        />
        <text x="24" y="17" fontFamily="Arial, Helvetica, sans-serif" fontSize="15" fontWeight="600" fill="#000">
          Pay
        </text>
      </svg>
    ),
  },
  {
    label: "Google Pay",
    mark: (
      <svg viewBox="0 0 58 24" height={17} role="img" aria-label="Google Pay">
        <g transform="translate(0,1) scale(0.46)">
          <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
          <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
          <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
          <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
        </g>
        <text x="25" y="17" fontFamily="Arial, Helvetica, sans-serif" fontSize="14" fontWeight="500" fill="#5F6368">
          Pay
        </text>
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="footer-light">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Image
              src="/logo.webp"
              alt="Thunderclap"
              width={120}
              height={24}
              style={{ height: 24, width: "auto", marginBottom: 18 }}
            />
            <p
              style={{
                color: "var(--uv-fg-3)",
                fontSize: 14,
                lineHeight: 1.65,
                maxWidth: 320,
                margin: "0 0 18px",
              }}
            >
              Real social media growth — followers, likes, and views from active users. Trusted by
              200,000+ creators &amp; brands worldwide.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="footer-social"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 999,
                    border: "1px solid var(--uv-line-strong)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--uv-fg-2)",
                    transition: "border-color 160ms, color 160ms",
                  }}
                >
                  <s.Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          {FOOTER_COLS.map((col) => (
            <div className="footer-col-light" key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map((l) => (
                <Link key={l.label} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span style={{ fontSize: 13, color: "var(--uv-fg-3)" }}>
            © 2026 Thunderclap, Inc. · Strocil LLC
          </span>
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            {PAYMENTS.map((p) => (
              <span
                key={p.label}
                title={p.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 30,
                  padding: "0 9px",
                  background: "#fff",
                  border: "1px solid var(--uv-line)",
                  borderRadius: 6,
                }}
              >
                {p.mark}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
