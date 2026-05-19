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
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", Icon: Instagram },
  { label: "TikTok", Icon: Music2 },
  { label: "Facebook", Icon: Facebook },
  { label: "Twitter", Icon: Twitter },
  { label: "YouTube", Icon: Youtube },
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
                    width: 36,
                    height: 36,
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
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {["VISA", "MASTERCARD", "AMEX", "APPLE PAY", "G PAY"].map((p) => (
              <span
                key={p}
                style={{
                  padding: "4px 10px",
                  background: "#fff",
                  border: "1px solid var(--uv-line)",
                  borderRadius: 6,
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  color: "var(--uv-fg-2)",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
