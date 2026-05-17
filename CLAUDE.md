# Thunderclap — Project Conventions

Social media growth marketing site (Instagram / TikTok / YouTube followers, likes, views). SEO-optimized, conversion-focused.

## Tech stack

- **Next.js 15** (App Router, no `src/`) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — tokens defined in `app/globals.css` under `@theme {}`
- **Lucide React** for icons
- **React Hook Form + Zod** for forms
- **Framer Motion** — use sparingly, only for hero/CTA polish
- **shadcn/ui** primitives (Radix under the hood) for accessible components when needed
- **next-sitemap** for build-time sitemap, **`app/robots.ts`** for robots
- **@vercel/analytics**, **@vercel/speed-insights**, **Partytown** for GTM
- Path alias: `@/*` → repo root
- Repo: `github.com/fifty2-dxb/thunderclap.com`, single branch `main`

## Build status (read first — what's real vs placeholder)

| Route | Status |
| --- | --- |
| `/` | Built — hero, trust bar, service table, pricing, FAQ, testimonials, CTA |
| `/instagram/{followers,likes,views}` | **Fully built** — full service-page pattern (see below) |
| `/tiktok/{followers,likes,views}` | **Fully built** — same pattern as Instagram, TikTok-branded copy + pricing |
| `/youtube/{subscribers,views}` | **Fully built** — same pattern as Instagram/TikTok, YouTube-branded copy + pricing (YPP threshold framing). FAQs export `YT_FAQS`. |
| `/checkout` | **Built — Step 1 (Details)** only. Reads `?platform=&service=&qty=&price=&premium=` from query string. No real payment integration; Step 2 (Payment) is future work. `noindex, nofollow`. |
| `/blog`, `/blog/[slug]` | Scaffolded — basic pages exist, content TBD |
| `/api/lead` | POST → webhook lead capture |
| `content/packages.ts` | **Empty stub** — `PACKAGES = [] as const`. Pricing tiers currently live inline in each `_builder.tsx`. Don't centralize unless you also rewrite the 6 builders. |

## Folder structure

```
app/
  layout.tsx                          root layout — metadata, fonts, JSON-LD, analytics
  page.tsx                            homepage
  sitemap.ts | robots.ts              SEO crawl files
  opengraph-image.tsx                 dynamic OG image
  globals.css                         design tokens + ALL component classes (single source of CSS truth)
  (marketing)/                        grouped service pages (no URL segment)
    instagram/{followers,likes,views}/{page.tsx, _builder.tsx, _faqs.ts}
    tiktok/{followers,likes,views}/{page.tsx, _builder.tsx, _faqs.ts}
    youtube/{subscribers,views}/{page.tsx, _builder.tsx, _faqs.ts}
  checkout/                           Step-1 checkout shell driven by query params
    page.tsx                          server — reads searchParams, renders layout + summary
    _form.tsx                         client — URL + email inputs, promo checkbox, submit
  blog/page.tsx
  blog/[slug]/page.tsx
  api/lead/route.ts                   lead-capture POST → webhook
components/                           header (with mobile hamburger), footer, hero, faq, pricing-table, trust-bar, testimonials, cta-section, service-table, how-it-works, announcement
lib/
  seo.ts                              SITE_URL, SITE_NAME, default metadata
  schema.ts                           JSON-LD generators
  utils.ts                            cn() + formatQty()
content/
  packages.ts                         EMPTY STUB — see Build status note
  faqs.ts                             global FAQ content (homepage)
public/                               logo.webp at root, images in /images/
```

## Design system

The visual language was locked in via a Claude Design handoff. **All design tokens live in `app/globals.css`** under `:root` and `@theme`. Use the `--uv-*` CSS variables, not arbitrary Tailwind colors.

