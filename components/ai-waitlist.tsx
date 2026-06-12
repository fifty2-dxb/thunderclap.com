"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ArrowRight, CheckCircle2, Sparkles, X } from "lucide-react";
import { trackAiWaitlistJoined } from "@/lib/webengage-client";

type AiWaitlistContextValue = {
  /** Open the waitlist modal. `source` is just for analytics/debugging. */
  open: (source?: string) => void;
  close: () => void;
};

const AiWaitlistContext = createContext<AiWaitlistContextValue | null>(null);

export function useAiWaitlist(): AiWaitlistContextValue {
  const ctx = useContext(AiWaitlistContext);
  if (!ctx) throw new Error("useAiWaitlist must be used within <AiWaitlistProvider>");
  return ctx;
}

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export function AiWaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const open = useCallback(() => {
    setStatus("idle");
    setError("");
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  // Body scroll lock + Escape to close while open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fn = firstName.trim();
    const ln = lastName.trim();
    const em = email.trim();
    if (!fn || !EMAIL_RE.test(em)) {
      setError("Please enter your first name and a valid email.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/ai-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: fn, lastName: ln, email: em }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      trackAiWaitlistJoined({ firstName: fn, lastName: ln, email: em });
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <AiWaitlistContext.Provider value={{ open, close }}>
      {children}
      {isOpen && (
        <div className="aiw-overlay" role="dialog" aria-modal="true" aria-label="Join the AI Growth waitlist">
          <div className="aiw-backdrop" onClick={close} />
          <div className="aiw-modal">
            <button type="button" className="aiw-close" onClick={close} aria-label="Close">
              <X size={18} />
            </button>

            {status === "done" ? (
              <div className="aiw-done">
                <span className="aiw-done-icon">
                  <CheckCircle2 size={30} />
                </span>
                <h3 className="aiw-title">You&apos;re on the list!</h3>
                <p className="aiw-sub">
                  You&apos;re one of the first to get Thunderclap AI. We&apos;ll email{" "}
                  <strong>{email.trim()}</strong> the moment early access opens.
                </p>
                <button type="button" className="btn btn-primary btn-lg aiw-submit" onClick={close}>
                  Done
                </button>
              </div>
            ) : (
              <>
                <span className="aiw-badge">
                  <Sparkles size={12} /> EARLY ACCESS
                </span>
                <h3 className="aiw-title">Be the first on Thunderclap AI</h3>
                <p className="aiw-sub">
                  Organic growth on autopilot is almost here. Drop your details to claim a
                  founding-member spot — limited early-access invites.
                </p>

                <form className="aiw-form" onSubmit={onSubmit} noValidate>
                  <div className="aiw-row">
                    <label className="aiw-field">
                      <span className="aiw-label">First name</span>
                      <input
                        className="aiw-input"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Jane"
                        autoComplete="given-name"
                        required
                      />
                    </label>
                    <label className="aiw-field">
                      <span className="aiw-label">Last name</span>
                      <input
                        className="aiw-input"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        autoComplete="family-name"
                      />
                    </label>
                  </div>
                  <label className="aiw-field">
                    <span className="aiw-label">Email</span>
                    <input
                      className="aiw-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      autoComplete="email"
                      required
                    />
                  </label>

                  {error && <div className="aiw-err">{error}</div>}

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg aiw-submit"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Joining…" : "Claim my spot"} <ArrowRight size={16} />
                  </button>
                  <p className="aiw-fine">No spam. We&apos;ll only email you about early access.</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </AiWaitlistContext.Provider>
  );
}

/**
 * A button that opens the AI Growth waitlist modal. Drop-in replacement for the
 * old AI CTAs — pass `className` to style it like any existing button/link.
 */
export function AiWaitlistButton({
  className,
  style,
  source,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  source?: string;
  children: ReactNode;
}) {
  const { open } = useAiWaitlist();
  return (
    <button type="button" className={className} style={style} onClick={() => open(source)}>
      {children}
    </button>
  );
}
