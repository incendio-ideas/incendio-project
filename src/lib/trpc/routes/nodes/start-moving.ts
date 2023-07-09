import { publicProcedure } from '$lib/trpc';
import { z } from 'zod';

export const startMoving = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { prisma }, input: { id } }) => {
    return await prisma.node.update({ where: { id }, data: { moving: true } });
  });
