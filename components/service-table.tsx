import type { ReactNode } from "react";
import {
  AudioWaveform,
  Facebook,
  Ghost,
  Linkedin,
  MessageSquare,
  Music,
  Music2,
  Pin,
  Play,
  Twitch,
} from "lucide-react";

const InstagramIconSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="#fff" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
  </svg>
);
const XIconSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
    <path d="M18.3 3H22l-7.2 8.2L23 21h-6.8l-5.3-6.5L4.8 21H1l7.7-8.8L1 3h7l4.8 6 5.5-6z" />
  </svg>
);

type Service = {
  id: string;
  name: string;
  bg: string;
  price: string;
  popular?: boolean;
  svg?: ReactNode;
  icon?: ReactNode;
  iconColor?: string;
};

const SERVICES: Service[] = [
  {
    id: "instagram",
    name: "Instagram",
    bg: "linear-gradient(135deg,#feda77 0%,#f58529 35%,#dd2a7b 65%,#8134af 100%)",
    svg: <InstagramIconSvg />,
    price: "$0.49",
    popular: true,
  },
  { id: "tiktok", name: "TikTok", bg: "#000", icon: <Music2 size={14} />, price: "$1.99" },
  { id: "youtube", name: "YouTube", bg: "#FF0000", icon: <Play size={14} />, price: "$2.05" },
  { id: "facebook", name: "Facebook", bg: "#1877F2", icon: <Facebook size={14} />, price: "$1.99" },
  { id: "twitter", name: "Twitter / X", bg: "#000", svg: <XIconSvg />, price: "$1.99" },
  { id: "spotify", name: "Spotify", bg: "#1DB954", icon: <Music size={14} />, price: "$2.05" },
  { id: "twitch", name: "Twitch", bg: "#9146FF", icon: <Twitch size={14} />, price: "$2.99" },
  { id: "linkedin", name: "LinkedIn", bg: "#0A66C2", icon: <Linkedin size={14} />, price: "$3.99" },
  {
    id: "snapchat",
    name: "Snapchat",
    bg: "#FFFC00",
    icon: <Ghost size={14} color="#000" />,
    iconColor: "#000",
    price: "$4.99",
  },
  { id: "pinterest", name: "Pinterest", bg: "#E60023", icon: <Pin size={14} />, price: "$1.99" },
  {
    id: "discord",
    name: "Discord",
    bg: "#5865F2",
    icon: <MessageSquare size={14} />,
    price: "$3.99",
  },
  {
    id: "soundcloud",
    name: "SoundCloud",
    bg: "#FF5500",
    icon: <AudioWaveform size={14} />,
    price: "$1.99",
  },
];

export function ServiceTable() {
  return (
    <section style={{ background: "var(--uv-bg-lavender)", paddingBottom: 80 }}>
      <div className="container">
        <div className="service-table">
          <div className="st-head">
            <span>Platform</span>
            <span>Starting from</span>
            <span>Delivery</span>
            <span />
          </div>
          {SERVICES.map((s) => (
            <div key={s.id} className="st-row">
              <div className="st-name">
                <span
                  className="st-dot"
                  style={{ background: s.bg, color: s.iconColor ?? "#fff" }}
                >
                  {s.svg ?? s.icon}
                </span>
                <span style={{ fontWeight: 700, fontSize: 15, color: "var(--uv-fg-1)" }}>
                  {s.name}
                </span>
                {s.popular && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: "0.06em",
                      color: "var(--uv-pink)",
                      padding: "3px 7px",
                      background: "rgba(239,70,85,0.10)",
                      borderRadius: 4,
                      marginLeft: 6,
                    }}
                  >
                    POPULAR
                  </span>
                )}
              </div>
              <span style={{ fontWeight: 700, fontSize: 15, color: "var(--uv-fg-1)" }}>
                {s.price}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: "var(--uv-success-text)",
                  fontWeight: 600,
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
                    display: "inline-block",
                  }}
                />
                Delivering fast
              </span>
              <button
                type="button"
                className="btn btn-pink-outline btn-sm st-action"
                style={{ justifySelf: "end" }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
