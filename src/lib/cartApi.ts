import type { CartItem } from "@/store/cartStore";

export type CartQuote = {
  currency: string;
  subtotalMinor: number;
  shippingMinor: number;
  taxMinor: number | null;
  totalMinor: number;
};

export type CartPayload = {
  cartId: string;
  items: CartItem[];
  quote: CartQuote;
};

type CheckoutPayload = {
  url: string;
  id: string;
};

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.error ?? "Request failed";
    throw new Error(message);
  }
  return payload as T;
}

export async function createCart(items?: Array<{
  productId: string;
  size: string;
  qty: number;
}>): Promise<CartPayload> {
  return requestJson<CartPayload>("/api/cart", {
    method: "POST",
    body: JSON.stringify({ items })
  });
}

export async function fetchCart(cartId: string): Promise<CartPayload> {
  return requestJson<CartPayload>(`/api/cart/${cartId}`);
}

export async function addCartItem(
  cartId: string,
  productId: string,
  size: string,
  qty = 1
): Promise<CartPayload> {
  return requestJson<CartPayload>(`/api/cart/${cartId}/items`, {
    method: "POST",
    body: JSON.stringify({ productId, size, qty })
  });
}

export async function setCartItemQty(
  cartId: string,
  productId: string,
  size: string,
  qty: number
): Promise<CartPayload> {
  return requestJson<CartPayload>(`/api/cart/${cartId}/items`, {
    method: "PATCH",
    body: JSON.stringify({ productId, size, qty })
  });
}

export async function removeCartItem(
  cartId: string,
  productId: string,
  size: string
): Promise<CartPayload> {
  return requestJson<CartPayload>(`/api/cart/${cartId}/items`, {
    method: "DELETE",
    body: JSON.stringify({ productId, size })
  });
}

export async function clearCart(cartId: string): Promise<CartPayload> {
  return requestJson<CartPayload>(`/api/cart/${cartId}/clear`, {
    method: "POST"
  });
}

export async function checkoutCart(cartId: string): Promise<CheckoutPayload> {
  return requestJson<CheckoutPayload>(`/api/cart/${cartId}/checkout`, {
    method: "POST"
  });
}
