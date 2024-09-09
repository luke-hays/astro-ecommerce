import { computed } from "nanostores";
import { $cart } from "./cart";
import { $products } from "./products";

export const $totalCost = computed([$cart, $products], (cart, products) => {
  let total = 0;

  for (const [id, count] of Object.entries(cart)) {
    total += (products[id] * count)
  }
  
  return total;
})