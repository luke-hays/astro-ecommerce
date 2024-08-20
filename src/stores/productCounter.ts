import {atom} from 'nanostores';

export const quantity = atom(1)

export const incrementQuantity = () => {
  const currentQuantity = quantity.get()

  if (currentQuantity === 10) return

  quantity.set(currentQuantity + 1)
}

export const decrementQuantity = () => { 
  const currentQuantity = quantity.get()

  if (currentQuantity <= 1) return
  
  quantity.set(currentQuantity - 1)
}