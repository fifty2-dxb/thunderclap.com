"use client";

import { useEffect } from "react";
import { gaPurchase, toGaItem } from "@/lib/ga4";
import type { Platform, Service } from "@/components/cart-context";

/**
 * Fires the GA4 `purchase` conversion from /checkout/success. Renders nothing.
 * Deduped per order id inside gaPurchase (localStorage) so a page refresh
 * doesn't double-count. `price` is the BASE tier price — toGaItem re-applies the
 * +35% premium multiplier, and `value` is the already-charged order total.
 */
export function PurchaseTracker({
  transactionId,
  value,
  platform,
  service,
  qty,
  price,
  premium,
}: {
  transactionId: string;
  value: number;
  platform: Platform;
  service: Service;
  qty: number;
  price: number;
  premium: boolean;
}) {
  useEffect(() => {
    if (!transactionId || value <= 0) return;
    gaPurchase({
      transactionId,
      value,
      items: [toGaItem({ platform, service, qty, price, premium })],
    });
  }, [transactionId, value, platform, service, qty, price, premium]);

  return null;
}
