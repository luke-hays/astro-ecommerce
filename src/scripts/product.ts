import { type ImageMetadata } from "astro";
import { type CollectionEntry } from "astro:content";
import { pipe } from "fp-ts/lib/function";
import { formatNumberToCurrency } from "./currency";

const buildRouteToProduct = (id: string) => `/products/${id}`

const getCategory = <A extends CollectionEntry<'categories'>, B>(categories: A[], category: B) => categories.find(c => c.data.name === category)?.data.name

const filterProductsByCategory = <A extends CollectionEntry<'products'>, B>(products: A[], category: B) => products.filter(product => product.data.category === category)

const mapProductProps = <T extends CollectionEntry<'products'>>(products: T[], images: Record<string, () => Promise<{
  default: ImageMetadata;
}>>) => {
  return products.map((product) => ({
    ...product.data,
    formattedPrice: formatNumberToCurrency(product.data.price),
    route: buildRouteToProduct(product.id),
    image: images[product.data.image] ?? (() => {})
  }))
}

export const getProductsByCategory = async <T>(
  products: CollectionEntry<'products'>[],
  categories: CollectionEntry<'categories'>[],
  images: Record<string, () => Promise<{
    default: ImageMetadata;
  }>>,
  category: T
) => {
  return pipe(
    category,
    (category) => getCategory(categories, category),
    (categoryId) => filterProductsByCategory(products, categoryId),
    (filteredProducts) => mapProductProps(filteredProducts, images)
  )
}


