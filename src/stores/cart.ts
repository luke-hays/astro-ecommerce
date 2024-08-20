import {persistentAtom} from "@nanostores/persistent";

export const cart = persistentAtom<Cart>('cart', {}, {
  encode: JSON.stringify,
  decode: JSON.parse
})