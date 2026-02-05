# PRIMAL TREND Backend

Lightweight Express + SQLite backend with Stripe Checkout support.

## Setup

```bash
cd backend
pnpm install
cp .env.example .env
pnpm dev
```

## Environment

See `.env.example` for required values.

- `STRIPE_SECRET_KEY` is required for checkout.
- `STRIPE_WEBHOOK_SECRET` is required if you want to record orders via webhooks.
- `PUBLIC_SITE_URL` should match your Next.js frontend origin.

## Endpoints

- `GET /health`
- `GET /api/products`
- `GET /api/products/:slug`
- `POST /api/cart`
- `GET /api/cart/:cartId`
- `POST /api/cart/:cartId/items`
- `PATCH /api/cart/:cartId/items`
- `DELETE /api/cart/:cartId/items`
- `POST /api/cart/:cartId/clear`
- `POST /api/cart/:cartId/checkout`
- `POST /api/cart/quote`
- `POST /api/cart/checkout`
- `POST /api/stripe/webhook`

## Notes

- SQLite data lives at `DATABASE_PATH` (default: `backend/data/primaltrend.db`).
- Product data is seeded from `backend/src/catalog.ts` on first run.
- Checkout uses Stripe automatic payment methods and can enable automatic tax (see `.env.example`).
