import type { Product } from "@/data/products";

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchProducts(): Promise<Product[]> {
  const data = await fetchJson<{ products?: Product[] }>("/api/products");
  return Array.isArray(data.products) ? data.products : [];
}

export async function fetchProductBySlug(
  slug: string
): Promise<Product | null> {
  const response = await fetch(`${apiBase}/api/products/${slug}`, {
    cache: "no-store"
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = (await response.json()) as { product?: Product };
  return data.product ?? null;
}
