import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import { getCartForSession } from "./db/cart";
import { getCartValueFromApiRoute } from "./utils/session";
import { badRequest } from "./responses/generic";

export const GET: APIRoute = async ({ request, cookies }) => {
  const sessionId = getCartValueFromApiRoute({request, cookies})

  if (!sessionId) return badRequest()

  const {cart} = await getCartForSession(sessionId)
  const productCollection = await getCollection("products");

  const parsedCart = JSON.parse(cart);
  const products: Cart = {};

  for (const product of productCollection) {
    if (Object.hasOwn(parsedCart, product.id)) {
      products[product.id] = product.data.price;
    }
  }

  return new Response(JSON.stringify(products), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
