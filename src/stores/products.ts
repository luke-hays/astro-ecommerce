import { computed, task } from "nanostores";
import { $cart } from "./cart";

export const $products = computed($cart, async (cart) =>
  await task(async () => {
    if (Object.keys(cart).length <= 0) {
      return {};
    }

    // Fetch latest data on products whent he cart updates
    const response = await fetch("/api/products");

    const data = await response.json();

    return data;
  }),
);
