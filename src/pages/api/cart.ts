import type { APIRoute } from "astro";
import { db, Cart as CartTable, eq } from "astro:db";
import { v4 as uuid } from "uuid";

export const POST: APIRoute = async ({ cookies, request }) => {
  let sessionId = cookies.get('cart')?.value

  if (!sessionId) {
    sessionId = uuid()
  }

  const lastUpdatedDate = new Date();
``
  const { product, quantity } = await request.json();

  let items = { [product]: quantity } as Cart;

  // Check if user has existing session
  const record = await db
    .select()
    .from(CartTable)
    .where(eq(CartTable.sessionId, sessionId));

  if (record.length > 0) {
    items = record[0].items as Cart;
    items[product] = quantity;
    await db.update(CartTable).set({ sessionId, items, lastUpdatedDate });
  } else {
    await db.insert(CartTable).values({ sessionId, items, lastUpdatedDate });
  }

  cookies.set('cart', sessionId, {path: '/'})

  return new Response(JSON.stringify(items), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
