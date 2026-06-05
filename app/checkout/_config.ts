// Shared checkout configuration — labels and per-pair input copy.
// Lives in a plain non-"use client" module so both the server shell
// (app/checkout/page.tsx) AND the client island (app/checkout/_form.tsx)
// can import the same source of truth without "use client" leakage.

export type Platform =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "facebook"
  | "twitter"
  | "linkedin";

export type Service =
  | "followers"
  | "likes"
  | "views"
  | "subscribers"
  | "comments"
  | "retweets"
  | "connections"; // LinkedIn-specific

export type InputConfig = { label: string; placeholder: string };

export const PLATFORM_LABEL: Record<Platform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  facebook: "Facebook",
  twitter: "Twitter / X",
  linkedin: "LinkedIn",
};

export const SERVICE_LABEL: Record<Service, string> = {
  followers: "Followers",
  likes: "Likes",
  views: "Views",
  subscribers: "Subscribers",
  comments: "Comments",
  retweets: "Retweets",
  connections: "Connections",
};

export const INPUT_CONFIG: Record<string, InputConfig> = {
  "instagram-followers": {
    label: "Instagram username or profile link",
    placeholder: "https://instagram.com/yourusername",
  },
  "instagram-likes": {
    label: "Instagram post URL",
    placeholder: "https://instagram.com/p/abc123/",
  },
  "instagram-views": {
    label: "Instagram Reel or video URL",
    placeholder: "https://instagram.com/reel/abc123/",
  },
  "tiktok-followers": {
    label: "TikTok username or profile link",
    placeholder: "https://tiktok.com/@yourusername",
  },
  "tiktok-likes": {
    label: "TikTok video URL",
    placeholder: "https://tiktok.com/@yourusername/video/1234567890",
  },
  "tiktok-views": {
    label: "TikTok video URL",
    placeholder: "https://tiktok.com/@yourusername/video/1234567890",
  },
  "youtube-subscribers": {
    label: "YouTube channel URL",
    placeholder: "https://youtube.com/@yourchannel",
  },
  "youtube-views": {
    label: "YouTube video URL",
    placeholder: "https://youtube.com/watch?v=A3uyBx675Sx",
  },
  "facebook-followers": {
    label: "Facebook page URL",
    placeholder: "https://facebook.com/yourpage",
  },
  "facebook-likes": {
    label: "Facebook post URL",
    placeholder: "https://facebook.com/yourpage/posts/123456789",
  },
  "facebook-views": {
    label: "Facebook video or Reel URL",
    placeholder: "https://facebook.com/yourpage/videos/123456789",
  },
  "twitter-followers": {
    label: "Twitter / X profile URL",
    placeholder: "https://x.com/yourhandle",
  },
  "twitter-likes": {
    label: "Twitter / X post URL",
    placeholder: "https://x.com/yourhandle/status/123456789",
  },
  "twitter-retweets": {
    label: "Twitter / X post URL",
    placeholder: "https://x.com/yourhandle/status/123456789",
  },
  "linkedin-connections": {
    label: "LinkedIn profile URL",
    placeholder: "https://www.linkedin.com/in/yourname",
  },
  "linkedin-followers": {
    label: "LinkedIn profile or company page URL",
    placeholder: "https://www.linkedin.com/in/yourname",
  },
  "linkedin-likes": {
    label: "LinkedIn post URL",
    placeholder: "https://www.linkedin.com/posts/yourname_activity-1234567890",
  },
  "linkedin-comments": {
    label: "LinkedIn post URL",
    placeholder: "https://www.linkedin.com/posts/yourname_activity-1234567890",
  },
};

export function inputConfigFor(platform: Platform, service: Service): InputConfig {
  return (
    INPUT_CONFIG[`${platform}-${service}`] ?? {
      label: "Target URL",
      placeholder: "https://...",
    }
  );
}
