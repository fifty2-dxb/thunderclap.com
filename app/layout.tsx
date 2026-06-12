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

const WE_LICENSE = process.env.NEXT_PUBLIC_WEBENGAGE_LICENSE_CODE;

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
        {WE_LICENSE && (
          <Script id="_webengage_script_tag" strategy="afterInteractive">
            {`
              var webengage;
              !function(w,e,b,n,g){function o(e,t){e[t[t.length-1]]=function(){r.__queue.push([t.join("."),arguments])}}var i,s,r=w[b],z=" ",l="init options track screen onReady".split(z),a="feedback survey notification".split(z),c="options render clear abort".split(z),p="Open Close Submit Complete View Click".split(z),u="identify login logout setAttribute".split(z);if(!r||!r.__v){for(w[b]=r={__queue:[],__v:"6.0",user:{}},i=0;i<l.length;i++)o(r,[l[i]]);for(i=0;i<a.length;i++){for(r[a[i]]={},s=0;s<c.length;s++)o(r[a[i]],[a[i],c[s]]);for(s=0;s<p.length;s++)o(r[a[i]],[a[i],"on"+p[s]])}for(i=0;i<u.length;i++)o(r.user,["user",u[i]]);setTimeout(function(){var f=e.createElement("script"),d=e.getElementById("_webengage_script_tag");f.type="text/javascript",f.async=!0,f.src=("https:"==e.location.protocol?"https://ssl.widgets.webengage.com":"http://cdn.widgets.webengage.com")+"/js/webengage-min-v-6.0.js",d.parentNode.insertBefore(f,d)})}}(window,document,"webengage");
              webengage.init('${WE_LICENSE}');
            `}
          </Script>
        )}
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
