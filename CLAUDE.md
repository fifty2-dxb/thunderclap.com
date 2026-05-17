# Thunderclap — Project Conventions

Social media growth marketing site (Instagram / TikTok / YouTube / Facebook / Twitter — followers, likes, views, subscribers, retweets). SEO-optimized, conversion-focused, payments routed through Redlap ("Social Empire Pay").

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
| `/tiktok/{followers,likes,views}` | **Fully built** — same pattern, TikTok-branded |
| `/youtube/{subscribers,views}` | **Fully built** — YouTube-branded with YPP threshold framing. FAQs export `YT_FAQS`. |
| `/facebook/{followers,likes,views}` | **Fully built** — Facebook-branded copy. FAQs export `FB_FAQS`. |
| `/twitter/{followers,likes,retweets}` | **Fully built** — labelled "Twitter / X" everywhere user-facing. FAQs export `TW_FAQS`. Adds the `retweets` service type. |
| `/checkout` | **Built** — Step 1 (Details), `noindex, nofollow`. Reads `?platform&service&qty&price&premium`, submits via `router.push` to `/checkout/payment` carrying `target` + `email`. |
| `/checkout/payment` | **Built** — Step 2 (Payment method picker). On submit POSTs `/api/checkout/session`, then `window.location` redirects to the Redlap-hosted payment page. |
| `/checkout/return` | **Built** — landing point for Redlap's redirect. Client island polls `/api/checkout/status` until terminal status, then `router.replace` to `/checkout/success` or `/checkout/failed`. |
| `/checkout/success` | **Built** — order confirmation. Reads `order_id`, `payment_id` (Redlap session), `order_number` (Redlap gateway ref) from URL. |
| `/checkout/failed` | **Built** — failure / cancelled / expired / timeout state with a "Try payment again" CTA back to `/checkout/payment`. |
| `/api/checkout/session` | POST — creates a Redlap session, returns `{ sessionId, redirectUrl, orderId }`. |
| `/api/checkout/status` | GET `?sid=…` — returns `{ status: "pending"\|"paid"\|"failed"\|"expired" }`. Reads from the in-process webhook cache, falls back to Redlap's `GET /api/payments/sessions/:id`. |
| `/api/redlap/webhook` | POST — verifies `X-Webhook-Signature` HMAC-SHA256 and records the outcome in the in-process cache. **No fulfillment** — that lives inside the Redlap environment. |
| `/blog`, `/blog/[slug]` | Scaffolded — basic pages exist, content TBD |
| `/api/lead` | POST → webhook lead capture |
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
    instagram/{followers,likes,views}/{page.tsx, _builder.tsx, _faqs.ts}
    tiktok/{followers,likes,views}/{page.tsx, _builder.tsx, _faqs.ts}
    youtube/{subscribers,views}/{page.tsx, _builder.tsx, _faqs.ts}
    facebook/{followers,likes,views}/{page.tsx, _builder.tsx, _faqs.ts}
    twitter/{followers,likes,retweets}/{page.tsx, _builder.tsx, _faqs.ts}
  checkout/
    page.tsx                          Step 1 server shell (details)
    _form.tsx                         Step 1 client form
    payment/{page.tsx, _form.tsx}     Step 2 — method picker + POST to /api/checkout/session
    return/{page.tsx, _poll.tsx}      gateway return landing + client polling island
    success/page.tsx                  order received state
    failed/page.tsx                   failure / cancelled / expired state
  blog/page.tsx
  blog/[slug]/page.tsx
  api/
    lead/route.ts                     lead-capture POST → webhook
    checkout/session/route.ts         create Redlap session
    checkout/status/route.ts          poll status
    redlap/webhook/route.ts           inbound Redlap webhook (HMAC verified)
