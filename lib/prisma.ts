// import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "@/generated/prisma";
// import { PrismaClient } from "@/generated/prisma/client";
import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "@prisma/client/extension";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL; // The 6543 Pooler URL
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter, // This replaces the need for 'url' in the schema
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
