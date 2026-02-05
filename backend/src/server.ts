import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import {
  addCartItem,
  cartExists,
  clearCartItems,
  createCart,
  findProductById,
  findProductBySlug,
  listProducts,
  listCartItemsDetailed,
  removeCartItem,
  setCartItemQty,
  upsertOrder
} from "./db";
import { buildCartQuote, CartInputItem } from "./cart";

dotenv.config();

const app = express();

const port = Number(process.env.PORT) || 4000;
const siteUrl = process.env.PUBLIC_SITE_URL ?? "http://localhost:3000";
const successUrl =
  process.env.CHECKOUT_SUCCESS_URL ?? `${siteUrl}/cart?status=success`;
const cancelUrl =
  process.env.CHECKOUT_CANCEL_URL ?? `${siteUrl}/cart?status=cancel`;
const checkoutCurrency = (process.env.CHECKOUT_CURRENCY ?? "gbp").toLowerCase();
const taxEnabled =
  (process.env.CHECKOUT_TAX_ENABLED ?? "true").toLowerCase() === "true";
const billingAddressRequired =
  (process.env.CHECKOUT_BILLING_ADDRESS_REQUIRED ?? "true").toLowerCase() ===
  "true";
const shippingCountries =
  process.env.CHECKOUT_SHIPPING_COUNTRIES?.split(",")
    .map((country) => country.trim().toUpperCase())
    .filter(Boolean) ?? ["GB"];

const allowedOrigins = (process.env.CORS_ORIGIN ?? siteUrl)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

const buildCartResponse = (cartId: string) => {
  const items = listCartItemsDetailed(cartId);
  const quote = buildCartQuote(
    items.map((item) => ({
      productId: item.productId,
      size: item.size,
      qty: item.qty
    }))
  );
  return {
    cartId,
    items,
    quote
  };
};

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
    credentials: true
  })
);

