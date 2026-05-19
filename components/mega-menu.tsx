"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Eye,
  Heart,
  Play,
  Repeat2,
  UserPlus,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = {
  label: string;
  description: string;
  href: string;
  fromPrice: string;
  Icon: LucideIcon;
};

type PlatformDef = {
  id: PlatformId;
  label: string;
  brand: () => React.ReactElement;
  services: Service[];
};

export type PlatformId =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "facebook"
  | "twitter";

export const MEGA_PLATFORMS: PlatformDef[] = [
  {
    id: "instagram",
    label: "Instagram",
    brand: () => (
      <span className="mm-brand mm-brand-instagram" aria-hidden>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="#fff" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
        </svg>
      </span>
    ),
    services: [
      {
        label: "Buy Followers",
        description: "Real, drip-fed followers that lift your reach in Search and Explore.",
        href: "/buy-instagram-followers",
        fromPrice: "$3.49",
        Icon: UserPlus,
      },
      {
        label: "Buy Likes",
        description: "Push posts into Explore — instant social-proof signal to the algorithm.",
        href: "/buy-instagram-likes",
        fromPrice: "$4.79",
        Icon: Heart,
      },
      {
        label: "Buy Views",
        description: "Reel views that warm the algorithm and stick on the discovery tab.",
        href: "/buy-instagram-views",
        fromPrice: "$3.49",
        Icon: Play,
      },
    ],
  },
  {
    id: "tiktok",
    label: "TikTok",
    brand: () => (
      <span className="mm-brand mm-brand-tiktok" aria-hidden>
        <svg width="14" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M16.5 3.5c.4 1.6 1.5 3 3.4 3.3v2.4c-1.3 0-2.5-.3-3.6-1v6.4a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .8.1v2.5a3.2 3.2 0 1 0 2.4 3.1V3.5h2.7z"
            fill="#fff"
          />
        </svg>
      </span>
    ),
    services: [
      {
        label: "Buy Followers",
        description: "TikTok followers from real, active accounts. Refill-guaranteed.",
        href: "/buy-tiktok-followers",
        fromPrice: "$0.49",
        Icon: UserPlus,
      },
      {
        label: "Buy Likes",
        description: "Boost the like count that triggers the For You page push.",
        href: "/buy-tiktok-likes",
        fromPrice: "$0.59",
        Icon: Heart,
      },
      {
        label: "Buy Views",
        description: "Drip-fed views that unlock the FYP and signal completion-rate.",
        href: "/buy-tiktok-views",
        fromPrice: "$0.79",
        Icon: Play,
      },
    ],
  },
  {
    id: "youtube",
    label: "YouTube",
    brand: () => (
      <span className="mm-brand mm-brand-youtube" aria-hidden>
        <svg width="18" height="12" viewBox="0 0 24 17" fill="none">
          <path
            d="M23.5 2.6c-.3-1-1-1.8-2-2C19.6 0 12 0 12 0S4.4 0 2.5.6c-1 .3-1.8 1-2 2C0 4.6 0 8.5 0 8.5s0 3.9.5 5.9c.3 1 1 1.8 2 2C4.4 17 12 17 12 17s7.6 0 9.5-.6c1-.3 1.8-1 2-2 .5-2 .5-5.9.5-5.9s0-3.9-.5-5.9z"
            fill="#fff"
          />
          <path d="M9.5 12V5l6.5 3.5L9.5 12z" fill="#ff0000" />
        </svg>
      </span>
    ),
    services: [
      {
        label: "Buy Subscribers",
        description: "Real subscribers — count toward the 1,000-sub YPP threshold.",
        href: "/buy-youtube-subscribers",
        fromPrice: "$2.05",
        Icon: Users,
      },
      {
        label: "Buy Views",
        description: "30-second-plus watch sessions that count toward YPP watch hours.",
        href: "/buy-youtube-views",
        fromPrice: "$1.99",
        Icon: Eye,
      },
    ],
  },
  {
    id: "facebook",
    label: "Facebook",
    brand: () => (
      <span className="mm-brand mm-brand-facebook" aria-hidden>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M13.5 22v-8.4h2.8l.4-3.3h-3.2V8.2c0-.95.27-1.6 1.65-1.6h1.76V3.7c-.85-.1-1.7-.15-2.55-.15-2.52 0-4.25 1.55-4.25 4.4v2.45H7.27v3.3h2.86V22h3.37z"
            fill="#fff"
          />
        </svg>
      </span>
    ),
    services: [
      {
        label: "Buy Followers",
        description: "Make your Page look like an industry leader to every visitor.",
        href: "/buy-facebook-followers",
        fromPrice: "$0.59",
        Icon: UserPlus,
      },
      {
        label: "Buy Likes",
        description: "Post-level likes that push your content up the feed.",
        href: "/buy-facebook-likes",
        fromPrice: "$0.49",
        Icon: Heart,
      },
      {
        label: "Buy Views",
        description: "Video and Reels views that warm the Facebook algorithm.",
        href: "/buy-facebook-views",
        fromPrice: "$0.79",
        Icon: Play,
      },
    ],
  },
  {
    id: "twitter",
    label: "Twitter / X",
    brand: () => (
      <span className="mm-brand mm-brand-twitter" aria-hidden>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zM17.083 19.77h1.833L7.084 4.126H5.117L17.083 19.77z"
            fill="#fff"
          />
        </svg>
      </span>
    ),
    services: [
      {
        label: "Buy Followers",
        description: "Authority builders. Crosspromo currency. Real X accounts.",
        href: "/buy-twitter-followers",
        fromPrice: "$1.99",
        Icon: UserPlus,
      },
      {
        label: "Buy Likes",
        description: "Like counts that nudge the For You algorithm into recommending.",
        href: "/buy-twitter-likes",
        fromPrice: "$0.99",
        Icon: Heart,
      },
      {
        label: "Buy Retweets",
        description: "The strongest amplification signal on X — extends reach beyond followers.",
        href: "/buy-twitter-retweets",
        fromPrice: "$0.99",
        Icon: Repeat2,
      },
    ],
  },
];

