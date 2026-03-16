import "dotenv/config";
import { defineConfig } from "prisma/config";

// Dummy URL for build phase (Railway/Docker) - DATABASE_URL is injected at runtime
const DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://dummy:dummy@localhost:5432/dummy";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: DATABASE_URL,
  },
});
