/**
 * Client-side WebEngage tracking via the in-browser JS SDK.
 * The SDK is loaded in app/layout.tsx (the `_webengage_script_tag` snippet),
 * which exposes a queue-backed `window.webengage` synchronously — so calls
 * made before the SDK finishes downloading are buffered, not dropped.
 */

import type { Platform, Service } from "@/components/cart-context";

type WebEngageUserApi = {
  login: (userId: string) => void;
  logout: () => void;
  // The SDK's setAttribute takes one key/value pair at a time, not an object.
  setAttribute: (key: string, value: unknown) => void;
};

type WebEngageSDK = {
  track: (eventName: string, eventData?: Record<string, unknown>) => void;
  user: WebEngageUserApi;
};

declare global {
  interface Window {
    webengage?: WebEngageSDK;
  }
}

export type TrackEventPayload = {
  eventName: string;
  eventData?: Record<string, string | number | boolean | null | undefined>;
};

/** Track an event through the WebEngage JS SDK. No-ops if the SDK is absent. */
export function trackEvent(payload: TrackEventPayload): void {
  if (typeof window === "undefined" || !window.webengage) return;
  window.webengage.track(payload.eventName, payload.eventData ?? {});
}

/**
 * Identify the current visitor: log them in under their email (so every
 * subsequent event ties to one user) and write the reserved WebEngage profile
 * attributes (`we_first_name` / `we_last_name` / `we_email` / `we_phone`).
 * Call this the moment a visitor gives their details.
 */
export function identifyUser(data: {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  attributes?: Record<string, string | number | boolean | null>;
}): void {
  if (typeof window === "undefined" || !window.webengage) return;
  const we = window.webengage;
  we.user.login(data.email);

  we.user.setAttribute("we_email", data.email);
  if (data.firstName) we.user.setAttribute("we_first_name", data.firstName);
  if (data.lastName) we.user.setAttribute("we_last_name", data.lastName);
  if (data.phone) we.user.setAttribute("we_phone", data.phone);
  if (data.attributes) {
    for (const [key, value] of Object.entries(data.attributes)) {
      we.user.setAttribute(key, value);
    }
  }
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
  });
}
