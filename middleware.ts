import { NextResponse, type NextRequest } from "next/server";

/**
 * Legacy WordPress asset / admin / API paths that should return a clean 404
 * instead of looping through the trailing-slash redirect into the
 * `app/not-found.tsx` 308-to-home. Returning HTML home for a `<img src=
 * "/wp-content/...">` is wrong for browsers and confusing for crawlers
 * expecting an asset.
 *
 * Only WP-specific prefixes are silenced here — generic asset 404s outside
 * these prefixes still go through the homepage redirect.
 */
const SILENT_404_PREFIXES = [
  /^\/wp-content\//,
  /^\/wp-includes\//,
  /^\/wp-admin\b/,
  /^\/wp-json\//,
  /^\/xmlrpc\.php\b/,
];

export function middleware(req: NextRequest) {
  if (SILENT_404_PREFIXES.some((re) => re.test(req.nextUrl.pathname))) {
    return new NextResponse("Not found", { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  // Skip Next internals, API routes, and the few real assets we serve directly
  // from /public — middleware must not intercept those.
  matcher: ["/((?!_next/|api/|sitemap\\.xml|robots\\.txt|favicon\\.ico|logo\\.webp|images/).*)"],
};
