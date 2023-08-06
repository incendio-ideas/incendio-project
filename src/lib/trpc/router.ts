import { router } from '$lib/trpc';
import { graphsRouter } from './routes/graphs';
import { nodesRouter } from './routes/nodes';

export const rootRouter = router({
  graphs: graphsRouter,
  nodes: nodesRouter,
});

export type Router = typeof rootRouter;
