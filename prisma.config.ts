import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Migrations / db push should use the DIRECT (unpooled) connection — Neon's
    // pooled PgBouncer endpoint rejects them — but fall back to the pooled URL.
    // We read via process.env (not env()) so `prisma generate` never throws when
    // DATABASE_URL_UNPOOLED is absent (e.g. on Vercel, where only DATABASE_URL
    // is set). The app runtime always uses the pooled DATABASE_URL through the
    // Neon driver adapter (see lib/prisma.ts).
    url:
      process.env.DATABASE_URL_UNPOOLED ??
      process.env.DATABASE_URL ??
      "",
  },
});
