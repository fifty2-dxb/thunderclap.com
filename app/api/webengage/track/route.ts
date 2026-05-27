import { NextResponse } from "next/server";
import { trackEvent } from "@/lib/webengage";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventName, eventData, userId, anonymousId } = body;

    if (!eventName || typeof eventName !== "string") {
      return NextResponse.json({ error: "eventName required" }, { status: 400 });
    }

    // Fire-and-forget — don't block the response on WebEngage
    trackEvent({
      eventName,
      eventData,
      userId,
      anonymousId,
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
