import { task, onMount, atom } from "nanostores";
import { PARAM_PRODUCT_ID } from "../utils/constants";

export const $cart = atom<Cart>({});
export const $cleared = atom(false);

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

export const getCart = () => {
  return $cart.get();
};

export const getCartItem = (id: string) => {
  return $cart.get()[id];
};

export const updateCart = async (id: string, count: number) => {
  await task(async () => {
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

export const deleteCartItem = async (id: string) => {
  await task(async () => {
    const response = await fetch(`/api/cart?${PARAM_PRODUCT_ID}=${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (Object.keys(data).length === 0) {
      $cleared.set(true)
    }

    $cart.set(data);
  });
};

export const deleteCart = async () => {
  await task(async () => {
    await fetch("/api/empty-cart", { method: "DELETE" });
    $cart.set({});
    $cleared.set(true);
  });
};
