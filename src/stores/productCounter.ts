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
