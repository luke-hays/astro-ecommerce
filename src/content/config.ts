import { z, defineCollection } from "astro:content";

import { formatNumberToCurrency } from "../scripts/currency";

const productCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    price: z.number().transform((price) => formatNumberToCurrency(price)),
    stock: z.number(),
    description: z.string(),
    // Necessary to add the first / or else trying to import image from this path fails
    image: z.string().transform((path) => `/${path}`),
    category: z.string(),
    highlight: z.boolean()
  }),
});

const categoryCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string()
  })
})

export const collections = {
  products: productCollection,
  categories: categoryCollection
};
