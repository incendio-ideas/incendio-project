import { publicProcedure, router } from '$lib/trpc';

export const rootRouter = router({
  greeting: publicProcedure.query(() => `Hello tRPC v10 @ ${new Date().toLocaleTimeString()}`),
});

export type Router = typeof rootRouter;
