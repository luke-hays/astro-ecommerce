import { pipe } from "fp-ts/lib/function";
import type { Category } from "../types/products";
import { getCategory } from "./categories";

const mapCategoryToRoute = <T extends Category>(category: T | undefined) => {
  if (!category) return { label: "Home", path: "/" };

  return {
    label: category.data.name,
    path: `/categories/${category.id}`,
  };
};

export const buildRouteToProduct = (id: string) => `/products/${id}`;

export const buildCategoryBreadcrumbs = <A extends Category[], B>(
  categories: A,
  id: B,
) => {
  return pipe(id, (id) => getCategory(categories, id), mapCategoryToRoute);
};
