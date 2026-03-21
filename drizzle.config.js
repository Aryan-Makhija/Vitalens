
import { defineConfig } from 'drizzle-kit';

export default defineConfig({

  schema: './src/lib/config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
