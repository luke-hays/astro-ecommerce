import type { APIRoute } from 'astro'
import { db, Cart as CartTable, like } from 'astro:db'

export const POST: APIRoute = async ({ request }) => {
  const sessionId = request.headers.get('cookie')?.split('=')[1] ?? ''
  const lastUpdatedDate = new Date()
  let items = {} as Cart

  const {product, quantity} = await request.json()

  // Check if user has existing session
  const record = await db.select().from(CartTable).where(
    like(CartTable.sessionId, sessionId)
  )

  if (record.length > 0) {
    items = record[0].items as Cart
  }

  items[product] = quantity

  await db.insert(CartTable).values({sessionId, items, lastUpdatedDate})

  return new Response('', {status: 200})
}
