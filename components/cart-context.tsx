"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { trackAddedToCart } from "@/lib/webengage-client";

export type Platform = "instagram" | "tiktok" | "youtube" | "facebook" | "twitter";
export type Service =
  | "followers"
  | "likes"
  | "views"
  | "subscribers"
  | "comments"
  | "retweets";

export type CartItem = {
  id: string;
  platform: Platform;
  service: Service;
  qty: number;
  price: number;
  regular: number;
  premium: boolean;
  target?: string;
  addedAt: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  lastAddedPlatform: Platform | null;
  addItem: (input: Omit<CartItem, "id" | "addedAt">) => void;
  removeItem: (id: string) => void;
  updateTarget: (id: string, target: string) => void;
  setAllTargets: (target: string) => void;
  clear: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const STORAGE_KEY = "tc:cart:v1";

const CartContext = createContext<CartContextValue | null>(null);

function buildId(platform: Platform, service: Service, premium: boolean) {
  return `${platform}-${service}-${premium ? "p" : "s"}`;
}

function lineTotal(item: CartItem): number {
  return item.price * (item.premium ? 1.35 : 1);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastAddedPlatform, setLastAddedPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota errors
    }
  }, [items, hydrated]);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const addItem = useCallback<CartContextValue["addItem"]>((input) => {
    const id = buildId(input.platform, input.service, input.premium);
    const next: CartItem = { ...input, id, addedAt: Date.now() };
    setItems((curr) => {
      const without = curr.filter((it) => it.id !== id);
      return [...without, next];
    });
    setLastAddedPlatform(input.platform);
    setIsDrawerOpen(true);
    trackAddedToCart(input);
  }, []);

  const removeItem = useCallback<CartContextValue["removeItem"]>((id) => {
    setItems((curr) => curr.filter((it) => it.id !== id));
  }, []);

  const updateTarget = useCallback<CartContextValue["updateTarget"]>((id, target) => {
    setItems((curr) =>
      curr.map((it) => (it.id === id ? { ...it, target } : it)),
    );
  }, []);

  const setAllTargets = useCallback<CartContextValue["setAllTargets"]>((target) => {
    setItems((curr) => curr.map((it) => ({ ...it, target })));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.length;
    const subtotal = items.reduce((sum, it) => sum + lineTotal(it), 0);
    return {
      items,
      count,
      subtotal: Math.round(subtotal * 100) / 100,
      hydrated,
      lastAddedPlatform,
      addItem,
      removeItem,
      updateTarget,
      setAllTargets,
      clear,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
    };
  }, [
    items,
    hydrated,
    lastAddedPlatform,
    addItem,
    removeItem,
    updateTarget,
    setAllTargets,
    clear,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return ctx;
}

export function lineItemTotal(item: CartItem): number {
  return Math.round(lineTotal(item) * 100) / 100;
}
