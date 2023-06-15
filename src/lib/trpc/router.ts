import { router } from '$lib/trpc';
import { boardsRouter } from './routes/boards';

export const rootRouter = router({
  boards: boardsRouter,
});

export type Router = typeof rootRouter;
