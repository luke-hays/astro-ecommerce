import type { APIRoute } from "astro";
import { turso } from "../../turso";

export const DELETE: APIRoute = async ({cookies}) => {
  let sessionId = cookies.get("cart")?.value;

  if (!sessionId) {
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
    try {
      await turso.execute({
        sql: "DELETE FROM cart WHERE session_id = ?;",
        args: [sessionId],
      });

      cookies.delete('cart', {path: '/'})

      return new Response(null, {status: 200})
    } catch (error) {
      return new Response(null, {
        status: 500,
      });
    }
  }
}
