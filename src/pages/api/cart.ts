import type { APIRoute } from "astro";
import { turso } from "../../turso";
import { v4 as uuid } from "uuid";

export const POST: APIRoute = async ({ cookies, request }) => {
  let sessionId = cookies.get('cart')?.value

  if (!sessionId) {
    sessionId = uuid()
  }

  const { product, quantity } = await request.json();

  let items = { [product]: quantity } as Cart;

  // Check if user has existing session
  const recordResponse = await turso.execute({
    sql: 'SELECT * FROM cart WHERE session_id = ?;',
    args: [sessionId]
  })

  if (recordResponse.rows.length === 0) {
    await turso.execute({
      sql: 'INSERT INTO cart (session_id, items) VALUES (?, ?);',
      args: [sessionId, JSON.stringify(items)]
    })
  } else {
    items = JSON.parse(recordResponse.rows[0].items as any) as Cart
    items[product] = quantity
    await turso.execute({
      sql: 'UPDATE cart SET items = ? WHERE session_id = ?;',
      args: [JSON.stringify(items), sessionId]
    })
  }

  cookies.set('cart', sessionId, {path: '/'})

  return new Response(JSON.stringify(items), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
