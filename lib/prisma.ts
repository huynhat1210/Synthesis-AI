/**
 * @file lib/prisma.ts
 * @description Instantiates and shares a global single Prisma Client instance.
 *              Guarantees the singleton pattern is followed in Next.js development.
 */

import { PrismaClient } from "./generated/prisma";

declare global {
  // Allow global dev overrides to survive Next.js dev server hot reloads
  var prismaGlobal: PrismaClient | undefined;
}

export const prisma =
  globalThis.prismaGlobal ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
