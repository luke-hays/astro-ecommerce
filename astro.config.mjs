import { defineConfig } from 'astro/config';
import { viteStaticCopy } from "vite-plugin-static-copy";

import db from "@astrojs/db";
import sentry from "@sentry/astro";

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
  integrations: [
    db(), 
    sentry({
      dsn: "https://bfe09e41e9c48044a719c19f773646ee@o4507714165211136.ingest.us.sentry.io/4507714193719296",
      sourceMapsUploadOptions: {
        project: "astro-ecommerce",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    })
  ]
});