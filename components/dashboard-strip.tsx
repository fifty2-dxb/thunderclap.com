import Link from "next/link";
import {
  ArrowUpRight,
  LayoutDashboard,
  LayoutGrid,
  Package,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

const DASH_STATS: { icon: LucideIcon; value: string; label: string; color: string }[] = [
  { icon: Users, value: "204,817", label: "Active creators", color: "#3b76f6" },
  { icon: Package, value: "847K+", label: "Orders delivered", color: "#0fa968" },
  { icon: Zap, value: "28 min", label: "Avg. start time", color: "#f5a524" },
  { icon: LayoutGrid, value: "12", label: "Platforms supported", color: "#8b5cf6" },
  { icon: ShieldCheck, value: "99.9%", label: "Platform uptime", color: "#0ea5e9" },
  { icon: TrendingUp, value: "4.9★", label: "Trustpilot rating", color: "#00b67a" },
];

export function DashboardStrip() {
  return (
    <section style={{ background: "#0e1117", padding: "56px 0 64px" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(59,118,246,0.18)",
              border: "1px solid rgba(59,118,246,0.45)",
              borderRadius: 999,
              padding: "4px 14px",
              color: "#7eb2ff",
              fontSize: 11.5,
              fontWeight: 800,
              letterSpacing: "0.08em",
              marginBottom: 14,
            }}
          >
            <span
              style={{
                position: "relative",
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#3b76f6",
                display: "inline-block",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "#3b76f6",
                  animation: "ann-pulse-ring 1.8s ease-out infinite",
                }}
              />
            </span>
            LIVE PLATFORM METRICS
          </span>
          <h2
            style={{
              fontFamily: "var(--uv-font-display)",
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              color: "#fff",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Real numbers. Real growth.
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 16,
          }}
        >
          {DASH_STATS.map((s) => {
            const StatIcon = s.icon;
            return (
              <div
                key={s.label}
                style={{
                  background: "#161b27",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16,
                  padding: "22px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: s.color + "1a",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <StatIcon size={18} color={s.color} />
                </span>
                <div
                  style={{
                    fontFamily: "var(--uv-font-display)",
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              color: "rgba(255,255,255,0.5)",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <LayoutDashboard size={15} />
            View full ops dashboard
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
