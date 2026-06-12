import type { Metadata } from "next";
import { CtaSection } from "@/components/cta-section";
import { DashboardStrip } from "@/components/dashboard-strip";
import { FaqSection } from "@/components/faq";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { PricingTable } from "@/components/pricing-table";
import { Testimonials } from "@/components/testimonials";
import { TwoWays } from "@/components/two-ways";
import { WhyThunderclap } from "@/components/trust-bar";
import { HOMEPAGE_FAQS } from "@/content/faqs";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Thunderclap — Real Social Media Growth: Followers, Likes & Views",
  description:
    "Boost your TikTok, Instagram, YouTube, Facebook and Twitter / X accounts with real followers, likes and views from active users. Money-back guaranteed. Trusted by 200K+ creators.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Thunderclap — Real Social Media Growth",
    description:
      "Real followers, likes, and views from active users. Money-back guaranteed. Trusted by 200K+ creators.",
    url: SITE_URL,
    siteName: "Thunderclap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thunderclap — Real Social Media Growth",
    description:
      "Real followers, likes, and views from active users. Money-back guaranteed. Trusted by 200K+ creators.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Thunderclap",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
  sameAs: [
    "https://www.instagram.com/",
    "https://www.tiktok.com/",
    "https://www.youtube.com/",
    "https://twitter.com/",
    "https://www.facebook.com/",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Thunderclap",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOMEPAGE_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <DashboardStrip />
      <TwoWays />
      <WhyThunderclap />
      <HowItWorks />
      <PricingTable />
      <Testimonials />
      <FaqSection faqs={HOMEPAGE_FAQS} initialOpen={5} />
      <CtaSection />
    </main>
  );
}
