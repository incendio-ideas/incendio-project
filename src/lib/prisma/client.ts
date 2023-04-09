/**
 * Instantiates a single instance PrismaClient and save it on the global object.
 * @link https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */
import { PrismaClient } from '@prisma/client';

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

const isServer = typeof window === 'undefined';
export let prisma: PrismaClient;

if (isServer) {
  prisma =
    prismaGlobal.prisma ||
    new PrismaClient({
      log: import.meta.env.DEV ? ['query', 'error', 'warn'] : ['error'],
    });

  if (import.meta.env.PROD) {
    prismaGlobal.prisma = prisma;
  }
}
