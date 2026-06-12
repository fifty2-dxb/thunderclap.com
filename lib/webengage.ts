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

export type WebEngageUserAttributes = Record<string, string | number | boolean | null>;

/**
 * WebEngage user profile. `userId` or `anonymousId` is required (userId wins
 * if both are present). The reserved system attributes are sent at the top
 * level; everything else goes under `attributes` as custom key/value pairs.
 */
export type WebEngageUser = {
  userId?: string;
  anonymousId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string; // E.164, e.g. +14155552671
  birthDate?: string; // yyyy-MM-ddTHH:mm:ss±hhmm
  gender?: "male" | "female" | "other";
  company?: string;
  emailOptIn?: boolean;
  smsOptIn?: boolean;
  whatsappOptIn?: boolean;
  hashedEmail?: string;
  hashedPhone?: string;
  attributes?: WebEngageUserAttributes;
  /** Optional idempotency key — WebEngage dedupes the same id within 4 hours. */
  requestId?: string;
};

// Reserved top-level system attributes recognised by the WebEngage Users API.
const USER_SYSTEM_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "birthDate",
  "gender",
  "company",
  "emailOptIn",
  "smsOptIn",
  "whatsappOptIn",
  "hashedEmail",
  "hashedPhone",
] as const;

/**
 * Create or update a user profile via the WebEngage REST API (server-side).
 * Docs: https://docs.webengage.com/docs/rest-api-tracking-users
 * Returns true on success, false on failure (logs but never throws) so it
 * can never break the request that triggered it.
 */
export async function trackUser(user: WebEngageUser): Promise<boolean> {
  if (!WEBENGAGE_LICENSE || !WEBENGAGE_API_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.log("[WebEngage] Skipping user (missing credentials):", user.userId || user.anonymousId);
    }
    return false;
  }

  if (!user.userId && !user.anonymousId) {
    console.error("[WebEngage] User tracking skipped: userId or anonymousId is required.");
    return false;
  }

  const url = `${WEBENGAGE_HOST}/v1/accounts/${WEBENGAGE_LICENSE}/users`;

  const payload: Record<string, unknown> = {};
  // userId wins over anonymousId when both are supplied.
  if (user.userId) payload.userId = user.userId;
  else if (user.anonymousId) payload.anonymousId = user.anonymousId;

  for (const key of USER_SYSTEM_FIELDS) {
    const value = user[key];
    if (value !== undefined && value !== null && value !== "") {
      payload[key] = value;
    }
  }

  if (user.attributes && Object.keys(user.attributes).length > 0) {
    payload.attributes = user.attributes;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${WEBENGAGE_API_KEY}`,
        ...(user.requestId ? { "x-request-id": user.requestId } : {}),
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