export function MegaMenu({
  activeId,
  onPlatformHover,
  onClose,
}: {
  activeId: PlatformId;
  onPlatformHover: (id: PlatformId) => void;
  onClose: () => void;
}) {
  const active = MEGA_PLATFORMS.find((p) => p.id === activeId) ?? MEGA_PLATFORMS[0];

  return (
    <div
      className="mm-panel"
      role="dialog"
      aria-label={`${active.label} services`}
      onMouseEnter={() => onPlatformHover(activeId)}
      onMouseLeave={onClose}
    >
      <div className="container mm-grid">
        <aside className="mm-side" aria-label="Platforms">
          {MEGA_PLATFORMS.map((p) => {
            const isActive = p.id === activeId;
            return (
              <button
                key={p.id}
                type="button"
                onMouseEnter={() => onPlatformHover(p.id)}
                onFocus={() => onPlatformHover(p.id)}
                className={`mm-side-item${isActive ? " is-active" : ""}`}
                aria-pressed={isActive}
              >
                {p.brand()}
                <span>{p.label}</span>
                <span className="mm-side-arrow" aria-hidden>
                  ›
                </span>
              </button>
            );
          })}
        </aside>

        <div className="mm-content">
          <div className="mm-eyebrow">{active.label.toUpperCase()} SERVICES</div>
          <div className="mm-services">
            {active.services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="mm-service"
                onClick={onClose}
              >
                <span className="mm-service-icon" aria-hidden>
                  <s.Icon size={20} />
                </span>
                <div className="mm-service-body">
                  <div className="mm-service-title">{s.label}</div>
                  <div className="mm-service-desc">{s.description}</div>
                  <div className="mm-service-price">From {s.fromPrice}</div>
                </div>
                <ArrowUpRight size={16} className="mm-service-arrow" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
