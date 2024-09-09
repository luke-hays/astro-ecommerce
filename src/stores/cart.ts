import { task, onMount, atom } from "nanostores";
import { PARAM_PRODUCT_ID } from "../utils/constants";

export const $cart = atom<Cart>({});

onMount($cart, () => {
  task(async () => {
    const response = await fetch("/api/cart");

    const data = await response.json();

    if (typeof data === "string") {
      $cart.set(JSON.parse(data));
    } else {
      $cart.set(data);
    }
  });
});

export const updateCart = (id: string, count: number) => {
  task(async () => {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: id, quantity: count }),
    });

    const data = await response.json();

    $cart.set(data);
  });
};

export const deleteCartItem = (id: string) => {
  task(async () => {
    const response = await fetch(`/api/cart?${PARAM_PRODUCT_ID}=${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    $cart.set(data);
  });
};

export const getCartItem = (id: string) => {
  return $cart.get()[id];
};

export const deleteCart = () => {
  task(async () => {
    await fetch("/api/empty-cart", { method: "DELETE" });
    $cart.set({});
  });
};
