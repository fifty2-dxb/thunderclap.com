"use client";

import { useState } from "react";

export function Announcement() {
  const [shown, setShown] = useState(true);
  if (!shown) return null;
  return (
    <div
      className="hdr-announcement"
      style={{
        background: "var(--uv-fg-1)",
        color: "#fff",
        fontSize: 13,
        padding: "9px 48px 9px 16px",
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
        className="hdr-announcement-link"
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
          right: 6,
          top: 0,
          bottom: 0,
          width: 40,
          background: "transparent",
          color: "#fff",
          border: 0,
          cursor: "pointer",
          opacity: 0.7,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
        }}
      >
        ✕
      </button>
    </div>
  );
}
