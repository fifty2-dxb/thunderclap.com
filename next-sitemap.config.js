/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://thunderclap.com",
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*", "/sitemap.xml", "/robots.txt", "/checkout", "/checkout/*"],
  transform: async (config, path) => {
    // trailingSlash: true in next.config means every emitted path lands here
    // with a trailing slash, so the priorityMap keys mirror that.
    const priorityMap = {
      "/": 1.0,
      "/buy-instagram-followers/": 0.9,
      "/buy-instagram-likes/": 0.9,
      "/buy-instagram-views/": 0.9,
      "/buy-tiktok-followers/": 0.9,
      "/buy-tiktok-likes/": 0.9,
      "/buy-tiktok-views/": 0.9,
      "/buy-youtube-subscribers/": 0.9,
      "/buy-youtube-views/": 0.9,
      "/buy-facebook-followers/": 0.9,
      "/buy-facebook-likes/": 0.9,
      "/buy-facebook-views/": 0.9,
      "/buy-twitter-followers/": 0.9,
      "/buy-twitter-likes/": 0.9,
      "/buy-twitter-retweets/": 0.9,
      "/aboutus/": 0.7,
      "/team/": 0.6,
      "/faqs/": 0.7,
      "/contact/": 0.6,
      "/refund/": 0.5,
      "/privacy/": 0.5,
      "/blog/": 0.8,
    };
    // Blog post pages: still pick up the dedicated changefreq/priority.
    if (path.startsWith("/blog/") && path !== "/blog/") {
      return {
        loc: path,
        changefreq: "monthly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
        alternateRefs: [
          { href: `${config.siteUrl}${path}`, hreflang: "en" },
          { href: `${config.siteUrl}${path}`, hreflang: "x-default" },
        ],
      };
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorityMap[path] ?? config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        { href: `${config.siteUrl}${path}`, hreflang: "en" },
        { href: `${config.siteUrl}${path}`, hreflang: "x-default" },
      ],
    };
  },
};
