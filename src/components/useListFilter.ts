import { useMemo } from "react";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

type Accessor<T> =
  | (keyof T)[]
  | ((item: T) => Array<string | number | null | undefined>);

export function useListFilter<T>(
  list: T[],
  search: string,
  fields: Accessor<T>,
  extraPredicates: Array<(item: T) => boolean> = []
) {
  return useMemo(() => {
    const q = normalize(search.trim());

    const pick = (item: T): string[] => {
      const vals =
        typeof fields === "function"
          ? fields(item)
          : (fields as (keyof T)[]).map((k) => (item as any)[k]);
      return vals
        .filter((v) => v !== null && v !== undefined)
        .map((v) => normalize(String(v)));
    };

    return list.filter((item) => {
      const okSearch = !q || pick(item).some((f) => f.includes(q));
      const okExtra = extraPredicates.every((fn) => fn(item));
      return okSearch && okExtra;
    });
  }, [list, search, fields, extraPredicates]);
}
