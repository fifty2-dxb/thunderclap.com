"use client";

import { useEffect, useRef } from "react";
import { trackCheckoutCompleted } from "@/lib/webengage-client";
import type { Platform, Service } from "@/components/cart-context";

type Props = {
  orderId: string;
  total: number;
  email: string;
  items: Array<{
    platform: Platform;
    service: Service;
    qty: number;
    price: number;
    premium: boolean;
  }>;
};

export function PurchaseTracker({ orderId, total, email, items }: Props) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackCheckoutCompleted({ orderId, total, email, items });
  }, [orderId, total, email, items]);

  return null;
}
