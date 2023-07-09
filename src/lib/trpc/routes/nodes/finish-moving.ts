import { publicProcedure } from '$lib/trpc';
import { z } from 'zod';

export const finishMoving = publicProcedure
  .input(
    z.object({
      id: z.string(),
      x: z.number(),
      y: z.number(),
    }),
  )
  .mutation(async ({ ctx: { prisma }, input: { id, x, y } }) => {
    return await prisma.node.update({ where: { id }, data: { moving: false, x, y } });
  });
