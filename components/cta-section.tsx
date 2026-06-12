import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Bolt, Spark } from "@/components/bolt-art";

export function CtaSection({
  title = "Ready to make some thunder?",
  body = "Pick a package, paste your link, and watch your numbers climb within the hour.",
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
    <section style={{ padding: "40px 0 84px" }}>
      <div className="container">
        <div className="bolt-row">
          <Bolt
            size={30}
            color="var(--tart-yellow)"
            className="tart-float"
            style={{ position: "relative", transform: "rotate(-10deg)" }}
          />
          <Bolt
            size={40}
            color="var(--uv-pink-hot)"
            className="tart-float-2"
            style={{ position: "relative" }}
          />
          <Bolt
            size={30}
            color="var(--tart-lilac)"
            className="tart-float"
            style={{ position: "relative", transform: "rotate(10deg)" }}
          />
        </div>
        <div className="coral-band">
          <div className="coral-band-bg" />
          <Spark size={28} color="#fff" style={{ position: "absolute", top: 28, left: 40, opacity: 0.7 }} />
          <Spark size={20} color="#fff" style={{ position: "absolute", bottom: 36, right: 64, opacity: 0.6 }} />
          <Spark size={16} color="#fff" style={{ position: "absolute", top: 54, right: 120, opacity: 0.5 }} />
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
