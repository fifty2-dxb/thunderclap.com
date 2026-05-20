import type { Metadata } from "next";
import { CartView } from "./_view";

export const metadata: Metadata = {
  title: "Your cart · Thunderclap",
  description: "Review the services in your Thunderclap cart before checkout.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CartView />;
}
