import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// nodemailer needs the Node.js runtime (not Edge).
export const runtime = "nodejs";

const ZOHO_EMAIL = process.env.ZOHO_EMAIL;
const ZOHO_PASSWORD = process.env.ZOHO_PASSWORD;
// Where AI Growth waitlist signups are delivered. Fixed server-side on purpose
// (same as /api/contact) so this can't be abused as a generic mail relay.
const CONTACT_TO = process.env.CONTACT_TO || "support@thunderclap.com";
const SMTP_HOST = process.env.ZOHO_SMTP_HOST || "smtp.zoho.com";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Strip CR/LF so user input can't inject extra mail headers. */
function oneLine(s: string): string {
  return s.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const firstName = oneLine(String(body.firstName ?? "")).slice(0, 80);
  const lastName = oneLine(String(body.lastName ?? "")).slice(0, 80);
  const email = oneLine(String(body.email ?? "")).slice(0, 160);

  if (!firstName || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide your first name and a valid email." },
      { status: 400 },
    );
  }

  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  if (!ZOHO_EMAIL || !ZOHO_PASSWORD) {
    console.error("[ai-waitlist] Missing ZOHO_EMAIL / ZOHO_PASSWORD env vars.");
    return NextResponse.json(
      { ok: false, error: `Signup isn't configured yet. Please email ${CONTACT_TO} directly.` },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: 465,
    secure: true, // 465 = implicit TLS
    auth: { user: ZOHO_EMAIL, pass: ZOHO_PASSWORD },
  });

  const text = `New AI Growth waitlist signup

First name: ${firstName}
Last name:  ${lastName}
Email:      ${email}`;

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a">
  <h2 style="margin:0 0 12px">New AI Growth waitlist signup</h2>
  <p style="margin:0 0 4px"><strong>First name:</strong> ${escapeHtml(firstName)}</p>
  <p style="margin:0 0 4px"><strong>Last name:</strong> ${escapeHtml(lastName)}</p>
  <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(email)}</p>
</div>`;

  try {
    const info = await transporter.sendMail({
      // `from` must be the authenticated Zoho account or Zoho rejects it.
      from: { name: "Thunderclap AI Waitlist", address: ZOHO_EMAIL },
      to: CONTACT_TO,
      replyTo: { name: fullName || firstName, address: email },
      subject: `[AI Growth Waitlist] ${fullName || firstName}`,
      text,
      html,
    });
    return NextResponse.json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error("[ai-waitlist] sendMail failed:", err);
    return NextResponse.json(
      { ok: false, error: `We couldn't add you to the list. Please try again or email ${CONTACT_TO}.` },
      { status: 502 },
    );
  }
}
