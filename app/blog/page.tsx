import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import { getAllPosts } from "@/content/blog";

const URL_PATH = "/blog/";
const CANONICAL = `${SITE_URL}${URL_PATH}`;

export const metadata: Metadata = {
  title: "Blog — Growth playbooks for Instagram, TikTok & YouTube · Thunderclap",
  description:
    "Practical, no-fluff growth playbooks for creators and brands building on Instagram, TikTok, YouTube, Facebook and X. Real tactics, no shortcuts that get you banned.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Blog — Growth playbooks · Thunderclap",
    description:
      "Practical, no-fluff growth playbooks for creators and brands.",
    url: CANONICAL,
    siteName: "Thunderclap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Growth playbooks · Thunderclap",
    description: "Practical growth playbooks for creators and brands.",
  },
};

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function Page() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Thunderclap Blog",
    url: CANONICAL,
    description: "Growth playbooks for Instagram, TikTok, YouTube, Facebook and X.",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.publishedAt,
      author: { "@type": "Person", name: p.author },
      url: `${SITE_URL}/${p.slug}/`,
      image: p.heroImage,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: CANONICAL },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="blog-index-hero">
        <div className="container">
          <nav className="blog-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>›</span>
            <span className="blog-crumbs-current">Blog</span>
          </nav>

          <span className="blog-eyebrow">BLOG · GROWTH PLAYBOOKS</span>
          <h1 className="blog-index-title">
            Notes on going <span className="grad-text">big on social</span>.
          </h1>
          <p className="blog-index-lede">
            Practical, no-fluff playbooks for creators and brands building on Instagram,
            TikTok, YouTube, Facebook and X. We write about what actually moves the algorithm
            — not what fits a Twitter / X thread.
          </p>
        </div>
      </section>

      {featured && (
        <section className="blog-featured-section">
          <div className="container">
            <Link href={`/${featured.slug}`} className="blog-featured">
              <div
                className="blog-featured-image"
                style={{ backgroundImage: `url(${featured.heroImage})` }}
              />
              <div className="blog-featured-body">
                <span className="blog-card-eyebrow">{featured.category} · Featured</span>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <div className="blog-featured-meta">
                  <span>{featured.author}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                  <span aria-hidden>·</span>
                  <span>{featured.readMinutes} min read</span>
                </div>
                <span className="blog-card-link">
                  Read the post <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="blog-list-section">
          <div className="container">
            <h2 className="blog-list-title">All posts</h2>
            <div className="blog-grid">
              {rest.map((p) => (
                <Link key={p.slug} href={`/${p.slug}`} className="blog-card">
                  <div
                    className="blog-card-image"
                    style={{ backgroundImage: `url(${p.heroImage})` }}
                  />
                  <div className="blog-card-body">
                    <span className="blog-card-eyebrow">{p.category}</span>
                    <h3>{p.title}</h3>
                    <p>{p.excerpt}</p>
                    <div className="blog-card-meta">
                      <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
                      <span aria-hidden>·</span>
                      <span>{p.readMinutes} min read</span>
                    </div>
                    <span className="blog-card-link">
                      Read post <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="blog-cta-band">
        <div className="container">
          <div className="coral-band">
            <div className="coral-band-bg" />
            <h2>Skip the research, start growing.</h2>
            <p>
              Real-account growth across every platform, drip-fed safely, with a 30-day refill
              guarantee. First results in 15 minutes.
            </p>
            <div
              style={{
                display: "inline-flex",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Link href="/buy-instagram-followers" className="btn btn-md coral-btn-light">
                Start with Instagram
              </Link>
              <Link href="/buy-tiktok-followers" className="btn btn-md coral-btn-ghost">
                Or TikTok
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
