import { TrendingUp } from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Pick a service",
    body: "Choose your platform and the service you need — followers, likes, views, subscribers, comments.",
  },
  {
    n: "02",
    title: "Paste your URL",
    body: "Share your public profile or post link. No login. No password. Just a URL and your email.",
  },
  {
    n: "03",
    title: "Watch growth roll in",
    body: "Delivery starts within 30 minutes. Track every order in real time from your dashboard.",
  },
];

export function HowItWorks() {
  return (
    <section style={{ padding: "96px 0 64px" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
            gap: 64,
            alignItems: "center",
            marginBottom: 64,
          }}
          className="hiw-top"
        >
          <div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--uv-pink)",
              }}
            >
              HOW IT WORKS
            </span>
            <h2
              style={{
                fontFamily: "var(--uv-font-display)",
                fontSize: 40,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                margin: "10px 0 16px",
                textWrap: "balance",
              }}
            >
              Three steps, zero friction.
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.65,
                color: "var(--uv-fg-2)",
                maxWidth: 480,
                margin: 0,
              }}
            >
              From order to first follower in under an hour. Our system handles drip delivery,
              retention, and refills automatically — you just keep posting.
            </p>
          </div>
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--uv-line)",
              borderRadius: 24,
              padding: 28,
              boxShadow: "var(--uv-shadow-md)",
              position: "relative",
              minHeight: 280,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  background: "var(--uv-bg-alt)",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                <TrendingUp size={14} color="var(--uv-pink)" />
                Follower growth
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 14px",
                  background: "#fff",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--uv-fg-1)",
                  boxShadow: "var(--uv-shadow-md)",
                  border: "1px solid var(--uv-line)",
                }}
              >
                <span style={{ display: "inline-flex" }}>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      background: "linear-gradient(135deg,#f5a524,#ef4655)",
                      border: "2px solid #fff",
                    }}
                  />
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      background: "linear-gradient(135deg,#4a86c9,#6db4e8)",
                      border: "2px solid #fff",
                      marginLeft: -6,
                    }}
                  />
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      background: "linear-gradient(135deg,#22c55e,#0ec377)",
                      border: "2px solid #fff",
                      marginLeft: -6,
                    }}
                  />
                </span>
                2,816 followers
              </span>
            </div>
            <div
              style={{
                width: 132,
                height: 132,
                borderRadius: 999,
                background:
                  "conic-gradient(from -90deg, var(--uv-pink) 0deg, #f47286 260deg, #f2eaea 260deg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "32px auto 12px",
              }}
            >
              <div
                style={{
                  width: 102,
                  height: 102,
                  borderRadius: 999,
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--uv-pink)",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--uv-font-display)",
                    fontSize: 22,
                    fontWeight: 800,
                    color: "var(--uv-fg-1)",
                    lineHeight: 1,
                  }}
                >
                  +67%
                </div>
                <div style={{ fontSize: 11, color: "var(--uv-fg-3)", marginTop: 4, fontWeight: 600 }}>
                  Last 30 days
                </div>
              </div>
            </div>
            <div
              style={{
                borderTop: "1px solid var(--uv-line)",
                paddingTop: 14,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 13,
              }}
            >
              <span style={{ color: "var(--uv-fg-3)", fontWeight: 600 }}>Order #TC-4218</span>
              <span
                style={{
                  color: "var(--uv-success-text)",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 999,
                    background: "var(--uv-success-text)",
                  }}
                />
                Delivering
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {STEPS.map((s) => (
            <div key={s.n} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
              <span
                style={{
                  flex: "0 0 44px",
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "var(--uv-pink-soft)",
                  color: "var(--uv-pink)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--uv-font-display)",
                  fontWeight: 800,
                  fontSize: 16,
                }}
              >
                {s.n}
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--uv-font-display)",
                    fontSize: 19,
                    fontWeight: 800,
                    margin: "8px 0 6px",
                    color: "var(--uv-fg-1)",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "var(--uv-fg-2)",
                  }}
                >
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
