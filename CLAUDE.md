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

## Folder structure

```
app/
  layout.tsx               root layout — metadata, fonts, JSON-LD, analytics
  page.tsx                 homepage
  sitemap.ts | robots.ts   SEO crawl files
  opengraph-image.tsx      dynamic OG image
  (marketing)/             grouped service pages (no URL segment)
    instagram/{followers,likes,views}/page.tsx
    tiktok/{followers,likes,views}/page.tsx
    youtube/{subscribers,views}/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx
  api/lead/route.ts        lead-capture POST → webhook
components/                shared client/server components (hero, header, footer, faq, pricing-table, trust-bar, testimonials, cta-section)
lib/
  seo.ts                   default SEO config (SITE_URL, SITE_NAME, defaults)
  schema.ts                JSON-LD generators (Organization, WebSite, Product, FAQPage, Article, BreadcrumbList)
  utils.ts                 cn() helper + formatQty()
content/
  packages.ts              pricing tiers per service
  faqs.ts                  FAQ content (consumed by FAQ JSON-LD)
public/                    static assets (logo.webp at root, images in /images/)
```

## Design system

The visual language was locked in via a Claude Design handoff. **All design tokens live in `app/globals.css`** under `:root` and `@theme`. Use the `--uv-*` CSS variables, not arbitrary Tailwind colors.

- **Brand color**: coral red `--uv-pink` `#ef4655` (NOT navy or electric blue — earlier briefs mentioned those, but the final design is coral on warm cream)
- **Surface**: white `--uv-bg` + warm cream `--uv-bg-lavender` `#f5f3ee` for hero/footer
- **Type**: Plus Jakarta Sans (display) + Manrope (body) + JetBrains Mono — all loaded via `next/font` (self-hosted, no Google Fonts requests at runtime)
- **Component classes** ported from the handoff: `.btn`, `.btn-primary`, `.btn-outline`, `.tier`, `.tier-featured`, `.faq-chip`, `.coral-band`, `.pkg-card`, `.svc-layout`, `.compare-card`, etc. Prefer these to re-inventing Tailwind utility soup — they encode the design.
- Gradient text accent: `.grad-text` (used on key H1/H2 phrases for brand pop)

## SEO rules (must follow)

1. **Every route exports `metadata`** with `title`, `description`, `alternates.canonical`, `openGraph`, `twitter`.
2. **Homepage** injects `Organization` + `WebSite` JSON-LD via a `<script type="application/ld+json">` tag in the page (not layout, to avoid duplication on other routes).
3. **Service pages** inject `Product` + `AggregateRating` JSON-LD (price, currency, rating value, review count).
4. **FAQ component** injects `FAQPage` JSON-LD listing all question/answer pairs.
5. **Blog post pages** inject `Article` + `BreadcrumbList` JSON-LD.
6. **All images** use `next/image` with explicit `width` + `height` (CLS protection).
7. **All fonts** use `next/font/google` self-hosted; do **not** add `<link>` tags to fonts.googleapis.com.
8. **next-sitemap** runs in `postbuild`; `next-sitemap.config.js` is the source of truth for priorities and hreflang.
9. **hreflang ready**: English is the default. Structure supports `/[locale]/...` future migration — don't hardcode `/en/` paths today.

## Conversion rules

- Hero must have a **price anchor** ($0.49-style hook) above the fold.
- **Sticky trust bar**: ★★★★★ rating, "X happy customers", payment-method badges.
- Pricing table: middle tier carries the `MOST POPULAR` ribbon (`.tier-featured`).
- Mobile-first, target **LCP < 2.5s**, **CLS < 0.1**.
- Internal links: footer carries the full service grid for SEO link equity.

## Workflow

- The user reviews each step before the next begins. Don't roll multiple steps into one commit.
- After every step, run: `git add . && git commit -m "Step N: <description>"`.
- Don't push to a remote unless asked.
- Don't add features, fallbacks, or scope creep beyond the brief.

## Source of design

`/tmp/thunderclap-design/` (extracted from the Claude Design handoff bundle) contains the original HTML/JSX prototypes. **Read those before reinventing a component** — `Service.jsx`, `Sections.jsx`, `CtaFaqBlog.jsx`, `Header.jsx`, `Footer.jsx` show the exact intended structure for every section.

## Service page pattern (Buy Instagram Likes reference)

The `/instagram/likes` route is the canonical implementation pattern for service pages. Use it as the template for new `/instagram/{followers,views}`, `/tiktok/*`, `/youtube/*` routes.

**File layout per service page:**

```
app/(marketing)/<platform>/<service>/
  page.tsx       server component — metadata, JSON-LD (Product + AggregateRating + FAQPage + BreadcrumbList), static sections (Benefits, Personas, Comparison, Testimonials, Related, CtaBand)
  _builder.tsx   "use client" — interactive Hero (premium toggle, service tabs, package picker, URL input, total, side summary) + FAQ chips with collapse
  _faqs.ts       plain data module — FAQ array imported by BOTH page.tsx (for JSON-LD) and _builder.tsx (for UI). Must NOT live inside _builder.tsx — a "use client" file's non-component exports cannot be statically imported by a server component, and the build will fail with `f.IG_FAQS.map is not a function` during page-data collection.
```

**Section order on a service page** (from the design):
1. `<ServiceHero>` — breadcrumb, H1 with `.grad-text` on the variable phrase, `.live-pill`, two-column `.svc-layout` (left: premium toggle + service tabs + `.pkg-card` with 14-tier grid + URL input + total/CTA + trust strip; right: sticky `.svc-side` order summary)
2. `WHY BUY ...` — `.why-grid-3` (3 hairline cards)
3. `WHO IT'S FOR` — `.persona-row` × 3, alternating direction, on `--uv-bg-lavender`
4. `WHY THUNDERCLAP` — `.compare-card` (Thunderclap vs Others, green check / grey X)
5. `★ TRUSTPILOT` testimonials — `.testi-grid`
6. `RELATED SERVICES` — `.related-grid` (3 link cards to sibling services)
7. `.faq-chips` — 2-column chunky FAQ chips with collapse
8. `.coral-band` — pink CTA band

All required component classes already exist in `app/globals.css`. Use them — don't reinvent with Tailwind utility soup.

**Pricing tiers** for the package picker live inside `_builder.tsx` (currently the 14-tier Instagram Likes ladder: 100 → 1M). When porting to other services, copy the `PACKAGES` array shape and swap the qty/price/save values; keep `popular: true` on one tier.
