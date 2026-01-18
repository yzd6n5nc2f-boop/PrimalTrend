import { Product } from "@/data/products";

export type FilterState = {
  sport: string[];
  tribe: string[];
  size: string[];
  min?: number;
  max?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  sort?: string;
};

export function applyFilters(products: Product[], filters: FilterState) {
  let result = [...products];

  if (filters.sport.length > 0) {
    result = result.filter((product) =>
      filters.sport.some((sport) => product.sportTags.includes(sport))
    );
  }

  if (filters.tribe.length > 0) {
    result = result.filter((product) =>
      filters.tribe.some((tribe) => product.tribeTags.includes(tribe))
    );
  }

  if (filters.size.length > 0) {
    result = result.filter((product) =>
      filters.size.some((size) => product.sizes.includes(size))
    );
  }

  if (typeof filters.min === "number") {
    result = result.filter((product) => product.price >= filters.min!);
  }

  if (typeof filters.max === "number") {
    result = result.filter((product) => product.price <= filters.max!);
  }

  if (filters.isNew) {
    result = result.filter((product) => product.isNew);
  }

  if (filters.isFeatured) {
    result = result.filter((product) => product.isFeatured);
  }

  if (filters.sort) {
    switch (filters.sort) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      default:
        break;
    }
  }

  return result;
}
