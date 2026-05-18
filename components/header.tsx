"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MegaMenu, MEGA_PLATFORMS, type PlatformId } from "./mega-menu";

const PLATFORM_IDS = new Set<string>(MEGA_PLATFORMS.map((p) => p.id));
const isPlatformId = (v: string): v is PlatformId => PLATFORM_IDS.has(v);

type NavItem = {
  id: string;
  label: string;
  href?: string;
  submenu?: { label: string; href: string }[];
};

const NAV: NavItem[] = [
  {
    id: "instagram",
    label: "Instagram",
    submenu: [
      { label: "Buy Instagram Followers", href: "/buy-instagram-followers" },
      { label: "Buy Instagram Likes", href: "/buy-instagram-likes" },
      { label: "Buy Instagram Views", href: "/buy-instagram-views" },
    ],
  },
  {
    id: "tiktok",
    label: "TikTok",
    submenu: [
      { label: "Buy TikTok Followers", href: "/buy-tiktok-followers" },
      { label: "Buy TikTok Likes", href: "/buy-tiktok-likes" },
      { label: "Buy TikTok Views", href: "/buy-tiktok-views" },
    ],
  },
  {
    id: "youtube",
    label: "YouTube",
    submenu: [
      { label: "Buy YouTube Subscribers", href: "/buy-youtube-subscribers" },
      { label: "Buy YouTube Views", href: "/buy-youtube-views" },
    ],
  },
  {
    id: "facebook",
    label: "Facebook",
    submenu: [
      { label: "Buy Facebook Followers", href: "/buy-facebook-followers" },
      { label: "Buy Facebook Likes", href: "/buy-facebook-likes" },
      { label: "Buy Facebook Views", href: "/buy-facebook-views" },
    ],
  },
  {
    id: "twitter",
    label: "Twitter / X",
    submenu: [
      { label: "Buy Twitter Followers", href: "/buy-twitter-followers" },
      { label: "Buy Twitter Likes", href: "/buy-twitter-likes" },
      { label: "Buy Twitter Retweets", href: "/buy-twitter-retweets" },
    ],
  },
  { id: "tools", label: "Free Tools" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "support", label: "Support" },
];

function activeIdForPath(pathname: string): string | null {
  if (pathname.startsWith("/buy-instagram")) return "instagram";
  if (pathname.startsWith("/buy-tiktok")) return "tiktok";
  if (pathname.startsWith("/buy-youtube")) return "youtube";
  if (pathname.startsWith("/buy-facebook")) return "facebook";
  if (pathname.startsWith("/buy-twitter")) return "twitter";
  if (pathname.startsWith("/blog")) return "blog";
  return null;
}

