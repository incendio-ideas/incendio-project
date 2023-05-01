/**
 * Instantiates a single instance PrismaClient and save it on the global object.
 * @link https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */
import { PrismaClient } from '@prisma/client/edge';
import * as dotenv from 'dotenv';

dotenv.config();

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

export const prisma =
  prismaGlobal.prisma ||
  new PrismaClient({
    log: import.meta.env.DEV ? ['query', 'error', 'warn'] : ['error'],

    datasources: {
      db: {
        url: process.env.DATABASE_URL_PRISMA,
      },
    },
  });

if (import.meta.env.PROD) {
  prismaGlobal.prisma = prisma;
}