app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    if (!stripe) {
      return res.status(500).send("Stripe is not configured");
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return res.status(500).send("Webhook secret is not configured");
    }

    const signature = req.headers["stripe-signature"];
    if (!signature || Array.isArray(signature)) {
      return res.status(400).send("Missing Stripe signature");
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return res.status(400).send(`Webhook error: ${message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const rawCart = session.metadata?.cart;
      let cartItems: Array<{ productId: string; size: string; qty: number }> = [];

      if (rawCart) {
        try {
          const parsed = JSON.parse(rawCart);
          if (Array.isArray(parsed)) {
            cartItems = parsed;
          }
        } catch (error) {
          console.warn("Unable to parse cart metadata", error);
        }
      }

      const orderItems = cartItems
        .map((item) => {
          const product = findProductById(item.productId);
          if (!product) {
            return null;
          }

          return {
            productId: product.id,
            size: item.size,
            qty: item.qty,
            unitPriceMinor: product.price * 100
          };
        })
        .filter(Boolean) as Array<{
        productId: string;
        size: string;
        qty: number;
        unitPriceMinor: number;
      }>;

      if (orderItems.length > 0) {
        upsertOrder({
          id: session.id,
          stripeSessionId: session.id,
          amountTotalMinor: session.amount_total ?? null,
          currency: session.currency ?? null,
          customerEmail:
            session.customer_details?.email ?? session.customer_email ?? null,
          status: session.status ?? session.payment_status ?? null,
          items: orderItems
        });
      }
    }

    res.json({ received: true });
  }
);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/products", (_req, res) => {
  res.json({ products: listProducts() });
});

app.get("/api/products/:slug", (req, res) => {
  const product = findProductBySlug(req.params.slug);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  return res.json({ product });
});

app.post("/api/cart", (req, res) => {
  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  try {
    const cartId = createCart();
    if (items.length > 0) {
      const parsedItems = items.map((item: CartInputItem) => ({
        productId: String(item.productId ?? ""),
        size: String(item.size ?? ""),
        qty: Number(item.qty ?? 0)
      }));

      if (parsedItems.some((item) => !item.productId || !item.size || item.qty <= 0)) {
        throw new Error("Invalid cart payload");
      }

      for (const item of parsedItems) {
        const product = findProductById(item.productId);
        if (!product) {
          throw new Error(`Unknown product ${item.productId}`);
        }
        if (!product.sizes.includes(item.size)) {
          throw new Error(`Invalid size ${item.size} for ${item.productId}`);
        }
        addCartItem(cartId, item.productId, item.size, item.qty);
      }
    }

    return res.json(buildCartResponse(cartId));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Cart creation failed";
    return res.status(400).json({ error: message });
  }
});

app.get("/api/cart/:cartId", (req, res) => {
  const cartId = req.params.cartId;
  if (!cartExists(cartId)) {
    return res.status(404).json({ error: "Cart not found" });
  }
  return res.json(buildCartResponse(cartId));
});

app.post("/api/cart/:cartId/items", (req, res) => {
  const cartId = req.params.cartId;
  if (!cartExists(cartId)) {
    return res.status(404).json({ error: "Cart not found" });
  }

  const productId = String(req.body?.productId ?? "");
  const size = String(req.body?.size ?? "");
  const qty = Number(req.body?.qty ?? 1);

  if (!productId || !size || !Number.isFinite(qty) || qty <= 0) {
    return res.status(400).json({ error: "Invalid cart payload" });
  }

  const product = findProductById(productId);
  if (!product) {
    return res.status(400).json({ error: "Unknown product" });
  }
  if (!product.sizes.includes(size)) {
    return res.status(400).json({ error: "Invalid size" });
  }

  addCartItem(cartId, productId, size, qty);
  return res.json(buildCartResponse(cartId));
});

app.patch("/api/cart/:cartId/items", (req, res) => {
  const cartId = req.params.cartId;
  if (!cartExists(cartId)) {
    return res.status(404).json({ error: "Cart not found" });
  }

  const productId = String(req.body?.productId ?? "");
  const size = String(req.body?.size ?? "");
  const qty = Number(req.body?.qty ?? 0);

  if (!productId || !size || !Number.isFinite(qty)) {
    return res.status(400).json({ error: "Invalid cart payload" });
  }

  setCartItemQty(cartId, productId, size, qty);
  return res.json(buildCartResponse(cartId));
});

app.delete("/api/cart/:cartId/items", (req, res) => {
  const cartId = req.params.cartId;
  if (!cartExists(cartId)) {
    return res.status(404).json({ error: "Cart not found" });
  }

  const productId = String(req.body?.productId ?? "");
  const size = String(req.body?.size ?? "");
  if (!productId || !size) {
    return res.status(400).json({ error: "Invalid cart payload" });
  }

  removeCartItem(cartId, productId, size);
  return res.json(buildCartResponse(cartId));
});

app.post("/api/cart/:cartId/clear", (req, res) => {
  const cartId = req.params.cartId;
  if (!cartExists(cartId)) {
    return res.status(404).json({ error: "Cart not found" });
  }

  clearCartItems(cartId);
  return res.json(buildCartResponse(cartId));
});

app.post("/api/cart/quote", (req, res) => {
  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  if (items.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  try {
    const parsedItems = items.map((item: CartInputItem) => ({
      productId: String(item.productId ?? ""),
      size: String(item.size ?? ""),
      qty: Number(item.qty ?? 0)
    }));

    if (parsedItems.some((item) => !item.productId || !item.size)) {
      throw new Error("Invalid cart payload");
    }

    const quote = buildCartQuote(parsedItems);
    return res.json({
      currency: quote.currency,
      lineItems: quote.lineItems,
      subtotalMinor: quote.subtotalMinor,
      shippingMinor: quote.shippingMinor,
      taxMinor: quote.taxMinor,
      totalMinor: quote.totalMinor
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Quote failed";
    return res.status(400).json({ error: message });
  }
});

app.post("/api/cart/checkout", async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ error: "Stripe is not configured" });
  }

  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  if (items.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  try {
    const parsedItems = items.map((item: CartInputItem) => ({
      productId: String(item.productId ?? ""),
      size: String(item.size ?? ""),
      qty: Number(item.qty ?? 0)
    }));

    if (parsedItems.some((item) => !item.productId || !item.size)) {
      throw new Error("Invalid cart payload");
    }

    const quote = buildCartQuote(parsedItems);

    const lineItems = quote.lineItems.map((item) => {
      const product = findProductById(item.productId);
      if (!product) {
        throw new Error(`Unknown product ${item.productId}`);
      }
      const imageUrl = new URL(product.image, siteUrl).toString();

      return {
        quantity: item.qty,
        price_data: {
          currency: checkoutCurrency,
          unit_amount: item.unitPriceMinor,
          product_data: {
            name: item.name,
            description: product.description,
            images: [imageUrl],
            metadata: {
              productId: product.id,
              size: item.size
            }
          }
        }
      } as Stripe.Checkout.SessionCreateParams.LineItem;
    });

    if (quote.shippingMinor > 0) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: checkoutCurrency,
          unit_amount: quote.shippingMinor,
          product_data: {
            name: "Shipping"
          }
        }
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      automatic_payment_methods: { enabled: true },
      automatic_tax: { enabled: taxEnabled },
      billing_address_collection: billingAddressRequired ? "required" : "auto",
      shipping_address_collection: {
        allowed_countries: shippingCountries
      },
      metadata: {
        cart: JSON.stringify(
          parsedItems.map(({ productId, size, qty }) => ({
            productId,
            size,
            qty
          }))
        )
      }
    });

    upsertOrder({
      id: session.id,
      stripeSessionId: session.id,
      amountTotalMinor: quote.totalMinor,
      currency: quote.currency,
      customerEmail: null,
      status: "created",
      items: quote.lineItems.map((item) => ({
        productId: item.productId,
        size: item.size,
        qty: item.qty,
        unitPriceMinor: item.unitPriceMinor
      }))
    });

    return res.json({ url: session.url, id: session.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    console.error("Checkout error", message);
    return res.status(400).json({ error: message });
  }
});

app.post("/api/cart/:cartId/checkout", async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ error: "Stripe is not configured" });
  }

  const cartId = req.params.cartId;
  if (!cartExists(cartId)) {
    return res.status(404).json({ error: "Cart not found" });
  }

  try {
    const items = listCartItemsDetailed(cartId);
    if (items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const quote = buildCartQuote(
      items.map((item) => ({
        productId: item.productId,
        size: item.size,
        qty: item.qty
      }))
    );

    const lineItems = quote.lineItems.map((item) => {
      const product = findProductById(item.productId);
      if (!product) {
        throw new Error(`Unknown product ${item.productId}`);
      }
      const imageUrl = new URL(product.image, siteUrl).toString();

      return {
        quantity: item.qty,
        price_data: {
          currency: checkoutCurrency,
          unit_amount: item.unitPriceMinor,
          product_data: {
            name: item.name,
            description: product.description,
            images: [imageUrl],
            metadata: {
              productId: product.id,
              size: item.size
            }
          }
        }
      } as Stripe.Checkout.SessionCreateParams.LineItem;
    });

    if (quote.shippingMinor > 0) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: checkoutCurrency,
          unit_amount: quote.shippingMinor,
          product_data: {
            name: "Shipping"
          }
        }
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      automatic_payment_methods: { enabled: true },
      automatic_tax: { enabled: taxEnabled },
      billing_address_collection: billingAddressRequired ? "required" : "auto",
      shipping_address_collection: {
        allowed_countries: shippingCountries
      },
      metadata: {
        cart: JSON.stringify(
          items.map(({ productId, size, qty }) => ({
            productId,
            size,
            qty
          }))
        )
      }
    });

    upsertOrder({
      id: session.id,
      stripeSessionId: session.id,
      amountTotalMinor: quote.totalMinor,
      currency: quote.currency,
      customerEmail: null,
      status: "created",
      items: quote.lineItems.map((item) => ({
        productId: item.productId,
        size: item.size,
        qty: item.qty,
        unitPriceMinor: item.unitPriceMinor
      }))
    });

    return res.json({ url: session.url, id: session.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    console.error("Checkout error", message);
    return res.status(400).json({ error: message });
  }
});

app.listen(port, () => {
  console.log(`PRIMAL TREND backend listening on ${port}`);
});
