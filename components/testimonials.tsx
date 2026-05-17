const REVIEWS = [
  {
    stars: 5,
    text: "Real, active followers — my Instagram engagement jumped 3× within a week. Best growth tool I've used.",
    name: "Sofia Alvarez",
    role: "Lifestyle creator",
    av: "https://i.pravatar.cc/100?img=47",
  },
  {
    stars: 5,
    text: "The TikTok package was exactly what my new product launch needed. Delivery was fast and the retention is solid.",
    name: "Marcus Chen",
    role: "Founder, Northbeam Co.",
    av: "https://i.pravatar.cc/100?img=12",
  },
  {
    stars: 5,
    text: "Tried three other providers before Thunderclap. This is the only one that didn't drop followers after a week.",
    name: "Priya Sharma",
    role: "Beauty creator",
    av: "https://i.pravatar.cc/100?img=44",
  },
];

const AVATAR_RAIL = [14, 23, 41, 5, 36];

export function Testimonials() {
  return (
    <section style={{ padding: "96px 0 32px" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
            ★ TRUSTPILOT · 4.7 / 5
          </span>
          <h2
            style={{
              fontFamily: "var(--uv-font-display)",
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              margin: "10px auto 12px",
              textWrap: "balance",
              maxWidth: 720,
            }}
          >
            What creators say after their first order.
          </h2>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              fontSize: 14,
              color: "var(--uv-fg-3)",
            }}
          >
            <span style={{ display: "inline-flex" }}>
              {AVATAR_RAIL.map((i, k) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={i}
                  src={`https://i.pravatar.cc/64?img=${i}`}
                  alt=""
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 999,
                    border: "2px solid #fff",
                    marginLeft: k ? -8 : 0,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                  }}
                />
              ))}
            </span>
            <span>
              Rated <strong style={{ color: "var(--uv-fg-1)" }}>4.7</strong> by{" "}
              <strong style={{ color: "var(--uv-fg-1)" }}>992</strong> reviewers
            </span>
          </div>
        </div>
        <div className="testi-grid">
          {REVIEWS.map((r) => (
            <div key={r.name} className="testi-card">
              <div style={{ display: "inline-flex", gap: 2, marginBottom: 12 }}>
                {Array.from({ length: r.stars }).map((_, i) => (
                  <span key={i} style={{ color: "var(--uv-pink)", fontSize: 14 }}>
                    ★
                  </span>
                ))}
              </div>
              <p>{r.text}</p>
              <div className="testi-author">
                <div className="testi-av" style={{ backgroundImage: `url(${r.av})` }} />
                <div>
                  <div className="testi-name">{r.name}</div>
                  <div className="testi-role">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
