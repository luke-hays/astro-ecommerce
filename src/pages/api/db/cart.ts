import { turso } from "../../../turso";

export const getCartForSession = async (sessionId: string) => {
  const records = await turso.execute({
    sql: "SELECT * FROM cart WHERE session_id = ?;",
    args: [sessionId],
  });

  let items: unknown = {}

  if (records.rows.length > 0) {
    items = records.rows[0].items
  }

  return items
}