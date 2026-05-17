import { NextResponse } from "next/server";
import { getRedlapEnv, getSession, normaliseStatus } from "@/lib/redlap";
import { readWebhook } from "@/lib/redlap-status-cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("sid")?.trim();
  if (!sessionId) {
    return NextResponse.json({ error: "Missing sid." }, { status: 400 });
  }

  // Fast path: webhook already landed for this session.
  const cached = readWebhook(sessionId);
  if (cached) {
    return NextResponse.json({ status: cached, source: "webhook" });
  }

  let env;
  try {
    env = getRedlapEnv();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Gateway not configured.";
    console.error("[redlap]", message);
    return NextResponse.json({ status: "pending", source: "error", error: "Gateway not configured." }, { status: 200 });
  }
  try {
    const session = await getSession(sessionId, env);
    const status = normaliseStatus(session.status);
    return NextResponse.json({
      status,
      source: "gateway",
      price: typeof session.price === "number" ? session.price : undefined,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown gateway error.";
    console.error("[redlap] getSession failed:", message);
    // Surface as pending so the client keeps polling rather than crashing
    // on a transient 502 from the gateway.
    return NextResponse.json({ status: "pending", source: "error", error: message }, { status: 200 });
  }
}
