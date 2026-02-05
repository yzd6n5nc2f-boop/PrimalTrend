import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";
import {
  addCartItem,
  clearCart as clearRemoteCart,
  createCart,
  fetchCart,
  removeCartItem as removeRemoteCartItem,
  setCartItemQty as setRemoteCartItemQty
} from "@/lib/cartApi";
import type { CartQuote } from "@/lib/cartApi";

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
  cartId: string | null;
  items: CartItem[];
  quote: CartQuote | null;
  isSyncing: boolean;
  error: string | null;
  initCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  setQty: (productId: string, size: string, qty: number) => void;
  clearCart: () => void;
};

const getInitialQuote = (): CartQuote | null => null;

const applyAddItem = (items: CartItem[], product: Product, size: string) => {
  const existing = items.find(
    (item) => item.productId === product.id && item.size === size
  );
  if (existing) {
    return items.map((item) =>
      item.productId === product.id && item.size === size
        ? { ...item, qty: item.qty + 1 }
        : item
    );
  }
  return [
    ...items,
    {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      qty: 1
    }
  ];
};

const applyRemoveItem = (items: CartItem[], productId: string, size: string) =>
  items.filter(
    (item) => !(item.productId === productId && item.size === size)
  );

const applySetQty = (
  items: CartItem[],
  productId: string,
  size: string,
  qty: number
) =>
  items.map((item) =>
    item.productId === productId && item.size === size ? { ...item, qty } : item
  );

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartId: null,
      items: [],
      quote: getInitialQuote(),
      isSyncing: false,
      error: null,
      initCart: async () => {
        const { cartId, items } = useCartStore.getState();
        if (cartId) {
          try {
            set({ isSyncing: true, error: null });
            const payload = await fetchCart(cartId);
            set({
              cartId: payload.cartId,
              items: payload.items,
              quote: payload.quote,
              isSyncing: false
            });
            return;
          } catch (error) {
            set({
              isSyncing: false,
              error: error instanceof Error ? error.message : "Cart unavailable"
            });
            return;
          }
        }

        if (items.length > 0) {
          try {
            set({ isSyncing: true, error: null });
            const payload = await createCart(
              items.map((item) => ({
                productId: item.productId,
                size: item.size,
                qty: item.qty
              }))
            );
            set({
              cartId: payload.cartId,
              items: payload.items,
              quote: payload.quote,
              isSyncing: false
            });
            return;
          } catch (error) {
            set({
              isSyncing: false,
              error: error instanceof Error ? error.message : "Cart unavailable"
            });
            return;
          }
        }

        try {
          set({ isSyncing: true, error: null });
          const payload = await createCart();
          set({
            cartId: payload.cartId,
            items: payload.items,
            quote: payload.quote,
            isSyncing: false
          });
        } catch (error) {
          set({
            isSyncing: false,
            error: error instanceof Error ? error.message : "Cart unavailable"
          });
        }
      },
      refreshCart: async () => {
        const { cartId } = useCartStore.getState();
        if (!cartId) return;
        try {
          set({ isSyncing: true, error: null });
          const payload = await fetchCart(cartId);
          set({
            items: payload.items,
            quote: payload.quote,
            isSyncing: false
          });
        } catch (error) {
          set({
            isSyncing: false,
            error: error instanceof Error ? error.message : "Cart unavailable"
          });
        }
      },
      addItem: (product, size) =>
        set((state) => {
          const nextItems = applyAddItem(state.items, product, size);
          void (async () => {
            const current = useCartStore.getState();
            try {
              let cartId = current.cartId;
              if (!cartId) {
                const created = await createCart(
                  nextItems.map((item) => ({
                    productId: item.productId,
                    size: item.size,
                    qty: item.qty
                  }))
                );
                set({
                  cartId: created.cartId,
                  items: created.items,
                  quote: created.quote,
                  error: null
                });
                return;
              }
              const payload = await addCartItem(cartId, product.id, size, 1);
              set({
                items: payload.items,
                quote: payload.quote,
                error: null
              });
            } catch (error) {
              set({
                error: error instanceof Error ? error.message : "Cart unavailable"
              });
            }
          })();
          return { items: nextItems };
        }),
      removeItem: (productId, size) =>
        set((state) => {
          const nextItems = applyRemoveItem(state.items, productId, size);
          void (async () => {
            const { cartId } = useCartStore.getState();
            if (!cartId) return;
            try {
              const payload = await removeRemoteCartItem(cartId, productId, size);
              set({ items: payload.items, quote: payload.quote, error: null });
            } catch (error) {
              set({
                error: error instanceof Error ? error.message : "Cart unavailable"
              });
            }
          })();
          return { items: nextItems };
        }),
      setQty: (productId, size, qty) =>
        set((state) => {
          const nextItems = applySetQty(state.items, productId, size, qty);
          void (async () => {
            const { cartId } = useCartStore.getState();
            if (!cartId) return;
            try {
              const payload = await setRemoteCartItemQty(
                cartId,
                productId,
                size,
                qty
              );
              set({ items: payload.items, quote: payload.quote, error: null });
            } catch (error) {
              set({
                error: error instanceof Error ? error.message : "Cart unavailable"
              });
            }
          })();
          return { items: nextItems };
        }),
      clearCart: () =>
        set((state) => {
          void (async () => {
            const { cartId } = useCartStore.getState();
            if (!cartId) return;
            try {
              const payload = await clearRemoteCart(cartId);
              set({
                items: payload.items,
                quote: payload.quote,
                error: null
              });
            } catch (error) {
              set({
                error: error instanceof Error ? error.message : "Cart unavailable"
              });
            }
          })();
          return { items: [], quote: getInitialQuote() };
        })
    }),
    { name: "primaltrend_cart_v2" }
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
