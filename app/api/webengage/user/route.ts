import { NextResponse } from "next/server";
import { trackUser, type WebEngageUser } from "@/lib/webengage";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<WebEngageUser>;

    if (!body.userId && !body.anonymousId) {
      return NextResponse.json({ error: "userId or anonymousId required" }, { status: 400 });
    }

    // Fire-and-forget — don't block the response on WebEngage.
    trackUser(body as WebEngageUser).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
