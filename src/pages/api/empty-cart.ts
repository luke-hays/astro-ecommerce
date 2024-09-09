import type { APIRoute } from "astro";

import { getCartValueFromApiRoute } from "./utils/session";
import { badRequest, okResponse } from "./responses/generic";
import { deleteCart, getCartForSession } from "./db/cart";

export const DELETE: APIRoute = async ({ request, cookies }) => {
  const sessionId = getCartValueFromApiRoute({ request, cookies });

  if (!sessionId) return badRequest();

  const { cart, sessionHasCart } = await getCartForSession(sessionId);
  const parsedItems = JSON.parse(cart) as Cart;

  if (Object.keys(parsedItems).length === 0 || !sessionHasCart)
    return badRequest();

  await deleteCart(sessionId);

  return okResponse();
};
