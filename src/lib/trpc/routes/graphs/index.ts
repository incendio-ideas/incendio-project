import { router } from '$lib/trpc';
import { byId } from './by-id';
import { create } from './create';
import { list } from './list';

export const graphsRouter = router({
  byId,
  list,
  create,
});