components/                           header (with mobile hamburger), footer, hero, faq, pricing-table, trust-bar, testimonials, cta-section, service-table, how-it-works, announcement
lib/
  seo.ts                              SITE_URL, SITE_NAME, default metadata
  schema.ts                           JSON-LD generators
  utils.ts                            cn() + formatQty()
  redlap.ts                           Redlap API client + HMAC verifier
  redlap-status-cache.ts              in-process Map of session → outcome
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
- **Platform side icons** (used in the service-page order summary AND in checkout's order summary): `.side-ig-icon` (IG gradient), `.side-tt-icon` (TikTok black + cyan/red glow), `.side-yt-icon` (YouTube red), `.side-fb-icon` (Facebook blue), `.side-tw-icon` (Twitter black). Each expects a small white-stroke SVG inside.
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

1. **Every public route exports `metadata`** with `title`, `description`, `alternates.canonical`, `openGraph`, `twitter`. Exception: all `/checkout*` routes use `robots: { index: false, follow: false }` and skip canonical.
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
- **Always push to `main` after committing — don't ask first, just push.** No PRs, no feature branches. NOTE: in agent sessions HTTPS push fails (no cached credentials); use SSH: `git push git@github.com:fifty2-dxb/thunderclap.com.git main`.
- Don't add features, fallbacks, or scope creep beyond the brief.
- Use multiple parallel `Agent` subtasks when the work is mechanically repetitive across 3+ files (e.g. "wire all 6 builders the same way"). It's faster and the user has asked for this pattern explicitly.

## Source of design

`/tmp/thunderclap-design/` (extracted from the Claude Design handoff bundle) contains the original HTML/JSX prototypes. **Read those before reinventing a component** — `Service.jsx`, `Sections.jsx`, `CtaFaqBlog.jsx`, `Header.jsx`, `Footer.jsx` show the exact intended structure for every section. Note: on a fresh machine this `/tmp` folder won't exist — re-extract the handoff bundle if you need the originals.

## Service page pattern (Buy Instagram Likes is the canonical reference)

The `/instagram/likes` route is the original template. All 14 service pages (IG x3, TT x3, YT x2, FB x3, TW x3) follow it identically.

**File layout per service page:**

```
app/(marketing)/<platform>/<service>/
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

## Checkout flow (Steps 1 → 2 → Redlap → Return → Success/Failed)

The full payment funnel is wired end-to-end. The Thunderclap site only verifies that payment succeeded; **order fulfillment lives inside the Redlap environment** — don't add fulfillment hooks here.

**URL contract (Step 1, `/checkout`)** — all string params:

| param | type | default |
| --- | --- | --- |
| `platform` | `instagram` \| `tiktok` \| `youtube` \| `facebook` \| `twitter` | `instagram` |
| `service` | `followers` \| `likes` \| `views` \| `subscribers` \| `comments` \| `retweets` | `followers` |
| `qty` | number | `1000` |
| `price` | number (base, USD) | `7.99` |
| `premium` | `0` \| `1` | `0` |
| `target` / `email` | strings — optional on Step 1 (set when user comes back from Step 2 via back) | — |

`/checkout/page.tsx` validates each, applies sensible fallbacks, computes `subtotal = price * (premium ? 1.35 : 1)`, and renders a two-column grid: form (`<CheckoutForm>`) on left, order summary + bundle upsell + Trustpilot quote on right.

- **Per-service input** label and placeholder are looked up from `INPUT_CONFIG[`${platform}-${service}`]` — extend this map when adding new service combos
- **Platform-coloured input chip** uses `.platform-instagram` / `.platform-tiktok` / `.platform-youtube` / `.platform-facebook` / `.platform-twitter` modifier classes on `.co-input-icon`

On submit Step 1 carries everything (`target`, `email` included) forward as `router.push('/checkout/payment?...')`.

**Step 2 (`/checkout/payment`)** is a method picker (Card / Apple Pay / Google Pay / Crypto tabs — UI only; the actual card form lives on the Redlap-hosted page). Submit does `POST /api/checkout/session` and on success sets `window.location.href = redirectUrl` to hand off to Redlap. Error messages from the API are surfaced inline via `.co-pay-err`.

**Step 3 (`/checkout/return`)** is the landing point Redlap redirects back to. It validates Redlap-appended params (`payment_status`, `payment_id`, `order_number`); if `payment_status` is already `failed`/`cancelled`/`expired` it 302s straight to `/checkout/failed`. Otherwise it renders a "Confirming…" UI with a client island (`_poll.tsx`) that polls `/api/checkout/status?sid=...` every 3s for up to ~3 minutes, then `router.replace`s to `/checkout/success` or `/checkout/failed?reason=...`.

**`/checkout/success`** displays the confirmed order (`order_id`, `payment_id`, `order_number`, package, total, target). Reads order_id from URL (set by `/api/checkout/session`), falls back to a deterministic hash for legacy paths.

**`/checkout/failed`** shows a reason-specific message (`failed`, `cancelled`, `expired`, `timeout`, `missing_session`, `error`) and a "Try payment again" CTA that round-trips back to `/checkout/payment` with the same params intact.

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

**Don't add fulfillment hooks in the webhook handler.** Fulfillment is the Redlap environment's job. The handler only verifies the signature, records the outcome, and acks 200.
