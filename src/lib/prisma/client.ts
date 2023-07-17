import type { PrismaClient } from '@prisma/client';

/**
 * Instantiates a single instance PrismaClient and save it on the global object.
 * @link https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */
const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

export const getPrisma = async (): Promise<PrismaClient> => {
  let prisma: PrismaClient;

  if (!prismaGlobal.prisma) {
    const module = await import(import.meta.env.DEV ? '@prisma/client' : '@prisma/client/edge');

    prisma = new module.PrismaClient({
      log: import.meta.env.DEV ? ['query', 'error', 'warn'] : ['error'],
    });

    if (import.meta.env.PROD) {
      prismaGlobal.prisma = prisma;
    }
  } else {
    prisma = prismaGlobal.prisma;
  }

  return prisma;
};
