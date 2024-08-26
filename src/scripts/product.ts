import { pipe } from "fp-ts/lib/function";
import type { Category, Images, Product } from "../types/products";
import { formatNumberToCurrency } from "./currency";
import { buildRouteToProduct } from "./routes";
import { getCategory } from "./categories";

interface GetProductParams<T> {
  products: Product[],
  images: Images,
  id: T
}

interface GetProductsByCategoryParams<T> {
  products: Product[],
  categories: Category[],
  images: Images,
  category: T
}

const getProductById = <A extends Product, B>(products: A[], id: B) =>
  products.find((product) => product.id === id) 

const filterProductsByCategory = <A extends Product, B>(products: A[], category: B) => 
  products.filter(product => product.data.category === category)

const transformProduct = <T extends Product>(images: Images, product: T) => ({
    ...product.data,
    formattedPrice: formatNumberToCurrency(product.data.price),
    id: product.id,
    route: buildRouteToProduct(product.id),
    image: images[product.data.image] ?? (() => {})
  }
)

const mapProductProps = <T extends Product>(images: Images, products: T[]) => 
  products.map((product) => (transformProduct(images, product)))

export const getProductsByCategory = <T>(params: GetProductsByCategoryParams<T>) => {
  const {category, categories, products, images} = params

  return pipe(
    category,
    (category) => getCategory(categories, category)?.data.name,
    (categoryId) => filterProductsByCategory(products, categoryId),
    (filteredProducts) => mapProductProps(images, filteredProducts)
  )
}

export const getProduct = <T>(params: GetProductParams<T>) => {
  const {products, id, images} = params;

  return pipe(
    id,
    (id) => getProductById(products, id),
    (product) => product ? transformProduct(images, product) : null
  )
}

export const getAllProducts = <T extends Product>(products: T[], images: Images) => {
  return products.map((product) => ({
    ...transformProduct(images, product), 
  }))
}
