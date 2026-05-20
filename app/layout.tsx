import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope, JetBrains_Mono } from "next/font/google";
import { Announcement } from "@/components/announcement";
import { CartProvider } from "@/components/cart-context";
import { CartToast } from "@/components/cart-toast";
import { Header } from "@/components/header";
import { Ticker } from "@/components/ticker";
import { Footer } from "@/components/footer";
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
    "Boost your TikTok, Instagram, YouTube, Facebook and Twitter accounts with real followers, likes and views from active users. Money-back guaranteed. Trusted by 200K+ creators.",
  icons: { icon: "/logo.webp" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${manrope.variable} ${jetbrains.variable}`}>
      <body>
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <defs>
            <linearGradient id="uv-icon-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ef4655" />
              <stop offset="100%" stopColor="#d8344a" />
            </linearGradient>
          </defs>
        </svg>
        <CartProvider>
          <Announcement />
          <Header />
          <Ticker />
          {children}
          <Footer />
          <CartToast />
        </CartProvider>
      </body>
    </html>
  );
}
