import type { APIRoute } from "astro";
import { turso } from "../../turso";

export const GET: APIRoute = async({request, cookies}) => {
  let sessionId: string | undefined | null = cookies.get('cart')?.value

  if (!sessionId) {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)

    sessionId = searchParams.get('id')
  }

  if (sessionId) {
    const recordResponse = await turso.execute({
      sql: "SELECT * FROM cart WHERE session_id = ?;",
      args: [sessionId],
    });

    if (recordResponse.rows.length > 0) {
      const items = recordResponse.rows[0].items as string
      const parsedItems = JSON.parse(items) as Cart

      const count = Object.values(parsedItems).reduce((prev: number, curr: number) => prev + curr, 0)

      return new Response(`{"count": ${count}}`, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  return new Response('{"count": 0}', {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}