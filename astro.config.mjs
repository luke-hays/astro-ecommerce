import { defineConfig } from 'astro/config';
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: "node_modules/@shoelace-style/shoelace/dist/assets/icons",
            dest: "assets",
          },
          {
            src: 'node_modules/@shoelace-style/shoelace/dist/themes',
            dest: ""
          }
        ],
      }),
    ],
  },
});