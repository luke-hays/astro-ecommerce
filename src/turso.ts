import { createClient } from "@libsql/client";

const env = import.meta.env
const isProd = env.PROD

const clientConfig = {
  url: 'file:db/treecommerce.db',
  authToken: '...'
}

if (isProd) {
  clientConfig.url = env.TURSO_DATABASE_URL
  clientConfig.authToken = env.TURSO_AUTH_TOKEN
}

export const turso = createClient(clientConfig);