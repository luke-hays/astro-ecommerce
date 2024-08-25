import { pipe } from "fp-ts/lib/function";
import { formatNumberToCurrency } from "./currency";
import type { Category, Images, Product } from "../types/products";

interface GetProductsByCategoryParams<T> {
  products: Product[],
  categories: Category[],
  images: Images,
  category: T
}

const buildRouteToProduct = (id: string) => `/products/${id}`

const getCategory = <A extends Category, B>(categories: A[], category: B) => 
  categories.find(c => c.data.name === category)?.data.name

const filterProductsByCategory = <A extends Product, B>(products: A[], category: B) => 
  products.filter(product => product.data.category === category)

const mapProductProps = <T extends Product>(images: Images, products: T[]) => {
  return products.map((product) => ({
    ...product.data,
    formattedPrice: formatNumberToCurrency(product.data.price),
    route: buildRouteToProduct(product.id),
    image: images[product.data.image] ?? (() => {})
  }))
}

export const getProductsByCategory = async <T>(params: GetProductsByCategoryParams<T>) => {
  const {category, categories, products, images} = params

  return pipe(
    category,
    (category) => getCategory(categories, category),
    (categoryId) => filterProductsByCategory(products, categoryId),
    (filteredProducts) => mapProductProps(images, filteredProducts)
  )
}


