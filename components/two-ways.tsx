import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Zap } from "lucide-react";

const card: CSSProperties = {
  background: "#fff",
  border: "1px solid var(--uv-line)",
  borderRadius: 24,
  padding: "34px 32px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 14,
  boxShadow: "var(--uv-shadow-card)",
};

const bullet: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 8,
  fontSize: 14,
  fontWeight: 600,
  color: "var(--uv-fg-2)",
  lineHeight: 1.45,
};

export function TwoWays() {
  return (
    <section style={{ padding: "84px 0 10px", background: "#fff" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 40px" }}>
          <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
            TWO WAYS TO GROW
          </span>
          <h2
            style={{
              fontFamily: "var(--uv-font-display)",
              fontSize: 38,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              margin: "10px 0 0",
              textWrap: "balance",
            }}
          >
            Instant boost, or <span className="grad-text">AI on autopilot</span>.
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            maxWidth: 980,
            margin: "0 auto",
          }}
        >
          <div style={card}>
            <span className="why-icon" style={{ marginBottom: 0 }}>
              <Zap size={20} />
            </span>
            <h3
              style={{
                fontFamily: "var(--uv-font-display)",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "-0.015em",
                margin: 0,
              }}
            >
              Growth packages
            </h3>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--uv-fg-2)",
                margin: 0,
                textWrap: "pretty",
              }}
            >
              Pick a platform, pick a quantity, done. Real followers, likes &amp; views delivered
              within minutes — one-time purchase, no subscription.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={bullet}>
                <Check size={15} color="var(--uv-success-text)" /> Starts in 30 minutes
              </span>
              <span style={bullet}>
                <Check size={15} color="var(--uv-success-text)" /> From $0.99 · money-back guarantee
              </span>
            </div>
            <Link
              className="btn btn-outline btn-md"
              href="/buy-instagram-followers/"
              style={{ marginTop: "auto" }}
            >
              Browse packages <ArrowRight size={15} />
            </Link>
          </div>

          <div style={{ ...card, border: "2px solid var(--uv-pink)" }}>
            <span className="why-icon" style={{ marginBottom: 0 }}>
              <Sparkles size={20} />
            </span>
            <h3
              style={{
                fontFamily: "var(--uv-font-display)",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "-0.015em",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              Thunderclap AI
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  color: "#fff",
                  background: "var(--uv-gradient-button)",
                  borderRadius: 999,
                  padding: "3px 9px",
                }}
              >
                NEW
              </span>
            </h3>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--uv-fg-2)",
                margin: 0,
                textWrap: "pretty",
              }}
            >
              A subscription that grows you organically. AI studies your niche and puts you in front
              of real people likely to follow — hands-free.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={bullet}>
                <Check size={15} color="var(--uv-success-text)" /> 100% organic · no password needed
              </span>
              <span style={bullet}>
                <Check size={15} color="var(--uv-success-text)" /> 3-day free trial · cancel anytime
              </span>
            </div>
            <Link className="btn btn-primary btn-md" href="/" style={{ marginTop: "auto" }}>
              Explore Thunderclap AI <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
