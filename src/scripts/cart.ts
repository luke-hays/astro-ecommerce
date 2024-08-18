export function updateQuantityInCart(cart: Cart, productId: string, quantity: number) {
  const productInCart = Object.keys(cart).find((id) => id === productId)

  if (!productInCart && quantity <= 0) return cart

  let updatedCart = structuredClone(cart)
 
  updatedCart[productId] = quantity

  if (updatedCart[productId] > 10) {
    updatedCart[productId] = 10
  } else if (updatedCart[productId] <= 0) {
    const filteredEntries = Object.entries(updatedCart).filter(([id, quantity]) => {
      if (id !== productId) return [id, quantity]
    })

    updatedCart = Object.fromEntries(filteredEntries)
  }

  return updatedCart
}
