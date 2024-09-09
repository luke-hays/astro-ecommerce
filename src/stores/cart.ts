import { task, onMount, atom } from "nanostores";

export const $cart = atom<Cart>({});

onMount($cart, () => {
  task(async () => {
    const response = await fetch("/api/cart");

    const data = JSON.parse(await response.json());

    $cart.set(data);
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
    const response = await fetch(`/api/cart?id=${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    $cart.set(data);
  });
};

export const getCartItem = (id: string) => {
  return $cart.get()[id]
}
