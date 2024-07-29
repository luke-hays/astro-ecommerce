import { defineConfig } from 'astro/config';
import { viteStaticCopy } from "vite-plugin-static-copy";
import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [viteStaticCopy({
      targets: [{
        src: "node_modules/@shoelace-style/shoelace/dist/assets/icons",
        dest: "assets"
      }, {
        src: 'node_modules/@shoelace-style/shoelace/dist/themes',
        dest: ""
      }]
    })]
  },
  integrations: [db()]
});