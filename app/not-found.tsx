import { permanentRedirect } from "next/navigation";

/**
 * Catch-all for unmatched HTML routes — 308-redirect every unknown URL to /.
 *
 * After the WP → Next cutover there are many old URLs in the wild (external
 * backlinks, indexed pages without a 1:1 mapping in the new site). Returning a
 * clean 404 forfeited that traffic and tripped Ahrefs "4XX page" warnings, so
 * we redirect them to the homepage instead. Google + Ahrefs treat 308
 * identically to 301 for SEO.
 *
 * Triggered by: Next's default 404 (any unmatched HTML route, including
 * unknown root-level slugs that fall through `app/[slug]` with
 * `dynamicParams = false`) AND any explicit `notFound()` call.
 *
 * Does NOT redirect:
 *  - Static asset 404s (`/wp-content/...png`, missing /public files) — those
 *    are served by the asset handler and never reach this component, which is
 *    the right behaviour (we don't want PNG requests landing on HTML home).
 *  - API route 404s — those return their own JSON.
 */
export default function NotFound(): never {
  permanentRedirect("/");
}
