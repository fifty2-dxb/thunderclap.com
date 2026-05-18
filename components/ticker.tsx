import {
  Crown,
  Lock,
  Package,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Item = { Icon: LucideIcon; text: string; emphasis?: string };

const ITEMS: Item[] = [
  { Icon: Star, text: "on Trustpilot", emphasis: "4.9 / 5" },
  { Icon: Package, text: "Orders Delivered", emphasis: "200,000+" },
  { Icon: Zap, text: "Instant Delivery", emphasis: "15-min start" },
  { Icon: RefreshCw, text: "30-day Refill Guarantee" },
  { Icon: Lock, text: "No Password Required" },
  { Icon: ShieldCheck, text: "100% Safe & Private" },
  { Icon: Timer, text: "24/7 Live Support" },
  { Icon: Crown, text: "Market Leader" },
  { Icon: Sparkles, text: "Real Accounts, Drip-Fed" },
];

function Row({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className="ticker-row" aria-hidden={ariaHidden ? "true" : undefined}>
      {ITEMS.map((item, i) => (
        <div className="ticker-item" key={i}>
          <span className="ticker-icon" aria-hidden>
            <item.Icon size={14} strokeWidth={2.2} />
          </span>
          {item.emphasis && <strong>{item.emphasis}</strong>}
          <span>{item.text}</span>
          <span className="ticker-sep" aria-hidden>
            •
          </span>
        </div>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <div className="ticker" role="region" aria-label="Trust signals">
      <div className="ticker-track">
        {/* Two copies of the row so the loop is seamless: when copy A
            translates out to the left, copy B is already in its place. */}
        <Row />
        <Row ariaHidden />
      </div>
    </div>
  );
}
