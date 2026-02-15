import { products as fallbackProducts, type Product } from "@/data/products";

const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const data = await fetchJson<{ products?: Product[] }>("/api/products");
    if (Array.isArray(data.products) && data.products.length > 0) {
      return data.products;
    }
  } catch {
    // Fallback keeps the storefront browsable when API is unavailable.
  }
  return fallbackProducts;
}

export async function fetchProductBySlug(
  slug: string
): Promise<Product | null> {
  const fallbackProduct =
    fallbackProducts.find((product) => product.slug === slug) ?? null;

  try {
    const response = await fetch(`${apiBase}/api/products/${slug}`, {
      cache: "no-store"
    });

    if (response.status === 404) {
      return fallbackProduct;
    }

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = (await response.json()) as { product?: Product };
    return data.product ?? fallbackProduct;
  } catch {
    return fallbackProduct;
  }
}
