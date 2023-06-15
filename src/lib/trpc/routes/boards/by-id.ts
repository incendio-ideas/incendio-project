import { z } from 'zod';
import { publicProcedure } from '$lib/trpc';

export const byId = publicProcedure.input(z.object({
  id: z.string(),
})).query(async ({ ctx: { prisma }, input }) => {
  return await prisma.board.findUnique({
    where: {
      id: input.id
    },

    include: {
      cards: {}
    }
  });
});
