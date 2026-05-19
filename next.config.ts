import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Legacy thunderclap.com URLs (the DR-72 domain we're inheriting) all carry
  // a trailing slash — `/aboutus/`, `/team/`, `/faqs/`, `/contact/`, `/refund/`,
  // `/privacy/`, etc. Flipping this on makes Next emit canonical URLs with the
  // trailing slash and 308-redirect the non-trailing variants so we preserve
  // the existing Google indexing.
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      // Old nested routes from before the URL rewrite — consolidate signals
      // to the new /buy-{platform}-{service} canonical.
      { source: "/instagram/followers", destination: "/buy-instagram-followers", permanent: true },
      { source: "/instagram/likes", destination: "/buy-instagram-likes", permanent: true },
      { source: "/instagram/views", destination: "/buy-instagram-views", permanent: true },
      { source: "/tiktok/followers", destination: "/buy-tiktok-followers", permanent: true },
      { source: "/tiktok/likes", destination: "/buy-tiktok-likes", permanent: true },
      { source: "/tiktok/views", destination: "/buy-tiktok-views", permanent: true },
      { source: "/youtube/subscribers", destination: "/buy-youtube-subscribers", permanent: true },
      { source: "/youtube/views", destination: "/buy-youtube-views", permanent: true },
      { source: "/facebook/followers", destination: "/buy-facebook-followers", permanent: true },
      { source: "/facebook/likes", destination: "/buy-facebook-likes", permanent: true },
      { source: "/facebook/views", destination: "/buy-facebook-views", permanent: true },
      { source: "/twitter/followers", destination: "/buy-twitter-followers", permanent: true },
      { source: "/twitter/likes", destination: "/buy-twitter-likes", permanent: true },
      { source: "/twitter/retweets", destination: "/buy-twitter-retweets", permanent: true },

      // Legacy URLs from the prior thunderclap.com WordPress site that already
      // rank in Google (Ahrefs DR 72). Preserve their link equity.
      { source: "/buy-instagram-impressions", destination: "/buy-instagram-views", permanent: true },
      { source: "/free-youtube-subscribers", destination: "/buy-youtube-subscribers", permanent: true },
      { source: "/instagram", destination: "/buy-instagram-followers", permanent: true },
      { source: "/tiktok", destination: "/buy-tiktok-followers", permanent: true },
      { source: "/youtube", destination: "/buy-youtube-subscribers", permanent: true },
      { source: "/facebook", destination: "/buy-facebook-followers", permanent: true },
      { source: "/twitter", destination: "/buy-twitter-followers", permanent: true },
    ];
  },
};

export default nextConfig;
