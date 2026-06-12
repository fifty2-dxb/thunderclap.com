/**
 * Client-side WebEngage event tracking utilities.
 * Events are sent to /api/webengage/track which forwards to WebEngage REST API.
 */

import type { Platform, Service } from "@/components/cart-context";

export type TrackEventPayload = {
  eventName: string;
  eventData?: Record<string, string | number | boolean | null | undefined>;
  userId?: string;
};

const USER_ID_KEY = "tc:we_user_id";

/**
 * Get the stable WebEngage userId for this browser. Once a visitor identifies
 * (email captured), that id is promoted to their email via `setUserId` so all
 * subsequent events stay under one user. Until then it's a stable random id.
 * WebEngage's events API is keyed by `userId` (not `anonymousId`) for us.
 */
function getUserId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) {
    // Migrate any pre-existing anonymous id so we don't fork the profile.
    id = localStorage.getItem("tc:we_anon_id");
    if (!id) id = `anon_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem(USER_ID_KEY, id);
  }
  return id;
}

/** Promote this browser to a known userId (the email) once they identify. */
function setUserId(userId: string): void {
  if (typeof window === "undefined" || !userId) return;
  localStorage.setItem(USER_ID_KEY, userId);
}

/**
 * Track an event client-side by posting to our API route.
 * Fire-and-forget — doesn't block UI. Always keyed by `userId`.
 */
export function trackEvent(payload: TrackEventPayload): void {
  const userId = payload.userId || getUserId();

  console.log("[WebEngage]", payload.eventName, payload.eventData ?? {});

  fetch("/api/webengage/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      userId,
    }),
  }).catch(() => {
    // Silent fail — analytics shouldn't break the app
  });
}

/**
 * Create/update the WebEngage user profile (Users API) and promote this
 * browser's userId to the supplied email so future events tie to the same
 * user. Call this the moment a visitor gives their details.
 */
export function identifyUser(data: {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  attributes?: Record<string, string | number | boolean | null>;
}): void {
  const userId = data.email || getUserId();
  setUserId(userId);

  fetch("/api/webengage/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, ...data }),
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
  identifyUser({ email });
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

export function trackAiWaitlistJoined(data: {
  firstName: string;
  lastName: string;
  email: string;
}): void {
  identifyUser({ email: data.email, firstName: data.firstName, lastName: data.lastName });
  trackEvent({
    eventName: "AI Growth Waitlist",
    eventData: {
      "First Name": data.firstName,
      "Last Name": data.lastName,
      Email: data.email,
    },
    userId: data.email,
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
