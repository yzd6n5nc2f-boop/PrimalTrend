import { findProductById } from "./db";

export type CartInputItem = {
  productId: string;
  size: string;
  qty: number;
};

export type CartLineItem = {
  productId: string;
  name: string;
  size: string;
  qty: number;
  unitPriceMinor: number;
  lineTotalMinor: number;
};

export type CartQuote = {
  currency: string;
  lineItems: CartLineItem[];
  subtotalMinor: number;
  shippingMinor: number;
  taxMinor: number | null;
  totalMinor: number;
};

function parseNumber(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function buildCartQuote(items: CartInputItem[]): CartQuote {
  const currency = (process.env.CHECKOUT_CURRENCY ?? "gbp").toLowerCase();
  const freeShippingThreshold = parseNumber(
    process.env.SHIPPING_FREE_THRESHOLD,
    60
  );
  const flatShipping = parseNumber(process.env.SHIPPING_FLAT_RATE, 4.95);

  const lineItems: CartLineItem[] = items.map((item) => {
    const product = findProductById(item.productId);
    if (!product) {
      throw new Error(`Unknown product ${item.productId}`);
    }
    if (!product.sizes.includes(item.size)) {
      throw new Error(`Invalid size ${item.size} for ${item.productId}`);
    }
    if (!Number.isFinite(item.qty) || item.qty <= 0) {
      throw new Error(`Invalid quantity for ${item.productId}`);
    }

    const unitPriceMinor = product.price * 100;
    return {
      productId: product.id,
      name: product.name,
      size: item.size,
      qty: item.qty,
      unitPriceMinor,
      lineTotalMinor: unitPriceMinor * item.qty
    };
  });

  const subtotalMinor = lineItems.reduce(
    (sum, item) => sum + item.lineTotalMinor,
    0
  );
  const shippingMinor =
    subtotalMinor >= Math.round(freeShippingThreshold * 100)
      ? 0
      : Math.round(flatShipping * 100);
  const taxMinor = null;
  const totalMinor = subtotalMinor + shippingMinor;

  return {
    currency,
    lineItems,
    subtotalMinor,
    shippingMinor,
    taxMinor,
    totalMinor
  };
}