export function Header() {
  const pathname = usePathname();
  const active = activeIdForPath(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null);
  const closeT = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 980px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isMobile && mobileOpen) {
      setMobileOpen(false);
    }
  }, [isMobile, mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

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

  const closeMobile = () => setMobileOpen(false);
  const toggleMobileSection = (id: string) =>
    setExpandedMobileId((cur) => (cur === id ? null : id));

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
        className="container hdr-row"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <Link
          href="/"
          className="hdr-logo"
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
        <nav className="hdr-desktop-nav">
          {NAV.map((it) => {
            const isActive = active === it.id;
            const isPlatform = isPlatformId(it.id);
            const labelStyle = {
              display: "inline-flex" as const,
              alignItems: "center" as const,
              gap: 6,
              padding: "6px 0",
              cursor: "pointer" as const,
              color: isActive ? "var(--uv-pink)" : "var(--uv-fg-2)",
              fontWeight: isActive ? 700 : 500,
              transition: "color 160ms",
              textDecoration: "none" as const,
              fontSize: 14,
            };
            if (isPlatform) {
              const platformDef = MEGA_PLATFORMS.find((p) => p.id === it.id)!;
              return (
                <button
                  key={it.id}
                  type="button"
                  className="hdr-platform-tab"
                  onMouseEnter={() => open(it.id)}
                  onFocus={() => open(it.id)}
                  onMouseLeave={scheduleClose}
                  style={{
                    ...labelStyle,
                    background: "transparent",
                    border: "none",
                  }}
                  aria-expanded={openMenu === it.id}
                  aria-haspopup="menu"
                >
                  {platformDef.brand()}
                  <span>{it.label}</span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    style={{
                      marginTop: 1,
                      opacity: 0.6,
                      transform: openMenu === it.id ? "rotate(180deg)" : "none",
                      transition: "transform 160ms",
                    }}
                  >
                    <path
                      d="M2 3.5L5 6.5L8 3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              );
            }
            return it.href ? (
              <Link key={it.id} href={it.href} style={labelStyle}>
                {it.label}
              </Link>
            ) : (
              <span key={it.id} style={labelStyle}>
                {it.label}
              </span>
            );
          })}
        </nav>
        <div className="hdr-desktop-cta">
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
        <button
          type="button"
          className="hdr-mobile-toggle"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 7H20M4 12H20M4 17H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>
      {openMenu && isPlatformId(openMenu) && (
        <MegaMenu
          activeId={openMenu}
          onPlatformHover={(id) => open(id)}
          onClose={scheduleClose}
        />
      )}
      {mobileOpen && (
        <>
          <div
            onClick={closeMobile}
            aria-hidden="true"
            style={{
              position: "fixed",
              top: "var(--uv-header-h)",
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.3)",
              zIndex: 25,
            }}
          />
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            style={{
              position: "fixed",
              top: "var(--uv-header-h)",
              left: 0,
              right: 0,
              zIndex: 26,
              background: "#fff",
              borderBottom: "1px solid var(--uv-line)",
              boxShadow: "var(--uv-shadow-lg)",
              maxHeight: "calc(100vh - var(--uv-header-h))",
              overflowY: "auto",
            }}
          >
            <nav style={{ padding: "8px 0" }}>
              {NAV.map((it) => {
                const isActive = active === it.id;
                const hasMenu = !!it.submenu;
                const expanded = expandedMobileId === it.id;
                if (!hasMenu) {
                  return (
                    <Link
                      key={it.id}
                      href={it.href ?? "#"}
                      onClick={closeMobile}
                      style={{
                        display: "block",
                        padding: "16px 20px",
                        fontFamily: "var(--font-display)",
                        fontSize: 14,
                        fontWeight: 800,
                        color: isActive ? "var(--uv-pink)" : "var(--uv-fg-1)",
                        background: isActive ? "var(--uv-bg-lavender)" : "transparent",
                        textDecoration: "none",
                      }}
                    >
                      {it.label}
                    </Link>
                  );
                }
                return (
                  <div key={it.id}>
                    <button
                      type="button"
                      onClick={() => toggleMobileSection(it.id)}
                      aria-expanded={expanded}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16px 20px",
                        background: isActive ? "var(--uv-bg-lavender)" : "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "var(--font-display)",
                        fontSize: 14,
                        fontWeight: 800,
                        color: isActive ? "var(--uv-pink)" : "var(--uv-fg-1)",
                        textAlign: "left",
                      }}
                    >
                      <span>{it.label}</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 10 10"
                        fill="none"
                        style={{
                          transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 160ms",
                          opacity: 0.7,
                        }}
                        aria-hidden="true"
                      >
                        <path
                          d="M2 3.5L5 6.5L8 3.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {expanded && (
                      <div style={{ paddingBottom: 4 }}>
                        {it.submenu!.map((s) => {
                          const isCurrent = s.href !== "#" && pathname === s.href;
                          return (
                            <Link
                              key={s.label}
                              href={s.href}
                              onClick={closeMobile}
                              aria-current={isCurrent ? "page" : undefined}
                              className={isCurrent ? "is-active" : undefined}
                              style={{
                                display: "block",
                                padding: "12px 20px 12px 36px",
                                fontSize: 14,
                                fontWeight: 500,
                                color: isCurrent ? "var(--uv-pink)" : "var(--uv-fg-2)",
                                background: isCurrent
                                  ? "var(--uv-bg-lavender)"
                                  : "transparent",
                                textDecoration: "none",
                              }}
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
              <Link
                href="#"
                onClick={closeMobile}
                style={{
                  display: "block",
                  padding: "16px 20px",
                  fontFamily: "var(--font-display)",
                  fontSize: 14,
                  fontWeight: 800,
                  color: "var(--uv-fg-1)",
                  textDecoration: "none",
                }}
              >
                Track order
              </Link>
              <div style={{ padding: "12px 20px 20px" }}>
                <button
                  type="button"
                  onClick={closeMobile}
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    borderRadius: 999,
                    height: 44,
                  }}
                >
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
