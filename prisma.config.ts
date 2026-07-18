import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Migrations / db push must use the DIRECT (unpooled) connection — Neon's
    // pooled PgBouncer endpoint rejects them. The app runtime still uses the
    // pooled DATABASE_URL via the Neon driver adapter (see lib/prisma.ts).
    url: env("DATABASE_URL_UNPOOLED"),
  },
});
