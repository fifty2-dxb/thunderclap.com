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
      "/buy-instagram-followers": 0.9,
      "/buy-instagram-likes": 0.9,
      "/buy-instagram-views": 0.9,
      "/buy-tiktok-followers": 0.9,
      "/buy-tiktok-likes": 0.9,
      "/buy-tiktok-views": 0.9,
      "/buy-youtube-subscribers": 0.9,
      "/buy-youtube-views": 0.9,
      "/buy-facebook-followers": 0.9,
      "/buy-facebook-likes": 0.9,
      "/buy-facebook-views": 0.9,
      "/buy-twitter-followers": 0.9,
      "/buy-twitter-likes": 0.9,
      "/buy-twitter-retweets": 0.9,
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
