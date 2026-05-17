import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thunderclap",
  description: "Real social media growth — followers, likes, and views from active users.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
