import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection({
  title = "Ready to grow?",
  body = "Pick a package, paste your URL, and watch your numbers climb within the hour.",
  primaryLabel = "Get Started",
  primaryHref = "/buy-instagram-followers",
  secondaryLabel = "See all packages",
  secondaryHref = "/#services",
}: {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
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
            <Link href={primaryHref} className="btn btn-md coral-btn-light">
              {primaryLabel} <ArrowRight size={16} />
            </Link>
            <Link href={secondaryHref} className="btn btn-md coral-btn-ghost">
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
