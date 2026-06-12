# Thunderclap — Project Conventions

Social media growth marketing site (Instagram / TikTok / YouTube / Facebook / Twitter / LinkedIn — followers, likes, views, subscribers, retweets, connections, comments). SEO-optimized, conversion-focused, payments routed through Redlap ("Social Empire Pay").

## Tech stack

- **Next.js 15** (App Router, no `src/`) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — tokens defined in `app/globals.css` under `@theme {}`
- **Lucide React** for icons
- **React Hook Form + Zod** for forms
- **Framer Motion** — use sparingly, only for hero/CTA polish
- **shadcn/ui** primitives (Radix under the hood) for accessible components when needed
- **next-sitemap** for build-time sitemap, **`app/robots.ts`** for robots
- **@vercel/analytics**, **@vercel/speed-insights**, **Partytown** for GTM
- **Google Analytics 4** (`G-0T6JZ3J82L`) wired via two `next/script` tags (`afterInteractive`) in the `<head>` of `app/layout.tsx` — the gtag loader + the inline `gtag('config', …)` init
- Path alias: `@/*` → repo root
- Repo: `github.com/fifty2-dxb/thunderclap.com`, single branch `main`

## Build status (read first — what's real vs placeholder)

| Route | Status |
| --- | --- |
| `/` | Built — hero, trust bar, service table, pricing, FAQ, testimonials, CTA |
| `/buy-instagram-{followers,likes,views,comments}` | **Fully built** — full service-page pattern (see below). Flat `buy-{platform}-{service}` slug chosen to match the exact-match SERP cluster ("buy instagram followers" 34K vol etc., per Ahrefs) and to preserve the live `/buy-instagram-followers` ranking. `comments` added 2026-06 (smmId `1873`); Hero/Faq exports `CommentsHero`/`CommentsFaq`, FAQs export `IG_FAQS`. 5 tiers (10/25/50/75/100). |
| `/buy-tiktok-{followers,likes,views}` | **Fully built** — same pattern, TikTok-branded |
| `/buy-youtube-{subscribers,likes,views}` | **Fully built** — YouTube-branded with YPP threshold framing. FAQs export `YT_FAQS`. |
| `/buy-facebook-{followers,likes,views}` | **Fully built** — Facebook-branded copy. FAQs export `FB_FAQS`. |
| `/buy-twitter-{followers,likes,retweets}` | **Fully built** — labelled "Twitter / X" everywhere user-facing. FAQs export `TW_FAQS`. Adds the `retweets` service type. |
| `/buy-linkedin-{connections,followers,likes,comments}` | **Fully built** — same 8-section pattern, LinkedIn blue `#0A66C2`. FAQs export `LI_FAQS`. Adds the `connections` service type (LinkedIn-specific); `comments` was first introduced here, later also added for Instagram. Brand glyph is the LinkedIn "in" SVG (also in `cart-drawer.tsx` as `LinkedInBrand`). |
| `next.config.ts` redirects | 301s from old `/{platform}/{service}` nested routes AND legacy prod URLs (`/buy-instagram-impressions`, `/free-youtube-subscribers`, `/instagram`, `/tiktok`, `/youtube`, `/facebook`, `/twitter`) → new canonicals. **`trailingSlash: true`** is set so every served URL ends in `/` and non-slash variants 308 to the trailing-slash form — needed to match the legacy WordPress URL pattern Google has already indexed. |
| `app/not-found.tsx` | Catch-all: every unmatched HTML route 308s to `/` via `permanentRedirect("/")` so old WP URLs without a 1:1 replacement keep their crawl/link signal instead of returning 404. Triggered by any unmatched route + by the `app/[slug]` `dynamicParams=false` fall-through. Trade-off: Google can flag mass-redirect-to-home as a soft-404 pattern; acceptable here because the alternative is 580+ Ahrefs "4XX page" warnings. |
| `middleware.ts` | Silently 404s legacy WordPress asset/admin/API prefixes (`/wp-content/`, `/wp-includes/`, `/wp-admin`, `/wp-json/`, `/xmlrpc.php`) so they don't loop into the not-found.tsx 308-to-home (an HTML home page response is wrong for `<img src="/wp-content/…">`-style requests). Matcher excludes Next internals, `/api/`, `/images/`, the sitemap/robots/favicon/logo so real assets are untouched. |
| `components/cart-drawer.tsx` | **Built** — there is NO `/cart` page anymore. The cart lives in a slide-in drawer (right rail on desktop, bottom sheet on mobile) mounted globally in `app/layout.tsx`. Auto-opens whenever an item is added, with a "MORE FROM {platform}" upsell row whose Add buttons call `addItem` directly (one-tap stacking from the drawer). Header cart icon opens it via `openDrawer()`. |
| `/checkout` | **Built** — multi-item server shell + `<CheckoutFlow>` client island, `noindex, nofollow`. Reads the cart from context (NOT URL params), renders one `target` input per cart item (per-service placeholder via `INPUT_CONFIG`), plus a single `email` input. On submit POSTs `{ items: [...], email }` to `/api/checkout/session` and `window.location` redirects to the Redlap-hosted payment page. Empty-cart state when no items. No method picker — Redlap owns card/Apple Pay/etc. |
| `/checkout/return` | **Built** — landing point for Redlap's redirect. Client island polls `/api/checkout/status` until terminal status, then `router.replace` to `/checkout/success` or `/checkout/failed`. |
| `/checkout/success` | **Built** — order confirmation. Reads `order_id`, `payment_id` (Redlap session), `order_number` (Redlap gateway ref) from URL. |
| `/checkout/failed` | **Built** — failure / cancelled / expired / timeout state with a "Try payment again" CTA back to `/checkout` (single-step). |
| `/api/checkout/session` | POST — accepts `{ items: [{ platform, service, qty, price, premium, target }, ...], email }` (with legacy single-item body still supported for back-compat). Sums totals, builds Redlap metadata with `items[]` + `smmDataItems[]` (and a flat `smmData` when there's exactly one mapped item, for legacy Redlap fulfillment code paths). The gateway `description` is intentionally the generic string **`"Product Purchase"`** — the platform/service breakdown is sent only via `summaryItems` (rendered on the Redlap payment page) and in metadata (for fulfilment), never in the description. Returns `{ sessionId, redirectUrl, orderId }`. |
| `/api/checkout/status` | GET `?sid=…` — returns `{ status: "pending"\|"paid"\|"failed"\|"expired" }`. Reads from the in-process webhook cache, falls back to Redlap's `GET /api/payments/sessions/:id`. |
| `/api/redlap/webhook` | POST — verifies `X-Webhook-Signature` HMAC-SHA256 and records the outcome in the in-process cache. On the first `payment.completed` for a session it fires the WebEngage **`Checkout Completed`** conversion server-side (reads email/items/total back from the Redlap session metadata; deduped via the status cache; wrapped so it never breaks the 200 ack). **No fulfillment** — that lives inside the Redlap environment. |
| `/api/webengage/track` | POST — accepts `{ eventName, eventData?, userId?, anonymousId? }` from the client and fire-and-forgets it to the WebEngage REST API via `lib/webengage.ts`. Returns `{ ok: true }` immediately; never blocks the caller on WebEngage. |
| `/blog` | **Built** — index hub listing every post (featured + grid). |
| `/{slug}/` (root) | **Built** — `app/[slug]/page.tsx` serves all blog posts at their original root-level slug (NOT under `/blog/`) to preserve legacy WordPress rankings. 544 posts imported from the live WP REST API (`scripts/import-wp-blog.mjs` → `content/blog-imported.json`) + 3 hand-written. `dynamicParams=false` so unknown slugs 404; static routes (`/buy-*`, `/aboutus`, `/blog`, …) take precedence over this segment. |
| `/aboutus/`, `/team/`, `/faqs/`, `/contact/`, `/refund/`, `/privacy/` | **Built** — ported from the legacy thunderclap.com WordPress site (DR-72) to preserve their indexed URLs. All carry a trailing slash to match the legacy URLs exactly (Google has them indexed that way). |
| `/api/lead` | POST → webhook lead capture (placeholder stub; the contact form no longer uses it) |
| `/api/contact` | POST — the contact form (`app/contact/_form.tsx`) target. Validates `{ name, email, subject, message }`, sends via **nodemailer + Zoho SMTP** (`smtp.zoho.com:465`) to `CONTACT_TO` (default `support@thunderclap.com`) with the visitor's email as `replyTo`. Recipient is fixed server-side (NOT a generic `/api/send` relay). `runtime = "nodejs"`. No-ops with a friendly 503 when `ZOHO_EMAIL`/`ZOHO_PASSWORD` are unset. CR/LF stripped from header fields to block injection. |
| `content/packages.ts` | **Empty stub** — `PACKAGES = [] as const`. Pricing tiers currently live inline in each `_builder.tsx`. Don't centralize unless you also rewrite all 11 builders. |

## Folder structure

```
app/
  layout.tsx                          root layout — metadata, fonts, JSON-LD, analytics
  page.tsx                            homepage
  sitemap.ts | robots.ts              SEO crawl files
  opengraph-image.tsx                 dynamic OG image
  globals.css                         design tokens + ALL component classes (single source of CSS truth)
  (marketing)/                        grouped service pages (no URL segment)
    buy-instagram-{followers,likes,views,comments}/{page.tsx, _builder.tsx, _faqs.ts}
    buy-tiktok-{followers,likes,views}/{page.tsx, _builder.tsx, _faqs.ts}
    buy-youtube-{subscribers,likes,views}/{page.tsx, _builder.tsx, _faqs.ts}
    buy-facebook-{followers,likes,views}/{page.tsx, _builder.tsx, _faqs.ts}
    buy-twitter-{followers,likes,retweets}/{page.tsx, _builder.tsx, _faqs.ts}
    buy-linkedin-{connections,followers,likes,comments}/{page.tsx, _builder.tsx, _faqs.ts}
  checkout/
    page.tsx                          single-step "Get started" server shell
    _form.tsx                         client form — POSTs /api/checkout/session, redirects to Redlap
    return/{page.tsx, _poll.tsx}      gateway return landing + client polling island
    success/page.tsx                  order received state
    failed/page.tsx                   failure / cancelled / expired state
  blog/page.tsx                       blog index hub (lists all posts, links to root /{slug})
  blog/_post-body.tsx                 BlogBlock renderer (incl. raw-HTML block)
  [slug]/page.tsx                     ROOT-level post route — serves all blog posts at /{slug}/
  api/
    lead/route.ts                     lead-capture POST → webhook (placeholder)
    contact/route.ts                  contact form → nodemailer + Zoho SMTP
    checkout/session/route.ts         create Redlap session
    checkout/status/route.ts          poll status
    redlap/webhook/route.ts           inbound Redlap webhook (HMAC verified)
    webengage/track/route.ts          forwards client events → WebEngage REST API
components/
  header.tsx                          desktop platform tabs + mega-menu trigger + full-screen mobile sheet
  mega-menu.tsx                       (client) desktop dropdown panel: sidebar + 2-col service cards
  ticker.tsx                          right-to-left marquee of trust signals (below the header)
  footer.tsx                          6-col service grid (link equity), socials, payment badges
  hero.tsx (client — "Soft Bolt" HeroSoft + interactive HomeBuyBox), faq.tsx, pricing-table.tsx, trust-bar.tsx, testimonials.tsx
  cta-section.tsx (SoftCta — bolt-row + sparks), how-it-works.tsx, announcement.tsx
  dashboard-strip.tsx (dark "Live Platform Metrics" stat strip), two-ways.tsx (Growth packages vs Thunderclap AI), bolt-art.tsx (shared Bolt/Spark SVG art)
lib/
  seo.ts                              SITE_URL, SITE_NAME, default metadata
  schema.ts                           JSON-LD generators
  utils.ts                            cn() + formatQty()
  redlap.ts                           Redlap API client + HMAC verifier
  redlap-status-cache.ts              in-process Map of session → outcome
  webengage.ts                        server-side WebEngage REST client (trackEvent / trackUser) + WE_EVENTS names
  webengage-client.ts                 client-side track* helpers → POST /api/webengage/track
content/
  packages.ts                         EMPTY STUB — see Build status note
  faqs.ts                             global FAQ content (homepage)
  blog.ts                             typed BlogPost[] + helpers; merges POSTS + IMPORTED_POSTS
  blog-imported.json                  544 posts imported from legacy WP (generated)
scripts/
  import-wp-blog.mjs                  one-time WP→Next blog importer (run while old WP is live)
public/                               logo.webp (blue mark + black wordmark) + favicon.png (512² blue mark) at root, images in /images/ (blog imgs in /images/blog/)
```

## Design system

The visual language was locked in via a Claude Design handoff. **All design tokens live in `app/globals.css`** under `:root` and `@theme`. Use the `--uv-*` CSS variables, not arbitrary Tailwind colors.

- **Brand color**: blue `--uv-pink` `#3b76f6` (the variable name is historical — originally coral `#ef4655`; rebranded to blue 2026-06). Deep variant `--uv-pink-deep` `#2257d8`. The variable NAMES were preserved across the rebrand so every component picked up the new colour without touching `.tsx` files; don't rename them unless you also sweep every reference. The old coral hex `#ef4655` (`rgb(239,70,85)`) was ALSO hardcoded into ~18 `box-shadow`/glow/focus-ring `rgba()` values in `globals.css` (not via a var), which kept emitting an orange glow after the rebrand — these were swept to `rgba(59,118,246,…)` 2026-06. The TikTok-icon glow `rgba(254,44,85,…)` is intentionally left (brand-correct for that icon).
- **Logo + favicon**: `public/logo.webp` is the blue mark + black "thunderclap" wordmark (recoloured from the original coral mark via `sharp`, wordmark untouched). `public/favicon.png` is the 512² blue mark alone, wired in `app/layout.tsx` as `icons: { icon: "/favicon.png", apple: "/favicon.png" }`.
- **Surface**: white `--uv-bg` + cool blue-grey `--uv-bg-lavender` `#f3f6fd` for hero/footer (was warm cream `#f5f3ee` pre-rebrand).
- **Tart accent palette** (new 2026-06): `--tart-lilac` `#bdd6f8`, `--tart-mint` `#bfe8d2`, `--tart-peach` `#bcd0f6`, `--tart-sky` `#bcd9f7`, `--tart-yellow` `#ffd874`, `--tart-yellow-d` `#ffc94a`, `--tart-ink` `#6a5a7e`. Defined but not yet used by any component — available for future illustration/accent work.
- **Type**: Plus Jakarta Sans (display) + Manrope (body) + JetBrains Mono — all loaded via `next/font` (self-hosted, no Google Fonts requests at runtime)
- **Component classes** ported from the handoff and added over time: `.btn`, `.btn-primary`, `.btn-outline`, `.tier`, `.tier-featured`, `.faq-chip`, `.coral-band`, `.pkg-card`, `.svc-layout`, `.svc-side`, `.compare-card`, `.persona-row`, `.related-grid`, `.testi-grid`, `.why-grid-3`, `.nav-menu*`, `.co-*` (checkout), etc. **Prefer these to re-inventing Tailwind utility soup** — they encode the design.
- **Platform side icons** (used in the service-page order summary AND in checkout's order summary): `.side-ig-icon` (IG gradient), `.side-tt-icon` (TikTok black + cyan/red glow), `.side-yt-icon` (YouTube red), `.side-fb-icon` (Facebook blue), `.side-tw-icon` (Twitter black). Each expects a small white-stroke SVG inside.
- Gradient text accent: `.grad-text` (used on key H1/H2 phrases for brand pop)
- Coral CTA gradient button: `var(--uv-gradient-button)` — used by `.co-cta` and `.btn-primary`

## Mobile responsive system

The site was bolted onto a desktop-first design; mobile rules are concentrated in **`app/globals.css`**'s `Responsive` section at the bottom. The breakpoints are stacked:

- `@media (max-width: 1080px)` — collapse `.svc-layout` to single column. **First H1 cap** (`clamp(40px, 6.5vw, 60px)`) so the inline `fontSize: 72` on service-page hero H1s scales smoothly on tablets. **`.side-cta` is hidden** at this width — once the order-summary aside stacks below the package card, the in-card `.pkg-cta` already covers the "Add to cart" affordance and a second copy below would just be visual clutter.
- `@media (max-width: 980px)` — `--uv-header-h` drops `72px → 56px`; `.hdr-desktop-nav` + `.hdr-desktop-cta` hide; `.hdr-mobile-toggle` appears; `.mm-panel` (mega-menu) hidden. Card grids collapse to 1 column, `.faq-chips` to 1 column, `.co-grid` (checkout) to 1 column, `.hiw-top` to 1 column, `.blog-grid` 3→2 cols, `.blog-featured` stacks. Second H1 cap (`clamp(36px, 7.5vw, 52px)`) + H2 cap. Ticker animation tightens 48s → 36s.
- `@media (max-width: 720px)` — `.pkg-grid` stays at **3 cols** (tighter), `.pkg-cta-row` stacks, coral-band tightens.
- `@media (max-width: 640px)` — phone breakpoint, main responsive bulk: container padding 16px, `.pkg-grid` stays at **3 cols** (gap 5px, padding 9px 3px), `.svc-side` static padding, `.faq-chip` smaller with 48px min-height, `.coral-band h2` 28px, `.persona-img` capped, service-table drops the action column to a 2-col grid (full row is clickable), footer to 2 cols with brand full-width on top, `.blog-grid` 2→1 cols, ticker fades narrow to 32px. **Headline clamps** (`main h1/h2/h3/p` with `clamp()` + `!important`) cap any inline `fontSize` from in-line styles on hero H1s. **iOS Safari**: all inputs forced to 16px (`.uv-input, .pkg-url-input, .co-input, .co-pay-input`) to prevent focus auto-zoom; tap targets bumped to ≥40-48px.
- `@media (max-width: 480px)` — `.pkg-grid` stays at **3 cols** (gap 4px, padding 7px 2px — never collapse to a vertical list), footer collapses to single column, `.footer-bottom` stacks vertically, ticker animation tightens to 30s.
- `@media (max-width: 420px)` — checkout payment-method chips shrink one more notch.

**Pricing-tile rule (explicit)**: `.pkg-grid` is `repeat(3, 1fr)` at *every* width. Tile size + type shrink across breakpoints (default `92px` min-h → `82` → `78` → `72`; qty `17px → 15.5 → 14`; price `13.5px → 12.5 → 11.5`). All 14 tiers stay visible as a compact overview. **Don't reintroduce 4-col, 2-col, or horizontal-list variants** — the user has rejected each at least once.

**Defensive global rules** (in `app/globals.css`):
- `html, body { overflow-x: clip; max-width: 100%; }` — kills mobile horizontal scroll if any descendant escapes `overflow: hidden`. **`clip` not `hidden`** because `clip` doesn't create a scroll container, so the sticky header still works.
- `main h1/h2/h3/p` clamp `!important` at ≤640 overrides any inline `fontSize: 72` on hero H1s.

When adding new sections, target ≤ 640px viewport — that's where the bugs hide. If you add an inline 2-col grid (like `.hiw-top` or `.blog-featured`), add a `@media (max-width: 980px)` rule with `grid-template-columns: 1fr !important` so it collapses.

## Header chrome (desktop + mobile, CSS-driven swap)

`components/header.tsx` renders BOTH the desktop nav and the mobile hamburger from a single SSR tree; **visibility is driven by CSS media queries, not React state**. This is non-negotiable — gating with a `useState`+`matchMedia` flag causes the desktop nav to flash on mobile during hydration and clip the logo at narrow widths.

- `.hdr-row` — header height, set from the `--uv-header-h` CSS var (72px desktop, 56px ≤980)
- `.hdr-desktop-nav` — platform tab row (hover-trigger for the mega-menu) — `display: flex` default, `display: none` at ≤980
- `.hdr-desktop-cta` — "Track order" + "Get Started" buttons — same behavior
- `.hdr-mobile-toggle` — hamburger button — `display: none` default, `display: inline-flex` at ≤980

**Header background is the Soft Bolt glow gradient** (inline on the `<header>` via the `glowTop` / `glowScrolled` consts in `header.tsx`) — copied from `.soft-hero` (two radial blue glows `#e4ecfc`/`#dfe9fc` over a `linear-gradient(180deg, #f3f7fd → #eef3fb)`) so the bar reads as an extension of the hero glow site-wide, NOT flat white. Scrolled state swaps to the same glow over translucent white (`rgba(247,250,255,0.82)`) + `backdrop-filter: blur(16px)` so it frosts over page content, plus a soft blue drop shadow. Border-bottom is a faint blue `rgba(59,118,246,0.10)` (not the grey `--uv-line`) so it doesn't break the glow. Keep these three (top bg, scrolled bg, border) in sync with the `.soft-hero` gradient if that ever changes.

**Inline `style={{ display: ... }}` on these elements is a bug** — it'll beat the `@media display: none` override and the chrome won't hide. Layout props live in the CSS class, not the JSX.

**Active state**: `activeIdForPath(pathname)` returns one of `instagram | tiktok | youtube | facebook | twitter | blog | null`; the matching top tab gets `color: var(--uv-pink)` and `font-weight: 700`.

**NavItem with `href` + no submenu** renders as a `<Link>` (clickable). Without href + without submenu = inert `<span>`. The `NavItem` type: `{ id, label, href?, submenu? }`.

## Mega-menu (desktop platform dropdown)

`components/mega-menu.tsx` (client component) is a full-width panel that drops below the header when the user hovers any platform tab. Data lives in `MEGA_PLATFORMS` inside the same file — exported alongside the component because the header imports it to render the same brand chips next to each top-tab label.

**Layout** (`.mm-panel` is `position: absolute; top: var(--uv-header-h)` inside the sticky header):
- `.mm-grid` — `240px 1fr` two-column grid
- `.mm-side` — left platform list on warm-cream (`--uv-bg-lavender`); active row gets white background + pink chevron
- `.mm-content` — right side eyebrow + `.mm-services` 2-col grid of `.mm-service` cards
- `.mm-service` — `44px icon + body + arrow` 3-col grid. Icon tile is `.mm-service-icon` (44×44, `--uv-pink-soft` background, coral icon). Card has title + description + `From $X.XX` price anchor.

**Hover handoff**: parent `Header` owns the `openMenu` state. On platform-tab `mouseEnter` → `open(it.id)` cancels close-timer + sets state. On `mouseLeave` → `scheduleClose()` sets a 120ms timer that nulls the state. The mega-menu fires the same handlers from its own `mouseEnter`/`mouseLeave`, so moving the pointer from tab to menu keeps it open. The sidebar items inside the menu fire `onMouseEnter={() => onPlatformHover(p.id)}` to switch the active platform without closing.

**From-price anchors** — `MEGA_PLATFORMS[i].services[j].fromPrice` is hardcoded per service. Keep in sync with the lowest tier of each builder's `PACKAGES` array.

**Smaller brand chips in top tabs**: `.hdr-platform-tab .mm-brand` overrides the default 22px chip to 18px and scales the inner SVG to 0.78. The mega-menu sidebar keeps the default 22px chip.

**Hidden on mobile** via `@media (max-width: 980px) { .mm-panel { display: none; } }`.

## Mobile menu sheet (≤980px)

Full-screen overlay (`.hdr-mobile-sheet`, `position: fixed; inset: 0; z-index: 60`), not a slide-down below the header. The sheet has its own top bar (logo + circular close X button — `.hdr-mobile-close`, 44×44 lavender chip with pink hover) so the close affordance is always visible inside the sheet rather than relying on the underlying hamburger toggle.

- Body scroll lock via `useEffect` that sets `document.body.style.overflow = "hidden"` while `mobileOpen` is true
- Escape key closes
- Tapping any menu item or the X closes (`onClick={closeMobile}`)
- `.hdr-mobile-sheet-body` is its own scroll container with `overscroll-behavior: contain` so swipes don't bleed through to the page underneath
- Each expanded submenu service row gets a **small platform brand chip** (`.hdr-mobile-svc-brand .mm-brand`, 20×20) on the left of the title so the menu scans like a list of products, not just a list of links. The chip reuses the same SVG/gradient as the desktop top-tab — kept in sync via `MEGA_PLATFORMS[id].brand()`.

Don't reintroduce a partial slide-down sheet that relies on the header behind it for close affordance — users won't find the X. Full-screen overlay is the pattern.

## Trust ticker (below the header)

`components/ticker.tsx` renders a right-to-left marquee of trust signals (Trustpilot rating, order count, instant delivery, refill guarantee, no-password, etc.). Mounted in `app/layout.tsx` right after `<Header />`.

Pattern:
- `.ticker` outer: `overflow: hidden; position: relative` with a warm-cream→pink-soft gradient background and ::before/::after edge-fades (vertical gradient + horizontal alpha mask so the fade colour matches at every Y)
- `.ticker-track` inner: `display: inline-flex; width: max-content; animation: ticker-scroll 48s linear infinite` (`translateX(0) → -50%`). Animation duration tightens at mobile breakpoints (36s, 30s)
- Two identical `<Row />` instances stacked in the track so when the first scrolls -50% the second is already in place — seamless loop
- `pause-on-hover` via `.ticker:hover .ticker-track { animation-play-state: paused }`
- `prefers-reduced-motion`: animation off, content wraps statically

## SEO rules (must follow)

1. **Every public route exports `metadata`** with `title`, `description`, `alternates.canonical`, `openGraph`, `twitter`. **`robots` is set once in the root `app/layout.tsx`** (`index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`, mirrored to `googleBot`) and inherited by every page — don't repeat it per-page. Exception: all `/checkout*` routes override with `robots: { index: false, follow: false }` (Next replaces the field per-route, so they emit `noindex, nofollow`) and skip canonical.
2. **Homepage** injects `Organization` + `WebSite` JSON-LD via a `<script type="application/ld+json">` tag in the page (not layout, to avoid duplication on other routes).
3. **Service pages** inject `Product` + `AggregateRating` + `FAQPage` + `BreadcrumbList` JSON-LD, all in `page.tsx`.
4. **`Product.offers`** uses `AggregateOffer` with `lowPrice`/`highPrice` matching the `PACKAGES` array in the matching `_builder.tsx`. Keep these in sync when you change pricing.
5. **Blog post pages** inject `Article` + `BreadcrumbList` JSON-LD.
6. **All images** use `next/image` with explicit `width` + `height` (CLS protection).
7. **All fonts** use `next/font` self-hosted; do **not** add `<link>` tags to fonts.googleapis.com.
8. **next-sitemap** runs in `postbuild`; `next-sitemap.config.js` is the source of truth for priorities and hreflang.
9. **hreflang ready**: English is the default. Structure supports `/[locale]/...` future migration — don't hardcode `/en/` paths today.
10. **Cross-link RELATED grids must use real `href`s, no `href="#"`.** SEO link equity matters. When cross-linking platforms, point to the equivalent service (`/buy-instagram-likes` ↔ `/buy-tiktok-likes`).
11. **URL slug is `/buy-{platform}-{service}`** — flat, hyphen-delimited, with the literal `buy` token. Don't nest under `/{platform}/`. Reason: every commercial keyword in this niche is `buy [platform] [service]` (Ahrefs US: "buy instagram followers" 34K, "buy tiktok followers" 31K, "buy youtube views" 16K, etc.). The exact slug match is a meaningful relevance signal and it keeps us aligned with the live `/buy-instagram-followers` URL that already ranks. `next.config.ts` 301-redirects the old nested paths.
12. **H1 must lead with the exact keyword.** Each service page H1 starts with "Buy {Platform} {Service}" before any taglines — search-query alignment.

## Conversion rules

- Hero must have a **price anchor** ($0.49-style hook) above the fold.
- **Sticky trust bar**: ★★★★★ rating, "X happy customers", payment-method badges.
- Pricing table: middle tier carries the `MOST POPULAR` ribbon (`.tier-featured`).
- Service-page pricing grid: exactly one tier flagged `popular: true` in the `PACKAGES` array — that tier gets the small POPULAR star tag.
- Mobile-first targets: **LCP < 2.5s**, **CLS < 0.1**.
- Internal links: footer carries the full service grid for SEO link equity.

## Workflow

- The user reviews each step before the next begins. Don't roll multiple steps into one commit.
- **Commit + push are MANDATORY and AUTOMATIC after every step.** Never ask the user "should I commit?" or "should I push?" — just do it. Sequence: `git add <changed files>` → `git commit -m "Step N: <description>"` → `git push origin main`. If a push fails, fix the auth and retry — don't surface it to the user as a question.
- Remote `origin` is **SSH** (`git@github.com:fifty2-dxb/thunderclap.com.git`). If you find it pointing at HTTPS in a fresh session, `git remote set-url origin git@github.com:fifty2-dxb/thunderclap.com.git` once and keep going — the user does not want HTTPS prompts.
- No PRs, no feature branches — `main` only.
- Don't add features, fallbacks, or scope creep beyond the brief.
- Use multiple parallel `Agent` subtasks when the work is mechanically repetitive across 3+ files (e.g. "wire all 6 builders the same way"). It's faster and the user has asked for this pattern explicitly.

## Source of design

`/tmp/thunderclap-design/` (extracted from the Claude Design handoff bundle) contains the original HTML/JSX prototypes. **Read those before reinventing a component** — `Service.jsx`, `Sections.jsx`, `CtaFaqBlog.jsx`, `Header.jsx`, `Footer.jsx` show the exact intended structure for every section. Note: on a fresh machine this `/tmp` folder won't exist — re-extract the handoff bundle if you need the originals.

## Service page pattern (Buy Instagram Likes is the canonical reference)

The `/buy-instagram-likes` route is the original template. All 15 service pages (IG x3, TT x3, YT x3, FB x3, TW x3) follow it identically.

**File layout per service page:**

```
app/(marketing)/buy-<platform>-<service>/
  page.tsx       server component — metadata, JSON-LD (Product + AggregateRating + FAQPage + BreadcrumbList), static sections
  _builder.tsx   "use client" — interactive Hero (premium toggle, service tabs, package picker, URL input, total, side summary) + FAQ chips
  _faqs.ts       plain data module — FAQ array imported by BOTH page.tsx (for JSON-LD) and _builder.tsx (for UI). Must NOT live inside _builder.tsx — a "use client" file's non-component exports cannot be statically imported by a server component, and the build will fail with `f.X_FAQS.map is not a function` during page-data collection.
```

**Hero component exports**: name them after the platform+service for clarity — `LikesHero`/`LikesFaq` (IG), `TikTokLikesHero`/`TikTokLikesFaq` (TT), `YouTubeViewsHero`/`YouTubeViewsFaq` (YT), `FacebookLikesHero`/`FacebookLikesFaq` (FB), `TwitterRetweetsHero`/`TwitterRetweetsFaq` (TW). The page.tsx imports them by name.

**FAQ export names**: Instagram → `IG_FAQS`, TikTok → `TT_FAQS`, YouTube → `YT_FAQS`, Facebook → `FB_FAQS`, Twitter → `TW_FAQS`.

**Section order on a service page** (from the design):
1. `<ServiceHero>` — breadcrumb, H1 with `.grad-text` on the variable phrase, `.live-pill`, two-column `.svc-layout` (left: premium toggle + service tabs + `.pkg-card` with 14-tier grid + URL input + total/CTA + trust strip; right: sticky `.svc-side` order summary)
2. `WHY BUY ...` — `.why-grid-3` (3 hairline cards)
3. `WHO IT'S FOR` — `.persona-row` × 3, alternating direction, on `--uv-bg-lavender`
4. `WHY THUNDERCLAP` — `.compare-card` (Thunderclap vs Others, green check / grey X)
5. `★ TRUSTPILOT` testimonials — `.testi-grid`
6. `RELATED SERVICES` — `.related-grid` (3 link cards; use real cross-links per SEO rule 10)
7. `.faq-chips` — 2-column chunky FAQ chips with collapse
8. `.coral-band` — pink CTA band

All required component classes already exist in `app/globals.css`. Use them — don't reinvent with Tailwind utility soup.

**Pricing tiers** for the package picker live inside `_builder.tsx` as a `PACKAGES` const (variable tier count per page, 6–12 tiers each). All 15 service pages carry real, CSV-grounded prices sourced from the WooCommerce product export (`thunderclapproductprices.numbers`), HQ tier only. Each entry: `{ qty: number, price: number, regular: number, popular?: true }`. `price` is the sale price; `regular` is the WooCommerce "Regular price" (sale ≈ regular × 0.8 for most tiers) — it powers the strikethrough on each tile and the `youSave` amount ("You save $X") shown below the CTA. When porting:
1. Copy the array shape and fill in `qty`/`price`/`regular` from the CSV row for the matching qty
2. Mark exactly one tier `popular: true` (the value-anchor — middle-of-curve)
3. Re-sync `Product.offers` `lowPrice` / `highPrice` / `offerCount` in `page.tsx`
4. Re-sync the mega-menu `fromPrice` for that service
5. The "Save up to N%" header pill is hardcoded to 20% across all builders (the CSV's standard discount). Bump it if a service's max actual discount is meaningfully higher.

**Tier badge pills** — every `_builder.tsx` renders three optional per-tier badge pills, each driven by a boolean flag on the `PACKAGES` entry. All three are **animated gradient pills** (`@keyframes pill-grad-shift` slides a `200%`-wide gradient; `prefers-reduced-motion` disables it):
- `popular?: true` → `.pkg-tier-tag` (blue gradient, Star icon) labelled **MOST POPULAR** (was "POPULAR" — renamed 2026-06).
- `bestDeal?: true` → `.pkg-tier-tag.best-deal` (amber/orange gradient, Zap icon) labelled **BEST DEAL**.
- `bulkPrice?: true` → `.pkg-tier-tag.bulk-price` (green gradient, Zap icon) labelled **BULK PRICE**.
All 20 builders carry **all three render branches** (so any tier can opt in by adding a flag); the `bestDeal`/`bulkPrice` branches use a cast guard `{(p as { bestDeal?: boolean }).bestDeal && …}` (not `"x" in p`) so they typecheck even on pages where no tier sets the flag. There's no enforced "exactly one" rule for best-deal/bulk-price — set them per the user's per-page instruction (typically MOST POPULAR on a mid tier, BEST DEAL or BULK PRICE on the top tier). The premium row also carries a static-position **animated "Recommended" gradient pill** (`.prem-badge`, top-left, Sparkles icon) calling out the +35% premium upsell.

**Service tabs (`.svc-tabs` strip above the package grid) are real navigation, NOT local state.** Each entry in `SERVICE_TABS` carries an `href` pointing to the matching `/buy-{platform}-{service}` page; the markup uses `<Link href={t.href}>` not `<button onClick={setTab}>`. Clicking a tab loads the new page with its real PACKAGES, prices, H1, and CTA — there's no shared tab-state model. The `tab` useState stays as a read-only constant for the per-tier sub-label and side-summary title (it always equals the current page's service id). Active-tab styling still works via `tab === t.id`. **Don't reintroduce the local-state tab pattern** — the user explicitly rejected it because the prices didn't change when toggling. SERVICE_TABS must list only services that exist on that platform (don't include `Comments` or `Likes` on YouTube etc.).

**Premium toggle** (`+35%`):
- Held in local `useState` inside the Hero
- Affects the cart total, the per-tier sale price displayed in `.pkg-grid`, AND the strikethrough regular price (`p.regular * (premium ? 1.35 : 1)`). Both prices scale by 1.35 together so the discount % stays constant.
- Carries through to checkout via the `&premium=1` query param

**CTA wiring (mandatory)**: both "Add to cart" buttons (`pkg-cta` and `side-cta`) are Next.js `<Link>` components, not `<button>`s. They route to:

```
/checkout?platform=<platform>&service=<service>&qty=${pkg.qty}&price=${pkg.price}&premium=${premium ? 1 : 0}
```

Pattern in `_builder.tsx`:
```tsx
const checkoutHref = `/checkout?platform=instagram&service=likes&qty=${pkg.qty}&price=${pkg.price}&premium=${premium ? 1 : 0}`;
// ...
<Link href={checkoutHref} className="btn btn-primary btn-lg pkg-cta">…</Link>
```

The `price` query param is the **base** tier price (not premium-adjusted). The checkout page re-applies the +35% based on the `premium` flag so the math stays consistent.

## Service pricing — sources of truth

When you change a service price in a `_builder.tsx` `PACKAGES` array, `MEGA_PLATFORMS[i].services[j].fromPrice` (`components/mega-menu.tsx`) AND the cart drawer's `SUGGESTION_POOL`/`BROWSE_LINKS` (`components/cart-drawer.tsx`) all need the matching value. **These three sources of truth aren't centralised yet** — `content/packages.ts` is still an empty stub. If you centralise them, rewrite all three call sites or it'll drift. (There used to be a 4th — the homepage `service-table.tsx` — but that component was removed from the homepage 2026-06; the footer service grid carries the SEO link equity instead.)

## Homepage design ("Soft Bolt" — blue, no orange glow)

The homepage was rebuilt to the playful "Soft Bolt" design. The brand moved from coral to **blue** (the `--uv-pink-*` CSS vars now hold blue hexes; `--uv-glow-pink`/`--uv-glow-grad` are `none` — there is NO orange glow anymore). The cartoon-art palette lives in the `--tart-*` vars. All the new homepage CSS lives in the "Homepage redesign (Soft Bolt)" block in `globals.css` just before the Responsive section (`.soft-hero`, `.soft-buybox`, `.buybox-frame`, `.plat-row`/`.plat-chip`, `.pkg-ai-strip`, `.tart`/`.tart-float`/`.tart-wiggle`, `.bolt-row`).

- **`components/hero.tsx`** (`"use client"`) — `HeroSoft` layout (rating pill "4.9 · Loved by 200,000+ creators", H1 "Grow any account, real engagement, in minutes.", chips, stats) + the interactive **`HomeBuyBox`**. The buy-box has a platform-chip row (the 6 real platforms + an "AI Growth" chip), service tabs, an 8-tier package grid (`HOME_PACKAGES`, synthetic display prices), a URL input, and a live total. **Default `platId` is `"instagram"`** (NOT `"ai"`) so the box opens on the primary conversion path; its CTA links to the real `/buy-{platform}-{service}/` page. When the "AI Growth" chip is active (`aiMode`), it swaps to a Monthly/Annual subscription view (`HOME_AI_PLANS`) whose CTA links to `/` (the AI funnel page doesn't exist yet — keep it pointing home until it does).
- **`components/dashboard-strip.tsx`** — dark (`#0e1117`) "LIVE PLATFORM METRICS" stat strip ("Real numbers. Real growth.", 6 stat cards incl. **4.9★** Trustpilot). The "View full ops dashboard" link points to `/` (no ops page yet).
- **`components/two-ways.tsx`** — "Two ways to grow" — a "Growth packages" card (→ `/buy-instagram-followers/`) next to a featured "Thunderclap AI" card (→ `/`, AI funnel not built yet).
- **`components/bolt-art.tsx`** — shared `Bolt` + `Spark` cartoon SVGs, imported by both `hero.tsx` and `cta-section.tsx` (`SoftCta`). Pure SVG, no `"use client"`.
- Homepage section order (`app/page.tsx`): Hero → DashboardStrip → TwoWays → WhyThunderclap → HowItWorks → PricingTable → Testimonials → FaqSection → CtaSection. (The old ServiceTable section was removed 2026-06 per the Soft Bolt design — the footer service grid + mega-menu carry the SEO link equity.)
- **Rating is 4.9 everywhere** (the design HTML showed 4.7 in spots — 4.9 wins, it's unified site-wide).

## Blog system

The blog is a full content system, not a stub. Three layers:

**Data (`content/blog.ts`)** — typed `BlogPost[]` array. Each post has `slug`, `category`, `title`, `description` (meta), `excerpt` (card blurb), `author`, `publishedAt` (ISO), optional `updatedAt`, `readMinutes`, `heroImage` (Unsplash), `heroAlt`, `primaryCta` (in-body CTA destination), optional `related` (slugs), and `blocks: BlogBlock[]`. Helpers: `getAllPosts()` (sorted by date desc), `getPost(slug)`, `getRelatedPosts(slug)`.

**Block types** for the post body:
- `p` (HTML allowed inside — `<strong>`, `<em>`, `<a>`)
- `h2` / `h3` (optional `id` for anchors)
- `list` (`ordered?: boolean`, `items: string[]` with HTML allowed)
- `callout` (highlighted aside with optional title)
- `quote` (with optional `cite`)
- `cta` (in-content card with title + body + Link → `/buy-*`)

- `html` (raw sanitized HTML — used by the imported WordPress posts; rendered into `.blog-html`, which styles bare `p/h2/h3/h4/ul/ol/li/a/img/figure/table/blockquote` tags to match the hand-written `.blog-*` design)

**Imported posts (`content/blog-imported.json`)** — 544 posts ported from the legacy thunderclap.com WordPress site by `scripts/import-wp-blog.mjs`. The script pulls every post from the **live WP REST API** (`/wp-json/wp/v2/posts`, needs a browser User-Agent — Cloudflare 403s `python-urllib`), carries real `publishedAt`/`updatedAt`/`excerpt`/`category`, maps authors to the `/team` experts, re-hosts in-content images to `public/images/blog/` (wp-content 404s at cutover), and wraps the body in a single `{type:"html"}` block. Heroes use a verified Unsplash pool per category (the original WP featured images average ~1.4MB — downloading 550 would bloat the repo). 8 empty-content posts are skipped (301'd in `next.config.ts`). Re-runnable while the old WP site is still live; `IMPORTED_POSTS` is merged with the hand-written `POSTS` in `getAllPosts`/`getPost`/`getRelatedPosts`.

**Renderer (`app/blog/_post-body.tsx`)** — switch on `block.type`, returns the right element with the right class. Used by `app/[slug]/page.tsx`.

**Pages**:
- `app/blog/page.tsx` — index hub at `/blog`. `getAllPosts()` (all 547), splits into `[featured, ...rest]`. Cards link to root `/{slug}`. Emits `Blog` + `BreadcrumbList` JSON-LD.
- `app/[slug]/page.tsx` — **root-level** dynamic post (NOT `/blog/[slug]` — that route was removed and 301s to `/:slug`). Posts live at their original slug to keep legacy rankings. `dynamicParams=false` + `generateStaticParams()` SSGs every post; unknown slugs 404. `generateMetadata()` emits canonical `${SITE_URL}/${slug}/` (trailing slash), OG `type:article`, Twitter card. Emits `Article` + `BreadcrumbList` JSON-LD. Body: breadcrumb → eyebrow → H1 → lede → meta → hero image → `<BlogPostBody />` → primary CTA → related grid → coral CTA band.

**CSS namespace** (`.blog-*` in `globals.css`):
- `.blog-eyebrow`, `.blog-crumbs`, `.blog-card-eyebrow` — category labels
- `.blog-index-hero`, `.blog-index-title`, `.blog-index-lede` — index hero
- `.blog-featured`, `.blog-featured-image`, `.blog-featured-body` — top card
- `.blog-grid`, `.blog-card`, `.blog-card-image`, `.blog-card-body`, `.blog-card-link` — post-card grid
- `.blog-post-hero`, `.blog-post-title`, `.blog-post-lede`, `.blog-meta`, `.blog-hero-image-wrap`, `.blog-hero-image` — post hero
- `.blog-prose`, `.blog-p`, `.blog-h2`, `.blog-h3`, `.blog-list` — body typography (line-height 1.75, `--container-narrow` width, pink-deep underline links)
- `.blog-html` — wrapper for imported raw-HTML bodies; styles bare `p/h2/h3/h4/ul/ol/li/a/img/figure/figcaption/table/blockquote` to match the `.blog-*` design
- `.blog-callout`, `.blog-quote`, `.blog-inline-cta` — body block variants
- `.blog-post-cta`, `.blog-related-section`, `.blog-related-title`, `.blog-cta-band` — closing chrome

Responsive: `.blog-grid` 3→2→1, `.blog-featured` stacks at ≤980, hero-image transform shrinks, prose padding tightens. Title clamps fall under the global `main h1` rule at ≤640.

**Sitemap**: `next-sitemap` auto-discovers the SSG'd root post pages from the build output (570 URLs total) at the default 0.7 priority; the `/blog` index sits at 0.8. No per-post wiring needed.

**Adding a post**: append a new `BlogPost` object to `POSTS` in `content/blog.ts` (it gets the root `/{slug}/` URL like every other post). To re-pull or refresh the legacy WordPress import, re-run `node scripts/import-wp-blog.mjs` **while the old WP site is still live** — once the Next site is cut over to thunderclap.com the WP API + wp-content images go away, so any re-import must happen before that.

## Cart system (`components/cart-context.tsx`)

`<CartProvider>` wraps `app/layout.tsx` and exposes `useCart()` to every client component below it. State persists in `localStorage` under key `tc:cart:v1`; the provider also tracks `isDrawerOpen` and the `lastAddedPlatform` so the drawer can spotlight "more from {platform}" upsells right after an add.

- **CartItem shape**: `{ id, platform, service, qty, price, regular, premium, target?, addedAt }`. `id = "${platform}-${service}-${premium ? 'p' : 's'}"` — so adding the same platform+service+premium combo REPLACES the line rather than stacking. Different `premium` is a separate line.
- **`addItem(input)`** sets the line, records `lastAddedPlatform`, and **auto-opens the drawer**. This is the "feedback + upsell" affordance — there's no separate toast.
- **`removeItem(id)`** drops the line in place.
- **`updateTarget(id, target)`** / **`setAllTargets(target)`** — the checkout form uses `setAllTargets` since the form collects a single shared target for the whole order.
- **`openDrawer()` / `closeDrawer()`** — the header cart button calls `openDrawer`; the drawer's X / backdrop / Escape call `closeDrawer`.
- **`clear()`** is wired to the Clear-cart button inside the drawer.
- **`hydrated`** flips to `true` after the first `localStorage` read so server-rendered components can render an empty-state skeleton without flashing the wrong UI.

Service-page builders all import `useCart` and bind the in-card `.pkg-cta` + sticky `.side-cta` buttons to `onAddToCart` (calls `addItem` with the current `pkg` + `premium` state). The buttons are `<button onClick=…>` now — not Next `<Link>` — because navigation no longer happens there. The drawer auto-opens to confirm the add and show same-platform upsells.

The drawer (`components/cart-drawer.tsx`) is the only cart UI — there is **no `/cart` page**. Desktop: right-rail slide-in panel (480px wide). Mobile (≤640): bottom-sheet (full-width, 92vh tall). Backdrop click / Escape / X all close it. Body scroll lock + `overscroll-behavior: contain`. The "MORE FROM {platform}" upsell row sits below the line items and uses `<button onClick={() => addItem(…)}>` Add buttons (no navigation) so users can stack same-platform services without leaving the drawer. The upsell tiers live in `SUGGESTION_POOL` (one tier per platform-service, `qty`/`price`/`regular` must match that tier in the builder's `PACKAGES`) and the empty-state "Browse" links in `BROWSE_LINKS` (`from` = lowest tier of the linked page). **These are a 4th price source of truth — keep in sync with the builders (see the pricing note in the homepage section).**

The header (`components/header.tsx`) shows a small `.hdr-cart-btn` (a `<button>`, not a Link) with `.hdr-cart-badge` (count) next to the rest of the chrome at every breakpoint. On mobile it has `margin-right: -22px` so it sits flush against the hamburger toggle (the container has inline `gap: 32` that can't be overridden by a media query, so the negative margin pulls them together visually).

## Checkout flow (cart → /checkout/ → Redlap → Return → Success/Failed)

The full payment funnel is wired end-to-end. The Thunderclap site only verifies that payment succeeded; **order fulfillment lives inside the Redlap environment** — don't add fulfillment hooks here.

There are no URL params on `/checkout/` anymore. The page reads the cart from `useCart()` and renders **one shared target input for the whole order** (label/placeholder pulled from the first item's `INPUT_CONFIG` entry; falls back to a generic "Your social media link or username" when the cart mixes platforms), plus a single shared `email`. On submit the form calls `setAllTargets(target)` so every cart item carries that value into the API payload. If the cart is empty, a "Browse services" empty state is shown.

- **Per-service input** label and placeholder are looked up from `INPUT_CONFIG[`${platform}-${service}`]` in `app/checkout/_config.ts` — extend this map when adding new service combos
- **Platform-coloured input chip** uses `.platform-instagram` / `.platform-tiktok` / `.platform-youtube` / `.platform-facebook` / `.platform-twitter` modifier classes on `.co-input-icon`
- The form runs native HTML validation — `noValidate` is intentionally off. The submit handler also explicitly guards that target + email are non-empty.

On submit the form `fetch`es `POST /api/checkout/session` with `{ items: [{ platform, service, qty, price, premium, target }, ...], email }`. The API computes `total = sum(price * (premium ? 1.35 : 1))`, builds the Redlap metadata (see below), and returns `{ redirectUrl }`; the client `window.location.href`s to the Redlap-hosted payment page. There is **no on-site method picker** — Card / Apple Pay / Google Pay / Crypto are presented on the Redlap page. Error messages from the API are surfaced inline via `.co-pay-err`.

**`/checkout/return`** is the landing point Redlap redirects back to. It validates Redlap-appended params (`payment_status`, `payment_id`, `order_number`); if `payment_status` is already `failed`/`cancelled`/`expired` it 302s straight to `/checkout/failed`. Otherwise it renders a "Confirming…" UI with a client island (`_poll.tsx`) that polls `/api/checkout/status?sid=...` every 3s for up to ~3 minutes, then `router.replace`s to `/checkout/success` or `/checkout/failed?reason=...`.

**`/checkout/success`** displays the confirmed order (`order_id`, `payment_id`, `order_number`, package, total, target). Reads order_id from URL (set by `/api/checkout/session`), falls back to a deterministic hash for legacy paths.

**`/checkout/failed`** shows a reason-specific message (`failed`, `cancelled`, `expired`, `timeout`, `missing_session`, `error`) and a "Try payment again" CTA that round-trips back to `/checkout` with the same params intact.

All checkout classes are prefixed `.co-*` and live in the "Checkout" block of `globals.css`. Don't add ad-hoc inline styles for chrome — extend the `.co-*` set instead.

## Redlap (Social Empire Pay) integration

Modelled on the WooCommerce PHP plugin (`/tmp/redlap-plugin.php` reference if re-extracted). Contract:

| Endpoint | Direction | Purpose |
| --- | --- | --- |
| `POST {REDLAP_API_BASE}/api/payments/sessions` | us → Redlap | Create a session. Returns `{ id, frontendPaymentUrl }`. |
| `GET  {REDLAP_API_BASE}/api/payments/sessions/:id` | us → Redlap | Authoritative status / final price / coupon. |
| `POST /api/redlap/webhook` | Redlap → us | Server-to-server confirmation. Header `X-Webhook-Signature` is `hmac_sha256(rawBody, REDLAP_WEBHOOK_SECRET)` hex. Events: `payment.completed`, `payment.failed`, `payment.expired`. |

**Env vars** (all in `.env.example`):
- `REDLAP_API_BASE` — production `https://api.redlap.xyz`, sandbox `https://sa-b084fe3ea34a4a86be5e2766f8f09494.ecs.eu-central-1.on.aws`. The client strips a trailing `/api/` if pasted by mistake, then appends `/api/payments/sessions` itself.
- `REDLAP_API_KEY` — optional bearer token
- `REDLAP_WEBHOOK_SECRET` — used by HMAC verification (required for webhook to accept anything)
- `REDLAP_WEBSITE_ID` — Redlap-issued numeric id for this site
- `REDLAP_WEBSITE_ORIGIN` — optional; defaults to `NEXT_PUBLIC_SITE_URL`
- `REDLAP_EXPIRES_IN` — optional, default 3600s

**Webhook config in Redlap dashboard**: point it at `${NEXT_PUBLIC_SITE_URL}/api/redlap/webhook`.

**Persistence**: there is no database. `lib/redlap-status-cache.ts` keeps an in-process Map (TTL 30 min, cap 2000 entries) so the status route can short-circuit polling when the webhook lands before the user is redirected back. On cold start the map is empty and the status route falls back to a live `GET /api/payments/sessions/:id` — that's always the truth. Don't paper over the lack of persistence with a feature flag; if you need durable storage, add Vercel KV and replace the cache module wholesale.

**SMM fulfillment routing**: Redlap routes fulfillment based on a numeric `smmServiceId` keyed off the SMM panel it talks to. `app/api/checkout/session/route.ts` has an `SMM_SERVICE_IDS` map keyed by `${platform}-${service}`. The metadata payload sent to Redlap now carries the full cart:

```ts
metadata: {
  tcOrderId, email, currency, // top-level standards
  items: [{ platform, service, qty, price, premium, target, smmServiceId? }, ...],
  smmDataItems: [{ smmServiceId, amount, url }, ...],   // one entry per mapped item
  // Legacy single-item field — only included when the cart has exactly one mapped item.
  // Kept around because some downstream Redlap fulfillment code paths still read `smmData` directly.
  smmData?: { smmServiceId, amount, url },
}
```

Currently mapped: `tiktok-followers: 5818`, `tiktok-likes: 1126`, `tiktok-views: 9121`, `instagram-followers: 8072`, `instagram-likes: 2916`, `instagram-views: 7762`, `instagram-comments: 1873`, `facebook-followers: 4139`, `facebook-likes: 4704`, `facebook-views: 4715`, `youtube-subscribers: 8125`, `youtube-likes: 9538`, `youtube-views: 1573`, `twitter-followers: 2594`, `twitter-likes: 970`, `twitter-retweets: 3308`, `linkedin-connections: 5471`, `linkedin-followers: 5467`, `linkedin-likes: 5472`, `linkedin-comments: 5475`. All 6 platforms × their services are now mapped. Add more entries as the user supplies them — unmapped pairs are included in `items[]` without a `smmServiceId` (and contribute nothing to `smmDataItems`), letting Redlap fall back to its default routing for those lines.

## WebEngage event tracking

Behavioural analytics is wired through WebEngage's REST API. The flow is always **client helper → `POST /api/webengage/track` → WebEngage REST API** — the browser never calls WebEngage directly (keeps the API key server-side, dodges CORS).

**Two modules:**
- `lib/webengage.ts` — server-only. `trackEvent({ userId?, anonymousId?, eventName, eventTime?, eventData? })` POSTs to `${WEBENGAGE_API_HOST}/v1/accounts/${WEBENGAGE_LICENSE_CODE}/events` with a `Bearer ${WEBENGAGE_API_KEY}` header. `trackUser(...)` hits the `/users` endpoint. Both **return `false` instead of throwing** when credentials are missing or the call fails — analytics must never break a request. Exports `WE_EVENTS` (the canonical event-name constants).
- `lib/webengage-client.ts` — `"use client"` helpers. Each `track*` function builds the right `eventData` shape and fire-and-forgets a `fetch` to `/api/webengage/track`. An **anonymous id** is minted once per browser (`localStorage` key `tc:we_anon_id`, format `anon_<ts>_<rand>`) and attached to every event; events tied to a known user (newsletter, checkout completed) also pass `userId: email`.

**Event catalogue** (names must match the WebEngage dashboard exactly — note the capital-N `NewsLetter`):

| Event | Helper | Fires from |
| --- | --- | --- |
| `Page Viewed` | `trackPageViewed` | `components/page-view-tracker.tsx` `<PageViewTracker>` — mounted once in `app/layout.tsx` (Suspense-wrapped, since it uses `useSearchParams`). Fires on initial load + every client route change; `eventData` carries `Path`/`URL`/`Title`/`Referrer`, deduped via a `useRef`. Tracks ALL pages globally — wired ✅ |
| `Added To Cart` | `trackAddedToCart` | `cart-context.tsx` `addItem()` — wired ✅ |
| `Checkout Started` | `trackCheckoutStarted` | `app/checkout/_form.tsx` `useEffect` (once, when cart hydrates with items) — wired ✅ |
| `Order Initiated` | `trackOrderInitiated` | `_form.tsx` `onSubmit` (before creating the Redlap session) — wired ✅ |
| `NewsLetter Subscribed` | `trackNewsletterSubscribed` | `_form.tsx` `onSubmit` when the promo opt-in box is checked — wired ✅ |
| `Checkout Completed` | server `trackEvent` in `lib/webengage.ts` | Fired **server-side from the Redlap webhook** (`app/api/redlap/webhook`) on the first `payment.completed` — reliable even if the buyer never returns to `/checkout/success`. Reads order details back from the session metadata; deduped via the status cache. The old client-side `<PurchaseTracker>` was removed. The client `trackCheckoutCompleted` helper still exists but is no longer wired — wired ✅ |
| `Category Selected` | `trackCategorySelected` | helper ready — not yet bound to a UI surface |
| `Package Selected` | `trackPackageSelected` | helper ready — not yet bound |
| `Top Menu Clicked` | `trackTopMenuClicked` | helper ready — not yet bound |
| `Cart Viewed` | `trackCartViewed` | helper ready — not yet bound |
| `Homepage CTA Clicked` | `trackHomepageCTAClicked` | helper ready — not yet bound |

The last five helpers exist with the correct `eventData` contract but aren't called from any component yet — wire them to the relevant click/view handlers when those surfaces get tracked.

**Env vars** (in `.env.example`, must be baked into `.env.production` via `amplify.yml` like the Redlap ones — Amplify console env vars don't reach the SSR runtime):
- `WEBENGAGE_API_HOST` — defaults to `https://api.webengage.com`
- `WEBENGAGE_LICENSE_CODE` — account license code (part of the events URL)
- `WEBENGAGE_API_KEY` — REST API bearer token

When credentials are absent the server client silently no-ops (logs a skip line in dev), so the site runs fine locally without WebEngage configured.

## Ahrefs SEO grounding (don't change these without re-checking)

The repo is a real DR-72 domain with established Google rankings. Several decisions are grounded in Ahrefs data and should NOT be reverted without re-running the lookup:

- **URL pattern `/buy-{platform}-{service}`** matches every high-volume commercial keyword in the niche (`buy instagram followers` 34K vol, `buy tiktok followers` 31K, `buy youtube views` 16K). The live `/buy-instagram-followers` URL on the domain already ranks #1 for branded queries — keep it canonical, don't 404 it.
- **301 redirects in `next.config.ts`** preserve legacy prod URLs (`/buy-instagram-impressions`, `/free-youtube-subscribers`, `/{platform}`) → new canonicals. Don't drop them.
- **Lowest-difficulty / highest-ROI keywords** (to target with future content): `buy retweets` (KD 0), `buy twitter likes` (KD 3), `buy facebook followers` (KD 13), `buy youtube subscribers` (KD 14), `buy youtube views` (KD 24). Blog posts target these adjacent informational clusters.

When porting this stack to a new domain that doesn't have an existing ranking history, the URL pattern still applies (the exact-match slug is good SEO regardless) but the 301-redirect list should be replaced with whatever legacy URLs that domain has.

## Portable feature recipes (for copying to new sites)

These are the patterns worth lifting wholesale when standing up a similar site:

1. **`/buy-{platform}-{service}` URL pattern** → matches commercial-intent SERPs exactly. File layout `app/(marketing)/buy-{platform}-{service}/{page.tsx,_builder.tsx,_faqs.ts}` with the rule that `_faqs.ts` must NOT live inside the `"use client"` builder.
2. **Service-page template** (8 sections, see above) — produces tested ~$0.49-anchored, JSON-LD-rich pages that convert.
3. **Mega-menu** (`components/mega-menu.tsx` + `.mm-*` CSS) — drop-in desktop dropdown. Swap the `MEGA_PLATFORMS` data array for the new site's services.
4. **CSS-driven mobile/desktop chrome swap** in the header — never gate by `useState(matchMedia)`. Class-based `display: none` at `@media (max-width: 980px)` works on SSR.
5. **Full-screen mobile sheet with internal close X** — not a slide-down. Body scroll-lock + `overscroll-behavior: contain` + Escape key.
6. **Trust ticker** (`components/ticker.tsx` + `.ticker-*` CSS) — vertical-gradient-masked edges + duplicated rows + `translateX(-50%)` keyframe.
7. **Blog system** (`content/blog.ts` typed `BlogBlock[]` + `app/blog/_post-body.tsx` renderer + `/blog` index + root `app/[slug]/page.tsx` posts with `generateStaticParams`). For migrating an existing WordPress blog, `scripts/import-wp-blog.mjs` is the reusable recipe: pull from the live WP REST API (browser UA), keep posts at their **original root-level slugs** to preserve rankings (`dynamicParams=false`, static routes win), re-host in-content images, wrap bodies in a `{type:"html"}` block, and skip empty posts (301 them).
8. **Redlap checkout flow** (single-step `/checkout` form → `/api/checkout/session` → gateway hosted page → `/checkout/return` polling → `/checkout/success` or `/checkout/failed`). The HMAC webhook verifier + in-process status cache + `smmData` metadata block are the reusable bits.
9. **Defensive `overflow-x: clip` on `html, body`** — kills mobile horizontal scroll regardless of any descendant.
10. **3-column pricing grid at every breakpoint** (`.pkg-grid { grid-template-columns: repeat(3, 1fr) }`). Sizing scale: padding 16/8 → 14/6 → 14/6 → 12/4; min-h 92 → 82 → 78 → 72.
11. **`amplify.yml` env-baking** — inlines selected env vars into `.env.production` at build time so Next.js SSR Lambda actually sees them. Amplify's console env vars don't reach the runtime by default.
12. **SSH-only git remote** for agent sessions — HTTPS push fails silently. `git remote set-url origin git@github.com:org/repo.git` once.
13. **Service-tab strip as navigation** — `<Link href>` not `<button onClick>`. Local tab-state without page navigation is a UX trap: prices don't change, copy doesn't change, only the highlight does, and users get confused.
14. **Three sources of truth for service pricing** (PACKAGES in `_builder.tsx`, mega-menu `fromPrice` in `mega-menu.tsx`, and the cart drawer's `SUGGESTION_POOL`/`BROWSE_LINKS` in `cart-drawer.tsx`) must stay in sync. The lowest tier of PACKAGES is the `fromPrice`/`from`; the cart `SUGGESTION_POOL` mirrors a specific tier per service. Until you centralise into `content/packages.ts`, every price change touches three files. (A 4th — the homepage `service-table.tsx` — was removed 2026-06.)
15. **WebEngage event tracking** (`lib/webengage.ts` server client + `lib/webengage-client.ts` browser helpers + `/api/webengage/track` proxy). Client never calls WebEngage directly — key stays server-side. Anonymous id in `localStorage`, fire-and-forget fetches, server client no-ops without credentials. Drop-in: swap the `eventData` shapes in `webengage-client.ts` for the new site's event schema.

## Workflow rule: keep CLAUDE.md in sync

After every change that introduces a new component, convention, file layout, CSS namespace, data shape, or behaviour rule, **update this CLAUDE.md** in the same commit (or a follow-up `docs:` commit if the original is already large). CLAUDE.md is the portable spec — when it drifts from reality, future sessions waste cycles re-deriving things from code. Add new patterns to the "Portable feature recipes" list when they're worth lifting to another site.

**Don't add fulfillment hooks in the webhook handler.** Fulfillment is the Redlap environment's job. The handler verifies the signature, records the outcome, fires the WebEngage `Checkout Completed` conversion (analytics only, never blocks the ack), and acks 200.
