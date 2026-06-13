"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

// Paths where the bouncing launcher must be hidden (checkout / cart funnel).
const HIDE_PREFIXES = ["/checkout", "/cart"];

export function WorldCupGame() {
  const pathname = usePathname();

  useEffect(() => {
    const hide = HIDE_PREFIXES.some((p) => pathname.startsWith(p));
    if (hide) document.body.setAttribute("data-wc-hide", "1");
    else document.body.removeAttribute("data-wc-hide");
  }, [pathname]);

  return <Script src="/worldcup-game.js" strategy="afterInteractive" />;
}
