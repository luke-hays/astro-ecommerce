import {z, defineCollection} from 'astro:content';

const productCollection = defineCollection({ 
  type: 'data',
  schema: z.object({
    name: z.string(),
    price: z.number(),
    stock: z.number(),
    description: z.string(),
    image: z.string(),
  })
});

export const collections = {
  'products': productCollection,
};