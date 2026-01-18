import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  setQty: (productId: string, size: string, qty: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, size) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.productId === product.id && item.size === size
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id && item.size === size
                  ? { ...item, qty: item.qty + 1 }
                  : item
              )
            };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.image,
                size,
                qty: 1
              }
            ]
          };
        }),
      removeItem: (productId, size) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === productId && item.size === size)
          )
        })),
      setQty: (productId, size, qty) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId && item.size === size
              ? { ...item, qty }
              : item
          )
        })),
      clearCart: () => set({ items: [] })
    }),
    { name: "primaltrend_cart_v1" }
  )
);

export const useCartTotals = () =>
  useCartStore((state) =>
    state.items.reduce(
      (totals, item) => {
        totals.count += item.qty;
        totals.subtotal += item.price * item.qty;
        return totals;
      },
      { count: 0, subtotal: 0 }
    )
  );
