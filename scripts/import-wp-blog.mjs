/**
 * One-time importer: pull the legacy WordPress blog (552 posts) from the live
 * thunderclap.com WP REST API and emit a typed JSON data module the Next site
 * renders at the SAME root-level slugs the posts already rank on.
 *
 *   node scripts/import-wp-blog.mjs
 *
 * Output:
 *   content/blog-imported.json   — BlogPost[] (raw-HTML body block)
 *   public/images/blog/*         — re-hosted in-content images (wp-content dies
 *                                  at cutover, so body images must be local)
 *
 * Heroes use a curated Unsplash pool per category (verified 200) — the original
 * WP featured images average ~1.4MB each and 550 of them would bloat the repo.
 *
 * Re-runnable while the old WP site is still live. Empty-content posts (8) are
 * skipped (their slugs get 301'd in next.config).
 */
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const API = "https://thunderclap.com/wp-json/wp/v2/posts";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const ROOT = path.resolve(import.meta.dirname, "..");
const IMG_DIR = path.join(ROOT, "public", "images", "blog");
const OUT = path.join(ROOT, "content", "blog-imported.json");

// WP category id -> display category used on the new site.
const CAT = {
  239: "Instagram",
  241: "TikTok",
  242: "YouTube",
  243: "Twitter",
  245: "Social Media",
  247: "Social Media", // Uncategorize
  1: "Social Media", // Quiz
  240: "Social Media", // News
  244: "Social Media", // Threads
  246: "Social Media", // Roundups
};

// Category -> in-content/primary CTA destination (real product page).
const CTA = {
  Instagram: { href: "/buy-instagram-followers", label: "See Instagram packages" },
  TikTok: { href: "/buy-tiktok-followers", label: "See TikTok packages" },
  YouTube: { href: "/buy-youtube-subscribers", label: "See YouTube packages" },
  Twitter: { href: "/buy-twitter-followers", label: "See Twitter / X packages" },
  "Social Media": { href: "/buy-instagram-followers", label: "See growth packages" },
};

// Author byline by category — mirrors the real /team page experts.
const AUTHOR = {
  Instagram: "Elizabeth Ray",
  TikTok: "Jayden Gomez",
  YouTube: "Jayden Gomez",
  Twitter: "Nahal Scott",
  "Social Media": ["Daniel R.", "Samuel B. Gillham", "Rebecca Adley", "Selina Katoozian"],
};

// Verified-200 Unsplash hero pool per category (rotated by index).
const U = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;
const HERO = {
  Instagram: [U("1611162616305-c69b3fa7fbe0"), U("1611162617474-5b21e879e113"), U("1556745757-8d76bdb6984b")],
  TikTok: [U("1611605698335-8b1569810432"), U("1563986768609-322da13575f3"), U("1542751371-adc38448a05e")],
  YouTube: [U("1574717024653-61fd2cf4d44d"), U("1517292987719-0369a794ec0f"), U("1460925895917-afdab827c52f")],
  Twitter: [U("1432888622747-4eb9a8efeb07"), U("1545235617-9465d2a55698")],
  "Social Media": [U("1556157382-97eda2d62296"), U("1460925895917-afdab827c52f"), U("1545235617-9465d2a55698")],
};

async function getJSON(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

const ENT = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#039;": "'",
  "&#39;": "'", "&apos;": "'", "&hellip;": "…", "&nbsp;": " ", "&#038;": "&",
  "&#8217;": "’", "&#8216;": "‘", "&#8220;": "“", "&#8221;": "”",
  "&#8211;": "–", "&#8212;": "—", "&rsquo;": "’", "&lsquo;": "‘",
  "&ldquo;": "“", "&rdquo;": "”", "&ndash;": "–", "&mdash;": "—",
};
function decode(s) {
  if (!s) return "";
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&[a-z]+\d*;/gi, (m) => ENT[m] ?? m);
}
function stripTags(html) {
  return decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}
function clip(s, n) {
  if (s.length <= n) return s;
  const cut = s.slice(0, n);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:.–—-]+$/, "") + "…";
}

