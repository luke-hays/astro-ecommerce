import { turso } from "../../../turso";

export const getCartForSession = async (sessionId: string) => {
  const records = await turso.execute({
    sql: "SELECT * FROM cart WHERE session_id = ?;",
    args: [sessionId],
  });

  let cart = '{}'
  let sessionHasCart = false

  if (records.rows.length > 0) {
    cart = records.rows[0].items as string
    sessionHasCart = true
  }

  return {cart, sessionHasCart}
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

export const deleteCart = async (sessionId: string) => {
  await turso.execute({
    sql: "UPDATE cart SET items = ? WHERE session_id = ?;",
    args: [JSON.stringify({}), sessionId],
  });
}