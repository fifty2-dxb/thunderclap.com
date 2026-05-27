import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck, Star, Zap } from "lucide-react";

export function Hero() {
  return (
    <section style={{ background: "var(--uv-bg-lavender)", paddingTop: 72, paddingBottom: 32 }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 880, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              background: "#fff",
              border: "1px solid var(--uv-line)",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              color: "var(--uv-fg-2)",
              marginBottom: 22,
              boxShadow: "var(--uv-shadow-card)",
            }}
          >
            <Stars size={11} />
            <span>
              <strong style={{ color: "var(--uv-fg-1)" }}>4.9</strong> · Trusted by 200,000+ creators
              &amp; brands
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--uv-font-display)",
              fontWeight: 800,
              fontSize: 64,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "var(--uv-fg-1)",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Grow any social account.
            <br />
            <span className="grad-text">Real engagement</span>, delivered in minutes.
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--uv-fg-2)",
              maxWidth: 600,
              margin: "22px auto 28px",
              textWrap: "pretty",
            }}
          >
            Real followers, likes &amp; views on TikTok, Instagram, YouTube, Twitter / X and more.
            Money-back guaranteed. No password ever required.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="#services"
              className="btn btn-primary btn-lg"
              style={{ borderRadius: 999, padding: "0 32px" }}
            >
              Get Started <ArrowRight size={18} />
            </Link>
            <Link
              href="/buy-instagram-followers"
              className="btn btn-outline btn-lg"
              style={{ borderRadius: 999, padding: "0 28px" }}
            >
              <Star size={16} /> Most Popular
            </Link>
          </div>
          <div
            className="hero-trust-row"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 28,
              marginTop: 26,
              flexWrap: "wrap",
              fontSize: 13,
              color: "var(--uv-fg-2)",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
              <ShieldCheck size={16} color="#0ec377" /> Money-back guarantee
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
              <Lock size={16} color="#0ec377" /> Secure checkout
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
              <Zap size={16} color="var(--uv-pink)" /> Starts in 30 min
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars({ n = 5, size = 14 }: { n?: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {Array.from({ length: n }).map((_, i) => (
        <span
          key={i}
          style={{
            width: size,
            height: size,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#00b67a",
            fontSize: size,
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}
