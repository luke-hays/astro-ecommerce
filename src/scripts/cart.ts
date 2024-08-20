import { MAX_PRODUCT_QUANTITY } from "./constants"

export function updateQuantityInCart(cart: Cart, productId: string, quantity: number) {
  const productInCart = Object.keys(cart).find((id) => id === productId)

  // If the product is not in the cart and we are somehow trying to add a quantity that's less than or equal to 0
  // Then return an unmodified object
  if (!productInCart && quantity <= 0) return cart

  // Use structuredClone for a deep clone, the clone will be modified
  let updatedCart = structuredClone(cart)
 
  updatedCart[productId] = quantity

  if (updatedCart[productId] > MAX_PRODUCT_QUANTITY) {
    updatedCart[productId] = MAX_PRODUCT_QUANTITY
  } else if (updatedCart[productId] <= 0) {
    // If we try to update the quantity to be less than or equal to 0, then just remove from the cart entirely
    const filteredEntries = Object.entries(updatedCart).filter(([id, quantity]) => {
      if (id !== productId) return [id, quantity]
    })

    updatedCart = Object.fromEntries(filteredEntries)
  }

  return updatedCart
}
