import { ArrowRight } from "lucide-react";

export function CtaSection({
  title = "Ready to grow?",
  body = "Pick a package, paste your URL, and watch your numbers climb within the hour.",
  primaryLabel = "Get Started",
  secondaryLabel = "See all packages",
}: {
  title?: string;
  body?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
}) {
  return (
    <section style={{ padding: "32px 0 80px" }}>
      <div className="container">
        <div className="coral-band">
          <div className="coral-band-bg" />
          <h2>{title}</h2>
          <p>{body}</p>
          <div
            style={{ display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}
          >
            <button type="button" className="btn btn-md coral-btn-light">
              {primaryLabel} <ArrowRight size={16} />
            </button>
            <button type="button" className="btn btn-md coral-btn-ghost">
              {secondaryLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
