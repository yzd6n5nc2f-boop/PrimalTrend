import { FilterState } from "@/lib/filters";

export function parseFilterState(searchParams: URLSearchParams): FilterState {
  const getList = (key: string) =>
    searchParams.get(key)?.split(",").filter(Boolean) ?? [];

  const min = searchParams.get("min");
  const max = searchParams.get("max");

  return {
    sport: getList("sport"),
    tribe: getList("tribe"),
    size: getList("size"),
    min: min ? Number(min) : undefined,
    max: max ? Number(max) : undefined,
    isNew: searchParams.get("new") === "true",
    isFeatured: searchParams.get("featured") === "true",
    sort: searchParams.get("sort") ?? undefined
  };
}

export function buildFilterQuery(filters: FilterState) {
  const params = new URLSearchParams();
  const setList = (key: string, values: string[]) => {
    if (values.length > 0) {
      params.set(key, values.join(","));
    }
  };

  setList("sport", filters.sport);
  setList("tribe", filters.tribe);
  setList("size", filters.size);

  if (typeof filters.min === "number") {
    params.set("min", String(filters.min));
  }
  if (typeof filters.max === "number") {
    params.set("max", String(filters.max));
  }

  if (filters.isNew) params.set("new", "true");
  if (filters.isFeatured) params.set("featured", "true");
  if (filters.sort) params.set("sort", filters.sort);

  const query = params.toString();
  return query.length > 0 ? `?${query}` : "";
}
