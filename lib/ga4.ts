/**
 * Client-side Google Analytics 4 (gtag) event tracking.
 *
 * gtag is loaded in app/layout.tsx (the GA4 loader + inline `gtag('config', …)`
 * for G-0T6JZ3J82L), which defines `window.gtag` and pushes onto `dataLayer`
 * synchronously — so events fired before the library finishes downloading are
 * buffered, not dropped. Every helper no-ops when gtag is absent (SSR, ad-block).
 *
 * Event names follow GA4's recommended ecommerce schema where one exists
 * (add_to_cart / remove_from_cart / view_cart / begin_checkout /
 * add_payment_info / select_item / sign_up / purchase); checkout_progress,
 * top_menu_click and cta_click are custom events.
 */

import type { Platform, Service } from "@/components/cart-context";

type GtagFn = (command: string, ...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

const CURRENCY = "USD";

export type LineLike = {
  platform: Platform;
  service: Service;
  qty: number;
  price: number;
  premium: boolean;
};

export type GaItem = {
  item_id: string;
  item_name: string;
  item_category: string;
  item_variant: string;
  price: number;
  quantity: number;
  item_qty: number;
};

function gtagEvent(name: string, params: Record<string, unknown>): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/** Effective per-line price (premium adds +35%), rounded to cents. */
function linePrice(l: LineLike): number {
  return Math.round(l.price * (l.premium ? 1.35 : 1) * 100) / 100;
}

/**
 * Map a cart line to a GA4 ecommerce item. `quantity` is fixed at 1 (one cart
 * line = one purchasable package); the follower/like count rides along as the
 * custom `item_qty` param so it isn't mistaken for GA4's unit quantity.
 */
export function toGaItem(l: LineLike): GaItem {
  return {
    item_id: `${l.platform}-${l.service}${l.premium ? "-premium" : ""}`,
    item_name: `${l.platform} ${l.service}`,
    item_category: l.platform,
    item_variant: l.premium ? "premium" : "standard",
    price: linePrice(l),
    quantity: 1,
    item_qty: l.qty,
  };
}

function sumValue(lines: LineLike[]): number {
  return Math.round(lines.reduce((s, l) => s + linePrice(l), 0) * 100) / 100;
}

export function gaAddToCart(line: LineLike): void {
  gtagEvent("add_to_cart", {
    currency: CURRENCY,
    value: linePrice(line),
    items: [toGaItem(line)],
  });
}

export function gaRemoveFromCart(line: LineLike): void {
  gtagEvent("remove_from_cart", {
    currency: CURRENCY,
    value: linePrice(line),
    items: [toGaItem(line)],
  });
}

export function gaViewCart(lines: LineLike[], value?: number): void {
  gtagEvent("view_cart", {
    currency: CURRENCY,
    value: value ?? sumValue(lines),
    items: lines.map(toGaItem),
  });
}

export function gaBeginCheckout(lines: LineLike[], value?: number): void {
  gtagEvent("begin_checkout", {
    currency: CURRENCY,
    value: value ?? sumValue(lines),
    items: lines.map(toGaItem),
  });
}

export function gaCheckoutProgress(lines: LineLike[], step: number, value?: number): void {
  gtagEvent("checkout_progress", {
    currency: CURRENCY,
    value: value ?? sumValue(lines),
    checkout_step: step,
    items: lines.map(toGaItem),
  });
}

export function gaAddPaymentInfo(lines: LineLike[], value?: number, paymentType = "redlap"): void {
  gtagEvent("add_payment_info", {
    currency: CURRENCY,
    value: value ?? sumValue(lines),
    payment_type: paymentType,
    items: lines.map(toGaItem),
  });
}

export function gaSelectItem(line: LineLike, listName = "build_your_order"): void {
  gtagEvent("select_item", {
    item_list_name: listName,
    items: [toGaItem(line)],
  });
}

export function gaSignUp(method: string): void {
  gtagEvent("sign_up", { method });
}

export function gaTopMenuClick(menuItem: string, platform?: Platform | string): void {
  gtagEvent("top_menu_click", { menu_item: menuItem, platform: platform ?? "" });
}

export function gaCtaClick(ctaText: string, location?: string): void {
  gtagEvent("cta_click", { cta_text: ctaText, location: location ?? "" });
}

/**
 * Fire the GA4 `purchase` conversion. Deduped per transaction id via
 * localStorage so a refresh on /checkout/success can't double-count the order.
 */
export function gaPurchase(data: { transactionId: string; value: number; items: GaItem[] }): void {
  if (typeof window === "undefined") return;
  const key = `ga4:purchase:${data.transactionId}`;
  try {
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, "1");
  } catch {
    // ignore storage errors — better to risk a dup than drop the conversion
  }
  gtagEvent("purchase", {
    transaction_id: data.transactionId,
    currency: CURRENCY,
    value: data.value,
    items: data.items,
  });
}
