import { defineDb, defineTable, column } from "astro:db";

const Cart = defineTable({
  columns: {
    sessionId: column.text({ primaryKey: true }),
    items: column.json(),
    lastUpdatedDate: column.date(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    Cart,
  },
});
