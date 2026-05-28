import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// nodemailer needs the Node.js runtime (not Edge).
export const runtime = "nodejs";

const ZOHO_EMAIL = process.env.ZOHO_EMAIL;
const ZOHO_PASSWORD = process.env.ZOHO_PASSWORD;
// Where contact-form messages are delivered. The recipient is fixed
// server-side on purpose — this route is NOT a generic /api/send relay, so it
// can't be abused to mail arbitrary addresses from our domain.
const CONTACT_TO = process.env.CONTACT_TO || "support@thunderclap.com";
// smtp.zoho.com (default) / smtp.zoho.eu / smtp.zoho.in per data centre.
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

  const name = oneLine(String(body.name ?? "")).slice(0, 120);
  const email = oneLine(String(body.email ?? "")).slice(0, 160);
  const subject = oneLine(String(body.subject ?? "General question")).slice(0, 160);
  const message = String(body.message ?? "").trim().slice(0, 5000);

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name, a valid email, and a message." },
      { status: 400 },
    );
  }

  if (!ZOHO_EMAIL || !ZOHO_PASSWORD) {
    console.error("[contact] Missing ZOHO_EMAIL / ZOHO_PASSWORD env vars.");
    return NextResponse.json(
      {
        ok: false,
        error: `Email isn't configured yet. Please reach us at ${CONTACT_TO} directly.`,
      },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: 465,
    secure: true, // 465 = implicit TLS
    auth: { user: ZOHO_EMAIL, pass: ZOHO_PASSWORD },
  });

  const text = `New contact form message

Name:    ${name}
Email:   ${email}
Subject: ${subject}

${message}`;

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a">
  <h2 style="margin:0 0 12px">New contact form message</h2>
  <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
  <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(email)}</p>
  <p style="margin:0 0 12px"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
  <p style="margin:0 0 4px"><strong>Message:</strong></p>
  <p style="white-space:pre-wrap;margin:0;padding:12px 14px;background:#f5f3ee;border-radius:8px">${escapeHtml(message)}</p>
</div>`;

  try {
    const info = await transporter.sendMail({
      // `from` must be the authenticated Zoho account or Zoho rejects it.
      from: { name: "Thunderclap Contact", address: ZOHO_EMAIL },
      to: CONTACT_TO,
      replyTo: { name, address: email }, // hitting "Reply" answers the visitor
      subject: `[Contact] ${subject} — ${name}`,
      text,
      html,
    });
    return NextResponse.json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error("[contact] sendMail failed:", err);
    return NextResponse.json(
      {
        ok: false,
        error: `We couldn't send your message. Please try again or email ${CONTACT_TO}.`,
      },
      { status: 502 },
    );
  }
}
