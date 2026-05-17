"use client";

import { useState } from "react";

export function Announcement() {
  const [shown, setShown] = useState(true);
  if (!shown) return null;
  return (
    <div
      style={{
        background: "var(--uv-fg-1)",
        color: "#fff",
        fontSize: 13,
        padding: "9px 44px 9px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        flexWrap: "wrap",
        position: "relative",
        textAlign: "center",
        lineHeight: 1.35,
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <span
          style={{
            background: "var(--uv-pink)",
            padding: "2px 8px",
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.06em",
          }}
        >
          15% OFF
        </span>
        <span style={{ opacity: 0.92 }}>
          Use code <strong style={{ letterSpacing: "0.06em" }}>SPRING15</strong> at checkout
        </span>
      </span>
      <a
        href="#pricing"
        style={{
          color: "#fff",
          textDecoration: "underline",
          textUnderlineOffset: 3,
          fontWeight: 600,
          flexShrink: 0,
        }}
      >
        See pricing →
      </a>
      <button
        type="button"
        onClick={() => setShown(false)}
        aria-label="Dismiss"
        style={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          background: "transparent",
          color: "#fff",
          border: 0,
          padding: 4,
          cursor: "pointer",
          opacity: 0.6,
        }}
      >
        ✕
      </button>
    </div>
  );
}