// Collect every wp-content image URL referenced in a post body.
function imageUrls(html) {
  const out = new Set();
  for (const m of html.matchAll(/<img[^>]+?src=["']([^"']+)["']/gi)) out.add(m[1]);
  return [...out].filter((u) => /thunderclap\.com\/wp-content\//i.test(u));
}
function localName(url) {
  const base = decodeURIComponent(url.split("?")[0].split("/").pop());
  return base.replace(/[^a-zA-Z0-9._-]/g, "-");
}

// Sanitize + rewrite body HTML: drop scripts/styles/comments/handlers, make
// thunderclap links root-relative, point images at the local copies.
function processBody(html, imgMap) {
  let h = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "")
    .replace(/\ssrcset\s*=\s*"[^"]*"/gi, "")
    .replace(/\ssizes\s*=\s*"[^"]*"/gi, "");
  // local image src
  for (const [url, local] of Object.entries(imgMap)) {
    h = h.split(url).join(local);
  }
  // absolute internal -> relative
  h = h.replace(/https?:\/\/(?:www\.)?thunderclap\.com/gi, "");
  // drop any image that couldn't be re-hosted (dead wp-content links) plus a
  // now-empty wrapping <figure> so we never render a broken image.
  h = h
    .replace(/<figure\b[^>]*>\s*<img\b[^>]*\/wp-content\/[^>]*>\s*(?:<figcaption[^>]*>[\s\S]*?<\/figcaption>)?\s*<\/figure>/gi, "")
    .replace(/<img\b[^>]*\/wp-content\/[^>]*>/gi, "");
  // tidy whitespace between blocks
  return h.replace(/\n{3,}/g, "\n\n").trim();
}

async function downloadImage(url, dest) {
  if (existsSync(dest)) return true;
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(IMG_DIR, { recursive: true });

  // 1) fetch all posts
  const posts = [];
  for (let page = 1; ; page++) {
    const batch = await getJSON(
      `${API}?per_page=100&page=${page}&_fields=id,slug,date,modified,title,excerpt,content,categories`,
    );
    if (!batch.length) break;
    posts.push(...batch);
    if (batch.length < 100) break;
  }
  console.log(`Fetched ${posts.length} posts`);

  // 2) collect + download every body image once
  const allImgs = new Set();
  for (const p of posts) for (const u of imageUrls(p.content?.rendered || "")) allImgs.add(u);
  console.log(`Downloading ${allImgs.size} in-content images…`);
  const imgMap = {};
  let ok = 0;
  for (const url of allImgs) {
    const name = localName(url);
    const dest = path.join(IMG_DIR, name);
    if (await downloadImage(url, dest)) {
      imgMap[url] = `/images/blog/${name}`;
      ok++;
    }
  }
  console.log(`Downloaded ${ok}/${allImgs.size} images`);

  // 3) build BlogPost records
  const sm = AUTHOR["Social Media"];
  let smi = 0;
  const out = [];
  let skipped = 0;
  for (const p of posts) {
    const body = p.content?.rendered || "";
    if (stripTags(body).length < 50) {
      skipped++;
      continue;
    }
    const slug = p.slug;
    const category = CAT[(p.categories || [])[0]] || "Social Media";
    const title = decode(p.title?.rendered || slug);
    const exc = stripTags(p.excerpt?.rendered || "").replace(/\s*\[?…\]?$/, "").replace(/\s*\[…\]$/, "");
    const words = stripTags(body).split(/\s+/).length;
    const heroPool = HERO[category];
    const idx = out.length;

    out.push({
      slug,
      category,
      title,
      description: clip(exc || title, 155),
      excerpt: clip(exc || title, 200),
      author: category === "Social Media" ? sm[smi++ % sm.length] : AUTHOR[category],
      publishedAt: (p.date || "").slice(0, 10),
      updatedAt: (p.modified || "").slice(0, 10),
      readMinutes: Math.max(2, Math.ceil(words / 200)),
      heroImage: heroPool[idx % heroPool.length],
      heroAlt: `${title} — ${category} guide on Thunderclap`,
      primaryCta: CTA[category],
      blocks: [{ type: "html", html: processBody(body, imgMap) }],
    });
  }

  out.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  await writeFile(OUT, JSON.stringify(out, null, 2) + "\n");
  console.log(`Wrote ${out.length} posts to ${path.relative(ROOT, OUT)} (skipped ${skipped} empty)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
