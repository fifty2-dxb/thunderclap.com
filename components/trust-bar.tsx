import { RefreshCw, ShieldCheck, Users } from "lucide-react";

const WHY = [
  {
    Icon: Users,
    title: "Real, active accounts",
    body: "Every follower, like, and view comes from a real user — never bots. Your engagement looks organic to the platform's algorithm.",
  },
  {
    Icon: ShieldCheck,
    title: "Safe by design",
    body: "We never ask for your password. SSL on every page. Trusted by 200,000+ creators with zero account bans in 800K orders.",
  },
  {
    Icon: RefreshCw,
    title: "30-day refill guarantee",
    body: "If anything drops within 30 days, we refill it free. Not happy? Money-back, no questions asked, within 7 days.",
  },
];

export function WhyThunderclap() {
  return (
    <section style={{ padding: "96px 0 32px" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
            WHY THUNDERCLAP
          </span>
          <h2
            style={{
              fontFamily: "var(--uv-font-display)",
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: "10px auto 0",
              maxWidth: 720,
              textWrap: "balance",
            }}
          >
            The growth tool creators &amp; brands actually <span className="grad-text">trust</span>.
          </h2>
        </div>
        <div className="why-grid-3">
          {WHY.map((w) => (
            <div key={w.title} className="why-card-clean">
              <div className="why-icon">
                <w.Icon size={20} />
              </div>
              <h3>{w.title}</h3>
              <p>{w.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustBar() {
  return <WhyThunderclap />;
}
