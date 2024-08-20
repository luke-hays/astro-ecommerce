import {persistentAtom} from "@nanostores/persistent";

// Cart is placed in localStorage - use persistent atoms to get the user's cart between tabs/windows
export const cart = persistentAtom<Cart>('cart', {}, {
  encode: JSON.stringify,
  decode: JSON.parse
})