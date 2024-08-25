import type { Category } from "../types/products"

export const getCategory = <A extends Category, B>(categories: A[], category: B) => 
  categories.find(c => c.data.name === category)