- **Brand color**: coral red `--uv-pink` `#ef4655` (NOT navy or electric blue — earlier briefs mentioned those, but the final design is coral on warm cream)
- **Surface**: white `--uv-bg` + warm cream `--uv-bg-lavender` `#f5f3ee` for hero/footer
- **Type**: Plus Jakarta Sans (display) + Manrope (body) + JetBrains Mono — all loaded via `next/font` (self-hosted, no Google Fonts requests at runtime)
- **Component classes** ported from the handoff and added over time: `.btn`, `.btn-primary`, `.btn-outline`, `.tier`, `.tier-featured`, `.faq-chip`, `.coral-band`, `.pkg-card`, `.svc-layout`, `.svc-side`, `.compare-card`, `.persona-row`, `.related-grid`, `.testi-grid`, `.why-grid-3`, `.nav-menu*`, `.co-*` (checkout), etc. **Prefer these to re-inventing Tailwind utility soup** — they encode the design.
- **Platform side icons** (used in the service-page order summary AND in checkout's order summary): `.side-ig-icon` (IG gradient), `.side-tt-icon` (TikTok black + cyan/red glow), `.side-yt-icon` (YouTube red). Each expects a small white-stroke SVG inside.
- Gradient text accent: `.grad-text` (used on key H1/H2 phrases for brand pop)
- Coral CTA gradient button: `var(--uv-gradient-button)` — used by `.co-cta` and `.btn-primary`

## Mobile responsive system

The site was bolted onto a desktop-first design; mobile rules are concentrated in **`app/globals.css`**'s `Responsive` section at the bottom. The breakpoints are stacked:

- `@media (max-width: 1080px)` — collapse `.svc-layout` to single column
- `@media (max-width: 980px)` — header swaps to **hamburger + slide-down sheet** (logic in `components/header.tsx` driven by `matchMedia`), grids collapse to 1 column, `.faq-chips` to 1 column, `.co-grid` (checkout) to 1 column
- `@media (max-width: 720px)` — `.pkg-grid` to 2 cols, coral-band tightens
- `@media (max-width: 640px)` — main responsive bulk: `.pkg-grid` to 2 cols at 8px gap, `.svc-side` static padding, `.faq-chip` smaller, `.coral-band h2` to 28px, `.persona-img` capped, container padding 16px, **plus inline-style headline overrides via `clamp()` + `!important`** for `main h1/h2/h3/p` (this is how the inline `fontSize: 72` on service-page H1s gets capped on phones — don't remove this block)
- `@media (max-width: 480px)` — `.pkg-grid` to 1 column with horizontal tier layout (hides `.pkg-qty-sub`), compare grid shrinks further

When adding new sections, target ≤ 640px viewport — that's where the bugs hide. If you add inline `fontSize` on a heading inside `<main>`, the global clamp rule already caps it on mobile.

## Header mobile menu

`components/header.tsx` runs two parallel UIs:
- **Above 980px**: hover dropdowns (existing desktop behavior). Active page highlighted via `.nav-menu-item.is-active` (lavender bg + pink text), driven by `pathname === s.href`. `aria-current="page"`.
- **At/below 980px**: hamburger button → fixed full-width sheet with accordion submenus. Body scroll lock, Escape-to-close, scrim. The "Get Started" CTA and "Track order" link both render inside the sheet (they're hidden in the chrome at this width).

Don't add a third UI mode. If you change the breakpoint, update the `matchMedia("(max-width: 980px)")` string in `header.tsx` too.

## SEO rules (must follow)

1. **Every public route exports `metadata`** with `title`, `description`, `alternates.canonical`, `openGraph`, `twitter`. Exception: `/checkout` uses `robots: { index: false, follow: false }` and skips canonical.
2. **Homepage** injects `Organization` + `WebSite` JSON-LD via a `<script type="application/ld+json">` tag in the page (not layout, to avoid duplication on other routes).
3. **Service pages** inject `Product` + `AggregateRating` + `FAQPage` + `BreadcrumbList` JSON-LD, all in `page.tsx`.
4. **`Product.offers`** uses `AggregateOffer` with `lowPrice`/`highPrice` matching the `PACKAGES` array in the matching `_builder.tsx`. Keep these in sync when you change pricing.
5. **Blog post pages** inject `Article` + `BreadcrumbList` JSON-LD.
6. **All images** use `next/image` with explicit `width` + `height` (CLS protection).
7. **All fonts** use `next/font` self-hosted; do **not** add `<link>` tags to fonts.googleapis.com.
8. **next-sitemap** runs in `postbuild`; `next-sitemap.config.js` is the source of truth for priorities and hreflang.
9. **hreflang ready**: English is the default. Structure supports `/[locale]/...` future migration — don't hardcode `/en/` paths today.
10. **Cross-link RELATED grids must use real `href`s, no `href="#"`.** SEO link equity matters. When cross-linking platforms, point to the equivalent service (`/instagram/likes` ↔ `/tiktok/likes`).

## Conversion rules

- Hero must have a **price anchor** ($0.49-style hook) above the fold.
- **Sticky trust bar**: ★★★★★ rating, "X happy customers", payment-method badges.
- Pricing table: middle tier carries the `MOST POPULAR` ribbon (`.tier-featured`).
- Service-page pricing grid: exactly one tier flagged `popular: true` in the `PACKAGES` array — that tier gets the small POPULAR star tag.
- Mobile-first targets: **LCP < 2.5s**, **CLS < 0.1**.
- Internal links: footer carries the full service grid for SEO link equity.

## Workflow

- The user reviews each step before the next begins. Don't roll multiple steps into one commit.
- After every step, run: `git add . && git commit -m "Step N: <description>" && git push origin main`.
- **Always push to `origin/main` after committing — don't ask first, just push.** No PRs, no feature branches.
- Don't add features, fallbacks, or scope creep beyond the brief.
- Use multiple parallel `Agent` subtasks when the work is mechanically repetitive across 3+ files (e.g. "wire all 6 builders the same way"). It's faster and the user has asked for this pattern explicitly.

## Source of design

`/tmp/thunderclap-design/` (extracted from the Claude Design handoff bundle) contains the original HTML/JSX prototypes. **Read those before reinventing a component** — `Service.jsx`, `Sections.jsx`, `CtaFaqBlog.jsx`, `Header.jsx`, `Footer.jsx` show the exact intended structure for every section. Note: on a fresh machine this `/tmp` folder won't exist — re-extract the handoff bundle if you need the originals.

## Service page pattern (Buy Instagram Likes is the canonical reference)

The `/instagram/likes` route is the template. Use it as the basis for new `/youtube/*` builds.

**File layout per service page:**

```
app/(marketing)/<platform>/<service>/
  page.tsx       server component — metadata, JSON-LD (Product + AggregateRating + FAQPage + BreadcrumbList), static sections
  _builder.tsx   "use client" — interactive Hero (premium toggle, service tabs, package picker, URL input, total, side summary) + FAQ chips
  _faqs.ts       plain data module — FAQ array imported by BOTH page.tsx (for JSON-LD) and _builder.tsx (for UI). Must NOT live inside _builder.tsx — a "use client" file's non-component exports cannot be statically imported by a server component, and the build will fail with `f.X_FAQS.map is not a function` during page-data collection.
```

**Hero component exports**: name them after the service for clarity — `LikesHero`/`LikesFaq` (IG) or `TikTokLikesHero`/`TikTokLikesFaq` (TT). The page.tsx imports them by name.

**FAQ export name**: Instagram pages export `IG_FAQS`, TikTok pages export `TT_FAQS`, YouTube pages export `YT_FAQS`.

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

**Pricing tiers** for the package picker live inside `_builder.tsx` as a `PACKAGES` const (14 tiers per page). When porting to other services, copy the array shape and swap the `qty`/`price`/`save` values; keep `popular: true` on exactly one tier. Keep `Product.offers` `lowPrice`/`highPrice` in `page.tsx` in sync with this array.

**Premium toggle** (`+35%`):
- Held in local `useState` inside the Hero
- Affects both the cart total (`pkg.price * (premium ? 1.35 : 1)`) AND each per-tier price displayed in `.pkg-grid`: `<span className="pkg-price">${(p.price * (premium ? 1.35 : 1)).toFixed(2)}</span>`
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

## Checkout flow

`/checkout` is the Step-1 details page. Server-rendered shell, single client island for the form.

**URL contract** (all string params):
| param | type | default | example |
| --- | --- | --- | --- |
| `platform` | `instagram` \| `tiktok` \| `youtube` | `instagram` | `instagram` |
| `service` | `followers` \| `likes` \| `views` \| `subscribers` \| `comments` | `followers` | `likes` |
| `qty` | number | `1000` | `5000` |
| `price` | number (base, USD) | `7.99` | `17.99` |
| `premium` | `0` \| `1` | `0` | `1` |

`page.tsx` validates each, applies sensible fallbacks, computes `subtotal = price * (premium ? 1.35 : 1)`, and renders:
- Sticky header (back arrow → `/${platform}/${service}`, centered logo, "Secure checkout" badge)
- Centered Details → Payment stepper (Step 1 active)
- Two-column grid (`.co-grid`): left form card (`<CheckoutForm>`), right order summary + bundle upsell + Trustpilot quote
- **Per-service input** label and placeholder are looked up from `INPUT_CONFIG[`${platform}-${service}`]` — extend this map when adding new service combos
- **Platform-coloured input chip** uses `.platform-instagram` / `.platform-tiktok` / `.platform-youtube` modifier classes on `.co-input-icon`

The form is intentionally **not wired to a payment backend yet**. `onSubmit` just simulates a brief loading state. When Step 2 lands, it should `router.push('/checkout/payment?…')` and the same query-param contract should extend with the user's `target` URL and `email`.

All checkout classes are prefixed `.co-*` and live in the "Checkout" block of `globals.css`. Don't add ad-hoc inline styles for chrome — extend the `.co-*` set instead.
