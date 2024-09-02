import { createClient } from "@libsql/client";

// Vite recommends import.meta.env while a tool like playwright running node will need process.env
// Use the node env as a fallback options
let env: ImportMetaEnv | NodeJS.ProcessEnv = import.meta.env;

if (env == null) {
  env = process.env
}

const clientConfig = {
  url: 'file:db/treecommerce.db',
  authToken: '...'
};

if (env.PROD) {
  clientConfig.url = env.TURSO_DATABASE_URL;
  clientConfig.authToken = env.TURSO_AUTH_TOKEN;
}

if (env.TESTING === 'true') {
  // Sets up an in memory database when running e2e tests. Could also point to a staging db or anything if desired
  clientConfig.url = 'file:db/treecommerce-test.db';
  clientConfig.authToken = '...';
}

export const turso = createClient(clientConfig);