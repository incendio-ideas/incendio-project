import { publicProcedure } from "$lib/trpc";

export const list = publicProcedure.query(async ({ ctx: { prisma } }) => {
  return await prisma.board.findMany({
    include: {
      cards: {}
    }
  });
});
