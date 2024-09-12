import { map } from "nanostores";

interface CurrentProduct {
  [index: string]: number
}

export const $currentProduct = map<CurrentProduct>()

export const getCurrentProduct = () => {
  const product = $currentProduct.get()

  if (Object.keys(product).length > 0) {
    const [id, count] = Object.entries(product)[0]
    return {id, count}
  }

  return {}
}

export const setCurrentProduct = (id: string, count: number) => {
  $currentProduct.setKey(id, count)
}