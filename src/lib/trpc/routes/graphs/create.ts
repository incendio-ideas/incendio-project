import { publicProcedure } from '$lib/trpc';
import { z } from 'zod';

export const create = publicProcedure
  .input(
    z.object({
      name: z.string(),
    }),
  )
  .mutation(async ({ ctx: { prisma }, input }) => {
    return await prisma.graph.create({
      data: {
        name: input.name,
      },
    });
  });
