"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import { useCart } from "./cart-context";
import { formatQty } from "@/lib/utils";

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function CartToast() {
  const { toast, dismissToast, count } = useCart();
  if (!toast) return null;

  if (toast.kind === "added") {
    const { item } = toast;
    const label = `${formatQty(item.qty)} ${cap(item.platform)} ${cap(item.service)} added`;
    return (
      <div
        role="status"
        aria-live="polite"
        className="cart-toast cart-toast-mobile"
      >
        <span
          className="cart-toast-pill"
          style={{
            background: "#1aa364",
            color: "#fff",
          }}
          aria-hidden
        >
          <Check size={14} strokeWidth={3} />
        </span>
        <div className="cart-toast-body">
          <div className="cart-toast-title">{label}</div>
          {count > 0 && (
            <div className="cart-toast-meta">
              {count} item{count === 1 ? "" : "s"} in cart
            </div>
          )}
        </div>
        <Link
          href="/cart"
          className="btn btn-primary btn-sm cart-toast-cta"
          onClick={dismissToast}
        >
          View cart
        </Link>
        <button
          type="button"
          onClick={dismissToast}
          aria-label="Dismiss notification"
          className="cart-toast-close"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  // toast.kind === "removed"
  return (
    <div
      role="status"
      aria-live="polite"
      className="cart-toast cart-toast-mobile"
    >
      <span
        className="cart-toast-pill"
        style={{
          background: "#e6e6ea",
          color: "var(--uv-fg-1)",
        }}
        aria-hidden
      >
        <Check size={14} strokeWidth={3} />
      </span>
      <div className="cart-toast-body">
        <div className="cart-toast-title">Item removed</div>
      </div>
      <button
        type="button"
        onClick={dismissToast}
        className="cart-toast-undo"
      >
        Undo
      </button>
      <button
        type="button"
        onClick={dismissToast}
        aria-label="Dismiss notification"
        className="cart-toast-close"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default CartToast;
