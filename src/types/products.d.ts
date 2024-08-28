import { type ImageMetadata } from "astro";
import { type CollectionEntry } from "astro:content";

declare type Category = CollectionEntry<"categories">;
declare type Product = CollectionEntry<"products">;
declare type Images = Record<string, () => Promise<{ default: ImageMetadata }>>;
