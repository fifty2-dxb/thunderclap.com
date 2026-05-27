import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogBlock } from "@/content/blog";

export function BlogPostBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="blog-prose">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} id={block.id} className="blog-h2">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={block.id} className="blog-h3">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p
                key={i}
                className="blog-p"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            );
          case "list": {
            const Tag = block.ordered ? "ol" : "ul";
            return (
              <Tag key={i} className="blog-list">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </Tag>
            );
          }
          case "callout":
            return (
              <aside key={i} className="blog-callout">
                {block.title && <strong>{block.title}</strong>}
                <p
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: block.html }}
                />
              </aside>
            );
          case "quote":
            return (
              <blockquote key={i} className="blog-quote">
                <p
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: block.html }}
                />
                {block.cite && <cite>— {block.cite}</cite>}
              </blockquote>
            );
          case "cta":
            return (
              <aside key={i} className="blog-inline-cta">
                <div>
                  <h3>{block.title}</h3>
                  <p>{block.body}</p>
                </div>
                <Link href={block.href} className="btn btn-primary btn-md">
                  {block.label}
                  <ArrowRight size={16} style={{ marginLeft: 6 }} />
                </Link>
              </aside>
            );
          case "html":
            return (
              <div
                key={i}
                className="blog-html"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
