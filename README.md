# PRIMAL TREND

Monochrome performance apparel ecommerce frontend built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Getting Started

```bash
pnpm install
pnpm dev
```

## Build & Static Export

```bash
pnpm build
```

The export output is generated in the `out` folder for Azure Static Web Apps.

## Linting & Formatting

```bash
pnpm lint
pnpm format
```

## Image Replacement

Replace placeholder assets in `public/placeholders` with production imagery. Keep the same filenames to avoid code changes.

## Adding Products & Tribes

- Products live in `src/data/products.ts`.
- Tribes live in `src/data/tribes.ts`.
- Sports and size options live in `src/data/categories.ts`.

## Azure Static Web Apps

See `azure/README.md` for exact deployment steps.
