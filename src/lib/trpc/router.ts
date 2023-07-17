import { router } from '$lib/trpc';
import { edgesRouter } from './routes/edges';
import { graphsRouter } from './routes/graphs';
import { nodesRouter } from './routes/nodes';

export const rootRouter = router({
  graphs: graphsRouter,
  nodes: nodesRouter,
  edges: edgesRouter,
});

export type Router = typeof rootRouter;
