"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Status = "pending" | "paid" | "failed" | "expired";

const MAX_ATTEMPTS = 60; // ~3 minutes at a 3-second cadence
const INTERVAL_MS = 3000;

export function ReturnPoll({
  sessionId,
  carryParams,
}: {
  sessionId: string;
  carryParams: string;
}) {
  const router = useRouter();
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const finished = useRef(false);

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    let attemptCount = 0;

    async function tick() {
      if (cancelled || finished.current) return;
      attemptCount += 1;
      setAttempt(attemptCount);

      try {
        const res = await fetch(
          `/api/checkout/status?sid=${encodeURIComponent(sessionId)}`,
          { cache: "no-store" },
        );
        const json = (await res.json()) as { status?: Status; error?: string };
        const status = json.status ?? "pending";

        if (status === "paid") {
          finished.current = true;
          router.replace(`/checkout/success?${carryParams}`);
          return;
        }
        if (status === "failed" || status === "expired") {
          finished.current = true;
          router.replace(`/checkout/failed?${carryParams}&reason=${status}`);
          return;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error");
      }

      if (attemptCount >= MAX_ATTEMPTS) {
        finished.current = true;
        router.replace(`/checkout/failed?${carryParams}&reason=timeout`);
        return;
      }

      window.setTimeout(tick, INTERVAL_MS);
    }

    tick();
    return () => {
      cancelled = true;
    };
  }, [sessionId, carryParams, router]);

  const elapsedSec = Math.min(attempt * Math.round(INTERVAL_MS / 1000), MAX_ATTEMPTS * Math.round(INTERVAL_MS / 1000));

  return (
    <section className="co-return">
      <span className="co-return-spinner" aria-hidden />
      <h1>Confirming your payment</h1>
      <p>
        Waiting for the gateway to confirm. This usually takes a few seconds —
        don&rsquo;t close this tab.
      </p>
      <div className="co-return-meta">
        <span>Session</span>
        <code title={sessionId}>{sessionId.slice(0, 12)}…</code>
        <span style={{ marginLeft: 18 }}>Elapsed</span>
        <code>{elapsedSec}s</code>
      </div>
      {error && (
        <p className="co-return-err" role="status">
          {error} — retrying…
        </p>
      )}
    </section>
  );
}
