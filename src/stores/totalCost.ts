import { computed, task } from "nanostores";
import { getCart } from "./cart";
import { $products } from "./products";

export const $totalCost = computed($products, (products) => {
  let total = 0;

  const cart = getCart();

  for (const [id, count] of Object.entries(cart)) {
    total += products[id] * count;
  }

  return total;
});
