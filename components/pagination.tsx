import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

/** Page 1 lives at the bare basePath; later pages add ?page=N. */
export function pageHref(basePath: string, n: number): string {
  return n <= 1 ? basePath : `${basePath}?page=${n}`;
}

/** Compact page list with ellipses, e.g. 1 … 4 5 [6] 7 8 … 23 */
function pageItems(current: number, total: number): (number | "ellipsis")[] {
  const out: (number | "ellipsis")[] = [];
  for (let n = 1; n <= total; n++) {
    const edge = n === 1 || n === total;
    const near = n >= current - 1 && n <= current + 1;
    if (edge || near) out.push(n);
    else if (out[out.length - 1] !== "ellipsis") out.push("ellipsis");
  }
  return out;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;
  const items = pageItems(currentPage, totalPages);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav className="pagination" aria-label="Blog pagination">
      {hasPrev ? (
        <Link
          className="pagination-arrow"
          href={pageHref(basePath, currentPage - 1)}
          rel="prev"
          aria-label="Previous page"
        >
          <ArrowLeft size={16} /> Prev
        </Link>
      ) : (
        <span className="pagination-arrow is-disabled" aria-disabled="true">
          <ArrowLeft size={16} /> Prev
        </span>
      )}

      <ul className="pagination-pages">
        {items.map((it, i) =>
          it === "ellipsis" ? (
            <li key={`e${i}`} className="pagination-ellipsis" aria-hidden>
              …
            </li>
          ) : (
            <li key={it}>
              {it === currentPage ? (
                <span className="pagination-page is-current" aria-current="page">
                  {it}
                </span>
              ) : (
                <Link className="pagination-page" href={pageHref(basePath, it)}>
                  {it}
                </Link>
              )}
            </li>
          ),
        )}
      </ul>

      {hasNext ? (
        <Link
          className="pagination-arrow"
          href={pageHref(basePath, currentPage + 1)}
          rel="next"
          aria-label="Next page"
        >
          Next <ArrowRight size={16} />
        </Link>
      ) : (
        <span className="pagination-arrow is-disabled" aria-disabled="true">
          Next <ArrowRight size={16} />
        </span>
      )}
    </nav>
  );
}
