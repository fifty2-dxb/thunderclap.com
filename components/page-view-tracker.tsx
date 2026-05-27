"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageViewed } from "@/lib/webengage-client";

/**
 * Global page-view tracker. Mounted once in app/layout.tsx (wrapped in a
 * Suspense boundary because useSearchParams() requires it). Fires a single
 * "Page Viewed" WebEngage event on initial load and on every client-side
 * route change. Dedupes so the same URL isn't double-counted when the effect
 * re-runs with identical params.
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastUrl = useRef<string | null>(null);

  useEffect(() => {
    const qs = searchParams?.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    if (lastUrl.current === url) return;
    lastUrl.current = url;
    trackPageViewed(url);
  }, [pathname, searchParams]);

  return null;
}
