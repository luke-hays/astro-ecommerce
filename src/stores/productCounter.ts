import { atom } from "nanostores";

// State to manage a product counter on a product page
// The user selects how many products they want, and adds that quantity to the cart
export const quantity = atom(1);

export const incrementQuantity = () => {
  const currentQuantity = quantity.get();

  if (currentQuantity === 10) return;

  quantity.set(currentQuantity + 1);
};

export const decrementQuantity = () => {
  const currentQuantity = quantity.get();

  if (currentQuantity <= 1) return;

  quantity.set(currentQuantity - 1);
};

export const $counts = atom<{[index: string]: number}>({})

export const incrementCount = (id: string) => {
  const count = $counts.get()[id] ?? 0
  if (count >= 10) return;
  $counts.set({...$counts.get(), [id]: count + 1})
}

export const decrementCount = (id: string) => {
  const count = $counts.get()[id] ?? 0
  if (count <= 1) return;
  $counts.set({...$counts.get(), [id]: count - 1})
}