"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Mail,
  MessageSquare,
  Tag,
  User,
} from "lucide-react";

const SUBJECTS = [
  "General question",
  "Order help",
  "Refund request",
  "Service drop / refill",
  "Security concern",
  "Other",
] as const;

type Subject = (typeof SUBJECTS)[number];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<Subject>("General question");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const reset = () => {
    setName("");
    setEmail("");
    setSubject("General question");
    setMessage("");
    setError(null);
    setSent(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setError(null);

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (message.trim().length < 10) {
      setError("Please write a message of at least 10 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject,
          message: message.trim(),
          source: "contact-page",
        }),
      });

      const json = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || (json && json.ok === false)) {
        setSubmitting(false);
        setError(
          json?.error ||
            "We couldn't send your message. Please try again in a moment.",
        );
        return;
      }

      setSubmitting(false);
      setSent(true);
    } catch (err) {
      setSubmitting(false);
      setError(
        err instanceof Error
          ? err.message
          : "Network error while sending your message.",
      );
    }
  };

  if (sent) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--uv-line)",
          borderRadius: 18,
          padding: "36px 28px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--uv-success-bg, #e6f7ec)",
            color: "var(--uv-success-text, #1b8443)",
            marginBottom: 14,
          }}
        >
          <CheckCircle2 size={28} strokeWidth={2.4} />
        </span>
        <h3
          style={{
            fontFamily: "var(--uv-font-display)",
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            margin: "0 0 8px",
            color: "var(--uv-fg-1)",
          }}
        >
          Thanks — we&apos;ll be in touch
        </h3>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--uv-fg-2)",
            margin: "0 0 22px",
            maxWidth: 380,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Your message is in. A real human will reply within 12 hours.
        </p>
        <button
          type="button"
          onClick={reset}
          className="btn btn-outline"
          style={{ height: 46, padding: "0 22px" }}
        >
          Send another message
          <Check size={14} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="co-input-wrap">
        <span
          className="co-input-icon"
          aria-hidden
          style={{ background: "var(--uv-pink-soft)", color: "var(--uv-pink)" }}
        >
          <User size={16} />
        </span>
        <span className="co-input-label">Full name</span>
        <input
          className="co-input"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          aria-label="Full name"
          required
        />
      </div>

      <div className="co-input-wrap" style={{ marginTop: 6 }}>
        <span
          className="co-input-icon"
          aria-hidden
          style={{ background: "var(--uv-pink-soft)", color: "var(--uv-pink)" }}
        >
          <Mail size={16} />
        </span>
        <span className="co-input-label">Email address</span>
        <input
          className="co-input"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          required
        />
      </div>

      <div className="co-input-wrap" style={{ marginTop: 6 }}>
        <span
          className="co-input-icon"
          aria-hidden
          style={{ background: "var(--uv-pink-soft)", color: "var(--uv-pink)" }}
        >
          <Tag size={16} />
        </span>
        <span className="co-input-label">Subject</span>
        <select
          className="contact-select"
          value={subject}
          onChange={(e) => setSubject(e.target.value as Subject)}
          aria-label="Subject"
          style={{
            width: "100%",
            border: "1px solid var(--uv-line-strong)",
            borderRadius: 14,
            padding: "26px 16px 14px 60px",
            fontSize: 15,
            fontFamily: "var(--uv-font-body)",
            background: "#fff",
            color: "var(--uv-fg-1)",
            outline: "none",
            appearance: "none",
            cursor: "pointer",
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 16px center",
            paddingRight: 40,
          }}
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div
        className="co-input-wrap"
        style={{ marginTop: 6, alignItems: "flex-start" }}
      >
        <span
          className="co-input-icon"
          aria-hidden
          style={{
            background: "var(--uv-pink-soft)",
            color: "var(--uv-pink)",
            top: 26,
            transform: "none",
          }}
        >
          <MessageSquare size={16} />
        </span>
        <span className="co-input-label">Message</span>
        <textarea
          className="co-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what's going on — order numbers and links help us help you faster."
          aria-label="Message"
          rows={6}
          minLength={10}
          required
          style={{
            resize: "vertical",
            minHeight: 140,
            paddingTop: 26,
            lineHeight: 1.55,
          }}
        />
      </div>

      {error && (
        <div className="co-pay-err" role="alert" style={{ marginTop: 14 }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        className="co-cta"
        disabled={submitting}
        style={{ marginTop: 8 }}
      >
        {submitting ? "Sending…" : "Send message"}
        {!submitting && <ArrowRight size={16} />}
      </button>

      <p
        style={{
          fontSize: 12.5,
          color: "var(--uv-fg-3)",
          margin: "12px 4px 0",
          lineHeight: 1.5,
        }}
      >
        By submitting you agree to be contacted about your enquiry. We never
        share your email.
      </p>
    </form>
  );
}
