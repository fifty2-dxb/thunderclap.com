/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://thunderclap.com",
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*"],
  transform: async (config, path) => {
    const priorityMap = {
      "/": 1.0,
      "/instagram/followers": 0.9,
      "/instagram/likes": 0.9,
      "/instagram/views": 0.9,
      "/tiktok/followers": 0.9,
      "/tiktok/likes": 0.9,
      "/tiktok/views": 0.9,
      "/youtube/subscribers": 0.9,
      "/youtube/views": 0.9,
    };
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
