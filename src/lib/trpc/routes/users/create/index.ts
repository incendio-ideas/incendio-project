import { z } from 'zod';
import { publicProcedure } from '$lib/trpc';

export const create = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      username: z.string(),
    }),
  )
  .mutation(async ({ ctx: { prisma }, input }) => {
    return await prisma.user.create({
      data: {
        ...input,
      },
    });
  });
