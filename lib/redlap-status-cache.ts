/**
 * Tiny in-memory cache of webhook outcomes, keyed by Redlap session id.
 *
 * Lives for the lifetime of a single Node process. Good enough for local
 * dev and for serverless invocations within the same warm container; on
 * a cold start the cache is empty and the status route falls back to a
 * live `GET /api/payments/sessions/:id` against Redlap (which is the
 * real source of truth). We use this only to short-circuit the poll
 * loop in the common case where the webhook lands before the user is
 * redirected back.
 */

type Outcome = "paid" | "failed" | "expired";
type Entry = { outcome: Outcome; receivedAt: number };

const CACHE = new Map<string, Entry>();
const MAX_ENTRIES = 2000;
const TTL_MS = 30 * 60 * 1000;

function prune(now: number) {
  for (const [key, entry] of CACHE) {
    if (now - entry.receivedAt > TTL_MS) CACHE.delete(key);
  }
  if (CACHE.size > MAX_ENTRIES) {
    // Drop the oldest until we are back under the cap.
    const sorted = [...CACHE.entries()].sort(
      (a, b) => a[1].receivedAt - b[1].receivedAt,
    );
    while (sorted.length && CACHE.size > MAX_ENTRIES) {
      const next = sorted.shift();
      if (next) CACHE.delete(next[0]);
    }
  }
}

export function recordWebhook(sessionId: string, outcome: Outcome): void {
  const now = Date.now();
  prune(now);
  CACHE.set(sessionId, { outcome, receivedAt: now });
}

export function readWebhook(sessionId: string): Outcome | null {
  const entry = CACHE.get(sessionId);
  if (!entry) return null;
  if (Date.now() - entry.receivedAt > TTL_MS) {
    CACHE.delete(sessionId);
    return null;
  }
  return entry.outcome;
}
