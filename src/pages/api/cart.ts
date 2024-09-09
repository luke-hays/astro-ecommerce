import type { APIRoute } from "astro";
import { turso } from "../../turso";
import { v4 as uuid } from "uuid";
import { getValueFromApiRoute } from "./responses/session";
import { badRequest, emptyJsonBody, jsonBody } from "./responses/generic";
import { getCartForSession } from "./db/cart";

export const GET: APIRoute = async ({ request, cookies }) => {
  let sessionId = getValueFromApiRoute({request, cookies, key: 'session-id'})

  // A session may not yet exist for this user, so we need to return an empty response
  if (!sessionId) return emptyJsonBody()

  const items = await getCartForSession(sessionId)

  return jsonBody(items)
};

export const POST: APIRoute = async ({ cookies, request }) => {
  let sessionId = cookies.get("cart")?.value;

  if (!sessionId) {
    sessionId = uuid();
  }

  const { product, quantity } = await request.json();

  let items = { [product]: quantity } as Cart;

  // Check if user has existing session
  const recordResponse = await turso.execute({
    sql: "SELECT * FROM cart WHERE session_id = ?;",
    args: [sessionId],
  });

  if (recordResponse.rows.length === 0) {
    await turso.execute({
      sql: "INSERT INTO cart (session_id, items) VALUES (?, ?);",
      args: [sessionId, JSON.stringify(items)],
    });
  } else {
    items = JSON.parse(recordResponse.rows[0].items as any) as Cart;
    items[product] = quantity;
    
    await turso.execute({
      sql: "UPDATE cart SET items = ? WHERE session_id = ?;",
      args: [JSON.stringify(items), sessionId],
    });
  }

  cookies.set("cart", sessionId, { path: "/" });

  return new Response(JSON.stringify(items), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const DELETE: APIRoute = async ({ cookies, request }) => {
  let sessionId = cookies.get("cart")?.value;

  if (!sessionId) {
    return new Response(null, {
      status: 400,
    });
  }

  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  const productId = params.get("id");

  if (productId == null) {
    return new Response(null, {
      status: 400,
    });
  }

  // Check if user has existing session
  const recordResponse = await turso.execute({
    sql: "SELECT * FROM cart WHERE session_id = ?;",
    args: [sessionId],
  });

  if (recordResponse.rows.length === 0) {
    return new Response(null, {
      status: 400,
    });
  } else {
    let items = JSON.parse(recordResponse.rows[0].items as any) as Cart;

    if (productId in items) {
      items = Object.fromEntries(
        Object.entries(items).filter(([k, _]) => k !== productId),
      );

      await turso.execute({
        sql: "UPDATE cart SET items = ? WHERE session_id = ?;",
        args: [JSON.stringify(items), sessionId],
      });

      return new Response(JSON.stringify(items), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(null, {
        status: 400,
      });
    }
  }
};
