import { turso } from "../../../turso";

export const getCartForSession = async (sessionId: string) => {
  const records = await turso.execute({
    sql: "SELECT * FROM cart WHERE session_id = ?;",
    args: [sessionId],
  });

  let items = '{}'

  if (records.rows.length > 0) {
    items = records.rows[0].items as string
  }

  return items
}

export const insertNewCart = async (sessionId: string, items: Cart) => {
  await turso.execute({
    sql: "INSERT INTO cart (session_id, items) VALUES (?, ?);",
    args: [sessionId, JSON.stringify(items)],
  });
}

export const updateCartItem = async (sessionId: string, items: Cart) => {
  await turso.execute({
    sql: "UPDATE cart SET items = ? WHERE session_id = ?;",
    args: [JSON.stringify(items), sessionId],
  });
}