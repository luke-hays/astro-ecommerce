import { computed } from "nanostores";
import { $cart } from "./cart";

// Computed store will update its value whenever this dependency store $cart is updated
export const $totalCartItems = computed($cart, cart => {
  return Object.values(cart).reduce((prev, curr) => prev + curr, 0)
});
 