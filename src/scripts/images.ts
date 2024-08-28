import type { ImageMetadata } from "astro";

export const getImages = () => import.meta.glob<{ default: ImageMetadata }>("/src/assets/**/*.{jpeg,jpg,png,gif,webp}");
