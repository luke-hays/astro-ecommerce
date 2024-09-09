import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { turso } from "../../turso";

export const GET: APIRoute = async ({ request, cookies }) => {
  let sessionId: string | undefined | null = cookies.get("cart")?.value;

  if (!sessionId) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    sessionId = searchParams.get("id");
  }

  if (sessionId) {
    const recordResponse = await turso.execute({
      sql: "SELECT * FROM cart WHERE session_id = ?;",
      args: [sessionId],
    });

    if (recordResponse.rows.length > 0) {
      const items = JSON.parse(recordResponse.rows[0].items as string);
      const productCollection = await getCollection("products");

      const products: any = {}
      for (const product of productCollection) {
        if (Object.hasOwn(items, product.id)) {
          products[product.id] = product.data.price
        }
      }

      return new Response(JSON.stringify(products), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  return new Response("{}", {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}