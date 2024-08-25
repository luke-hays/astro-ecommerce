import { z, defineCollection } from "astro:content";

const productCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    price: z.number(),
    stock: z.number(),
    description: z.string(),
    // Necessary to add the first / or else trying to import image from this path fails
    image: z.string().transform((path) => `/${path}`),
    category: z.string(),
    highlight: z.boolean(),
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
