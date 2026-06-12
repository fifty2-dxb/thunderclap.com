import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import { Plus_Jakarta_Sans, Manrope, JetBrains_Mono } from "next/font/google";
import { Announcement } from "@/components/announcement";
import { CartProvider } from "@/components/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { AiWaitlistProvider } from "@/components/ai-waitlist";
import { Header } from "@/components/header";
import { Ticker } from "@/components/ticker";
import { Footer } from "@/components/footer";
import { PageViewTracker } from "@/components/page-view-tracker";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Thunderclap — Real Social Media Growth: Followers, Likes & Views",
    template: "%s · Thunderclap",
  },
  description:
    "Boost your TikTok, Instagram, YouTube, Facebook and Twitter / X accounts with real followers, likes and views from active users. Money-back guaranteed. Trusted by 200K+ creators.",
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  // Default robots for every page (inherited via the root layout). Renders
  // `index, follow, max-video-preview:-1, max-image-preview:large,
  // max-snippet:-1` for both the generic robots and googlebot tags. The
  // /checkout* routes override this with { index: false, follow: false }.
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${manrope.variable} ${jetbrains.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0T6JZ3J82L"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0T6JZ3J82L');
          `}
        </Script>
      </head>
      <body>
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <defs>
            <linearGradient id="uv-icon-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b76f6" />
              <stop offset="100%" stopColor="#2257d8" />
            </linearGradient>
          </defs>
        </svg>
        <CartProvider>
          <AiWaitlistProvider>
            <Suspense fallback={null}>
              <PageViewTracker />
            </Suspense>
            <Announcement />
            <Header />
            <Ticker />
            {children}
            <Footer />
            <CartDrawer />
          </AiWaitlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
