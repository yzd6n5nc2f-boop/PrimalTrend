import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import {
  findProductById,
  findProductBySlug,
  insertOrder,
  listProducts
} from "./db";

dotenv.config();

const app = express();

const port = Number(process.env.PORT) || 4000;
const siteUrl = process.env.PUBLIC_SITE_URL ?? "http://localhost:3000";
const successUrl =
  process.env.CHECKOUT_SUCCESS_URL ?? `${siteUrl}/cart?status=success`;
const cancelUrl =
  process.env.CHECKOUT_CANCEL_URL ?? `${siteUrl}/cart?status=cancel`;

const allowedOrigins = (process.env.CORS_ORIGIN ?? siteUrl)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

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
        insertOrder({
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

app.post("/api/cart/checkout", async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ error: "Stripe is not configured" });
  }

  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  if (items.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  try {
    const sanitized = items.map((item) => {
      const productId = String(item.productId ?? "");
      const size = String(item.size ?? "");
      const qty = Number(item.qty ?? 0);

      if (!productId || !size || !Number.isFinite(qty) || qty <= 0) {
        throw new Error("Invalid cart payload");
      }

      const product = findProductById(productId);
      if (!product) {
        throw new Error(`Unknown product ${productId}`);
      }

      if (!product.sizes.includes(size)) {
        throw new Error(`Invalid size ${size} for ${productId}`);
      }

      return { product, size, qty };
    });

    const lineItems = sanitized.map(({ product, size, qty }) => {
      const imageUrl = new URL(product.image, siteUrl).toString();

      return {
        quantity: qty,
        price_data: {
          currency: "gbp",
          unit_amount: product.price * 100,
          product_data: {
            name: product.name,
            description: product.description,
            images: [imageUrl],
            metadata: {
              productId: product.id,
              size
            }
          }
        }
      } as Stripe.Checkout.SessionCreateParams.LineItem;
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        cart: JSON.stringify(
          sanitized.map(({ product, size, qty }) => ({
            productId: product.id,
            size,
            qty
          }))
        )
      }
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
