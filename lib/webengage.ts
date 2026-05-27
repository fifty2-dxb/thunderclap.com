/**
 * WebEngage REST API client for server-side event tracking.
 * Docs: https://docs.webengage.com/docs/rest-api-tracking-events
 */

const WEBENGAGE_HOST = process.env.WEBENGAGE_API_HOST || "https://api.webengage.com";
const WEBENGAGE_LICENSE = process.env.WEBENGAGE_LICENSE_CODE;
const WEBENGAGE_API_KEY = process.env.WEBENGAGE_API_KEY;

export type WebEngageEventData = Record<string, string | number | boolean | null | undefined>;

export type WebEngageEvent = {
  userId?: string;
  anonymousId?: string;
  eventName: string;
  eventTime?: string;
  eventData?: WebEngageEventData;
};

/**
 * Track an event via WebEngage REST API (server-side).
 * Returns true on success, false on failure (logs error but doesn't throw).
 */
export async function trackEvent(event: WebEngageEvent): Promise<boolean> {
  if (!WEBENGAGE_LICENSE || !WEBENGAGE_API_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.log("[WebEngage] Skipping event (missing credentials):", event.eventName);
    }
    return false;
  }

  const url = `${WEBENGAGE_HOST}/v1/accounts/${WEBENGAGE_LICENSE}/events`;

  const payload = {
    userId: event.userId,
    anonymousId: event.anonymousId,
    eventName: event.eventName,
    eventTime: event.eventTime || new Date().toISOString(),
    eventData: event.eventData || {},
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${WEBENGAGE_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[WebEngage] Event tracking failed (${res.status}):`, body);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[WebEngage] Event tracking error:", err);
    return false;
  }
}

/**
 * Track a user profile update via WebEngage REST API.
 * Docs: https://docs.webengage.com/docs/rest-api-tracking-users
 */
export async function trackUser(data: {
  userId?: string;
  anonymousId?: string;
  email?: string;
  attributes?: Record<string, string | number | boolean | null>;
}): Promise<boolean> {
  if (!WEBENGAGE_LICENSE || !WEBENGAGE_API_KEY) {
    return false;
  }

  const url = `${WEBENGAGE_HOST}/v1/accounts/${WEBENGAGE_LICENSE}/users`;

  const payload: Record<string, unknown> = {};
  if (data.userId) payload.userId = data.userId;
  if (data.anonymousId) payload.anonymousId = data.anonymousId;
  if (data.email) payload.email = data.email;
  if (data.attributes) Object.assign(payload, data.attributes);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${WEBENGAGE_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[WebEngage] User tracking failed (${res.status}):`, body);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[WebEngage] User tracking error:", err);
    return false;
  }
}

// Pre-defined event names matching WebEngage dashboard
export const WE_EVENTS = {
  PAGE_VIEWED: "Page Viewed",
  CATEGORY_SELECTED: "Category Selected",
  PACKAGE_SELECTED: "Package Selected",
  TOP_MENU_CLICKED: "Top Menu Clicked",
  CART_VIEWED: "Cart Viewed",
  ADDED_TO_CART: "Added To Cart",
  NEWSLETTER_SUBSCRIBED: "NewsLetter Subscribed",
  ORDER_INITIATED: "Order Initiated",
  CHECKOUT_STARTED: "Checkout Started",
  HOMEPAGE_CTA_CLICKED: "Homepage CTA Clicked",
  CHECKOUT_COMPLETED: "Checkout Completed",
} as const;
