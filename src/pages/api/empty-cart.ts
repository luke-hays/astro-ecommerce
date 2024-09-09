import type { APIRoute } from "astro";

import { getCartValueFromApiRoute } from "./utils/session";
import { missingResource, badRequest, okResponse } from "./responses/generic";
import { deleteCart, getCartForSession } from "./db/cart";

export const DELETE: APIRoute = async ({request, cookies}) => {
  let sessionId = getCartValueFromApiRoute({request, cookies})

  if (!sessionId) return missingResource()

  const items = await getCartForSession(sessionId)
  const parsedItems = JSON.parse(items) as Cart

  if (Object.keys(parsedItems).length === 0) return badRequest()

  deleteCart(sessionId)
  cookies.delete('cart', {path: '/'})
  return okResponse()
}
