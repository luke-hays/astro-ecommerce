import { getCollection, type CollectionEntry } from "astro:content";
import { type ImageMetadata } from "astro";

import { pipe } from "fp-ts/lib/function";

export const getProductsByCategory = async <T>(category: T) => {
  const [categories, products] = await Promise.all([
    getCollection("categories"),
    getCollection("products")
  ]);

  const images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/**/*.{jpeg,jpg,png,gif,webp}",
  ); 

  const getCategory = <T>(category: T) => categories.find(c => c.id === category)
  const filterProductsByCategory = <T>(category: T) => products.filter(product => product.data.category === category)
  const buildRouteToProduct = (id: string) => `/products/${id}`
  const mapProductProps = <T extends CollectionEntry<'products'>>(products: T[]) => 
    products.map((product) => ({
      ...product.data, 
      route: buildRouteToProduct(product.id),
      image: images[product.data.image] ?? (() => {})
    }))

  return pipe(
    category,
    getCategory,
    filterProductsByCategory,
    mapProductProps
  )
}

