"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { MegaMenu, MEGA_PLATFORMS, type PlatformId } from "./mega-menu";
import { useCart } from "./cart-context";

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
  {
    id: "linkedin",
    label: "LinkedIn",
    submenu: [
      { label: "Buy LinkedIn Connections", href: "/buy-linkedin-connections" },
      { label: "Buy LinkedIn Followers", href: "/buy-linkedin-followers" },
      { label: "Buy LinkedIn Likes", href: "/buy-linkedin-likes" },
      { label: "Buy LinkedIn Comments", href: "/buy-linkedin-comments" },
    ],
  },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "support", label: "Support", href: "/contact" },
];

function activeIdForPath(pathname: string): string | null {
  if (pathname.startsWith("/buy-instagram")) return "instagram";
  if (pathname.startsWith("/buy-tiktok")) return "tiktok";
  if (pathname.startsWith("/buy-youtube")) return "youtube";
  if (pathname.startsWith("/buy-facebook")) return "facebook";
  if (pathname.startsWith("/buy-twitter")) return "twitter";
  if (pathname.startsWith("/buy-linkedin")) return "linkedin";
  if (pathname.startsWith("/blog")) return "blog";
  return null;
}

export function Header() {
  const pathname = usePathname();
  const active = activeIdForPath(pathname);
  const { count: cartCount, openDrawer } = useCart();
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
        // CSS gotcha: backdrop-filter on this <header> creates a containing
        // block for ALL position:fixed descendants — which means the mobile
        // sheet (rendered inside <header> as `position: fixed; inset: 0`)
        // gets clipped to the header's bounds when scrolled, not the viewport.
        // Turning it off while the sheet is open keeps the sheet full-screen;
        // it's a transient state so the frosted-glass effect isn't missed.
        backdropFilter: scrolled && !mobileOpen ? "blur(16px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled && !mobileOpen ? "blur(16px) saturate(180%)" : "none",
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
          gap: "clamp(10px, 3vw, 32px)",
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
            style={{ height: 24, width: "auto" }}
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
          <Link
            href="/#services"
            className="btn btn-primary btn-sm"
            style={{
              borderRadius: 999,
              padding: "0 18px",
              height: 38,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Get Started
          </Link>
        </div>
        <button
          type="button"
          onClick={openDrawer}
          className="hdr-cart-btn"
          aria-label={
            cartCount > 0
              ? `Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`
              : "Cart"
          }
        >
          <ShoppingCart size={22} aria-hidden="true" />
          {cartCount > 0 && (
            <span className="hdr-cart-badge" aria-hidden="true">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </button>
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
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="hdr-mobile-sheet"
        >
          <div className="hdr-mobile-sheet-top">
            <Link
              href="/"
              onClick={closeMobile}
              aria-label="Thunderclap home"
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <Image
                src="/logo.webp"
                alt="Thunderclap"
                width={120}
                height={24}
                style={{ height: 22, width: "auto", maxWidth: "none" }}
              />
            </Link>
            <button
              type="button"
              onClick={closeMobile}
              aria-label="Close menu"
              className="hdr-mobile-close"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className="hdr-mobile-sheet-body">
            <nav style={{ padding: "4px 0 16px" }}>
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
                          const platformDef = PLATFORM_IDS.has(it.id)
                            ? MEGA_PLATFORMS.find((p) => p.id === it.id)
                            : null;
                          return (
                            <Link
                              key={s.label}
                              href={s.href}
                              onClick={closeMobile}
                              aria-current={isCurrent ? "page" : undefined}
                              className={isCurrent ? "is-active" : undefined}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                padding: "14px 20px 14px 36px",
                                minHeight: 44,
                                fontSize: 14,
                                fontWeight: 500,
                                color: isCurrent ? "var(--uv-pink)" : "var(--uv-fg-2)",
                                background: isCurrent
                                  ? "var(--uv-bg-lavender)"
                                  : "transparent",
                                textDecoration: "none",
                              }}
                            >
                              {platformDef && (
                                <span
                                  className="hdr-mobile-svc-brand"
                                  aria-hidden
                                  style={{ flexShrink: 0 }}
                                >
                                  {platformDef.brand()}
                                </span>
                              )}
                              <span>{s.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              <div style={{ padding: "16px 20px 32px" }}>
                <Link
                  href="/#services"
                  onClick={closeMobile}
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    borderRadius: 999,
                    height: 48,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
