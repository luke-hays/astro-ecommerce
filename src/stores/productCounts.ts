// TODO: support arbitrary number increments
// TODO: support arbitrary number decrements
// TODO: consider what to do if a count cannot be obtained with the id
// TODO: consider what to do if a new count is out of bounds

import { atom } from "nanostores";
import { MAX_PRODUCT_QUANTITY } from "../utils/constants";

// State consists of tracking the id of an item with its current count
// This is used for single and multiple product tracking, like on a specific Product page or the Checkout page
export const $counts = atom<Cart>({});

export const updateCount = (id: string, newCount: number) =>
  $counts.set({ ...$counts.get(), [id]: newCount });
export const getItemCount = (id: string) => $counts.get()[id] ?? 0;

export const removeCount = (id: string) => {
  const counts = Object.entries($counts.get()).filter(
    ([itemId, _]) => itemId !== id,
  );

  const newCounts = Object.fromEntries(counts);

  $counts.set({ ...newCounts });
};

export const incrementCount = (id: string) => {
  const count = getItemCount(id);

  if (count >= MAX_PRODUCT_QUANTITY) return;

  updateCount(id, count + 1);
};

export const decrementCount = (id: string) => {
  const count = getItemCount(id);

  if (count <= 0) return;

  if (count - 1 < 1) {
    removeCount(id);
  } else {
    updateCount(id, count - 1);
  }
};
