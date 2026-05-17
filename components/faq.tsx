"use client";

import { useState } from "react";

type Faq = { q: string; a: string };

export function FaqSection({
  faqs,
  eyebrow = "FAQ",
  title = "Questions, answered.",
  subtitle = "Everything most people ask before placing their first order.",
  initialOpen = 0,
}: {
  faqs: readonly Faq[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  initialOpen?: number;
}) {
  const [active, setActive] = useState<number>(initialOpen);

  return (
    <section style={{ padding: "32px 0 80px" }}>
      <div className="container-narrow">
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span className="uv-eyebrow" style={{ color: "var(--uv-pink)" }}>
            {eyebrow}
          </span>
          <h2
            style={{
              fontFamily: "var(--uv-font-display)",
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              margin: "10px 0 8px",
            }}
          >
            {title}
          </h2>
          <p style={{ color: "var(--uv-fg-3)", fontSize: 14, margin: 0 }}>{subtitle}</p>
        </div>
        <div className="faq-chips">
          {Array.from({ length: Math.ceil(faqs.length / 2) }).map((_, row) => {
            const lIdx = row * 2;
            const rIdx = row * 2 + 1;
            const l = faqs[lIdx];
            const r = faqs[rIdx];
            const open = active === lIdx ? l : active === rIdx ? r : null;
            return (
              <Row
                key={row}
                l={l}
                r={r}
                lIdx={lIdx}
                rIdx={rIdx}
                active={active}
                setActive={setActive}
                open={open}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Row({
  l,
  r,
  lIdx,
  rIdx,
  active,
  setActive,
  open,
}: {
  l: Faq;
  r: Faq | undefined;
  lIdx: number;
  rIdx: number;
  active: number;
  setActive: (n: number) => void;
  open: Faq | null;
}) {
  return (
    <>
      <button
        type="button"
        className={`faq-chip ${active === lIdx ? "active" : ""}`}
        onClick={() => setActive(active === lIdx ? -1 : lIdx)}
        aria-expanded={active === lIdx}
      >
        <span>{l.q}</span>
        <span
          style={{
            opacity: 0.6,
            fontSize: 18,
            marginLeft: 12,
            transform: active === lIdx ? "rotate(90deg)" : "none",
            transition: "transform 200ms",
          }}
        >
          ›
        </span>
      </button>
      {r && (
        <button
          type="button"
          className={`faq-chip ${active === rIdx ? "active" : ""}`}
          onClick={() => setActive(active === rIdx ? -1 : rIdx)}
          aria-expanded={active === rIdx}
        >
          <span>{r.q}</span>
          <span
            style={{
              opacity: 0.6,
              fontSize: 18,
              marginLeft: 12,
              transform: active === rIdx ? "rotate(90deg)" : "none",
              transition: "transform 200ms",
            }}
          >
            ›
          </span>
        </button>
      )}
      {open && <div className="faq-chip-panel">{open.a}</div>}
    </>
  );
}
