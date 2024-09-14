import { defineConfig } from "astro/config";
import { viteStaticCopy } from "vite-plugin-static-copy";
import sentry from "@sentry/astro";
import netlify from "@astrojs/netlify";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: 'https://treecommerce.dev',
  vite: {
    plugins: [viteStaticCopy({
      targets: [{
        src: "node_modules/@shoelace-style/shoelace/dist/assets/icons",
        dest: "assets"
      }, {
        src: "node_modules/@shoelace-style/shoelace/dist/themes",
        dest: ""
      }, {
        src: "node_modules/@splidejs/splide/dist/css/splide.min.css",
        dest: ""
      }]
    })]
  },
  integrations: [sentry({
    dsn: "https://bfe09e41e9c48044a719c19f773646ee@o4507714165211136.ingest.us.sentry.io/4507714193719296",
    sourceMapsUploadOptions: {
      project: "astro-ecommerce",
      authToken: process.env.SENTRY_AUTH_TOKEN
    },
    environment: process.env.SENTRY_ENVIRONMENT
  }), robotsTxt()],
  output: "server",
  adapter: netlify()
});