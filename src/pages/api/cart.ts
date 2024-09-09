import type { APIRoute } from "astro";
import { v4 as uuid } from "uuid";

import { COOKIE_KEY_CART, PARAM_PRODUCT_ID } from "../../utils/constants";

import { getCartValueFromApiRoute } from "./utils/session";
import { badRequest, emptyJsonBody, jsonBody, missingResource } from "./responses/generic";
import { getCartForSession, insertNewCart, updateCartItem } from "./db/cart";

export const GET: APIRoute = async ({ request, cookies }) => {
  let sessionId = getCartValueFromApiRoute({request, cookies})

  // A session may not yet exist for this user, so we need to return an empty response
  if (!sessionId) return emptyJsonBody()

  const {cart} = await getCartForSession(sessionId)

  return jsonBody(cart)
};

export const POST: APIRoute = async ({ cookies, request }) => {
  let sessionId = getCartValueFromApiRoute({request, cookies})

  // If there isn't a current session for this user, we will create a new one
  if (!sessionId) sessionId = uuid();

  const { product, quantity } = await request.json();
  const {cart, sessionHasCart} = await getCartForSession(sessionId)
  const items = { [product]: quantity } as Cart;
  const parsedCartRecord = JSON.parse(cart) as Cart

  cookies.set(COOKIE_KEY_CART, sessionId, { path: "/" });

  if (Object.keys(parsedCartRecord).length === 0 && !sessionHasCart) {
    await insertNewCart(sessionId, items)
    return jsonBody(items)
  }

  parsedCartRecord[product] = quantity
  await updateCartItem(sessionId, parsedCartRecord)
  return jsonBody(parsedCartRecord)
};

export const DELETE: APIRoute = async ({ cookies, request }) => {
  let sessionId = getCartValueFromApiRoute({request, cookies})

  if (!sessionId) return missingResource()

  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const productId = params.get(PARAM_PRODUCT_ID);

  if (productId == null) return badRequest()

  // Check if user has existing session
  const {cart} = await getCartForSession(sessionId)
  const parsedItems = JSON.parse(cart) as Cart

  if (Object.keys(parsedItems).length === 0) return badRequest()
  if (!Object.hasOwn(parsedItems, productId)) return badRequest()

  delete parsedItems[productId]

  await updateCartItem(sessionId, parsedItems)

  return jsonBody(parsedItems);
};
