import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Service = {
  platformId: "instagram" | "tiktok" | "youtube" | "facebook" | "twitter";
  platformName: string;
  service: string;
  href: string;
  price: string;
  popular?: boolean;
  brand: ReactNode;
  bg: string;
};

const InstagramBrand = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="#fff" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
  </svg>
);
const TikTokBrand = (
  <svg width="12" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M16.5 3.5c.4 1.6 1.5 3 3.4 3.3v2.4c-1.3 0-2.5-.3-3.6-1v6.4a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .8.1v2.5a3.2 3.2 0 1 0 2.4 3.1V3.5h2.7z"
      fill="#fff"
    />
  </svg>
);
const YouTubeBrand = (
  <svg width="16" height="11" viewBox="0 0 24 17" fill="none">
    <path
      d="M23.5 2.6c-.3-1-1-1.8-2-2C19.6 0 12 0 12 0S4.4 0 2.5.6c-1 .3-1.8 1-2 2C0 4.6 0 8.5 0 8.5s0 3.9.5 5.9c.3 1 1 1.8 2 2C4.4 17 12 17 12 17s7.6 0 9.5-.6c1-.3 1.8-1 2-2 .5-2 .5-5.9.5-5.9s0-3.9-.5-5.9z"
      fill="#fff"
    />
    <path d="M9.5 12V5l6.5 3.5L9.5 12z" fill="#ff0000" />
  </svg>
);
const FacebookBrand = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M13.5 22v-8.4h2.8l.4-3.3h-3.2V8.2c0-.95.27-1.6 1.65-1.6h1.76V3.7c-.85-.1-1.7-.15-2.55-.15-2.52 0-4.25 1.55-4.25 4.4v2.45H7.27v3.3h2.86V22h3.37z"
      fill="#fff"
    />
  </svg>
);
const TwitterBrand = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <path
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zM17.083 19.77h1.833L7.084 4.126H5.117L17.083 19.77z"
      fill="#fff"
    />
  </svg>
);

const IG_BG = "linear-gradient(135deg,#feda77 0%,#f58529 35%,#dd2a7b 65%,#8134af 100%)";

const SERVICES: Service[] = [
  { platformId: "instagram", platformName: "Instagram", service: "Followers", href: "/buy-instagram-followers", price: "$3.49", popular: true, brand: InstagramBrand, bg: IG_BG },
  { platformId: "instagram", platformName: "Instagram", service: "Likes",     href: "/buy-instagram-likes",     price: "$1.99", brand: InstagramBrand, bg: IG_BG },
  { platformId: "instagram", platformName: "Instagram", service: "Views",     href: "/buy-instagram-views",     price: "$2.49", brand: InstagramBrand, bg: IG_BG },
  { platformId: "tiktok",    platformName: "TikTok",    service: "Followers", href: "/buy-tiktok-followers",    price: "$5.99", popular: true, brand: TikTokBrand, bg: "#000" },
  { platformId: "tiktok",    platformName: "TikTok",    service: "Likes",     href: "/buy-tiktok-likes",        price: "$2.99", brand: TikTokBrand, bg: "#000" },
  { platformId: "tiktok",    platformName: "TikTok",    service: "Views",     href: "/buy-tiktok-views",        price: "$1.99", brand: TikTokBrand, bg: "#000" },
  { platformId: "youtube",   platformName: "YouTube",   service: "Subscribers", href: "/buy-youtube-subscribers", price: "$6.99", brand: YouTubeBrand, bg: "#FF0000" },
  { platformId: "youtube",   platformName: "YouTube",   service: "Likes",     href: "/buy-youtube-likes",       price: "$2.99", brand: YouTubeBrand, bg: "#FF0000" },
  { platformId: "youtube",   platformName: "YouTube",   service: "Views",     href: "/buy-youtube-views",       price: "$2.49", brand: YouTubeBrand, bg: "#FF0000" },
  { platformId: "facebook",  platformName: "Facebook",  service: "Followers", href: "/buy-facebook-followers",  price: "$6.50", brand: FacebookBrand, bg: "#1877F2" },
  { platformId: "facebook",  platformName: "Facebook",  service: "Likes",     href: "/buy-facebook-likes",      price: "$3.50", brand: FacebookBrand, bg: "#1877F2" },
  { platformId: "facebook",  platformName: "Facebook",  service: "Views",     href: "/buy-facebook-views",      price: "$2.99", brand: FacebookBrand, bg: "#1877F2" },
  { platformId: "twitter",   platformName: "Twitter / X", service: "Followers", href: "/buy-twitter-followers", price: "$3.99", brand: TwitterBrand, bg: "#000" },
  { platformId: "twitter",   platformName: "Twitter / X", service: "Likes",     href: "/buy-twitter-likes",     price: "$2.49", brand: TwitterBrand, bg: "#000" },
  { platformId: "twitter",   platformName: "Twitter / X", service: "Retweets",  href: "/buy-twitter-retweets",  price: "$2.99", brand: TwitterBrand, bg: "#000" },
];

export function ServiceTable() {
  return (
    <section id="services" style={{ background: "var(--uv-bg-lavender)", paddingBottom: 80, scrollMarginTop: "var(--uv-header-h)" }}>
      <div className="container">
        <div className="service-table">
          <div className="st-head">
            <span>Service</span>
            <span>Starting from</span>
            <span>Delivery</span>
            <span />
          </div>
          {SERVICES.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="st-row st-row-link"
              aria-label={`Buy ${s.platformName} ${s.service}`}
            >
              <div className="st-name">
                <span className="st-dot" style={{ background: s.bg, color: "#fff" }}>
                  {s.brand}
                </span>
                <span style={{ fontWeight: 700, fontSize: 15, color: "var(--uv-fg-1)" }}>
                  Buy {s.platformName} {s.service}
                </span>
                {s.popular && (
                  <span
                    className="st-popular"
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: "0.06em",
                      color: "var(--uv-pink)",
                      padding: "3px 7px",
                      background: "rgba(239,70,85,0.10)",
                      borderRadius: 4,
                      marginLeft: 6,
                    }}
                  >
                    POPULAR
                  </span>
                )}
              </div>
              <span style={{ fontWeight: 700, fontSize: 15, color: "var(--uv-fg-1)" }}>
                {s.price}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: "var(--uv-success-text)",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 999,
                    background: "var(--uv-success-text)",
                    display: "inline-block",
                  }}
                />
                15-min start
              </span>
              <span
                className="btn btn-pink-outline btn-sm st-action"
                style={{ justifySelf: "end", display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                Get Started
                <ArrowUpRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
