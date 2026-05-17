"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavItem = {
  id: string;
  label: string;
  submenu?: { label: string; href: string }[];
};

const NAV: NavItem[] = [
  {
    id: "instagram",
    label: "Instagram",
    submenu: [
      { label: "Buy Instagram Followers", href: "/instagram/followers" },
      { label: "Buy Instagram Likes", href: "/instagram/likes" },
      { label: "Buy Instagram Views", href: "/instagram/views" },
    ],
  },
  {
    id: "tiktok",
    label: "TikTok",
    submenu: [
      { label: "Buy TikTok Followers", href: "/tiktok/followers" },
      { label: "Buy TikTok Likes", href: "/tiktok/likes" },
      { label: "Buy TikTok Views", href: "/tiktok/views" },
    ],
  },
  {
    id: "youtube",
    label: "YouTube",
    submenu: [
      { label: "Buy YouTube Subscribers", href: "/youtube/subscribers" },
      { label: "Buy YouTube Views", href: "/youtube/views" },
    ],
  },
  {
    id: "facebook",
    label: "Facebook",
    submenu: [
      { label: "Buy Facebook Followers", href: "#" },
      { label: "Buy Facebook Likes", href: "#" },
      { label: "Buy Facebook Views", href: "#" },
    ],
  },
  {
    id: "twitter",
    label: "Twitter",
    submenu: [
      { label: "Buy Twitter Followers", href: "#" },
      { label: "Buy Twitter Likes", href: "#" },
      { label: "Buy Twitter Retweets", href: "#" },
    ],
  },
  { id: "tools", label: "Free Tools" },
  { id: "blog", label: "Blog" },
  { id: "support", label: "Support" },
];

function activeIdForPath(pathname: string): string | null {
  if (pathname.startsWith("/instagram")) return "instagram";
  if (pathname.startsWith("/tiktok")) return "tiktok";
  if (pathname.startsWith("/youtube")) return "youtube";
  if (pathname.startsWith("/blog")) return "blog";
  return null;
}

export function Header() {
  const pathname = usePathname();
  const active = activeIdForPath(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeT = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const open = (id: string) => {
    if (closeT.current) {
      clearTimeout(closeT.current);
      closeT.current = null;
    }
    setOpenMenu(id);
  };
  const scheduleClose = () => {
    closeT.current = setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        background: scrolled ? "rgba(255,255,255,0.92)" : "#fff",
        backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        borderBottom: "1px solid var(--uv-line)",
        transition: "background 200ms ease",
      }}
    >
      <div
        className="container"
        style={{
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <Link
          href="/"
          style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}
        >
          <Image
            src="/logo.webp"
            alt="Thunderclap"
            width={120}
            height={24}
            style={{ height: 24, width: "auto", maxWidth: "none" }}
            priority
          />
        </Link>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
            fontSize: 14,
            color: "var(--uv-fg-2)",
            fontWeight: 500,
          }}
        >
          {NAV.map((it) => {
            const isActive = active === it.id;
            const hasMenu = !!it.submenu;
            return (
              <div
                key={it.id}
                onMouseEnter={() => hasMenu && open(it.id)}
                onMouseLeave={scheduleClose}
                style={{ position: "relative" }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "6px 0",
                    cursor: "pointer",
                    color: isActive ? "var(--uv-pink)" : "var(--uv-fg-2)",
                    fontWeight: isActive ? 700 : 500,
                    transition: "color 160ms",
                  }}
                >
                  {it.label}
                  {hasMenu && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      style={{ marginTop: 1, opacity: 0.6 }}
                    >
                      <path
                        d="M2 3.5L5 6.5L8 3.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                {hasMenu && openMenu === it.id && (
                  <div
                    className="nav-menu"
                    onMouseEnter={() => open(it.id)}
                    onMouseLeave={scheduleClose}
                  >
                    {it.submenu!.map((s) => {
                      const isCurrent = s.href !== "#" && pathname === s.href;
                      return (
                        <Link
                          key={s.label}
                          href={s.href}
                          aria-current={isCurrent ? "page" : undefined}
                          className={`nav-menu-item${isCurrent ? " is-active" : ""}`}
                        >
                          {s.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <a href="#" style={{ fontSize: 14, fontWeight: 500, color: "var(--uv-fg-2)" }}>
            Track order
          </a>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ borderRadius: 999, padding: "0 18px", height: 38 }}
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
