/**
 * Client-side WebEngage event tracking utilities.
 * Events are sent to /api/webengage/track which forwards to WebEngage REST API.
 */

import type { Platform, Service } from "@/components/cart-context";

export type TrackEventPayload = {
  eventName: string;
  eventData?: Record<string, string | number | boolean | null | undefined>;
  userId?: string;
  anonymousId?: string;
};

// Get or create anonymous ID from localStorage
function getAnonymousId(): string {
  if (typeof window === "undefined") return "";
  const KEY = "tc:we_anon_id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = `anon_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem(KEY, id);
  }
  return id;
}

/**
 * Track an event client-side by posting to our API route.
 * Fire-and-forget — doesn't block UI.
 */
export function trackEvent(payload: TrackEventPayload): void {
  const anonymousId = payload.anonymousId || getAnonymousId();

  console.log("[WebEngage]", payload.eventName, payload.eventData ?? {});

  fetch("/api/webengage/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      anonymousId,
    }),
  }).catch(() => {
    // Silent fail — analytics shouldn't break the app
  });
}

// Event tracking functions matching WebEngage dashboard events

/**
 * Global page-view event. Fired on every route change by <PageViewTracker>
 * (mounted in app/layout.tsx). `path` includes the query string when present.
 */
export function trackPageViewed(path: string, title?: string): void {
  trackEvent({
    eventName: "Page Viewed",
    eventData: {
      Path: path,
      URL: typeof window !== "undefined" ? window.location.href : path,
      Title: title ?? (typeof document !== "undefined" ? document.title : ""),
      Referrer: typeof document !== "undefined" ? document.referrer : "",
    },
  });
}

export function trackCategorySelected(platform: Platform): void {
  trackEvent({
    eventName: "Category Selected",
    eventData: {
      Platform: platform,
      Category: platform,
    },
  });
}

export function trackPackageSelected(data: {
  platform: Platform;
  service: Service;
  qty: number;
  price: number;
  premium: boolean;
}): void {
  trackEvent({
    eventName: "Package Selected",
    eventData: {
      "Product ID": `${data.platform}-${data.service}`,
      Platform: data.platform,
      Service: data.service,
      Quantity: data.qty,
      Price: data.price,
      Premium: data.premium,
      Currency: "USD",
    },
  });
}

export function trackTopMenuClicked(menuItem: string, platform?: Platform): void {
  trackEvent({
    eventName: "Top Menu Clicked",
    eventData: {
      "Menu Item": menuItem,
      Platform: platform || "",
    },
  });
}

export function trackCartViewed(items: Array<{
  platform: Platform;
  service: Service;
  qty: number;
  price: number;
}>, total: number): void {
  trackEvent({
    eventName: "Cart Viewed",
    eventData: {
      "Cart Size": items.length,
      "Cart Total": total,
      Currency: "USD",
      Products: items.map((i) => `${i.platform}-${i.service}`).join(","),
    },
  });
}

export function trackAddedToCart(item: {
  platform: Platform;
  service: Service;
  qty: number;
  price: number;
  premium: boolean;
}): void {
  trackEvent({
    eventName: "Added To Cart",
    eventData: {
      "Product ID": `${item.platform}-${item.service}`,
      "Product Name": `${item.platform} ${item.service}`,
      Platform: item.platform,
      Service: item.service,
      Quantity: item.qty,
      Price: item.price,
      Premium: item.premium,
      Currency: "USD",
    },
  });
}

export function trackNewsletterSubscribed(email: string): void {
  trackEvent({
    eventName: "NewsLetter Subscribed",
    eventData: {
      Email: email,
    },
    userId: email,
  });
}

export function trackOrderInitiated(items: Array<{
  platform: Platform;
  service: Service;
  qty: number;
  price: number;
  premium: boolean;
}>, total: number): void {
  trackEvent({
    eventName: "Order Initiated",
    eventData: {
      "Cart Size": items.length,
      "Order Total": total,
      Currency: "USD",
      Products: items.map((i) => `${i.platform}-${i.service}`).join(","),
    },
  });
}

export function trackCheckoutStarted(items: Array<{
  platform: Platform;
  service: Service;
  qty: number;
  price: number;
  premium: boolean;
}>, total: number): void {
  trackEvent({
    eventName: "Checkout Started",
    eventData: {
      "Cart Size": items.length,
      "Cart Total": total,
      Currency: "USD",
      Products: items.map((i) => `${i.platform}-${i.service}`).join(","),
    },
  });
}

export function trackHomepageCTAClicked(ctaText: string, destination?: string): void {
  trackEvent({
    eventName: "Homepage CTA Clicked",
    eventData: {
      "CTA Text": ctaText,
      Destination: destination || "",
    },
  });
}

export function trackCheckoutCompleted(data: {
  orderId: string;
  total: number;
  email: string;
  items: Array<{
    platform: Platform;
    service: Service;
    qty: number;
    price: number;
    premium: boolean;
  }>;
}): void {
  trackEvent({
    eventName: "Checkout Completed",
    eventData: {
      "Order ID": data.orderId,
      "Order Total": data.total,
      Currency: "USD",
      "Item Count": data.items.length,
      Products: data.items.map((i) => `${i.platform}-${i.service}`).join(","),
    },
    userId: data.email,
  });
}
