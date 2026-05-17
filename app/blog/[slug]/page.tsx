import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, User } from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import { getAllPosts, getPost, getRelatedPosts } from "@/content/blog";
import { BlogPostBody } from "../_post-body";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found · Thunderclap" };

  const canonical = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} · Thunderclap Blog`,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      siteName: "Thunderclap",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
      images: [{ url: post.heroImage, alt: post.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.heroImage],
    },
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const related = getRelatedPosts(post.slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: [post.heroImage],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Thunderclap",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.webp`,
      },
    },
    mainEntityOfPage: canonical,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article>
        <header className="blog-post-hero">
          <div className="container container-narrow">
            <nav className="blog-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden>›</span>
              <Link href="/blog">Blog</Link>
              <span aria-hidden>›</span>
              <span className="blog-crumbs-current">{post.category}</span>
            </nav>

            <span className="blog-eyebrow">{post.category.toUpperCase()}</span>
            <h1 className="blog-post-title">{post.title}</h1>
            <p className="blog-post-lede">{post.description}</p>

            <div className="blog-meta">
              <span className="blog-meta-item">
                <User size={14} />
                {post.author}
              </span>
              <span className="blog-meta-dot" aria-hidden>·</span>
              <span className="blog-meta-item">
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </span>
              <span className="blog-meta-dot" aria-hidden>·</span>
              <span className="blog-meta-item">
                <Clock size={14} />
                {post.readMinutes} min read
              </span>
            </div>
          </div>

          <div className="container container-narrow">
            <div className="blog-hero-image-wrap">
              <Image
                src={post.heroImage}
                alt={post.heroAlt}
                width={1600}
                height={900}
                priority
                sizes="(max-width: 980px) 100vw, 960px"
                className="blog-hero-image"
              />
            </div>
          </div>
        </header>

        <div className="container container-narrow">
          <BlogPostBody blocks={post.blocks} />

          <div className="blog-post-cta">
            <Link href={post.primaryCta.href} className="btn btn-primary btn-lg">
              {post.primaryCta.label}
              <ArrowRight size={16} style={{ marginLeft: 6 }} />
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="blog-related-section">
          <div className="container">
            <span className="blog-eyebrow blog-related-eyebrow">KEEP READING</span>
            <h2 className="blog-related-title">More growth playbooks</h2>
            <div className="blog-grid">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="blog-card">
                  <div
                    className="blog-card-image"
                    style={{ backgroundImage: `url(${r.heroImage})` }}
                  />
                  <div className="blog-card-body">
                    <span className="blog-card-eyebrow">{r.category}</span>
                    <h3>{r.title}</h3>
                    <p>{r.excerpt}</p>
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
            <h2>Stop researching, start growing.</h2>
            <p>
              Real-account growth, drip-fed safely, with a 30-day refill guarantee. Pick a
              package and you&rsquo;ll see the first results within 15 minutes.
            </p>
            <div
              style={{
                display: "inline-flex",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Link href={post.primaryCta.href} className="btn btn-md coral-btn-light">
                {post.primaryCta.label}
              </Link>
              <Link href="/blog" className="btn btn-md coral-btn-ghost">
                Back to blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
